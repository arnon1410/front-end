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

async function fnDrawTableForm(access, valSides, objData) {
    var strUserId = ""

    if (access === 'admin') {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        strUserId = urlParams.get('userId')
    } else {
        strUserId = fnGetCookie("userId");
    }

    /* Get data selete before create table */
    var strHTML = ''
    var data = objData
    var strSides = valSides
    globalTest = objData
   
    var arrSides = [
        {id:2,  key: 'branchpersonal', NameSides: 'ด้านกำลังพล',value: 4 },
        {id:3,  key: 'branchoperation',NameSides: 'ด้านการยุทธการ', value: 3 },
        {id:4,  key: 'branchnews',NameSides: 'ด้านการข่าว', value: 7 },
        {id:5,  key: 'branchlogistics',NameSides: 'ด้านส่งกำลังบำรุง', value: 7 },
        {id:6,  key: 'branchcommunication',NameSides: 'ด้านสื่อสาร', value: 5 },
        {id:7,  key: 'branchtechnology',NameSides: 'ด้านระบบเทคโนโลยีในการบริหารจัดการ', value: 3 },
        {id:8,  key: 'branchcivilaffairs',NameSides: 'ด้านกิจการพลเรือน', value: 4 },
        {id:9,  key: 'branchbudget',NameSides: 'ด้านการงบประมาณ', value: 6 },
        {id:10, key: 'branchfinanceandacc',NameSides: 'ด้านการเงินและการบัญชี', value: 6 },
        {id:11, key: 'branchparcelsandproperty',NameSides: 'ด้านพัสดุและทรัพย์สิน', value: 8 },
    ];
    var index = arrSides.findIndex(item => item.key === strSides.toLowerCase());

    var selectedSide;
    if (index !== -1) {
        selectedSide = arrSides[index]; // ใช้ค่า object ที่พบ
    } else {
        selectedSide = {id:11, key: 'branchparcelsandproperty', NameSides: 'ด้านพัสดุและทรัพย์สิน', value: 8 };
    }
    
    var idSideFix = selectedSide.id; // ใช้ id ของ object ที่เลือก

    strHTML += " <div class='title'>แบบสอบถามการควบคุม</div> "
    strHTML += " <div class='subtitle'>" + selectedSide.NameSides + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += " <div class='form-container'> "
    strHTML += " <form id='formSaveFormQuestionnaire'> "
    strHTML += " <table id='tb_" + valSides + "'> "
    strHTML += " <thead> "
    strHTML += " <tr> "
    strHTML += fnSetHeader() 
    strHTML += " </tr> "
    strHTML += " </thead> "
    strHTML += " <tbody> "
    if (valSides == 'branchoperation' || valSides == 'branchfinanceandacc') { // ถ้าเป็นด้านยุทธการจะเรียก function นี้
        strHTML += await fnDrawTableReportAssessmentFix(data, strUserId, idSideFix, selectedSide.NameSides, valSides)
    } else {
        strHTML += await fnDrawTableReportAssessment(data, strUserId, idSideFix, selectedSide.NameSides)
    }
    strHTML += await fnDrawTableReportAssessmentOther(strSides, arrSides, strUserId, idSideFix, valSides, selectedSide.NameSides)
    strHTML += " </tbody>"
    strHTML += " </table>"
    strHTML += await fnDrawCommentDivEvaluation(selectedSide.NameSides, strUserId, idSideFix, access)
    

    strHTML += " <div class='dvFooterForm'> "
    if (access !== 'admin') {
        strHTML += "    <button type='submit' class='btn btn-success' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    }
    strHTML += " </div> "


    strHTML += " </form> "
    strHTML += " </div> "
    strHTML += " </div> "
    $("#dvFormReport")[0].innerHTML = strHTML
    if (access !== 'admin') {
        fnAddSaveButtonEventListener(data, idSideFix)
    }
    
}

async function fnSaveDraftDocument(data , idSideFix, event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    var dataSend = []
    var validateData = true;
    var stopLoop = false;
    let errorMessage = '';
    // call api
    
    var strUserId = fnGetCookie("userId")
    var strResultDocSQL= await fnGetDataResultDoc(strUserId, idSideFix)
    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    var strUserName = fnGetCookie("username")
    var checkedMainAT = $('input[name="mainActivities"]:checked'); // คำถามหลัก
    var checkedEndAT = $('input[name^="mainEndActivities"]:checked'); // ส่วนท้ายคำถามหลัก

    var checkedOtherMainAT = $('input[name="subActivities"]:checked'); // คำถามอื่น ๆ
    var checkedOtherEndAT = $('input[name^="subEndActivities"]:checked'); // ส่วนท้ายคำถามอื่น ๆ
    
    var checkedSummaryQR = $('#displayTextCommentEV').text(); // ส่วนสรุปสุดท้าย

    var strNoInput = ''
    var strIdCheckbox = ''
    var strIdQR = ''
    var strHeadId = ''

    var strDesc = ''
    // var strUpload = ''
    
    var strSplit = ''
    var arrFindQR = ''

    // set variable กรณีเกิดความเสี่ยง
    var strHeadQR = ''
    var strObjQR = ''

    // set variable ส่วนท้ายของคำถาม
    var strIdRadio = ''
    var strIdEndQR = ''
    var strEndNoInput = ''
    var strEndSplit = ''

    // set variable ส่วนเพิ่มคำถาม
    var strIdOtherQR = ''
    var strOtherNoInput = ''
    var strOtherSplit = ''

   // set variable ส่วนสรุปของแบบสอบถาม
    var strIdConQR = ''

    if (validateData && checkedMainAT.length > 0) {
        checkedMainAT.each(function() {
            if (stopLoop) {
                return false;  // ออก loop jQuery .each() 
            }
    
            strNoInput = fnExtractNumbersFromArray($(this).attr('id'))
            strIdCheckbox = fnRemoveUnderscoreAndNumbers($(this).attr('id'))
            strSplit = $(this).val().split(',') // value id ที่จะเอาไป update และ Id หัวข้อหลัก
            strHeadId = strSplit[0]
            strIdQR = strSplit[1]
            
            if (strIdCheckbox === 'haveData') { // กรณีที่ติ้ก มี / ใช่ (ถูก)
                strDesc = $('#displayText' + strNoInput).text()
                dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix, username: strUserName, idQR: strIdQR, checkbox:'y', descResultQR: strDesc, type:'mainQR'})
        
            } else if (strIdCheckbox === 'nothaveData') {  // กรณีที่ติ้ก ไม่มี / ไม่ใช่ (ผิด)
                strDesc = $('#displayText' + strNoInput).text()
                arrFindQR = data.find(item => item.head_id == strHeadId && item.hasOwnProperty('mainControl_id')); // หา Obj หัวข้อหลัก
                if (strDesc && arrFindQR) {
                    strHeadQR = arrFindQR.text
                    strObjQR = arrFindQR.objectName
                    dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix,  username: strUserName, idQR: strIdQR, checkbox:'n', descResultQR: strDesc, headName: strHeadQR, objName: strObjQR, type:'mainQR'})
                } else {
                    errorMessage = 'กรุณากรอกคำอธิบาย กรณีเลือก X';  // เก็บข้อความ error ไว้
                    validateData = false;
                    stopLoop = true;  // หยุดการวนลูปใน iteration ถัดไป
                    return false;  // หยุด loop
                }

            } else { // กรณีที่ติ้ก ไม่มี / ไม่ใช่ (NA)
                strDesc = $('#displayText' + strNoInput).text()
                if (strDesc) {
                    dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix,  username: strUserName, idQR: strIdQR, checkbox:'na', descResultQR: strDesc, type:'mainQR'})
                } else {
                    errorMessage = 'กรุณากรอกคำอธิบาย กรณีเลือก NA';  // เก็บข้อความ error ไว้
                    validateData = false;
                    stopLoop = true;  // หยุดการวนลูปใน iteration ถัดไป
                    return false;  // หยุด loop
                }
            }            
        });
    } else {
        validateData = false;
        errorMessage = 'กรุณากรอกข้อมูลคำถาม';
    }
    
    // ตรวจสอบและแสดง Swal.fire() หลังจาก loop จบ
    if (!validateData && errorMessage.trim()) {
        Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: errorMessage,
            icon: 'error'
        });
    }

    if (checkedEndAT.length > 0) {
        // validateData = true
        checkedEndAT.each(function() {
            // strEndNoInput = fnExtractNumbersFromArray($(this).attr('id'))
            strIdRadio = $(this).attr('id').slice(21)
            strEndSplit = $(this).val().split(',') // value id ที่จะเอาไป update และ Id หัวข้อหลัก
            
            strIdEndQR = strEndSplit[0]
            strHeadId = strEndSplit[1]
 
            if (strIdRadio === '1') { // มีการควบคุมเพียงพอ
                dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix,  username: strUserName, idEndQR: strIdEndQR, head_id: strHeadId, radio: '1', descResultEndQR: '', type:'mainEndQR'})
            } else { // กรณีไม่เพียงพอ
                strEndNoInput = $(this).attr('id').replace('inputRadioSumOfSide', '') // แปลงจาก displayTextSum1_1 -> 1_1
                strDesc = $('#displayTextSum' + strEndNoInput).text()
                dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix,  username: strUserName, idEndQR: strIdEndQR, head_id: strHeadId, radio: '0', descResultEndQR: strDesc, type:'mainEndQR'})
            }
            
        });
    }
    /* else { ไม่ต้องเช็คแล้ว
        validateData = false;
        if (!errorMessage) {  // เช็คว่ามีข้อความ error อยู่แล้วหรือไม่
            errorMessage = 'กรุณากรอกข้อมูลส่วนท้ายของคำถาม';
        }
    }
    */

    if (checkedOtherMainAT.length > 0) {
        // validateData = true
        checkedOtherMainAT.each(function() {
            strOtherNoInput = fnExtractNumbersFromArray($(this).attr('id'))
            strDesc = $('#displayText' + strOtherNoInput).text()
            dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix,  username: strUserName, idQR: strOtherNoInput, descResultOtherQR: strDesc, type:'subQR'})
        });
    }

    if (checkedOtherEndAT.length > 0) {
        // validateData = true
        checkedOtherEndAT.each(function() {
            strOtherSplit = $(this).val().split(',') // value id ที่จะเอาไป update และ Id หัวข้อหลัก
            
            strIdOtherQR = strOtherSplit[0]
            strHeadId = strOtherSplit[1]
            strEndNoInput = $(this).attr('id').replace('inputRadioSumOfSide', '') // แปลงจาก displayTextSum1_1 -> 1_1
            strDesc = $('#displayTextSum' + strEndNoInput).text()
            dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix,  username: strUserName, idEndQR: strIdOtherQR, head_id: strHeadId, radio: '0', descResultEndQR: strDesc, type:'mainEndQR'}) // ใช้ร่วมกับ Main เนื่องจากเก็บที่ table เดียวกัน

        });
    }

    if (checkedSummaryQR) {
        strIdConQR = $('#inputIdConQR').val()
        strDesc = $('#displayTextCommentEV').text().trim()
        dataSend.push({ userId: strUserId, userDocId: strUserDocId, sideId: idSideFix, username: strUserName, idConQR: strIdConQR, descConQR: strDesc, type:'conQR'})
    } 


    if (dataSend.length > 0 && validateData) { // ถ้าข้อมูลถูกต้องแล้ว
       Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลฉบับร่างใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resSQL = await fnSetDataFormQuestion(dataSend);
                    if (resSQL) {
                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                if (!strIdConQR) {
                                    var dataSummary = await fnGetDataResultCONQR(strUserId, idSideFix)
                                    var idConQR = (dataSummary && dataSummary.length > 0) ? dataSummary[0].id : '';
                                    $('#inputIdConQR').val(idConQR)
                                }
                            }
                        });
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

function fnCreateInputRadioAndSpan(text, headId, validate, idEndQR, isradio, description, isdisabled, isOrigin) {
    var strHTML = "";
    var isCheckedRadio = isradio ? 'checked' : '';
    var strOrigin = ''
    var strValInput = ''
    var strId = headId + "_" + validate
    if (isOrigin == 'main') {
        strOrigin = 'mainEndActivities' +  headId
    } else {
        strOrigin = 'subEndActivities' +  headId
    }

    if (validate && validate == '1') {
        strHTML += "<div style='display:flex;'>";
        // strHTML += `<input type='radio' id='inputRadioSumOfSide${strId}' name='${strOrigin}' style='margin: 5px 10px 0px 0px;' value='${idEndQR},${headId}' onchange='fnToggleTextSum("${strId}", this, "${description}")' ${isCheckedRadio} ${isdisabled}  disabled/>`;
        strHTML += `<input type='radio' id='inputRadioSumOfSide${strId}' name='${strOrigin}' style='margin: 5px 10px 0px 0px;' value='${idEndQR},${headId}' onchange='fnToggleTextSum("${strId}", this, "${description}")' ${isCheckedRadio} disabled/>`;
        strHTML += "<span>" + text + "</span>";
        strHTML += "</div>";
    } else { // กรณีไม่เพียงพอ
        strHTML += "<div style='display:flex;margin-bottom: 10px;'>";
        strHTML += `<input type='radio' id='inputRadioSumOfSide${strId}' name='${strOrigin}' style='margin: 5px 10px 0px 0px;' value='${idEndQR},${headId}' onchange='fnToggleTextSum("${strId}", this, "${description}")' ${isCheckedRadio} disabled/>`;
        strHTML += "<span>" + text + "</span>";
        strHTML += "</div>";
        if (isradio == '0' && description) { // 
            strHTML += "<div style='display:flex;'>";
            strHTML += "<textarea id='commentSum" + strId + "' name='commentSum" + strId + "' rows='2' cols='33' value='' style='display:none;'></textarea>";
            strHTML += "<button class='btn btn-secondary btn-sm' type='submit' id='btnSubmitSum" + strId + "' style='display:none;'>ยืนยัน</button>";
            strHTML += "</div>";
            strHTML += "<div style='display:flex;'>";
            strHTML += "<p class='text-left pComment' id='displayTextSum" + strId + "' style='text-indent: 19px; white-space: pre-wrap;'>" + description + "</p>";
            strHTML += "<i class='las la-pencil-alt' id='editIconSum" + strId + "' style='cursor:pointer; margin-left: 10px;' onclick='fnEditTextSum(\"" + strId + "\", \"" + (description || '') + "\")'></i>";
            strHTML += "</div>";
        } else {
            strHTML += "<div style='display:flex;'>";
            strHTML += "<textarea id='commentSum" + strId + "' name='commentSum" + strId + "' rows='2' cols='33' value='' style='display:none;'></textarea>";
            strHTML += "<button class='btn btn-secondary btn-sm' type='submit' id='btnSubmitSum" + strId + "' style='display:none;'>ยืนยัน</button>";
            strHTML += "</div>";
            strHTML += "<div style='display:flex;'>";
            strHTML += "<p class='text-left pComment' id='displayTextSum" + strId + "' style='text-indent: 19px; white-space: pre-wrap;'></p>";
            strHTML += "<i class='las la-pencil-alt' id='editIconSum" + strId + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditTextSum(\"" + strId + "\", \"" + (description || '') + "\")'></i>";
            strHTML += "</div>";
            
        }
    }

    // เรียกฟังก์ชัน fnAddEventListenersSum เมื่อ element ถูกสร้างใน DOM
    fnObserveElementCreation(`btnSubmitSum${strId}`, () => {
        fnAddEventListenersSum(`${strId}`);
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
            formItem = {
                ...formItem,
                idQR: checkboxData.id,
                checkbox: checkboxData.checkbox,
                descResultQR: checkboxData.descResultQR,
                fileName: checkboxData.fileName
            };
        }
        // แก้ล่าสุด 18/9/67
        if (formItem.sum_id && formItem.head_id && formItem.isradio) {
            // ใช้การวนลูปเพื่อเช็ค dataRadio ทั้งหมดแทนที่จะใช้ radioIndex
            dataRadio.forEach(radioDataItem => {
                // ตรวจสอบว่า headID ของ radioDataItem ตรงกับ head_id ของ formItem
                if (radioDataItem.headID == formItem.head_id) {
                    if (radioDataItem.radio == formItem.value) {
                        // ถ้า radio ตรงกับ value ให้เพิ่มข้อมูลเต็ม
                        formItem = {
                            ...formItem,
                            idEndQR: radioDataItem.idEndQR,
                            radio: radioDataItem.radio,
                            descResultEndQR: radioDataItem.descResultEndQR
                        };
                    } else {
                        // ถ้า radio ไม่ตรงกับ value ให้เพิ่มเฉพาะ idEndQR
                        formItem = {
                            ...formItem,
                            idEndQR: radioDataItem.idEndQR
                        };
                    }
                }
            });
        }

        return formItem;
    });
    // console.log(combinedArray)
    var item = []  
    for (var i = 0; i < combinedArray .length; i++) {
        item = combinedArray [i];
        if (item.mainControl_id !== undefined || item.sum_id !== undefined) {
            if (item.sum_id && item.value) { // ส่วนสรุป
                strSumDetail = fnMapValueToCallFunction(item, '', 'main')
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
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_innercontrol, item.text, item.id, item.head_id, '26%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                } else if (item.id_subcontrol) {
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_subcontrol, item.text, item.id, item.head_id, '12%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                } else {
                    strHTML += fnCreateCheckboxAndTextAreaRow(item.id_control, item.text, item.id, item.head_id, '17px', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                }
            }
        }

    }
    return strHTML;
}

function fnCreateCheckboxAndTextAreaRow(id_control, text, id, headId, size, ischeckbox, description, fileName, idQR, nameSides, isHide, isOrigin) {
    // Determine which checkbox should be checked
    var strHTML2 = '';
    var haveDataChecked = ischeckbox === 'y' ? 'checked' : '';
    var nothaveDataChecked = ischeckbox === 'n' ? 'checked' : '';
    var notAppDataChecked = ischeckbox === 'na' ? 'checked' : '';
    var isHidden = isHide ? 'hidden' : '' ;
    var strOrigin = ''
    if (isOrigin == 'main') {
        strOrigin = 'mainActivities'
    } else {
        strOrigin = 'subActivities'
    }

    strHTML2 += "<tr>";
    strHTML2 += "<td style='width: 55%; text-indent: " + size + "'>" + (id_control ? fnConvertToThaiNumeralsAndPoint(id_control) + ' ' : '') + text + "</td>";
    strHTML2 += "<td style='width: 8%;' class='text-center checkbox-container'>";
    strHTML2 += "<input type='checkbox' id='haveData_" + id + "' class='have-checkbox "+ isHidden +"' name='" + strOrigin + "' value='" + headId + "," + idQR + "' onchange='fnToggleTextarea(this, \"1\", \"" + id + "\", \"" + ischeckbox + "\", \"" + description + "\", \"" + fileName + "\")' " + haveDataChecked + "/>";
    strHTML2 += "<label for='haveData_" + id + "' id='lablehaveData_" + id + "' class='hidden'>&#10003;</label>";
    strHTML2 += "</td>";
    strHTML2 += "<td style='width: 8%;' class='text-center checkbox-container'>";
    strHTML2 += "<input type='checkbox' id='nothaveData_" + id + "' class='nothave-checkbox' name='" + strOrigin + "' value='" + headId + "," + idQR + "' onchange='fnToggleTextarea(this, \"2\", \"" + id + "\", \"" + ischeckbox + "\", \"" + description + "\", \"" + fileName + "\")' " + nothaveDataChecked + "/>";
    strHTML2 += "<label for='nothaveData_" + id + "' id='lablenothaveData_" + id + "' class='hidden' style='width: 4%;'>&#10005;</label>";
    strHTML2 += "<input type='checkbox' id='notAppData_" + id + "' class='notapp-checkbox "+ isHidden +"' name='" + strOrigin + "' value='" + headId + "," + idQR + "' onchange='fnToggleTextarea(this, \"3\", \"" + id + "\", \"" + ischeckbox + "\", \"" + description + "\", \"" + fileName + "\")' " + notAppDataChecked + "/>";
    strHTML2 += "<label for='notAppData_" + id + "' id='lablenotAppData_" + id + "' class='hidden' style='width: 4%;'>NA</label>";
    strHTML2 += "</td>";
    strHTML2 += "<td style='width: 29%;'>" + fnCreateTextAreaAndButton(text, id, ischeckbox, description, fileName, nameSides, idQR) + "</td>";
    strHTML2 += "</tr>";

    return strHTML2;
}

$(document).on('change', 'input[type="checkbox"]', function() {
    let strStatus = ''

    let checkboxId = $(this).attr('id'); // ดึงค่า ID
    let isChecked = $(this).is(':checked'); // ตรวจสอบสถานะ checked

    let strCheckboxVal = $(this).val();
    let strSplitVal = strCheckboxVal.split(',')[0].trim();
   
    var checkedMainAT = $('input[name="mainActivities"]:checked').filter(function() {
        return $(this).val().startsWith(`${strSplitVal},`);
    });

    let strTextArea = $(`#commentSum${strSplitVal}_0`)
    let strButton = $(`#btnSubmitSum${strSplitVal}_0`)
    let strDisplayText = $(`#displayTextSum${strSplitVal}_0`)
    let strEditIcon = $(`#editIconSum${strSplitVal}_0`)

    let strInputEnough = $(`#inputRadioSumOfSide${strSplitVal}_1`);
    let strInputNotEnough = $(`#inputRadioSumOfSide${strSplitVal}_0`);

    // นับจำนวน have-checkbox
    var haveCheckboxCount = checkedMainAT.filter('.have-checkbox').length;

    // นับจำนวน nothave-checkbox
    var nothaveCheckboxCount = checkedMainAT.filter('.nothave-checkbox').length;

    // นับจำนวน notapp-checkbox
    var notAppCheckboxCount = checkedMainAT.filter('.notapp-checkbox').length;

    // แสดงผลลัพธ์
    // console.log("จำนวน have-checkbox:", haveCheckboxCount);
    // console.log("จำนวน nothave-checkbox:", nothaveCheckboxCount);
    // console.log("จำนวน notapp-checkbox:", notAppCheckboxCount);

    const checkboxStates = {
        have: haveCheckboxCount > 0,
        nothave: nothaveCheckboxCount > 0,
        notapp: notAppCheckboxCount > 0
    };
    
    // ใช้ key เพื่อลดการเขียน if หลายครั้ง
    switch (true) {
        case checkboxStates.have && checkboxStates.nothave && checkboxStates.notapp:
            console.log("มีทั้ง have-checkbox, nothave-checkbox และ notapp-checkbox");
            strInputEnough.prop('checked', false);
            strInputNotEnough.prop('checked', true);
            strTextArea.show();           // แสดง textarea
            strButton.show();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.show();        // ซ่อนข้อความแสดงผล
            break;
    
        case checkboxStates.have && checkboxStates.nothave && !checkboxStates.notapp:
            console.log("มี have-checkbox และ nothave-checkbox แต่ไม่มี notapp-checkbox");
            strInputEnough.prop('checked', false);
            strInputNotEnough.prop('checked', true);
            strTextArea.show();           // แสดง textarea
            strButton.show();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.show();        // ซ่อนข้อความแสดงผล
            break;
    
        case checkboxStates.have && !checkboxStates.nothave && checkboxStates.notapp:
            console.log("มี have-checkbox และ notapp-checkbox แต่ไม่มี nothave-checkbox");
            strInputEnough.prop('checked', true);
            strInputNotEnough.prop('checked', false);
            strTextArea.hide();           // แสดง textarea
            strButton.hide();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.hide();        // ซ่อนข้อความแสดงผล
            break;
    
        case !checkboxStates.have && checkboxStates.nothave && checkboxStates.notapp:
            console.log("มี nothave-checkbox และ notapp-checkbox แต่ไม่มี have-checkbox");
            strInputEnough.prop('checked', false);
            strInputNotEnough.prop('checked', true);
            strTextArea.show();           // แสดง textarea
            strButton.show();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.show();        // ซ่อนข้อความแสดงผล
            break;
    
        case checkboxStates.have && !checkboxStates.nothave && !checkboxStates.notapp:
            console.log("มีเฉพาะ have-checkbox");
            console.log(strInputEnough)
            strInputEnough.prop('checked', true);
            strInputNotEnough.prop('checked', false);
            strTextArea.hide();           // แสดง textarea
            strButton.hide();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.hide();        // ซ่อนข้อความแสดงผล
            break;
    
        case !checkboxStates.have && checkboxStates.nothave && !checkboxStates.notapp:
            console.log("มีเฉพาะ nothave-checkbox");
            strInputEnough.prop('checked', false);
            strInputNotEnough.prop('checked', true);
            strTextArea.show();           // แสดง textarea
            strButton.show();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.show();        // ซ่อนข้อความแสดงผล
            break;
    
        case !checkboxStates.have && !checkboxStates.nothave && checkboxStates.notapp:
            console.log("มีเฉพาะ notapp-checkbox");
            strInputEnough.prop('checked', false);
            strInputNotEnough.prop('checked', false);
            strTextArea.hide();           // แสดง textarea
            strButton.hide();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.hide();        // ซ่อนข้อความแสดงผล
            break;
    
        default:
            console.log("ไม่มี checkbox ใด ๆ ถูกเลือก");
            strInputEnough.prop('checked', false);
            strInputNotEnough.prop('checked', false);
            strTextArea.hide();           // แสดง textarea
            strButton.hide();             // แสดง button 
            strEditIcon.hide();           // ซ่อนไอคอนการแก้ไข
            strDisplayText.hide();        // ซ่อนข้อความแสดงผล
            break;
    }
});

async function fnDrawTableReportAssessmentFix (data, strUserId, idSideFix, nameSides, valSides) {  /* ด้านยุทธการ */
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
        }
        if (formItem.sum_id && formItem.head_id && formItem.isradio && radioIndex < dataRadio.length) {
            var radioData = dataRadio[radioIndex];
            if (radioData.radio == formItem.value && radioData.headID == formItem.head_id) {
                formItem = {
                    ...formItem,
                    idEndQR: radioData.idEndQR,
                    radio: radioData.radio,
                    descResultEndQR: radioData.descResultEndQR
                };
                radioIndex++; // เพิ่ม radioIndex เฉพาะเมื่อข้อมูลตรงเงื่อนไข
            }
        }

        return formItem; 
     });
    /* แถวที่มี Checkbox และ TextArea */
// checkbox-container
    var mainHeadings = []
    if (valSides == 'branchoperation') {
        mainHeadings = [
            { id: 1, text: "การเตรียมกำลัง" },
            { id: 2, text: "การใช้กำลัง" }
        ];
    } else { // branchfinanceandacc
        mainHeadings = [
            { id: 2, text: "กิจกรรมการรับและเก็บรักษาเงิน" },
            { id: 4, text: "การบันทึกบัญชีและการจัดทำรายงานการเงิน" },
            { id: 5, text: "การจ่ายเงิน การรับเงิน และนำเงินส่งคลัง สำหรับหน่วยงานในสังกัดผ่านระบบอิเล็กทรอนิกส์ (e-Payment)" },

        ];
    }

    function fnAddMainHeadingIfNeeded(currentMainControlId) {
        var mainHeading = mainHeadings.find(heading => heading.id === currentMainControlId);
        if (mainHeading) {
            strHTML += `<tr><td style='width: 55%; font-weight: bold;'>${fnConvertToThaiNumeralsAndPoint(mainHeading.id)}. ${mainHeading.text}</td><td></td><td></td><td></td></tr>`;
            mainHeadings = mainHeadings.filter(heading => heading.id !== currentMainControlId);
        }
    }

    
    if (combinedArray.length > 0) {
        var currentMainControlId = null;
        var item = []
        if (valSides == 'branchoperation') {
            for (var i = 0; i < combinedArray.length; i++) {
                item = combinedArray[i];
                // console.log(currentMainControlId !== item.mainControl_id)
                if (currentMainControlId !== item.mainControl_id) {
                    currentMainControlId = item.mainControl_id;
                    fnAddMainHeadingIfNeeded(currentMainControlId);
                }

                if (item.mainControl_id !== undefined || item.sum_id !== undefined) {
                    if (item.sum_id && item.value) { // ส่วนสรุป
                        strSumDetail = fnMapValueToCallFunction(item, '', 'main')
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
                        if (item.id_subcontrol) { // ด้านการยุทธการ
                            strHTML += "<tr><td style='width: 55%;text-indent: 12%'>"+ fnConvertToThaiNumeralsAndPoint(item.id_subcontrol) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                        } else {
                            strHTML += "<tr><td style='width: 55%;text-indent: 12%;'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                        }
                 
                    } else { // ไม่มีหัวข้อย่อย is_subcontrol == 0 หรือ item.is_innercontrol == 0
                        if (item.id_innercontrol) { // 1
                                strHTML += fnCreateCheckboxAndTextAreaRow(item.id_innercontrol, item.text, item.id, item.head_id, '26%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                        } else if (item.id_subcontrol) {
                                strHTML += fnCreateCheckboxAndTextAreaRow(item.id_subcontrol, item.text, item.id, item.head_id, '12%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                        } else {
                            strHTML += fnCreateCheckboxAndTextAreaRow(item.id_control, item.text, item.id, item.head_id, '12%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                        }
                    }
                }


            }
        } else { // valSides == 'branchfinanceandacc'
            var strTextMain = '' // หัวข้อหลัก
            var strTextObj = '' // วัตถุประสงค์
            var strTextObjName = '' // เพื่อ ...
            var strSubText = '' // หัวข้อย่อย


            for (var i = 0; i < combinedArray.length; i++) {
                item = combinedArray[i];
                if (currentMainControlId !== item.mainControl_id) {
                    currentMainControlId = item.mainControl_id;
                    fnAddMainHeadingIfNeeded(currentMainControlId);
                }
                if (item.head_id == '1' || item.head_id == '3'|| item.head_id == '6'|| item.head_id == '7'|| item.head_id == '8'|| item.head_id == '9'|| item.head_id == '10') {
                    strTextMain = '0%' 
                    strTextObj = '17px'
                    strTextObjName = '17px'
                    strSubText = 'text-indent:17px'
                } else {
                    strTextMain = '17px' 
                    strTextObj = '12%'
                    strTextObjName = '12%'
                    strSubText = 'font-weight: bold;text-indent: 12%;'
                }

                if (item.mainControl_id !== undefined || item.sum_id !== undefined) {
                    if (item.sum_id && item.value) { // ส่วนสรุป
                        strSumDetail = fnMapValueToCallFunction(item, '', 'main')
                        if (item.value == 0) {// ใส่เส้น ล่างตาราง
                            strHTML += "<tr class='trSidesSum-Line'><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                        } else {
                            strHTML += "<tr><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                        }
                    } else { // ส่วนอื่น ๆ วัตถุประสงค์ 
                        if (item.sum_id) { // ตรงส่วนสรุปแต่ละคำถาม
                            strHTML += "<tr><td style='width: 55%;font-weight: bold;'><u>สรุป</u> : " + item.text + "</td><td></td><td></td><td></td></tr>";
                        } else { // หัวข้อหลัก 1,2,3,4,5
                            strHTML += "<tr><td style='width: 55%;font-weight: bold;padding-top:5px;text-indent:"+ strTextMain +"'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                        }
                        if (item.main_Obj) { //วัตถุประสงค์ของการควบคุม ใช้ร่วมกัน
                            strHTML += "<tr><td style='width: 55%;font-weight: bold;text-indent: "+ strTextObj +"'>" + item.main_Obj + "</td><td></td><td></td><td></td></tr>";
                        }
                        if (item.objectName) { // เพื่อ ......
                            strHTML += "<tr><td style='width: 55%;font-style: italic;text-indent: "+ strTextObjName +"'>" + item.objectName + "</td><td></td><td></td><td></td></tr>";
                        }
                    }
                } else { // หัวข้อย่อยทั้งหมด
                    if ((item.is_subcontrol && item.is_subcontrol == 1) || (item.is_innercontrol && item.is_innercontrol == 1)) { // ถ้ามีหัวข้อย่อย 
                            if (item.id_subcontrol) {
                                strHTML += "<tr><td style='width: 55%;text-indent: 12%'>"+ fnConvertToThaiNumeralsAndPoint(item.id_subcontrol) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                            } else {
                                strHTML += "<tr><td style='width: 55%; " + strSubText + "'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                            }
                    } else { // ไม่มีหัวข้อย่อย is_subcontrol == 0 หรือ item.is_innercontrol == 0
                        if (item.id_innercontrol) { // 1
                            strHTML += fnCreateCheckboxAndTextAreaRow(item.id_innercontrol, item.text, item.id, item.head_id, '26%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                        } else if (item.id_subcontrol) {
                            strHTML += fnCreateCheckboxAndTextAreaRow(item.id_subcontrol, item.text, item.id, item.head_id, '12%', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                        } else {
                            strHTML += fnCreateCheckboxAndTextAreaRow(item.id_control, item.text, item.id, item.head_id, '17px', item.checkbox ? item.checkbox : '', item.descResultQR  ? item.descResultQR : '', item.fileName  ? item.fileName : '', item.idQR  ? item.idQR : '', nameSides, '', 'main');
                        }
                    }
                }
            }

        }
    }
    return strHTML;
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

async function fnDrawTableReportAssessmentOther(strSides, arrSides, strUserId, idSideFix, valSides, nameSides) {
    var strHTML = "" ;
    var arrSide = arrSides
    var radioIndex = 0;
    // var arrObject = []
    var dataSQL = await fnGetDataResultOtherQR(strUserId, idSideFix)
    var index = arrSide.findIndex(item => item.key === strSides);
    var strHeadId, nameSides;
    if (index !== -1) {
        strHeadId = arrSide[index].value;
        nameSides = arrSide[index].NameSides;
    } else {
        // ถ้าไม่พบ ให้ใช้ค่า value และ NameSides ของ object สุดท้ายใน array
        strHeadId = arrSide[arrSide.length - 1].value;
        nameSides = arrSide[arrSide.length - 1].NameSides;
    }

    if (dataSQL && dataSQL.length > 0) {
        // if (1 == 0) {
        var dataRadio = await fnGetDataResultEndQR(strUserId, idSideFix, dataSQL[0].id)
        dataSQL.forEach(function(item) {
            item.head_id = strHeadId // เพิ่ม head_id 
        });

        var combinedArray = dataSQL.map(formItem => {
            if (formItem.sum_id && radioIndex < dataRadio.length) {
                var radioData = dataRadio[radioIndex];
                if ((radioData.radio == formItem.value) && radioData.headID ) {
                    return {
                        ...formItem,
                        idEndQR: radioData.idEndQR,
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
        var items = []
        for (var i = 0; i < combinedArray .length; i++) {
            items = combinedArray [i];
            if (items.mainControl_id !== undefined || items.sum_id !== undefined) {
                if (items.sum_id && items.value) { // ส่วนสรุป
                    strSumDetail = fnMapValueToCallFunction(items, 'disabled', 'sub') // fix disabled เนื่องจากเป็นกรณีที่ checkbox
                    if (items.value == 0) {// ใส่เส้น ล่างตาราง
                        strHTML += "<tr class='trSidesSum-Line'><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                    } else {
                        strHTML += "<tr><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>"
                    }
                } else { // ส่วนอื่น ๆ วัตถุประสงค์
                    if (items.sum_id) { // ตรงส่วนสรุปแต่ละคำถาม
                        strHTML += "<tr><td style='width: 55%;font-weight: bold;'><u>สรุป</u> : " + items.text + "</td><td></td><td></td><td></td></tr>";
                    } else { // หัวข้อหลัก 1,2,3,4,5
                        strHTML += "<tr><td style='width: 55%;font-weight: bold;padding-top: 5px;'>"+ fnConvertToThaiNumeralsAndPoint(items.id_control) + ' ' + items.text + "</td><td></td><td></td><td></td></tr>";
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
                        strHTML += fnCreateCheckboxAndTextAreaRow(items.id_innercontrol, items.text, items.id, items.head_id, '26%', items.checkbox ? items.checkbox : '', items.descResultQR  ? items.descResultQR : '', items.fileName  ? items.fileName : '', items.idQR  ? items.idQR : '', nameSides, '1', 'sub');
                    } else if (items.id_subcontrol) {
                        strHTML += fnCreateCheckboxAndTextAreaRow(items.id_subcontrol, items.text, items.id, items.head_id, '12%', items.checkbox ? items.checkbox : '', items.descResultQR  ? items.descResultQR : '', items.fileName  ? items.fileName : '', items.idQR  ? items.idQR : '', nameSides, '1', 'sub');
                    } else {
                        strHTML += fnCreateCheckboxAndTextAreaRow(items.id_control, items.text, items.id, items.head_id, '17px', items.checkbox ? items.checkbox : '', items.descResultQR  ? items.descResultQR : '', items.fileName  ? items.fileName : '', items.idQR  ? items.idQR : '', nameSides, '1', 'sub');
                    }
                }
            }
        }
    } else {
        strHTML += "    <tr id='trSidesOther'><td class='tdSidesOther' style='width: 55%;font-weight: bold;padding-top: 5px;'>"
        strHTML += "    <div> "+ fnConvertToThaiNumeralsAndPoint(strHeadId) +". อื่น ๆ "
        strHTML += "    <button id='btn_SidesOther' type='button' class='btn btn-success btn-sm' onclick='fnGetModalSidesOther(\"" + strSides + "\",\"" + strHeadId + "\",\"" + nameSides + "\",\"" + strUserId + "\",\"" + idSideFix + "\",\"" + valSides + "\")' style='margin-left : 5px;'  data-bs-toggle='modal' data-bs-target='#OtherRiskModal'>"
        strHTML += "    <i class='las la-plus mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>เพิ่มความเสี่ยงอื่นที่พบ</span>"
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

async function fnDrawCommentDivEvaluation(data, strUserId, idSideFix, access) {
    var strHTML = ''
    // var strUserId = fnGetCookie("userId")
    var strUpload = 'Upload'
    var strEpen = 'Epen'
    var dataSummary = await fnGetDataResultCONQR(strUserId, idSideFix)

    // ตรวจสอบว่า dataSummary มีข้อมูลและไม่เป็น undefined หรือ null
    var idConQR = (dataSummary && dataSummary.length > 0) ? dataSummary[0].id : '';
    var descConQR = (dataSummary && dataSummary.length > 0) ? dataSummary[0].descConQR : '';
    var prefixAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].prefixAsessor : '';
    var signPath = (dataSummary && dataSummary.length > 0) ? dataSummary[0].signPath : '';
    var position = (dataSummary && dataSummary.length > 0) ? dataSummary[0].position : '';
    var dateAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].dateAsessor : '';

    strHTML += " <div class='dvEvaluation'>สรุป : การควบคุมภายใน" + data + "</div> "
    
    strHTML += "  <input type='hidden' id='inputIdConQR' name='inputIdConQR' value='" + fnCheckFalsy(idConQR) + "'> "
    strHTML += "  <input type='hidden' id='inputPrefixAsessor' name='inputPrefixAsessor' value='" + fnCheckFalsy(prefixAsessor) + "'>"
    strHTML += "  <input type='hidden' id='inputSignPath' name='inputSignPath' value='" + fnCheckFalsy(signPath) + "'>"

    if (descConQR) {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83' style='display:none;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitbtnCommentEV' style='display:none; width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start' style='text-indent:4%'> "
        strHTML += " <span id='displayTextCommentEV' style='text-indent: 17px;white-space: pre-wrap;'> " + descConQR + " </span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEV' style='cursor:pointer; margin-left: 10px;' onclick='fnEditTextCommentEV()'></i> "
        strHTML += " </div> "
    } else {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83' style=''></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitbtnCommentEV' style='width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start'> "
        strHTML += " <span id='displayTextCommentEV' style='text-indent: 17px;white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEV' style='display:none;cursor:pointer; margin-left: 10px;' onclick='fnEditTextCommentEV()'></i> "
        strHTML += " </div> "
    }

    strHTML += " <div class='form-group'> ";
    strHTML += " <input type='hidden' id='inputIdUsers' class='form-control' value='" + strUserId + "' > "
    strHTML += " <input type='hidden' id='inputIdSides' class='form-control' value='" + idSideFix + "' > "
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
        // strHTML += " </div> ";
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
        strHTML += " </div> ";
    }



    // ใช้ MutationObserver เพื่อตรวจจับการสร้างปุ่มและเพิ่ม event listener
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const button = document.getElementById('submitbtnCommentEV');
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

function fnMapValueToCallFunction(items, isdisabled, isOrigin) {
    // ตรวจสอบว่า items เป็น object หรือ array
    if (Array.isArray(items)) {
        // ฟังก์ชันในการกรองและอัปเดตข้อมูลถ้าเป็น array
        items = items.map(item => {
            if (item.sum_id !== null && item.sum_id !== undefined) {
                item.text = fnCreateInputRadioAndSpan(item.text, item.head_id, item.value, (items.idEndQR ? items.idEndQR: ''), (items.radio ? items.radio: ''), (items.descResultEndQR ? items.descResultEndQR: ''), (isdisabled ? isdisabled: ''), (isOrigin ? isOrigin: ''));
            }
            return item;
        });
    } else if (items && typeof items === 'object') {
        // ฟังก์ชันในการอัปเดตข้อมูลถ้าเป็น object
        if (items.sum_id !== null && items.sum_id !== undefined) {
            items.text = fnCreateInputRadioAndSpan(items.text, items.head_id, items.value, (items.idEndQR ? items.idEndQR: ''), (items.radio ? items.radio: ''), (items.descResultEndQR ? items.descResultEndQR: ''), (isdisabled ? isdisabled: ''), (isOrigin ? isOrigin: ''));
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

function fnAddSaveButtonEventListener(data, idSideFix) {
    const saveButton = document.getElementById('btnSaveData');
    if (saveButton) {
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            // โค้ดสำหรับการบันทึกข้อมูล
            fnSaveDraftDocument(data, idSideFix, event);
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
    const button = document.getElementById('submitbtnCommentEV');
    if (button) {
        button.addEventListener('click', function(event) {
            fnSubmitTextCommentEV(event);
        });
    } else {
        console.error('Element with id submitbtnCommentEV not found.');
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
        const response = await axios.post(apiUrl + '/api/store/fnGetQRFileDocPDF', {
            idQR: idQR,
            username: fnGetCookie("username") || ''
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'blob'
        });
        const pdfBlob = response.data;
        const pdfUrl = URL.createObjectURL(pdfBlob)

        window.open(pdfUrl, "_blank")
        // version 1
        // const res = response.data;
        // if (res && res.image) {
        //     // แปลง Base64 string เป็น Blob
        //     const byteCharacters = atob(res.image.split(',')[1]);
        //     const byteNumbers = new Array(byteCharacters.length);
        //     for (let i = 0; i < byteCharacters.length; i++) {
        //         byteNumbers[i] = byteCharacters.charCodeAt(i);
        //     }
        //     const byteArray = new Uint8Array(byteNumbers);
        //     const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
        //     const pdfUrl = URL.createObjectURL(pdfBlob);

        //     // เปิดไฟล์ PDF ในแท็บใหม่
        //     window.open(pdfUrl, "_blank");
        // } else {
        //     Swal.fire({
        //         title: "",
        //         text: "ไม่พบไฟล์เอกสาร",
        //         icon: "error"
        //     });
        // }
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
    document.getElementById(`submitButton${id}`).style.display = 'block';
    document.getElementById(`displayText${id}`).style.display = 'block';

    fnAddEventListeners(id) // Add event
}

function fnSaveDataUploadDocument(id, idQR) {
    var selectInput = $("#selectTypeSecret").val()
    let checkbox = ''
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
                const response = await axios.post(apiUrl + '/api/store/fnSetQRFileDocPDF', {
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

function fnGetModalSidesOther (sides, number, nameSides, strUserId, idSideFix, valSides) {
    var strHTML = ''
    var strHTML2 = ''

        strHTML += " <div class='form-group'> "
        strHTML += " <label for='nameMenuCheckTopic' class='lableHead label-required'>หัวข้อกิจกรรม</label> "
        strHTML += " <input type='text' id='nameMenuCheckTopic' class='form-control' value=''> "
        strHTML += " <div id='nameMenuCheckTopicError' class='error'>กรุณาใส่หัวข้อกิจกรรม</div> "
        strHTML += " </div> "

        strHTML += " <div class='form-group'> "
        strHTML += " <label for='nameObjective' class='lableHead label-required'>วัตถุประสงค์</label> "
        strHTML += " <input type='text' id='nameObjective' class='form-control'  value=''> "
        strHTML += " <div id='nameObjectiveError' class='error'>กรุณาใส่วัตถุประสงค์</div> "
        strHTML += " </div> "

        strHTML += " <div class='form-group'> "
        strHTML += " <label for='nameActivity' class='lableHead label-required'>รายการกิจกรรม 1</label> "
        strHTML += " <input type='text' id='nameActivity' class='form-control' value=''> "
        strHTML += " <div id='nameActivityError' class='error'>กรุณาใส่รายการกิจกรรม 1</div> "
        strHTML += " </div> "

        strHTML += " <div class='form-group'> "
        strHTML += " <label for='description' class='lableHead label-required'>คำอธิบาย/คำตอบ</label> "
        strHTML += " <textarea class='form-control' id='description'></textarea> "
        strHTML += " <div id='descriptionError' class='error'>กรุณาใส่คำอธิบาย/คำตอบ</div> "
        strHTML += " </div> "

        strHTML += " <div class='form-group' class='lableHead'> "
        strHTML += " <label for='nameActivity2' class='lableHead'>รายการกิจกรรม (2)</label> "
        strHTML += " <input type='text' id='nameActivity2' class='form-control' value=''> "
        strHTML += " <div id='nameActivity2Error' class='error'>กรุณาใส่รายการกิจกรรม (2)</div> "
        strHTML += " </div> "

        strHTML += " <div class='form-group' class='lableHead'> "
        strHTML += " <label for='description2' class='lableHead'>คำอธิบาย/คำตอบ (2)</label> "
        strHTML += " <input type='text' id='description2' class='form-control' value=''> "
        strHTML += " <div id='description2Error' class='error'>กรุณาใส่คำอธิบาย/คำตอบ</div> "
        strHTML += " </div> "

        strHTML += " <div class='form-group'> "
        strHTML += " <label for='improvement' class='lableHead label-required'>แนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น</label> "
        strHTML += " <textarea class='form-control' id='improvement'></textarea> "
        strHTML += " <div id='improvementError' class='error'>กรุณาใส่แนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น</div> "
        strHTML += " </div> "
 
        strHTML2 += " <button type='button' id='submitSidesOther' class='btn btn-primary' onclick='fnAddNewRowFromModal(\"" + number + "\",\"" + strUserId + "\",\"" + idSideFix + "\",\"" + nameSides + "\",\"" + valSides + "\")'>บันทึกข้อมูล</button>  "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "

        $("#dvBodyModalOtherRiskModal")[0].innerHTML = strHTML
        $("#dvFooterModalOtherRiskModal")[0].innerHTML = strHTML2

        // document.getElementById('submitSidesOther').addEventListener('click', fnAddNewRowFromModal);
 }

//  function fnDrawModalSignature (idConQR, strPrefixAsessor, strSignPath, strPosition, strDateAsessor, strUserId, idSideFix) {
//     var strHTML = ''
//     var strFormatDate = ''
//     var strDay = ''
//     var strMonth = ''
//     var strYear = ''
//     if (strDateAsessor) {
//         strFormatDate = strDateAsessor.split('-')
//         strYear = strFormatDate[0]
//         strMonth = strFormatDate[1]
//         strDay = strFormatDate[2]
//     }

//     var strHTML2 = ''
//         // draw modal
//         strHTML += " <div class='form-group'> "
//         strHTML += " </div> "
//         strHTML += " <div class='form-group'> "
//         strHTML += " <label for='evaluator'>ผู้ประเมิน (เซ็นชื่อ)</label> "
//         strHTML += " <div class='canvas-container'> "
//         strHTML += "     <canvas id='signatureCanvas' width='460' height='200'></canvas> "
//         strHTML += "     <button class='clear-button' id='clearButton'>Clear</button> "
//         strHTML += " </div> "
//         strHTML += " <div id='evaluatorError' class='error'>กรุณาเซ็นชื่อ</div> "
//         strHTML += " </div> "
//         strHTML += " <div class='form-group'> "
//         strHTML += " <label for='prefixAsessor'>คำนำหน้าชื่อ (ยศ)</label> "
//         strHTML += " <input type='text' id='prefixAsessor' class='form-control' placeholder='กรอกชื่อคำนำหน้าชื่อ' value='" + strPrefixAsessor + "' > "
//         strHTML += " <div id='prefixAsessorError' class='error'>กรุณาใส่ชื่อคำนำหน้าชื่อ</div> "
//         strHTML += " </div> "
//         strHTML += " <div class='form-group'> "
//         strHTML += " <label for='position'>ตำแหน่ง</label> "
//         strHTML += " <input type='text' id='position' class='form-control' placeholder='กรอกตำแหน่ง' value='" + strPosition + "'> "
//         strHTML += " <div id='positionError' class='error'>กรุณาใส่ตำแหน่ง</div> "
//         strHTML += " </div> "
//         strHTML += " <div class='form-group'> "
//         strHTML += " <label for='date'>วันที่</label> "
//         strHTML += " <div class='row'> "
//         strHTML += "     <div class='col-4'> "
//         strHTML += "         <input type='text' id='day' class='form-control datepicker-day' placeholder='วัน' value='" + strDay + "'> "
//         strHTML += "         <div id='dayError' class='error'>กรุณาใส่วัน</div> "
//         strHTML += "     </div> "
//         strHTML += "     <div class='col-4'> "
//         strHTML += "         <input type='text' id='month' class='form-control datepicker-month' placeholder='เดือน' value='" + fnConvertThaiMonthName(strMonth) + "'> "
//         strHTML += "         <div id='monthError' class='error'>กรุณาใส่เดือน</div> "
//         strHTML += "     </div> "
//         strHTML += "     <div class='col-4'> "
//         strHTML += "         <input type='text' id='year' class='form-control datepicker-year' placeholder='ปี'value='" + strYear + "'> "
//         strHTML += "         <div id='yearError' class='error'>กรุณาใส่ปี</div> "
//         strHTML += "     </div> "
//         strHTML += " </div> "
//         strHTML += " </div> "
 
//         strHTML2 += " <button type='button' id='submitSignatureButton' class='btn btn-primary'>บันทึกข้อมูล</button> "
//         strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "
       
//         $("#dvBodySignatureModal")[0].innerHTML = strHTML
//         $("#dvFooterSignatureModal")[0].innerHTML = strHTML2

//         fnInitializeCanvas(strSignPath)

//         $('.datepicker-day').datepicker({
//             format: 'dd',
//             language: 'th',
//             autoclose: true,
//             todayHighlight: true,
//             minViewMode: 0,
//             maxViewMode: 0,
//         });
//         $('.datepicker-month').datepicker({
//             format: 'MM',
//             language: 'th',
//             autoclose: true,
//             todayHighlight: true,
//             minViewMode: 1,
//             maxViewMode: 1,
//         }).on('changeDate', function(e) {
//             var fullMonthName = $(this).datepicker('getFormattedDate');
//             var shortMonthName = fnConvertMonthToShort(fullMonthName);
//             $(this).val(shortMonthName);
//         });
//         $('.datepicker-year').datepicker({
//             format: 'yyyy',
//             language: 'th',
//             autoclose: true,
//             todayHighlight: true,
//             minViewMode: 2,
//             maxViewMode: 2,
//         });

//  }

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
    const strIdConQR = $('#inputIdConQR').val();
    const strPrefixAsessor = $('#inputPrefixAsessor').val();
    const strUserId = $('#inputIdUsers').val();
    const strSideId = $('#inputIdSides').val();
    var strResultDocSQL= await fnGetDataResultDoc(strUserId, strSideId)
    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    const strUserName = fnGetCookie("username");

    // Result container to display the signature
    const resultContainer = $('#dvSignature');
    
    const data =  {
        idConQR: strIdConQR,
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
                const resultId = await fnSetDataSignatureQR(data)
                if (resultId) {
                    let strHTML = `
                        <div>ผู้ประเมิน: <span style="width: 197px;" class="underline-dotted">${fnCheckFalsy(strPrefixAsessor)}<img src="${signPath}" alt="ลายเซ็น" /></span></div>
                    `;
        
                    resultContainer.html(strHTML); // Use .html() to set the content
                    
                    $('#inputSignPath').val(signPath) // เพิ่มลายเซ็นไปเก็บไว้ใน input

                    if (!strIdConQR) { // เช็คว่าถ้า strIdConQR ยังไม่ข้อมูลในเทเบิ้ล
                        $('#inputIdConQR').val(resultId)
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
        const strIdConQR = $('#inputIdConQR').val();
        const strUserId = $('#inputIdUsers').val();
        const strSideId = $('#inputIdSides').val();
        var strResultDocSQL= await fnGetDataResultDoc(strUserId, strSideId)
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
            idConQR: strIdConQR,
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
                    const resultId = await fnSetDataAssessorQR(data)
                    let strHTML1 = '';
                    let strHTML2 = '';
                    
                    if (resultId) {
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

                        if (!strIdConQR) { // เช็คว่าถ้า strIdConQR ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConQR').val(resultId)
                        }

                        strHTML2 += `
                            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
                            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
                        `;
                        resultDivAssesor.html(strHTML2); // Use .html() to set the content
                
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

 // ฟังก์ชันเพื่อเพิ่มแถวใหม่จาก modal
async function fnAddNewRowFromModal(number, strUserId, idSideFix, nameSides, valSides) {
    if (fnValidateFormOther()) {
        var activityTitle = $('#nameMenuCheckTopic').val();
        var objective = $('#nameObjective').val();
        var activityName1 = $('#nameActivity').val();
        var description1 = $('#description').val();
        var activityName2 = $('#nameActivity2').val();
        var description2 = $('#description2').val();
        var improvement = $('#improvement').val();

        var strResultDocSQL= await fnGetDataResultDoc(strUserId, idSideFix)
        var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';
        var strUserName = fnGetCookie("username")
    
        var strIdControlSub = ''
        var strTextSub = ''
        var strDescSub = ''
    
        var newId = new Date().getTime();
    
        let strHTML = '';
    
        var arrNew = [
            { id: newId, id_control: number + '.', head_id: number, mainControl_id: number, text: "อื่น ๆ " + activityTitle, main_Obj: "วัตถุประสงค์ของการควบคุม", objectName: objective },
            { id: newId, id_control: number + '.1', head_id: number, text: activityName1, is_subcontrol: 0 , ischeckbox:1, checkbox: 'n', descResultQR : description1},
        ];
    
        if (activityName2) {
            strIdControlSub = number + '.2'
            strTextSub = activityName2
            strDescSub = description2
            arrNew.push({ id: newId, id_control: strIdControlSub, head_id: number, text: strTextSub, is_subcontrol: 0 , ischeckbox:1, checkbox: 'n', descResultQR : strDescSub});
        
        } 
        arrNew = arrNew.concat([
            { id: newId + 1, head_id: number, sum_id: newId, value: '', text: "การรักษาความปลอดภัยเกี่ยวกับบุคคล" },
            { id: newId + 1, head_id: number, sum_id: newId, value: '1', text: "มีการควบคุมเพียงพอ" },
            { id: newId + 1, head_id: number, sum_id: newId, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้",isradio: 1, radio: "0", descResultEndQR: improvement }
        ]);
    
        globalTest = globalTest.concat(arrNew);
    
        arrNew.map(item => {
            if (item.mainControl_id !== undefined || item.sum_id !== undefined) {
                if (item.sum_id && item.value) {
                    let strSumDetail = fnMapValueToCallFunction(item, '', 'sub');
                    if (item.value == 0) {
                        strHTML += "<tr class='trSidesSum-Line'><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>";
                    } else {
                        strHTML += "<tr><td style='width: 55%;'>" + strSumDetail.text + "</td><td></td><td></td><td></td></tr>";
                    }
                } else {
                    if (item.sum_id) { // ตรงส่วนสรุปแต่ละคำถาม
                        strHTML += "<tr><td style='width: 55%;font-weight: bold;'><u>สรุป</u> : " + item.text + "</td><td></td><td></td><td></td></tr>";
                    } else { // หัวข้อหลัก 1,2,3,4,5
                        strHTML += "<tr><td style='width: 55%;font-weight: bold;padding-top: 5px;'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                    }
                    if (item.main_Obj) { //วัตถุประสงค์ของการควบคุม ใช้ร่วมกัน
                        strHTML += "<tr><td style='width: 55%;text-indent: 17px;font-weight: bold;'>" + item.main_Obj + "</td><td></td><td></td><td></td></tr>";
                    }
                    if (item.objectName) { // เพื่อ ......
                        strHTML += "<tr><td style='width: 55%;text-indent: 17px;font-style: italic;'>" + item.objectName + "</td><td></td><td></td><td></td></tr>";
                    }
                }
            } else {
                if ((item.is_subcontrol && item.is_subcontrol == 1) || (item.is_innercontrol && item.is_innercontrol == 1)) {
                    if (item.id_subcontrol) {
                        strHTML += "<tr><td style='width: 55%;text-indent: 12%'>"+ fnConvertToThaiNumeralsAndPoint(item.id_subcontrol) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                    } else {
                        strHTML += "<tr><td style='width: 55%;text-indent: 17px;'>"+ fnConvertToThaiNumeralsAndPoint(item.id_control) + ' ' + item.text + "</td><td></td><td></td><td></td></tr>";
                    }
                } else {
                    if (item.id_innercontrol) {
                        strHTML += fnCreateCheckboxAndTextAreaRow(item.id_innercontrol, item.text, item.id, item.head_id, '26%', item.checkbox ? item.checkbox : '', item.descResultQR ? item.descResultQR : '', item.fileName ? item.fileName : '', item.idQR ? item.idQR : '', nameSides, '1', 'sub');
                    } else if (item.id_subcontrol) {
                        strHTML += fnCreateCheckboxAndTextAreaRow(item.id_subcontrol, item.text, item.id, item.head_id, '12%', item.checkbox ? item.checkbox : '', item.descResultQR ? item.descResultQR : '', item.fileName ? item.fileName : '', item.idQR ? item.idQR : '', nameSides, '1', 'sub');
                    } else {
                        strHTML += fnCreateCheckboxAndTextAreaRow(item.id_control, item.text, item.id, item.head_id, '17px', item.checkbox ? item.checkbox : '', item.descResultQR ? item.descResultQR : '', item.fileName ? item.fileName : '', item.idQR ? item.idQR : '', nameSides, '1', 'sub');
                    }
                }
            }
        }).join('');
    
            // call api and
            var data = {
            userId: strUserId,
            userDocId: strUserDocId,
            sideId: idSideFix,
            username: strUserName,
            idControlHead: number + '.',
            idControlSub: number + '.1',
            idControlSub2: strIdControlSub,
            headId : number, // mainControl ใช้ตัวนี้
            headText: activityTitle,
            subText: activityName1,
            subText2: strTextSub,
            objectName : objective,
            descSub : description1,
            descSub2 : strDescSub,
            descEndQR : improvement
        }
    
        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลคำถามอื่น ๆ ใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resultInsert = await fnSetDataQuestionOther(data)
                    if (resultInsert && resultInsert == 'success') {
                        $('#tb_' + valSides + ' tbody').append(strHTML);
                        // ปิด modal ซ่อน ปุ่ม 
                        $('#OtherRiskModal').modal('hide');
                        $('.modal-backdrop').remove();
                        $('#trSidesOther').css('display', 'none');

                        Swal.fire({
                            title: "",
                            text: "บันทึกข้อมูลสำเร็จ",
                            icon: "success"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                location.reload();
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

function fnValidateFormOther() {
    let isValid = true;

    // Validate signature
    const nameMenuCheckTopic = $('#nameMenuCheckTopic').val();
    if (!nameMenuCheckTopic) {
        $('#nameMenuCheckTopicError').show();
        isValid = false;
    } else {
        $('#nameMenuCheckTopicError').hide();
    }

    // Validate nameObjective text
    const nameObjective = $('#nameObjective').val();
    if (!nameObjective) {
        $('#nameObjectiveError').show();
        isValid = false;
    } else {
        $('#nameObjectiveError').hide();
    }

    // Validate nameActivity
    const nameActivity = $('#nameActivity').val();
    if (!nameActivity) {
        $('#nameActivityError').show();
        isValid = false;
    } else {
        $('#nameActivityError').hide();
    }

    // Validate description
    const description = $('#description').val();
    if (!description) {
        $('#descriptionError').show();
        isValid = false;
    } else {
        $('#descriptionError').hide();
    }
 
    // Validate nameActivity2
    const nameActivity2 = $('#nameActivity2').val();
    if (nameActivity2) {
        const description2 = $('#description2').val();
        if (!description2) {
            $('#description2Error').show();
            isValid = false;
        } else {
            $('#description2Error').hide();
        }
    }

    // Validate improvement
    const improvement = $('#improvement').val();
    if (!improvement) {
        $('#improvementError').show();
        isValid = false;
    } else {
        $('#improvementError').hide();
    }
   
    return isValid;
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
    var conVal = val.split('_').pop()
    var newVal = (conVal == 1 ? strInput.substring(0, strInput.length - 1) + '0' : val)
    var editIcon = document.getElementById('editIconSum' + newVal);

    textarea = document.getElementById('commentSum' + newVal);
    button = document.getElementById('btnSubmitSum' + newVal);
    displayText = document.getElementById('displayTextSum' + newVal);

    if (conVal == 1) {
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
    let format = '';

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = format;

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
    let format = ''
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
    var button = document.getElementById('submitbtnCommentEV');
    var displayText = document.getElementById('displayTextCommentEV');
    var editIcon = document.getElementById('editIconCommentEV');
    var format = '';

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = format;

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
    const button = document.getElementById('submitbtnCommentEV');
    const editIcon = document.getElementById('editIconCommentEV');

    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = document.getElementById('displayTextCommentEV').innerText.trim();
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

async function fnGetDataResultDoc(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId,
        formId: '2'
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultDoc', dataSend)
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

async function fnGetDataResultQR(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultQR', dataSend)
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
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultEndQR', dataSend)
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
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultOtherQR', dataSend)
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

async function fnGetDataResultCONQR(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultConQR', dataSend)
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

async function fnSetDataFormQuestion(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetFormQuestion', dataSend)
        var res = response.data
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

async function fnSetDataQuestionOther(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetQuestionOther', dataSend)
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

async function fnSetDataAssessorQR(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetAssessorQR', dataSend)
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

async function fnSetDataSignatureQR(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetSignatureQR', dataSend)
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