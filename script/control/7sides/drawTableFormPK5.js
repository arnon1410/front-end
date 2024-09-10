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
    var strUserId = ""

    if (access === 'admin') {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        strUserId = urlParams.get('userId')
    } else {
        strUserId = fnGetCookie("userId");
    }
     // Get data selete before create table 
    var strHTML = ''
    var dataHighRiskSQL = await fnGetDataResultHighRisk(strUserId)
    var dataConPK5SQL = await fnGetDataResultConPK5(strUserId)
    var strResultDocSQL= await fnGetDataResultDoc(strUserId, idSideFix)

    // ตรวจสอบว่า dataConPK5SQL มีข้อมูลและไม่เป็น undefined หรือ null
    var idConPK5 = (dataConPK5SQL && dataConPK5SQL.length > 0) ? dataConPK5SQL[0].id : '';
    var prefixAsessor = (dataConPK5SQL && dataConPK5SQL.length > 0) ? dataConPK5SQL[0].prefixAsessor : '';
    var signPath = (dataConPK5SQL && dataConPK5SQL.length > 0) ? dataConPK5SQL[0].signPath : '';
    var position = (dataConPK5SQL && dataConPK5SQL.length > 0) ? dataConPK5SQL[0].position : '';
    var dateAsessor = (dataConPK5SQL && dataConPK5SQL.length > 0) ? dataConPK5SQL[0].dateAsessor : '';
    var shortName = (dataConPK5SQL && dataConPK5SQL.length > 0) ? dataConPK5SQL[0].shortName : '';
    
    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

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
    strHTML += " <div class='title'><input type='hidden' id='inputIdConPK5' name='inputIdConPK5' value='" + idConPK5 + "'></div> "
    strHTML += " <div class='title'><span class='unit-label'>หน่วยงาน</span><span id='spanNameUnit' style='width: 232px;' class='underline-dotted'>" + shortName + "</span> </div>"
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

    strHTML += await fnDrawCommentDivEvaluation(prefixAsessor, signPath, position, dateAsessor, strUserId, access)

    strHTML += " <div class='dvFooterForm'> "
    if (access !== 'admin') {
        strHTML += "    <button type='button' class='btn btn-success' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    }
    strHTML += " </div> "

    $("#dvFormAssessment")[0].innerHTML = strHTML
    if (access !== 'admin') {
        fnAddSaveButtonEventListener(dataHighRiskSQL, strUserId, strUserDocId)
    }
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
            strHTML += `<td rowspan='${foundRisks.length}' id='headRisk${foundRisks[0].id}' class='text-left align-top' style='width: 25%;'>`;
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${foundRisks[0].id}' style='font-weight: bold;'>${fnConvertToThaiNumeralsAndPoint(idSides - 1)}. ${side}</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${foundRisks[0].id}' style='font-weight: bold;'>${tab}วัตถุประสงค์</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${foundRisks[0].id}' class='text-left align-top'>${tab}${strObjRisk}</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += ` <span id='spanHeadRisk${foundRisks[0].id}' style='font-weight: bold;'>${tab}กิจกรรม</span> `;
            strHTML += " </div> ";
            strHTML += " <div> ";
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanHeadRisk${foundRisks[0].id}'>- ${headRisks}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanRisking${foundRisks[0].id}'>${foundRisks[0].risking ? foundRisks[0].risking : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanExistingControl${foundRisks[0].id}'>${foundRisks[0].existingControl ? foundRisks[0].existingControl : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            if (foundRisks[0].evaluationControl) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanEvaluationControl${foundRisks[0].id}'>${foundRisks[0].evaluationControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='EvaluationControl" + foundRisks[0].id + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textEvaluationControl" + foundRisks[0].id + "' name='textEvaluationControl" + foundRisks[0].id + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitEvaluationControl" + foundRisks[0].id + "' onclick='fnSubmitText(\"" + foundRisks[0].id + "\", \"EvaluationControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                strHTML += "    <span id='displayTextEvaluationControl" + foundRisks[0].id + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconEvaluationControl" + foundRisks[0].id + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + foundRisks[0].id + "\", \"EvaluationControl\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }
            if (foundRisks[0].existingRisk) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanExistingRisk${foundRisks[0].id}'>${foundRisks[0].existingRisk}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='ExistingRisk" + foundRisks[0].id + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textExistingRisk" + foundRisks[0].id + "' name='textExistingRisk" + foundRisks[0].id + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitExistingRisk" + foundRisks[0].id + "' onclick='fnSubmitText(\"" + foundRisks[0].id + "\", \"ExistingRisk\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                strHTML += "    <span id='displayTextExistingRisk" + foundRisks[0].id + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconExistingRisk" + foundRisks[0].id + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + foundRisks[0].id + "\", \"ExistingRisk\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            strHTML += "<td class='text-left align-top' style='width: 12%;'>";
            strHTML += " <div style='text-indent: 17px;'> ";
            strHTML += ` <span id='spanImprovementControl${foundRisks[0].id}'>${foundRisks[0].improvementControl ? foundRisks[0].improvementControl : ''}</span> `;
            strHTML += " </div> ";
            strHTML += "</td>";

            if (foundRisks[0].responsibleAgency) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanResponsibleAgency${foundRisks[0].id}'>${foundRisks[0].responsibleAgency}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='responsibleAgency" + foundRisks[0].id + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textResponsibleAgency" + foundRisks[0].id + "' name='textResponsibleAgency" + foundRisks[0].id + "' rows='6' cols='10'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + foundRisks[0].id + "' onclick='fnSubmitText(\"" + foundRisks[0].id + "\", \"responsibleAgency\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                strHTML += "    <span id='displayTextResponsibleAgency" + foundRisks[0].id + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + foundRisks[0].id + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + foundRisks[0].id + "\", \"responsibleAgency\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            strHTML += "</tr>";


            // Subsequent rows for the remaining risks
            for (let i = 1; i < foundRisks.length; i++) {
                strHTML += "<tr>";

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanRisking${foundRisks[i].id}'>${foundRisks[i].risking ? foundRisks[i].risking : ''}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanExistingControl${foundRisks[i].id}'>${foundRisks[i].existingControl ? foundRisks[i].existingControl : '-'}</span> `; // ใช้ existingControl แทน ac
                strHTML += " </div> ";
                strHTML += "</td>";

                if (foundRisks[i].evaluationControl) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='spanEvaluationControl${foundRisks[i].id}'>${foundRisks[i].evaluationControl}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='EvaluationControl" + foundRisks[i].id + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textEvaluationControl" + foundRisks[i].id + "' name='textEvaluationControl" + foundRisks[i].id + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitEvaluationControl" + foundRisks[i].id + "' onclick='fnSubmitText(\"" + foundRisks[i].id + "\", \"EvaluationControl\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                    strHTML += "    <span id='displayTextEvaluationControl" + foundRisks[i].id + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconEvaluationControl" + foundRisks[i].id + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + foundRisks[i].id + "\", \"EvaluationControl\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                if (foundRisks[i].existingRisk) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='spanExistingRisk${foundRisks[i].id}'>${foundRisks[i].existingRisk}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='ExistingRisk" + foundRisks[i].id + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textExistingRisk" + foundRisks[i].id + "' name='textExistingRisk" + foundRisks[i].id + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitExistingRisk" + foundRisks[i].id + "' onclick='fnSubmitText(\"" + foundRisks[i].id + "\", \"ExistingRisk\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                    strHTML += "    <span id='displayTextExistingRisk" + foundRisks[i].id + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconExistingRisk" + foundRisks[i].id + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + foundRisks[i].id + "\", \"ExistingRisk\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='spanImprovementControl${foundRisks[i].id}'>${foundRisks[i].improvementControl ? foundRisks[i].improvementControl : '-'}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                if (foundRisks[i].responsibleAgency) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='spanResponsibleAgency${foundRisks[i].id}'>${foundRisks[i].responsibleAgency}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='responsibleAgency" + foundRisks[i].id + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textResponsibleAgency" + foundRisks[i].id + "' name='textResponsibleAgency" + foundRisks[i].id + "' rows='6' cols='10'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + foundRisks[i].id + "' onclick='fnSubmitText(\"" + foundRisks[i].id + "\", \"responsibleAgency\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                    strHTML += "    <span id='displayTextResponsibleAgency" + foundRisks[i].id + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + foundRisks[i].id + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + foundRisks[i].id + "\", \"responsibleAgency\")'></i> ";
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


    if (dataSQL && dataSQL.length > 0 && dataSQL[0].responsibleAgency) {
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

async function fnDrawCommentDivEvaluation(prefixAsessor,signPath,position,dateAsessor,strUserId, access) {
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
        strHTML += `<div><div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${position}</span></div>`
    } else {
        strHTML += ` <div>ตำแหน่ง <span style="width: 211px;text-align: left;" class="underline-dotted">:</span></div> `
    }

    if (dateAsessor) {
        strHTML += `<div>วันที่: <span style="width: 232px;" class="underline-dotted">${fnFormatDateToThai(dateAsessor)}</span></div>`
    } else {
        strHTML += `<div>วันที่ <span style="width: 237px;text-align: left;" class="underline-dotted">:</span></div>`
    }
    if (access !== 'admin') { // ถ้าเป็น admin
        strHTML += " </div> "
        strHTML += " <div id='dv-btn-Signature' class='dv-btn-Signature' > "
        strHTML += "    <button id='btnEditSignature' type='button' class='btn btn-warning btn-sm' onclick='fnDrawModalAssessor(\"" + prefixAsessor + "\", \"" + position + "\", \"" + dateAsessor + "\")' data-bs-toggle='modal' data-bs-target='#assessorModal'> "
        strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span> "
        strHTML += "    </button> "
        strHTML += " </div> "
        strHTML += " </div> ";
    }

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
/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(index, sides) {
    var textarea = ''
    var button = ''
    var displayText = ''
    var editIcon = ''
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

function fnSaveDraftDocument(data , strUserId, strUserDocId, event)  {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    var dataSend = []
    var strDisplayTextEV = ''
    var strDisplayTextER = ''
    var strDisplayTextRA = ''
    var evaluationControl = ''
    var existingRisk = ''
    var responsibleAgency = ''
    var strUserName = fnGetCookie("username");

    // Loop ผ่าน data เพื่อเปรียบเทียบและ push ข้อมูลลงใน dataSend
    data.forEach(formItem => {
        strDisplayTextEV = $('#displayTextEvaluationControl' + formItem.id).text();
        strDisplayTextER = $('#displayTextExistingRisk' + formItem.id).text();
        strDisplayTextRA = $('#displayTextResponsibleAgency' + formItem.id).text();

        evaluationControl = formItem.evaluationControl === null ? '' : formItem.evaluationControl;
        existingRisk = formItem.existingRisk === null ? '' : formItem.existingRisk;
        responsibleAgency = formItem.responsibleAgency === null ? '' : formItem.responsibleAgency;
        
        if ((evaluationControl !== strDisplayTextEV ) || (existingRisk !== strDisplayTextER) || (responsibleAgency !== strDisplayTextRA)) { // หาข้อมูลที่มีการแก้ไข
            dataSend.push({
                idPK5: formItem.id,
                userId: strUserId,  // หรือใช้ strUserId ถ้ามีการประกาศ
                userDocId: strUserDocId,
                username: strUserName,
                evaluationControl: strDisplayTextEV,
                existingRisk: strDisplayTextER,
                responsibleAgency: strDisplayTextRA
            });
        }
    });
    console.log(dataSend)
    if (dataSend && dataSend.length > 0) {
        if (!dataSend[0].evaluationControl) {
            Swal.fire({
                title: "",
                text: "กรุณากรอกการประเมินผลการควบคุมภายใน",
                icon: "warning"
            });
            return; // ออกจากฟังก์ชันทันทีถ้าค่าทั้งหมดว่าง
        }

        if (!dataSend[0].existingRisk) {
            Swal.fire({
                title: "",
                text: "กรุณากรอกความเสี่ยงที่ยังมีอยู่",
                icon: "warning"
            });
            return; // ออกจากฟังก์ชันทันทีถ้าค่าทั้งหมดว่าง
        }

        if (!dataSend[0].responsibleAgency) {
            Swal.fire({
                title: "",
                text: "กรุณากรอกหน่วยงานที่รับผิดชอบ",
                icon: "warning"
            });
            return; // ออกจากฟังก์ชันทันทีถ้าค่าทั้งหมดว่าง
        }

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
                    const results = await fnSetDataFormPK5(dataSend)
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
    const strIdConPK5 = $('#inputIdConPK5').val();
    const strPrefixAsessor = $('#inputPrefixAsessor').val();
    const strUserId = $('#inputIdUsers').val();
    const strUserName = fnGetCookie("username");
    const strResultDocSQL= await fnGetDataResultDoc(strUserId)
    const strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    // Result container to display the signature
    const resultContainer = $('#dvSignature');
    
    const data =  {
        idConPK5: strIdConPK5,
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
                const resultId = await fnSetDataSignaturePK5(data)
                if (resultId) {
                    let strHTML = `
                        <div>ผู้ประเมิน: <span style="width: 197px;" class="underline-dotted">${fnCheckFalsy(strPrefixAsessor)}<img src="${signPath}" alt="ลายเซ็น" /></span></div>
                    `;
        
                    resultContainer.html(strHTML); // Use .html() to set the content
                    
                    $('#inputSignPath').val(signPath) // เพิ่มลายเซ็นไปเก็บไว้ใน input

                    if (!strIdConPK5) { // เช็คว่าถ้า strIdConPK5 ยังไม่ข้อมูลในเทเบิ้ล
                        $('#inputIdConPK5').val(resultId)
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
        const strIdConPK5 = $('#inputIdConPK5').val();
        const strUserId = $('#inputIdUsers').val();
        var strResultDocSQL= await fnGetDataResultDoc(strUserId)
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
            idConPK5: strIdConPK5,
            userId: strUserId,
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
                    const resultId = await fnSetDataAssessorPK5(data)
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
                        if (!strIdConPK5) { // เช็คว่าถ้า strIdConPK5 ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConPK5').val(resultId)
                        }

                        strHTML2 += `
                            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
                            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
                        `;
            
                        resultContainer.html(strHTML2); // Use .html() to set the content
                
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

async function fnSetDataAssessorPK5(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnSetAssessorPK5', dataSend)
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

async function fnSetDataSignaturePK5(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnSetSignaturePK5', dataSend)
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

async function fnGetDataResultDoc(userId) {
    var dataSend = {
        userId: userId,
        sideId: '12',
        formId: '6'
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultDoc', dataSend)
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

async function fnGetDataResultHighRisk(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultHighRisk', dataSend)
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

// async function fnGetDataResultPK5Fix(userId) {
//     var dataSend = {
//         userId: userId
//     }

//     try {
//         const response = await axios.post('http://localhost:3000/api/documents/fnGetResultPK5Fix', dataSend)
//         var res = response.data.result
//         if (res.length > 0) {
//             return res
//         } else {
//             return []
//         }
//     } catch (error) {
//         await Swal.fire({
//             title: 'เกิดข้อผิดพลาด',
//             text: 'userId หรือ sideId ไม่ถูกต้อง',
//             icon: 'error'
//         })
//         return []
//     }
// }

async function fnGetDataResultPK5Fix(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultPK5Fix', dataSend)
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

async function fnGetDataResultConPK5(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultConPK5', dataSend)
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

async function fnSetDataFormPK5(dataSend) {
    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnSetFormPK5', dataSend)
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


