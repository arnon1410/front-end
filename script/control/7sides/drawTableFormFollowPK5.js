function fnSetHeader(){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable'>ภารกิจตามกฎหมายที่จัดตั้งหน่วยงานของรัฐหรือภารกิจตามแผนการหรือภารกิจอื่น ๆ ที่สำคัญของหน่วยงานของรัฐ/วัตถุประสงค์</th>"
    strHTML += "<th class='text-center textHeadTable'>ความเสี่ยงที่ยังมีอยู่</th>"
    strHTML += "<th class='text-center textHeadTable'>การปรับปรุงการควบคุมภายใน</th>"
    strHTML += "<th class='text-center textHeadTable'>หน่วยงานที่รับผิดชอบ</th>"
    strHTML += "<th class='text-center textHeadTable'>สถานการณ์ดำเนินการ % ความคืบหน้า</th>"
    strHTML += "<th class='text-center textHeadTable'>ปัญหาอุปสรรคและแนวทางแก้ไข</th>"
    return strHTML
}

async function fnDrawTableForm(access) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
     // Get data selete before create table 
    var strHTML = ''
    var strYear = ''
    var strUserId = fnGetCookie("userId")
    var currentYear = new Date().getFullYear();
    var laterYear = new Date().getFullYear() - 1;
    strYear = currentYear + 543; // หลังจากกรอกข้่อมูลปีที่แล้วเสร็จเปลี่ยนเป็น laterYear

    var dataHighRiskSQL = await fnGetDataResultHighRisk(strUserId, strYear)
    var dataConPKF5SQL = await fnGetDataResultConPKF5(strUserId)

    var prefixAsessor = dataConPKF5SQL[0].prefixAsessor || ''
    var signPath = dataConPKF5SQL[0].signPath || ''
    var position = dataConPKF5SQL[0].position || ''
    var dateAsessor = dataConPKF5SQL[0].dateAsessor || ''
    var shortName = dataConPKF5SQL[0].shortName || ''
    
    var strCurrentYear = ''
    var strLasterYear = ''
    if (dateAsessor) {
        var dateSplit = dateAsessor.split('-');
        strCurrentYear = parseInt(dateSplit[0]) + 543
        strLasterYear = (parseInt(dateSplit[0]) - 1) + 543
    } else {
        strCurrentYear = currentYear + 543
        strLasterYear = laterYear + 543
    }

    var DateFix = 'ณ วันที่ ๑ เดือน ตุลาคม ' + fnConvertToThaiNumeralsAndPoint(strLasterYear) + ' ถึง วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(strCurrentYear)
    strHTML += " <div class='text-end'>แบบติดตาม ปค.๕</div> "
    strHTML += " <div class='title'>หน่วยงาน " + shortName +  "</div> "
    strHTML += " <div class='title'>รายงานการติดตามการประเมินการควบคุมภายใน</div> "
    strHTML += " <div class='title'>" + DateFix + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_PKF5'>"
    strHTML += "<thead>"
    strHTML += "<tr class='colspan-header'>"
    strHTML += fnSetHeader() 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"

    if (dataHighRiskSQL.length > 0) {
        strHTML += await fnDrawTablePerformance(dataHighRiskSQL)
    }  else { // ไม่มีข้อมูล
        strHTML += "<tr>";
        strHTML += `<td colspan='6' class='text-center align-top' style='width: 100%;'>`;
        strHTML += ` <span id='spanNotHaveData'>ไม่มีข้อมูลแบบติดตามปค. ๕</span> `;
        strHTML += "<tr>";
    }
   
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += await fnDrawCommentDivEvaluation(prefixAsessor,signPath,position,dateAsessor)

    strHTML += " </div> "

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

            if (foundRisks[0].improvementControl) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='displayTextImprovementControl${index}'>${foundRisks[0].improvementControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='ImprovementControl" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textImprovementControl" + index + "' name='textImprovementControl" + index + "' rows='6' cols='10' style='width: 100%;'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitImprovementControl" + index + "' onclick='fnSubmitText(\"" + index + "\", \"ImprovementControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-start' style='text-indent: 17px;'>";
                strHTML += "    <span id='displayTextImprovementControl" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconImprovementControl" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"ImprovementControl\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }
            if (foundRisks[0].responsibleAgency) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div class='text-center'> ";
                strHTML += ` <span id='displayTextResponsibleAgency${index}'>${foundRisks[0].responsibleAgency}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='responsibleAgency" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textResponsibleAgency" + index + "' name='textResponsibleAgency" + index + "' rows='6' cols='10' style='width: 100%;'></textarea> ";
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
                strHTML += " <div class='text-center'> ";
                strHTML += ` <span id='displayTextProgressControl${index}'>${foundRisks[0].progressControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='progressControl" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textProgressControl" + index + "' name='textProgressControl" + index + "' rows='6' cols='10' style='width: 100%;'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitProgressControl" + index + "' onclick='fnSubmitText(\"" + index + "\", \"ProgressControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-center'>";
                strHTML += "    <span id='displayTextProgressControl" + index + "' style='white-space: pre-wrap;'></span>";
                strHTML += "    <i class='las la-pencil-alt' id='editIconProgressControl" + index + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "\", \"ProgressControl\")'></i> ";
                strHTML += "</div>";
                strHTML += "</td>";
            }

            if (foundRisks[0].solutionsControl) {
                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div class='text-center'> ";
                strHTML += ` <span id='displayTextProgressControl${index}'>${foundRisks[0].solutionsControl}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";
            } else {
                strHTML += "<td id='solutionsControl" + index + "' class='text-left align-top' style='width: 12%;'>";
                strHTML += "<div style='text-align: center;'>";
                strHTML += "    <textarea id='textSolutionsControl" + index + "' name='textSolutionsControl" + index + "' rows='6' cols='10' style='width: 100%;'></textarea> ";
                strHTML += "</div> ";
                strHTML += "<div class='text-end'>";
                strHTML += "    <button class='btn btn-secondary' type='submit' id='submitSolutionsControl" + index + "' onclick='fnSubmitText(\"" + index + "\", \"SolutionsControl\")'>ยืนยัน</button>";
                strHTML += "</div>";
                strHTML += "<div class='text-center'>";
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
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='displayTextRisking${index}_${i}'>${foundRisks[i].risking ? foundRisks[i].risking : ''}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                strHTML += " <div style='text-indent: 17px;'> ";
                strHTML += ` <span id='displayTextExistingControl${index}_${i}'>${foundRisks[i].existingControl ? foundRisks[i].existingControl : '-'}</span> `;
                strHTML += " </div> ";
                strHTML += "</td>";

                if (foundRisks[i].responsibleAgency) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='displayTextResponsibleAgency${index}_${i}'>${foundRisks[i].responsibleAgency}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='responsibleAgency" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textResponsibleAgency" + index + "_" + i + "' name='textResponsibleAgency" + index + "_" + i + "' rows='6' cols='10' style='width: 100%;'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitResponsibleAgency" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"responsibleAgency\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-center'>";
                    strHTML += "    <span id='displayTextResponsibleAgency" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconResponsibleAgency" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"responsibleAgency\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                if (foundRisks[i].progressControl) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='displayTextProgressControl${index}_${i}'>${foundRisks[i].progressControl}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='progressControl" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textProgressControl" + index + "_" + i + "' name='textProgressControl" + index + "_" + i + "' rows='6' cols='10' style='width: 100%;'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitProgressControl" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"progressControl\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-center'>";
                    strHTML += "    <span id='displayTextProgressControl" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconProgressControl" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"progressControl\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                if (foundRisks[i].solutionsControl) {
                    strHTML += "<td class='text-left align-top' style='width: 12%;'>";
                    strHTML += " <div style='text-indent: 17px;'> ";
                    strHTML += ` <span id='displayTextSolutionsControl${index}_${i}'>${foundRisks[i].SolutionsControl}</span> `;
                    strHTML += " </div> ";
                    strHTML += "</td>";
                } else {
                    strHTML += "<td id='solutionsControl" + index + "_" + i + "' class='text-left align-top' style='width: 12%;'>";
                    strHTML += "<div style='text-align: center;'>";
                    strHTML += "    <textarea id='textSolutionsControl" + index + "_" + i + "' name='textSolutionsControl" + index + "_" + i + "' rows='6' cols='10' style='width: 100%;'></textarea> ";
                    strHTML += "</div> ";
                    strHTML += "<div class='text-end'>";
                    strHTML += "    <button class='btn btn-secondary' type='submit' id='submitSolutionsControl" + index + "_" + i + "' onclick='fnSubmitText(\"" + index + "_" + i + "\", \"solutionsControl\")'>ยืนยัน</button>";
                    strHTML += "</div>";
                    strHTML += "<div class='text-center'>";
                    strHTML += "    <span id='displayTextSolutionsControl" + index + "_" + i + "' style='white-space: pre-wrap;'></span>";
                    strHTML += "    <i class='las la-pencil-alt' id='editIconSolutionsControl" + index + "_" + i + "' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + index + "_" + i + "\", \"solutionsControl\")'></i> ";
                    strHTML += "</div>";
                    strHTML += "</td>";
                }

                strHTML += "</tr>";
            }
        }
    });

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

async function fnGetDataResultHighRisk(userId, strYear) {
    var dataSend = {
        userId: userId,
        strYear: strYear
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

async function fnGetDataResultConPKF5(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultConPKF5', dataSend)
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

    if (sides == 'ImprovementControl') {
        textarea = document.getElementById('textImprovementControl' + index);
        button = document.getElementById('submitImprovementControl' + index);
        displayText = document.getElementById('displayTextImprovementControl' + index);
        editIcon = document.getElementById('editIconImprovementControl'+ index);
    } else if (sides == 'responsibleAgency') {
        textarea = document.getElementById('textResponsibleAgency' + index);
        button = document.getElementById('submitResponsibleAgency' + index);
        displayText = document.getElementById('displayTextResponsibleAgency' + index)
        editIcon = document.getElementById('editIconResponsibleAgency'+ index);
    } else if (sides == 'progressControl') {
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