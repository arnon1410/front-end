function fnSetHeader(){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>องค์ประกอบการควบคุมภายใน</th>"
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>ผลการประเมิน/ข้อสรุป</th>"
    return strHTML
}
async function fnDrawTableForm(access, valSides) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }

    // Get data selete before create table 
    var strUserId = fnGetCookie("userId")
    var dataConPK4SQL = await fnGetDataResultConPK4(strUserId)
    var descConPK4 = dataConPK4SQL[0].descConPK4 || ''
    var prefixAsessor = dataConPK4SQL[0].prefixAsessor || ''
    var signPath = dataConPK4SQL[0].signPath || ''
    var position = dataConPK4SQL[0].position || ''
    var dateAsessor = dataConPK4SQL[0].dateAsessor || ''

    var strHTML = ''
    var nameUnit = dataConPK4SQL[0].shortName || ''
    var strYear = ''
    if (dateAsessor) {
        var dateSplit = dateAsessor.split('-');
        strYear = parseInt(dateSplit[0]) + 543;
    } else {
        var currentYear = new Date().getFullYear();
        strYear = currentYear + 543;
    }
    var DateFix = ' ณ วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(strYear)
    strHTML += " <div class='text-end'>แบบ ปค.๔</div> "
    strHTML += " <div class='title'><span class='unit-label'>หน่วยงาน</span><span id='spanNameUnit' style='width: 232px;' class='underline-dotted'>" + nameUnit + "</span> </div>"
    strHTML += " <div class='title'>รายงานการประเมินองค์ประกอบของการควบคุมภายใน</div> "
    strHTML += " <div class='title'>สำหรับระยะเวลาดำเนินงานสิ้นสุด" + DateFix + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_PK4" + valSides + "'>"
    strHTML += "<thead>"
    strHTML += "<tr>"
    strHTML += fnSetHeader() 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += await fnDrawTableAssessmentForm(strUserId)
    strHTML += "</tbody>"
    strHTML += "</table>"
    strHTML += await fnDrawCommentDivEvaluation(descConPK4,prefixAsessor,signPath,position,dateAsessor)

    

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='button' class='btn btn-primary' id='btnSaveData' onclick='fnSaveDraftDocument()'>บันทึกฉบับร่าง</button>"
    // strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF' onclick='fnExportDocument()'>Export PDF</button>"
    strHTML += " </div> "

   // strHTML += "<button id='checkButton'>เช็คสถานะ</button>"

    $("#dvFormReportAssessment")[0].innerHTML = strHTML
}

async function fnDrawTableAssessmentForm(strUserId) { /* ด้านการข่าว */
    var strHTML = "";

    // สร้าง array สำหรับเก็บผลลัพธ์ที่จัดเรียง
    let result = [];
    var maintext = fnGetCollectDataEvalution('maintext')
    var subtext = fnGetCollectDataEvalution('subtext')
    var index = 0
    var dataSQL = await fnGetDataResultPK4(strUserId)
    var combinedSubtext = subtext.map(formItem => {
        var items = dataSQL[index++];
        return {
            ...formItem,
            descResultPK4: items.descResultPK4
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
                    strHTML += "<tr style='width: 50%;'><td>&emsp;&emsp;&emsp;&emsp;" + result[i].text + "</td><td>" + fnCreateTextAreaAndButton(result[i].id, result[i].descResultPK4) + "</td></tr>";
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

async function fnGetDataResultPK4(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultPK4', dataSend)
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


async function fnGetDataResultConPK4(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultConPK4', dataSend)
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

async function fnDrawCommentDivEvaluation(descConASM,prefixAsessor,signPath,position,dateAsessor) {
    
    var strHTML = ''
    strHTML += " <div class='dvEvaluation'>ผลการประเมินโดยรวม</div> "
    if (descConASM) {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83' style='display:none;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEvaluation' onclick='fnSubmitTextCommentEvaluation()' style='display:none; width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start' style='text-indent: 19px;'> "
        strHTML += " <span id='displayTextCommentEvaluation' style='white-space: pre-wrap;'>" + descConASM + "</span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEvaluation' style='cursor:pointer;margin-top: 5px;' onclick='fnEditTextCommentEvaluation()'></i> "
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
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEvaluation' style='display:none; cursor:pointer;margin-top: 5px;' onclick='fnEditTextCommentEvaluation()'></i> "
        strHTML += " </div> "
    }

    strHTML += " <div id='dvSignature' class='dvSignature'> "
    if (prefixAsessor) {
        strHTML += `<div>ลายมือชื่อ: <span style="width: 197px;" class="underline-dotted">${prefixAsessor} <img src="${signPath ? signPath : ''}" alt="ลายเซ็น" /></span></div>`
    } else {
        strHTML += " <div>ชื่อลายมือชื่อ..............................................</div> "
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
    strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลลายมือชื่อ<span> "
    strHTML += "    </button> "
    strHTML += " </div> "
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

/* start ส่วนของลายเซ็นฯ */
/* start ส่วนของลายเซ็นฯ */
function fnDrawModalSignature(strPrefixAsessor, strSignPath, strPosition, strDateAsessor) {
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
    strHTML += " <label for='evaluator'>ลายมือชื่อ (เซ็นชื่อ)</label> "
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

    // Validate prefixAsessor
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
        const month= document.getElementById('month').value;
        const year = document.getElementById('year').value;

        const positionText = position ? position : '................................................';
        const buddhistYear = fnConvertToBuddhistYear(year);
        const formatDate = `${year}-${fnConvertMonthNumber(month)}-${day}`
        const dateText = `${fnFormatDateToThai(formatDate)}`;

        let strHTML = `
            <div>ลายมือชื่อ: <span style="width: 197px;" class="underline-dotted">${prefixAsessor} <img src="${signPath}" alt="ลายเซ็น" /></span></div>
            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
        `;

        resultContainer.innerHTML = strHTML;
        $('#signatureModal').modal('hide');
    }
}
/* end ส่วนของลายเซ็นฯ */