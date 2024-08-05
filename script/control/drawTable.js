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
    strHTML += "<td class='text-center textHeadTable' style='font-size: 18px;'>ลายเซ็น</td>"
    return strHTML
}

async function fnDrawTable(access ,sideId ,objData) {
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
        strHTML += await fnGetDataTrAdmin(sideId)
    } else {
        strHTML += await fnGetDataTrUser(data)
    }

    strHTML += "</tbody>"
    strHTML += "</table>"

    $("#dvContentTable")[0].innerHTML = strHTML

    //merge column
    fnMergeColumn('#tb_Form', true);
}

async function fnGetDataTrAdmin(sideId) {
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
            if (dataSQL[i].comment) {
                strHTML += "<button id='btnSetComment" + (i + 1) + "' type='button' class='btn btn-success btn-sm'; onclick='fnViewCommentConfig(\"" + dataSQL[i].comment + "\")' data-bs-toggle='modal' data-bs-target='#conmentModal' style='margin-right: 5px;'>"
                strHTML += "<i class='las la-comment-alt mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>คำแนะนำ</span>"
                strHTML += "<span class='icon-button__badge'>1</span>"
                strHTML += "</button>"
            } else {
                strHTML += "<button id='btnSetComment" + (i + 1) + "' type='button' class='btn btn-success btn-sm'; style='margin-right: 5px;'>"
                strHTML += "<i class='las la-comment-alt mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>คำแนะนำ</span>"
                strHTML += "</button>"
            }
            if (dataSQL[i].opStatusName !== 'notprocess') {
                strHTML += "<button id='btnEditDoc" + (i + 1) + "' type='button' class='btn btn-warning btn-sm'; onclick='fnEditDocConfig(\"" + dataSQL[i].userID + "\",\"" + dataSQL[i].opSideID + "\",\"" + dataSQL[i].opFormID + "\",\"" + dataSQL[i].opStatusID + "\")' style='margin-right: 5px;'>"
                strHTML += "<i class='las la-search mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>แสดงฟอร์ม<span>"
                strHTML += "</button>"
            } else {
                strHTML += "<button id='btnEditDoc" + (i + 1) + "' type='button' class='btn btn-warning btn-sm'; onclick='fnEditDocConfig()' style='margin-right: 5px;'>"
                strHTML += "<i class='las la-search mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>แสดงฟอร์ม<span>"
                strHTML += "</button>"
            }
        
            if (dataSQL[i].opStatusName !== 'success') {
                strHTML += "<button id='btnSetStatus" + (i + 1) + "' type='button' class='btn btn-primary btn-sm'; onclick='fnSetStatusConfig(\"" + dataSQL[i].userID + "\",\"" + dataSQL[i].opSideID + "\",\"" + dataSQL[i].opFormID + "\",\"" + dataSQL[i].opStatusID + "\")' style='margin-right: 5px;'>"
                strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>บันทึกสถานะ<span>"
                strHTML += "</button>"
            } else {
                strHTML += "<button id='btnSetStatus" + (i + 1) + "' type='button' class='btn btn-primary btn-sm'; onclick='fnSetStatusConfig()' style='margin-right: 5px;'>"
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

function fnGetDataTrUser(data) {
    var strHTML = ""
    for (var i = 0; i < data.length; i++) {
        strHTML += "<tr>"
        strHTML += "<td id='No" + (i + 1) + "' class='text-center align-middle fristTD' style='width: 5%;'>" + (i + 1) + "<input type='hidden' id='idQuota" + (i + 1) + "' value='"+ data[i].userID +"'/></td>"
        strHTML += "<td id='opSideName" + (i + 1) + "'  class='text-center align-middle' style='width: 55%;white-space: pre-wrap;'>" + (data[i].opSideName ? (data[i].opSideName) : '-') + "</td>"
        strHTML += "<td id='opFormName" + (i + 1) + "'  class='text-center align-middle' style='width: 55%;white-space: pre-wrap;'>" + (data[i].opFormName ? (data[i].opFormName) : '-') + "</td>"
    
        if (data[i].opStatusName == 'success') {
            strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-success me-1'>สมบูรณ์ครบถ้วน</span></div></td>"
        } else if (data[i].opStatusName == 'incomplete') {
            strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-incomplete me-1'>เอกสารไม่สมบูรณ์</span></div></td>"
        } else if (data[i].opStatusName == 'warning') {
            strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-warning me-1'>รอการตรวจสอบ</span></div></td>"
        } else {
            strHTML += "<td id='status" + (i + 1) + "'  class='text-center align-middle'style='width: 10%; align-middle'><div class='colorCircle'><span class='badge bg-label-notprocess me-1'>ยังไม่ดำเนินการ</span></div></td>"
        }
    
        strHTML += "<td class='text-center align-middle lastTD'>"
        if (data[i].comment) {
            strHTML += "<button id='btnViewComment" + (i + 1) + "' type='button' class='btn btn-success btn-sm'; onclick='fnViewCommentConfig(\"" + data[i].comment + "\")' data-bs-toggle='modal' data-bs-target='#conmentModal' style='margin-right: 5px;'>"
            strHTML += "<i class='las la-comment-alt mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>คำแนะนำ</span>"
            strHTML += "<span class='icon-button__badge'>1</span>"
            strHTML += "</button>"
        } else {
            strHTML += "<button id='btnViewComment" + (i + 1) + "' type='button' class='btn btn-success btn-sm'; style='margin-right: 5px;'>"
            strHTML += "<i class='las la-comment-alt mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>คำแนะนำ</span>"
            strHTML += "</button>"
        }
    
        if (data[i].opStatusName !== 'notprocess') {
            strHTML += "<button id='btnEditDoc" + (i + 1) + "' type='button' class='btn btn-warning btn-sm'; onclick='fnEditDocConfig(\"" + data[i].userID + "\",\"" + data[i].opSideID + "\",\"" + data[i].opFormID + "\",\"" + data[i].opStatusID + "\")' style='margin-right: 5px;'>"
            strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>การแก้ไข<span>"
            strHTML += "</button>"
        } else {
            strHTML += "<button id='btnEditDoc" + (i + 1) + "' type='button' class='btn btn-warning btn-sm'; onclick='fnEditDocConfig()' style='margin-right: 5px;'>"
            strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>การแก้ไข<span>"
            strHTML += "</button>"
        }
        strHTML += "</td>"
    
        // Add signature button
        if ( i === 0 ) {
            strHTML += "<td rowspan='3' class='text-center align-middle lastTD'>"
    
            strHTML += "<button id='btnUploadSignature" + (i + 1) + "' type='button' class='btn btn-info btn-sm'; onclick='fnUploadSignatureConfig(\"" + data[i].username + "\",\"" + data[i].opSideName + "\")' data-bs-toggle='modal' data-bs-target='#uploadSignatureModal' style='margin-right: 5px;'>"
            strHTML += "<i class='las la-upload mr-1' aria-hidden=;'true' style='margin-left:5px'></i><span>อัปโหลด<span>"
            strHTML += "</button>"
    
            if (data[i].signPath) {
                strHTML += "<button id='btnViewSignature" + (i + 1) + "' type='button' class='btn btn-primary btn-sm'; onclick='fnExportSignatureConfig(\"" + data[i].signPath + "\")'>"
                strHTML += "<i class='las la-file-pdf mr-1' aria-hidden=;'true' style='margin-left:5px'></i><span>ดูเอกสาร<span>"
                strHTML += "</button>"
            } else {
                strHTML += "<button id='btnViewSignature" + (i + 1) + "' type='button' class='btn btn-primary btn-sm'; onclick='fnExportSignatureConfig()'>"
                strHTML += "<i class='las la-file-pdf mr-1' aria-hidden=;'true' style='margin-left:5px'></i><span>ดูเอกสาร<span>"
                strHTML += "</button>"
            }
    
    
            strHTML += "</td>"
        }
        strHTML += "</tr>"
    }
    return strHTML
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

    strHTML += " <div class='col-sm-2 ms-auto'>"
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

function fnViewCommentConfig(text) {
    var strHTML = ''
        // draw modal
        strHTML += "<div id='dvTextComment'>";
        strHTML += "<span id='textComment' name='textComment' style='text-indent: 17px;'>" + text + "</span>";
        strHTML += "</div>";
    

        $("#dvBodyConmentModal")[0].innerHTML = strHTML
    

}

function fnEditDocConfig (userID, sideID , formID , statusID) {

    if (userID && sideID && formID && statusID) {
        // เหลือ สร้าง windows ให้ link ไปอีกหน้า
        
    } else {
        Swal.fire({
            title: "",
            text: "กรุณาสร้างแบบฟอร์ม เนื่องจากยังไม่มีแบบฟอร์มดังกล่าว",
            icon: "warning"
        });
    }
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


