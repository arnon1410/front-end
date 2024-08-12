function fnSetHeader(){
    var strHTML = ''
    strHTML += "<th rowspan='2' class='text-center textHeadTable' style=''>ภารกิจตามกฎหมายที่จัดตั้งหน่วยงานภาครัฐหรือภารกิจตามแผนการดำเนินการหรือภารกิจอื่น ๆ ที่สำคัญของหน่วยงานภาครัฐ</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable' style=''>วัตถุประสงค์</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable' style=''>ความเสี่ยงที่อาจเกิดขึ้น</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable style=''>กิจกรรมควบคุมภายในที่มีอยู่</th>"
    strHTML += "<th colspan='3' class='text-center textHeadTable'>ความเสี่ยงที่เหลืออยู่</th>"
    strHTML += "<th rowspan='2' class='text-center textHeadTable'>การปรับปรุงการควบคุมภายใน</th>"
    return strHTML
}

function fnSetHeaderSub(){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable'>โอกาส</th>"
    strHTML += "<th class='text-center textHeadTable'>ผลกระทบ</th>"
    strHTML += "<th class='text-center textHeadTable'>ระดับ</th>"
    return strHTML
}
async function fnDrawTableForm(access,valSides) {
    if (access == 'admin') {
        // fnGetDataSelect()
    }
    var strSides = valSides
    var arrSides = [
        {id:1,  key: 'branchpersonal', NameSides: 'ด้านการกำลังพล'},
        {id:2,  key: 'branchoperation',NameSides: 'ด้านการยุทธการ'},
        {id:3,  key: 'branchnews',NameSides: 'ด้านการข่าว'},
        {id:4,  key: 'branchlogistics',NameSides: 'ด้านส่งกำลังบำรุง'},
        {id:5,  key: 'branchcommunication',NameSides: 'ด้านสื่อสาร'},
        {id:6,  key: 'branchtechnology',NameSides: 'ด้านระบบเทคโนโลยีในการบริหารจัดการ'},
        {id:7,  key: 'branchcivilaffairs',NameSides: 'ด้านกิจการพลเรือน'},
        {id:8,  key: 'branchbudget',NameSides: 'ด้านการงบประมาณ'},
        {id:9,  key: 'branchfinanceandacc',NameSides: 'ด้านการเงินและการบัญชี'},
        {id:10, key: 'branchoperation',NameSides: 'ด้านพัสดุและทรัพย์สิน'},
    ];
    var index = arrSides.findIndex(item => item.key === strSides);
    var idSideFix = arrSides[index].id + 1 // บวก 1 เนื่องจากใน database ด้านกำลังพล id เริ่มต้นที่ 2
    
    // Get data selete before create table 
    var strUserId = fnGetCookie("userId") || ''
    var dataPFMEVSQL = await fnGetDataResultPFMEV(strUserId, idSideFix)

    var dataSummary = await fnGetDataResultConPFMEV(strUserId, idSideFix)
    // ตรวจสอบว่า dataSummary มีข้อมูลและไม่เป็น undefined หรือ null
    var prefixAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].prefixAsessor : '';
    var signPath = (dataSummary && dataSummary.length > 0) ? dataSummary[0].signPath : '';
    var position = (dataSummary && dataSummary.length > 0) ? dataSummary[0].position : '';
    var dateAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].dateAsessor : '';

    var strHTML = ''
    var nameUnit = dataSummary[0].nameUnit ? dataSummary[0].nameUnit : ' (ระบุชื่อหน่วยงาน) '
    strHTML += " <div class='title'><span class='unit-label'>หน่วยงาน</span><span id='spanNameUnit' style='width: 232px;' class='underline-dotted' placeholder=' (ระบุหน่วยงาน) '> " + nameUnit + " </span> "
    strHTML += " <button id='btnEditSideName' type='button' class='btn btn-warning btn-sm' onclick='fnEditSidesName(\"" + nameUnit + "\")' data-bs-toggle='modal' data-bs-target='#sideNameModal'> "
    strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true'></i>"
    strHTML += "    </button> "
    strHTML += " </div> "
    strHTML += " <div class='title'>แบบประเมินการควบคุมภายใน</div> "
    strHTML += " <div class='title'>ภารภิจ/โครงการ/กิจกรรม/กระบวนงาน " + arrSides[index].NameSides + " </div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_" + valSides + "'>"
    strHTML += "<thead>"
    strHTML += "<tr class='colspan-header'>"
    strHTML += fnSetHeader() 
    strHTML += "</tr>"
    strHTML += "<tr class='second-header'>"
    strHTML += fnSetHeaderSub() 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += await fnDrawTablePerformance(dataPFMEVSQL, strUserId, idSideFix)
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += await fnDrawCommentDivEvaluation(prefixAsessor,signPath,position,dateAsessor)

    strHTML += " <div class='dvFooterForm'> "
    strHTML += "    <button type='button' class='btn btn-primary' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    // strHTML += "    <button type='button' class='btn btn-success' id='btnExportPDF'>Export PDF</button>"
    strHTML += " </div> "

    $("#dvFormAssessment")[0].innerHTML = strHTML
}

async function fnDrawTablePerformance(objData, strUserId, idSideFix) { /* ด้านการข่าว */
    var strHTML = "";
    var data = objData
    var headRiskCount = {};
    var objRiskCount = {};
    for (var i = 0; i < data.length; i++) {
        if (headRiskCount[data[i].headRisk]) {
            headRiskCount[data[i].headRisk]++;
        } else {
            headRiskCount[data[i].headRisk] = 1;
        }
        if (objRiskCount[data[i].objRisk]) {
            objRiskCount[data[i].objRisk]++;
        } else {
            objRiskCount[data[i].objRisk] = 1;
        }
    }

    var currentHeadRisk = "";
    var currentObjRisk = "";
    for (var i = 0; i < data.length; i++) {
        strHTML += "<tr>"
        if (currentHeadRisk !== data[i].headRisk) {
            currentHeadRisk = data[i].headRisk;
            strHTML += "<td id='headRisk" + (i + 1) + "' rowspan='" + headRiskCount[data[i].headRisk] + "' class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + (data[i].headRisk ? (data[i].headRisk) : '-') + "</td>";
        }
        
        if (currentObjRisk !== data[i].objRisk) {
            currentObjRisk = data[i].objRisk;
            strHTML += "<td id='objRisk" + (i + 1) + "' rowspan='" + objRiskCount[data[i].objRisk] + "' class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + (data[i].objRisk ? (data[i].objRisk) : '-') + "</td>";
        }
        
        strHTML += "<td id='risking" + (i + 1) + "'  class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + (data[i].risking ? (data[i].risking) : '-') + "</td>"
        
        if (data[i].activityControl) {
            strHTML += "<td id='activityControl" + (i + 1) + "'  class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'> "+ data[i].activityControl +" </td>"
        } else {
            strHTML += "<td class='align-top' style=''> "
            strHTML += fnCreateTextAreaAndButton('activityControl' + i)
            strHTML += "</td>"
        }
            // ChanceRisk
            strHTML += "<td class='text-center align-middle' style=''>";
            strHTML += "<div>";
            strHTML += "<span id='spanChanceRisk" + (i + 1) + "'>" + (data[i].chanceRiskScore ? fnConvertToThaiNumeralsAndPoint(data[i].chanceRiskScore) : '-') + "</span>";
            strHTML += "</div>";
            strHTML += "<div>";
            // strHTML += "<button id='btnChanceRisk" + (i + 1) + "' type='button' class='btn btn-warning mt-2' onclick='fnOpenModalAndSetChanceRisk(\"ChanceRisk" +  (i + 1) + "\", \"" + strUserId + "\", \"" + idSideFix + "\")'>";
            strHTML += "<button id='btnChanceRisk" + (i + 1) + "' type='button' class='btn btn-warning mt-2' onclick='fnDrawChanceRiskModal(\"" + data[i].id + "\", \"" + strUserId + "\", \"" + idSideFix + "\",)' data-bs-toggle='modal' data-bs-target='#chanceRiskModal'>";
            strHTML += "<i class='las la-pen' aria-hidden='true'></i>";
            strHTML += "</button>";
            strHTML += "</div>";
            strHTML += "</td>";
            
            // EffectRisk
            strHTML += "<td class='text-center align-middl e' style=''>";
            strHTML += "<div>";
            strHTML += "<span id='spanEffectRisk" + (i + 1) + "'>" + (data[i].effectRiskScore ? fnConvertToThaiNumeralsAndPoint(data[i].effectRiskScore) : '-') + "</span>";
            strHTML += "</div>";
            strHTML += "<div>";
            // strHTML += "<button id='btnEffectRisk" + (i + 1) + "' type='button' class='btn btn-warning mt-2' onclick='fnOpenModalAndSetEffectRisk(\"EffectRisk" +  (i + 1) + "\")'>";
            strHTML += "<button id='btnEffectRisk" + (i + 1) + "' type='button' class='btn btn-warning mt-2' onclick='fnDrawEffectRiskModal(\"" + data[i].id + "\", \"" + strUserId + "\", \"" + idSideFix + "\",)' data-bs-toggle='modal' data-bs-target='#effectRiskModal'>"
            strHTML += "<i class='las la-pen' aria-hidden='true'></i>";
            strHTML += "</button>";
            strHTML += "</div>";
            strHTML += "</td>";

            // RankRisk
    
            strHTML += "<td class='text-center align-middle' style=''> "
            if (data[i].chanceRiskScore && data[i].effectRiskScore) {
                strHTML += fnSetRankRiskFrist(data[i].chanceRiskScore , data[i].effectRiskScore, ( i + 1 ))
            } else {
                strHTML += fnSetRankRiskTable((i + 1))
            }
            strHTML += "</td>"


        if (data[i].improvement) {
            strHTML += "<td id='improvement" + (i + 1) + "'  class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + data[i].improvement + "</td>"
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

async function fnDrawCommentDivEvaluation(prefixAsessor,signPath,position,dateAsessor) {
    
    var strHTML = ''
    strHTML += " <div id='dvSignature' class='dvSignature'> "
    if (prefixAsessor) {
        strHTML += `<div>ผู้ประเมิน: <span style="width: 200px;" class="underline-dotted">${prefixAsessor} <img src="${signPath ? signPath : ''}" alt="ลายเซ็น" /></span></div>`
    } else {
        strHTML += " <div>ชื่อผู้ประเมิน..............................................</div> "
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
    strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span> "
    strHTML += "    </button> "
    strHTML += " </div> "
    return strHTML
}

async function fnDrawChanceRiskModal(strPFM_EVId, strUserId, idSideFix) {
    var strHTML = ""
    var strHTML2 = "" 

    var dataChanceRisk = await fnGetDataResultChanceRisk(strPFM_EVId, strUserId, idSideFix, )
    var frequencyLV1 = dataChanceRisk[0].frequencyLV1 || ''
    var frequencyLV2 = dataChanceRisk[0].frequencyLV2 || ''
    var frequencyLV3 = dataChanceRisk[0].frequencyLV3 || ''
    var frequencyLV4 = dataChanceRisk[0].frequencyLV4 || ''
    var frequencyLV5 = dataChanceRisk[0].frequencyLV5 || ''
    var chanceRiskScore = dataChanceRisk[0].chanceRiskScore || ''

    // strHTML += " <input type='hidden' id='InputChanceRiskHide_" + strPFM_EVId + "' value='"+ (chanceRiskScore ? chanceRiskScore : "") +"'> "
    strHTML += " <table class='table table-bordered'> "
    strHTML += " <thead class='table-dark'> "
    strHTML += " <tr> "
    strHTML += "    <th scope='col' class='text-center'>โอกาส</th> "
    strHTML += "    <th scope='col' class='text-center'>ความถี่</th> "
    strHTML += "    <th scope='col' class='text-center'>คะแนน</th> "
    strHTML += " </tr> "
    strHTML += " </thead> "
    strHTML += " <tbody> "

    strHTML += " <tr> "
    strHTML += "    <td class='text-center' contenteditable='true'>สูงมาก</td> "
    if (frequencyLV5) {
        strHTML += "    <td id='tdFrequencyLV5_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + frequencyLV5 + "</td> "
    } else {
        strHTML += "    <td id='tdFrequencyLV5_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "        <input type='radio' id='inputValChanceRiskLV5_" + strPFM_EVId + "' name='inputValChanceRisk' value='5' " + (chanceRiskScore === '5' ? "checked" : "") + "> 5 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " <tr> "
    strHTML += "    <td class='text-center' contenteditable='true'>สูง</td> "
    if (frequencyLV4) {
        strHTML += "    <td id='tdFrequencyLV4_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + frequencyLV4 + "</td> "
    } else {
        strHTML += "    <td id='tdFrequencyLV4_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "        <input type='radio' id='inputValChanceRiskLV4_" + strPFM_EVId + "' name='inputValChanceRisk' value='4' " + (chanceRiskScore === '4' ? "checked" : "") + "> 4 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " <tr> "
    strHTML += "    <td class='text-center' contenteditable='true'>ปานกลาง</td> "
    if (frequencyLV3) {
        strHTML += "    <td id='tdFrequencyLV3_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + frequencyLV3 + "</td> "
    } else {
        strHTML += "    <td id='tdFrequencyLV3_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "        <input type='radio' id='inputValChanceRiskLV3_" + strPFM_EVId + "' name='inputValChanceRisk' value='3' " + (chanceRiskScore === '3' ? "checked" : "") + "> 3 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " <tr> "
    strHTML += "    <td class='text-center' contenteditable='true'>น้อย</td> "
    if (frequencyLV2) {
        strHTML += "    <td id='tdFrequencyLV2_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + frequencyLV2 + "</td> "
    } else {
        strHTML += "    <td id='tdFrequencyLV2_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "        <input type='radio' id='inputValChanceRiskLV2_" + strPFM_EVId + "' name='inputValChanceRisk' value='2' " + (chanceRiskScore === '2' ? "checked" : "") + "> 2 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " <tr> "
    strHTML += "    <td class='text-center' contenteditable='true'>น้อยมาก</td> "
    if (frequencyLV1) {
        strHTML += "    <td id='tdFrequencyLV1_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + frequencyLV1 + "</td> "
    } else {
        strHTML += "    <td id='tdFrequencyLV1_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "        <input type='radio' id='inputValChanceRiskLV1_" + strPFM_EVId + "' name='inputValChanceRisk' value='1' " + (chanceRiskScore === '1' ? "checked" : "") + "> 1 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " </tbody> "
    strHTML += " </table> "
  


    strHTML2 += " <button type='button' class='btn btn-primary' onclick='fnSaveChanceRiskModal(" + strPFM_EVId + ")'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "

    $("#dvBodyModalChanceRiskModal").html(strHTML)
    $("#dvFooterModalChanceRiskModal").html(strHTML2)
}

async function fnDrawEffectRiskModal(strPFM_EVId, strUserId, idSideFix) {
    var strHTML = ""
    var strHTML2 = ""

    var dataEffectRisk = await fnGetDataResultEffectRisk(strPFM_EVId, strUserId, idSideFix, )
    var damageLV1 = dataEffectRisk[0].damageLV1 || ''
    var damageLV2 = dataEffectRisk[0].damageLV2 || ''
    var damageLV3 = dataEffectRisk[0].damageLV3 || ''
    var damageLV4 = dataEffectRisk[0].damageLV4 || ''
    var damageLV5 = dataEffectRisk[0].damageLV5 || ''
    var effectRiskScore = dataEffectRisk[0].effectRiskScore || ''

    strHTML += " <input type='hidden' id='InputEffectRiskHide_" + strPFM_EVId + "' value='"+ (effectRiskScore ? effectRiskScore : "") +"'> "
    strHTML += " <table class='table table-bordered'> "
    strHTML += " <thead class='table-dark'> "
    strHTML += " <tr> "
    strHTML += "    <th scope='col' class='text-center'>ผลกระทบ</th> "
    strHTML += "    <th scope='col' class='text-center'>ความเสียหาย</th> "
    strHTML += "    <th scope='col' class='text-center'>คะแนน</th> "
    strHTML += " </tr> "
    strHTML += " </thead> "
    strHTML += " <tbody> "
    strHTML += " <tr> "
    strHTML += "    <td class='text-center'>สูงมาก</td> "
    if (damageLV5) {
        strHTML += "    <td id='tdDamageLV5_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + damageLV5 + "</td> "
    } else {
        strHTML += "    <td id='tdDamageLV5_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "    <input type='radio' id='inputValEffectRisk5_" + strPFM_EVId + "'  name='inputValEffectRisk' value='5' " + (effectRiskScore === '5' ? "checked" : "") + "> 5 ";
    strHTML += "    </td> "
    strHTML += " </tr> "
    strHTML += " <tr> "
    strHTML += "     <td class='text-center'>สูง</td> "
    if (damageLV4) {
        strHTML += "    <td id='tdDamageLV4_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + damageLV4 + "</td> "
    } else {
        strHTML += "    <td id='tdDamageLV4_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "    <input type='radio' id='inputValEffectRisk4_" + strPFM_EVId + "'  name='inputValEffectRisk' value='4' " + (effectRiskScore === '4' ? "checked" : "") + "> 4 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " <tr> "
    strHTML += "    <td class='text-center'>ปานกลาง</td> "
    if (damageLV3) {
        strHTML += "    <td id='tdDamageLV3_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + damageLV3 + "</td> "
    } else {
        strHTML += "    <td id='tdDamageLV3_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "    <input type='radio' id='inputValEffectRisk3_" + strPFM_EVId + "'  name='inputValEffectRisk' value='3' " + (effectRiskScore === '3' ? "checked" : "") + "> 3 ";
    strHTML += "    </td> "
    strHTML += " </tr> "
    strHTML += " <tr> "
    strHTML += "    <td class='text-center'>น้อย</td> "
    if (damageLV2) {
        strHTML += "    <td id='tdDamageLV2_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + damageLV2 + "</td> "
    } else {
        strHTML += "    <td id='tdDamageLV2_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "    <input type='radio' id='inputValEffectRisk2_" + strPFM_EVId + "'  name='inputValEffectRisk' value='2' " + (effectRiskScore === '2' ? "checked" : "") + "> 2 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " <tr> "
    strHTML += "    <td class='text-center'>น้อยมาก</td> "
    if (damageLV1) {
        strHTML += "    <td id='tdDamageLV1_" + strPFM_EVId + "' class='text-center' contenteditable='true'>" + damageLV1 + "</td> "
    } else {
        strHTML += "    <td id='tdDamageLV1_" + strPFM_EVId + "' class='text-center' contenteditable='true'>ระบุ</td> "
    }
    strHTML += "    <td class='text-center'> "
    strHTML += "    <input type='radio' id='inputValEffectRisk1_" + strPFM_EVId + "'  name='inputValEffectRisk' value='1' " + (effectRiskScore === '1' ? "checked" : "") + "> 1 ";
    strHTML += "    </td> "
    strHTML += " </tr> "

    strHTML += " </tbody> "
    strHTML += " </table> "

    strHTML2 += " <button type='button' class='btn btn-primary' onclick='fnSaveEffectRiskModal(" + strPFM_EVId + ")'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "


    $("#dvBodyModalEffectRiskModal").html(strHTML)
    $("#dvFooterModalEffectRiskModal").html(strHTML2)
}

function fnCreateTextAreaAndButton(id) {
    var strHTML = ''
        strHTML += " <div> "
        strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='5' cols='10' style='width: 100%;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(\"" + id + "\")'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div style='text-indent: 17px;'> "
        strHTML += " <span class='text-left' id='displayText" + id + "' style='white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIcon"+ id +"' style='display:none; cursor:pointer; margin-left: 10px;' onclick='fnEditText(\"" + id + "\")'></i> "
        strHTML += " </div> "

    return strHTML
}

async function fnGetDataResultPFMEV(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultPFMEV', dataSend)
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

async function fnGetDataResultConPFMEV(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultConPFMEV', dataSend)
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

async function fnGetDataResultChanceRisk(PFM_EVId, userId, sideId) {
    var dataSend = {
        PFM_EVId: PFM_EVId,
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultChanceRisk', dataSend)
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

async function fnGetDataResultEffectRisk(PFM_EVId, userId, sideId) {
    var dataSend = {
        PFM_EVId: PFM_EVId,
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post('http://localhost:3000/api/documents/fnGetResultEffectRisk', dataSend)
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

// function fnOpenModalAndSetChanceRisk(val) {
//     $('#InputChanceRiskHide').val(val);
//     // เซ็ตข้อมูลใน Modal หรือทำอย่างอื่นตามที่ต้องการ
//     $('#chanceRiskModal').modal('show');  
// }

// function fnOpenModalAndSetEffectRisk(val) {
//     $('#InputEffectRiskHide').val(val);
//     // เซ็ตข้อมูลใน Modal หรือทำอย่างอื่นตามที่ต้องการ
//     $('#effectRiskModal').modal('show');  
// }

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
        inputChanceRisk = fnConvertToArabicNumerals($('#spanChanceRisk' + index).text()) || ''
        inputEffectRisk = fnConvertToArabicNumerals($('#spanEffectRisk' + index).text()) || ''
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

function fnSaveChanceRiskModal(strPFM_EVId) {
    // ตรวจสอบว่ามี input แบบ radio ที่ถูกเลือกหรือไม่
    var strFrequencyLV1 = $('#tdfrequencyLV1_' + strPFM_EVId).text() || ''
    var strFrequencyLV2 = $('#tdfrequencyLV2_' + strPFM_EVId).text() || ''
    var strFrequencyLV3 = $('#tdfrequencyLV3_' + strPFM_EVId).text() || ''
    var strFrequencyLV4 = $('#tdfrequencyLV4_' + strPFM_EVId).text() || ''
    var strFrequencyLV5 = $('#tdfrequencyLV5_' + strPFM_EVId).text() || ''
    var strDisplayText = ''

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
                    strDisplayText = $('#spanChanceRisk' + strPFM_EVId);
                
                    strDisplayText.html(fnConvertToThaiNumeralsAndPoint(strCheckedValue)) // add value
                    
                    /* ซ่อนปุ่ม */
                    strDisplayText.css('display', 'block');
                    
                    fnSetRankRiskTable(strPFM_EVId) // call function

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

function fnSaveEffectRiskModal(strPFM_EVId) {
    // ตรวจสอบว่ามี input แบบ radio ที่ถูกเลือกหรือไม่
    var strDamageLV1 = $('#tdDamageLV1_' + strPFM_EVId).text() || ''
    var strDamageLV2 = $('#tdDamageLV2_' + strPFM_EVId).text() || ''
    var strDamageLV3 = $('#tdDamageLV3_' + strPFM_EVId).text() || ''
    var strDamageLV4 = $('#tdDamageLV4_' + strPFM_EVId).text() || ''
    var strDamageLV5 = $('#tdDamageLV5_' + strPFM_EVId).text() || ''

    var strDisplayText = ''

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
                    strDisplayText = $('#spanEffectRisk' + strPFM_EVId);
                
                    strDisplayText.html(fnConvertToThaiNumeralsAndPoint(strCheckedValue)) // add value
                    
                    /* ซ่อนปุ่ม */
                    strDisplayText.css('display', 'block');

                    fnSetRankRiskTable(strPFM_EVId)

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

function fnSetRankRiskFrist (chanceRiskScore, effectRiskScore, index) {
    var strHTML = ''
    var connvertChanceRisk = ''
    var connvertEffectRisk = ''
    var SumResults = ''
    var riskLevel = ''
    var riskMatrix = [
        ['ต่ำ',      'ต่ำ',      'ต่ำ',      'ปานกลาง', 'ปานกลาง'],
        ['ต่ำ',      'ต่ำ',      'ปานกลาง', 'ปานกลาง', 'สูง'],
        ['ต่ำ',      'ปานกลาง', 'ปานกลาง', 'สูง',      'สูง'],
        ['ปานกลาง', 'ปานกลาง', 'สูง',      'สูงมาก',   'สูงมาก'],
        ['ปานกลาง', 'สูง',      'สูง',      'สูงมาก',   'สูงมาก']
    ];

    if (chanceRiskScore && effectRiskScore) {
        connvertChanceRisk = fnStringToInt(chanceRiskScore)
        connvertEffectRisk = fnStringToInt(effectRiskScore)
        SumResults = connvertChanceRisk * connvertEffectRisk
        riskLevel = riskMatrix[connvertEffectRisk - 1][connvertChanceRisk - 1];
    
        strHTML += "<div>"
        strHTML += "<span id='spanRankRisk" + index + "'>" + fnConvertToThaiNumeralsAndPoint(SumResults) + "</span>"
        strHTML += "</div>";
        strHTML += "<div>"
        strHTML += "<span id='spanDesRankRisk" + index + "'> (" + riskLevel + ") </span>"
        strHTML += "</div>";
        strHTML += "<div>";
        strHTML += "<button id='btnMatrixRank" + index  + "' type='button' class='btn btn-primary mt-2' onclick='fnOpenModalAndSetRankRisk(\"" + index + "\")'>"
        strHTML += "<i class='las la-search' aria-hidden='true'></i>"
        strHTML += "</button>"
        strHTML += "</div>"
    }
    return strHTML

}
function fnSetRankRiskTable (index) {
    var strHTML = ''
    // var lastPositionText =  ''
    // var inputChanceRisk = ''
    // var inputEffectRisk = ''
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

    // inputChanceRisk = $('#InputChanceRiskHide_' + index)
    // inputEffectRisk = $('#InputEffectRiskHide_' + index)

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

    // if (connvertChanceRisk) {
    //     inputChanceRisk.val(connvertChanceRisk)
    // }
    // if (connvertEffectRisk) {
    //     inputEffectRisk.val(connvertEffectRisk)
    // }

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
    strHTML += " <label for='evaluator'>ผู้ประเมิน (เซ็นชื่อ)</label> "
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
            <div>ผู้ประเมิน: <span style="width: 200px;" class="underline-dotted">${prefixAsessor} <img src="${signPath}" alt="ลายเซ็น" /></span></div>
            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
        `;

        resultContainer.innerHTML = strHTML;
        $('#signatureModal').modal('hide');
    }
}
/* end ส่วนของลายเซ็นฯ */


/* start ส่วนแก้ชื่อหน่วยงาน*/

function fnEditSidesName (nameUnit) {
    var strHTML = ''
    var strHTML2 = ''
        // draw modal    
        strHTML += " <div class='form-group'> "
        strHTML += " <label for='inputNameSides'>ชื่อหน่วยงาน</label> "
        strHTML += " <input type='text' id='inputNameSides' class='form-control' placeholder='กรอกชื่อหน่วยงาน' value='" + (nameUnit || '') + "'> "
        strHTML += " <div id='nameSidesError' class='error'>กรุณาใส่หน่วยงาน</div> "
 
        strHTML2 += " <button type='button' id='submitSideNameButton' class='btn btn-primary'>บันทึกข้อมูล</button> "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "
       
        $("#dvBodySideNameModal")[0].innerHTML = strHTML
        $("#dvFooterSideNameModal")[0].innerHTML = strHTML2      

        document.getElementById('submitSideNameButton').addEventListener('click', fnSubmitSideName);
 }

 function fnSubmitSideName () {
    if (fnValidateNameUnitForm()) {
        const strNameUnit = document.getElementById('spanNameUnit')
        const inputNameSides = document.getElementById('inputNameSides').value;

        strNameUnit.innerText = inputNameSides;
        $('#sideNameModal').modal('hide');
    
    }

 }

 function fnValidateNameUnitForm() {
    let isValid = true;

    // Validate evaluator text
    const inputNameSides = document.getElementById('inputNameSides').value;
    if (!inputNameSides) {
        document.getElementById('nameSidesError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameSidesError').style.display = 'none';
    }

    return isValid;
}

/* end ส่วนแก้ชื่อหน่วยงาน*/




