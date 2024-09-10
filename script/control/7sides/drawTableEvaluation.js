function fnSetHeader(){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>จุดที่ควรประเมิน</th>"
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>ความเห็น/คำอธิบาย</th>"
    return strHTML
}
async function fnDrawTableForm(access,valSides) {
    var strUserId = ""
    if (access === 'admin') {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        strUserId = urlParams.get('userId')
    } else {
        strUserId = fnGetCookie("userId");
    }
    var strSides = valSides.toLowerCase()
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

    var index = arrSides.findIndex(item => item.key === strSides);
    var selectedSide;
    if (index !== -1) {
        selectedSide = arrSides[index]; // ใช้ค่า object ที่พบ
    } else {
        selectedSide = {id:11, key: 'branchparcelsandproperty', NameSides: 'ด้านพัสดุและทรัพย์สิน', value: 8 };
    }
    
    var idSideFix = selectedSide.id; // ใช้ id ของ object ที่เลือก
    
    /* start call data ส่วนชื่อหน่วยงาน ส่วนสรุป และลายเซ็น */

    var dataASM = await fnGetDataResultASM(strUserId,idSideFix)
    var dataConASMSQL = await fnGetDataResultConASM(strUserId, idSideFix)

    var strResultDocSQL= await fnGetDataResultDoc(strUserId, idSideFix)

    // ตรวจสอบว่า dataSummary มีข้อมูลและไม่เป็น undefined หรือ null
    var idConASM = (dataConASMSQL && dataConASMSQL.length > 0) ? dataConASMSQL[0].id : '';
    var descConASM = (dataConASMSQL && dataConASMSQL.length > 0) ? dataConASMSQL[0].descConASM : '';
    var prefixAsessor = (dataConASMSQL && dataConASMSQL.length > 0) ? dataConASMSQL[0].prefixAsessor : '';
    var signPath = (dataConASMSQL && dataConASMSQL.length > 0) ? dataConASMSQL[0].signPath : '';
    var position = (dataConASMSQL && dataConASMSQL.length > 0) ? dataConASMSQL[0].position : '';
    var dateAsessor = (dataConASMSQL && dataConASMSQL.length > 0) ? dataConASMSQL[0].dateAsessor : '';

    /* end call data ส่วนชื่อหน่วยงาน ส่วนสรุป และลายเซ็น */

    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    /* start Get data selete before create table  */
    var strHTML = ''
    var nameUnit = (dataConASMSQL && dataConASMSQL.length > 0) ? dataConASMSQL[0].nameUnit : ' (ระบุชื่อหน่วยงาน) '
    var currentYear = new Date().getFullYear();
    var currentThaiYear = currentYear + 543;
    var DateFix = 'ณ วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(currentThaiYear)
    strHTML += " <div class='title' style='margin-top: 20px;'> " 
    strHTML += " <input type='hidden' id='inputIdConASM' name='inputIdConASM' value='" + fnCheckFalsy(idConASM) + "'>  "
    strHTML += " <span class='unit-label'>หน่วยงาน</span><span id='spanNameUnit' style='width: 232px;' class='underline-dotted'>" + fnCheckFalsy(nameUnit) + "</span> "
    if (access !== 'admin') {
        strHTML += " <button id='btnEditSideName' type='button' class='btn btn-warning btn-sm' onclick='fnEditSidesName(\"" + fnCheckFalsy(nameUnit) + "\", \"" + strUserId + "\", \"" + idSideFix + "\")' data-bs-toggle='modal' data-bs-target='#sideNameModal'> "
        strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true'></i>"
        strHTML += "    </button> "
    }
    strHTML += " </div> "
    strHTML += " <div class='title'>แบบประเมินองค์ประกอบของการควบคุมภายใน</div> "
    strHTML += " <div class='title'>" +  selectedSide.NameSides + "</div> "
    strHTML += " <div class='title'>" + DateFix + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_" + valSides + "'>"
    strHTML += "<thead>"
    strHTML += "<tr>"
    strHTML += fnSetHeader() 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += await fnDrawTableAssessmentForm(dataASM)
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += await fnDrawCommentDivEvaluation(descConASM, prefixAsessor, signPath, position, dateAsessor, strUserId, idSideFix, access)

    strHTML += " <div class='dvFooterForm'> "
    if (access !== 'admin') {
        strHTML += "    <button type='button' class='btn btn-success' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    }
    strHTML += " </div> "

    /* end Get data selete before create table  */

    $("#dvFormAssessment")[0].innerHTML = strHTML

   fnAddSaveButtonEventListener(dataASM, dataConASMSQL, strUserId, idSideFix, strUserDocId)
}

async function fnDrawTableAssessmentForm(dataASM) { /* ด้านการข่าว */
    var strHTML = "";

    // สร้าง array สำหรับเก็บผลลัพธ์ที่จัดเรียง
    let result = [];
    var maintext = fnGetCollectDataEvalution('maintext')
    var subtext = fnGetCollectDataEvalution('subtext')
    var index = 0
    let combinedSubtext = subtext.map(formItem => {
        var items = dataASM[index++];
        return {
            ...formItem,
            idASM : items.id,
            descResultASM: items.descResultASM
        };
    });

    var getdata = [1] // ถ้ามีความเสี่ยง
    var valRisk = getdata
    if (valRisk.length > 1) {
        // จับคู่หัวข้อย่อยกับหัวข้อหลัก
        maintext.forEach(main => {
            // เพิ่มหัวข้อหลักในผลลัพธ์
            result.push(main);

            // หาหัวข้อย่อยที่ตรงกับหัวข้อหลัก
            combinedSubtext.forEach(sub => {
                if (sub.id_head === main.id) {
                    // เพิ่มหัวข้อย่อยในผลลัพธ์
                    result.push(sub);
                }
            });
        });
        strHTML = result
    } else {  
            maintext.forEach(main => {
                // เพิ่มหัวข้อหลักในผลลัพธ์
                result.push(main);

                // หาหัวข้อย่อยที่ตรงกับหัวข้อหลัก
                combinedSubtext.forEach(sub => {
                    if (sub.id_head === main.id) {
                        // เพิ่มหัวข้อย่อยในผลลัพธ์
                        result.push(sub);
                    }
                });
            });
        }
        if (result) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].description) {
                    strHTML += "<tr style='width: 50%;'><td>" + result[i].text + "<br>&emsp;&emsp;&emsp;&emsp;" + (result[i].description || '') + "</td><td></td></tr>";
                } else {
                    strHTML += "<tr style='width: 50%;'><td>&emsp;&emsp;&emsp;&emsp;" + result[i].text + "</td><td>" + fnCreateTextAreaAndButton(result[i].idASM, result[i].descResultASM) + "</td></tr>";
                }
            }
        }

    return strHTML;
    /* แทรกโค้ดเข้าไปใน #dvTableReportAssessment */
    /* $("#dvTableReportAssessment")[0].innerHTML = strHTML; */
}

function fnCreateTextAreaAndButton(id, description) {
    var strHTML = ''
    if (description) {
        strHTML += " <div style='display:flex;'> "
        strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='1' cols='30' style='display:none;'></textarea> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(" + id + ")' style='display:none;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div style='display:flex;'> "
        strHTML += " <span class='text-left' id='displayText" + id + "' style='text-indent: 19px;white-space: pre-wrap;'>" + description + "</span> "
        strHTML += " <i class='las la-pencil-alt' id='editIcon" + id + "' style='cursor:pointer; margin-left: 10px;margin-top: 5px;' onclick='fnEditText(\"" + id + "\")'></i> "
        strHTML += " </div> "
    } else {
        strHTML += " <div style='display:flex;'> "
        strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='1' cols='30'></textarea> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(" + id + ")'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div style='display:flex;'> "
        strHTML += " <span class='text-left' id='displayText" + id + "' style='text-indent: 19px;white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIcon" + id + "' style='display:none; cursor:pointer; margin-left: 10px;margin-top: 5px;' onclick='fnEditText(\"" + id + "\")'></i> "
        strHTML += " </div> "
    }
    return  strHTML
}
/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(id) {
    var textarea = document.getElementById('comment_' + id);
    var button = document.getElementById('submitButton' + id);
    var displayText = document.getElementById('displayText' + id);
    var editIcon = document.getElementById('editIcon' + id);
    var format = ''

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = format

        /* ซ่อน textarea และปุ่ม */
        textarea.style.display = 'none';
        button.style.display = 'none';  
        editIcon.style.display = 'inline';
    } else {
        Swal.fire({
            title: "",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning"
        });
    }
}

/* ฟังก์ชันสำหรับการแก้ไขข้อความ */
function fnEditText(id) {
    const textarea = document.getElementById('comment_' + id);
    const button = document.getElementById('submitButton' + id);
    const editIcon = document.getElementById('editIcon' + id);

    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = document.getElementById('displayText' + id).innerText.trim();
}

async function fnDrawCommentDivEvaluation(descConASM, prefixAsessor, signPath, position, dateAsessor, strUserId, idSideFix, access) {
    var strHTML = ''
    var strUpload = 'Upload'
    var strEpen = 'Epen'

    strHTML += " <div class='dvEvaluation'>ผลการประเมินโดยรวม</div> "
    strHTML += "  <input type='hidden' id='inputPrefixAsessor' name='inputPrefixAsessor' value='" + fnCheckFalsy(prefixAsessor) + "'>"
    strHTML += "  <input type='hidden' id='inputSignPath' name='inputSignPath' value='" + fnCheckFalsy(signPath) + "'>"
    if (descConASM) {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83' style='display:none;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEvaluation' onclick='fnSubmitTextCommentEvaluation()' style='display:none; width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start' style='text-indent: 19px;'> "
        strHTML += " <span id='displayTextCommentEvaluation' style='white-space: pre-wrap;'>" + descConASM + "</span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEvaluation' style='cursor:pointer; margin-left: 10px;margin-top: 5px;' onclick='fnEditTextCommentEvaluation()'></i> "
        strHTML += " </div> "
    } else {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEvaluation' onclick='fnSubmitTextCommentEvaluation()' style='width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start' style='text-indent: 19px;'> "
        strHTML += " <span id='displayTextCommentEvaluation' style='white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEvaluation' style='display:none; cursor:pointer; margin-left: 10px;margin-top: 5px;' onclick='fnEditTextCommentEvaluation()'></i> "
        strHTML += " </div> "
    }

    strHTML += " <div class='form-group'> ";
    strHTML += " <input type='hidden' id='inputIdUsers' class='form-control' value='" + fnCheckFalsy(strUserId) + "' > "
    strHTML += " <input type='hidden' id='inputIdSides' class='form-control' value='" + fnCheckFalsy(idSideFix) + "' > "
    strHTML += " </div> ";

    strHTML += " <div id='dvSignature' class='dvSignature' style='position: relative; text-align: center;'> "
    if (prefixAsessor && signPath) { //prefixAsessor && signPath
        strHTML += `<div>ผู้ประเมิน : <span style="width: 193px;" class="underline-dotted">${prefixAsessor} <img src="${signPath}" alt="ลายเซ็น" /></span></div>`
    } else if (prefixAsessor && !signPath) { //prefixAsessor && !signPath
            strHTML += " <div style='position: relative; display: inline-block;'> ";
            strHTML += " <div style='position: absolute; left: 120px; transform: translate(0%, -35%);'> ";
                strHTML += " <button type='button' id='btnSignatureUpload' class='btn btn-sm btn-primary' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strUpload + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>Upload</button> ";
            strHTML += " </div> ";
            strHTML += " <div style='position: absolute; right: 40px; transform: translate(20%, -35%);> ";
                strHTML += " <button type='button' id='btnSignatureEPen' class='btn btn-sm btn-danger' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strEpen + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>E-pen</button> ";
            strHTML += " </div> ";
            strHTML += `<div>ผู้ประเมิน : <span style="width: 193px;text-align:left" class="underline-dotted">${prefixAsessor}</span></div>`
            strHTML += " </div> ";
    } else if (!prefixAsessor && signPath) { //prefixAsessor && signPath  
            strHTML += `<div>ผู้ประเมิน : <span style="width: 193px;" class="underline-dotted"><img src="${signPath}" alt="ลายเซ็น" /></span></div>`
    } else {
        strHTML += " <div id='dvSignature' class='dvSignature' style='position: relative;'> ";
        strHTML += " <div style='position: relative; display: inline-block;'> ";
            strHTML += " <div style='position: absolute; left: 120px; transform: translate(-20%, -35%);'> ";
                strHTML += " <button type='button' id='btnSignatureUpload' class='btn btn-sm btn-primary' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strUpload + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>Upload</button> ";
            strHTML += " </div> ";
            strHTML += " <div style='position: absolute; right: 40px; transform: translate(0%, -35%);> ";
                strHTML += " <button type='button' id='btnSignatureEPen' class='btn btn-sm btn-danger' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strEpen + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>E-pen</button> ";
            strHTML += " </div> ";
            strHTML += ` <div>ผู้ประเมิน <span style="width: 197px;text-align: left;" class="underline-dotted">:</span></div> `
        strHTML += " </div> ";
    strHTML += " </div> ";
    }
    strHTML += " </div> "

    strHTML += " <div id='dvAssessor' class='dvAssessor' style='position: relative; text-align: center;'> ";
    if (position) {
        strHTML += ` <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${position}</span></div>`
    } else {
        strHTML += ` <div>ตำแหน่ง <span style="width: 211px;text-align: left;" class="underline-dotted">:</span></div> `
    }

    if (dateAsessor) {
        strHTML += `<div>วันที่: <span style="width: 232px;" class="underline-dotted">${fnFormatDateToThai(dateAsessor)}</span></div>`
    } else {
        strHTML += `<div>วันที่ <span style="width: 237px;text-align: left;" class="underline-dotted">:</span></div>`
    }
    strHTML += " </div> "

    if (access !== 'admin') { // ถ้าเป็น admin
        strHTML += " <div id='dv-btn-Signature' class='dv-btn-Signature' > "
        strHTML += "    <button id='btnEditSignature' type='button' class='btn btn-warning btn-sm' onclick='fnDrawModalAssessor(\"" + prefixAsessor + "\", \"" + position + "\", \"" + dateAsessor + "\")' data-bs-toggle='modal' data-bs-target='#assessorModal'> "
        strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span> "
        strHTML += "    </button> "
        strHTML += " </div> "
        // strHTML += " </div> ";
    }
    return strHTML
}

function fnSubmitTextCommentEvaluation() {
    var textarea = document.getElementById('commentEvaluation');
    var button = document.getElementById('submitButtonCommentEvaluation');
    var displayText = document.getElementById('displayTextCommentEvaluation');
    var editIcon = document.getElementById('editIconCommentEvaluation');
    var format = ''

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = format

        /* ซ่อน textarea และปุ่ม */
        textarea.style.display = 'none';
        button.style.display = 'none'; 
        
        /* ซ่อนไอคอนแก้ไข */
        editIcon.style.display = 'inline';
    } else {
        Swal.fire({
            title: "",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning"
        });
    }
}

function fnEditTextCommentEvaluation() {
    const textarea = document.getElementById('commentEvaluation');
    const button = document.getElementById('submitButtonCommentEvaluation');
    const editIcon = document.getElementById('editIconCommentEvaluation');

    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = document.getElementById('displayTextCommentEvaluation').innerText.trim();
}

function fnAddSaveButtonEventListener(data, dataCon,strUserId, strSideId, strUserDocId) {
    const saveButton = document.getElementById('btnSaveData');
    if (saveButton) {
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            // โค้ดสำหรับการบันทึกข้อมูล
            fnSaveDraftDocument(data, dataCon, strUserId, strSideId, strUserDocId, event);
        });
    } else {
        console.error('Element with id btnSaveData not found.');
    }
}

function fnSaveDraftDocument(data , dataCon, strUserId, strSideId, strUserDocId, event)  {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    var dataSend = []
    var strDisplayText = ''
    var descResultASM = ''
    var strUserName = fnGetCookie("username");
    var descCon = $('#displayTextCommentEvaluation').text()
    var idConASM = $('#inputIdConASM').val();
    var descConASM = (dataCon && dataCon.length > 0) ? dataCon[0].descConASM : '';

    // Loop ผ่าน data เพื่อเปรียบเทียบและ push ข้อมูลลงใน dataSend
    data.forEach(formItem => {
        strDisplayText = $('#displayText' + formItem.id).text();
        descResultASM = formItem.descResultASM === null ? '' : formItem.descResultASM;
        if (descResultASM !== strDisplayText) { // หาข้อมูลที่มีการแก้ไข
            dataSend.push({
                idASM: formItem.id,
                userId: strUserId,  // หรือใช้ strUserId ถ้ามีการประกาศ
                userDocId: strUserDocId,
                sideId: strSideId,  // ตรวจสอบว่ามีการประกาศ strSideId หรือไม่
                username: strUserName,
                descResultASM: strDisplayText
            });
        }
    });
    if (descCon) { // เช็คส่วนสรุปแบบ ASM
        if (descCon !== descConASM) {
            dataSend.push({
                idConASM: idConASM,
                userId: strUserId,  // หรือใช้ strUserId ถ้ามีการประกาศ
                userDocId: strUserDocId,
                sideId: strSideId,  // ตรวจสอบว่ามีการประกาศ strSideId หรือไม่
                username: strUserName,
                descResultConASM: descCon
            });
        }
        
    }
    console.log(dataSend)
    if (dataSend && dataSend.length > 0) {
        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลแบบประเมินใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                
                try {
                    const resultId = await fnSetDataFormAssessment(dataSend)
                    if (resultId) {
                        if (!idConASM) { // เช็คว่าถ้า strIdConPK4 ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConASM').val(resultId)
                        }
                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
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
    } else {
        Swal.fire({
            title: "",
            text: "กรุณากรอกข้อมูลก่อนกดบันทึกฉบับร่าง",
            icon: "warning"
        });
    }
}

function fnDrawModalSignature(strPrefixAsessor, strSignPath, strPosition, strDateAsessor, strUserId, idSideFix) {
    var strHTML = ''
    var strHTML2 = ''
    var strFormatDate = ''
    var strDay = ''
    var strMonth = ''
    var strYear = ''
    
    if (strDateAsessor) {
        strFormatDate = strDateAsessor.split('-')
        strYear = strFormatDate[0]
        strMonth = fnConvertThaiMonthName(strFormatDate[1])
        strDay = strFormatDate[2]
    }

    // draw modal
    strHTML += " <div class='form-group'> "
    strHTML += " </div> "
    strHTML += " <div class='form-group'> "
    strHTML += " <label for='evaluator'>ผู้ประเมิน (เซ็นชื่อ)</label> "
    strHTML += " <div class='canvas-container'> "
    strHTML += "     <canvas id='signatureCanvas' width='460' height='200'></canvas> "
    strHTML += "     <button class='clear-button' id='clearButton'>Clear</button> "
    strHTML += " </div> "
    strHTML += " <div id='evaluatorError' class='error'>กรุณาเซ็นชื่อ</div> "
    strHTML += " </div> "
    strHTML += " <div class='form-group'> "
    strHTML += " <label for='prefixAsessor'>คำนำหน้าชื่อ (ยศ)</label> "
    strHTML += " <input type='text' id='prefixAsessor' class='form-control' placeholder='กรอกชื่อคำนำหน้าชื่อ' value='" + strPrefixAsessor + "' > "
    strHTML += " <div id='prefixAsessorError' class='error'>กรุณาใส่ชื่อคำนำหน้าชื่อ</div> "
    strHTML += " </div> "
    strHTML += " <div class='form-group'> "
    strHTML += " <label for='position'>ตำแหน่ง</label> "
    strHTML += " <input type='text' id='position' class='form-control' placeholder='กรอกตำแหน่ง' value='" + strPosition + "'> "
    strHTML += " <div id='positionError' class='error'>กรุณาใส่ตำแหน่ง</div> "
    strHTML += " </div> "
    strHTML += " <div class='form-group'> "
    strHTML += " <label for='date'>วันที่</label> "
    strHTML += " <div class='row'> "
    strHTML += "     <div class='col-4'> "
    strHTML += "         <input type='text' id='day' class='form-control datepicker-day' placeholder='วัน' value='" + strDay + "'> "
    strHTML += "         <div id='dayError' class='error'>กรุณาใส่วัน</div> "
    strHTML += "     </div> "
    strHTML += "     <div class='col-4'> "
    strHTML += "         <input type='text' id='month' class='form-control datepicker-month' placeholder='เดือน' value='" + strMonth + "'> "
    strHTML += "         <div id='monthError' class='error'>กรุณาใส่เดือน</div> "
    strHTML += "     </div> "
    strHTML += "     <div class='col-4'> "
    strHTML += "         <input type='text' id='year' class='form-control datepicker-year' placeholder='ปี' value='" + strYear + "'> "
    strHTML += "         <div id='yearError' class='error'>กรุณาใส่ปี</div> "
    strHTML += "     </div> "
    strHTML += " </div> "
    strHTML += " </div> "
 
    strHTML2 += " <button type='button' id='submitSignatureButton' class='btn btn-primary'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "
       
    $("#dvBodySignatureModal").html(strHTML)
    $("#dvFooterSignatureModal").html(strHTML2)

    fnInitializeCanvas(strSignPath)

    $('.datepicker-day').datepicker({
        format: 'dd',
        language: 'th',
        autoclose: true,
        todayHighlight: true,
        minViewMode: 0,
        maxViewMode: 0,
    });
    $('.datepicker-month').datepicker({
        format: 'MM',
        language: 'th',
        autoclose: true,
        todayHighlight: true,
        minViewMode: 1,
        maxViewMode: 1,
    }).on('changeDate', function(e) {
        var fullMonthName = $(this).datepicker('getFormattedDate');
        var shortMonthName = fnConvertMonthToShort(fullMonthName);
        $(this).val(shortMonthName);
    });
    $('.datepicker-year').datepicker({
        format: 'yyyy',
        language: 'th',
        autoclose: true,
        todayHighlight: true,
        minViewMode: 2,
        maxViewMode: 2,
    });
}

function fnDrawSignatureSection(strSignPath, type) {
    var strHTML = '';
    var strHTML2 = '';

    if (type == 'Upload') {

        strHTML += " <div class='form-group'> ";
        strHTML += " <label for='signatureUpload'>อัปโหลดผู้ประเมิน</label> ";
        strHTML += " <div class='input-group'> "
        strHTML += " <input type='file' id='signatureUpload' class='form-control' accept='.png' aria-describedby='inputSignatureUpload' aria-label='Upload'> ";
        strHTML += " <button class='btn btn-outline-secondary' type='button' id='inputSignatureUpload'>.png</button>"
        strHTML += " </div> ";
        strHTML += " <div id='signatureUploadError' class='error'>กรุณาเลือกไฟล์</div> ";
        strHTML += " </div> ";

        // เพิ่ม canvas สำหรับแสดงผู้ประเมินที่อัปโหลด
        strHTML += " <div class='form-group'> ";
        strHTML += " <canvas id='signatureCanvas' width='460' height='200'></canvas> ";
        strHTML += " </div> ";
    
        strHTML2 += " <button type='button' id='submitUploadSignatureButton' class='btn btn-primary'>บันทึกข้อมูล</button> ";
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> ";
        
        $("#dvBodySignatureModal").html(strHTML);
        $("#dvFooterSignatureModal").html(strHTML2);

        $('#signatureUpload').on('change', fnUploadSignature);
        $('#submitUploadSignatureButton').on('click', function() {
            if (fnValidateFormSignature()) {
                fnSubmitSignature();
            }
        });   

    } else {
        strHTML += " <div class='form-group'> ";
        strHTML += "     <label for='evaluator'>ผู้ประเมิน (เซ็นชื่อ)</label> ";
        strHTML += "     <div class='canvas-container'> ";
        strHTML += "         <canvas id='signatureCanvas' width='460' height='200'></canvas> ";
        strHTML += "         <button class='clear-button' id='clearButton'>Clear</button> ";
        strHTML += "     </div> ";
        strHTML += "     <div id='evaluatorError' class='error'>กรุณาเซ็นชื่อ</div> ";
        strHTML += " </div> ";

        strHTML2 += " <button type='button' id='submitEpenSignatureButton' class='btn btn-primary'>บันทึกข้อมูล</button> ";
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> ";

        $("#dvBodySignatureModal").html(strHTML);
        $("#dvFooterSignatureModal").html(strHTML2);
        
        fnInitializeCanvas(strSignPath);

        $('#submitEpenSignatureButton').on('click', function() {
            if (fnValidateFormSignature()) {
                fnSubmitSignature();
            }
        })
    }

}

function fnDrawModalAssessor(strPrefixAsessor, strPosition, strDateAsessor) {
    var strHTML = '';
    var strHTML2 = '';
    var strFormatDate = '';
    var strDay = '';
    var strMonth = '';
    var strYear = '';
    
    if (strDateAsessor) {
        strFormatDate = strDateAsessor.split('-');
        strYear = strFormatDate[0];
        strMonth = fnConvertThaiMonthName(strFormatDate[1]);
        strDay = strFormatDate[2];
    }

    // draw modal without signature section
    
    strHTML += " <div class='form-group'> ";
    strHTML += " <label for='prefixAsessor'>คำนำหน้าชื่อ (ยศ)</label> ";
    strHTML += " <input type='text' id='prefixAsessor' class='form-control' placeholder='กรอกชื่อคำนำหน้าชื่อ' value='" + fnCheckFalsy(strPrefixAsessor) + "' > ";
    strHTML += " <div id='prefixAsessorError' class='error'>กรุณาใส่ชื่อคำนำหน้าชื่อ</div> ";
    strHTML += " </div> ";
    strHTML += " <div class='form-group'> ";
    strHTML += " <label for='position'>ตำแหน่ง</label> ";
    strHTML += " <input type='text' id='position' class='form-control' placeholder='กรอกตำแหน่ง' value='" + fnCheckFalsy(strPosition) + "'> ";
    strHTML += " <div id='positionError' class='error'>กรุณาใส่ตำแหน่ง</div> ";
    strHTML += " </div> ";
    strHTML += " <div class='form-group'> ";
    strHTML += " <label for='date'>วันที่</label> ";
    strHTML += " <div class='row'> ";
    strHTML += "     <div class='col-4'> ";
    strHTML += "         <input type='text' id='day' class='form-control datepicker-day' placeholder='วัน' value='" + fnCheckFalsy(strDay) + "'> ";
    strHTML += "         <div id='dayError' class='error'>กรุณาใส่วัน</div> ";
    strHTML += "     </div> ";
    strHTML += "     <div class='col-4'> ";
    strHTML += "         <input type='text' id='month' class='form-control datepicker-month' placeholder='เดือน' value='" + fnCheckFalsy(strMonth) + "'> ";
    strHTML += "         <div id='monthError' class='error'>กรุณาใส่เดือน</div> ";
    strHTML += "     </div> ";
    strHTML += "     <div class='col-4'> ";
    strHTML += "         <input type='text' id='year' class='form-control datepicker-year' placeholder='ปี' value='" + fnCheckFalsy(strYear) + "'> ";
    strHTML += "         <div id='yearError' class='error'>กรุณาใส่ปี</div> ";
    strHTML += "     </div> ";
    strHTML += " </div> ";
    strHTML += " </div> ";
 
    strHTML2 += " <button type='button' id='submitAssessorButton' class='btn btn-primary'>บันทึกข้อมูล</button> ";
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> ";
       
    $("#dvBodyAssessorModal").html(strHTML);
    $("#dvFooterAssessorModal").html(strHTML2);

    // fnDrawAssessorSection(strSignPath, strUserId);  // Call the new Assessor function

    $('.datepicker-day').datepicker({
        format: 'dd',
        language: 'th',
        autoclose: true,
        todayHighlight: true,
        minViewMode: 0,
        maxViewMode: 0,
    });
    $('.datepicker-month').datepicker({
        format: 'MM',
        language: 'th',
        autoclose: true,
        todayHighlight: true,
        minViewMode: 1,
        maxViewMode: 1,
    }).on('changeDate', function(e) {
        var fullMonthName = $(this).datepicker('getFormattedDate');
        var shortMonthName = fnConvertMonthToShort(fullMonthName);
        $(this).val(shortMonthName);
    });
    $('.datepicker-year').datepicker({
        format: 'yyyy',
        language: 'th',
        autoclose: true,
        todayHighlight: true,
        minViewMode: 2,
        maxViewMode: 2,
    });

    $('#submitAssessorButton').on('click', fnSubmitAssessor);
}

function fnUploadSignature(event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('signatureCanvas'); // เปลี่ยนจาก 'signatureUpload' เป็น 'signatureCanvas'

    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // ล้างข้อมูลเดิมใน canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // วาดภาพที่อัปโหลดลงใน canvas
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function fnInitializeCanvas(initialDataUrl) {
    const canvas = $('#signatureCanvas')[0];
    const ctx = canvas.getContext('2d');
    let drawing = false;

    // ตั้งค่าเริ่มต้นของ canvas ด้วยภาพจาก data URL
    if (initialDataUrl) {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        img.src = initialDataUrl;
    }

    ctx.lineWidth = 4; // เพิ่มความหนาของเส้น
    ctx.strokeStyle = "#000000"; // เปลี่ยนสีเส้นเป็นสีดำ

    $(canvas).on('mousedown', (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    $(canvas).on('mousemove', (e) => {
        if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    $(canvas).on('mouseup', () => {
        drawing = false;
    });

    $(canvas).on('mouseout', () => {
        drawing = false;
    });

    $('#clearButton').on('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

function fnValidateFormSignature() {
    const fileInput = $('#signatureUpload')[0];

    let isValid = true;

    $('#signatureUploadError').hide();
    $('#evaluatorError').hide();

    if ($('#submitUploadSignatureButton').is(':visible')) {
        // Validation for file upload
        if (fileInput && fileInput.files.length === 0) {
            $('#signatureUploadError').show();
            isValid = false;
        }
    } else {
        // Validation for canvas signature
        if (!fnValidateSignatureCanvas()) {
            $('#evaluatorError').show();
            isValid = false;
        } else {
            $('#evaluatorError').hide();
        }
    }

    return isValid;
}

function fnValidateSignatureCanvas() {
    const canvas = $('#signatureCanvas')[0];
    const ctx = canvas.getContext('2d');
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return canvasData.data.some(channel => channel !== 0);
}

function fnValidateAsessorForm() {
    let isValid = true;

    // Validate evaluator text
    const prefixAsessor = $('#prefixAsessor').val();
    if (!prefixAsessor) {
        $('#prefixAsessorError').show();
        isValid = false;
    } else {
        $('#prefixAsessorError').hide();
    }

    // Validate position
    const position = $('#position').val();
    if (!position) {
        $('#positionError').show();
        isValid = false;
    } else {
        $('#positionError').hide();
    }

    // Validate date
    const day = $('#day').val();
    const month = $('#month').val();
    const year = $('#year').val();

    if (!day || !month || !year) {
        if (!day) $('#dayError').show();
        if (!month) $('#monthError').show();
        if (!year) $('#yearError').show();
        isValid = false;
    } else {
        $('#dayError').hide();
        $('#monthError').hide();
        $('#yearError').hide();
    }

    return isValid;
}

function fnSubmitSignature() {
    // Validate the form before processing
    if (fnValidateFormSignature()) {
        // Get canvas and file input elements
        const canvas = $('#signatureCanvas')[0];
        const fileInput = $('#signatureUpload')[0];

        let signPath = '';

        if (fileInput && fileInput.files && fileInput.files[0]) {
            // Handle file upload
            const reader = new FileReader();
            reader.onload = function (e) {
                signPath = e.target.result;
                fnDisplaySignature(signPath);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else if (canvas) {
            // Handle canvas signature
            const ctx = canvas.getContext('2d');
            signPath = canvas.toDataURL();
            fnDisplaySignature(signPath);
        } else {
            // Log error if neither file nor canvas is available
            console.error('Canvas element not found and no file uploaded');
            return;
        }
    }
}

async function fnDisplaySignature(signPath) {
    const strIdConASM = $('#inputIdConASM').val();
    const strPrefixAsessor = $('#inputPrefixAsessor').val();
    const strUserId = $('#inputIdUsers').val();
    const strSideId = $('#inputIdSides').val();
    var strResultDocSQL= await fnGetDataResultDoc(strUserId, strSideId)
    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    const strUserName = fnGetCookie("username");

    // Result container to display the signature
    const resultContainer = $('#dvSignature');
    
    const data =  {
        idConASM: strIdConASM,
        userDocId: strUserDocId,
        signPath: signPath,
        username: strUserName
    };

    Swal.fire({
        title: "",
        text: "คุณต้องการบันทึกข้อมูลลายเซ็นใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const resultId = await fnSetDataSignatureASM(data)
                if (resultId) {
                    let strHTML = `
                        <div>ผู้ประเมิน: <span style="width: 197px;" class="underline-dotted">${strPrefixAsessor} <img src="${signPath}" alt="ลายเซ็น" /></span></div>
                    `;
        
                    resultContainer.html(strHTML); // Use .html() to set the content

                    $('#inputSignPath').val(signPath) // เพิ่มลายเซ็นไปเก็บไว้ใน input

                    if (!strIdConASM) { // เช็คว่าถ้า strIdConASM ยังไม่ข้อมูลในเทเบิ้ล
                        $('#inputIdConASM').val(resultId)
                    }
            
                    $('#signatureModal').modal('hide');
                    $('.modal-backdrop').remove();
                    $('#btnSignatureUpload').hide();
                    $('#btnSignatureEPen').hide();

                    Swal.fire({
                        title: "",
                        text: "บันทึกข้อมูลสำเร็จ",
                        icon: "success"
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

async function fnSubmitAssessor() {
    if (fnValidateAsessorForm()) {
        const strIdConASM = $('#inputIdConASM').val();
        const strUserId = $('#inputIdUsers').val();
        const strSideId = $('#inputIdSides').val();
        var strResultDocSQL = await fnGetDataResultDoc(strUserId, strSideId)
        var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';
        const strUserName = fnGetCookie("username");
        const resultDivSignature = $('#dvSignature');
        const resultDivAssesor = $('#dvAssessor');

        const prefixAsessor = $('#prefixAsessor').val();
        const signPath = $('#inputSignPath').val();

        const position = $('#position').val();
        const day = $('#day').val();
        const month = $('#month').val();
        const year = $('#year').val();

        const positionText = position ? position : '................................................';
        const buddhistYear = fnConvertToBuddhistYear(year);
        const shortYear = buddhistYear.toString().slice(-2);
        const dateText = `${fnConvertToThaiNumeralsAndPoint(day)} / ${fnConvertMonthToShort(month)} / ${fnConvertToThaiNumeralsAndPoint(shortYear)}`;
        const dateFormat = `${year}-${fnConvertMonthNumber(month)}-${day}`;

        const data =  {
            idConASM: strIdConASM,
            userDocId: strUserDocId,
            prefixAsessor: prefixAsessor,
            position: position,
            dateAsessor: dateFormat,
            username: strUserName
        };
        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลผู้ประเมินใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    var strUpload = 'Upload'
                    var strEpen = 'Epen'
                    const resultId = await fnSetDataAssessorASM(data)
                    var strHTML1 = '';
                    var strHTML2 = '';
                    
                    if (resultId) {
                        strHTML2 += `
                            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
                            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
                        `;
                        resultDivAssesor.html(strHTML2); // Use .html() to set the content

                        if (prefixAsessor) { 
                            if (signPath) {
                                strHTML1 += `<div>ผู้ประเมิน : <span style="width: 193px;" class="underline-dotted">${fnCheckFalsy(prefixAsessor)} <img src="${signPath}" alt="ลายเซ็น" /></span></div>`
                            } else {
                                strHTML1 += " <div style='position: relative; display: inline-block;'> ";
                                strHTML1 += " <div style='position: absolute; left: 120px; transform: translate(0%, -35%);'> ";
                                strHTML1 += " <button type='button' id='btnSignatureUpload' class='btn btn-sm btn-primary' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strUpload + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>Upload</button> ";
                                strHTML1 += " </div> ";
                                strHTML1 += " <div style='position: absolute; right: 40px; transform: translate(20%, -35%);'> ";
                                strHTML1 += " <button type='button' id='btnSignatureEPen' class='btn btn-sm btn-danger' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strEpen + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>E-pen</button> ";
                                strHTML1 += " </div> ";
                                strHTML1 += ` <div>ผู้ประเมิน : <span style="width: 193px;text-align:left" class="underline-dotted">${prefixAsessor}</span></div>`
                                strHTML1 += " </div> ";
                            }
                            $('#inputPrefixAsessor').val(prefixAsessor)
                            resultDivSignature.html(strHTML1)
                        }
                        if (!strIdConASM) { // เช็คว่าถ้า strIdConASM ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConASM').val(resultId)
                        }

                        
                
                        $('#assessorModal').modal('hide');
                        $('.modal-backdrop').remove();

                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
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
/* end ส่วนของลายเซ็นฯ */

/* start ส่วนแก้ชื่อหน่วยงาน*/
function fnEditSidesName(nameUnit, strUserId, idSideFix) {
    var strHTML = '';
    var strHTML2 = '';

    // Draw modal
    strHTML += "<div class='form-group'>";
    strHTML += " <input type='hidden' id='inputSideIdUsers' class='form-control' value='" + strUserId + "' > "
    strHTML += " <input type='hidden' id='inputSideIdSides' class='form-control' value='" + idSideFix + "' > "
    strHTML += "<label for='inputNameSides'>ชื่อหน่วยงาน</label>";
    strHTML += "<input type='text' id='inputNameSides' class='form-control' placeholder='กรอกชื่อหน่วยงาน' value='" + (nameUnit || '') + "'>";
    strHTML += "<div id='nameSidesError' class='error'>กรุณาใส่หน่วยงาน</div>";
    strHTML += "</div>"; // Added closing div tag

    strHTML2 += "<button type='button' id='submitSideNameButton' class='btn btn-primary'>บันทึกข้อมูล</button>";
    strHTML2 += "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button>";

    $('#dvBodySideNameModal').html(strHTML);
    $('#dvFooterSideNameModal').html(strHTML2);

    $('#submitSideNameButton').on('click', fnSubmitSideName);
}

async function fnSubmitSideName() {
    if (fnValidateNameUnitForm()) {
        const strIdConASM = $('#inputIdConASM').val();
        const strUserId = $('#inputSideIdUsers').val();
        const strSideId = $('#inputSideIdSides').val();
        const strUserName = fnGetCookie("username");
        var strResultDocSQL= await fnGetDataResultDoc(strUserId, strSideId)
        var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

        const strNameUnit = $('#spanNameUnit');
        const inputNameSides = $('#inputNameSides').val();

        const data =  {
            idConASM: strIdConASM,
            userId: strUserId,
            userDocId: strUserDocId,
            sideId: strSideId,
            username: strUserName,
            nameUnit:inputNameSides
        };

        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลชื่อหน่วยงานใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const results = await fnSetDataSideNameASM(data)
                    if (results && results == 'success' ) {

                        strNameUnit.text(inputNameSides);
                        $('#sideNameModal').modal('hide');
                        $('.modal-backdrop').remove();

                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
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

function fnValidateNameUnitForm() {
    let isValid = true;

    // Validate evaluator text
    const inputNameSides = document.getElementById('inputNameSides').value;
    if (!inputNameSides) {
        document.getElementById('nameSidesError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameSidesError').style.display = 'none';
    }

    return isValid;
}

async function fnSetDataSideNameASM(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnSetSideNameASM', dataSend)
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
/* end ส่วนแก้ชื่อหน่วยงาน*/


async function fnSetDataFormAssessment(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnSetFormAssessment', dataSend)
        var res = response.data.result
        if (res) {
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

async function fnGetDataResultDoc(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId,
        formId: '3'
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultDoc', dataSend)
        var res = response.data.result
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

async function fnGetDataResultASM(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultASM', dataSend)
        var res = response.data.result
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

async function fnGetDataResultConASM(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultConASM', dataSend)
        var res = response.data.result
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

async function fnSetDataAssessorASM(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnSetAssessorASM', dataSend)
        var res = response.data.result
        if (res) {
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

async function fnSetDataSignatureASM(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnSetSignatureASM', dataSend)
        var res = response.data.result
        if (res) {
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
