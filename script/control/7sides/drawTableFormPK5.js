function fnSetHeader(dataHeader){
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
    var DateFix = 'ณ วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(currentThaiYear)
    strHTML += " <div class='text-end'>แบบ ปค.๕</div> "
    strHTML += " <div class='title'>หน่วยงาน " + NameUnit +  "</div> "
    strHTML += " <div class='title'>รายงานการประเมินผลการควบคุมภายใน</div> "
    strHTML += " <div class='title'>สำหรับระยะเวลาดำเนินงานสิ้นสุด " + DateFix + " </div> "
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
    var team = "test"
    var data = objData

     // ด้านภารกิจหลัก
    strHTML +=  fnDrawDataInTable(data)
    for (var i = 0; i < data.length; i++) {
        // strHTML += "<tr>"
        // strHTML += "<td id='headRisk" + (i + 1) + "'  class='text-left align-top' style='width: 25%;white-space: pre-wrap;'>" + (data[i].headRisk ? (data[i].headRisk) : '-') + "</td>"
        // strHTML += "<td id='objRisk" + (i + 1) + "'  class='text-left align-top' style='width: 12%white-space: pre-wrap;'>" + (data[i].objRisk ? (data[i].objRisk) : '-') + "</td>"
        // strHTML += "<td id='headRisk" + (i + 1) + "'  class='text-left align-top' style='width:12%;white-space: pre-wrap;'>" + (data[i].headRisk ? (data[i].headRisk) : '-') + "</td>"
        // strHTML += "<td id='objRisk" + (i + 1) + "'  class='text-left align-top' style='width: 12%white-space: pre-wrap;'>" + (data[i].objRisk ? (data[i].objRisk) : '-') + "</td>"
        // strHTML += "<td id='headRisk" + (i + 1) + "'  class='text-left align-top' style='width: 12%white-space: pre-wrap;'>" + (data[i].headRisk ? (data[i].headRisk) : '-') + "</td>"
        // strHTML += "<td id='objRisk" + (i + 1) + "'  class='text-left align-top' style='width: 12%white-space: pre-wrap;'>" + (data[i].objRisk ? (data[i].objRisk) : '-') + "</td>"
        // strHTML += "<td id='improvement" + (i + 1) + "'  class='text-left align-top' style='width: 12%white-space: pre-wrap;'>" + (data[i].improvement ? (data[i].improvement) : '-') + "</td>"
        // strHTML += "</tr>"
    }

    return strHTML;
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

// function fnDrawDataInTable(data) {
//     var strHTML = '';
//     var tab = '&emsp;&emsp;&emsp;&emsp;';
//     const sides = [
//         'ด้านการกำลังพล', 'ด้านยุทธการ', 'ด้านการข่าว', 
//         'ด้านการส่งกำลังบำรุง', 'ด้านการสื่อสาร', 
//         'ด้านระบบเทคโนโลยีสารสนเทศในการบริหารจัดการ', 
//         'ด้านกิจการพลเรือน', 'ด้านการงบประมาณ', 
//         'ด้านการเงินและการบัญชี', 'ด้านพัสดุและทรัพย์สิน'
//     ];

//     // สร้างผลลัพธ์ตามที่ต้องการ
//     sides.forEach((side, index) => {
//         const id_sides = (index + 1).toString();
//         const foundRisks = data.filter(risk => risk.id_sides === id_sides);

//         if (foundRisks.length > 0) {
//             let headRisksContent = [];
//             let riskingContent = '';
//             let existingControlsContent = '';
//             let rateRiskContent = '';
//             let existingRiskContent = '';
//             let improvementControlContent = '';
//             let responsibleAgencyContent = '';
//             const strObjRisk = foundRisks[0].objRisk;

//             foundRisks.forEach(risk => {
//                 if (!headRisksContent.includes(risk.headRisk)) {
//                     headRisksContent.push(risk.headRisk);
//                 }

//                 if (risk.risking) {
//                     riskingContent += `- ${risk.risking}<br><br>`;
//                 }
//                 if (risk.existingControls) {
//                     existingControlsContent += `- ${risk.existingControls}<br><br>`;
//                 }
//                 if (risk.existingRisk) {
//                     rateRiskContent += `- ${risk.existingRisk}<br><br>`;
//                 }
//                 if (risk.improvementControl) {
//                     improvementControlContent += `- ${risk.improvementControl}<br><br>`;
//                 }
//                 if (risk.responsibleAgencyContent) {
//                     responsibleAgencyContent += `- ${risk.responsibleAgency}<br><br>`;
//                 }
//                 if (risk.existingRiskContent) {
//                     responsibleAgencyContent += `- ${risk.existingRisk}<br><br>`;
//                 }
//             });

//             const headRisks = Array.from(headRisksContent).join('<br>- ');

//             strHTML += "<tr>";
//             strHTML += "<td id='headRisk" + index + "' class='text-left align-top' style='width: 25%;'> ";
//             strHTML += " <div> ";
//             strHTML += " <span id='spanHeadRisk" + index + "' style='font-weight: bold;'>" + fnConvertToThaiNumeralsAndPoint(id_sides) + ". " + side + "</span> ";
//             strHTML += " </div> ";
//             strHTML += " <div> ";
//             strHTML += " <span id='spanHeadRisk" + index + "' style='font-weight: bold;'>" + tab + "วัตถุประสงค์</span> ";
//             strHTML += " </div> ";
//             strHTML += " <div> ";
//             strHTML += " <span id='spanHeadRisk" + index + "' class='text-left align-top'>" + tab + strObjRisk + "</span> ";
//             strHTML += " </div> ";
//             strHTML += " <div> ";
//             strHTML += " <span id='spanHeadRisk" + index + "' style='font-weight: bold;'>" + tab + "กิจกรรม</span> ";
//             strHTML += " </div> ";
//             strHTML += " <div> ";
//             strHTML += " <div class='tab'> ";
//             strHTML += " <span id='spanHeadRisk" + index + "'>- " + headRisks + "</span> ";
//             strHTML += " </div> ";
//             strHTML += "</td>";

//             if (riskingContent) {
//                 strHTML += "<td class='text-left align-top' style='width: 12%;'>"
//                 strHTML += " <div class='word-wrap'> "
//                 strHTML += " <span id='spanRisking" + index + "'>" + riskingContent + "</span> "
//                 strHTML += " </div> "
//                 strHTML += " </td>"      
//             }

//             if (existingControlsContent) {
//                 strHTML += "<td class='text-left align-top' style='width: 12%;>"
//                 strHTML += " <div> "
//                 strHTML += " <span id='spanExistingControls" + index + "'>" + existingControlsContent + "</span> "
//                 strHTML += " </div> "
//                 strHTML += " </td>"    
//             } 

//             if (rateRiskContent) {
//                 strHTML += "<td class='text-left align-top' style='width: 12%;>"
//                 strHTML += " <div> "
//                 strHTML += " <span id='spanRateRiskContent" + index + "'>" + rateRiskContent + "</span> "
//                 strHTML += " </div> "
//                 strHTML += " </td>"
//             } else {
//                 strHTML += "<td id='rateRisk" + index + "'  class='text-left align-top' style='width: 12%;'>"
//                 strHTML += "<div style='text-align: center;'>"
//                 strHTML += "    <textarea id='textRateRisk" + index + "' name='textRateRisk" + index + "'  rows='6' cols='10'></textarea> "
//                 strHTML += "</div> "
//                 strHTML += "<div class='text-end'>"
//                 strHTML += "    <button class='btn btn-secondary' type='submit' id='submitRateRisk" + index + "' onclick='fnSubmitText(\"" + index + "\", \"rateRisk\")'>ยืนยัน</button>";
//                 strHTML += "</div>"
//                 strHTML += "<div class='text-start'>"
//                 strHTML += "    <span id='displayTextRateRisk" + index + "' style='white-space: pre-wrap;'></span>"
//                 strHTML += "    <i class='las la-pencil-alt' id='editIconRateRisk" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"rateRisk\")'></i> "
//                 strHTML += "</div>"
//                 strHTML += " </td>"
//             }

//             if (existingRiskContent) {
//                 strHTML += "<td class='text-left align-top' style='width: 12%;>"
//                 strHTML += " <div> "
//                 strHTML += " <span id='spanExistingRisk" + index + "'>" + existingRiskContent + "</span> "
//                 strHTML += " </div> "
//                 strHTML += " </td>"
//             } else {
//                 strHTML += "<td id='rateRisk" + index + "'  class='text-left align-top' style='width: 12%;'>"
//                 strHTML += "<div style='text-align: center;'>"
//                 strHTML += "    <textarea id='textExistingRisk" + index + "' name='textExistingRisk" + index + "'  rows='6' cols='10'></textarea> "
//                 strHTML += "</div> "
//                 strHTML += "<div class='text-end'>"
//                 strHTML += "    <button class='btn btn-secondary' type='submit' id='submitExistingRisk" + index + "' onclick='fnSubmitText(\"" + index + "\", \"existingRisk\")'>ยืนยัน</button>"
//                 strHTML += "</div>"
//                 strHTML += "<div class='text-start'>"
//                 strHTML += "    <span style='white-space: pre-wrap;' id='displayTextExistingRisk" + index + "''></span>"
//                 strHTML += "    <i class='las la-pencil-alt' id='editIconExistingRisk" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"existingRisk\")'></i> "
//                 strHTML += "</div>"
//                 strHTML += " </td>"
//             }

//             if (improvementControlContent) {
//                 strHTML += "<td class='text-left align-top' style='width: 12%;>"
//                 strHTML += " <div> "
//                 strHTML += " <span id='spanImprovementControl" + index + "'>" + improvementControlContent + "</span> "
//                 strHTML += " </div> "
//                 strHTML += " </td>"
//             } 

//             if (responsibleAgencyContent) {
//                 strHTML += "<td class='text-left align-top' style='width: 12%;>"
//                 strHTML += " <div> "
//                 strHTML += " <span id='spanResponsibleAgency" + index + "'>" + responsibleAgencyContent + "</span> "
//                 strHTML += " </div> "
//                 strHTML += " </td>"
//             } else {
//                 strHTML += "<td id='responsibleAgency" + index + "'  class='text-left align-top' style='width: 12%;'>"
//                 strHTML += "<div style='text-align: center;'>"
//                 strHTML += "    <textarea id='textResponsibleAgency" + index + "' name='textResponsibleAgency" + index + "'  rows='6' cols='10'></textarea> "
//                 strHTML += "</div> "
//                 strHTML += "<div class='text-end'>"
//                 strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + index + "' onclick='fnSubmitText(\"" + index + "\", \"responsibleAgency\")'>ยืนยัน</button>"
//                 strHTML += "</div>"
//                 strHTML += "<div class='text-start'>"
//                 strHTML += "    <span id='displayTextResponsibleAgency" + index + "' style='white-space: pre-wrap;'></span>"
//                 strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"responsibleAgency\")'></i> "
//                 strHTML += "</div>"
//                 strHTML += " </td>"
//             }

//             strHTML += "</tr>"
//         }
//     });
//     return strHTML;
// }

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

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div> ";
            strHTML += ` <span id='spanExistingControls${index}'>${foundRisks[0].existingControls ? foundRisks[0].existingControls : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            if (foundRisks[0].evaluationControls) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanEvaluationControls${index}'>${foundRisks[0].evaluationControls}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='EvaluationControls" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textEvaluationControls" + index + "' name='textEvaluationControls" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitEvaluationControls" + index + "' onclick='fnSubmitText(\"" + index + "\", \"EvaluationControls\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start'>";
                strHTML += "    <span id='displayTextEvaluationControls" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconEvaluationControls" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"EvaluationControls\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }
            if (foundRisks[0].existingRisk) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanExistingRisk${index}'>${foundRisks[0].existingRisk}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='ExistingRisk" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textExistingRisk" + index + "' name='textExistingRisk" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitExistingRisk" + index + "' onclick='fnSubmitText(\"" + index + "\", \"ExistingRisk\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start'>";
                strHTML += "    <span id='displayTextExistingRisk" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconExistingRisk" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"ExistingRisk\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div> ";
            strHTML += ` <span id='spanImprovementControl${index}'>${foundRisks[0].improvementControl ? foundRisks[0].improvementControl : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            if (foundRisks[0].responsibleAgencyContent) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanResponsibleAgency${index}'>${foundRisks[0].responsibleAgencyContent}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='responsibleAgency" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textResponsibleAgency" + index + "' name='textResponsibleAgency" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + index + "' onclick='fnSubmitText(\"" + index + "\", \"responsibleAgency\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start'>";
                strHTML += "    <span id='displayTextResponsibleAgency" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"responsibleAgency\")'></i> ";
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

                if (foundRisks[i].evaluationControls) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div> ";
                    strHTML += ` <span id='spanEvaluationControls${index}_${i}'>${foundRisks[i].evaluationControls}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='EvaluationControls" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textEvaluationControls" + index + "_" + i + "' name='textEvaluationControls" + index + "_" + i + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitEvaluationControls" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"EvaluationControls\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start'>";
                    strHTML += "    <span id='displayTextEvaluationControls" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconEvaluationControls" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"EvaluationControls\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                if (foundRisks[i].existingRisk) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div> ";
                    strHTML += ` <span id='spanExistingRisk${index}_${i}'>${foundRisks[i].existingRisk}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='ExistingRisk" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textExistingRisk" + index + "_" + i + "' name='textExistingRisk" + index + "_" + i + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitExistingRisk" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"ExistingRisk\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start'>";
                    strHTML += "    <span id='displayTextExistingRisk" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconExistingRisk" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"ExistingRisk\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div> ";
                strHTML += ` <span id='spanImprovementControl${index}_${i}'>${foundRisks[i].improvementControl ? foundRisks[i].improvementControl : ''}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                if (foundRisks[i].responsibleAgencyContent) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div> ";
                    strHTML += ` <span id='spanResponsibleAgency${index}_${i}'>${foundRisks[i].responsibleAgencyContent}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='responsibleAgency" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textResponsibleAgency" + index + "_" + i + "' name='textResponsibleAgency" + index + "_" + i + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"responsibleAgency\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start'>";
                    strHTML += "    <span id='displayTextResponsibleAgency" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"responsibleAgency\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                strHTML += "</tr>";
            }
        }
    });

    return strHTML;
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

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(index, sides) {
    var textarea = ''
    var button = ''
    var displayText = ''
    var editIcon = ''
    var tab = '&emsp;'
    var format = ''

    if (sides == 'EvaluationControls') {
        textarea = document.getElementById('textEvaluationControls' + index);
        button = document.getElementById('submitEvaluationControls' + index);
        displayText = document.getElementById('displayTextEvaluationControls' + index);
        editIcon = document.getElementById('editIconEvaluationControls'+ index);
    } else if (sides == 'ExistingRisk') {
        textarea = document.getElementById('textExistingRisk' + index);
        button = document.getElementById('submitExistingRisk' + index);
        displayText = document.getElementById('displayTextExistingRisk' + index)
        editIcon = document.getElementById('editIconExistingRisk'+ index);
    } else {
        textarea = document.getElementById('textResponsibleAgency' + index);
        button = document.getElementById('submitResponsibleAgency' + index);
        displayText = document.getElementById('displayTextResponsibleAgency' + index); 
        editIcon = document.getElementById('editIconResponsibleAgency'+ index); 
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

    if (sides == 'EvaluationControls') {
        textarea = document.getElementById('textEvaluationControls' + index);
        button = document.getElementById('submitEvaluationControls' + index);
        displayText = document.getElementById('displayTextEvaluationControls' + index);
        editIcon = document.getElementById('editIconEvaluationControls'+ index);
    } else if (sides == 'ExistingRisk') {
        textarea = document.getElementById('textExistingRisk' + index);
        button = document.getElementById('submitExistingRisk' + index);
        displayText = document.getElementById('displayTextExistingRisk' + index)
        editIcon = document.getElementById('editIconExistingRisk'+ index);
    } else {
        textarea = document.getElementById('textResponsibleAgency' + index);
        button = document.getElementById('submitResponsibleAgency' + index);
        displayText = document.getElementById('displayTextResponsibleAgency' + index); 
        editIcon = document.getElementById('editIconResponsibleAgency'+ index); 
    }
    /* แสดง textarea และปุ่ม */
    textarea.style.display = 'inline';
    button.style.display = 'inline';

    /* ซ่อนไอคอนแก้ไข */
    editIcon.style.display = 'none';

    /* เติมข้อความที่จะแก้ไขใน textarea */
    textarea.value = displayText.innerText.trim();
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

