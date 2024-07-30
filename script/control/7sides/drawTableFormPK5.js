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

async function fnDrawTableForm(access) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var strUserId = fnGetCookie("userId")
    var dataHighRiskSQL = await fnGetDataResultHighRisk(strUserId)
    var dataConPK5SQL = await fnGetDataResultConPK5(strUserId)
    var prefixAsessor = dataConPK5SQL[0].prefixAsessor || ''
    var signPath = dataConPK5SQL[0].signPath || ''
    var position = dataConPK5SQL[0].position || ''
    var dateAsessor = dataConPK5SQL[0].dateAsessor || ''
    var shortName = dataConPK5SQL[0].shortName || ''
    
    var strYear = ''
    if (dateAsessor) {
        var dateSplit = dateAsessor.split('-');
        strYear = parseInt(dateSplit[0]) + 543;
    } else {
        var currentYear = new Date().getFullYear();
        strYear = currentYear + 543;
    }
    var DateFix = ' ณ วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(strYear)

    strHTML += " <div class='text-end'>แบบ ปค.๕</div> "
    strHTML += " <div class='title'>หน่วยงาน "+ shortName +"</div> "
    strHTML += " <div class='title'>รายงานการประเมินผลการควบคุมภายใน</div> "
    strHTML += " <div class='title'>สำหรับระยะเวลาดำเนินงานสิ้นสุด " + DateFix + " </div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_PK5>"
    strHTML += "<thead>"
    strHTML += "<tr class='colspan-header'>"
    strHTML += fnSetHeader() 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    if (dataHighRiskSQL.length > 0) {
        strHTML += await fnDrawTablePerformance(dataHighRiskSQL)
    } else {
        strHTML += await fnDrawTablePerformanceFix()
    }
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += await fnDrawCommentDivEvaluation(prefixAsessor,signPath,position,dateAsessor)

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='button' class='btn btn-primary' id='btnSaveData' onclick='fnSaveDraftDocument()'>บันทึกฉบับร่าง</button>"
    // strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF' onclick='fnExportDocument()'>Export PDF</button>"
    strHTML += " </div> "

    $("#dvFormAssessment")[0].innerHTML = strHTML
}

async function fnDrawTablePerformance(data) {
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
        const idSides = (index + 2).toString(); // + 2 เพราะใน SQL เริ่มต้นด้วย 2
        const foundRisks = data.filter(risk => risk.idSides == idSides);
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
            strHTML += ` <span id='spanHeadRisk${index}' style='font-weight: bold;'>${fnConvertToThaiNumeralsAndPoint(idSides - 1)}. ${side}</span> `;
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
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanHeadRisk${index}'>- ${headRisks}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanRisking${index}'>${foundRisks[0].risking ? foundRisks[0].risking : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanExistingControl${index}'>${foundRisks[0].existingControl ? foundRisks[0].existingControl : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            if (foundRisks[0].evaluationControl) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanEvaluationControl${index}'>${foundRisks[0].evaluationControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='EvaluationControl" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textEvaluationControl" + index + "' name='textEvaluationControl" + index + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitEvaluationControl" + index + "' onclick='fnSubmitText(\"" + index + "\", \"EvaluationControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                strHTML += "    <span id='displayTextEvaluationControl" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconEvaluationControl" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"EvaluationControl\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }
            if (foundRisks[0].existingRisk) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
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
                strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                strHTML += "    <span id='displayTextExistingRisk" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconExistingRisk" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"ExistingRisk\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanImprovementControl${index}'>${foundRisks[0].improvementControl ? foundRisks[0].improvementControl : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            if (foundRisks[0].responsibleAgency) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanResponsibleAgency${index}'>${foundRisks[0].responsibleAgency}</span> `;
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
                strHTML += "<div class='text-start' style='text-indent: 17px;'>";
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
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanRisking${index}_${i}'>${foundRisks[i].risking ? foundRisks[i].risking : ''}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanExistingControl${index}_${i}'>${foundRisks[i].existingControl ? foundRisks[i].existingControl : '-'}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                if (foundRisks[i].evaluationControl) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='spanEvaluationControl${index}_${i}'>${foundRisks[i].evaluationControl}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='EvaluationControl" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textEvaluationControl" + index + "_" + i + "' name='textEvaluationControl" + index + "_" + i + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitEvaluationControl" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"EvaluationControl\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                    strHTML += "    <span id='displayTextEvaluationControl" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconEvaluationControl" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"EvaluationControl\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                if (foundRisks[i].existingRisk) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
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
                    strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                    strHTML += "    <span id='displayTextExistingRisk" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconExistingRisk" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"ExistingRisk\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanImprovementControl${index}_${i}'>${foundRisks[i].improvementControl ? foundRisks[i].improvementControl : ''}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                if (foundRisks[i].responsibleAgency) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='spanResponsibleAgency${index}_${i}'>${foundRisks[i].responsibleAgency}</span> `;
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
                    strHTML += "<div class='text-start' style='text-indent: 17px;'>";
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

async function fnDrawTablePerformanceFix() {
    var strHTML = '';
    var index = 0
    var strMissionMain = 'ดำเนินการตรวจสอบภายในหน่วยงานของกองทัพเรือโดยอิสระ เพื่อประเมินค่าประสิทธิภาพ และประสิทธิผลในการดำเนินงานและบริหารทรัพยากรตามความมุ่งหมายของกองทัพเรือ'
    var strPolicy = 'เป็นหน่วยงานตรวจสอบภายในที่มีการปฏิบัติงานอย่างมีระบบตามมาตรฐานและบริหารจัดการภาครัฐอย่างมืออาชีพ โดยใช้เทคโนโลยีสนับสนุนการดำเนินการ'
    var strMissionSub = 'สนับสนุนและดำเนินการในส่วนที่เกี่ยวข้องตามนโยบาย ทร. และนโยบาย ผบ. ทร.'

    var strRisk = 'ความเสี่ยงทั้ง ๑๐ ด้านอยู่ในเกณฑ์ที่ยอมรับได้'
    var strExistingControl = 'มีการแบ่งหน้าที่ความรับผิดชอบการควบคุมภายในของหน่วย'
    var strEvaluationControl = 'การควบคุมที่มีอยู่มีความเหมาะสมและเพียงพอ'
    var strExistingRisk = 'ไม่มีความเสี่ยงที่มีอยู่'
    var strImprovementsControl = 'ไม่มีการปรับปรุง'
    var strUserId = fnGetCookie("userId")
    var dataSQL = await fnGetDataResultPK5Fix(strUserId)

    strHTML += "<tr>";
        strHTML += "<td id='headRisk' class='text-left align-top' style='width: 25%;'>";
        strHTML += " <div> ";
        strHTML += " <span style='font-weight: bold;'>ด้านภารกิจหลัก</span> ";
        strHTML += " </div> ";
        strHTML += " <div style='text-indent: 17px;'> ";
        strHTML += " <span>" + strMissionMain + "</span>";
        strHTML += " </div> <br>";
        strHTML += " <div> ";
        strHTML += " <span style='font-weight: bold;'>ด้านนโยบายสำคัญ</span> ";
        strHTML += " </div> ";
        strHTML += " <div style='text-indent: 17px;'> ";
        strHTML += " <span>" + strPolicy + "</span>";
        strHTML += " </div> <br>";
        strHTML += " <div> ";
        strHTML += " <span style='font-weight: bold;'>ด้านภารกิจสนับสนุน</span> ";
        strHTML += " </div> ";
        strHTML += " <div style='text-indent: 17px;'> ";
        strHTML += " <span>" + strMissionSub + "</span>";
        strHTML += " </div> ";
        strHTML += "</td>";

        strHTML += "<td class='text-center align-top' style='width: 12%;'>";
        strHTML += " <div> ";
        strHTML += " <span id='spanRisk'>" + strRisk + "</span> ";
        strHTML += " </div> ";
        strHTML += "</td>";

        strHTML += "<td class='text-center align-top' style='width: 12%;'>";
        strHTML += " <div> ";
        strHTML += " <span id='spanExistingControl'>" + strExistingControl + "</span> ";
        strHTML += " </div> ";
        strHTML += "</td>";

        strHTML += "<td class='text-center align-top' style='width: 12%;'>";
        strHTML += " <div> ";
        strHTML += " <span id='spanEvaluationControl'>" + strEvaluationControl + "</span> ";
        strHTML += " </div> ";
        strHTML += "</td>";
        
        strHTML += "<td class='text-center align-top' style='width: 13%;'>";
        strHTML += " <div> ";
        strHTML += " <span id='spanExistingRisk'>" + strExistingRisk + "</span> ";
        strHTML += " </div> ";
        strHTML += "</td>";
        
        strHTML += "<td class='text-center align-top' style='width: 12%;'>";
        strHTML += " <div> ";
        strHTML += " <span id='spanImprovementsControl'>" + strImprovementsControl + "</span> ";
        strHTML += " </div> ";
        strHTML += "</td>";


    if (!dataSQL[0].responsibleAgency) {
        strHTML += "<td class='text-center align-top' style='width: 12%;'>";
        strHTML += " <div> ";
        strHTML += " <span id='displayTextResponsibleAgency'>" + dataSQL[0].responsibleAgency + "</span> ";
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
        strHTML += "<div class='text-center'>";
        strHTML += "    <span id='displayTextResponsibleAgency" + index + "' style='white-space: pre-wrap;'></span>";
        strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"responsibleAgency\")'></i> ";
        strHTML += "</div>";
        strHTML += "</td>";
    }
        
    strHTML += "</tr>";

    return strHTML;
}

async function fnDrawCommentDivEvaluation(prefixAsessor,signPath,position,dateAsessor) {
    var strHTML = ''

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

async function fnGetDataResultHighRisk(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultHighRisk', dataSend)
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

async function fnGetDataResultPK5Fix(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultPK5Fix', dataSend)
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

async function fnGetDataResultPK5Fix(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultPK5Fix', dataSend)
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

async function fnGetDataResultConPK5(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultConPK5', dataSend)
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
function fnSubmitText(index, sides) {
    var textarea = ''
    var button = ''
    var displayText = ''
    var editIcon = ''
    var tab = '&emsp;'
    var format = ''

    if (sides == 'EvaluationControl') {
        textarea = document.getElementById('textEvaluationControl' + index);
        button = document.getElementById('submitEvaluationControl' + index);
        displayText = document.getElementById('displayTextEvaluationControl' + index);
        editIcon = document.getElementById('editIconEvaluationControl'+ index);
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

    if (sides == 'EvaluationControl') {
        textarea = document.getElementById('textEvaluationControl' + index);
        button = document.getElementById('submitEvaluationControl' + index);
        displayText = document.getElementById('displayTextEvaluationControl' + index);
        editIcon = document.getElementById('editIconEvaluationControl'+ index);
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

