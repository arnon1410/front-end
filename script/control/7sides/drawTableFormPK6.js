// ประกาศตัวแปร mergedData แบบ global
let mergedData = [];

function fnSetHeader(){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable'>ภารกิจตามกฎหมายที่จัดตั้งหน่วยงานของรัฐหรือภารกิจตามแผนการหรือภารกิจอื่น ๆ ที่สำคัญของหน่วยงานของภาครัฐ/วัตถุประสงค์</th>"
    strHTML += "<th class='text-center textHeadTable'>ความเสี่ยง</th>"
    strHTML += "<th class='text-center textHeadTable'>การควบคุมภายในที่มีอยู่</th>"
    strHTML += "<th class='text-center textHeadTable'>การประเมินผลการควบคุมภายใน</th>"
    strHTML += "<th class='text-center textHeadTable'>ความเสี่ยงที่ยังมีอยู่</th>"
    strHTML += "<th class='text-center textHeadTable'>การปรับปรุงการควบคุมภายใน</th>"
    strHTML += "<th class='text-center textHeadTable'>หน่วยงานที่รับผิดชอบ</th>"
    return strHTML
}

async function fnDrawTableForm() {
    var strUserId = ""
    var strUserName = fnGetCookie("username")
    if (strUserName === 'AdIcoonci') { // สปช
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        strUserId = urlParams.get('userId')
    } else { // จร, สตน
        strUserId = fnGetCookie("userId");
    }
     // Get data selete before create table 
    var strHTML = ''

    var dataConPK6SQL = await fnGetDataResultConPK6(strUserId)
    var strResultDocSQL = await fnGetDataResultDocPK6(strUserId)

    // ตรวจสอบว่า dataConPK6SQL มีข้อมูลและไม่เป็น undefined หรือ null
    var idConPK6 = (dataConPK6SQL && dataConPK6SQL.length > 0) ? dataConPK6SQL[0].id : '';
    var prefixAsessor = (dataConPK6SQL && dataConPK6SQL.length > 0) ? dataConPK6SQL[0].prefixAsessor : '';
    var signPath = (dataConPK6SQL && dataConPK6SQL.length > 0) ? dataConPK6SQL[0].signPath : '';
    var position = (dataConPK6SQL && dataConPK6SQL.length > 0) ? dataConPK6SQL[0].position : '';
    var dateAsessor = (dataConPK6SQL && dataConPK6SQL.length > 0) ? dataConPK6SQL[0].dateAsessor : '';
    
    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';
    // var strYear = ''
    var strDataPK6SQL = await fnGetDataResultPK6(strUserDocId)

    var strDataRisk = fnGetCollectDataPK6('risking', strUserId);
    var strDataimprovement = fnGetCollectDataPK6('improvement', strUserId);

    strHTML += " <div class='title'><input type='hidden' id='inputIdConPK6' name='inputIdConPK6' value='" + idConPK6 + "'></div> "
    strHTML += " <div class='text-end' style='margin: 10px 0px 20px 0px;'>แบบ ปค.๖</div> "
    strHTML += " <div class='title'>รายงานการสอบทานการประเมินผลการควบคุมภายในของผู้ตรวจสอบภายใน</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += " <div>เรียน<span style='margin-left: 10px;'>ผู้บัญชาทหารเรือ</span></div> "
    strHTML += " <div class='title-divA'><span class='title-spanA'>ผู้ตรวจสอบภายในของกองทัพเรือได้สอบทานการประเมินผลการควบคุมภายในของหน่วยงาน สำหรับปีสิ้นสุดวันที่ ๓๐ เดือน กันยายน พ.ศ.๒๕๖๖ ด้วยวิธีการสอบทานตามหลักเกณฑ์กระทรวงการคลังว่าด้วยมาตรฐานและหลักเกณฑ์ปฏิบัติการควบคุมภายในสำหรับหน่วยงานของรัฐ พ.ศ.๒๕๖๑ โดยมีวัตถุประสงค์เพื่อให้ความมั่นใจอย่างสมเหตุสมผลว่า ภารกิจของหน่วยงานจะบรรลุวัตถุประสงค์ของการควบคุมภายในด้านการดำเนินงานที่มีประสิทธิผล ประสิทธิภาพ ด้านการรายงาน ที่เกี่ยวกับการเงินและไม่ใช่การเงินที่เชื่อถือได้ ทันเวลา และโปร่งใส รวมทั้งด้านการปฏิบัติตามกฎหมาย ระเบียบ และข้อบังคับ ที่เกี่ยวข้องกับการดำเนินงาน</span></div> "
    strHTML += " <div class='title-divB' line-height: 1.8;'><span class='title-spanA'>จากผลการสอบทานดังกล่าว ผู้ตรวจสอบภายในเห็นว่าการควบคุมภายในของกองทัพเรือมีความเพียงพอ ปฏิบัติตามอย่างต่อเนื่อง และเป็นไปตามหลักเกณฑ์กระทรวงการคลังว่าด้วยมาตรฐานและหลักเกณฑ์ปฏิบัติการควบคุมภายในสำหรับหน่วยงานของรัฐ พ.ศ.๒๕๖๑</span></div> "
    strHTML += " <div class='title-divB' line-height: 1.8;'><span class='title-spanA'>อย่างไรก็ดี มีข้อตรวจพบและข้อสังเกตเกี่ยวกับความเสี่ยง การควบคุมภายในและการปรับปรุงการควบคุมภายใน สรุปได้ดังนี้</span></div> "
    
    strHTML += " <div class='title-divA'><span class='title-spanA'>๑. ความเสี่ยง</span></div> "
    strHTML += fnDrawDataRiskingAndImprovements(strDataRisk, strDataPK6SQL, 'risk')

    strHTML += " <div class='title-divA'><span class='title-spanA'>๒. การควบคุมภายในและปรับปรุงการควบคุมภายใน</span></div> "
    strHTML += fnDrawDataRiskingAndImprovements(strDataimprovement, strDataPK6SQL, 'improvements')
    
    strHTML += await fnDrawCommentDivEvaluation(prefixAsessor, signPath, position, dateAsessor, strUserId, strUserName)

    strHTML += " <div class='dvFooterForm'> "
    if (strUserName === 'AdIconigd' || strUserName === 'AdIconiao') {
        strHTML += " <button type='button' class='btn btn-success' id='btnSaveData'> บันทึกฉบับร่าง </button> "
    }
    strHTML += " </div> " 

    strHTML += " </div> " // end A4
    
    $("#dvFormAssessment")[0].innerHTML = strHTML

    if (strUserName === 'AdIconigd' || strUserName === 'AdIconiao') {
        fnAddSaveButtonEventListener(strDataPK6SQL, strUserId, strUserDocId)
    }

}

async function fnDrawCommentDivEvaluation(prefixAsessor,signPath,position,dateAsessor,strUserId, strUserName) {
    var strHTML = ''
    var strUpload = 'Upload'
    var strEpen = 'Epen'

    strHTML += "  <input type='hidden' id='inputPrefixAsessor' name='inputPrefixAsessor' value='" + fnCheckFalsy(prefixAsessor) + "'>"
    strHTML += "  <input type='hidden' id='inputSignPath' name='inputSignPath' value='" + fnCheckFalsy(signPath) + "'>"

    strHTML += " <div class='form-group'> ";
    strHTML += "     <input type='hidden' id='inputIdUsers' class='form-control' value='" + strUserId + "' > "; // เก็บ IdUser
    strHTML += " </div> ";

    strHTML += " <div id='dvSignature' class='dvSignature' style='position: relative; text-align: center;'> "
    if (prefixAsessor && signPath) { //prefixAsessor && signPath
        strHTML += `<div>ลายมือชื่อ : <span style="width: 193px;" class="underline-dotted">${prefixAsessor} <img src="${signPath}" alt="ลายเซ็น" /></span></div>`
    } else if (prefixAsessor && !signPath) { //prefixAsessor && !signPath
            strHTML += " <div style='position: relative; display: inline-block;'> ";
            strHTML += " <div style='position: absolute; left: 120px; transform: translate(0%, -35%);'> ";
                strHTML += " <button type='button' id='btnSignatureUpload' class='btn btn-sm btn-primary' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strUpload + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>Upload</button> ";
            strHTML += " </div> ";
            strHTML += " <div style='position: absolute; right: 40px; transform: translate(20%, -35%);> ";
                strHTML += " <button type='button' id='btnSignatureEPen' class='btn btn-sm btn-danger' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strEpen + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>E-pen</button> ";
            strHTML += " </div> ";
            strHTML += `<div>ลายมือชื่อ : <span style="width: 193px;text-align:left" class="underline-dotted">${prefixAsessor}</span></div>`
            strHTML += " </div> ";
        // strHTML += " </div> ";
    } else if (!prefixAsessor && signPath) { //prefixAsessor && signPath
            
            strHTML += `<div>ลายมือชื่อ : <span style="width: 193px;" class="underline-dotted"><img src="${signPath}" alt="ลายเซ็น" /></span></div>`
    } else {
        strHTML += " <div id='dvSignature' class='dvSignature' style='position: relative;'> ";
        strHTML += " <div style='position: relative; display: inline-block;'> ";
            strHTML += " <div style='position: absolute; left: 120px; transform: translate(-20%, -35%);'> ";
                strHTML += " <button type='button' id='btnSignatureUpload' class='btn btn-sm btn-primary' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strUpload + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>Upload</button> ";
            strHTML += " </div> ";
            strHTML += " <div style='position: absolute; right: 40px; transform: translate(0%, -35%);> ";
                strHTML += " <button type='button' id='btnSignatureEPen' class='btn btn-sm btn-danger' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strEpen + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>E-pen</button> ";
            strHTML += " </div> ";
            strHTML += ` <div>ลายมือชื่อ <span style="width: 199px;text-align: left;" class="underline-dotted">:</span></div> `
        strHTML += " </div> ";
    strHTML += " </div> ";
    }
    strHTML += " </div> "

    strHTML += " <div id='dvAssessor' class='dvAssessor' style='position: relative; text-align: center;'> ";
    if (position) {
        strHTML += `<div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${position}</span></div>`
    } else {
        strHTML += ` <div>ตำแหน่ง <span style="width: 211px;text-align: left;" class="underline-dotted">:</span></div> `
    }

    if (dateAsessor) {
        strHTML += `<div>วันที่: <span style="width: 232px;" class="underline-dotted">${fnFormatDateToThai(dateAsessor)}</span></div>`
    } else {
        strHTML += `<div>วันที่ <span style="width: 237px;text-align: left;" class="underline-dotted">:</span></div>`
    }
    if (strUserName === 'AdIconigd' || strUserName === 'AdIconiao') {
        strHTML += " </div> "
        strHTML += " <div id='dv-btn-Signature' class='dv-btn-Signature' > "
        strHTML += "    <button id='btnEditSignature' type='button' class='btn btn-warning btn-sm' onclick='fnDrawModalAssessor(\"" + prefixAsessor + "\", \"" + position + "\", \"" + dateAsessor + "\")' data-bs-toggle='modal' data-bs-target='#assessorModal'> "
        strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span> "
        strHTML += "    </button> "
        strHTML += " </div> "
    }

    return strHTML
}

// ฟังก์ชันวาดข้อมูล พร้อมกำหนด index ที่ต้องการใช้
function fnDrawDataRiskingAndImprovements(data, dataPK6, type) {
    var strHTML = "";

    // กำหนดค่า mergedData ที่จะใช้ใน fnSubmitText
    mergedData = data.map((item, index) => {
        const pk6Item = dataPK6[index]; // ใช้ index แทนการหา pk6Item
        
        // รวมข้อมูล descRisk หรือ descImprovements กับ item โดยตรงตาม type ที่กำหนด
        return {
            ...item,
            idPK6: pk6Item.idPK6,
            content: type === 'risk' ? pk6Item.descRisk : pk6Item.descImprovements
        };
    });
    
    // วาดข้อมูลใน HTML
    mergedData.forEach((item) => {
        strHTML += `<div class='title-divA'><span class='title-spanB'>${item.title}</span></div>`;
    
        var content = item.content;
        var lines = content ? content.split('\n') : [''];
    
        strHTML += "<div style='text-indent: 12%; margin-bottom: 5px; line-height: 1.8;'>";
        const lineIndexType = type === 'risk' ? 0 : 1;

        lines.forEach(function (line) {
            var isEmptyContent = line.trim() === '';
            var elementId = `${item.idPK6}_${lineIndexType}`;
            if (!isEmptyContent) {
                // Generate the HTML structure without directly inserting `line`
                strHTML += `
                <div id='contentLine${elementId}' style='margin-bottom: 10px; position: relative; display: flex; flex-direction: column; align-items: center;'>
                    <div style="display: flex; align-items: center; width: 100%;">
                        <p id='displayText${elementId}' style='display: inline; margin: 0; flex-grow: 1;'></p>
                        <i class='las la-pencil-alt' id='editIcon${elementId}' style='cursor:pointer; display: inline; margin-left: 5px;' onclick='fnEditText(${item.idPK6}, ${lineIndexType})'></i>
                    </div>
                    <textarea id='textArea${elementId}' style='display: none; width: 85%; margin-top: 10px;' rows='4'>${line.replace(/<[^>]*>/g, '')}</textarea>
                    <button class='btn btn-secondary' type='button' id='submitBtn${elementId}' 
                            style='display: none; position: absolute; bottom: -39px; right: 55px;'
                            onclick='fnSubmitText(${item.idPK6}, ${lineIndexType})'>ยืนยัน</button>
                </div>
                `;
            
                $('#container').append(strHTML);
            
                setTimeout(() => {
                    const displayTextElement = document.getElementById(`displayText${elementId}`);
                    if (displayTextElement) {
                        displayTextElement.innerHTML = line;
                    }
                }, 0); // delay of 0ms to push it to the next event loop cycle
            } else {
                // กรณีที่ line ว่าง
                // strHTML += `
                // <div id='contentLine${elementId}' style='margin-bottom: 10px; position: relative; display: flex; flex-direction: column; align-items: center;'>
                //     <textarea id='textArea${elementId}' style='display: inline; width: 85%; margin-top: 10px;' rows='4'></textarea>
                //     <button class='btn btn-secondary' type='button' id='submitBtn${elementId}' 
                //             style='display: inline; position: absolute; bottom: -39px; right: 55px;'
                //             onclick='fnSubmitText(${item.idPK6}, ${lineIndexType})'>ยืนยัน</button>
                // </div>
                // `;

                strHTML += `
                <div id='contentLine${elementId}' style='margin-bottom: 10px; position: relative; display: flex; flex-direction: column; align-items: center;'>
                    <div style="display: flex; align-items: center; width: 100%;">
                        <p id='displayText${elementId}' style='display: ${isEmptyContent ? 'none' : 'inline'}; margin: 0; flex-grow: 1;'>${line}</p>
                        <i class='las la-pencil-alt' id='editIcon${elementId}' style='cursor:pointer; display: ${isEmptyContent ? 'none' : 'inline'}; margin-left: 5px;' onclick='fnEditText(${item.idPK6}, ${lineIndexType})'></i>
                    </div>
                    <textarea id='textArea${elementId}' style='display: ${isEmptyContent ? 'inline' : 'none'}; width: 85%; margin-top: 10px;' rows='4'>${line}</textarea>
                    <button class='btn btn-secondary' type='button' id='submitBtn${elementId}' 
                            style='display: ${isEmptyContent ? 'inline' : 'none'}; 
                                position: absolute; bottom: -39px; right: 55px;'
                            onclick='fnSubmitText(${item.idPK6}, ${lineIndexType})'>ยืนยัน</button>
                </div>
                `
            }
        });

        strHTML += "</div>";
    });

    
    return strHTML;
}

// ฟังก์ชันสำหรับแสดง textarea เพื่อแก้ไข
function fnEditText(index, lineIndex) {
    const elementId = `${index}_${lineIndex}`;
    $(`#displayText${elementId}`).hide();  // ซ่อนข้อความเดิม
    $(`#textArea${elementId}`).show();      // แสดง textarea
    $(`#submitBtn${elementId}`).show();     // แสดงปุ่มยืนยัน
    $(`#editIcon${elementId}`).hide();       // ซ่อนไอคอนแก้ไข
}

// ฟังก์ชันสำหรับยืนยันการแก้ไข
function fnSubmitText(index, lineIndex) {
    const elementId = `${index}_${lineIndex}`;
    const newText = $(`#textArea${elementId}`).val().trim(); // ตัดช่องว่างหน้าหลัง

    // ตรวจสอบว่ามีการกรอกข้อความหรือไม่
    if (newText === '') {
        Swal.fire({
            title: "",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning"
        });
        return; // หยุดการทำงานของฟังก์ชันหากค่าเป็นค่าว่าง
    }

    // ดึงข้อมูล content เดิมและแทนที่ข้อความใหม่ใน mergedData
    const item = mergedData.find(item => item.idPK6 === index);
    
    // แทนที่เนื้อหาทั้งหมดด้วยข้อความใหม่
    item.content = newText;

    // แสดงผลด้วยการขึ้นบรรทัดพร้อมการย่อหน้า
    const displayTextWithFormatting = newText
        .split('\n')
        .map(line => `<p style='margin: 0; text-indent: 12%;'>${line}</p>`)
        .join('');

    // อัปเดตข้อความที่ถูกแก้ไขในหน้าจอ
    $(`#displayText${elementId}`).html(displayTextWithFormatting).css('display', 'inline');
    // ซ่อน textarea และปุ่มยืนยัน
    $(`#textArea${elementId}`).css('display', 'none'); // ซ่อน textarea
    $(`#submitBtn${elementId}`).css('display', 'none'); // ซ่อนปุ่มยืนยัน
    $(`#editIcon${elementId}`).css('display', 'inline'); // แสดงไอคอนแก้ไข
}

function fnAddSaveButtonEventListener(data, strUserId, strUserDocId) {
    const saveButton = document.getElementById('btnSaveData');
    if (saveButton) {
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            // โค้ดสำหรับการบันทึกข้อมูล
            fnSaveDraftDocument(data, strUserId, strUserDocId, event);
        });
    } else {
        console.error('Element with id btnSaveData not found.');
    }
}

async function fnGetDataResultDocPK6(userId) {
    var dataSend = {
        unitId: userId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultDocPK6', dataSend)
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

function fnSaveDraftDocument(data , strUserId, strUserDocId, event)  {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    var dataSend = []
    var strDisplayTextRI = ''
    var strDisplayTextIM = ''

    var descRisk = ''
    var descImprovements = ''

    var strUserName = fnGetCookie("username");
    
    // Loop ผ่าน data เพื่อเปรียบเทียบและ push ข้อมูลลงใน dataSend
    data.forEach(formItem => {
        const strDisplayTextRI = $('#displayText' + formItem.idPK6 + '_0').html();
        const strDisplayTextIM = $('#displayText' + formItem.idPK6 + '_1').html();
    
        const descRisk = formItem.descRisk === null ? '' : formItem.descRisk;
        const descImprovements = formItem.descImprovements === null ? '' : formItem.descImprovements;
    
        // เช็คเงื่อนไขการกรอกข้อมูลให้ครบถ้วน
        if (strDisplayTextRI && !strDisplayTextIM) {
            Swal.fire({
                title: "",
                text: "กรุณากรอกข้อมูลการปรับปรุง " + formItem.detailsPK6 + " ให้ครบถ้วน",
                icon: "warning"
            });
            return; // หยุดการทำงานของฟังก์ชันทันทีหากข้อมูลไม่ครบ
        }
        
        if (!strDisplayTextRI && strDisplayTextIM) {
            Swal.fire({
                title: "",
                text: "กรุณากรอกข้อมูลความเสี่ยง " + formItem.detailsPK6 + " ให้ครบถ้วน",
                icon: "warning"
            });
            return; // หยุดการทำงานของฟังก์ชันทันทีหากข้อมูลไม่ครบ
        }
    
        // ตรวจสอบว่ามีการแก้ไขข้อมูลหรือไม่ หากมีให้เพิ่มใน dataSend
        if ((descRisk !== strDisplayTextRI) || (descImprovements !== strDisplayTextIM)) {
            dataSend.push({
                idPK6: formItem.idPK6,
                userId: strUserId, 
                userDocId: strUserDocId,
                username: strUserName,
                descRisk: strDisplayTextRI,
                descImprovements: strDisplayTextIM
            });
        }
    });
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
                    const results = await fnSetDataFormPK6(dataSend)
                    if (results && results == 'success' ) {
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

async function fnGetDataResultPK6(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultPK6', dataSend)
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

/* start ส่วนของลายเซ็นฯ */
function fnDrawSignatureSection(strSignPath, type) {
    var strHTML = '';
    var strHTML2 = '';

    if (type == 'Upload') {

        strHTML += " <div class='form-group'> ";
        strHTML += " <label for='signatureUpload'>อัปโหลดลายมือชื่อ</label> ";
        strHTML += " <div class='input-group'> "
        strHTML += " <input type='file' id='signatureUpload' class='form-control' accept='.png' aria-describedby='inputSignatureUpload' aria-label='Upload'> ";
        strHTML += " <button class='btn btn-outline-secondary' type='button' id='inputSignatureUpload'>.png</button>"
        strHTML += " </div> ";
        strHTML += " <div id='signatureUploadError' class='error'>กรุณาเลือกไฟล์</div> ";
        strHTML += " </div> ";

        // เพิ่ม canvas สำหรับแสดงลายมือชื่อที่อัปโหลด
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
        strHTML += "     <label for='evaluator'>ลายมือชื่อ (เซ็นชื่อ)</label> ";
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
    const strIdConPK6 = $('#inputIdConPK6').val();
    const strPrefixAsessor = $('#inputPrefixAsessor').val();
    const strUserId = $('#inputIdUsers').val();
    const strUserName = fnGetCookie("username");
    const strResultDocSQL= await fnGetDataResultDocPK6(strUserId)
    const strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    // Result container to display the signature
    const resultContainer = $('#dvSignature');
    
    const data =  {
        idConPK6: strIdConPK6,
        userId: strUserId,
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
                const resultId = await fnSetDataSignaturePK6(data)
                if (resultId) {
                    let strHTML = `
                        <div>ลายมือชื่อ: <span style="width: 197px;" class="underline-dotted">${fnCheckFalsy(strPrefixAsessor)}<img src="${signPath}" alt="ลายเซ็น" /></span></div>
                    `;
        
                    resultContainer.html(strHTML); // Use .html() to set the content
                    
                    $('#inputSignPath').val(signPath) // เพิ่มลายเซ็นไปเก็บไว้ใน input

                    if (!strIdConPK6) { // เช็คว่าถ้า strIdConPK6 ยังไม่ข้อมูลในเทเบิ้ล
                        $('#inputIdConPK6').val(resultId)
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
        const strIdConPK6 = $('#inputIdConPK6').val();
        const strUserId = $('#inputIdUsers').val();
        var strResultDocSQL= await fnGetDataResultDocPK6(strUserId)
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
            idConPK6: strIdConPK6,
            userId: strUserId,
            userDocId: strUserDocId,
            prefixAsessor: prefixAsessor,
            position: position,
            dateAsessor: dateFormat,
            username: strUserName
        };
        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลลายมือชื่อใช่หรือไม่?",
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
                    const resultId = await fnSetDataAssessorPK6(data)
                    let strHTML1 = '';
                    let strHTML2 = '';

                    if (resultId) {
                        if (prefixAsessor) { 
                            if (signPath) {
                                strHTML1 += `<div>ลายมือชื่อ : <span style="width: 193px;" class="underline-dotted">${fnCheckFalsy(prefixAsessor)} <img src="${signPath}" alt="ลายเซ็น" /></span></div>`
                            } else {
                                strHTML1 += " <div style='position: relative; display: inline-block;'> ";
                                strHTML1 += " <div style='position: absolute; left: 120px; transform: translate(0%, -35%);'> ";
                                strHTML1 += " <button type='button' id='btnSignatureUpload' class='btn btn-sm btn-primary' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strUpload + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>Upload</button> ";
                                strHTML1 += " </div> ";
                                strHTML1 += " <div style='position: absolute; right: 40px; transform: translate(20%, -35%);'> ";
                                strHTML1 += " <button type='button' id='btnSignatureEPen' class='btn btn-sm btn-danger' onclick='fnDrawSignatureSection(\"" + signPath + "\", \"" + strEpen + "\")' data-bs-toggle='modal' data-bs-target='#signatureModal'>E-pen</button> ";
                                strHTML1 += " </div> ";
                                strHTML1 += ` <div>ลายมือชื่อ : <span style="width: 193px;text-align:left" class="underline-dotted">${prefixAsessor}</span></div>`
                                strHTML1 += " </div> ";
                            }
                            $('#inputPrefixAsessor').val(prefixAsessor)
                            resultDivSignature.html(strHTML1)
                        }
                        if (!strIdConPK6) { // เช็คว่าถ้า strIdConPK6 ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConPK6').val(resultId)
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

async function fnSetDataAssessorPK6(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetAssessorPK6', dataSend)
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

async function fnSetDataSignaturePK6(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetSignaturePK6', dataSend)
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
/* end ส่วนของลายเซ็นฯ */

async function fnGetDataResultConPK6(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultConPK6', dataSend)
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

async function fnSetDataFormPK6(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetFormPK6', dataSend)
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