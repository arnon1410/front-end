function fnSetHeader(dataHeader){
    var strHTML = ''
    strHTML += "<th rowspan='2' class='text-center textHeadTable' style=''>ภารกิจตามกฎหมายที่จัดตั้งหน่วยงานภาครัฐหรือภารกิจตามแผนการดำเนินการหรือภารกิจอื่น ๆ ที่สำคัญของหน่วยงานภาครัฐ</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable' style=''>วัตถุประสงค์</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable' style=''>ความเสี่ยงที่อาจเกิดขึ้น</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable style=''>กิจกรรมควบคุมภายในที่มีอยู่</th>"
    strHTML += "<th colspan='3' class='text-center textHeadTable'>ความเสี่ยงที่เหลืออยู่</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable'>การปรับปรุงการควบคุมภายใน</th>"
    return strHTML
}

function fnSetHeaderSub(dataHeader){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable'>โอกาส</th>"
    strHTML += "<th class='text-center textHeadTable'>ผลกระทบ</th>"
    strHTML += "<th class='text-center textHeadTable'>ระดับ</th>"
    return strHTML
}
function fnDrawTableForm(access,objData,engName) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var data = objData
    var NameUnit = 'จร.ทร'
    strHTML += " <div class='title'>หน่วยงาน......." + NameUnit +  ".......</div> "
    strHTML += " <div class='title'>แบบประเมินการควบคุมภายใน</div> "
    strHTML += " <div class='title'>ภารภิจ/โครงการ/กิจกรรม/กระบวนงาน......." + objData[0].mainControl + ".......</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_" + objData[0].enControl + "'>"
    strHTML += "<thead>"
    strHTML += "<tr class='colspan-header'>"
    strHTML += fnSetHeader(data) 
    strHTML += "</tr>"
    strHTML += "<tr class='second-header'>"
    strHTML += fnSetHeaderSub(data) 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += fnDrawTablePerformance(data)
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += " <div id='dvSignature' class='dvSignature'> "
    strHTML += " <div>ชื่อผู้รายงาน...................................................................</div> "
    strHTML += " <div>ตำแหน่ง.........................................................................</div> "
    strHTML += " <div>วันที่...............................................................................</div> "
    strHTML += " </div> "
    
    strHTML += " <div id='dv-btn-Signature' class='dvSignature' > "
    strHTML += "<button id='btnEditSignature' type='button' class='btn btn-warning'; data-bs-toggle='modal' data-bs-target='#signatureModal' style='margin: 5px 5px 0px 0px;'>"
    strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span>"
    strHTML += "</button>"
    strHTML += " </div> "

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='button' class='btn btn-primary' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF'>Export PDF</button>"
    strHTML += " </div> "

    $("#dvFormAssessment")[0].innerHTML = strHTML
}

function fnDrawTablePerformance(objData) { /* ด้านการข่าว */
    var strHTML = "";
    var data = objData
    for (var i = 0; i < data.length; i++) {
        strHTML += "<tr>"
        strHTML += "<td id='headRisk" + (i + 1) + "'  class='text-left align-top' style='white-space: pre-wrap;'>" + (data[i].headRisk ? (data[i].headRisk) : '-') + "</td>"
        strHTML += "<td id='objRisk" + (i + 1) + "'  class='text-left align-top' style='white-space: pre-wrap;'>" + (data[i].objRisk ? (data[i].objRisk) : '-') + "</td>"
        strHTML += "<td id='risking" + (i + 1) + "'  class='text-left align-top' style='white-space: pre-wrap;'>" + (data[i].risking ? (data[i].risking) : '-') + "</td>"
        if (data[i].activityControl) {
            strHTML += "<td id='activityControl" + (i + 1) + "'  class='text-center align-top' style='white-space: pre-wrap;'> "+ data[i].activityControl +" </td>"
        } else {
            strHTML += "<td class='align-top' style=''> "
            strHTML += fnCreateTextAreaAndButton('activityControl' + i)
            strHTML += "</td>"
        }
        // ChanceRisk
            strHTML += "<td class='text-center align-middle' style=''>";
            strHTML += "<div>";
            strHTML += "<span id='spanChanceRisk" + (i + 1) + "'>" + (data[i].chanceRisk ? fnConvertToThaiNumeralsAndPoint(data[i].chanceRisk) : '-') + "</span>";
            strHTML += "</div>";
            strHTML += "<div>";
            strHTML += "<button id='btnChanceRisk" + (i + 1) + "' type='button' class='btn btn-warning mt-2' onclick='fnOpenModalAndSetChanceRisk(\"ChanceRisk" +  (i + 1) + "\")'>";
            strHTML += "<i class='las la-pen' aria-hidden='true'></i>";
            strHTML += "</button>";
            strHTML += "</div>";
            strHTML += "</td>";
            
            // EffectRisk
            strHTML += "<td class='text-center align-middle' style=''>";
            strHTML += "<div>";
            strHTML += "<span id='spanEffectRisk" + (i + 1) + "'>" + (data[i].effectRisk ? fnConvertToThaiNumeralsAndPoint(data[i].effectRisk) : '-') + "</span>";
            strHTML += "</div>";
            strHTML += "<div>";
            strHTML += "<button id='btnEffectRisk" + (i + 1) + "' type='button' class='btn btn-warning mt-2' onclick='fnOpenModalAndSetEffectRisk(\"EffectRisk" +  (i + 1) + "\")'>";
            strHTML += "<i class='las la-pen' aria-hidden='true'></i>";
            strHTML += "</button>";
            strHTML += "</div>";
            strHTML += "</td>";

            // RankRisk
            strHTML += "<td class='text-center align-middle' style=''> "
            strHTML += fnSetRankRiskTable((i + 1))
            // strHTML += "<div >"
            // strHTML += "<span id='spanRankRisk" + (i + 1)+ "'>" + (data[i].rankRisk ? fnConvertToThaiNumeralsAndPoint(data[i].rankRisk) : '-') + "</span>"
            // strHTML += "</div>";
            // strHTML += "<div>"
            // strHTML += "<span id='spanRankRisk" + (i + 1)+ "'>" + (data[i].rankRisk ? fnConvertToThaiNumeralsAndPoint(data[i].rankRisk) : '(-)') + "</span>"
            // strHTML += "</div>";
            // strHTML += "<div>";
            // strHTML += "<button id='btnMatrixRank" + (i + 1) + "' type='button' class='btn btn-primary mt-2' data-bs-toggle='modal' data-bs-target='#MatrixRankModal'>"
            // strHTML += "<i class='las la-search' aria-hidden='true'></i>"
            // strHTML += "</button>"
            // strHTML += "</div>"
            strHTML += "</td>"
        // } else { // ถ้าไม่มี
        //     strHTML += "<td class='text-center align-middle'> "
        //     strHTML += "<span id='spanRankRisk" + (i + 1)+ "'>" + (data[i].rankRisk ? fnConvertToThaiNumeralsAndPoint(data[i].rankRisk) : '-') + "</span>"
        //     strHTML += "</td>"
            
        // }
        if (data[i].activityControl) {
            strHTML += "<td id='improvement" + (i + 1) + "'  class='text-left align-top' style='white-space: pre-wrap;'>" + data[i].improvement + "</td>"
        } else {
            strHTML += "<td class='align-top' style=''> "
            strHTML += fnCreateTextAreaAndButton('improvement' + i)
            strHTML += "</td>"
        }
        strHTML += "</tr>"
    }

    return strHTML;
    
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

function fnDrawChanceRiskModal() {
    var strHTML = "";
    strHTML += " <div class='modal-dialog modal-lg'> "
    strHTML += "  <div class='modal-content'> "
    strHTML += " <div class='modal-header'> "
    strHTML += " <h5 class='modal-title' id='chanceRiskModalLabel'>ตารางคำนวณความเสี่ยง</h5> "
    strHTML += " <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button> "
    strHTML += " </div> "
    strHTML += " <div class='modal-body'> "
    strHTML += " <table class='table table-bordered'> "
    strHTML += " </table> "
    strHTML += " </div> "
    strHTML += " <div class='modal-footer'> "
    strHTML += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button> "
    strHTML += " </div> "
    strHTML += " </div> "
    strHTML += " </div> "
    strHTML += " </div> "
    strHTML += "  "
    strHTML += "  "

    return strHTML
}

function fnCreateTextAreaAndButton(id) {
    var strHTML = ''
        strHTML += " <div> "
        strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='5' cols='10'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(\"" + id + "\")'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div> "
        strHTML += " <span class='text-left' id='displayText" + id + "' style='white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIcon"+ id +"' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + id + "\")'></i> "
        strHTML += " </div> "

    return strHTML
}

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(id) {
    var textarea = document.getElementById('comment_' + id);
    var button = document.getElementById('submitButton' + id);
    var displayText = document.getElementById('displayText' + id);
    var editIcon = document.getElementById('editIcon' + id);
    var tab = ''
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

function fnOpenModalAndSetChanceRisk(val) {
    $('#InputChanceRiskHide').val(val);
    // เซ็ตข้อมูลใน Modal หรือทำอย่างอื่นตามที่ต้องการ
    $('#chanceRiskModal').modal('show');  
}

function fnOpenModalAndSetEffectRisk(val) {
    $('#InputEffectRiskHide').val(val);
    // เซ็ตข้อมูลใน Modal หรือทำอย่างอื่นตามที่ต้องการ
    $('#effectRiskModal').modal('show');  
}

function fnDrawTableMatrix(rowIndexs, columnIndexs) {
    let rowIndex = ''
    let columnIndex = ''
    let cell = ''
    try {
            rowIndex = rowIndexs; // Example index, change as needed
            columnIndex = columnIndexs; // Example index, change as needed
        if (rowIndex !== undefined && columnIndex !== undefined) {
            //var cell = $('#col0'); // Modify the selector as needed
            cell = $('#row' + rowIndex + ' #col' + columnIndex);
            if(cell.length) {
                $(cell).addClass('highlight');
                console.log('Cell found and highlighted:', cell);
            } else {
                console.warn('Cell not found');
            }
        }
    } catch(ex) {
        console.error('Error:', ex);
    }
}

function fnOpenModalAndSetRankRisk(index) {
    var inputChanceRisk = ''
    var inputEffectRisk = ''
    if (index) {
        inputChanceRisk = $('#InputValueChanceRisk' + index).val()
        inputEffectRisk = $('#InputValueEffectRisk' + index).val()
        
        if (inputChanceRisk && inputEffectRisk) {
            fnDrawTableMatrix(inputChanceRisk, inputEffectRisk, index)
            $('#MatrixRankModal').modal('show');  
        } else {
            if (!inputChanceRisk) {
                Swal.fire({
                    title: "",
                    text: "กรุณาเลือกโอกาสความเสี่ยงที่เหลืออยู่",
                    icon: "warning"
                });
            } else if (!inputEffectRisk) {
                Swal.fire({
                    title: "",
                    text: "กรุณาเลือกผลกระทบความเสี่ยงที่เหลืออยู่",
                    icon: "warning"
                });
            }
        }
    }
   
    
    
}

function fnSaveChanceRiskModal() {
    // ตรวจสอบว่ามี input แบบ radio ที่ถูกเลือกหรือไม่
    var strInputChanceRisk = $('#InputChanceRiskHide').val() || ''
    var strButton = ''
    var strDisplayText = ''
    var lastPositionText = ''
    if ($('input[name="inputValChanceRisk"]').is(':checked')) {
        // ดึงค่าที่ถูกเลือกมาเก็บไว้ในตัวแปร checkedValue
        var strCheckedValue = $('input[name="inputValChanceRisk"]:checked').val();
        if (strCheckedValue) {
            Swal.fire({
                title: "",
                text: "คุณต้องการบันทึกใช่หรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "บันทึกข้อมูล",
                cancelButtonText: "ยกเลิก"
              }).then((result) => {
                if (result.isConfirmed) {
                    strDisplayText = $('#span' + strInputChanceRisk);
                    strButton = $('#btn' + strInputChanceRisk);
                    lastPositionText = strInputChanceRisk.substring(strInputChanceRisk.length - 1);
                
                    strDisplayText.html(fnConvertToThaiNumeralsAndPoint(strCheckedValue)) // add value
                    
                    /* ซ่อนปุ่ม */
                    strDisplayText.css('display', 'block');
                    strButton.css('display', 'none');
                    
                    fnSetRankRiskTable(lastPositionText) // call function

                    $('#chanceRiskModal').modal('hide'); 
                    
                    Swal.fire({
                        title: "",
                        text: "บันทึกข้อมูลสำเร็จ",
                        icon: "success"
                    });
                }
              }); 
        }
    } else {
        Swal.fire({
            title: "",
            text: "กรุณาเลือกคะแนนความเสี่ยง",
            icon: "warning"
        });
    }
}

function fnSaveEffectRiskModal() {
    // ตรวจสอบว่ามี input แบบ radio ที่ถูกเลือกหรือไม่
    var strInputEffectRisk = $('#InputEffectRiskHide').val() || ''
    var strButton = ''
    var strDisplayText = ''
    var lastPositionText = ''
    if ($('input[name="inputValEffectRisk"]').is(':checked')) {
        // ดึงค่าที่ถูกเลือกมาเก็บไว้ในตัวแปร checkedValue
        var strCheckedValue = $('input[name="inputValEffectRisk"]:checked').val();
        if (strCheckedValue) {
            Swal.fire({
                title: "",
                text: "คุณต้องการบันทึกใช่หรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "บันทึกข้อมูล",
                cancelButtonText: "ยกเลิก"
              }).then((result) => {
                if (result.isConfirmed) {
                    strDisplayText = $('#span' + strInputEffectRisk);
                    strButton = $('#btn' + strInputEffectRisk);
                    lastPositionText = strInputEffectRisk.substring(strInputEffectRisk.length - 1);
                
                    strDisplayText.html(fnConvertToThaiNumeralsAndPoint(strCheckedValue)) // add value
                    
                    /* ซ่อนปุ่ม */
                    strDisplayText.css('display', 'block');
                    strButton.css('display', 'none');

                    fnSetRankRiskTable(lastPositionText)

                    $('#effectRiskModal').modal('hide'); 
                    
                    Swal.fire({
                        title: "",
                        text: "บันทึกข้อมูลสำเร็จ",
                        icon: "success"
                    });
                }
              }); 
        }
    } else {
        Swal.fire({
            title: "",
            text: "กรุณาเลือกคะแนนความเสี่ยง",
            icon: "warning"
        });
    }
}

function fnSetRankRiskTable (index) {
    var strHTML = ''
    // var lastPositionText =  ''
    var inputChanceRisk = ''
    var inputEffectRisk = ''
    var connvertChanceRisk = ''
    var connvertEffectRisk = ''
    var replaceSpanRankRisk = ''
    var replaceSpanDesRankRisk = ''
    var SumResults = ''
    var riskLevel = ''
    var riskMatrix = [
        ['ต่ำ',      'ต่ำ',      'ต่ำ',      'ปานกลาง', 'ปานกลาง'],
        ['ต่ำ',      'ต่ำ',      'ปานกลาง', 'ปานกลาง', 'สูง'],
        ['ต่ำ',      'ปานกลาง', 'ปานกลาง', 'สูง',      'สูง'],
        ['ปานกลาง', 'ปานกลาง', 'สูง',      'สูงมาก',   'สูงมาก'],
        ['ปานกลาง', 'สูง',      'สูง',      'สูงมาก',   'สูงมาก']
    ];

   
    //lastPositionText = val.substring(val.length - 1);
    connvertChanceRisk =  fnStringToInt(fnConvertToArabicNumerals($('#spanChanceRisk' + index).text())) || '';
    connvertEffectRisk =  fnStringToInt(fnConvertToArabicNumerals($('#spanEffectRisk' + index).text())) || '';

    inputChanceRisk = $('#InputValueChanceRisk' + index) //input hide
    inputEffectRisk = $('#InputValueEffectRisk' + index) //input hide

    if(connvertChanceRisk && connvertEffectRisk) {
        SumResults = connvertChanceRisk * connvertEffectRisk
        riskLevel = riskMatrix[connvertEffectRisk - 1][connvertChanceRisk - 1];

        replaceSpanRankRisk = $('#spanRankRisk' + index)
        replaceSpanDesRankRisk = $('#spanDesRankRisk' + index)

        replaceSpanRankRisk.text(fnConvertToThaiNumeralsAndPoint(SumResults))
        replaceSpanDesRankRisk.text(`(${riskLevel})`)

    } else {
        strHTML += "<div>"
        strHTML += "<span id='spanRankRisk" + index + "'> - </span>"
        strHTML += "</div>";
        strHTML += "<div>"
        strHTML += "<span id='spanDesRankRisk" + index + "'> (-) </span>"
        strHTML += "</div>";
        strHTML += "<div>";
        strHTML += "<button id='btnMatrixRank" + index  + "' type='button' class='btn btn-primary mt-2' onclick='fnOpenModalAndSetRankRisk(\"" + index + "\")'>"
        strHTML += "<i class='las la-search' aria-hidden='true'></i>"
        strHTML += "</button>"
        strHTML += "</div>"
    }

    if (connvertChanceRisk) {
        inputChanceRisk.val(connvertChanceRisk)
    }
    if (connvertEffectRisk) {
        inputEffectRisk.val(connvertEffectRisk)
    }

    return strHTML
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




