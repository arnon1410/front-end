function fnSetHeader(dataHeader){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>องค์ประกอบการควบคุมภายใน</th>"
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>ผลการประเมิน/ข้อสรุป</th>"
    return strHTML
}
function fnDrawTableForm(access,objData) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var data = objData
    var NameUnit = 'จร.ทร'
    var currentYear = new Date().getFullYear();
    var currentThaiYear = currentYear + 543;
    var DateFix = 'ณ วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(currentThaiYear)
    strHTML += " <div class='text-end'>แบบ ปค.๔</div> "
    strHTML += " <div class='title'>หน่วยงาน" + NameUnit +  "</div> "
    strHTML += " <div class='title'>รายงานการประเมินองค์ประกอบของการควบคุมภายใน</div> "
    strHTML += " <div class='title'>สำหรับระยะเวลาดำเนินงานสิ้นสุด" + DateFix + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_PK4'>"
    strHTML += "<thead>"
    strHTML += "<tr>"
    strHTML += fnSetHeader(data) 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += fnDrawTableAssessmentForm()
    strHTML += "</tbody>"
    strHTML += "</table>"
    strHTML += fnDrawCommentDivEvaluation()
    strHTML += " <div class='dvSignature'> "
    strHTML += " <div>ผู้ประเมิน..............................................</div> "
    strHTML += " <div>ตำแหน่ง................................................</div> "
    strHTML += " <div>วันที่...........เดือน..............พ.ศ...............</div> "
    
    strHTML += "<button id='btnEditSignature' type='button' class='btn btn-warning'; onclick='fnEditSignature()' style='display:none;margin: 5px 5px 0px 0px;'>"
    strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span>"
    strHTML += "</button>"

    strHTML += " </div> "

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='button' class='btn btn-primary' id='btnSaveData' onclick='fnSaveDraftDocument()'>บันทึกฉบับร่าง</button>"
    strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF' onclick='fnExportDocument()'>Export PDF</button>"
    strHTML += " </div> "

   // strHTML += "<button id='checkButton'>เช็คสถานะ</button>"

    $("#dvFormReportAssessment")[0].innerHTML = strHTML
}

function fnDrawTableAssessmentForm() { /* ด้านการข่าว */
    var strHTML = "";

    const maintext  = [ // หัวข้อหลัก
    {id:101, text:"๑. สภาพแวดล้อมการควบคุม" , description:"สภาพแวดล้อมการควบคุมเป็นปัจจัยพื้นฐานในการดำเนินงานที่ส่งผลให้มีการนำการควบคุมภายในมาปฏิบัติในหน่วยงาน ฝ่ายบริหารและผู้บังคับบัญชาจะต้องสร้างบรรยากาศในทุกระดับ ตระหนักถึงความสำคัญของการควบคุมภายใน รวมทั้งการดำเนินงานที่คาดหวังได้ สภาพแวดล้อมการควบคุมเป็นพื้นฐานสำคัญที่จะส่งผลกระทบต่อองค์ประกอบของการควบคุมภายในอื่น ๆ"},
    {id:102, text:"๒. การประเมินความเสี่ยง" , description:"การประเมินความเสี่ยงเป็นกระบวนการที่ดำเนินการอย่างต่อเนื่องและเป็นประจำ เพื่อระบุและวิเคราะห์ความเสี่ยงที่มีผลกระทบต่อการบรรลุวัตถุประสงค์ของหน่วยงาน รวมถึงกำหนดวิธีการจัดการความเสี่ยงนั้น ฝ่ายบริหารควรคำนึงถึงการเปลี่ยนแปลงของสภาพแวดล้อมภายนอกและภารกิจภายในทั้งหมดที่มีผลต่อการบรรลุวัตถุประสงค์ของหน่วยงาน"},
    {id:103, text:"๓. กิจกรรมควบคุมความเสี่ยง", description:"กิจกรรมการควบคุมเป็นการปฏิบัติที่กำหนดไว้ในโยบายและกระบวนการดำเนินงาน เพื่อให้มั่นใจว่าจะลดหรือควบคุมความเสี่ยงให้สามารถบรรลุวัตถุประสงค์ กิจกรรมตวบตุมควรได้รับการนำไปปฏิบัติทั่วทุกระดับในหน่วยงานในกระบวนการปฏิบัติงานขั้นตอนการดำเนินงานต่าง ๆ รวมถึงการนำเทคโนโลยีม่ใช้ในการดำเนินงาน"},
    {id:104, text:"๔. สารสนเทศและการสื่อสาร", description:"สารสนเทศเป็นสิ่งจำเป็นสำหรับหน่วยงานที่จะช่วยให้มีการดำเนินการตามการควบคุมภายในที่กำหนด เพื่อสนับสนุนให้บรรลุวัตถุประสงค์ของหน่วยงาน การสื่อสารเกิดขึ้นได้ทั้งจากภายในและภายนอก และเป็นช่องทางเพื่อให้ทราบถึงสารสนเทศที่สำคัญในการควบคุมการดำเนินงานของหน่วยงาน การสื่อสารจะช่วยให้บุคลากรในหน่วยงานมีความเข้าใจถึงความรับผิดชอบและความสำคัญของการควบคุมภายในที่มีต่อการบรรลุวัตถุประสงค์"},
    {id:105, text:"๕. กิจกรรมการติดตามผล", description:"กิจกรรมการติดตามผลเป็นการประเมินผลระหว่างการปฏิบัติงาน การประเมินผลเป็นรายครั้ง หรือเป็นการประเมินผลทั้งสองวิธีร่วมกัน เพื่อให้เกิดความมั่นใจว่าได้มีการปฏิบัติตามหลักการ ในแต่ละองค์ประกอบของการควบคุมภายในทั้ง ๕ องค์ประกอบ กรณีที่ผลการประเมินการควบคุมภายในจะก่อให้เกิดความเสียหายต่อหน่วยงานให้รายงานต่อฝ่ายบริหารและผู้บังคับบัญชา อย่างทันเวลา"},
    ]
    const subtext = [ // หัวข้อย่อย
    {id:101, text:"๑.๑ หน่วยงานแสดงให้เห็นถึงการยึดมั่นในคุณค่าของความซื่อตรงและจริยธรรม", id_head: 101}, 
    {id:102, text:"๑.๒ หน่วยงานแสดงให้เห็นถึงความเป็นอิสระจากฝ่ายบริหารและมีหน้าที่กำกับดูแลให้มีการพัฒนาหรือปรับปรุงการควบคุมภายใน รวมถึงการดำเนินการเกี่ยวกับการควบคุมภายใน", id_head: 101},
    {id:103, text:"๑.๓ หน่วยงานมีการจัดโครงสร้างองค์กร สายการบังคับบัญชา อำนาจหน้าที่และความรับผิดชอบที่เหมาะสมในการบรรลุวัตถุประสงค์ของหน่วยงาน", id_head: 101},
    {id:104, text:"๑.๔ หน่วยงานแสดงให้เห็นถึงความมุ่งมั่นในการสร้างแรงจูงใจ พัฒนาและรักษาบุคลากรที่มีความรู้ ความสามารถที่สอดคล้องกับวัตถุประสงค์ของหน่วยงาน", id_head: 101},
    {id:105, text:"๑.๕ หน่วยงานมีการกำหนดให้บุคลากรมีหน้าที่และความรับผิดชอบต่อผลการปฏิบัติงานตามระบบการควบคุมภายใน เพื่อบรรลุวัตถุประสงค์ของหน่วยงาน", id_head: 101},
    {id:106, text:"๒.๑ หน่วยงานระบุวัตถุประสงค์การควบคุมภายในของการปฏิบัติงานให้สอดคล้องกับวัตถุประสงค์ของหน่วยไว้อย่างชัดเจนและเพียงพอที่จะสามารถระบุและประเมินความเสี่ยงที่เกี่ยวข้องกับวัตถุประสงค์", id_head: 102},
    {id:107, text:"๒.๒ หน่วยงานมีการระบุความเสี่ยงที่มีผลต่อการบรรลุวัตถุประสงค์การควบคุมภายในอย่างครอบคลุมและวิเคราะห์ความเสี่ยง เพื่อกำหนดวิธีจัดการความเสี่ยงนั้น", id_head: 102},
    {id:108, text:"๒.๓ หน่วยงานมีการพิจารณาโอกาสที่อาจเกิดการทุจริต เพื่อประกอบการประเมินความเสี่ยงที่ส่งผลต่อการบรรลุวัตถุประสงค์", id_head: 102},
    {id:109, text:"๒.๔ หน่วยงานมีการระบุและประเมินการเปลี่ยนแปลงที่อาจมีผลกระทบอย่างมีนัยสำคัญต่อระบบการควบคุมภายใน", id_head: 102},
    {id:110, text:"๓.๑ หน่วยงานมีการระบุและพัฒนากิจกรรมการควบคุม เพื่อลดความเสี่ยงในการบรรลุวัตถุประสงค์ให้อยู่ในระดับที่ยอมรับได้", id_head: 103},
    {id:111, text:"๓.๒ หน่วยงานมีการระบุและพัฒนากิจกรรมการควบคุมทั่วไปด้านเทคโนโลยี เพื่อสนับสนุนการบรรลุวัตถุประสงค์", id_head: 103},
    {id:112, text:"๓.๓ หน่วยงานมีการจัดให้กิจกรรมการควบคุมโดยกำหนดไว้ในนโยบาย ประกอบด้วยผลสำเร็จที่คาดหวังและขั้นตอนการปฏิบัติงาน เพื่อนำนโยบายไปสู่การปฏิบัติจริง", id_head: 103},
    {id:113, text:"๔.๑ หน่วยงานมีการจัดทำหรือจัดหาและใช้สารสนเทศที่เกี่ยวข้องและมีคุณภาพ เพื่อสนับสนุนให้มีการปฏิบัติตามการควบคุมภายในที่กำหนด", id_head: 104},
    {id:114, text:"๔.๒ หน่วยงานมีการสื่อสารภายในที่เกี่ยวข้องกับสารสนเทศรวมถึงวัตถุประสงค์และความรับผิดชอบที่มีต่อการควบคุมภายใน ซึ่งมีความจำเป็นในการสนับสนุนให้มีการปฏิบัติตามการควบคุมภายในที่กำหนด", id_head: 104},
    {id:115, text:"๔.๓ หน่วยงานมีการสื่อสารกับบุคคลภายนอกเกี่ยวกับเรื่องที่มีผลกระทบต่อการปฏิบัติตามการควบคุมภายในที่กำหนด", id_head: 104},
    {id:116, text:"๕.๑ หน่วยงานมีการพัฒนาและดำเนินการประเมินผลระหว่างการปฏิบัติงาน และหรือการประเมินผลเป็นรายครั้งตามที่กำหนด เพื่อให้เกิดความมั่นใจว่าได้มีการปฏิบัติตามองค์ประกอบของการควบคุมภายใน", id_head: 105},
    {id:117, text:"๕.๒ หน่วยงานมีการประเมินผลและสื่อสารข้อบกพร่องหรือจุดอ่อนของการควบคุมภายในอย่างทันเวลาต่อฝ่ายบริหารหรือผู้บังคับบัญชา เพื่อให้ผู้รับผิดชอบสามารถแก้ไขได้อย่างเหมาะสม", id_head: 105},
    ]

    // สร้าง array สำหรับเก็บผลลัพธ์ที่จัดเรียง
    let result = [];

    var getdata = [1] // ถ้ามีความเสี่ยง
    var valRisk = getdata
    if (valRisk.length > 1) {
        // จับคู่หัวข้อย่อยกับหัวข้อหลัก
        maintext.forEach(main => {
            // เพิ่มหัวข้อหลักในผลลัพธ์
            result.push(main);

            // หาหัวข้อย่อยที่ตรงกับหัวข้อหลัก
            subtext.forEach(sub => {
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
                subtext.forEach(sub => {
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
                    strHTML += "<tr style='width: 50%;'><td>&emsp;&emsp;&emsp;&emsp;" + result[i].text + "</td><td>" + fnCreateTextAreaAndButton(result[i].id) + "</td></tr>";
                }
            }
        }

    return strHTML;
    /* แทรกโค้ดเข้าไปใน #dvTableReportAssessment */
    /* $("#dvTableReportAssessment")[0].innerHTML = strHTML; */
}

function fnCreateTextAreaAndButton(id) {
    return "<div style='display:flex;'>" +
    "<textarea id='comment_" + id + "' name='comment_" + id + "' rows='1' cols='30'></textarea>" +
    "<button class='btn btn-secondary' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(" + id + ")'>ยืนยัน</button>" +
    "</div>"+
    "<div>"+
    "<span class='text-left spanDisplay' id='displayText" + id + "' style='white-space: pre-wrap;'></span>" +
    "<i class='las la-pencil-alt' id='editIcon"+ id +"' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + id + "\")'></i>" +
    "</div>"
}

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(id) {
    var textarea = document.getElementById('comment_' + id);
    var button = document.getElementById('submitButton' + id);
    var displayText = document.getElementById('displayText' + id);
    var editIcon = document.getElementById('editIcon' + id);
    var tab = '&emsp;&emsp;'
    var format = ''

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

function fnDrawCommentDivEvaluation() {
    var strHTML = ''
    strHTML += " <div class='dvEvaluation'>ผลการประเมินโดยรวม</div> "
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

    if (textarea.value) {
        displayText.innerHTML = tab + textarea.value;

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