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
    var strUserId = ""

    if (access === 'admin') {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        strUserId = urlParams.get('userId')
    } else {
        strUserId = fnGetCookie("userId");
    }
    var strSides = valSides.toLowerCase()
    var arrSides = [
        {id:2,  key: 'branchpersonal', NameSides: 'ด้านกำลังพล',value: 4 },
        {id:3,  key: 'branchoperation',NameSides: 'ด้านการยุทธการ', value: 3 },
        {id:4,  key: 'branchnews',NameSides: 'ด้านการข่าว', value: 7 },
        {id:5,  key: 'branchlogistics',NameSides: 'ด้านส่งกำลังบำรุง', value: 7 },
        {id:6,  key: 'branchcommunication',NameSides: 'ด้านสื่อสาร', value: 5 },
        {id:7,  key: 'branchtechnology',NameSides: 'ด้านระบบเทคโนโลยีในการบริหารจัดการ', value: 3 },
        {id:8,  key: 'branchcivilaffairs',NameSides: 'ด้านกิจการพลเรือน', value: 4 },
        {id:9,  key: 'branchbudget',NameSides: 'ด้านการงบประมาณ', value: 6 },
        {id:10,  key: 'branchfinanceandacc',NameSides: 'ด้านการเงินและการบัญชี', value: 6 },
        {id:11,  key: 'branchparcelsandproperty',NameSides: 'ด้านพัสดุและทรัพย์สิน', value: 8 },
    ];
    var index = arrSides.findIndex(item => item.key === strSides.toLowerCase());

    var selectedSide;
    if (index !== -1) {
        selectedSide = arrSides[index]; // ใช้ค่า object ที่พบ
    } else {
        selectedSide = {id:11, key: 'branchparcelsandproperty', NameSides: 'ด้านพัสดุและทรัพย์สิน', value: 8 };
    }
    
    var idSideFix = selectedSide.id; // ใช้ id ของ object ที่เลือก
    
    // Get data selete before create table 
    var dataPFMEVSQL = await fnGetDataResultPFMEV(strUserId, idSideFix)
    var dataSummary = await fnGetDataResultConPFMEV(strUserId, idSideFix)
    var strResultDocSQL = await fnGetDataResultDoc(strUserId, idSideFix)
    console.log(strResultDocSQL[0].id)

    // ตรวจสอบว่า dataSummary มีข้อมูลและไม่เป็น undefined หรือ null
    var idConPFM = (dataSummary && dataSummary.length > 0) ? dataSummary[0].id : '';
    var prefixAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].prefixAsessor : '';
    var signPath = (dataSummary && dataSummary.length > 0) ? dataSummary[0].signPath : '';
    var position = (dataSummary && dataSummary.length > 0) ? dataSummary[0].position : '';
    var dateAsessor = (dataSummary && dataSummary.length > 0) ? dataSummary[0].dateAsessor : '';

    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    var strHTML = ''
    var nameUnit = (dataSummary && dataSummary.length > 0 && dataSummary[0].nameUnit) ? dataSummary[0].nameUnit : ' (ระบุชื่อหน่วยงาน) ';
    strHTML += " <div class='title' style='margin-top: 20px;'> " 
    strHTML += " <input type='hidden' id='inputIdConPFM' name='inputIdConPFM' value='" + idConPFM + "'>  "
    strHTML += " <span class='unit-label'>หน่วยงาน</span><span id='spanNameUnit' style='width: 232px;' class='underline-dotted'>" + fnCheckFalsy(nameUnit) + "</span> "
    
    if (access !== 'admin') {
        strHTML += " <button id='btnEditSideName' type='button' class='btn btn-warning btn-sm' onclick='fnEditSidesName(\"" + fnCheckFalsy(nameUnit) + "\", \"" + strUserId + "\", \"" + idSideFix + "\")' data-bs-toggle='modal' data-bs-target='#sideNameModal'> "
        strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true'></i>"
        strHTML += " </button> "
    }

    strHTML += " </div> "
    strHTML += " <div class='title'>แบบประเมินการควบคุมภายใน</div> "
    strHTML += " <div class='title'>ภารภิจ/โครงการ/กิจกรรม/กระบวนงาน " + selectedSide.NameSides + " </div> "
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
    if (dataPFMEVSQL.length > 0) {
        strHTML += await fnDrawTablePerformance(dataPFMEVSQL, strUserId, idSideFix)
    } else { // ไม่มีข้อมูล
        strHTML += "<tr>";
        strHTML += `<td colspan='8' class='text-center align-top' style='width: 100%;'>`;
        strHTML += ` <span id='spanNotHaveData'>ไม่มีแบบประเมินการควบคุมภายใน</span> `;
        strHTML += "<tr>";
    }
    strHTML += "</tbody>"
    strHTML += "</table>"

    strHTML += await fnDrawCommentDivEvaluation(prefixAsessor, signPath, position, dateAsessor, strUserId, idSideFix, access)

    strHTML += " <div class='dvFooterForm'> "
    if (access !== 'admin' && dataPFMEVSQL.length > 0) {
        strHTML += "    <button type='button' class='btn btn-success' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    }
    strHTML += " </div> "

    $("#dvFormAssessment")[0].innerHTML = strHTML
    if (access !== 'admin' && dataPFMEVSQL.length > 0) {
        fnAddSaveButtonEventListener(dataPFMEVSQL, strUserId, idSideFix, strUserDocId)
    }
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
        if (data[i].idQR) {
            strHTML += " <input type='hidden' id='inputIdQR" + data[i].id + "' name='inputIdQR' value='" + data[i].idQR + "'>  "
            strHTML += " <input type='hidden' id='inputHeadRisk" + data[i].id + "' name='inputHeadRisk' value='" + data[i].headRisk + "'>  " // สร้างแยกเพราะต้องเอา value ไปใช้ต่อ
            // strHTML += " <input type='hidden' id='inputObjRisk" + data[i].id + "' name='inputObjRisk' value='" + data[i].objRisk + "'>  " // สร้างแยกเพราะต้องเอา value ไปใช้ต่อ
            strHTML += "<div id='inputObjRisk" + data[i].id + "' style='display:none;'>" + data[i].objRisk + "</div>"
        }

        // headRisk
        if (currentHeadRisk !== data[i].headRisk) {
            currentHeadRisk = data[i].headRisk;
            strHTML += "<td id='headRisk" + data[i].id + "' rowspan='" + headRiskCount[data[i].headRisk] + "' class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + (data[i].headRisk ? (data[i].headRisk) : '-') + "</td>";
        }

        // objRisk
        if (currentObjRisk !== data[i].objRisk) {
            currentObjRisk = data[i].objRisk;
            strHTML += "<td id='objRisk" + data[i].id + "' rowspan='" + objRiskCount[data[i].objRisk] + "' class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + (data[i].objRisk ? (data[i].objRisk) : '-') + "</td>";
        }

        // risking
        strHTML += "<td id='risking" + data[i].id + "'  class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + (data[i].risking ? (data[i].risking) : '-') + "</td>"
        
        // activityControl
        strHTML += "<td class='align-top' style=''> "
        strHTML += fnCreateTextAreaAndButton('ActivityControl' + data[i].id, data[i].activityControl)
        strHTML += "</td>"
        
        // ChanceRisk
        strHTML += "<td class='text-center align-middle' style=''>";
        strHTML += "<span id='spanChanceRisk" + data[i].id + "'>" + (data[i].chanceRiskScore ? fnConvertToThaiNumeralsAndPoint(data[i].chanceRiskScore) : '') + "</span>";

        // strHTML += "<button id='btnChanceRisk" + data[i].id + "' type='button' class='btn btn-warning mt-2' onclick='fnOpenModalAndSetChanceRisk(\"ChanceRisk" +  data[i].id + "\", \"" + strUserId + "\", \"" + idSideFix + "\")'>";
        strHTML += "<button id='btnChanceRisk" + data[i].id + "' type='button' class='btn btn-warning mt-2' onclick='fnDrawChanceRiskModal(\"" + data[i].id + "\", \"" + strUserId + "\", \"" + idSideFix + "\",)' data-bs-toggle='modal' data-bs-target='#chanceRiskModal'>";
        strHTML += "<i class='las la-pen' aria-hidden='true'></i>";
        strHTML += "</button>";
        strHTML += "</td>";
        
        // EffectRisk
        strHTML += "<td class='text-center align-middle' style=''>";
        strHTML += "<span id='spanEffectRisk" + data[i].id + "'>" + (data[i].effectRiskScore ? fnConvertToThaiNumeralsAndPoint(data[i].effectRiskScore) : '') + "</span>";
        // strHTML += "<button id='btnEffectRisk" + data[i].id + "' type='button' class='btn btn-warning mt-2' onclick='fnOpenModalAndSetEffectRisk(\"EffectRisk" +  data[i].id + "\")'>";
        strHTML += "<button id='btnEffectRisk" + data[i].id + "' type='button' class='btn btn-warning mt-2' onclick='fnDrawEffectRiskModal(\"" + data[i].id + "\", \"" + strUserId + "\", \"" + idSideFix + "\",)' data-bs-toggle='modal' data-bs-target='#effectRiskModal'>"
        strHTML += "<i class='las la-pen' aria-hidden='true'></i>";
        strHTML += "</button>";
        strHTML += "</td>";

        // RankRisk
        strHTML += "<td class='text-center align-middle' style=''> "
        if (data[i].chanceRiskScore && data[i].effectRiskScore) {
            strHTML += fnSetRankRiskFrist(data[i].id, data[i].chanceRiskScore , data[i].effectRiskScore)
        } else {
            strHTML += fnSetRankRiskTable(data[i].id)
        }
        strHTML += "</td>"

        // improvement
        // แก้วันที่ 24/11/2024 (แก้ตามหัวหน้าเสก)
        // strHTML += "<td class='align-top' style=''> "
        // strHTML += fnCreateTextAreaAndButton('ImprovementControl' + data[i].id, data[i].improvementControl)
        // strHTML += "</td>"
        strHTML += "<td id='improvementControl" + data[i].id + "'  class='text-left align-top' style='text-indent: 17px; white-space: pre-wrap;'>" + (data[i].improvementControl ? (data[i].improvementControl) : '-') + "</td>"
    
        strHTML += "</tr>"
    }

    return strHTML;
    
    // แทรกโค้ดเข้าไปใน #dvTableReportAssessment
    // $("#dvTableReportAssessment")[0].innerHTML = strHTML;
}

async function fnDrawCommentDivEvaluation(prefixAsessor, signPath, position, dateAsessor, strUserId, idSideFix, access) {
    var strHTML = ''
    var strUpload = 'Upload'
    var strEpen = 'Epen'

    strHTML += "  <input type='hidden' id='inputPrefixAsessor' name='inputPrefixAsessor' value='" + fnCheckFalsy(prefixAsessor) + "'>"
    strHTML += "  <input type='hidden' id='inputSignPath' name='inputSignPath' value='" + fnCheckFalsy(signPath) + "'>"

    strHTML += " <div class='form-group'> ";
    strHTML += " <input type='hidden' id='inputIdUsers' class='form-control' value='" + strUserId + "' > "
    strHTML += " <input type='hidden' id='inputIdSides' class='form-control' value='" + idSideFix + "' > "
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
        strHTML += ` <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${position}</span></div>`
    } else {
        strHTML += ` <div>ตำแหน่ง <span style="width: 211px;text-align: left;" class="underline-dotted">:</span></div> `
    }

    if (dateAsessor) {
        strHTML += `<div>วันที่: <span style="width: 232px;" class="underline-dotted">${fnFormatDateToThai(dateAsessor)}</span></div>`
    } else {
        strHTML += `<div>วันที่ <span style="width: 237px;text-align: left;" class="underline-dotted">:</span></div>`
    }
    strHTML += " </div> "

    if (access !== 'admin') { // ถ้าเป็น admin
        strHTML += " <div id='dv-btn-Signature' class='dv-btn-Signature' > "
        strHTML += "    <button id='btnEditSignature' type='button' class='btn btn-warning btn-sm' onclick='fnDrawModalAssessor(\"" + prefixAsessor + "\", \"" + position + "\", \"" + dateAsessor + "\")' data-bs-toggle='modal' data-bs-target='#assessorModal'> "
        strHTML += "    <i class='las la-pen mr-1' aria-hidden=;'true' style='margin-right:5px'></i><span>กรอกข้อมูลผู้ประเมิน<span> "
        strHTML += "    </button> "
        strHTML += " </div> "
    }

    return strHTML
}

async function fnDrawChanceRiskModal(strPFM_EVId, strUserId, idSideFix) {
    var strHTML = ""
    var strHTML2 = "" 

    var dataChanceRisk = await fnGetDataResultChanceRisk(strPFM_EVId, strUserId, idSideFix)
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
  


    strHTML2 += " <button type='button' class='btn btn-primary' onclick='fnSaveChanceRiskModal(\"" + strPFM_EVId + "\", \"" + strUserId + "\", \"" + idSideFix + "\")'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "

    $("#dvBodyModalChanceRiskModal").html(strHTML)
    $("#dvFooterModalChanceRiskModal").html(strHTML2)
}

async function fnDrawEffectRiskModal(strPFM_EVId, strUserId, idSideFix) {
    var strHTML = ""
    var strHTML2 = ""

    var dataEffectRisk = await fnGetDataResultEffectRisk(strPFM_EVId, strUserId, idSideFix)
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

    strHTML2 += " <button type='button' class='btn btn-primary' onclick='fnSaveEffectRiskModal(\"" + strPFM_EVId + "\", \"" + strUserId + "\", \"" + idSideFix + "\")'>บันทึกข้อมูล</button> "
    strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "


    $("#dvBodyModalEffectRiskModal").html(strHTML)
    $("#dvFooterModalEffectRiskModal").html(strHTML2)
}

function fnCreateTextAreaAndButton(id, description) {
    var strHTML = ''
    if (description) {
        strHTML += " <div> "
        strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='5' cols='10' style='display:none; width: 100%;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + id + "' style='display:none;' onclick='fnSubmitText(\"" + id + "\")'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div style='text-indent: 17px;'> "
        strHTML += " <span class='text-left' id='displayText" + id + "' style='white-space: pre-wrap;'>" + description + "</span> "
        strHTML += " <i class='las la-pencil-alt' id='editIcon"+ id +"' style='cursor:pointer;' onclick='fnEditText(\"" + id + "\")'></i> "
        strHTML += " </div> "
    } else { 
        strHTML += " <div> "
        strHTML += " <textarea id='comment_" + id + "' name='comment_" + id + "' rows='5' cols='10' style='width: 100%;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + id + "' onclick='fnSubmitText(\"" + id + "\")'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div style='text-indent: 17px;'> "
        strHTML += " <span class='text-left' id='displayText" + id + "' style='white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIcon"+ id +"' style='display:none; cursor:pointer;' onclick='fnEditText(\"" + id + "\")'></i> "
        strHTML += " </div> "
    }


    return strHTML
}

async function fnGetDataResultDoc(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId,
        formId: '4'
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultDoc', dataSend)
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

async function fnGetDataResultPFMEV(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultPFMEV', dataSend)
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

async function fnGetDataResultConPFMEV(userId, sideId) {
    var dataSend = {
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultConPFMEV', dataSend)
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

async function fnGetDataResultChanceRisk(PFM_EVId, userId, sideId) {
    var dataSend = {
        PFM_EVId: PFM_EVId,
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultChanceRisk', dataSend)
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

async function fnGetDataResultEffectRisk(PFM_EVId, userId, sideId) {
    var dataSend = {
        PFM_EVId: PFM_EVId,
        userId: userId,
        sideId: sideId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultEffectRisk', dataSend)
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
            fnDrawTableMatrix(inputEffectRisk, inputChanceRisk, index)
            $('#MatrixRankModal').modal('show');  
        } else {
            if (!inputChanceRisk) {
                Swal.fire({
                    title: "",
                    text: "กรุณากรอกคะแนนโอกาสความเสี่ยงที่เหลืออยู่",
                    icon: "warning"
                });
            } else if (!inputEffectRisk) {
                Swal.fire({
                    title: "",
                    text: "กรุณากรอกคะแนนผลกระทบความเสี่ยงที่เหลืออยู่",
                    icon: "warning"
                });
            }
        }
    }
   
    
    
}

function fnSaveChanceRiskModal(strPFM_EVId, strUserId, idSideFix) {
    // ตรวจสอบว่ามี input แบบ radio ที่ถูกเลือกหรือไม่
    var strUserName = fnGetCookie("username");
    var strFrequencyLV1 = $('#tdFrequencyLV1_' + strPFM_EVId).text();
    var strFrequencyLV2 = $('#tdFrequencyLV2_' + strPFM_EVId).text();
    var strFrequencyLV3 = $('#tdFrequencyLV3_' + strPFM_EVId).text();
    var strFrequencyLV4 = $('#tdFrequencyLV4_' + strPFM_EVId).text();
    var strFrequencyLV5 = $('#tdFrequencyLV5_' + strPFM_EVId).text();

    var strDisplayText = ''

    // ตรวจสอบว่าค่า strFrequencyLV1 ถึง strFrequencyLV5 เป็นค่าว่างหรือไม่
    if ((strFrequencyLV1 && strFrequencyLV1 !== 'ระบุ') && 
        (strFrequencyLV2 && strFrequencyLV2 !== 'ระบุ') && 
        (strFrequencyLV3 && strFrequencyLV3 !== 'ระบุ') && 
        (strFrequencyLV4 && strFrequencyLV4 !== 'ระบุ') && 
        (strFrequencyLV5 && strFrequencyLV5 !== 'ระบุ')) {

        if ($('input[name="inputValChanceRisk"]').is(':checked')) {
            // ดึงค่าที่ถูกเลือกมาเก็บไว้ในตัวแปร checkedValue
            var strIdQR = $('#inputIdQR' + strPFM_EVId).val()
            var strConvertEffectRisk = fnConvertToArabicNumerals($('#spanEffectRisk'+ strPFM_EVId).text())
            var strEffectRisk = fnStringToInt(strConvertEffectRisk)
            var strCheckedValue = fnStringToInt($('input[name="inputValChanceRisk"]:checked').val()) // = spanEffectRisk
            var strSumResult  = (strEffectRisk && strCheckedValue) ? (strEffectRisk * strCheckedValue) : ''
            var strHeadRisk = $('#inputHeadRisk' + strPFM_EVId).val()
            var strObjRisk = $('#inputObjRisk' + strPFM_EVId).html()
            var strRisking = $('#risking' + strPFM_EVId).text()
            var strActControl = $('#displayTextActivityControl' + strPFM_EVId).text()
            var strImpControl = $('#improvementControl' + strPFM_EVId).text()
            console.log(strCheckedValue)
            if (strCheckedValue) {
                var dataSend = {
                    idPFM: strPFM_EVId,
                    idQR: strIdQR,
                    userId: strUserId,
                    sideId: idSideFix,
                    username: strUserName,
                    type: 'chanceRisk',
                    frequencyLV1: strFrequencyLV1,
                    frequencyLV2: strFrequencyLV2,
                    frequencyLV3: strFrequencyLV3,
                    frequencyLV4: strFrequencyLV4,
                    frequencyLV5: strFrequencyLV5,
                    chanceRiskScore: strCheckedValue,
                    effectRiskScore: strEffectRisk,
                    rankRiskScore: strSumResult,
                    headRisk: strHeadRisk,
                    objRisk: strObjRisk,
                    risking: strRisking,
                    activityControl: strActControl,
                    improvementControl: strImpControl
                }
        
                console.log(dataSend);
    
                Swal.fire({
                    title: "",
                    text: "คุณต้องการบันทึกใช่หรือไม่?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "บันทึกข้อมูล",
                    cancelButtonText: "ยกเลิก"
                }).then(async (result) => {  // เพิ่ม async ในการประกาศฟังก์ชันภายใน then
                    if (result.isConfirmed) {
                        try {
                            const results = await fnSetDataChanceRiskModal(dataSend);
                            if (results && results === 'success') {
                                strDisplayText = $('#spanChanceRisk' + strPFM_EVId);

                                strDisplayText.text(fnConvertToThaiNumeralsAndPoint(strCheckedValue)); // add value
                                
                                /* ซ่อนปุ่ม */
                                // strDisplayText.css('display', 'block');
                                
                                fnSetRankRiskTable(strPFM_EVId, strUserId, idSideFix); // call function
                                
                                $('#chanceRiskModal').modal('hide'); 
                                
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
                            Swal.fire({
                                title: "",
                                text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
                                icon: "error"
                            });
                        }
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

    } else {
        Swal.fire({
            title: "",
            text: "กรุณาระบุความถี่ให้ครบถ้วน",
            icon: "warning"
        });
        return; // ออกจากฟังก์ชันทันทีถ้าค่าทั้งหมดว่าง
    }
}

function fnSaveEffectRiskModal(strPFM_EVId, strUserId, idSideFix) {
    // ตรวจสอบว่ามี input แบบ radio ที่ถูกเลือกหรือไม่
    var strUserName = fnGetCookie("username");
    var strDamageLV1 = $('#tdDamageLV1_' + strPFM_EVId).text();
    var strDamageLV2 = $('#tdDamageLV2_' + strPFM_EVId).text();
    var strDamageLV3 = $('#tdDamageLV3_' + strPFM_EVId).text();
    var strDamageLV4 = $('#tdDamageLV4_' + strPFM_EVId).text();
    var strDamageLV5 = $('#tdDamageLV5_' + strPFM_EVId).text();

    var strDisplayText = ''

    // ตรวจสอบว่าค่า strDamageLV1 ถึง strDamageLV5 เป็นค่าว่างหรือไม่
    if ((strDamageLV1 && strDamageLV1 !== 'ระบุ') && (strDamageLV2 && strDamageLV2 !== 'ระบุ') && (strDamageLV3 && strDamageLV3 !== 'ระบุ') && (strDamageLV4 && strDamageLV4 !== 'ระบุ') && (strDamageLV5 && strDamageLV5 !== 'ระบุ')) {

        if ($('input[name="inputValEffectRisk"]').is(':checked')) {
            // ดึงค่าที่ถูกเลือกมาเก็บไว้ในตัวแปร checkedValue
            var strIdQR = $('#inputIdQR' + strPFM_EVId).val()
            var strConvertChanceRisk = fnConvertToArabicNumerals($('#spanChanceRisk'+ strPFM_EVId).text())
            var strChanceRisk = fnStringToInt(strConvertChanceRisk)
            var strCheckedValue = fnStringToInt($('input[name="inputValEffectRisk"]:checked').val()) // = spanEffectRisk
            var strSumResult  = (strChanceRisk && strCheckedValue) ? (strChanceRisk * strCheckedValue) : ''
            var strHeadRisk = $('#inputHeadRisk' + strPFM_EVId).val()
            var strObjRisk = $('#inputObjRisk' + strPFM_EVId).html()
            var strRisking = $('#risking' + strPFM_EVId).text()
            var strActControl = $('#displayTextActivityControl' + strPFM_EVId).text()
            var strImpControl = $('#improvementControl' + strPFM_EVId).text()
            if (strCheckedValue) {
                var dataSend = {
                    idPFM: strPFM_EVId,
                    idQR: strIdQR,
                    userId: strUserId,  // หรือใช้ strUserId ถ้ามีการประกาศ
                    sideId: idSideFix,  // ตรวจสอบว่ามีการประกาศ strSideId หรือไม่
                    username: strUserName,
                    type: 'effectRisk',
                    damageLV1: strDamageLV1,
                    damageLV2: strDamageLV2,
                    damageLV3: strDamageLV3,
                    damageLV4: strDamageLV4,
                    damageLV5: strDamageLV5,
                    chanceRiskScore: strChanceRisk,
                    effectRiskScore: strCheckedValue,
                    rankRiskScore: strSumResult,
                    headRisk: strHeadRisk,
                    objRisk: strObjRisk,
                    risking: strRisking,
                    activityControl: strActControl,
                    improvementControl: strImpControl
                };
        
                console.log(dataSend)

                Swal.fire({
                    title: "",
                    text: "คุณต้องการบันทึกใช่หรือไม่?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "บันทึกข้อมูล",
                    cancelButtonText: "ยกเลิก"
                }).then(async (result) => {  // เพิ่ม async ในการประกาศฟังก์ชันภายใน then
                    if (result.isConfirmed) {
                        try {
                            const results = await fnSetDataEffectRiskModal(dataSend)
                            if (results && results == 'success' ) {

                                strDisplayText = $('#spanEffectRisk' + strPFM_EVId);
                    
                                strDisplayText.text(fnConvertToThaiNumeralsAndPoint(strCheckedValue)) // add value
                                
                                /* ซ่อนปุ่ม */
                                // strDisplayText.css('display', 'block');
            
                                fnSetRankRiskTable(strPFM_EVId, strUserId, idSideFix);
            
                                $('#effectRiskModal').modal('hide'); 

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
        } else {
            Swal.fire({
                title: "",
                text: "กรุณาเลือกคะแนนความเสี่ยง",
                icon: "warning"
            });
        }
    } else {
        Swal.fire({
            title: "",
            text: "กรุณาระบุความเสี่ยงให้ครบถ้วน",
            icon: "warning"
        });
        return; // ออกจากฟังก์ชันทันทีถ้าค่าทั้งหมดว่าง
    }
}

function fnSetRankRiskFrist (index, chanceRiskScore, effectRiskScore) {
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
function fnSetRankRiskTable (index, strUserId, idSideFix, isUpdate) {
    var strHTML = ''
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
    // เพิ่ม input ที่ IdQR 
    // จากนั้นก็ get value ต่างมาเพื่อที่จะบันทึกลงในเทเบิ้ล
    // 
    if(connvertChanceRisk && connvertEffectRisk) {
        SumResults = connvertChanceRisk * connvertEffectRisk
        riskLevel = riskMatrix[connvertEffectRisk - 1][connvertChanceRisk - 1];

        replaceSpanRankRisk = $('#spanRankRisk' + index)
        replaceSpanDesRankRisk = $('#spanDesRankRisk' + index)

        replaceSpanRankRisk.text(fnConvertToThaiNumeralsAndPoint(SumResults))
        replaceSpanDesRankRisk.text(`(${riskLevel})`)

    } else {
        strHTML += "<div>"
        strHTML += "<span id='spanRankRisk" + index + "'> </span>"
        strHTML += "</div>";
        strHTML += "<div>"
        strHTML += "<span id='spanDesRankRisk" + index + "'></span>"
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

function fnSaveDraftDocument(data , strUserId, strSideId, strUserDocId, event)  {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    var dataSend = []
    var strIdQR = ''
    var strDisplayTextAC = ''
    var strDisplayTextIM = ''
    var activityControl = ''
    var improvementControl = ''
    var strUserName = fnGetCookie("username");

    // Loop ผ่าน data เพื่อเปรียบเทียบและ push ข้อมูลลงใน dataSend
    data.forEach(formItem => {
        strIdQR = $('#inputIdQR' + formItem.id).val()
        strDisplayTextAC = $('#displayTextActivityControl' + formItem.id).text();
        strDisplayTextIM = $('#improvementControl' + formItem.id).text();
        activityControl = formItem.activityControl === null ? '' : formItem.activityControl;
        // improvementControl = formItem.improvementControl === null ? '' : formItem.improvementControl;
    
        // if ((activityControl !== strDisplayTextAC ) || (improvementControl !== strDisplayTextIM)) { // หาข้อมูลที่มีการแก้ไข
        if (activityControl !== strDisplayTextAC ) {
            dataSend.push({
                idPFM: formItem.id,
                idQR: strIdQR,
                userId: strUserId,  // หรือใช้ strUserId ถ้ามีการประกาศ
                userDocId: strUserDocId,
                sideId: strSideId,  // ตรวจสอบว่ามีการประกาศ strSideId หรือไม่
                username: strUserName,
                activityControl: strDisplayTextAC,
                improvementControl: strDisplayTextIM
            });
        }
    });
    console.log(dataSend)
    if (dataSend && dataSend.length > 0) {
        if (!dataSend[0].activityControl) {
            Swal.fire({
                title: "",
                text: "กรุณากรอกกิจกรรมควบคุมภายในที่มีอยู่",
                icon: "warning"
            });
            return; // ออกจากฟังก์ชันทันทีถ้าค่าทั้งหมดว่าง
        }

        // if (!dataSend[0].improvementControl) {
        //     Swal.fire({
        //         title: "",
        //         text: "กรุณากรอกการปรับปรุงการควบคุมภายใน",
        //         icon: "warning"
        //     });
        //     return; // ออกจากฟังก์ชันทันทีถ้าค่าทั้งหมดว่าง
        // }
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
                    const results = await fnSetDataFormPerformance(dataSend)
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
    } else {
        Swal.fire({
            title: "",
            text: "กรุณากรอกข้อมูลก่อนกดบันทึกฉบับร่าง",
            icon: "warning"
        });
    }
}

function fnAddSaveButtonEventListener(data, strUserId, strSideId, strUserDocId) {
    const saveButton = document.getElementById('btnSaveData');
    if (saveButton) {
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            // โค้ดสำหรับการบันทึกข้อมูล
            fnSaveDraftDocument(data, strUserId, strSideId, strUserDocId, event);
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
        strHTML += " <label for='signatureUpload'>อัปโหลดผู้ประเมิน</label> ";
        strHTML += " <div class='input-group'> "
        strHTML += " <input type='file' id='signatureUpload' class='form-control' accept='.png' aria-describedby='inputSignatureUpload' aria-label='Upload'> ";
        strHTML += " <button class='btn btn-outline-secondary' type='button' id='inputSignatureUpload'>.png</button>"
        strHTML += " </div> ";
        strHTML += " <div id='signatureUploadError' class='error'>กรุณาเลือกไฟล์</div> ";
        strHTML += " </div> ";

        // เพิ่ม canvas สำหรับแสดงผู้ประเมินที่อัปโหลด
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
        strHTML += "     <label for='evaluator'>ผู้ประเมิน (เซ็นชื่อ)</label> ";
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
    const strIdConPFM = $('#inputIdConPFM').val();
    const strPrefixAsessor = $('#inputPrefixAsessor').val();
    const strUserId = $('#inputIdUsers').val();
    const strSideId = $('#inputIdSides').val();
    const strResultDocSQL= await fnGetDataResultDoc(strUserId, strSideId)
    const strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    const strUserName = fnGetCookie("username");

    // Result container to display the signature
    const resultContainer = $('#dvSignature');
    
    const data =  {
        idConPFM: strIdConPFM,
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
                const resultId = await fnSetDataSignaturePFM(data)
                if (resultId) {
                    let strHTML = `
                        <div>ผู้ประเมิน: <span style="width: 197px;" class="underline-dotted">${fnCheckFalsy(strPrefixAsessor)}<img src="${signPath}" alt="ลายเซ็น" /></span></div>
                    `;
        
                    resultContainer.html(strHTML); // Use .html() to set the content
                    
                    $('#inputSignPath').val(signPath) // เพิ่มลายเซ็นไปเก็บไว้ใน input

                    if (!strIdConPFM) { // เช็คว่าถ้า strIdConPFM ยังไม่ข้อมูลในเทเบิ้ล
                        $('#inputIdConPFM').val(resultId)
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
        const strIdConPFM = $('#inputIdConPFM').val();
        const strUserId = $('#inputIdUsers').val();
        const strUserName = fnGetCookie("username");
        const strSideId = $('#inputIdSides').val();
        var strResultDocSQL= await fnGetDataResultDoc(strUserId, strSideId)
        var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';
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
            idConPFM: strIdConPFM,
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
                    const resultId = await fnSetDataAssessorPFM(data)
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
                        if (!strIdConPFM) { // เช็คว่าถ้า strIdConPFM ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConPFM').val(resultId)
                        }

                        strHTML2 += `
                            <div>ตำแหน่ง: <span style="width: 205px;" class="underline-dotted">${positionText}</span></div>
                            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
                        `;
            
                        resultDivAssesor.html(strHTML2); // Use .html() to set the content
                
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
/* end ส่วนของลายเซ็นฯ */


/* start ส่วนแก้ชื่อหน่วยงาน*/

function fnEditSidesName (nameUnit, strUserId, idSideFix) {
    var strHTML = ''
    var strHTML2 = ''
        // draw modal    
        strHTML += " <div class='form-group'> "
        strHTML += " <input type='hidden' id='inputSideIdUsers' class='form-control' value='" + strUserId + "' > "
        strHTML += " <input type='hidden' id='inputSideIdSides' class='form-control' value='" + idSideFix + "' > "
        strHTML += " <label for='inputNameSides'>ชื่อหน่วยงาน</label> "
        strHTML += " <input type='text' id='inputNameSides' class='form-control' placeholder='กรอกชื่อหน่วยงาน' value='" + (nameUnit || '') + "'> "
        strHTML += " <div id='nameSidesError' class='error'>กรุณาใส่หน่วยงาน</div> "
 
        strHTML2 += " <button type='button' id='submitSideNameButton' class='btn btn-primary'>บันทึกข้อมูล</button> "
        strHTML2 += " <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>ยกเลิก</button> "
       
        $("#dvBodySideNameModal")[0].innerHTML = strHTML
        $("#dvFooterSideNameModal")[0].innerHTML = strHTML2      

        $('#submitSideNameButton').on('click', fnSubmitSideName);
 }

async function fnSubmitSideName () {
    if (fnValidateNameUnitForm()) {
        const strIdConPFM = $('#inputIdConPFM').val();
        const strUserId = $('#inputSideIdUsers').val();
        const strSideId = $('#inputSideIdSides').val();
        const strUserName = fnGetCookie("username");
        var strResultDocSQL= await fnGetDataResultDoc(strUserId, strSideId)
        var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

        const strNameUnit = $('#spanNameUnit');
        const inputNameSides = $('#inputNameSides').val();

        const data =  {
            idConPFM: strIdConPFM,
            userId: strUserId,
            userDocId: strUserDocId,
            sideId: strSideId,
            username: strUserName,
            nameUnit:inputNameSides
        };

        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลชื่อหน่วยงานใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resultId = await fnSetDataSideNamePFM(data)
                    if (resultId) {
                        strNameUnit.text(inputNameSides);
                        $('#sideNameModal').modal('hide');
                        $('.modal-backdrop').remove();

                        if (!strIdConPFM) { // เช็คว่าถ้า strIdConPFM ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConPFM').val(resultId)
                        }

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

async function fnSetDataSideNamePFM(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetSideNamePFM', dataSend)
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

/* end ส่วนแก้ชื่อหน่วยงาน*/

async function fnSetDataFormPerformance(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetFormPerformance', dataSend)
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


async function fnSetDataChanceRiskModal(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetChanceRiskModal', dataSend)
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


async function fnSetDataEffectRiskModal(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetEffectRiskModal', dataSend)
        console.log("API Response:", response.data) // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูลที่ได้รับกลับมา
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

async function fnSetDataRankRiskModal(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetRankRiskModal', dataSend)
        console.log("API Response:", response.data) // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูลที่ได้รับกลับมา
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


async function fnSetDataAssessorPFM(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetAssessorPFM', dataSend)
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

async function fnSetDataSignaturePFM(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetSignaturePFM', dataSend)
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