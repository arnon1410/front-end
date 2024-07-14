var globalTest = [] //อาจจะไม่ใช้วิธีนี้ หาวิธีอื่น
function fnSetHeader(){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable' style='width: 55%;'>คำถาม</th>"
    strHTML += "<th class='text-center textHeadTable' style='width: 8%;'>มี/ใช่</th>";
    strHTML += "<th class='text-center textHeadTable' style='width: 8%;'>ไม่มี/ไม่ใช่</th>";
    strHTML += "<th class='text-center textHeadTable' style='width: 29%;'>คำอธิบาย/คำตอบ</th>"

    strHTML += "<tr>";
    strHTML += "<td></td>";
    strHTML += "<td class='text-center tdUnderline' style='width: 8%;' >&#10003;</td>";
    strHTML += "<td class='text-center tdUnderline' style='width: 8%;' >&#10005; (NA)</td>";
    strHTML += "<td></td>";
    strHTML += "</tr>";

    return strHTML
}
async function fnDrawTableForm(access,valSides,objData) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var data = objData
    var strSides = valSides
    globalTest = objData
   
    var arrSides = [
        {id:1,  key: 'branchpersonal', NameSides: 'ด้านกำลังพล',value: 4 },
        {id:2,  key: 'branchoperation',NameSides: 'ด้านกาารยุทธการ', value: 3 },
        {id:3,  key: 'branchnews',NameSides: 'ด้านการข่าว', value: 7 },
        {id:4,  key: 'branchlogistics',NameSides: 'ด้านส่งกำลังบำรุง', value: 7 },
        {id:5,  key: 'branchcommunication',NameSides: 'ด้านสื่อสาร', value: 5 },
        {id:6,  key: 'branchtechnology',NameSides: 'ด้านระบบเทคโนโลยีในการบริหารจัดการ', value: 3 },
        {id:7,  key: 'branchcivilaffairs',NameSides: 'ด้านกิจการพลเรือน', value: 4 },
        {id:8,  key: 'branchbudget',NameSides: 'ด้านการงบประมาณ', value: 6 },
        {id:9,  key: 'branchfinanceandacc',NameSides: 'ด้านการเงินและการบัญชี', value: 6 },
        {id:10,  key: 'branchoperation',NameSides: 'ด้านพัสดุและทรัพย์สิน', value: 8 },
    ];

    var index = arrSides.findIndex(item => item.key === strSides);
    var idSideFix = arrSides[index].id + 1 // บวก 1 เนื่องจากใน database ด้านกำลังพล id เริ่มต้นที่ 2  


    strHTML += " <div class='title'>แบบสอบถามการควบคุม</div> "
    strHTML += " <div class='subtitle'>" + arrSides[index].NameSides + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += " <form id='formSaveFormQuestionnaire'> "
    strHTML += "<table id='tb_" + valSides + "'>"
    strHTML += "<thead>"
    strHTML += "<tr>"
    strHTML += fnSetHeader() 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    if (valSides == 'branchOperation') { // ถ้าเป็นด้านยุทธการจะเรียก function นี้
        strHTML += fnDrawTableReportAssessmentFix(data)
    } else {
        strHTML += await fnDrawTableReportAssessment(data, idSideFix)
    }

    strHTML += fnDrawTableReportAssessmentOther(strSides, arrSides, data)
    strHTML += "</tbody>"
    strHTML += "</table>"
    strHTML += fnDrawCommentDivEvaluation(arrSides[index].NameSides)

    var evaluatorText = 'นอ.'
    var evaluatorDataURL = 'data:image/png;base64,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'
    var position = 'รอง.ผอ.กตค.จร.ทร'
    var day = '01'
    var month = 'กรกฎาคม'
    var year = '2567'
    var buddhistYear = fnConvertToBuddhistYear(year);
    var shortYear = buddhistYear.toString().slice(-2);
    var dateText = `${fnConvertToThaiNumeralsAndPoint(day)} / ${fnConvertMonthToShort(month)} / ${fnConvertToThaiNumeralsAndPoint(shortYear)}`;
    
    strHTML += " <div id='dvSignature' class='dvSignature'> "
    if (!evaluatorText) {
        strHTML += " <div>ผู้ประเมิน: <span style='width: 200px;' class='underline-dotted'>" + evaluatorText + "<img src='" + evaluatorDataURL + "' alt='ลายเซ็น' /></span></div> "
    } else {
        strHTML += " <div>ชื่อผู้ประเมิน..............................................</div> "
    }

    if (!position) {
        strHTML += " <div>ตำแหน่ง: <span style='width: 205px;' class='underline-dotted'>" + position + "</span></div> "
    } else {
        strHTML += " <div>ตำแหน่ง.....................................................</div> "
    }

    if (!day && !month && !year) {
        strHTML += " <div>วันที่: <span style='width: 232px;' class='underline-dotted'>" + dateText + "</span></div> "
    } else {
        strHTML += " <div>ตำแหน่ง.....................................................</div> "
    }
    
    
    strHTML += " </div> "
    strHTML += " <div id='dv-btn-Signature' class='dv-btn-Signature' > "
    strHTML += "    <button id='btnEditSignature' type='button' class='btn btn-warning btn-sm' onclick='fnDrawModalSignature()' data-bs-toggle='modal' data-bs-target='#signatureModal'> "
    strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span> "
    strHTML += "    </button> "
    strHTML += " </div> "
    //  <img src="" alt="ลายเซ็น">

    strHTML += " <div class='dvFooterForm'> "
    // strHTML += "    <button type='submit' class='btn btn-primary' id='btnSaveData' onclick='fnSaveDraftDocument(" + objData[0].mainControl + ")'>บันทึกฉบับร่าง</button>"
    strHTML += "    <button type='submit' class='btn btn-primary' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF' onclick='fnExportDocument()'>Export PDF</button>"
    strHTML += " </form> "
    strHTML += " </div> "
    $("#dvFormReport")[0].innerHTML = strHTML
}

function fnCreateInputRadioAndSpan(text, index, validate) {
    var strHTML = ""
    if (validate && validate == '1') {
        strHTML += "<div style='display:flex;'>"
        strHTML += "<input type='radio' id='inputRadioSumOfSide" + index + "_" + validate + "' name='inputRadioSumOfSide" + index + "' style='margin: 5px 10px 0px 0px;' value='1' onchange='fnToggleTextSum(\"" + index + "_" + validate + "\", this)'/>"
        strHTML += "<span>" + text + "</span>"
        strHTML += "</div>"
    } else { // กรณีไม่เพียงพอ 
        strHTML += "<div style='display:flex;margin-bottom: 10px;'>"
        strHTML += "<input type='radio' id='inputRadioSumOfSide" + index + "_" + validate + "' name='inputRadioSumOfSide" + index + "' style='margin: 5px 10px 0px 0px;' value='0' onchange='fnToggleTextSum(\"" + index + "_" + validate + "\", this)'/>"
        strHTML += "<span>" + text + "</span>"
        strHTML += "</div>"
        strHTML += "<div style='display:flex;'>"
        strHTML += "<textarea id='commentSum" + index + "_" + validate + "' name='commentSum" + index + "_" + validate + "' rows='2' cols='33' style='display:none'></textarea>"
        strHTML += "<button class='btn btn-secondary btn-sm' type='submit' id='submitButtonSum" + index + "_" + validate + "' onclick='fnSubmitTextSum(\"" + index + "_" + validate + "\")' style='display:none'>ยืนยัน</button>"
        strHTML += "</div>"
        strHTML += "<div style='display:flex;'> "
        strHTML += "<p class='text-left pComment' id='displayTextSum" + index + "_" + validate + "' style='white-space: pre-wrap;'></p>"
        strHTML += "<i class='las la-pencil-alt' id='editIconSum" + index + "_" + validate + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditTextSum(\"" + index + "_" + validate + "\")'></i>"
        strHTML += "</div>"
     //
    }
    return strHTML
}

async function fnDrawTableReportAssessment(data, idSideFix) {
    var strHTML = "" ;
    var strUserId = fnGetCookie("userId")
    var dataControl = data
    //console.log(dataControl)
    var dataCheckbox = await fnGetDataResultQR(strUserId, idSideFix) // call function 

    var checkboxIndex = 0;

    var combinedArray = dataControl.map(formItem => {
        if (formItem.ischeckbox === 1 && checkboxIndex < dataCheckbox.length) {
            var checkboxData = dataCheckbox[checkboxIndex++];
            return {
                ...formItem,
                checkbox: checkboxData.checkbox,
                descResultQR: checkboxData.descResultQR,
                fileName: checkboxData.fileName,
                fileSave: checkboxData.fileSave,
                filePath: checkboxData.filePath
            };
        } else {
            return formItem;
        }
    });
    
    /* แถวที่มี Checkbox และ TextArea */
    function fnCreateCheckboxAndTextAreaRow(id_control, text, id, size, ischeckbox, description, filename, filesave, filepath ) {
        // Determine which checkbox should be checked
        var strHTML2 = '';
        var haveDataChecked = ischeckbox === 'y' ? 'checked' : '';
        var nothaveDataChecked = ischeckbox === 'n' ? 'checked' : '';
        var notAppDataChecked = ischeckbox === 'na' ? 'checked' : '';
    
        // Function to toggle the textarea
    
        strHTML2 += " <tr> ";
        strHTML2 += "<td style='width: 55%;text-indent: " + size + "'>" + (id_control ? fnConvertToThaiNumeralsAndPoint(id_control) + ' ' : '') + text + "</td>";
        strHTML2 += "<td style='width: 8%;' class='text-center checkbox-container'> ";
        strHTML2 += "<input type='checkbox' id='haveData_" + id + "' class='have-checkbox' name='haveData_" + id + "' onchange='fnToggleTextarea(\"btnUploadDoc" + id + "\",\"btnViewDoc" + id + "\",\"comment_" + id + "\",\"submitButton" + id + "\", this, \"1\",\"" + id + "\")' " +  haveDataChecked + "/>";
        strHTML2 += "<label for='haveData_" + id + "' id='lablehaveData_" + id + "' class='hidden'>&#10003;</label> ";
        strHTML2 += "</td>";
        strHTML2 += "<td style='width: 8%;' class='text-center checkbox-container'> ";
        strHTML2 += "<input type='checkbox' id='nothaveData_" + id + "' class='nothave-checkbox' name='nothaveData_" + id + "' onchange='fnToggleTextarea(\"btnUploadDoc" + id + "\",\"btnViewDoc" + id + "\",\"comment_" + id + "\",\"submitButton" + id + "\", this, \"2\",\"" + id + "\")' " + nothaveDataChecked + "/>";
        strHTML2 += "<label for='nothaveData_" + id + "' id='lablenothaveData_" + id + "' class='hidden' style='width: 4%;'>&#10005;</label> ";
        strHTML2 += "<input type='checkbox' id='notAppData_" + id + "' class='notapp-checkbox' name='notAppData_" + id + "' onchange='fnToggleTextarea(\"btnUploadDoc" + id + "\",\"btnViewDoc" + id + "\",\"comment_" + id + "\",\"submitButton" + id + "\", this, \"3\",\"" + id + "\")' " + notAppDataChecked + "/>";
        strHTML2 += "<label for='notAppData_" + id + "' id='lablenotAppData_" + id + "' class='hidden' style='width: 4%;'>NA</label> ";
        strHTML2 += "</td>";
        strHTML2 += "<td style='width: 29%;'>" + fncreateTextAreaAndButton(text, id, ischeckbox, description, filename, filesave, filepath ) + "</td>";
        strHTML2 += "</tr>";
    
        return strHTML2;
    }
    

    
    for (var i = 0; i < combinedArray .length; i++) {
        var item = combinedArray [i];
        if (item.maincontrol_id !== undefined || item.sum_id !== undefined) {
            if (item.sum_id && item.value) { // ส่วนสรุป
                strSumDetail = fnMapValueToCallFunction(item)
                if (item.value == 0) {// ใส่เส้น ล่างตาราง
                    strHTML += "<tr class='trSidesSum-Line'><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                } else {
                    strHTML += "<tr><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                }
            } else { // ส่วนอื่น ๆ วัตถุประสงค์ 
                if (item.sum_id) { // ตรงส่วนสรุปแต่ละคำถาม
                    strHTML += "<tr><td style='width: 55%;font-weight: bold;'><u>สรุป</u> : " + item.text + "</td><td></td><td></td><td></td></tr>";
                } else { // หัวข้อหลัก 1,2,3,4,5
                    strHTML += "<tr><td style='width: 55%;;font-weight: bold;padding-top: 5px;'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                }
                if (item.main_Obj) { //วัตถุประสงค์ของการควบคุม ใช้ร่วมกัน
                    strHTML += "<tr><td style='width: 55%;text-indent: 17px;font-weight: bold;'>" + item.main_Obj + "</td><td></td><td></td><td></td></tr>";
                }
                if (item.Object_name) { // เพื่อ ......
                    strHTML += "<tr><td style='width: 55%;text-indent: 17px;font-style: italic;'>" + item.Object_name + "</td><td></td><td></td><td></td></tr>";
                }
            }
        } else { // หัวข้อย่อยทั้งหมด
            if ((item.is_subcontrol && item.is_subcontrol == 1) || (item.is_innercontrol && item.is_innercontrol == 1)) { // ถ้ามีหัวข้อย่อย 
                if (item.id_subcontrol) {
                    strHTML += "<tr><td style='width: 55%;text-indent: 12%'>"+ fnConvertToThaiNumeralsAndPoint(item.id_subcontrol) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                } else {
                    strHTML += "<tr><td style='width: 55%;text-indent: 17px;'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                }
            } else { // ไม่มีหัวข้อย่อย is_subcontrol == 0 หรือ item.is_innercontrol == 0
                if (item.id_innercontrol) { // 1
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_innercontrol, item.text, item.id, '26%', item.checkbox, item.descResultQR , item.fileName, item.fileSave, item.filePath);
                } else if (item.id_subcontrol) {
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_subcontrol, item.text, item.id, '12%', item.checkbox, item.descResultQR , item.fileName, item.filePath);
                } else {
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_control, item.text, item.id, '17px', item.checkbox, item.descResultQR , item.fileName, item.filePath);
                }
            }

        }
    }


    return strHTML;
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

function fnDrawTableReportAssessmentFix (data) {  /* ด้านยุทธการ */
    var strHTML = "" ;
    var dataControl = data
    /* แถวที่มี Checkbox และ TextArea */
// checkbox-container
    var mainHeadings = [
        { id: 1, text: "การเตรียมกำลัง" },
        { id: 2, text: "การใช้กำลัง" }
    ];


    function fnAddMainHeadingIfNeeded(currentMainControlId) {
        var mainHeading = mainHeadings.find(heading => heading.id === currentMainControlId);
        if (mainHeading) {
            strHTML += `<tr><td style='width: 55%; font-weight: bold;'>${fnConvertToThaiNumeralsAndPoint(mainHeading.id)}. ${mainHeading.text}</td><td></td><td></td><td></td></tr>`;
            mainHeadings = mainHeadings.filter(heading => heading.id !== currentMainControlId);
        }
    }
    
    
    if (dataControl.length > 0) {
        var currentMainControlId = null;
        for (var i = 0; i < dataControl.length; i++) {
            var item = dataControl[i];
            if (currentMainControlId !== item.maincontrol_id) {
                currentMainControlId = item.maincontrol_id;
                fnAddMainHeadingIfNeeded(currentMainControlId);
            }

            if (item.maincontrol_id !== undefined || item.sum_id !== undefined) {
                if (item.sum_id && item.value) { // ส่วนสรุป
                    strSumDetail = fnMapValueToCallFunction(item)
                    if (item.value == 0) {// ใส่เส้น ล่างตาราง
                        strHTML += "<tr class='trSidesSum-Line'><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                    } else {
                        strHTML += "<tr><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                    }
                    
                } else { // ส่วนอื่น ๆ วัตถุประสงค์ 
                    if (item.sum_id) { // ตรงส่วนสรุปแต่ละคำถาม
                        strHTML += "<tr><td style='width: 55%;font-weight: bold;'><u>สรุป</u> : " + item.text + "</td><td></td><td></td><td></td></tr>";
                    } else { // หัวข้อหลัก 1,2,3,4,5
                        strHTML += "<tr><td style='width: 55%;;font-weight: bold;text-indent: 5%;padding-top: 5px;'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                    }
                    if (item.main_Obj) { //วัตถุประสงค์ของการควบคุม ใช้ร่วมกัน
                        strHTML += "<tr><td style='width: 55%;font-weight: bold;text-indent: 12%;'>" + item.main_Obj + "</td><td></td><td></td><td></td></tr>";
                    }
                    if (item.Object_name) { // เพื่อ ......
                        strHTML += "<tr><td style='width: 55%;font-style: italic;text-indent: 12%;'>" + item.Object_name + "</td><td></td><td></td><td></td></tr>";
                    }
                }
            } else { // หัวข้อย่อยทั้งหมด
                
                if ((item.is_subcontrol && item.is_subcontrol == 1) || (item.is_innercontrol && item.is_innercontrol == 1)) { // ถ้ามีหัวข้อย่อย 
                    if (item.id_subcontrol) {
                        strHTML += "<tr><td style='width: 55%;text-indent: 12%'>"+ fnConvertToThaiNumeralsAndPoint(item.id_subcontrol) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                    } else {
                        strHTML += "<tr><td style='width: 55%;text-indent: 12%;'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                    }
                } else { // ไม่มีหัวข้อย่อย is_subcontrol == 0 หรือ item.is_innercontrol == 0
                    if (item.id_innercontrol) { // 1
                        strHTML += fnCreateCheckboxAndTextAreaRow(item.id_innercontrol, item.text, item.id, '26%');
                    } else if (item.id_subcontrol) {
                        strHTML += fnCreateCheckboxAndTextAreaRow(item.id_subcontrol, item.text, item.id, '12%');
                    } else {
                        strHTML += fnCreateCheckboxAndTextAreaRow(item.id_control, item.text, item.id, '12%');
                    }
                }
            }
        }
    }
    return strHTML;
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

function fnDrawTableReportAssessmentOther(strSides, data, arrObj) {
    var strHTML = "" ;
    var arrSides = data
    var arrObject = arrObj
    var index = arrSides.findIndex(item => item.key === strSides);

    // strHTML += " <div id='dvSidesOther'>"
    // strHTML += " <div id='dvSidesOtherTest'>"
    strHTML += "    <tr id='trSidesOther'><td class='tdSidesOther' style='width: 55%;font-weight: bold;padding-top: 5px;'>"
    strHTML += "    <div> "+ fnConvertToThaiNumeralsAndPoint(arrSides[index].value) +". อื่น ๆ "
    // strHTML += "    <button id='btn_SidesOther' type='button' class='btn btn-success btn-sm'; onclick='fnGetModalSidesOther(\"" + strSides + "\",\"" + arrSides[index].value + "\",\"" + arrSides[index].NameSides + "\")' style='margin-left : 5px;'  data-bs-toggle='modal' data-bs-target='#OtherRiskModal'>"
    strHTML += "    <button id='btn_SidesOther' type='button' class='btn btn-success btn-sm' onclick='fnGetModalSidesOther(\"" + strSides + "\",\"" + arrSides[index].value + "\",\"" + arrSides[index].NameSides + "\")' style='margin-left : 5px;'  data-bs-toggle='modal' data-bs-target='#OtherRiskModal'>"
    strHTML += "    <i class='las la-plus mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>เพื่มความเสี่ยงอื่นที่พบ</span>"
    strHTML += "    </button>"
    strHTML += "  <div id='dvSidesOther2'>"
    strHTML += "    <div>............................................................................................</div>"
    strHTML += "    <div>............................................................................................</div>"
    strHTML += "    </td>"
    strHTML += "    <td class='tdSidesOther'></td><td class='tdSidesOther'></td><td class='tdSidesOther'></td></tr>";
    strHTML += "  </div> "
    // strHTML += " </div> "
    return strHTML;
    
}

async function fnGetDataResultQR(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultQR', dataSend)
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



function fnMapValueToCallFunction(items) {
    // ตรวจสอบว่า items เป็น object หรือ array
    if (Array.isArray(items)) {
        // ฟังก์ชันในการกรองและอัปเดตข้อมูลถ้าเป็น array
        items = items.map(item => {
            if (item.sum_id !== null && item.sum_id !== undefined) {
                item.text = fnCreateInputRadioAndSpan(item.text, item.head_id, item.value);
            }
            return item;
        });
    } else if (items && typeof items === 'object') {
        // ฟังก์ชันในการอัปเดตข้อมูลถ้าเป็น object
        if (items.sum_id !== null && items.sum_id !== undefined) {
            items.text = fnCreateInputRadioAndSpan(items.text, items.head_id, items.value);
        }
        return items;
    } else {
        console.error("The provided items is neither an array nor a valid object");
    }
}


function fncreateTextAreaAndButton(text, id, ischeckbox, description, filename, filesave, filepath ) {
    var strHTML = ''
    if (ischeckbox == 'y') {
        
        // if (filename && filesave && filepath) { // ถ้ามีไฟล์แนบมา 
        if (1 == 1) {
            strHTML += " <div id='dvUploadDoc" + id + "' class='text-center align-middle' style='display: flex;justify-content: center;'>  "
            strHTML += " <button id='btnUploadDoc" + id + "' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig(\"" + text + "\",\"" + id + "\")'  data-bs-toggle='modal' data-bs-target='#relateDocumentModal'> "
            strHTML += " <i class='las la-search' aria-hidden='true'></i><span>อัปโหลด</span> "
            strHTML += " </button> "
            strHTML += " <button id='btnViewDoc" + id + "' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnViewDocConfig(\"" + text + "\",\"" + id + "\",\"" + filename + "\",\"" + filesave + "\",\"" + filepath + "\")' > "
            strHTML += " <i class='las la-pen' aria-hidden='true'></i><span>ดูเอกสาร</span> "
            strHTML += " </button> "
            strHTML += " </div> "
        } else if (description) {  // ถ้ามีการกรอกคำอธิบายมา 
            strHTML += " <div style='display:flex; align-items: center;'> "
            strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='1' cols='15' style='display:none'></textarea> "
            strHTML += " <button class='btn btn-secondary btn-sm' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(\"" + id + "\")' style='display:none'>ยืนยัน</button> "
            strHTML += " </div> "
            strHTML += " <div style='display:flex; align-items: center;'>  "
            strHTML += " <p class='text-left pComment' id='displayText" + id + "' style='white-space: pre-wrap;'>" + description + "</p> "
            strHTML += " <i class='las la-pencil-alt' id='editIcon" + id + "' style='cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + id + "\")'></i> "
            strHTML += " </div> "

        } else { // แสดงปุ่มอัปโหลด กับ กรอกข้อมูล
            strHTML += " <div id='dvUploadDoc" + id + "' class='text-center align-middle' style='display: flex;justify-content: center;'>  "
            strHTML += " <button id='btnUploadDoc" + id + "' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig(\"" + text + "\",\"" + id + "\")'  data-bs-toggle='modal' data-bs-target='#relateDocumentModal'> "
            strHTML += " <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span> "
            strHTML += " </button> "
            strHTML += " <button id='btnFillDoc" + id + "' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig(\"" + text + "\",\"" + id + "\")' > "
            strHTML += " <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span> "
            strHTML += " </button> "
            strHTML += " </div> "
        }


    } else if (ischeckbox == 'n') {
        if (description) { // ถ้า description ไม่ใช่ค่าว่าง
            strHTML += " <div style='display:flex; align-items: center;'> "
            strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='1' cols='15' style='display:none'></textarea> "
            strHTML += " <button class='btn btn-secondary btn-sm' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(\"" + id + "\")' style='display:none'>ยืนยัน</button> "
            strHTML += " </div> "
            strHTML += " <div style='display:flex; align-items: center;'>  "
            strHTML += " <p class='text-left pComment' id='displayText" + id + "' style='white-space: pre-wrap;'>" + description + "</p> "
            strHTML += " <i class='las la-pencil-alt' id='editIcon" + id + "' style='cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + id + "\")'></i> "
            strHTML += " </div> "
        } else { // แสดงปุ่มอัปโหลด กับ กรอกข้อมูล
            strHTML += " <div id='dvUploadDoc" + id + "' class='text-center align-middle' style='display: flex;justify-content: center;'>  "
            strHTML += " <button id='btnUploadDoc" + id + "' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig(\"" + text + "\",\"" + id + "\")'  data-bs-toggle='modal' data-bs-target='#relateDocumentModal'> "
            strHTML += " <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span> "
            strHTML += " </button> "
            strHTML += " <button id='btnFillDoc" + id + "' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig(\"" + text + "\",\"" + id + "\")' > "
            strHTML += " <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span> "
            strHTML += " </button> "
            strHTML += " </div> "
        }
    } else if (ischeckbox == 'na') {
        if (description) { // ถ้า description ไม่ใช่ค่าว่าง
            strHTML += " <div style='display:flex; align-items: center;'> "
            strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='1' cols='15' style='display:none'></textarea> "
            strHTML += " <button class='btn btn-secondary btn-sm' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(\"" + id + "\")' style='display:none'>ยืนยัน</button> "
            strHTML += " </div> "
            strHTML += " <div style='display:flex; align-items: center;'>  "
            strHTML += " <p class='text-left pComment' id='displayText" + id + "' style='white-space: pre-wrap;'>" + description + "</p> "
            strHTML += " <i class='las la-pencil-alt' id='editIcon" + id + "' style='cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + id + "\")'></i> "
            strHTML += " </div> "
        } else { // แสดงปุ่มอัปโหลด กับ กรอกข้อมูล
            strHTML += " <div id='dvUploadDoc" + id + "' class='text-center align-middle' style='display: flex;justify-content: center;'>  "
            strHTML += " <button id='btnUploadDoc" + id + "' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig(\"" + text + "\",\"" + id + "\")'  data-bs-toggle='modal' data-bs-target='#relateDocumentModal'> "
            strHTML += " <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span> "
            strHTML += " </button> "
            strHTML += " <button id='btnFillDoc" + id + "' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig(\"" + text + "\",\"" + id + "\")' > "
            strHTML += " <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span> "
            strHTML += " </button> "
            strHTML += " </div> "
        }
    } else { // ถ้า ischeckbox เป็นค่า NULL 
        strHTML += " <div style='display:flex; align-items: center;'> "
        strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='1' cols='15' style='display:none'></textarea> "
        strHTML += " <button class='btn btn-secondary btn-sm' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(\"" + id + "\")' style='display:none'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div style='display:flex; align-items: center;'>  "
        strHTML += " <p class='text-left pComment' id='displayText" + id + "' style='white-space: pre-wrap;'></p> "
        strHTML += " <i class='las la-pencil-alt' id='editIcon" + id + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + id + "\")'></i> "
        strHTML += " </div> "
        strHTML += " <div id='dvUploadDoc" + id + "' class='text-center align-middle' style='display: flex;justify-content: center;'>  "
        strHTML += " <button id='btnUploadDoc" + id + "' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig(\"" + text + "\",\"" + id + "\")' style='display:none;' data-bs-toggle='modal' data-bs-target='#relateDocumentModal'> "
        strHTML += " <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span> "
        strHTML += " </button> "
        strHTML += " <button id='btnFillDoc" + id + "' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig(\"" + text + "\",\"" + id + "\")' style='display:none;'> "
        strHTML += " <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span> "
        strHTML += " </button> "
        strHTML += " </div> "
    }
    return strHTML;
}

function fnUploadDocConfig (text, id) {
    var strtext = text
    fnGetDataModal(strtext, id);
}

function fnViewDocConfig (text, id, filename, filesave, filepath) { 
    Swal.fire({
        title: '',
        text: 'EXPORT เอกสาร' + text,
        icon: 'error'
    })
}

function fnChangeToFillDocConfig(text, id) {
    document.getElementById(`btnUploadDoc${id}`).style.display = 'none';
    document.getElementById(`btnFillDoc${id}`).style.display = 'none';
    document.getElementById(`comment_${id}`).style.display = 'block';
    document.getElementById(`submitButton${id}`).style.display = 'block';
    document.getElementById(`displayText${id}`).style.display = 'block';
}

function fnGetDataModal(strtext, id) {
    // var arrData = fnGetDataInternalControl(id) // call function get data
    var arrData = [{id:1 , mainControl: 'ด้านการข่าว'}]
    var strHTML = ''
    var strHTML2 = ''

    // draw modal
    strHTML += " <div class='mb-3'> "
    strHTML += " <label for='headCheckTopic' class='lableHead'>หัวข้อที่ตรวจสอบ</label> "
    strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='"+ arrData[0].mainControl +"' readonly> "
    strHTML += " </div> "

    strHTML += " <div class='mb-3'> "
    strHTML += " <label for='nameMenuCheck' class='lableHead'>ชื่อรายการที่ตรวจสอบ</label> "
    
    strHTML += "<input type='text' class='form-control' id='nameMenuCheckTopic' value='"+ strtext +"' readonly>"
    strHTML += " </div> "

    strHTML += " <div id='dvuploadfile' class='mb-3'> "
    strHTML += " <label for='formFile' class='lableHead'>ไฟล์ที่แนบ</label> "
    strHTML += " <input class='form-control form-control-sm' id='formFile' type='file'> "
    strHTML += " </div> "


    strHTML2 += " <button type='button' class='btn btn-primary'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "            


    $("#dvBodyModalRelateDocumentModal")[0].innerHTML = strHTML
    $("#dvFooterModalrelateDocumentModal")[0].innerHTML = strHTML2
    
    // fnChangeSizeSelect("slNameRates") //ปรับขนาด select
    
}

function fnGetModalSidesOther (sides, number, nameSides, arrObj) {
    var strHTML = ''
    var strHTML2 = ''
    
    if (sides == 'branchoperation') {

    } else { // ด้านที่เหลือ

        strHTML += " <div class='form-group mb-3'> "
        strHTML += "     <label for='headCheckTopic'>ด้านของกิจกรรม</label> "
        strHTML += "     <input type='text' id='headCheckTopic' class='form-control lableHead' value='" + nameSides + "' style='background: darkgray;' readonly> "
        strHTML += " </div> "
        strHTML += " <div class='form-group mb-3'> "
        strHTML += "     <label for='nameMenuCheckTopic'>หัวข้อกิจกรรม</label> "
        strHTML += "     <input type='text' id='nameMenuCheckTopic' class='form-control lableHead' placeholder='กรอกหัวข้อกิจกรรม'> "
        strHTML += "    <div id='nameMenuCheckTopicError' class='error'>กรุณาใส่หัวข้อกิจกรรม</div> "
        strHTML += " </div> "
        strHTML += " <div class='form-group mb-3'> "
        strHTML += "     <label for='nameObjective'>วัตถุประสงค์</label> "
        strHTML += "     <input type='text' id='nameObjective' class='form-control lableHead' placeholder='กรอกวัตถุประสงค์'> "
        strHTML += "     <div id='nameObjectiveError' class='error'>กรุณาใส่วัตถุประสงค์</div> "
        strHTML += " </div> "
        strHTML += " <div class='form-group mb-3'> "
        strHTML += "     <label for='nameActivity'>รายการกิจกรรม 1</label> "
        strHTML += "     <input type='text' id='nameActivity' class='form-control lableHead' placeholder='กรอกรายการกิจกรรม 1'> "
        strHTML += "     <div id='nameActivityError' class='error'>กรุณาใส่รายการกิจกรรม 1</div> "
        strHTML += " </div> "
        strHTML += " <div class='form-group mb-3'> "
        strHTML += "     <label for='nameActivity2'>รายการกิจกรรม 2</label> "
        strHTML += "     <input type='text' id='nameActivity2' class='form-control lableHead'> "
        strHTML += " </div> "
    
        // draw modal
        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='headCheckTopic' class='lableHead'>ด้านของกิจกรรม</label> "
        strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='" + nameSides + "' style='background: darkgray;' readonly> "
        strHTML += " </div> "
    
        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='nameMenuCheckTopic' class='lableHead label-required'>หัวข้อกิจกรรม</label> "
        strHTML += "<input type='text' class='form-control' id='nameMenuCheckTopic' value=''>"
        strHTML += " </div> "

        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='nameActivity' class='lableHead label-required'>วัตถุประสงค์</label> "
        strHTML += "<input type='text' class='form-control' id='nameObjective' value=''>"
        strHTML += " </div> "
    
        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='nameActivity' class='lableHead label-required'>รายการกิจกรรม 1</label> "
        strHTML += "<input type='text' class='form-control' id='nameActivity' value=''>"
        strHTML += " </div> "

        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='nameActivity2' class='lableHead'>รายการกิจกรรม 2</label> "
        strHTML += "<input type='text' class='form-control' id='nameActivity2' value=''>"
        strHTML += " </div> "
    
        strHTML2 += " <button type='button' class='btn btn-primary' onclick='fnAddNewRowFromModal(\"" + number + "\",\"" + JSON.stringify(arrObj) + "\")' data-bs-dismiss='modal'>บันทึกข้อมูล</button> "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "           
    
    
        $("#dvBodyModalOtherRiskModal")[0].innerHTML = strHTML
        $("#dvFooterModalOtherRiskModal")[0].innerHTML = strHTML2

    }
    

 }

 function fnDrawModalSignature () {
    var strHTML = ''
    var strHTML2 = ''
        // draw modal
        strHTML += " <div class='form-group'> "
        strHTML += " <label for='evaluator'>ผู้ประเมิน (เซ็นชื่อ)</label> "
        strHTML += " <div class='canvas-container'> "
        strHTML += "     <canvas id='signatureCanvas' width='460' height='200'></canvas> "
        strHTML += "     <button class='clear-button' id='clearButton'>Clear</button> "
        strHTML += " </div> "
        strHTML += " <div id='evaluatorError' class='error'>กรุณาเซ็นชื่อ</div> "
        strHTML += " </div> "
        strHTML += " <div class='form-group'> "
        strHTML += " <label for='evaluatorText'>คำนำหน้าชื่อ (ยศ)</label> "
        strHTML += " <input type='text' id='evaluatorText' class='form-control' placeholder='กรอกชื่อคำนำหน้าชื่อ' value='นอ.'> "
        strHTML += " <div id='evaluatorTextError' class='error'>กรุณาใส่ชื่อคำนำหน้าชื่อ</div> "
        strHTML += " </div> "
        strHTML += " <div class='form-group'> "
        strHTML += " <label for='position'>ตำแหน่ง</label> "
        strHTML += " <input type='text' id='position' class='form-control' placeholder='กรอกตำแหน่ง' value='ผอ.กตค.จร.ทร'> "
        strHTML += " <div id='positionError' class='error'>กรุณาใส่ตำแหน่ง</div> "
        strHTML += " </div> "
        strHTML += " <div class='form-group'> "
        strHTML += " <label for='date'>วันที่</label> "
        strHTML += " <div class='row'> "
        strHTML += "     <div class='col-4'> "
        strHTML += "         <input type='text' id='day' class='form-control datepicker-day' placeholder='วัน' value='01'> "
        strHTML += "         <div id='dayError' class='error'>กรุณาใส่วัน</div> "
        strHTML += "     </div> "
        strHTML += "     <div class='col-4'> "
        strHTML += "         <input type='text' id='month' class='form-control datepicker-month' placeholder='เดือน' value='กรกฎาคม'> "
        strHTML += "         <div id='monthError' class='error'>กรุณาใส่เดือน</div> "
        strHTML += "     </div> "
        strHTML += "     <div class='col-4'> "
        strHTML += "         <input type='text' id='year' class='form-control datepicker-year' placeholder='ปี'value='2024'> "
        strHTML += "         <div id='yearError' class='error'>กรุณาใส่ปี</div> "
        strHTML += "     </div> "
        strHTML += " </div> "
        strHTML += " </div> "
 
        strHTML2 += " <button type='button' id='submitSignatureButton' class='btn btn-primary'>บันทึกข้อมูล</button> "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "
       
        $("#dvBodySignatureModal")[0].innerHTML = strHTML
        $("#dvFooterSignatureModal")[0].innerHTML = strHTML2

        fnInitializeCanvas()

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

 function fnInitializeCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    ctx.lineWidth = 3; // เพิ่มความหนาของเส้น
    ctx.strokeStyle = "#000000"; // เปลี่ยนสีเส้นเป็นสีดำ

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        drawing = false;
    });

    document.getElementById('clearButton').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('submitSignatureButton').addEventListener('click', fnSubmitSignature);
}

function fnValidateSignature() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return canvasData.data.some(channel => channel !== 0);
}

function fnValidateForm() {
    let isValid = true;

    // Validate signature
    if (!fnValidateSignature()) {
        document.getElementById('evaluatorError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('evaluatorError').style.display = 'none';
    }

    // Validate evaluator text
    const evaluatorText = document.getElementById('evaluatorText').value;
    if (!evaluatorText) {
        document.getElementById('evaluatorTextError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('evaluatorTextError').style.display = 'none';
    }

    // Validate position
    const position = document.getElementById('position').value;
    if (!position) {
        document.getElementById('positionError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('positionError').style.display = 'none';
    }

    // Validate date
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    if (!day || !month || !year) {
        if (!day) document.getElementById('dayError').style.display = 'block';
        if (!month) document.getElementById('monthError').style.display = 'block';
        if (!year) document.getElementById('yearError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('dayError').style.display = 'none';
        document.getElementById('monthError').style.display = 'none';
        document.getElementById('yearError').style.display = 'none';
    }

    return isValid;
}

function fnSubmitSignature() {
    if (fnValidateForm()) {
        const resultContainer = document.getElementById('dvSignature');

        const canvas = document.getElementById('signatureCanvas');
        const ctx = canvas.getContext('2d');
        const evaluatorDataURL = canvas.toDataURL();

        const evaluatorText = document.getElementById('evaluatorText').value;
        const position = document.getElementById('position').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        const positionText = position ? position : '................................................';
        const buddhistYear = fnConvertToBuddhistYear(year);
        const shortYear = buddhistYear.toString().slice(-2);
        const dateText = `${fnConvertToThaiNumeralsAndPoint(day)} / ${fnConvertMonthToShort(month)} / ${fnConvertToThaiNumeralsAndPoint(shortYear)}`;

        let strHTML = `
            <div>ผู้ประเมิน: <span style="width: 200px;" class="underline-dotted">${evaluatorText} <img src="${evaluatorDataURL}" alt="ลายเซ็น" /></span></div>
            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
        `;

        resultContainer.innerHTML = strHTML;
        $('#signatureModal').modal('hide');
    }
}

// Event listener for the edit signature button
// document.getElementById('btnEditSignature').addEventListener('click', fnDrawModalSignature);


 // ฟังก์ชันเพื่อเพิ่มแถวใหม่จาก modal
function fnAddNewRowFromModal() {
    
    // Uncomment this block if you want to use SweetAlert for confirmation
    // Swal.fire({
    //     title: "",
    //     text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "บันทึกข้อมูล",
    //     cancelButtonText: "ยกเลิก"
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         Swal.fire({
    //             title: "",
    //             text: "บันทึกข้อมูลสำเร็จ",
    //             icon: "success"
    //         });
    //         $('#OtherRiskModal').modal('hide');
    //     }
    // });

    var nameSides = $('#headCheckTopic').val();
    var activityTitle = $('#nameMenuCheckTopic').val();
    var objective = $('#nameObjective').val();
    var activityName1 = $('#nameActivity').val();
    var activityName2 = $('#nameActivity2').val();
    var newId = new Date().getTime();

    // Add new rows to the globalTest array
    var testarr = [
        { id: newId, id_control: '7.', head_id: 7, maincontrol_id: 7, text: "อื่น ๆ " + activityTitle, main_Obj: "วัตถุประสงค์ของการควบคุม", Object_name: objective },
        { id: newId, id_control: '7.1', head_id: 7, text: activityName1, is_subcontrol: 0 },
    ];
    
    if (activityName2) {
        testarr.push({ id: newId, id_control: '7.2', head_id: 7, text: activityName2, is_subcontrol: 0 });
    }
    
    testarr = testarr.concat([
        { id: newId + 1, head_id: 7, sum_id: newId, value: '', text: "การรักษาความปลอดภัยเกี่ยวกับบุคคล" },
        { id: newId + 1, head_id: 7, sum_id: newId, value: '1', text: "มีการควบคุมเพียงพอ" },
        { id: newId + 1, head_id: 7, sum_id: newId, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" }
    ]);

    globalTest = globalTest.concat(testarr)
    // console.log(testarr)
    // Draw the updated table and update the HTML
    var updatedTableHTML = fnDrawTableReportAssessment(testarr);
    $('#dvFormReport tbody').append(updatedTableHTML);

    if (nameSides && activityTitle && objective && activityName1) {
        // Optionally close the modal if needed
        $('#OtherRiskModal').modal('hide');
        $('.modal-backdrop').remove();
        $('#trSidesOther').css('display', 'none');
    }


}
    
    

function fnToggleTextarea(btnUpdload,btnViewDoc,textareaId,buttonsId ,checkbox, coloums, id) {
    const btnUpdloads = document.getElementById(btnUpdload);
    const btnViewDocs = document.getElementById(btnViewDoc);
    const textarea = document.getElementById(textareaId);
    const buttons = document.getElementById(buttonsId);
    const displayText = document.getElementById('displayText' + id);
    const editIcon = document.getElementById('editIcon' + id);
    console.log(coloums)
    if (coloums == 2) {
        if (textarea && buttons) {
            btnUpdloads.style.display = 'none';
            btnViewDocs.style.display = 'none';
            textarea.style.display = checkbox.checked ? 'block' : 'none';
            textarea.value = '';
            buttons.style.display  = checkbox.checked ? 'block' : 'none';
            displayText.style.display = checkbox.checked ? 'block' : 'none';
            displayText.innerText = '';
            editIcon.style.display = 'none';
        }
    } else if (coloums == 3) {
        if (textarea && buttons) {
            btnUpdloads.style.display = 'none';
            btnViewDocs.style.display = 'none';
            textarea.style.display = checkbox.checked ? 'block' : 'none';
            textarea.value = '';
            buttons.style.display  = checkbox.checked ? 'block' : 'none';
            displayText.style.display = checkbox.checked ? 'block' : 'none';
            displayText.innerText = '';
            editIcon.style.display = 'none';
        }

    } else { // col1
        btnUpdloads.style.display = checkbox.checked ? '' : 'none';
        btnViewDocs.style.display = checkbox.checked ? '' : 'none';
        textarea.style.display = 'none';
        textarea.value = '';
        buttons.style.display  = 'none';
        displayText.style.display  = 'none';
        displayText.innerHTML = '';
        editIcon.style.display = 'none';

    }
}
function fnToggleTextSum(val, val2) {
    var textarea = '';
    var button = '';
    var displayText = '';
    var strInput = val
    var newVal = (val2.value == 1 ? strInput.substring(0, strInput.length - 1) + '0' : val)
    var editIcon = document.getElementById('editIconSum' + newVal);

    textarea = document.getElementById('commentSum' + newVal);
    button = document.getElementById('submitButtonSum' + newVal);
    displayText = document.getElementById('displayTextSum' + newVal);

    if (val2.value == 1) {
        textarea.style.display = 'none';
        button.style.display  = 'none';
        displayText.style.display  = 'none';
        displayText.innerHTML = '';
        editIcon.style.display = 'none';
    } else {
        textarea.style.display = 'block';
        button.style.display  = 'block';
        displayText.style.display  = 'block';
        displayText.innerHTML = '';
        editIcon.style.display = 'none';
    }
}

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(id) {
    const textarea = document.getElementById('comment_' + id);
    const button = document.getElementById('submitButton' + id);
    const displayText = document.getElementById('displayText' + id);
    const editIcon = document.getElementById('editIcon' + id);
    const tab = '&emsp;';
    let format = ''

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = tab + format

        /* ซ่อน textarea และปุ่ม */
        textarea.style.display = 'none';
        button.style.display = 'none';
        editIcon.style.display = 'inline';
        /* แสดงไอคอนแก้ไข */
        
    } else {
        Swal.fire({
            title: "",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning"
        });
    }
}

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitTextSum(val) {

    const textarea = document.getElementById('commentSum' + val);
    const button = document.getElementById('submitButtonSum' + val);
    const displayText = document.getElementById('displayTextSum' + val);
    const editIcon = document.getElementById('editIconSum' + val);
    const tab = '&emsp;'
    let format = ''

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = tab + format

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

function fnEditTextSum(val) {
    const textarea = document.getElementById('commentSum' + val);
    const button = document.getElementById('submitButtonSum' + val);
    const editIcon = document.getElementById('editIconSum' + val);

    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = document.getElementById('displayTextSum' + val).innerText.trim();
}


function fnDrawCommentDivEvaluation(data) {
    var strHTML = ''
    strHTML += " <div class='dvEvaluation'>สรุป : การควบคุมภายใน"+data+"</div> "
    strHTML += " <div> "
    strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83'></textarea> "
    strHTML += " </div> "
    strHTML += " <div class='text-end'> "
    strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEvaluation' onclick='fnSubmitTextCommentEvaluation()' style='width: 100px;'>ยืนยัน</button> "
    strHTML += " </div> "
    strHTML += " <div class='text-start'> "
    strHTML += " <span id='displayTextCommentEvaluation' style='white-space: pre-wrap;'></span> "
    strHTML += " <i class='las la-pencil-alt' id='editIconCommentEvaluation' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditTextCommentEvaluation()'></i> "
    strHTML += " </div> "
    // strHTML += " <span id='spanResultEvaluation'> ทรภ.๒ มีการควบคุมภายในด้านการข่าว ที่เพียงพอและเหม่าะสม.มีการรักษาความปลอดภัยเกี่ยวกับสถานที่และการปฏิบัติการด้านการข่าว รวมทั้งข้อมูลข่าวสารลับมีประสิทธิภาพเพียงพอต่อการรักษาความปลอดภัยเกี่ยวกับบุคคล มีแนวทางการบริหารจัดการเพียงพอให้การปฏิบัติงานด้านการข่าว กำลังพลมีเพียงพอที่จะปฏิบัติงานด้านการข่าว มีความรู้ความชำนาญในการวิเคราะห์ข่าวและปฏิบัติตามกฎระเบียบข้อบังคับหรือมาตรการเกี่ยวกับการรักษา ความปลอดภัยโดยเคร่งครัด ทั้งนี้ ในส่วนของเครื่องมือและอุปกรณ์ที่ใช้ในงาน ด้านการข่าว พบว่า.เครื่องมือ/อุปกรณ์ในการรวบรวมข้อมูลด้านการข่าวยังมีความไม่ทันสมัยและมีประสิทธิภาพไม่เพียงพอต่อการปฏิบัติงาน. จำเป็นต้องปรับปรุงการควบคุมภายในให้ดีขึ้น โดยการจัดหาเครื่องมือ/อุปกรณ์เพิ่มเติม เพื่อให้การดำเนินการรวบรวมข้อมูลด้านการข่าวมีประสิทธิภาพเพียงพอต่อการปฏิบัติงาน</div></span> "
    
    return strHTML
}

function fnSubmitTextCommentEvaluation() {
    var textarea = document.getElementById('commentEvaluation');
    var button = document.getElementById('submitButtonCommentEvaluation');
    var displayText = document.getElementById('displayTextCommentEvaluation');
    var editIcon = document.getElementById('editIconCommentEvaluation');
    var tab = '&emsp;'
    var format = ''

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = tab + format

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

function fnSaveDraftDocument() {
    Swal.fire({
        title: "",
        text: "คุณต้องการบันทึกฉบับร่างใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "",
            text: "บันทึกข้อมูลสำเร็จ",
            icon: "success"
          });
        }
      });
}

function fnExportDocument() {
    Swal.fire({
        title: "",
        text: "คุณต้องการ Export เอกสารใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "",
            text: "บันทึกข้อมูลสำเร็จ",
            icon: "success"
          });
        }
      });
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