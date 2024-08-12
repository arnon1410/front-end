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
        fnGetDataSelect()
    }

    /* Get data selete before create table */
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
    var strUserId = fnGetCookie("userId")
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
        strHTML += await fnDrawTableReportAssessment(data, strUserId, idSideFix, arrSides[index].NameSides)
    }
    strHTML += await fnDrawTableReportAssessmentOther(strSides, arrSides, strUserId, idSideFix, valSides)
    strHTML += "</tbody>"
    strHTML += "</table>"
    strHTML += await fnDrawCommentDivEvaluation(arrSides[index].NameSides, strUserId, idSideFix)

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='submit' class='btn btn-primary' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    // strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF' onclick='fnExportDocument()'>Export PDF</button>"
    strHTML += " </form> "
    strHTML += " </div> "
    $("#dvFormReport")[0].innerHTML = strHTML

    fnAddSaveButtonEventListener()
    
}

function fnSaveFormData(id, event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    console.log('rrrr')
    var checkedCheckboxes = $('input[type="checkbox"]:checked');
    checkedCheckboxes.each(function() {
        console.log($(this).val());  // แสดงค่า (value) ของ checkbox ที่ถูกเลือก
    });
    // var checkedColumns = [];
    //     var rows = $('table tr').slice(1); // ไม่นับแถวหัวข้อ
        
    //     var uncheckedRows = [];
    //     rows.each(function() {
    //         var checkboxes = $(this).find('input[type="checkbox"]');
    //         var isChecked = false;
            
    //         checkboxes.each(function() {
    //             if ($(this).prop('checked')) {
    //                 isChecked = true;
    //                 return false; // ออกจากการวน loop ของ checkboxes
    //             }
    //         });
            
    //         if (!isChecked) {
    //             uncheckedRows.push($(this).index() + 1); // เก็บหมายเลขแถวที่ไม่ได้เช็ค
    //         }
    //     });
            
    //     if (uncheckedRows.length > 0) {
    //         // alert('กรุณาเลือก checkbox ในแถวที่: ' + uncheckedRows.join(', '));
    //     } else { // ติ้กถูกหมดแล้ว
    //         $('input[type="checkbox"]:checked').each(function() {
    //             $(this).hide(); // ซ่อน input ที่ถูกกด
    //             $(this).siblings('label').show(); // แสดง label ในช่องนั้น
    //         });
    //         var uncheckedCheckboxes = $('input[type="checkbox"]:not(:checked)');
            
    //     }
}

function fnCreateInputRadioAndSpan(text, index, validate, isradio, description, isdisabled) {
    var strHTML = "";
    var isCheckedRadio = isradio ? 'checked' : '';
    if (validate && validate == '1') {
        strHTML += "<div style='display:flex;'>";
        strHTML += "<input type='radio' id='inputRadioSumOfSide" + index + "_" + validate + "' name='inputRadioSumOfSide" + index + "' style='margin: 5px 10px 0px 0px;' value='1' onchange='fnToggleTextSum(\"" + index + "_" + validate + "\", this, \"" + description + "\")' " + isCheckedRadio + " " + isdisabled + " />";
        strHTML += "<span>" + text + "</span>";
        strHTML += "</div>";
    } else { // กรณีไม่เพียงพอ
        strHTML += "<div style='display:flex;margin-bottom: 10px;'>";
        strHTML += "<input type='radio' id='inputRadioSumOfSide" + index + "_" + validate + "' name='inputRadioSumOfSide" + index + "' style='margin: 5px 10px 0px 0px;' value='0' onchange='fnToggleTextSum(\"" + index + "_" + validate + "\", this, \"" + description + "\")' " + isCheckedRadio + "/>";
        strHTML += "<span>" + text + "</span>";
        strHTML += "</div>";
        if (isradio == '0' && description) { // 
            strHTML += "<div style='display:flex;'>";
            strHTML += "<textarea id='commentSum" + index + "_" + validate + "' name='commentSum" + index + "_" + validate + "' rows='2' cols='33' value='' style='display:none;'></textarea>";
            strHTML += "<button class='btn btn-secondary btn-sm' type='submit' id='btnSubmitSum" + index + "_" + validate + "' style='display:none;'>ยืนยัน</button>";
            strHTML += "</div>";
            strHTML += "<div style='display:flex;'>";
            strHTML += "<p class='text-left pComment' id='displayTextSum" + index + "_" + validate + "' style='text-indent: 19px; white-space: pre-wrap;'>" + description + "</p>";
            strHTML += "<i class='las la-pencil-alt' id='editIconSum" + index + "_" + validate + "' style='cursor:pointer; margin-left: 10px;' onclick='fnEditTextSum(\"" + index + "_" + validate + "\", \"" + (description || '') + "\")'></i>";
            strHTML += "</div>";
        } else {
            strHTML += "<div style='display:flex;'>";
            strHTML += "<textarea id='commentSum" + index + "_" + validate + "' name='commentSum" + index + "_" + validate + "' rows='2' cols='33' value='' style='display:none;'></textarea>";
            strHTML += "<button class='btn btn-secondary btn-sm' type='submit' id='btnSubmitSum" + index + "_" + validate + "' style='display:none;'>ยืนยัน</button>";
            strHTML += "</div>";
            strHTML += "<div style='display:flex;'>";
            strHTML += "<p class='text-left pComment' id='displayTextSum" + index + "_" + validate + "' style='text-indent: 19px; white-space: pre-wrap;'></p>";
            strHTML += "<i class='las la-pencil-alt' id='editIconSum" + index + "_" + validate + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditTextSum(\"" + index + "_" + validate + "\", \"" + (description || '') + "\")'></i>";
            strHTML += "</div>";
            
        }
    }

    // เรียกฟังก์ชัน fnAddEventListenersSum เมื่อ element ถูกสร้างใน DOM
    fnObserveElementCreation(`btnSubmitSum${index}_${validate}`, () => {
        fnAddEventListenersSum(`${index}_${validate}`);
    });

    return strHTML;
}

function fnObserveElementCreation(id, callback) {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const element = document.getElementById(id);
                if (element) {
                    observer.disconnect();
                    callback();
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

async function fnDrawTableReportAssessment(data, strUserId, idSideFix, nameSides) {
    var strHTML = "" ;
    var dataControl = data
    var dataCheckbox = await fnGetDataResultQR(strUserId, idSideFix) // call function 
    var dataRadio = await fnGetDataResultEndQR(strUserId, idSideFix) // call function 
    var checkboxIndex = 0;
    var radioIndex = 0;
    
    var combinedArray = dataControl.map(formItem => {
        if (formItem.ischeckbox === 1 && checkboxIndex < dataCheckbox.length) {
            var checkboxData = dataCheckbox[checkboxIndex++];
            return {
                ...formItem,
                idQR: checkboxData.id,
                checkbox: checkboxData.checkbox,
                descResultQR: checkboxData.descResultQR,
                fileName: checkboxData.fileName
            };
        } else if ((formItem.sum_id && formItem.head_id) && radioIndex < dataRadio.length) {
            var radioData = dataRadio[radioIndex];
            if (radioData.radio == formItem.value && radioData.headID == formItem.head_id) {
                return {
                    ...formItem,
                    radio: radioData.radio,
                    descResultEndQR: radioData.descResultEndQR
                };
            } else {
                return formItem;
            }
        } else {
            return formItem;
        }
    });
    //console.log(combinedArray);   
    for (var i = 0; i < combinedArray .length; i++) {
        var item = combinedArray [i];
        if (item.mainControl_id !== undefined || item.sum_id !== undefined) {
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
                if (item.objectName) { // เพื่อ ......
                    strHTML += "<tr><td style='width: 55%;text-indent: 17px;font-style: italic;'>" + item.objectName + "</td><td></td><td></td><td></td></tr>";
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
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_innercontrol, item.text, item.id, '26%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides);
                } else if (item.id_subcontrol) {
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_subcontrol, item.text, item.id, '12%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides);
                } else {
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_control, item.text, item.id, '17px', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides);
                }
            }
        }

    }
    return strHTML;
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

function fnCreateCheckboxAndTextAreaRow(id_control, text, id, size, ischeckbox, description, fileName, idQR, nameSides, isHide) {
    // Determine which checkbox should be checked
    var strHTML2 = '';
    var haveDataChecked = ischeckbox === 'y' ? 'checked' : '';
    var nothaveDataChecked = ischeckbox === 'n' ? 'checked' : '';
    var notAppDataChecked = ischeckbox === 'na' ? 'checked' : '';
    var isHidden = isHide ? 'hidden' : '' ;

    strHTML2 += "<tr>";
    strHTML2 += "<td style='width: 55%; text-indent: " + size + "'>" + (id_control ? fnConvertToThaiNumeralsAndPoint(id_control) + ' ' : '') + text + "</td>";
    strHTML2 += "<td style='width: 8%;' class='text-center checkbox-container'>";
    strHTML2 += "<input type='checkbox' id='haveData_" + id + "' class='have-checkbox "+ isHidden +"' name='haveData_" + id + "' onchange='fnToggleTextarea(this, \"1\", \"" + id + "\", \"" + ischeckbox + "\", \"" + description + "\", \"" + fileName + "\")' " + haveDataChecked + "/>";
    strHTML2 += "<label for='haveData_" + id + "' id='lablehaveData_" + id + "' class='hidden'>&#10003;</label>";
    strHTML2 += "</td>";
    strHTML2 += "<td style='width: 8%;' class='text-center checkbox-container'>";
    strHTML2 += "<input type='checkbox' id='nothaveData_" + id + "' class='nothave-checkbox' name='nothaveData_" + id + "' onchange='fnToggleTextarea(this, \"2\", \"" + id + "\", \"" + ischeckbox + "\", \"" + description + "\", \"" + fileName + "\")' " + nothaveDataChecked + "/>";
    strHTML2 += "<label for='nothaveData_" + id + "' id='lablenothaveData_" + id + "' class='hidden' style='width: 4%;'>&#10005;</label>";
    strHTML2 += "<input type='checkbox' id='notAppData_" + id + "' class='notapp-checkbox "+ isHidden +"' name='notAppData_" + id + "' onchange='fnToggleTextarea(this, \"3\", \"" + id + "\", \"" + ischeckbox + "\", \"" + description + "\", \"" + fileName + "\")' " + notAppDataChecked + "/>";
    strHTML2 += "<label for='notAppData_" + id + "' id='lablenotAppData_" + id + "' class='hidden' style='width: 4%;'>NA</label>";
    strHTML2 += "</td>";
    strHTML2 += "<td style='width: 29%;'>" + fnCreateTextAreaAndButton(text, id, ischeckbox, description, fileName, nameSides, idQR) + "</td>";
    strHTML2 += "</tr>";

    return strHTML2;
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
            if (currentMainControlId !== item.mainControl_id) {
                currentMainControlId = item.mainControl_id;
                fnAddMainHeadingIfNeeded(currentMainControlId);
            }

            if (item.mainControl_id !== undefined || item.sum_id !== undefined) {
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
                    if (item.objectName) { // เพื่อ ......
                        strHTML += "<tr><td style='width: 55%;font-style: italic;text-indent: 12%;'>" + item.objectName + "</td><td></td><td></td><td></td></tr>";
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

            // เพิ่ม Event Listener ให้กับปุ่มที่สร้างขึ้นใหม่ในแต่ละรอบของ loop
            // document.getElementById(`submitButton${id}`).addEventListener('click', function(event) {
            //     fnSubmitText(id, event);
            // });

            // เพิ่ม Event Listener ให้กับปุ่มที่สร้างขึ้นใหม่ในแต่ละรอบของ loop
            // document.getElementById(`submitButtonSum${id}`).addEventListener('click', function(event) {
            //     fnSubmitTextSum(id, event);
            // });
        }
    }
    return strHTML;
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

async function fnDrawTableReportAssessmentOther(strSides, arrSides, strUserId, idSideFix, valSides) {
    var strHTML = "" ;
    var arrSide = arrSides
    var radioIndex = 0;
    // var arrObject = []
    var dataSQL = await fnGetDataResultOtherQR(strUserId, idSideFix)
    var index = arrSide.findIndex(item => item.key === strSides);

    if (dataSQL && dataSQL.length > 0) {
        var dataRadio = await fnGetDataResultEndQR(strUserId, idSideFix, dataSQL[0].id)
        var combinedArray = dataSQL.map(formItem => {
         if (formItem.sum_id && radioIndex < dataRadio.length) {
            var radioData = dataRadio[radioIndex];
            if ((radioData.radio == formItem.value) && radioData.headID ) {
                return {
                    ...formItem,
                    radio: radioData.radio,
                    descResultEndQR: radioData.descResultEndQR
                };
            } else {
                return formItem;
            }
        } else {
            return formItem;
        }
    });
    // console.log(combinedArray)

        for (var i = 0; i < combinedArray .length; i++) {
            var items = combinedArray [i];
            if (items.mainControl_id !== undefined || items.sum_id !== undefined) {
                if (items.sum_id && items.value) { // ส่วนสรุป
                    strSumDetail = fnMapValueToCallFunction(items, 'disabled') // fix disabled เนื่องจากเป็นกรณีที่ checkbox
                    if (items.value == 0) {// ใส่เส้น ล่างตาราง
                        strHTML += "<tr class='trSidesSum-Line'><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                    } else {
                        strHTML += "<tr><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                    }
                } else { // ส่วนอื่น ๆ วัตถุประสงค์
                    if (items.sum_id) { // ตรงส่วนสรุปแต่ละคำถาม
                        strHTML += "<tr><td style='width: 55%;font-weight: bold;'><u>สรุป</u> : " + items.text + "</td><td></td><td></td><td></td></tr>";
                    } else { // หัวข้อหลัก 1,2,3,4,5
                        strHTML += "<tr><td style='width: 55%;;font-weight: bold;padding-top: 5px;'>"+ fnConvertToThaiNumeralsAndPoint(items.id_control) + ' ' + items.text + "</td><td></td><td></td><td></td></tr>";
                    }
                    if (items.main_Obj) { //วัตถุประสงค์ของการควบคุม ใช้ร่วมกัน
                        strHTML += "<tr><td style='width: 55%;text-indent: 17px;font-weight: bold;'>" + items.main_Obj + "</td><td></td><td></td><td></td></tr>";
                    }
                    if (items.objectName) { // เพื่อ ......
                        strHTML += "<tr><td style='width: 55%;text-indent: 17px;font-style: italic;'>" + items.objectName + "</td><td></td><td></td><td></td></tr>";
                    }
                }
            } else { // หัวข้อย่อยทั้งหมด
                if ((items.is_subcontrol && items.is_subcontrol == 1) || (items.is_innercontrol && items.is_innercontrol == 1)) { // ถ้ามีหัวข้อย่อย 
                    strHTML += "<tr><td style='width: 55%;text-indent: 17px;'>"+ fnConvertToThaiNumeralsAndPoint(items.id_control) + ' ' + items.text + "</td><td></td><td></td><td></td></tr>";
                } else { // ไม่มีหัวข้อย่อย is_subcontrol == 0 หรือ items.is_innercontrol == 0
                    if (items.id_innercontrol) { // 1
                        strHTML += fnCreateCheckboxAndTextAreaRow(items.id_innercontrol, items.text, items.id, '26%', items.checkbox ? items.checkbox : '', items.descResultQR  ? items.descResultQR : '', items.fileName  ? items.fileName : '', items.idQR  ? items.idQR : '', '', 1);
                    } else {
                        strHTML += fnCreateCheckboxAndTextAreaRow(items.id_control, items.text, items.id, '17px', items.checkbox ? items.checkbox : '', items.descResultQR  ? items.descResultQR : '', items.fileName  ? items.fileName : '', items.idQR  ? items.idQR : '', '', 1);
                    }
                }
            }
        }
    } else {
        strHTML += "    <tr id='trSidesOther'><td class='tdSidesOther' style='width: 55%;font-weight: bold;padding-top: 5px;'>"
        strHTML += "    <div> "+ fnConvertToThaiNumeralsAndPoint(arrSide[index].value) +". อื่น ๆ "
        strHTML += "    <button id='btn_SidesOther' type='button' class='btn btn-success btn-sm' onclick='fnGetModalSidesOther(\"" + strSides + "\",\"" + arrSide[index].value + "\",\"" + arrSide[index].NameSides + "\",\"" + idSideFix + "\",\"" + valSides + "\")' style='margin-left : 5px;'  data-bs-toggle='modal' data-bs-target='#OtherRiskModal'>"
        strHTML += "    <i class='las la-plus mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>เพื่มความเสี่ยงอื่นที่พบ</span>"
        strHTML += "    </button>"
        strHTML += "  <div id='dvSidesOther2'>"
        strHTML += "    <div>............................................................................................</div>"
        strHTML += "    <div>............................................................................................</div>"
        strHTML += "    </td>"
        strHTML += "    <td class='tdSidesOther'></td><td class='tdSidesOther'></td><td class='tdSidesOther'></td></tr>";
        strHTML += "  </div> "
    }
 
    return strHTML;
}

async function fnDrawCommentDivEvaluation(data, strUserId, idSideFix) {
    var strHTML = ''
    var strUserId = fnGetCookie("userId")
    var dataSummary = await fnGetDataResultCONQR(strUserId, idSideFix)

    // ตรวจสอบว่า dataSummary มีข้อมูลและไม่เป็น undefined หรือ null
    var descConQR = (dataSummary && dataSummary.length > 0) ? dataSummary[0].descConQR : '';
    var prefixAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].prefixAsessor : '';
    var signPath = (dataSummary && dataSummary.length > 0) ? dataSummary[0].signPath : '';
    var position = (dataSummary && dataSummary.length > 0) ? dataSummary[0].position : '';
    var dateAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].dateAsessor : '';

    strHTML += " <div class='dvEvaluation'>สรุป : การควบคุมภายใน" + data + "</div> "
    if (descConQR) {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83' style='display:none;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEV' style='display:none; width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start' style='text-indent:4%'> "
        strHTML += " <span id='displayTextCommentEV' style=' white-space: pre-wrap;'> " + descConQR + " </span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEV' style='cursor:pointer; margin-left: 10px;' onclick='fnEditTextCommentEV()'></i> "
        strHTML += " </div> "
    } else {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83' style=''></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEV' style='width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start'> "
        strHTML += " <span id='displayTextCommentEV' style='white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEV' style='display:none;cursor:pointer; margin-left: 10px;' onclick='fnEditTextCommentEV()'></i> "
        strHTML += " </div> "
    }

    strHTML += " <div id='dvSignature' class='dvSignature'> "
    if (prefixAsessor) {
        strHTML += `<div>ผู้ประเมิน: <span style="width: 200px;" class="underline-dotted">${prefixAsessor} <img src="${signPath ? signPath : ''}" alt="ลายเซ็น" /></span></div>`
    } else {
        strHTML += " <div>ชื่อผู้ประเมิน..............................................</div> "
    }

    if (position) {
        strHTML += `<div><div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${position}</span></div>`
    } else {
        strHTML += " <div>ตำแหน่ง.....................................................</div> "
    }

    if (dateAsessor) {
        strHTML += `<div>วันที่: <span style="width: 232px;" class="underline-dotted">${fnFormatDateToThai(dateAsessor)}</span></div>`
    } else {
        strHTML += " <div>วันที่...........................................................</div> "
    }
    strHTML += " </div> "
    strHTML += " </div> "
    // btn -> fnDrawModalSignature 
    strHTML += " <div id='dv-btn-Signature' class='dv-btn-Signature' > "
    strHTML += "    <button id='btnEditSignature' type='button' class='btn btn-warning btn-sm' onclick='fnDrawModalSignature(\"" + prefixAsessor + "\", \"" + signPath + "\", \"" + position + "\", \"" + dateAsessor + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'> "
    strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span> "
    strHTML += "    </button> "
    strHTML += " </div> "


    // ใช้ MutationObserver เพื่อตรวจจับการสร้างปุ่มและเพิ่ม event listener
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const button = document.getElementById('submitButtonCommentEV');
                if (button) {
                    fnAddEventListenersCommentEV();
                    observer.disconnect(); // หยุดการตรวจจับเมื่อพบปุ่มแล้ว
                }
            }
        }
    });

    // เริ่มการตรวจจับ
    observer.observe(document.body, { childList: true, subtree: true });

    return strHTML;
}

async function fnGetDataResultQR(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultQR', dataSend)
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

async function fnGetDataResultEndQR(userId, sideId, otherId) {
    var dataSend = {
        userId: userId,
        sideId: sideId,
        otherId: otherId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultEndQR', dataSend)
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

async function fnGetDataResultOtherQR(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultOtherQR', dataSend)
        var res = response.data.result
        console.log(res)
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

async function fnGetDataResultCONQR(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultConQR', dataSend)
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

function fnMapValueToCallFunction(items, isdisabled) {
    // ตรวจสอบว่า items เป็น object หรือ array
    if (Array.isArray(items)) {
        // ฟังก์ชันในการกรองและอัปเดตข้อมูลถ้าเป็น array
        items = items.map(item => {
            if (item.sum_id !== null && item.sum_id !== undefined) {
                item.text = fnCreateInputRadioAndSpan(item.text, item.head_id, item.value, (items.radio ? items.radio: ''), (items.descResultEndQR ? items.descResultEndQR: ''), (isdisabled ? isdisabled: ''));
            }
            return item;
        });
    } else if (items && typeof items === 'object') {
        // ฟังก์ชันในการอัปเดตข้อมูลถ้าเป็น object
        if (items.sum_id !== null && items.sum_id !== undefined) {
            items.text = fnCreateInputRadioAndSpan(items.text, items.head_id, items.value, (items.radio ? items.radio: ''), (items.descResultEndQR ? items.descResultEndQR: ''), (isdisabled ? isdisabled: ''));
        }
        return items;
    } else {
        console.error("The provided items is neither an array nor a valid object");
    }
}

function fnCreateTextAreaAndButton(text, id, ischeckbox, description, fileName, nameSides, idQR) {
    var strHTML = ''
    if (ischeckbox == 'y') {
        if (fileName) { // ถ้ามีไฟล์แนบมา 
            strHTML += `
                <div style='display:flex; align-items: center;'>
                    <textarea id='comment_${id}' name='comment_${id}' rows='1' cols='15' style='display:none'></textarea>
                    <button class='btn btn-secondary btn-sm' type='submit' id='submitButton${id}' style='display:none'>ยืนยัน</button>
                </div>
                <div style='display:flex; align-items: center;'>
                    <p class='text-left pComment' id='displayText${id}' style='text-indent: 17px;white-space: pre-wrap;'></p>
                    <i class='las la-pencil-alt' id='editIcon${id}' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText("${id}")'></i>
                </div>
                <div id='dvUploadDoc${id}' class='text-center align-middle' style='display: flex;justify-content: center;'>
                    <button id='btnUploadDoc${id}' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig("${text}", "${id}", "${nameSides}", "${idQR}")' data-bs-toggle='modal' data-bs-target='#relateDocumentModal'>
                        <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span>
                    </button>
                    <button id='btnViewDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnViewDocConfig("${text}", "${id}", "${idQR}")'>
                        <i class='las la-search' aria-hidden='true'></i><span>ดูเอกสาร</span>
                    </button>
                    <button id='btnFillDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig("${text}", "${id}")' style='display:none;'>
                        <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span>
                    </button>
                </div>
            `;
        } else if (description) { // ถ้ามีการกรอกคำอธิบายมา 
            strHTML += `
                <div style='display:flex; align-items: center;'>
                    <textarea id='comment_${id}' name='comment_${id}' rows='1' cols='15' style='display:none'></textarea>
                    <button class='btn btn-secondary btn-sm' type='submit' id='submitButton${id}' style='display:none'>ยืนยัน</button>
                </div>
                <div style='display:flex; align-items: center;'>
                    <p class='text-left pComment' id='displayText${id}' style='text-indent: 17px;white-space: pre-wrap;'>${description}</p>
                    <i class='las la-pencil-alt' id='editIcon${id}' style='cursor:pointer; margin-left: 10px;' onclick='fnEditText("${id}")'></i>
                </div>
                <div id='dvUploadDoc${id}' class='text-center align-middle' style='display: flex;justify-content: center;'>
                    <button id='btnUploadDoc${id}' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig("${text}", "${id}", "${nameSides}", "${idQR}")' style='display:none;' data-bs-toggle='modal' data-bs-target='#relateDocumentModal'>
                        <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span>
                    </button>
                    <button id='btnViewDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnViewDocConfig("${text}", "${id}", "${idQR}")' style='display:none;'>
                        <i class='las la-search' aria-hidden='true'></i><span>ดูเอกสาร</span>
                    </button>
                    <button id='btnFillDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig("${text}", "${id}")' style='display:none;'>
                        <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span>
                    </button>
                </div>
            `;
 
        } else { // แสดงปุ่มอัปโหลด กับ กรอกข้อมูล
            strHTML += `
                <div style='display:flex; align-items: center;'>
                    <textarea id='comment_${id}' name='comment_${id}' rows='1' cols='15' style='display:none'></textarea>
                    <button class='btn btn-secondary btn-sm' type='submit' id='submitButton${id}' style='display:none'>ยืนยัน</button>
                </div>
                <div style='display:flex; align-items: center;'>
                    <p class='text-left pComment' id='displayText${id}' style='text-indent: 17px;white-space: pre-wrap;'>${description ? description : ''}</p>
                    <i class='las la-pencil-alt' id='editIcon${id}' style='display:none;cursor:pointer; margin-left: 10px;' onclick='fnEditText("${id}")'></i>
                </div>
                <div id='dvUploadDoc${id}' class='text-center align-middle' style='display: flex;justify-content: center;'>
                    <button id='btnUploadDoc${id}' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig("${text}", "${id}", "${nameSides}", "${idQR}")' data-bs-toggle='modal' data-bs-target='#relateDocumentModal'>
                        <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span>
                    </button>
                    <button id='btnViewDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnViewDocConfig("${text}", "${id}", "${idQR}")' style='display:none;'>
                        <i class='las la-search' aria-hidden='true'></i><span>ดูเอกสาร</span>
                    </button>
                    <button id='btnFillDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig("${text}", "${id}")'>
                        <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span>
                    </button>
                </div>
            `;
        }
    } else if (ischeckbox == 'n' || ischeckbox == 'na') {
        if (description) { // ถ้า description ไม่ใช่ค่าว่าง
            strHTML += `
                <div style='display:flex; align-items: center;'>
                    <textarea id='comment_${id}' name='comment_${id}' rows='1' cols='15' style='display:none'></textarea>
                    <button class='btn btn-secondary btn-sm' type='submit' id='submitButton${id}' style='display:none'>ยืนยัน</button>
                </div>
                <div style='display:flex; align-items: center;'>
                    <p class='text-left pComment' id='displayText${id}' style='text-indent: 17px;white-space: pre-wrap;'>${description ? description : ''}</p>
                    <i class='las la-pencil-alt' id='editIcon${id}' style='cursor:pointer; margin-left: 10px;' onclick='fnEditText("${id}")'></i>
                </div>
                <div id='dvUploadDoc${id}' class='text-center align-middle' style='display: flex;justify-content: center;'>
                    <button id='btnUploadDoc${id}' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig("${text}", "${id}", "${nameSides}", "${idQR}")' data-bs-toggle='modal' data-bs-target='#relateDocumentModal' style='display:none;'>
                        <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span>
                    </button>
                    <button id='btnViewDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnViewDocConfig("${text}", "${id}", "${idQR}")' style='display:none;'>
                        <i class='las la-search' aria-hidden='true'></i><span>ดูเอกสาร</span>
                    </button>
                    <button id='btnFillDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig("${text}", "${id}")' style='display:none;'>
                        <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span>
                    </button>
                </div>
        `;
        } else {  // แสดง Textarea และ ปุ่มยืนยืน
            strHTML += `
                <div style='display:flex; align-items: center;'>
                    <textarea id='comment_${id}' name='comment_${id}' rows='1' cols='15'></textarea>
                    <button class='btn btn-secondary btn-sm' type='submit' id='submitButton${id}'>ยืนยัน</button>
                </div>
                <div style='display:flex; align-items: center;'>
                    <p class='text-left pComment' id='displayText${id}' style='text-indent: 17px;white-space: pre-wrap;'>${description ? description : ''}</p>
                    <i class='las la-pencil-alt' id='editIcon${id}' style='display:none;cursor:pointer; margin-left: 10px;' onclick='fnEditText("${id}")'></i>
                </div>
                <div id='dvUploadDoc${id}' class='text-center align-middle' style='display: flex;justify-content: center;'>
                    <button id='btnUploadDoc${id}' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig("${text}", "${id}", "${nameSides}", "${idQR}")' data-bs-toggle='modal' data-bs-target='#relateDocumentModal' style='display:none;'>
                        <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span>
                    </button>
                    <button id='btnViewDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnViewDocConfig("${text}", "${id}", "${idQR}")' style='display:none;'>
                        <i class='las la-search' aria-hidden='true'></i><span>ดูเอกสาร</span>
                    </button>
                    <button id='btnFillDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig("${text}", "${id}")' style='display:none;'>
                        <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span>
                    </button>
                </div>
        `;
        // เรียกฟังก์ชัน fnAddEventListenersSum เมื่อ element ถูกสร้างใน DOM
            fnObserveElementCreation(`submitButton${id}`, () => {
                fnAddEventListeners(`${id}`);
            });
        }
    }  else { // ถ้า ischeckbox เป็นค่า NULL 
        strHTML += `
            <div style='display:flex; align-items: center;'>
                <textarea id='comment_${id}' name='comment_${id}' rows='1' cols='15' style='display:none'></textarea>
                <button class='btn btn-secondary btn-sm' type='submit' id='submitButton${id}' style='display:none'>ยืนยัน</button>
            </div>
            <div style='display:flex; align-items: center;'>
                <p class='text-left pComment' id='displayText${id}' style='text-indent: 17px;white-space: pre-wrap;'>${description ? description : ''}</p>
                <i class='las la-pencil-alt' id='editIcon${id}' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText("${id}")'></i>
            </div>
            <div id='dvUploadDoc${id}' class='text-center align-middle' style='display: flex;justify-content: center;'>
                <button id='btnUploadDoc${id}' type='button' class='btn btn-primary btn-sm btn-custom' onclick='fnUploadDocConfig("${text}", "${id}", "${nameSides}", "${idQR}")' data-bs-toggle='modal' data-bs-target='#relateDocumentModal' style='display:none;'>
                    <i class='las la-upload' aria-hidden='true'></i><span>อัปโหลด</span>
                </button>
                <button id='btnViewDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnViewDocConfig("${text}", "${id}", "${idQR}")' style='display:none;'>
                    <i class='las la-search' aria-hidden='true'></i><span>ดูเอกสาร</span>
                </button>
                <button id='btnFillDoc${id}' type='button' class='btn btn-success btn-sm btn-custom2' onclick='fnChangeToFillDocConfig("${text}", "${id}")' style='display:none;'>
                    <i class='las la-pen' aria-hidden='true'></i><span>กรอกข้อมูล</span>
                </button>
            </div>
        `;
    }
    
    return strHTML;


}


function fnAddEventListeners(id) {
    const buttons = document.querySelectorAll("[id^='submitButton']");
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            const id = button.id.replace('submitButton', '');
            fnSubmitText(id, event);
        });
    });
}

function fnAddSaveButtonEventListener(id) {
    const saveButton = document.getElementById('btnSaveData');
    if (saveButton) {
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            // โค้ดสำหรับการบันทึกข้อมูล
            fnSaveFormData(id, event);
        });
    } else {
        console.error('Element with id btnSaveData not found.');
    }
}

function fnAddEventListenersSum(id) {
    const button = document.getElementById(`btnSubmitSum${id}`);
    if (button) {
        button.addEventListener('click', function(event) {
            fnSubmitTextSum(id, event);
        });
    } else {
        console.error(`Element with id btnSubmitSum${id} not found.`);
    }
}
function fnAddEventListenersCommentEV() {
    const button = document.getElementById('submitButtonCommentEV');
    if (button) {
        button.addEventListener('click', function(event) {
            fnSubmitTextCommentEV(event);
        });
    } else {
        console.error('Element with id submitButtonCommentEV not found.');
    }
}

function fnUploadDocConfig (text, id, nameSides, idQR) {
    var strHTML = ''
    var strHTML2 = ''
    var strtext = text
    // draw modal
    strHTML += " <div class='mb-3'> "
    strHTML += " <label for='headCheckTopic' class='lableHead'>หัวข้อที่ตรวจสอบ</label> "
    strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='"+ nameSides +"' style='background: darkgray;' readonly> "
    strHTML += " </div> "

    strHTML += " <div class='mb-3'> "
    strHTML += " <label for='nameMenuCheck' class='lableHead'>ชื่อรายการที่ตรวจสอบ</label> "
    
    strHTML += "<input type='text' class='form-control' id='nameMenuCheckTopic' value='"+ strtext +"' style='background: darkgray;' readonly>"
    strHTML += " </div> "

    strHTML += " <div id='dvtypefile' class='mb-3'> "
    strHTML += " <label for='formFile' class='lableHead'>ประเภทชั้นความลับของเอกสาร</label> "
    strHTML += " <select id='selectTypeSecret' class='form-select' aria-label='Default select example'> "
    strHTML += " <option value='show' selected>ลับ</option> "
    strHTML += " <option value='verySecret'>ลับมาก</option> "
    strHTML += " <option value='mostSecret'>ลับที่สุด</option> "
    strHTML += " </select> "
    strHTML += " </div> "

    strHTML += " <div id='dvuploadfile' class='mb-3'> "
    strHTML += " <label for='formFile' class='lableHead'>ไฟล์ที่แนบ</label> "
    strHTML += " <input class='form-control form-control-sm' id='formFile' type='file' accept='.doc, .docx, .pdf'> "

    strHTML += " </div> "


    strHTML2 += " <button id='btnSaveDataUpload' type='button' class='btn btn-primary'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "            


    $("#dvBodyModalRelateDocumentModal")[0].innerHTML = strHTML
    $("#dvFooterModalRelateDocumentModal")[0].innerHTML = strHTML2

    $('#selectTypeSecret').change(function() {
        if ($(this).val() === 'show') {
            $('#dvuploadfile').removeClass('hidden');
        } else {
            $('#dvuploadfile').addClass('hidden');
        }
    });

    $('#btnSaveDataUpload').on('click', function() {
        fnSaveDataUploadDocument(id, idQR);
    });
}

async function fnViewDocConfig(text, id, idQR) {
    try {
        const response = await axios.post("http://localhost:3000/api/store/fnGetFileDocPDF", {
            idQR: idQR,
            username: fnGetCookie("username") || ''
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res = response.data;
        if (res && res.image) {
            // แปลง Base64 string เป็น Blob
            const byteCharacters = atob(res.image.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // เปิดไฟล์ PDF ในแท็บใหม่
            window.open(pdfUrl, "_blank");
        } else {
            Swal.fire({
                title: "",
                text: "ไม่พบไฟล์เอกสาร",
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "",
            text: "เกิดข้อผิดพลาดในการดึงไฟล์เอกสาร",
            icon: "error"
        });
    }
}

function fnChangeToFillDocConfig(text, id) {
    document.getElementById(`btnUploadDoc${id}`).style.display = 'none';
    document.getElementById(`btnFillDoc${id}`).style.display = 'none';
    document.getElementById(`comment_${id}`).style.display = 'block';
    document.getElementById(`btnSubmitSum${id}`).style.display = 'block';
    document.getElementById(`displayText${id}`).style.display = 'block';
}

function fnGetDataModal(strtext, id, nameSides) {
    // var arrData = fnGetDataInternalControl(id) // call function get data
 
}

function fnSaveDataUploadDocument(id, idQR) {
    var selectInput = $("#selectTypeSecret").val()
    var checkbox = ''
    var displayText = ''
    var editIcon = ''
    if (selectInput == 'verySecret') {
        $('#relateDocumentModal').modal('hide');

        checkbox = $('#checkbox' + id);
        displayText = $('#displayText' + id);
        editIcon = $('#editIcon' + id);
        displayText.css('display', 'block');
        editIcon.css('display', 'block');
        displayText.html('ไม่มีไฟล์แนบ เนื่องจากเป็นเอกสารลับมาก');
        
        $('#btnUploadDoc'+ id).hide();
        $('#btnFillDoc'+ id).hide();
        
    } else if (selectInput == 'mostSecret') {
        $('#relateDocumentModal').modal('hide');

        checkbox = $('#checkbox' + id);
        displayText = $('#displayText' + id);
        editIcon = $('#editIcon' + id);
        displayText.css('display', 'block');
        editIcon.css('display', 'block');
        displayText.html('ไม่มีไฟล์แนบ เนื่องจากเป็นเอกสารลับที่สุด');
        
        $('#btnUploadDoc'+ id).hide();
        $('#btnFillDoc'+ id).hide();
    } else { // กรณีที่มีไฟล์แนบ
        $('#relateDocumentModal').modal('hide');
        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resSQL = await fnSetFileDocPDF(idQR);
                    if (resSQL) {
                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
                        });
                        $('#btnViewDoc' + id).show();
                        $('#btnFillDoc' + id).hide();
                    } else {
                        Swal.fire({
                            title: "",
                            text: "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง ",
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

function fnSetFileDocPDF(idQR) {
    const inputFile = document.getElementById('formFile');
    const file = inputFile.files[0];
    if (!file) {
        Swal.fire({
            title: "",
            text: "กรุณาเลือกไฟล์ก่อน",
            icon: "warning"
        });
        return;
    }

    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
        reader.onload = async function () {
            try {
                const response = await axios.post("http://localhost:3000/api/store/fnSetFileDocPDF", {
                    idQR: idQR,
                    username: fnGetCookie("username") || '',
                    image: reader.result,
                    fileName: fileName
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                inputFile.value = ""; // ล้าง input file หลังอัพโหลดเสร็จ
                const res = response.data;
                if (res) {
                    resolve(res);
                }
            } catch (error) {
                console.error(error);
                reject(error);
            }
        };

        reader.onerror = function () {
            console.error(reader.error);
            reject(reader.error);
        };
    });
}

function fnGetModalSidesOther (sides, number, nameSides, idSideFix, valSides) {
    var strHTML = ''
    var strHTML2 = ''
    if (sides == 'branchoperation') {
        // strHTML += " <div class='form-group mb-3'> "
        // strHTML += "     <label for='headCheckTopic'>ด้านของกิจกรรม</label> "
        // strHTML += "     <input type='text' id='headCheckTopic' class='form-control lableHead' value='" + nameSides + "' style='background: darkgray;' readonly> "
        // strHTML += " </div> "
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
        strHTML += " <label for='description' class='lableHead label-required'>คำอธิบาย/คำตอบ</label> "
        strHTML += " <textarea class='form-control' id='description'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='form-group mb-3'> "
        strHTML += "     <label for='nameActivity2'>รายการกิจกรรม (2)</label> "
        strHTML += "     <input type='text' id='nameActivity2' class='form-control lableHead'> "
        strHTML += " </div> "

        strHTML += " class='form-group mb-3'> "
        strHTML += " <label for='description2' class='lableHead'>คำอธิบาย/คำตอบ (2)</label> "
        strHTML += " <textarea class='form-control' id='description2'></textarea> "
        strHTML += " </div> "
    } else { // ด้านที่เหลือ
    
        // draw modal
        // strHTML += " <div class='mb-3'> "
        // strHTML += " <label for='headCheckTopic' class='lableHead'>ด้านของกิจกรรม</label> "
        // strHTML += " <input type='text' class='form-control' id='headCheckTopic' value='" + nameSides + "' style='background: darkgray;' readonly> "
        // strHTML += " </div> "
    
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
        strHTML += " <label for='description' class='lableHead label-required'>คำอธิบาย/คำตอบ</label> "
        strHTML += " <textarea class='form-control' id='description'></textarea> "
        strHTML += " </div> "

        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='nameActivity2' class='lableHead'>รายการกิจกรรม (2)</label> "
        strHTML += "<input type='text' class='form-control' id='nameActivity2' value=''>"
        strHTML += " </div> "

        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='description2' class='lableHead'>คำอธิบาย/คำตอบ (2)</label> "
        strHTML += " <textarea class='form-control' id='description2'></textarea> "
        strHTML += " </div> "

        strHTML += " <div class='mb-3'> "
        strHTML += " <label for='improvement' class='lableHead label-required'>แนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น</label> "
        strHTML += " <textarea class='form-control' id='improvement'></textarea> "
        strHTML += " </div> "
    
        strHTML2 += " <button type='button' class='btn btn-primary' onclick='fnAddNewRowFromModal(\"" + number + "\",\"" + idSideFix + "\",\"" + nameSides + "\",\"" + valSides + "\")' data-bs-dismiss='modal'>บันทึกข้อมูล</button> "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "           
    
        $("#dvBodyModalOtherRiskModal")[0].innerHTML = strHTML
        $("#dvFooterModalOtherRiskModal")[0].innerHTML = strHTML2

    }
 }

 function fnDrawModalSignature (strPrefixAsessor,strSignPath, strPosition, strDateAsessor) {
    var strHTML = ''
    var strFormatDate = ''
    var strDay = ''
    var strMonth = ''
    var strYear = ''
    if (strDateAsessor) {
        strFormatDate = strDateAsessor.split('-')
        strYear = strFormatDate[0]
        strMonth = strFormatDate[1]
        strDay = strFormatDate[2]
    }

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
        strHTML += "         <input type='text' id='year' class='form-control datepicker-year' placeholder='ปี'value='" + strYear + "'> "
        strHTML += "         <div id='yearError' class='error'>กรุณาใส่ปี</div> "
        strHTML += "     </div> "
        strHTML += " </div> "
        strHTML += " </div> "
 
        strHTML2 += " <button type='button' id='submitSignatureButton' class='btn btn-primary'>บันทึกข้อมูล</button> "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "
       
        $("#dvBodySignatureModal")[0].innerHTML = strHTML
        $("#dvFooterSignatureModal")[0].innerHTML = strHTML2

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

 function fnInitializeCanvas(initialDataUrl) {
    const canvas = document.getElementById('signatureCanvas');
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
    const prefixAsessor = document.getElementById('prefixAsessor').value;
    if (!prefixAsessor) {
        document.getElementById('prefixAsessorError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('prefixAsessorError').style.display = 'none';
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
        const signPath = canvas.toDataURL();

        const prefixAsessor = document.getElementById('prefixAsessor').value;
        const position = document.getElementById('position').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        const positionText = position ? position : '................................................';
        const buddhistYear = fnConvertToBuddhistYear(year);
        const shortYear = buddhistYear.toString().slice(-2);
        const dateText = `${fnConvertToThaiNumeralsAndPoint(day)} / ${fnConvertMonthToShort(month)} / ${fnConvertToThaiNumeralsAndPoint(shortYear)}`;

        let strHTML = `
            <div>ผู้ประเมิน: <span style="width: 200px;" class="underline-dotted">${prefixAsessor} <img src="${signPath}" alt="ลายเซ็น" /></span></div>
            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
        `;

        resultContainer.innerHTML = strHTML;
        // $('#signatureModal').modal('hide');
    }
}

// Event listener for the edit signature button
// document.getElementById('btnEditSignature').addEventListener('click', fnDrawModalSignature);


 // ฟังก์ชันเพื่อเพิ่มแถวใหม่จาก modal
async function fnAddNewRowFromModal(number, idSideFix, nameSides, valSides) {
    var nameSides = $('#headCheckTopic').val();
    var activityTitle = $('#nameMenuCheckTopic').val();
    var objective = $('#nameObjective').val();
    var activityName1 = $('#nameActivity').val();
    var description1 = $('#description').val();
    var activityName2 = $('#nameActivity2').val();
    var description2 = $('#description2').val();
    var improvement = $('#improvement').val();
    
    var newId = new Date().getTime();

    var arrNew = [
        { id: newId, id_control: number + '.', head_id: number, mainControl_id: number, text: "อื่น ๆ " + activityTitle, main_Obj: "วัตถุประสงค์ของการควบคุม", objectName: objective },
        { id: newId, id_control: number + '.1', head_id: number, text: activityName1, is_subcontrol: 0 },
    ];
    
    if (activityName2) {
        arrNew.push({ id: newId, id_control: number + '.2', head_id: number, text: activityName2, is_subcontrol: 0 });
    }
    
    arrNew = arrNew.concat([
        { id: newId + 1, head_id: number, sum_id: newId, value: '', text: "การรักษาความปลอดภัยเกี่ยวกับบุคคล" },
        { id: newId + 1, head_id: number, sum_id: newId, value: '1', text: "มีการควบคุมเพียงพอ" },
        { id: newId + 1, head_id: number, sum_id: newId, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" }
    ]);

    globalTest = globalTest.concat(arrNew);
    
    var updatedTableHTML = await fnDrawTableReportAssessment(arrNew, idSideFix, nameSides);
    $('#tb_' + valSides + ' tbody').append(updatedTableHTML);

    if (nameSides && activityTitle && objective && activityName1) {
        $('#OtherRiskModal').modal('hide');
        $('.modal-backdrop').remove();
        $('#trSidesOther').css('display', 'none');
    }
}

function fnToggleTextarea(checkbox, coloums, id, ischeckbox, description, fileName) {
    var strCheckbox = ischeckbox // เช็คเพิ่ม กรณี 
    var btnUploads = document.getElementById('btnUploadDoc' + id);
    var btnViewDoc = document.getElementById('btnViewDoc' + id);
    var btnFillDoc = document.getElementById('btnFillDoc' + id);
    var textareaComment = document.getElementById('comment_' + id);
    var btnSubmit = document.getElementById('submitButton'+ id);
    var displayText = document.getElementById('displayText' + id);
    var editIcon = document.getElementById('editIcon' + id);
    if (coloums == 1) { // กด checkbox แรก
        if (strCheckbox == 'y') {
            if (fileName) {
                btnUploads.style.display = checkbox.checked ? 'block' : 'none';
                btnViewDoc.style.display = checkbox.checked ? 'block' : 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = 'none';
                displayText.style.display  = 'none';
                displayText.innerHTML = '';
                editIcon.style.display = 'none';
            } else if (description) {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = 'none';
                displayText.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.innerHTML = description;
                editIcon.style.display = checkbox.checked ? 'block' : 'none';
            } else {
                btnUploads.style.display = checkbox.checked ? 'block' : 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = checkbox.checked ? 'block' : 'none';
                textareaComment.style.display = 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = 'none';
                displayText.style.display  = 'none';
                displayText.innerHTML = '';
                editIcon.style.display = 'none';
            }

        } else if (strCheckbox == 'n' || strCheckbox == 'na' ) {
            if (description) {
                btnUploads.style.display = checkbox.checked ? 'block' : 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = checkbox.checked ? 'block' : 'none';
                textareaComment.style.display = 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = 'none';
                displayText.style.display = 'none';
                displayText.innerText = '';
                editIcon.style.display = 'none';
            } else {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = checkbox.checked ? 'block' : 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.style.display = checkbox.checked ? 'block' : 'none';
                displayText.innerText = '';
                editIcon.style.display = 'none';
                fnAddEventListeners(id)
            }
        } else {
            btnUploads.style.display = checkbox.checked ? 'block' : 'none';
            btnViewDoc.style.display = 'none';
            btnFillDoc.style.display = checkbox.checked ? 'block' : 'none';
            textareaComment.style.display = 'none';
            textareaComment.value = '';
            btnSubmit.style.display  = 'none';
            displayText.style.display  = 'none';
            displayText.innerHTML = '';
            editIcon.style.display = 'none';
        }
    } else if (coloums == 2) {  // กด checkbox สอง    
        if (strCheckbox == 'y') {
            if (fileName) {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = checkbox.checked ? 'block' : 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.style.display  = '';
                displayText.innerHTML = '';
                editIcon.style.display = 'none';
                fnAddEventListeners(id)
            } else if (description) {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = 'none';
                displayText.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.innerHTML = description;
                editIcon.style.display = checkbox.checked ? 'block' : 'none';
            } else {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = checkbox.checked ? 'block' : 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.style.display  = '';
                displayText.innerHTML = '';
                editIcon.style.display = 'none';
                fnAddEventListeners(id)
            }
        } else if (strCheckbox == 'n' || strCheckbox == 'na' ) {
            btnUploads.style.display = 'none';
            btnViewDoc.style.display = 'none';
            btnFillDoc.style.display = 'none';
            textareaComment.style.display = 'none';
            textareaComment.value = '';
            btnSubmit.style.display  = 'none';
            displayText.style.display = checkbox.checked ? 'block' : 'none';
            displayText.innerText = description;
            editIcon.style.display = checkbox.checked ? 'block' : 'none';
        } else {
            btnUploads.style.display = 'none';
            btnViewDoc.style.display = 'none';
            btnFillDoc.style.display = 'none';
            textareaComment.style.display = checkbox.checked ? 'block' : 'none';
            textareaComment.value = '';
            btnSubmit.style.display  = checkbox.checked ? 'block' : 'none';
            displayText.style.display  = '';
            displayText.innerHTML = '';
            editIcon.style.display = 'none';
            fnAddEventListeners(id)
        }
    } else {  // กด checkbox สาม
        if (strCheckbox == 'y') {
            if (fileName) {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = checkbox.checked ? 'block' : 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.style.display  = '';
                displayText.innerHTML = '';
                editIcon.style.display = 'none';
                fnAddEventListeners(id)
            } else if (description) {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = 'none';
                displayText.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.innerHTML = description;
                editIcon.style.display = checkbox.checked ? 'block' : 'none';
            } else {
                btnUploads.style.display = 'none';
                btnViewDoc.style.display = 'none';
                btnFillDoc.style.display = 'none';
                textareaComment.style.display = checkbox.checked ? 'block' : 'none';
                textareaComment.value = '';
                btnSubmit.style.display  = checkbox.checked ? 'block' : 'none';
                displayText.style.display  = '';
                displayText.innerHTML = '';
                editIcon.style.display = 'none';
                fnAddEventListeners(id)
            }
        } else if (strCheckbox == 'n' || strCheckbox == 'na' ) {
            btnUploads.style.display = 'none';
            btnViewDoc.style.display = 'none';
            btnFillDoc.style.display = 'none';
            textareaComment.style.display = 'none';
            textareaComment.value = '';
            btnSubmit.style.display  = 'none';
            displayText.style.display = checkbox.checked ? 'block' : 'none';
            displayText.innerText = description;
            editIcon.style.display = checkbox.checked ? 'block' : 'none';
        } else {
            btnUploads.style.display = 'none';
            btnViewDoc.style.display = 'none';
            btnFillDoc.style.display = 'none';
            textareaComment.style.display = checkbox.checked ? 'block' : 'none';
            textareaComment.value = '';
            btnSubmit.style.display  = checkbox.checked ? 'block' : 'none';
            displayText.style.display  = '';
            displayText.innerHTML = '';
            editIcon.style.display = 'none';
            fnAddEventListeners(id)

        }
    }
}

function fnToggleTextSum(val, val2, description) {
    var textarea = '';
    var button = '';
    var displayText = '';
    var strInput = val
    var newVal = (val2.value == 1 ? strInput.substring(0, strInput.length - 1) + '0' : val)
    var editIcon = document.getElementById('editIconSum' + newVal);

    textarea = document.getElementById('commentSum' + newVal);
    button = document.getElementById('btnSubmitSum' + newVal);
    displayText = document.getElementById('displayTextSum' + newVal);
    if (val2.value == 1) {
        textarea.style.display = 'none';
        button.style.display  = 'none';
        displayText.style.display  = 'none';
        displayText.innerHTML = '';
        editIcon.style.display = 'none';
    } else {
        if (description) {
            textarea.style.display = 'none';
            button.style.display  = 'none';
            displayText.style.display  = '';
            displayText.innerHTML = description;
            editIcon.style.display = '';
            fnAddEventListenersSum(newVal)
        } else {
            textarea.style.display = 'block';
            button.style.display  = 'block';
            displayText.style.display  = 'block';
            displayText.innerHTML = '';
            editIcon.style.display = 'none';
            fnAddEventListenersSum(newVal)
        }
    }
}

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(id, event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม

    const textarea = document.getElementById('comment_' + id);
    const button = document.getElementById('submitButton' + id);
    const displayText = document.getElementById('displayText' + id);
    const editIcon = document.getElementById('editIcon' + id);
    const tab = '&emsp;';
    let format = '';

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = tab + format;

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
function fnSubmitTextSum(val, event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม

    const textarea = document.getElementById('commentSum' + val);
    const button = document.getElementById('btnSubmitSum' + val);
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

    if (button) {
        fnAddEventListeners(id)
    }

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
    const button = document.getElementById('btnSubmitSum' + val);
    const editIcon = document.getElementById('editIconSum' + val);

    if (button) {
        fnAddEventListenersSum(val)
    }
    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = document.getElementById('displayTextSum' + val).innerText.trim();
}

function fnSubmitTextCommentEV(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม

    var textarea = document.getElementById('commentEvaluation');
    var button = document.getElementById('submitButtonCommentEV');
    var displayText = document.getElementById('displayTextCommentEV');
    var editIcon = document.getElementById('editIconCommentEV');
    var tab = '&emsp;';
    var format = '';

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = tab + format;

        // ซ่อน textarea และปุ่ม
        textarea.style.display = 'none';
        button.style.display = 'none';

        // แสดงไอคอนแก้ไข
        editIcon.style.display = 'inline';
    } else {
        Swal.fire({
            title: "",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning"
        });
    }
}

function fnEditTextCommentEV() {
    const textarea = document.getElementById('commentEvaluation');
    const button = document.getElementById('submitButtonCommentEV');
    const editIcon = document.getElementById('editIconCommentEV');

    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = document.getElementById('displayTextCommentEV').innerText.trim();
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