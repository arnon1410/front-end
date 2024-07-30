function fnSetHeader(){
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

function fnDrawTable(access,objData) {
    
    if (access == 'admin') {
        fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var group = ['A','B'] //groups
    var data = objData
 
    strHTML += "<table id='tb_" + group[0] + "' class='table table-hover table-nowrap' width: 100%;>"
    strHTML += "<thead class='table-light'>"
    strHTML += "<tr class='table-dark'>"
    strHTML += fnSetHeader(data) 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"

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

    strHTML += "<td class='text-center text-center align-middle lastTD'>"
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

    /*
    strHTML += "<td class='text-center align-middle lastTD'>"
    strHTML += "<button id='btnUploadDoc" + (i + 1) + "' type='button' class='btn btn-info btn-sm'; onclick='fnUploadDocConfig(\"" + data[i].username + "\",\"" + data[i].opSideName + "\",\"" + data[i].opFormName + "\")'  data-bs-toggle='modal' data-bs-target='#uploadDocModal' style='margin-right: 5px;'>"
    strHTML += "<i class='las la-upload mr-1' aria-hidden=;'true' style='margin-left:5px'></i><span>อัปโหลด<span>"
    strHTML += "</button>"

    if (data[i].fileName && data[i].filePath && data[i].fileSave) { // ถ้ามี file 
        strHTML += "<button id='btnViewDoc" + (i + 1) + "' type='button' class='btn btn-primary btn-sm'; onclick='fnViewDocConfig(\"" + data[i].fileName + "\",\"" + data[i].filePath + "\",\"" + data[i].fileSave + "\")'>"
        strHTML += "<i class='las la-file-pdf mr-1' aria-hidden=;'true' style='margin-left:5px'></i><span>ดูเอกสาร<span>"
        strHTML += "</button>"
    } else {
        strHTML += "<button id='btnViewDoc" + (i + 1) + "' type='button' class='btn btn-primary btn-sm'; onclick='fnViewDocConfig()'>"
        strHTML += "<i class='las la-file-pdf mr-1' aria-hidden=;'true' style='margin-left:5px'></i><span>ดูเอกสาร<span>"
        strHTML += "</button>"
    }
    strHTML += "</td>" 
    */

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
strHTML += "</tbody>"
strHTML += "</table>"

    $("#dvContentTable")[0].innerHTML = strHTML

    //merge column
    fnMergeColumn('#tb_' + group[0], true);
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

function fnGetDataSelect() {
    // var arrData = fnGetDataRates() // call function get data
    var strHTML = ''
    var strHTML2 = ''

    // draw modal
    strHTML += "<div class='container' > "
    strHTML += " <div class='row mt-2 mb-3'> "
    strHTML += " <div class='col-sm-3'> "
    strHTML += " <select class='form-select text-center' aria-label='Default select example'> "
    strHTML += " <option selected>หน่วยรับตรวจ</option> "
    strHTML += " </select> "
    strHTML += " </div> "
    strHTML += " <div class='col-sm-3'> "
    strHTML += " <select class='form-select text-center' aria-label='Default select example'> "
    strHTML += " <option selected>สาขาที่ประเมิน</option> "
    strHTML += " </select> "
    strHTML += " </div> "
    strHTML += " <div class='col-sm-3'> "
    strHTML += " <select class='form-select text-center' aria-label='Default select example'> "
    strHTML += " <option selected>ปี 2567</option> "
    strHTML += " </select> "
    strHTML += " </div> "
    strHTML += " <div class='col-sm-3'> "
    strHTML += " <select class='form-select text-center' aria-label='Default select example'> "
    strHTML += " <option selected>สถานะ</option> "
    strHTML += " </select> "
    strHTML += " </div> "
    strHTML += " </div> "
    strHTML += "</div> "  

    // document.getElementById("dvHeadSelectAssessment").innerHTML = strHTML
    $("#dvHeadSelectAssessment")[0].innerHTML = strHTML
    
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


    strHTML2 += " <button type='button' class='btn btn-primary'>บันทึกข้อมูล</button> "
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

function fnMergeColumn(tableSelector, data){
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


