function fnSetHeaderAdmin(){
    var strHTML = ''
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>No.</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>หน่วยงาน</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>รายการ</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>วันที่แก้ไข</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>สถานะ</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>Action</td>"    
    return strHTML
}

function fnSetHeaderUser(){
    var strHTML = ''
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>No.</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>หัวข้อตรวจสอบ</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>รายการ</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>สถานะ</td>"
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>Action</td>"
    // strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>เอกสาร PDF</td>"
    // strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>ลายเซ็น</td>"
    return strHTML
}

async function fnDrawTable(access ,sideId ,objData, namePages) {
     // Get data selete before create table 
    var strHTML = ''
    var data = objData
 
    strHTML += "<table id='tb_Form' class='table table-hover table-nowrap' width: 100%;>"
    strHTML += "<thead class='table-light'>"

    strHTML += "<tr class='table-dark'>"
    if (access == 'admin') {
        strHTML += fnSetHeaderAdmin() 
    } else {
        strHTML += fnSetHeaderUser() 
    }
    strHTML += "</tr>"

    strHTML += "</thead>"
    strHTML += "<tbody>"

    if (access == 'admin') {
        strHTML += await fnGetDataTrAdmin(access, sideId, namePages)
    } else {
        strHTML += fnGetDataTrUser(access, data, sideId,  namePages)
    }

    strHTML += "</tbody>"
    strHTML += "</table>"

    $("#dvContentTable")[0].innerHTML = strHTML

    //merge column
    fnMergeColumn('#tb_Form', true);
}

async function fnGetDataTrAdmin(access, sideId, namePages) {
    var strHTML = ""
    var strUnitId = $('#selectUnit').val() || ''
    var strYear = $('#selectBudget').val() || ''
    var strStatus = $('#selectStatus').val() || ''
    
    var dataSQL = await fnGetResultDocCondition(strUnitId, sideId, strYear, strStatus)

    if (dataSQL.length > 0) {
        for (var i = 0; i < dataSQL.length; i++) {
            strHTML += "<tr>"
            strHTML += "<td id='No" + (i + 1) + "' class='text-center align-middle fristTD' style='width: 5%;'>" + (i + 1) + "<input type='hidden' id='idNo" + (i + 1) + "' value='"+ dataSQL[i].userID +"'/></td>"
            strHTML += "<td id='tdUnitName" + (i + 1) + "'  class='text-center align-middle' style='width: 55%;white-space: pre-wrap;'>" + (dataSQL[i].shortName ? (dataSQL[i].shortName) : '-') + "</td>"
            strHTML += "<td id='tdFormName" + (i + 1) + "'  class='text-center align-middle' style='width: 55%;white-space: pre-wrap;'>" + (dataSQL[i].opFormName ? (dataSQL[i].opFormName) : '-') + "</td>"
            strHTML += "<td id='tdDateUpdate" + (i + 1) + "'  class='text-center align-middle' style='width: 55%;'>" + (dataSQL[i].updatedAt ? fnFormatDateToThai(dataSQL[i].updatedAt) : '-') + "</td>"
        
            if (dataSQL[i].opStatusName == 'success') {
                strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-success me-1'>สมบูรณ์ครบถ้วน</span></div></td>"
            } else if (dataSQL[i].opStatusName == 'incomplete') {
                strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-incomplete me-1'>เอกสารไม่สมบูรณ์</span></div></td>"
            } else if (dataSQL[i].opStatusName == 'warning') {
                strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-warning me-1'>รอการตรวจสอบ</span></div></td>"
            } else {
                strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-notprocess me-1'>ยังไม่ดำเนินการ</span></div></td>"
            }
        
            strHTML += "<td class='text-center align-middle lastTD'>"
            strHTML += `<button id='btnSetComment${i + 1}' type='button' class='btn btn-success btn-sm' onclick='fnSetCommentUserConfig("set", \`${sideId}\`, \`${dataSQL[i].comment}\`, \`${dataSQL[i].id}\`,\`${dataSQL[i].opStatusName}\`)'; data-bs-toggle='modal' data-bs-target='#conmentModal' style='margin-right: 5px;'>`;
            strHTML += "<i class='las la-comment-alt mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>คำแนะนำ</span>"
            strHTML += "</button>"

            // if (dataSQL[i].opStatusName !== 'notprocess') {
            strHTML += `<button id='btnEditDoc${i + 1}' type='button' class='btn btn-warning btn-sm' onclick='fnEditDocConfig(\`${access}\`, \`${dataSQL[i].userID}\`, \`${namePages}\`, \`${dataSQL[i].opStatusID}\`, \`${dataSQL[i].opSideID}\`, \`${dataSQL[i].opFormID}\`)' style='margin-right: 5px;'>`;
            strHTML += "<i class='las la-search mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>แสดงฟอร์ม<span>"
            strHTML += "</button>"
            // } else {
            //     strHTML += "<button id='btnEditDoc" + (i + 1) + "' type='button' class='btn btn-warning btn-sm'; onclick='fnEditDocConfig()' style='margin-right: 5px;'>"
            //     strHTML += "<i class='las la-search mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>แสดงฟอร์ม<span>"
            //     strHTML += "</button>"
            // }
        
            if (dataSQL[i].opStatusName !== 'success') {
                strHTML += `<button id='btnSetStatus${i + 1}' type='button' class='btn btn-primary btn-sm' onclick='fnSetStatusDocConfig(\`${dataSQL[i].id}\`,\`${sideId}\`,\`${namePages}\`)' data-bs-toggle='modal' data-bs-target='#setStatusDocModal' style='margin-right: 5px;'>`;
                strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>บันทึกสถานะ<span>"
                strHTML += "</button>"
            } else {
                strHTML += "<button id='btnSetStatus" + (i + 1) + "' type='button' class='btn btn-primary btn-sm'; onclick='fnSetStatusDocConfig()' style='margin-right: 5px;'>"
                strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>บันทึกสถานะ<span>"
                strHTML += "</button>"
            }
            strHTML += "</td>"
        strHTML += "</tr>"
        }
    } else {
        strHTML += "<tr>";
        strHTML += `<td colspan='6' class='text-center align-top' style='width: 100%;'>`;
        strHTML += ` <span id='spanNotHaveData'>ไม่พบข้อมูล</span> `;
        strHTML += "<tr>";
    }
    return strHTML
}

function fnGetDataTrUser(access, data, sideId, namePages) {
    var strHTML = "";
    // Determine the status badge
    var badgeClass = "";
    var badgeText = "";
    var strComment = "";
    for (var i = 0; i < data.length; i++) {
        var rowIndex = i + 1;
        var item = data[i];
        var commentButtonId = "btnViewComment" + rowIndex;
        var editButtonId = "btnEditDoc" + rowIndex;
        
        strHTML += "<tr>";
        strHTML += "<td id='No" + rowIndex + "' class='text-center align-middle fristTD' style='width: 5%;'>";
        strHTML += (i + 1);
        strHTML += "<input type='hidden' id='idQuota" + rowIndex + "' value='" + item.id + "'/>";
        strHTML += "</td>";
        
        strHTML += "<td id='opSideName" + rowIndex + "' class='text-center align-middle' style='width: 55%; white-space: pre-wrap;'>";
        strHTML += (item.opSideName ? item.opSideName : "-");
        strHTML += "</td>";
        
        strHTML += "<td id='opFormName" + rowIndex + "' class='text-center align-middle' style='width: 55%; white-space: pre-wrap;'>";
        strHTML += (item.opFormName ? item.opFormName : "-");
        strHTML += "</td>";
        
        switch (item.opStatusName) {
            case 'success':
                badgeClass = 'bg-label-success';
                badgeText = 'สมบูรณ์ครบถ้วน';
                break;
            case 'incomplete':
                badgeClass = 'bg-label-incomplete';
                badgeText = 'เอกสารไม่สมบูรณ์';
                break;
            case 'warning':
                badgeClass = 'bg-label-warning';
                badgeText = 'กำลังดำเนินการ';
                break;
            default:
                badgeClass = 'bg-label-notprocess';
                badgeText = 'ยังไม่ดำเนินการ';
                break;
        }
        
        strHTML += "<td id='status" + rowIndex + "' class='text-center align-middle' style='width: 10%;'>";
        strHTML += "<div class='colorCircle'>";
        strHTML += "<span class='badge " + badgeClass + " me-1'>" + badgeText + "</span>";
        strHTML += "</div>";
        strHTML += "</td>";
        
        strHTML += "<td class='text-center align-middle lastTD'>";
        
        // Comment button
        if (item.comment && item.opStatusName !== 'success') {
            strHTML += `<button id='${commentButtonId}' type='button' class='btn btn-success btn-sm' onclick='fnSetCommentUserConfig("view", \`${sideId}\`, \`${item.comment}\`, \`${item.id}\`,\`${item.opStatusName}\`)';  data-bs-toggle='modal' data-bs-target='#conmentModal' style='margin-right: 5px;'>`;
            strHTML += "<i class='las la-comment-alt mr-1' aria-hidden='true' style='margin-right:5px'></i><span>คำแนะนำ</span>";
            strHTML += "<span class='icon-button__badge'>1</span>";
            strHTML += "</button>";
        } else {
            strHTML += `<button id='${commentButtonId}' type='button' class='btn btn-success btn-sm' onclick='fnSetCommentUserConfig("view", \`${sideId}\`, \`${item.comment}\`, \`${item.id}\`,\`${item.opStatusName}\`)'; style='margin-right: 5px;'>`;
            strHTML += "<i class='las la-comment-alt mr-1' aria-hidden='true' style='margin-right:5px'></i><span>คำแนะนำ</span>";
            strHTML += "</button>";
        }
        
        // Edit button
        // if (item.opStatusName !== 'notprocess') {
            strHTML += `<button id='${editButtonId}' type='button' class='btn btn-warning btn-sm' onclick='fnEditDocConfig(\`${access}\`, \`${item.userID}\`, \`${namePages}\`, \`${item.opStatusID}\`, \`${item.opSideID}\`, \`${item.opFormID}\`)' style='margin-right: 5px;'>`;
            strHTML += "<i class='las la-pen mr-1' aria-hidden='true' style='margin-right:5px'></i><span>การแก้ไข</span>";
            strHTML += "</button>";
        // } else {
        //     strHTML += "<button id='" + editButtonId + "' type='button' class='btn btn-warning btn-sm' onclick='fnEditDocConfig()' style='margin-right: 5px;'>";
        //     strHTML += "<i class='las la-pen mr-1' aria-hidden='true' style='margin-right:5px'></i><span>การแก้ไข</span>";
        //     strHTML += "</button>";
        // }
        
        strHTML += "</td>";
        strHTML += "</tr>";
    }
    
    return strHTML;
}

function fnGetDataModal() {
    var arrData = fnGetDataInternalControl() // call function get data
    var strHTML = ''
    var strHTML2 = ''

    // draw modal
    strHTML += " <div class='mb-3'> "
    strHTML += " <label for='headCheckTopic' class='lableHead'>หัวข้อที่ตรวจสอบ</label> "
    strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='"+ arrData[0].opSideName +"' readonly> "
    strHTML += " </div> "

    strHTML += " <div class='mb-3'> "
    strHTML += " <label for='nameMenuCheck' class='lableHead'>ชื่อรายการที่ตรวจสอบ</label> "
    strHTML += " <select id='slNameRates' class='form-select' style='width: 466px;white-space: nowrap;'> "
    strHTML += " <option style='width: 100%;white-space: nowrap;' value=''>เลือกรายการที่ตรวจสอบ</option> "
    for (var i = 0; i < arrData.length; i++) {
        strHTML += "<option style='width: 100%white-space: nowrap;' value='" + arrData[i].id +"'>"+ arrData[i].opFormName  +"</option>"
    }
    strHTML += " </select> "
    strHTML += " </div> "

    strHTML += " <div> "
    strHTML += "     <label for='InputDocument' class='lableHead'>เอกสารที่แนบ</label> "
    strHTML += " </div> "
    strHTML += " <div class='mb-3'> "
    strHTML += "     <div class='form-check form-check-inline'> "
    strHTML += "     <input class='form-check-input' type='radio' name='flexRadioDefault' id='radioHaveFile' value='havefile' checked> "
    strHTML += "     <label class='lableInput' for='radioHaveFile'>มีเอกสารที่แนบ</label> "
    strHTML += " </div> "
    strHTML += " <div class='form-check form-check-inline'> "
    strHTML += " <input class='form-check-input' type='radio' name='flexRadioDefault' id='radioNotFile' value='notfile'> "
    strHTML += " <label class='lableInput' for='radioNotFile'>ไม่มีเอกสารที่แนบ</label> "
    strHTML += " </div> "
    strHTML += " </div> "
    strHTML += " <div id='dvuploadfile' class='mb-3'> "
    strHTML += " <label for='formFile' class='lableHead'>ไฟล์ที่แนบ</label> "
    strHTML += " <input class='form-control form-control-sm' id='formFile' type='file'> "
    strHTML += " </div> "


    strHTML2 += " <button type='button' class='btn btn-primary'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "            


    $("#dvBodyModalAssessment")[0].innerHTML = strHTML
    $("#dvFooterModalAssessment")[0].innerHTML = strHTML2
    
    fnChangeSizeSelect("slNameRates") //ปรับขนาด select
    
}

async function fnGetDataSelect(access ,sideId) {
    // var arrData = fnGetDataRates() // call function get data
    var strHTML = ''
    var username = fnGetCookie("username")
    var dataSQL = await fnGetDataUserControl(username)
    // draw modal
    strHTML += " <div class='row mb-3'>"

    strHTML += " <div class='col-sm-2 ms-auto' style='width: 170px;'>"
    strHTML += " <select id='selectUnit' class='form-select text-center' aria-label='Default select example'>"
    strHTML += " <option value='' selected>หน่วยรับตรวจ</option>"
    for (var i = 0; i < dataSQL.length; i++) {
        strHTML += "<option value='"+ dataSQL[i].id + "'>"+ dataSQL[i].shortName +"</option>"
    }
    strHTML += " </select>"
    strHTML += " </div>"

    strHTML += " <div class='col-sm-2'>"
    strHTML += " <select id='selectBudget' class='form-select text-center' aria-label='Default select example'>"
    strHTML += " <option value='2567' selected>งบปี ๖๗</option>"
    strHTML += " <option value='2568'>งบปี ๖๘</option>"
    strHTML += " <option value='2569'>งบปี ๖๙</option>"
    strHTML += " <option value='2570'>งบปี ๗๐</option>"
    strHTML += " </select>"
    strHTML += " </div>"

    strHTML += " <div class='col-sm-2'>"
    strHTML += " <select id='selectStatus' class='form-select text-center' aria-label='Default select example'>"
    strHTML += " <option value='' selected>สถานะ</option>"
    strHTML += " <option value='notprocess'>ยังไม่ดำเนินการ</option>"
    strHTML += " <option value='warning'>รอการตรวจสอบ</option>"
    strHTML += " <option value='incomplete'>เอกสารไม่สมบูรณ์</option>"
    strHTML += " <option value='success'>สมบูรณ์ครบถ้วน</option>"
    strHTML += " </select>"
    strHTML += " </div>"

    strHTML += " </div>"

    // document.getElementById("dvHeadSelectAssessment").innerHTML = strHTML
    $("#dvHeadSelectAssessment")[0].innerHTML = strHTML

    $('#selectUnit').on('change', function() {
        fnDrawTable(access ,sideId)
    });

    $('#selectBudget').on('change', function() {
        fnDrawTable(access ,sideId)
    });

    $('#selectStatus').on('change', function() {
        fnDrawTable(access ,sideId)
    });
    
}

async function fnGetResultDocCondition(unitId,sideId,strYear,strStatus) {
    var dataSend = {
        unitId : unitId,
        sideId : sideId,
        year : strYear,
        status : strStatus
    }    
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultDocCondition', dataSend)
        var res = response.data.result
        if (res.length > 0) {
            return res
        } else {
            return []
        }
    } catch (error) {
        await Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'ลองใหม่อีกครั้ง',
            icon: 'error'
        })
        return []
    }
}

async function fnGetDataUserControl(username) {
    var dataSend = {
        username: username
    }

    try {
        const response = await axios.post('http://localhost:3000/api/user/fnGetUserControl', dataSend)
        var res = response.data
        if (res.length > 0) {
            return res
        } else {
            return []
        }
    } catch (error) {
        await Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'userId หรือ sideId ไม่ถูกต้อง',
            icon: 'error'
        })
        return []
    }
}

function fnSetCommentUserConfig(action, sideId, comment, userId, statusDoc) {
    var strHTML = '';
    var strHTML2 = '';
    if (action === 'set') {
        if (statusDoc !== 'success') {
            strHTML = `
                <div class='form-group'>
                    <input type='hidden' id='inputIdUsers' class='form-control' value='${userId}'>
                    <input type='hidden' id='inputIdSides' class='form-control' value='${sideId}'>
                    <label for='textCommentArea'>กรอกความคิดเห็น</label>
                    <textarea class='form-control' id='textCommentArea' style='height: 250px;'>${comment === 'null' ? '' : comment}</textarea>
                    <div id='textCommentAreaError' class='error' style='display:none;'>กรุณาใส่ความคิดเห็น</div>
                </div>
            `;

            strHTML2 = `
                <button type='button' id='submitCommentButton' class='btn btn-primary'>บันทึกข้อมูล</button>
                <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button>
            `;

            $("#dvBodyConmentModal").html(strHTML);
            $("#dvFooterConmentModal").html(strHTML2);
            
            $('#submitCommentButton').on('click', fnSubmitCommentModal);

        } else {
            Swal.fire({
                title: "",
                text: "สถานะของเอกสารสมบูรณ์ครบถ้วนแล้ว",
                icon: "warning"
            }).then((result) => {
                if (result.isConfirmed) {
                    $('#conmentModal').modal('hide');
                    $('.modal-backdrop').remove();
                }
            });
            
        }
    } else { // view
        console.log('test')
        if (comment && comment !== 'null') {
            strHTML = `
                <div id='dvTextComment'>
                    <span id='textComment' name='textComment' style='text-indent: 17px;'>${comment === 'null' ? '' : comment}</span>
                </div>
            `;
        } else {
            Swal.fire({
                title: "",
                text: "ยังไม่มีคอมเมนต์จากผู้ประเมิน",
                icon: "warning"
            }).then((result) => {
                if (result.isConfirmed) {
                    $('#conmentModal').modal('hide');
                    $('.modal-backdrop').remove();
                }
            });
        }

        $("#dvBodyConmentModal").html(strHTML);
    }
    $('#conmentModal').on('hidden.bs.modal', function () {
        $('body').removeClass('modal-open'); // ลบคลาส modal-open เพื่อให้แน่ใจว่าไม่มีการปิดการเลื่อน
        $('.modal-backdrop').remove(); // ลบ backdrop ของ modal ออกเพื่อความแน่ใจ
        document.body.style.overflow = 'auto'; // รีเซ็ตค่า overflow ให้สามารถเลื่อนหน้าเว็บได้
    });
}

function fnSubmitCommentModal() {
    if (fnValidateCommentForm()) {
        const strIdUserDoc = $('#inputIdUsers').val();''
        const strIdSide = $('#inputIdSides').val();
        const strUsername = fnGetCookie("username")
        const strTextComment = $('#textCommentArea').val();

        const selectUnitId = $('#selectUnit').val() || ''
        const selectYear = $('#selectBudget').val() || ''
        const selectStatus = $('#selectStatus').val() || ''

        const data =  {
            idUserDoc: strIdUserDoc,
            username: strUsername,
            comment: strTextComment
        };

        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลความคิดเห็นใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const results = await fnSetDataComment(data)
                    if (results && results == 'success' ) {
                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                location.reload();
                                $('#conmentModal').modal('hide');
                                $('.modal-backdrop').remove();
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "",
                            text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
                            icon: "error"
                        });
                    }    
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
}

function fnValidateCommentForm() {
    let isValid = true;

    // Validate evaluator text
    const inputComment = $('#textCommentArea').val();
    if (!inputComment) {
        $('#textCommentAreaError').show();
        isValid = false;
    } else {
        $('#textCommentAreaError').hide();
    }

    return isValid;
}

function fnEditDocConfig(access, userID, namePages, statusID, sideID, formID) {
    const menuItems = [
        { id: '2', page: 'Questionnaire', text: 'แบบสอบถาม' },
        { id: '3', page: 'AssessmentForm', text: 'แบบประเมิน' },
        { id: '4', page: 'PerformanceEVForm', text: 'แบบ ปม.' },
        { id: '5', page: 'reportAssessmentPK4', text: 'แบบ ปค.๔' },
        { id: '6', page: 'reportAssessmentPK5', text: 'แบบ ปค.๕' },
        { id: '7', page: 'reportAssessmentFollowPK5', text: 'แบบติดตาม ปค.๕' }
    ];

    const foundItem = menuItems.find(item => item.id === formID);

    if (!foundItem) {
        console.log('ไม่พบ item ที่มี id เท่ากับ ' + formID);
        return;
    }

    const { page: strPages, text: strTexts } = foundItem;

    if (statusID != 1) { 
        let targetPage = `http://localhost/Front-end/pages/control/${strPages}.html?sides=${namePages}`;
        if (access === 'admin') {
            targetPage += `&userId=${userID}`;
        }
        window.open(targetPage, '_blank');
    } else {
        Swal.fire({
            title: "",
            html: access === 'admin' 
                ? `ฟอร์ม ${strTexts} ยังไม่ถูกสร้าง`
                : `กรุณาสร้างฟอร์ม ${strTexts} ก่อน <br> เนื่องจากยังไม่มีฟอร์มดังกล่าว`,
            icon: "warning"
        });
    }
}


function fnSetStatusDocConfig (userDocId, sideId, nameSides) {
    var strHTML = ''
    var strHTML2 = ''
    var arrSides = [
        {id:2,  key: 'branchpersonal', NameSides: 'ด้านกำลังพล',value: 4 },
        {id:3,  key: 'branchoperation',NameSides: 'ด้านการยุทธการ', value: 3 },
        {id:4,  key: 'branchnews',NameSides: 'ด้านการข่าว', value: 7 },
        {id:5,  key: 'branchlogistics',NameSides: 'ด้านส่งกำลังบำรุง', value: 7 },
        {id:6,  key: 'branchcommunication',NameSides: 'ด้านสื่อสาร', value: 5 },
        {id:7,  key: 'branchtechnology',NameSides: 'ด้านระบบเทคโนโลยีในการบริหารจัดการ', value: 3 },
        {id:8,  key: 'branchcivilaffairs',NameSides: 'ด้านกิจการพลเรือน', value: 4 },
        {id:9,  key: 'branchbudget',NameSides: 'ด้านการงบประมาณ', value: 6 },
        {id:10,  key: 'branchfinanceandacc',NameSides: 'ด้านการเงินและการบัญชี', value: 6 },
        {id:11,  key: 'branchparcelsandproperty',NameSides: 'ด้านพัสดุและทรัพย์สิน', value: 8 },
    ];

    if (userDocId) {
        var arrMatch = arrSides.find(item => item.key === nameSides.toLowerCase());

        strHTML += " <div class='form-group'> ";
        strHTML += " <input type='hidden' id='inputIdUsers' class='form-control' value='" + userDocId + "' > "
        strHTML += " <input type='hidden' id='inputIdSides' class='form-control' value='" + sideId + "'> "
        strHTML += " <input type='hidden' id='inputStrSide' class='form-control' value='" + nameSides + "'> " 
        strHTML += " <label for='inputNameSide'>ด้านที่ประเมิน</label> ";
        strHTML += " <input type='text' id='inputNameSide' class='form-control' value='" + arrMatch.NameSides + "' readonly> ";
        strHTML += " </div> ";

        strHTML += "<div class='form-group mt-2'>";
        strHTML += "    <label for='inputNameSide'>ผลการตรวจสอบ</label>";
        strHTML += "    <div class='d-flex align-items-center'>";
        strHTML += "    <div class='form-check me-3'>";
        strHTML += "        <input class='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='complete'>";
        strHTML += "        <label class='form-check-label' for='inlineRadio1'>ตรวจสอบแล้ว</label>";
        strHTML += "    </div>";
        strHTML += "    <div class='form-check'>";
        strHTML += "        <input class='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio2' value='incomplete'>";
        strHTML += "        <label class='form-check-label' for='inlineRadio2'>ไม่ผ่านการตรวจสอบ</label>";
        strHTML += "    </div>";
        strHTML += "    </div>";
        strHTML += "    <div id='inputReasonError' class='error' style='display:none;'>กรุณาเลือกสถานะ</div> ";
        strHTML += "    <div id='textareaContainer' style='display:none;'>";
        strHTML += "        <textarea class='form-control' id='reasonTextarea' rows='3' placeholder='กรุณาระบุเหตุผล'></textarea>";
        strHTML += "    <div id='textReasonAreaError' class='error' style='display:none;'>กรุณาระบุเหตุผล</div> ";
        strHTML += "    </div>";
        strHTML += "</div>";

 
        strHTML2 += " <button type='button' id='submitSetStatusDocButton' class='btn btn-primary'>บันทึกข้อมูล</button>  "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "
        
        $("#dvBodySetStatusDocModal")[0].innerHTML = strHTML
        $("#dvFooterSetStatusDocModal")[0].innerHTML = strHTML2

        $('#submitSetStatusDocButton').on('click', fnSubmitSetStatusDocModal);

        $('input[name="inlineRadioOptions"]').on('change', function() {
            if ($('#inlineRadio2').is(':checked')) {
                $('#textareaContainer').show();
            } else {
                $('#textareaContainer').hide();
            }
        });

        $('#setStatusDocModal').on('hidden.bs.modal', function () {
            $('body').removeClass('modal-open'); // ลบคลาส modal-open เพื่อให้แน่ใจว่าไม่มีการปิดการเลื่อน
            $('.modal-backdrop').remove(); // ลบ backdrop ของ modal ออกเพื่อความแน่ใจ
            document.body.style.overflow = 'auto'; // รีเซ็ตค่า overflow ให้สามารถเลื่อนหน้าเว็บได้
        });

    } else {
        Swal.fire({
            title: "",
            text: "สถานะเอกสารถูกบันทึกเรียบร้อยแล้ว",
            icon: "warning"
        });
    }
}

function fnSubmitSetStatusDocModal () {
    if (fnValidateSetStatusDocForm()) {
        const strIdUserDoc = $('#inputIdUsers').val();
        const strIdSide = $('#inputIdSides').val();
        const strNameSide = $('#inputStrSide').val();
        const strUsername = fnGetCookie("username")
        const strTextComment = $('#reasonTextarea').val();
        const strStatus = $('input[name="inlineRadioOptions"]:checked').val()

        // const selectUnitId = $('#selectUnit').val() || ''
        // const selectYear = $('#selectBudget').val() || ''
        // const selectStatus = $('#selectStatus').val() || ''

        const data =  {
            idUserDoc: strIdUserDoc,
            username: strUsername,
            comment: strTextComment,
            status: strStatus
        };

        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลสถานะเอกสารใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const results = await fnSetDataComment(data)
                    if (results && results == 'success' ) {
                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                location.reload();
                                $('#setStatusDocModal').modal('hide');
                                $('.modal-backdrop').remove();
                            }
                        });

                    } else {
                        Swal.fire({
                            title: "",
                            text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
                            icon: "error"
                        });
                    }    
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
}

function fnValidateSetStatusDocForm () {
    let isValid = true;

    // Validate evaluator text
    const inputRadio = $('input[name="inlineRadioOptions"]:checked').val()
    if (!inputRadio) {
        $('#inputReasonError').show();
        isValid = false;
    } else {
        $('#inputReasonError').hide();
        if (inputRadio === 'incomplete') {
            const inputTextArea = $('#reasonTextarea').val();
            if (!inputTextArea) {
                $('#textReasonAreaError').show()
                isValid = false;
            } else {
                $('#textReasonAreaError').hide()
            }
        } else {
            $('#textReasonAreaError').hide()
        }
    }

    return isValid;
}
// function fnUploadDocConfig (username, sideName, formName) {
//     var strHTML = ''
//     var strHTML2 = ''

//     // draw modal
//     strHTML += " <div class='mb-3'> "
//     strHTML += " <label for='headCheckTopic' class='lableHead'>หัวข้อที่ตรวจสอบ</label> "
//     strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='"+ sideName +"' readonly> "
//     strHTML += " </div> "

//     strHTML += " <div class='mb-3'> "
//     strHTML += " <label for='headCheckTopic' class='lableHead'>ชื่อรายการเอกสาร</label> "
//     strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='"+ formName +"' readonly> "
//     strHTML += " </div> "

//     strHTML += " <div id='dvuploadfile' class='mb-3'> "
//     strHTML += " <label for='formFile' class='lableHead'>ไฟล์ที่แนบ</label> "
//     strHTML += " <input class='form-control form-control-sm' id='formFile' type='file'> "
//     strHTML += " </div> "


//     strHTML2 += " <button type='button' class='btn btn-primary'>บันทึกข้อมูล</button> "
//     strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "            


//     $("#dvBodyUploadDocModal")[0].innerHTML = strHTML
//     $("#dvFooterUploadDocModal")[0].innerHTML = strHTML2

// }
// function fnViewDocConfig (fileName, fileSave , filePath ) {
//     var strFileName = fileName
//     var strFileSave = fileSave
//     var strFilePath = filePath
//     if (strFileName && strFileSave && strFilePath) {
//         // ทำตัว modal ที่ เก็บไฟล์ pdf

//     } else {
//         Swal.fire({
//             title: "",
//             text: "กรุณาอัปโหลดเอกสาร เนื่องจากยังไม่มีเอกสารดังกล่าว",
//             icon: "warning"
//         });
//     }
// }

function fnUploadSignatureConfig (username, sideName) {
    var strHTML = ''
    var strHTML2 = ''

    // draw modal
    strHTML += " <div class='mb-3'> "
    strHTML += " <label for='headCheckTopic' class='lableHead'>หัวข้อที่ตรวจสอบ</label> "
    strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='" + sideName + "' readonly> "
    strHTML += " </div> "

    strHTML += " <div id='dvuploadfile' class='mb-3'> "
    strHTML += " <label for='formFile' class='lableHead'>ไฟล์ลายเซ็น</label> "
    strHTML += " <input class='form-control form-control-sm' id='formFile' type='file'> "
    strHTML += " </div> "


    strHTML2 += " <button type='button' id='btnSaveUploadSignature' class='btn btn-primary'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "            


    $("#dvBodyUploadSignatureModal")[0].innerHTML = strHTML
    $("#dvFooterUploadSignatureModal")[0].innerHTML = strHTML2

}

function fnExportSignatureConfig (signPath) {
    var strSignPath = signPath
    if (strSignPath) {

    } else {
        Swal.fire({
            title: "",
            text: "กรุณาอัปโหลดลายเซ็น เนื่องจากยังไม่มีลายเซ็นดังกล่าว",
            icon: "warning"
        });
    }
}

function fnChangeSizeSelect(name) {
    var selectElement = document.getElementById(name);

    // กำหนดความยาวสูงสุดของ select element ให้เท่ากับ 200px
    selectElement.style.width = "466px";

    // ปรับความยาวของ option elements ให้ไม่เกิน 200px โดยใช้ JavaScript
    var options = selectElement.getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
        if (options[i].textContent.length > 50) {
            options[i].textContent = options[i].textContent.substr(0, 50) + "..."; // ตัดข้อความให้สั้นลง
          }
    }
}

function fnMergeColumn(tableSelector, data) {
    if (data) {
        // เลือกเซลล์ในคอลัมน์ที่สองของตารางที่เจาะจง
        var cellsInSecondColumn = $(tableSelector + ' tr td:nth-child(2):not(:first-child)');

        // สร้างออบเจ็กต์เพื่อเก็บข้อมูลที่มีอยู่แล้วในคอลัมน์ที่สอง
        var dataSeenInSecondColumn = {};

        // วนลูปผ่านเซลล์ในคอลัมน์ที่สอง
        cellsInSecondColumn.each(function() {
            var cellText = $(this).text();
            // ตรวจสอบว่าข้อมูลในเซลล์มีอยู่ในออบเจ็กต์เราแล้วหรือไม่
            if (dataSeenInSecondColumn.hasOwnProperty(cellText)) {
                // หากมีอยู่แล้ว เพิ่มเนื้อหาของเซลล์นี้ไปยังเซลล์ที่มีข้อมูลเหมือนกัน
                dataSeenInSecondColumn[cellText].rowspan++;
                $(this).hide(); // ซ่อนเซลล์ที่รวมเข้าไป
            } else {
                // หากไม่มีอยู่ในออบเจ็กต์เรา สร้างใหม่และกำหนด rowspan เป็น 1
                dataSeenInSecondColumn[cellText] = {
                    element: $(this),
                    rowspan: 1
                };
            }
        });

        // อัปเดตค่า rowspan สำหรับเซลล์ที่รวมไว้
        $.each(dataSeenInSecondColumn, function(key, value) {
            value.element.attr('rowspan', value.rowspan);
            value.element.css('vertical-align', 'middle');
        });

        // วนลูปผ่านเซลล์ในคอลัมน์ที่สองโดยไม่รวมเซลล์แรก
        $(tableSelector + ' tr td:nth-child(2)').each(function(index, element) {
            if (index !== 0) {
                $(element).css('border', '1px solid black');
            }
        });
    }
}


async function fnSetDataComment(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnUpdateCommentForAdmin', dataSend)
        var res = response.data.result
        if (res.length > 0) {
            return res
        } else {
            return []
        }
    } catch (error) {
        await Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'การบันทึกข้อมูลไม่สำเร็จ กรุณาติดต่อ admin',
            icon: 'error'
        })
        return []
    }
}

async function fnSetDataStatusDoc(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnUpdateStatusDocForAdmin', dataSend)
        var res = response.data.result
        if (res.length > 0) {
            return res
        } else {
            return []
        }
    } catch (error) {
        await Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'การบันทึกข้อมูลไม่สำเร็จ กรุณาติดต่อ admin',
            icon: 'error'
        })
        return []
    }
}



