function fnSetHeader(dataHeader){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable'>ภารกิจตามกฎหมายที่จัดตั้งหน่วยงานของรัฐหรือภารกิจตามแผนการหรือภารกิจอื่น ๆ ที่สำคัญของหน่วยงานของรัฐ/วัตถุประสงค์</th>"
    strHTML += "<th class='text-center textHeadTable'>ความเสี่ยงที่ยังมีอยู่</th>"
    strHTML += "<th class='text-center textHeadTable'>การปรับปรุงการควบคุมภายใน</th>"
    strHTML += "<th class='text-center textHeadTable'>หน่วยงานที่รับผิดชอบ</th>"
    strHTML += "<th class='text-center textHeadTable'>สถานการณ์ดำเนินการ % ความคืบหน้า</th>"
    strHTML += "<th class='text-center textHeadTable'>ปัญหาอุปสรรคและแนวทางแก้ไข</th>"
    return strHTML
}

function fnDrawTableForm(access,objData,engName) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var data = objData
    var NameUnit = 'จร.ทร.'
    var currentYear = new Date().getFullYear();
    var laterYear = new Date().getFullYear() - 1;
    var currentThaiYear = currentYear + 543;
    var laterThaiYear = laterYear + 543;
    var DateFix = 'ณ วันที่ ๑ เดือน ตุลาคม ' + fnConvertToThaiNumeralsAndPoint(laterThaiYear) + ' ถึง วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(currentThaiYear)
    strHTML += " <div class='text-end'>แบบติดตาม ปค.๕</div> "
    strHTML += " <div class='title'>หน่วยงาน " + NameUnit +  "</div> "
    strHTML += " <div class='title'>รายงานการติดตามการประเมินการควบคุมภายใน</div> "
    strHTML += " <div class='title'>" + DateFix + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_" + objData[0].enControl + "'>"
    strHTML += "<thead>"
    strHTML += "<tr class='colspan-header'>"
    strHTML += fnSetHeader(data) 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += fnDrawTablePerformance(data)
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += " <div class='dvSignature'> "
    strHTML += " <div>ชื่อผู้รายงาน...................................................................</div> "
    strHTML += " <div>ตำแหน่ง.........................................................................</div> "
    strHTML += " <div>วันที่...............................................................................</div> "
    
    strHTML += "<button id='btnEditSignature' type='button' class='btn btn-warning'; onclick='fnEditSignature()' style='display:none;margin: 5px 5px 0px 0px;'>"
    strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้รายงาน<span>"
    strHTML += "</button>"

    strHTML += " </div> "

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='button' class='btn btn-primary' id='btnSaveData' onclick='fnSaveDraftDocument()'>บันทึกฉบับร่าง</button>"
    strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF' onclick='fnExportDocument()'>Export PDF</button>"
    strHTML += " </div> "

    $("#dvFormAssessment")[0].innerHTML = strHTML
}


function fnDrawTablePerformance(objData) { /* ด้านการข่าว */
    var strHTML = "";
    var data = objData

    strHTML +=  fnDrawDataInTable(data)

    return strHTML;

}

function fnDrawDataInTable(data) {
    var strHTML = '';
    var tab = '&emsp;&emsp;&emsp;&emsp;';
    const sides = [
        'ด้านการกำลังพล', 'ด้านยุทธการ', 'ด้านการข่าว', 
        'ด้านการส่งกำลังบำรุง', 'ด้านการสื่อสาร', 
        'ด้านระบบเทคโนโลยีสารสนเทศในการบริหารจัดการ', 
        'ด้านกิจการพลเรือน', 'ด้านการงบประมาณ', 
        'ด้านการเงินและการบัญชี', 'ด้านพัสดุและทรัพย์สิน'
    ];

    sides.forEach((side, index) => {
        const id_sides = (index + 1).toString();
        const foundRisks = data.filter(risk => risk.id_sides === id_sides);

        if (foundRisks.length > 0) {
            let headRisksContent = [];
            let strObjRisk = foundRisks[0].objRisk;

            foundRisks.forEach(risk => {
                if (!headRisksContent.includes(risk.headRisk)) {
                    headRisksContent.push(risk.headRisk);
                }
            });

            const headRisks = headRisksContent.join('<br>- ');

            // First row with rowspan for the first column
            strHTML += "<tr>";
            strHTML += `<td rowspan='${foundRisks.length}' id='headRisk${index}' class='text-left align-top' style='width: 25%;'>`;
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${index}' style='font-weight: bold;'>${fnConvertToThaiNumeralsAndPoint(id_sides)}. ${side}</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${index}' style='font-weight: bold;'>${tab}วัตถุประสงค์</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${index}' class='text-left align-top'>${tab}${strObjRisk}</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${index}' style='font-weight: bold;'>${tab}กิจกรรม</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += " <div class='tab'> ";
            strHTML += ` <span id='spanHeadRisk${index}'>- ${headRisks}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div> ";
            strHTML += ` <span id='spanRisking${index}'>${foundRisks[0].risking ? foundRisks[0].risking : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            if (foundRisks[0].improvementControl) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanImprovementControl${index}'>${foundRisks[0].improvementControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='ImprovementControl" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textImprovementControl" + index + "' name='textImprovementControl" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitImprovementControl" + index + "' onclick='fnSubmitText(\"" + index + "\", \"ImprovementControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start'>";
                strHTML += "    <span id='displayTextImprovementControl" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconImprovementControl" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"ImprovementControl\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }
            if (foundRisks[0].responsibleAgency) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanResponsibleAgency${index}'>${foundRisks[0].responsibleAgency}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='ResponsibleAgency" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textResponsibleAgency" + index + "' name='textResponsibleAgency" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + index + "' onclick='fnSubmitText(\"" + index + "\", \"ResponsibleAgency\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start'>";
                strHTML += "    <span id='displayTextResponsibleAgency" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"ResponsibleAgency\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            if (foundRisks[0].progressControl) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanProgressControl${index}'>${foundRisks[0].progressControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='ProgressControl" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textProgressControl" + index + "' name='textProgressControl" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitProgressControl" + index + "' onclick='fnSubmitText(\"" + index + "\", \"ProgressControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start'>";
                strHTML += "    <span id='displayTextProgressControl" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconProgressControl" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"ProgressControl\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            if (foundRisks[0].solutionsControl) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanSolutionsControl${index}'>${foundRisks[0].solutionsControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='SolutionsControl" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textSolutionsControl" + index + "' name='textSolutionsControl" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitSolutionsControl" + index + "' onclick='fnSubmitText(\"" + index + "\", \"SolutionsControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start'>";
                strHTML += "    <span id='displayTextSolutionsControl" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconSolutionsControl" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"SolutionsControl\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            strHTML += "</tr>";


            // Subsequent rows for the remaining risks
            for (let i = 1; i < foundRisks.length; i++) {
                strHTML += "<tr>";

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanRisking${index}_${i}'>${foundRisks[i].risking ? foundRisks[i].risking : ''}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanExistingControls${index}_${i}'>${foundRisks[i].existingControls ? foundRisks[i].existingControls : ''}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                if (foundRisks[i].responsibleAgency) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div> ";
                    strHTML += ` <span id='spanResponsibleAgency${index}_${i}'>${foundRisks[i].responsibleAgency}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='ResponsibleAgency" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textResponsibleAgency" + index + "_" + i + "' name='textResponsibleAgency" + index + "_" + i + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"ResponsibleAgency\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start'>";
                    strHTML += "    <span id='displayTextResponsibleAgency" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"ResponsibleAgency\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                if (foundRisks[i].progressControl) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div> ";
                    strHTML += ` <span id='spanprogressControl${index}_${i}'>${foundRisks[i].progressControl}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='progressControl" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textprogressControl" + index + "_" + i + "' name='textprogressControl" + index + "_" + i + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitprogressControl" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"progressControl\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start'>";
                    strHTML += "    <span id='displayTextprogressControl" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconprogressControl" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"progressControl\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                if (foundRisks[i].solutionsControl) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div> ";
                    strHTML += ` <span id='spanSolutionsControl${index}_${i}'>${foundRisks[i].SolutionsControl}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='SolutionsControl" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textSolutionsControl" + index + "_" + i + "' name='textSolutionsControl" + index + "_" + i + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitSolutionsControl" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"SolutionsControl\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start'>";
                    strHTML += "    <span id='displayTextSolutionsControl" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconSolutionsControl" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"SolutionsControl\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                strHTML += "</tr>";
            }
        }
    });

    return strHTML;
}

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(index, sides) {
    var textarea = ''
    var button = ''
    var displayText = ''
    var editIcon = ''
    var tab = '&emsp;'
    var format = ''

    if (sides == 'ImprovementControl') {
        textarea = document.getElementById('textImprovementControl' + index);
        button = document.getElementById('submitImprovementControl' + index);
        displayText = document.getElementById('displayTextImprovementControl' + index);
        editIcon = document.getElementById('editIconImprovementControl'+ index);
    } else if (sides == 'ResponsibleAgency') {
        textarea = document.getElementById('textResponsibleAgency' + index);
        button = document.getElementById('submitResponsibleAgency' + index);
        displayText = document.getElementById('displayTextResponsibleAgency' + index)
        editIcon = document.getElementById('editIconResponsibleAgency'+ index);
    } else if (sides == 'ProgressControl') {
        textarea = document.getElementById('textProgressControl' + index);
        button = document.getElementById('submitProgressControl' + index);
        displayText = document.getElementById('displayTextProgressControl' + index); 
        editIcon = document.getElementById('editIconProgressControl'+ index); 
    } else {
        textarea = document.getElementById('textSolutionsControl' + index);
        button = document.getElementById('submitSolutionsControl' + index);
        displayText = document.getElementById('displayTextSolutionsControl' + index); 
        editIcon = document.getElementById('editIconSolutionsControl'+ index);   
    }

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
function fnEditText(index, sides) {
    var textarea = ''
    var button = ''
    var editIcon = ''
    var displayText = ''

    if (sides == 'ImprovementControl') {
        textarea = document.getElementById('textImprovementControl' + index);
        button = document.getElementById('submitImprovementControl' + index);
        displayText = document.getElementById('displayTextImprovementControl' + index);
        editIcon = document.getElementById('editIconImprovementControl'+ index);
    } else if (sides == 'ResponsibleAgency') {
        textarea = document.getElementById('textResponsibleAgency' + index);
        button = document.getElementById('submitResponsibleAgency' + index);
        displayText = document.getElementById('displayTextResponsibleAgency' + index)
        editIcon = document.getElementById('editIconResponsibleAgency'+ index);
    } else if (sides == 'ProgressControl') {
        textarea = document.getElementById('textProgressControl' + index);
        button = document.getElementById('submitProgressControl' + index);
        displayText = document.getElementById('displayTextProgressControl' + index); 
        editIcon = document.getElementById('editIconProgressControl'+ index); 
    } else {
        textarea = document.getElementById('textSolutionsControl' + index);
        button = document.getElementById('submitSolutionsControl' + index);
        displayText = document.getElementById('displayTextSolutionsControl' + index); 
        editIcon = document.getElementById('editIconSolutionsControl'+ index);   
    }
    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = displayText.innerText.trim();
}

/*
function fnDrawTableForm(access,objData,engName) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var data = objData
    var NameUnit = 'จร.ทร.'
    var currentYear = new Date().getFullYear();
    var currentThaiYear = currentYear + 543;
    // var DateFix = 'ณ วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(currentThaiYear)
    strHTML += " <div class='text-end'>แบบติดตาม ปค.๕</div> "
    strHTML += " <div class='title'>หน่วยงาน......." + NameUnit +  ".......</div> "
    strHTML += " <div class='title'>รายงานการติดตามการประเมินการควบคุมภายใน</div> "
    strHTML += " <div class='title'>ตั้งแต่วันที่.......เดือน..............พ.ศ.............. ถึง วันที่.......เดือน..............พ.ศ..............</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_" + objData[0].enControl + "'>"
    strHTML += "<thead>"
    strHTML += "<tr class='colspan-header'>"
    strHTML += fnSetHeader(data) 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += fnDrawTableFollowPK5(data)
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += " <div class='dvSignature'> "
    strHTML += " <div>ชื่อผู้รายงาน...................................................................</div> "
    strHTML += " <div>ตำแหน่ง.........................................................................</div> "
    strHTML += " <div>วันที่...............................................................................</div> "
    
    strHTML += "<button id='btnEditSignature' type='button' class='btn btn-warning'; onclick='fnEditSignature()' style='display:none;margin: 5px 5px 0px 0px;'>"
    strHTML += "<i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้รายงาน<span>"
    strHTML += "</button>"

    strHTML += " </div> "

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='button' class='btn btn-primary' id='btnSaveData' onclick='fnSaveDraftDocument()'>บันทึกฉบับร่าง</button>"
    strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF' onclick='fnExportDocument()'>Export PDF</button>"
    strHTML += " </div> "

    $("#dvFormAssessment")[0].innerHTML = strHTML
}


function fnDrawTableFollowPK5(objData) {
    var strHTML = "";
    var data = objData // ยังไม่ได้ใช้
    strHTML += "<tr>";

    strHTML += fnDrawCellTable('Misstion', data.oldMisstion, data.oldStillRisk, 'commentMisstion',30,33);
    strHTML += fnDrawCellTable('StillRisk', data.oldStillRisk, data.oldStillRisk, 'commentStillRisk',14,13);
    strHTML += fnDrawCellTable('ImproveControl', data.oldImproveControl, data.oldImproveControl, 'commentImproveControl',14,13);
    strHTML += fnDrawCellTable('ResponeAgency', data.oldResponeAgency, data.oldResponeAgency, 'commentResponeAgency',14,13);
    strHTML += fnDrawCellTable('Progress', data.oldProgress, data.oldProgress, 'commentProgress',14,13);
    strHTML += fnDrawCellTable('Problem', data.oldProblem, data.oldProblem, 'commentProblem',14,13);

    strHTML += "</tr>";
    return strHTML;
}


function fnDrawCellTable(id, condition, text, commentId, sizeTD,sizeTextarea) {
    let cellHTML = `<td id='${id}' class='text-left align-top' style='width: ${sizeTD}%;'>`;

    if (condition) {
        cellHTML += `<span class='text-left' id='displayText${id}'>${text}</span>`;
    } else {
        cellHTML += `
            <div>
                <textarea id='${commentId}' name='${commentId}' rows='4' cols='${sizeTextarea}'></textarea>
            </div>
            <div class='text-end'>
                <button class='btn btn-secondary' type='submit' id='submitButton${id}' onclick='fnSubmitText("${id}")'>ยืนยัน</button>
            </div>
            <div class='text-start'>
                <span id='displayText${id}' style='white-space: pre-wrap;'></span>
                <i class='las la-pencil-alt' id='editIcon${id}' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText("${id}")'></i>
            </div>
        `;
    }

    cellHTML += "</td>";
    return cellHTML;
}

function fnSubmitText(id) {
    var textarea = document.getElementById('comment' +id);
    var button = document.getElementById('submitButton' + id);
    var displayText = document.getElementById('displayText' + id);
    var editIcon = document.getElementById('editIcon' + id);
    var tab = '&emsp;'
    var format = ''

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = tab + format

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

function fnEditText(id) {
    const textarea = document.getElementById('comment' + id);
    const button = document.getElementById('submitButton' + id);
    const editIcon = document.getElementById('editIcon' + id);

    textarea.style.display = 'inline';
    button.style.display = 'inline';

    editIcon.style.display = 'none';

    textarea.value = document.getElementById('displayText' + id).innerText.trim();
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
*/
