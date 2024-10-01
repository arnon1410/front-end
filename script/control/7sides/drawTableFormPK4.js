function fnSetHeader(){
    var strHTML = ''
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>องค์ประกอบการควบคุมภายใน</th>"
    strHTML += "<th class='text-center textHeadTable' style='width: 50%;'>ผลการประเมิน/ข้อสรุป</th>"
    return strHTML
}
async function fnDrawTableForm(access, valSides) {
    var strUserId = ""

    if (access === 'admin') {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        strUserId = urlParams.get('userId')
    } else {
        strUserId = fnGetCookie("userId");
    }

    // Get data selete before create table 
    var dataPK4SQL = await fnGetDataResultPK4(strUserId)
    var dataConPK4SQL = await fnGetDataResultConPK4(strUserId)
    var strResultDocSQL= await fnGetDataResultDoc(strUserId)

    // ตรวจสอบว่า dataSummary มีข้อมูลและไม่เป็น undefined หรือ null
    var idConPK4 = (dataConPK4SQL && dataConPK4SQL.length > 0) ? dataConPK4SQL[0].id : '';
    var descConPK4 = (dataConPK4SQL && dataConPK4SQL.length > 0) ? dataConPK4SQL[0].descConPK4 : '';
    var prefixAsessor = (dataConPK4SQL && dataConPK4SQL.length > 0) ? dataConPK4SQL[0].prefixAsessor : '';
    var signPath = (dataConPK4SQL && dataConPK4SQL.length > 0) ? dataConPK4SQL[0].signPath : '';
    var position = (dataConPK4SQL && dataConPK4SQL.length > 0) ? dataConPK4SQL[0].position : '';
    var dateAsessor = (dataConPK4SQL && dataConPK4SQL.length > 0) ? dataConPK4SQL[0].dateAsessor : '';

    var strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    var strHTML = ''
    var nameUnit = (dataPK4SQL && dataPK4SQL.length > 0 && dataPK4SQL[0].shortName) || '';
    var strYear = ''
    if (dateAsessor) {
        var dateSplit = dateAsessor.split('-');
        strYear = parseInt(dateSplit[0]) + 543;
    } else {
        var currentYear = new Date().getFullYear();
        strYear = currentYear + 543;
    }
    var DateFix = ' ณ วันที่ ๓๐ เดือน กันยายน ' + fnConvertToThaiNumeralsAndPoint(strYear)
    strHTML += " <div class='text-end'>แบบ ปค.๔</div> "
    strHTML += " <div class='title'><input type='hidden' id='inputIdConPK4' name='inputIdConPK4' value='" + fnCheckFalsy(idConPK4) + "'></div> "
    strHTML += " <div class='title'><span class='unit-label'>หน่วยงาน</span><span id='spanNameUnit' style='width: 232px;' class='underline-dotted'>" + nameUnit + "</span> </div>"
    strHTML += " <div class='title'>รายงานการประเมินองค์ประกอบของการควบคุมภายใน</div> "
    strHTML += " <div class='title'>สำหรับระยะเวลาดำเนินงานสิ้นสุด" + DateFix + "</div> "
    strHTML += " <div class='a4-size'> "
    strHTML += "<table id='tb_PK4" + valSides + "'>"
    strHTML += "<thead>"
    strHTML += "<tr>"
    strHTML += fnSetHeader() 
    strHTML += "</tr>"
    strHTML += "</thead>"
    strHTML += "<tbody>"
    strHTML += await fnDrawTableAssessmentForm(dataPK4SQL, strUserId, nameUnit)
    strHTML += "</tbody>"
    strHTML += "</table>"
    // strHTML += " </div> "
    strHTML += await fnDrawCommentDivEvaluation(idConPK4, descConPK4, prefixAsessor, signPath, position, dateAsessor, strUserId, access)
    

    strHTML += " <div class='dvFooterForm'> "
    if (access !== 'admin') {
        strHTML += "    <button type='button' class='btn btn-success' id='btnSaveData'>บันทึกฉบับร่าง</button>"
    }
    strHTML += " </div> "

   // strHTML += "<button id='checkButton'>เช็คสถานะ</button>"

    $("#dvFormReportAssessment")[0].innerHTML = strHTML
    if (access !== 'admin') {
        fnAddSaveButtonEventListener(dataPK4SQL, dataConPK4SQL, strUserId, strUserDocId)
    }
}

async function fnDrawTableAssessmentForm(dataSQL, strUserId, nameUnit) {
    var strHTML = "";

    // สร้าง array สำหรับเก็บผลลัพธ์ที่จัดเรียง
    let result = [];
    var maintext = fnGetCollectDataEvalution('maintext')
    var subtext = fnGetCollectDataEvalution('subtext')
    var index = 0
    var combinedSubtext = subtext.map(formItem => {
        var items = dataSQL[index++];
        return {
            ...formItem,
            idPK4 : items.id,
            descResultPK4: items.descResultPK4
        };
    });

    var getdata = [1] // ถ้ามีความเสี่ยง
    var valRisk = getdata
    if (valRisk.length > 1) {
        // จับคู่หัวข้อย่อยกับหัวข้อหลัก
        maintext.forEach(main => {
            // เพิ่มหัวข้อหลักในผลลัพธ์
            result.push(main);

            // หาหัวข้อย่อยที่ตรงกับหัวข้อหลัก
            combinedSubtext.forEach(sub => {
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
                combinedSubtext.forEach(sub => {
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
                    strHTML += "<tr style='width: 50%;'><td style='vertical-align: top;'>&emsp;&emsp;&emsp;&emsp;" + result[i].text + "</td><td>" + await fnCreateTextAreaAndButton(result[i].id, result[i].idPK4, result[i].descResultPK4, strUserId, nameUnit) + "</td></tr>";
                }
            }
        }

    return strHTML;
    /* แทรกโค้ดเข้าไปใน #dvTableReportAssessment */
    /* $("#dvTableReportAssessment")[0].innerHTML = strHTML; */
}

async function fnCreateTextAreaAndButton(idNO, idPK4, description, strUserId, nameUnit) {
    var strHTML = ''
    var arrHighRisk = ''
    var arrCaseImprove = ''
    if (idNO === 107 || idNO === 110) { // กรณีข้อ 2.2 กับ 3.1
        arrHighRisk =  await fnGetDataResultHighRisk(strUserId)
        if (idNO === 107) {
            var groupedRisks = fnGroupRisksBySide(arrHighRisk, 'risk');
            var formattedText = fnFormatRisks(groupedRisks, nameUnit);
            strHTML += formattedText;
        } else {
            // arrCaseImprove = await fnGetDataResultImprovePK4(strUserId);
            var groupedImprove = fnGroupRisksBySide(arrHighRisk, 'improve');
            var formattedImproveText = fnFormatImprove(groupedImprove, nameUnit);
            strHTML += formattedImproveText; // เพิ่มผลลัพธ์ลงใน strHTML
        }
        
    } else {
        if (description) {
            strHTML += " <div style='display:flex;'> "
            strHTML += " <textarea id='comment_" + idPK4 + "' name='comment_" + idPK4 + "' rows='1' cols='30' style='display:none;'></textarea> "
            strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + idPK4 + "' onclick='fnSubmitText(" + idPK4 + ")' style='display:none;'>ยืนยัน</button> "
            strHTML += " </div> "
            strHTML += " <div style='display:flex;'> "
            strHTML += " <span class='text-left' id='displayText" + idPK4 + "' style='text-indent: 19px;white-space: pre-wrap;'>" + description + "</span> "
            strHTML += " <i class='las la-pencil-alt' id='editIcon" + idPK4 + "' style='cursor:pointer; margin-left: 10px;margin-top: 5px;' onclick='fnEditText(\"" + idPK4 + "\")'></i> "
            strHTML += " </div> "
        } else {
            strHTML += " <div style='display:flex;'> "
            strHTML += " <textarea id='comment_" + idPK4 + "' name='comment_" + idPK4 + "' rows='1' cols='30'></textarea> "
            strHTML += " <button class='btn btn-secondary' type='submit' id='submitButton" + idPK4 + "' onclick='fnSubmitText(" + idPK4 + ")'>ยืนยัน</button> "
            strHTML += " </div> "
            strHTML += " <div style='display:flex;'> "
            strHTML += " <span class='text-left' id='displayText" + idPK4 + "' style='text-indent: 19px;white-space: pre-wrap;'></span> "
            strHTML += " <i class='las la-pencil-alt' id='editIcon" + idPK4 + "' style='display:none; cursor:pointer; margin-left: 10px;margin-top: 5px;' onclick='fnEditText(\"" + idPK4 + "\")'></i> "
            strHTML += " </div> "
        }
    }
    
    return  strHTML
}

function fnGenerateDataImprove(arrCaseImprove, nameUnit) {
    var datafix = `การกำหนดนโยบาย หลักเกณฑ์ และแนวทางการปฏิบัติงาน จัดให้มีกิจกรรมการควบคุมที่มีประสิทธิภาพและประสิทธิผล เพื่อป้องกันหรือลดความเสียหาย ความผิดพลาดที่อาจเกิดขึ้น และไม่สามารถบรรลุผลตามวัตถุประสงค์ของการปฏิบัติงาน สำหรับกิจกรรมการควบคุมในเบื้องต้นจัดให้มีการแบ่งแยกหน้าที่งานภายในหน่วยอย่างเหมาะสม ไม่มอบหมายงานให้บุคคลใดบุคคลหนึ่งที่มีความเสี่ยงต่อความเสียหายเป็นผู้รับผิดชอบปฏิบัติงานที่สำคัญหรืองานที่เสี่ยงต่อความเสียหายตั้งแต่ต้นจนจบ แต่ถ้ามีความจำเป็นให้กำหนดกิจกรรมการควบคุมอื่นที่เหมาะสมทดแทน เพื่อให้ครอบคลุมกระบวนการปฏิบัติงานในทุก ๆ ด้าน`;
    var dataNofix = `${nameUnit} มีการกำหนดนโยบาย วิธีการ ขั้นตอนต่าง ๆ จัดประชุม สัมมนา พร้อมทั้งมีการพัฒนากิจกรรมต่าง ๆ การควบคุมภายในหน่วยงาน ทั้งจากปัจจัยภายในและภายนอก เพื่อจัดการความเสี่ยงที่เกิดขึ้นภายในหน่วยให้บรรลุวัตถุประสงค์ อยู่ในระดับที่ยอมรับได้`
    var strHTML = ""
    strHTML += " <div style='display:flex; flex-direction: column;'> ";
    if (arrCaseImprove && arrCaseImprove.length > 0) {

    } else {
        strHTML += " <span class='text-left' style='text-indent: 19px; white-space: pre-wrap;'>" + dataNofix + "</span> ";
    }
    strHTML += " </div> ";

    return strHTML;
}

function fnGroupRisksBySide(arr, type) {
    if (!arr || arr.length === 0) {
      return null; // ถ้า arr ว่างหรือไม่มีข้อมูล return null
    }
  
    var result = {};
  
    arr.forEach(function (item) {
      // ถ้า sideName ยังไม่มีใน result ให้สร้าง object ใหม่สำหรับ sideName นั้น
      if (!result[item.sideName]) {
        result[item.sideName] = {};
      }
  
      // ถ้า headRisk ยังไม่มีใน sideName นั้น ให้สร้าง array ใหม่สำหรับ headRisk นั้น
      if (!result[item.sideName][item.headRisk]) {
        result[item.sideName][item.headRisk] = [];
      }
  
      // ตรวจสอบค่าก่อนเพิ่มใน result
      if (type == 'risk' && item.risking) {
        result[item.sideName][item.headRisk].push(item.risking);
      } else if (type != 'risk' && item.improvementControl) {
        result[item.sideName][item.headRisk].push(item.improvementControl);
      }
    });
  
    return result;
  }
  
  function fnFormatRisks(result, nameUnit) {
    if (!result) {
      // กรณีที่ไม่มีข้อมูลให้ return ข้อความที่กำหนด
      return `- ${nameUnit}มีการปฏิบัติงานตามภารกิจ แผนงาน และกิจกรรมตามด้านต่าง ๆ มีการประเมินความเสี่ยงที่อาจจะเกิดขึ้น โดยระบุความเสี่ยงที่มีผลต่อการบรรลุวัตถุประสงค์ นำมาวิเคราะห์ความเสี่ยงที่อาจจะเกิดขึ้นซึ่งได้กำหนดวิธีจัดการความเสี่ยงที่เกิดขึ้นของหน่วยให้อยู่ในระดับที่ยอมรับได้`;
    }
  
    var str = `- มีการกำหนดกิจกรรมที่สอดคล้องกับแผนยุทธศาสตร์และภารกิจของ ${nameUnit} และ ของ ทร. อย่างชัดเจนซึ่งการดำเนินกิจกรรมดังกล่าว จะกำหนดความเสี่ยงที่มีผลต่อการสำเร็จภารกิจ มีการวิเคราะห์และประเมินผลจนสามารถกำหนดวิธีการจัดการความเสี่ยงนั้นได้ แต่อย่างไรก็ตามยังมีบางกิจกรรมที่ต้องปรับปรุงการควบคุมภายใน ดังนี้<br>`; // เพิ่มข้อความเริ่มต้น
  
    for (var sideName in result) {
        str += '<div style="margin-top: 5px;"><strong>' + sideName + '</strong><br>';// แสดงชื่อด้านพร้อมตัวหนา
        for (var headRisk in result[sideName]) {
          str += 'กิจกรรม ' + headRisk + '<br>'; // แสดงชื่อกิจกรรม
          result[sideName][headRisk].forEach(function (risk) {
            str += '- ' + risk + '<br>'; // แสดงรายการความเสี่ยง
          });
        }
        str += '</div>'; // เพิ่มช่องว่างระหว่างกลุ่ม
      }
    return str;
  }

  function fnFormatImprove(result, nameUnit) {
    if (!result) {
        return  `- ${nameUnit} มีการกำหนดนโยบาย วิธีการ ขั้นตอนต่าง ๆ จัดประชุม สัมมนา พร้อมทั้งมีการพัฒนากิจกรรมต่าง ๆ การควบคุมภายในหน่วยงาน ทั้งจากปัจจัยภายในและภายนอก เพื่อจัดการความเสี่ยงที่เกิดขึ้นภายในหน่วยให้บรรลุวัตถุประสงค์ อยู่ในระดับที่ยอมรับได้`;
    }

    var str = `- มีการกำหนดกิจกรรมที่สอดคล้องกับแผนยุทธศาสตร์และภารกิจของ ${nameUnit} และ ของ ทร. อย่างชัดเจนซึ่งมีบางกิจกรรมที่ต้องปรับปรุงการควบคุมภายใน ดังนี้<br>`; 

    for (var sideName in result) {
        str += '<div style="margin-top: 5px;"><strong>' + sideName + '</strong><br>';
        for (var headRisk in result[sideName]) {
            str += 'กิจกรรม ' + headRisk + '<br>';
            result[sideName][headRisk].forEach(function (risk) {
                if (risk) {
                    str += '- ' + risk + '<br>'; // แสดงรายการความเสี่ยงถ้าไม่ใช่ null
                }
            });
        }
        str += '</div>';
    }

    return str;
}
  

/* ฟังก์ชันสำหรับการยืนยันข้อความ */
function fnSubmitText(id) {
    var textarea = document.getElementById('comment_' + id);
    var button = document.getElementById('submitButton' + id);
    var displayText = document.getElementById('displayText' + id);
    var editIcon = document.getElementById('editIcon' + id);
    var format = ''

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

async function fnDrawCommentDivEvaluation(idConPK4, descConASM, prefixAsessor, signPath, position, dateAsessor, strUserId, access) {
    
    var strHTML = ''
    var strUpload = 'Upload'
    var strEpen = 'Epen'

    strHTML += "  <input type='hidden' id='inputPrefixAsessor' name='inputPrefixAsessor' value='" + fnCheckFalsy(prefixAsessor) + "'>"
    strHTML += "  <input type='hidden' id='inputSignPath' name='inputSignPath' value='" + fnCheckFalsy(signPath) + "'>"

    strHTML += " <div class='dvEvaluation'>ผลการประเมินโดยรวม</div> "
    if (descConASM) {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83' style='display:none;'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEvaluation' onclick='fnSubmitTextCommentEvaluation()' style='display:none; width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start' style='text-indent: 19px;'> "
        strHTML += " <span id='displayTextCommentEvaluation' style='white-space: pre-wrap;'>" + descConASM + "</span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEvaluation' style='cursor:pointer;margin-top: 5px;' onclick='fnEditTextCommentEvaluation()'></i> "
        strHTML += " </div> "
    } else {
        strHTML += " <div> "
        strHTML += " <textarea id='commentEvaluation' name='commentEvaluation' rows='5' cols='83'></textarea> "
        strHTML += " </div> "
        strHTML += " <div class='text-end'> "
        strHTML += " <button class='btn btn-secondary' type='submit' id='submitButtonCommentEvaluation' onclick='fnSubmitTextCommentEvaluation()' style='width: 100px;'>ยืนยัน</button> "
        strHTML += " </div> "
        strHTML += " <div class='text-start' style='text-indent: 19px;'> "
        strHTML += " <span id='displayTextCommentEvaluation' style='white-space: pre-wrap;'></span> "
        strHTML += " <i class='las la-pencil-alt' id='editIconCommentEvaluation' style='display:none; cursor:pointer;margin-top: 5px;' onclick='fnEditTextCommentEvaluation()'></i> "
        strHTML += " </div> "
    }

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
        // strHTML += " </div> ";
    }

    return strHTML
}


function fnSubmitTextCommentEvaluation() {
    var textarea = document.getElementById('commentEvaluation');
    var button = document.getElementById('submitButtonCommentEvaluation');
    var displayText = document.getElementById('displayTextCommentEvaluation');
    var editIcon = document.getElementById('editIconCommentEvaluation');
    var format = ''

    if (textarea.value) {
        format = textarea.value.replace(/\n/g, '<br>');
        displayText.innerHTML = format

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

function fnAddSaveButtonEventListener(data, dataCon,strUserId, strUserDocId) {
    const saveButton = document.getElementById('btnSaveData');
    if (saveButton) {
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            // โค้ดสำหรับการบันทึกข้อมูล
            fnSaveDraftDocument(data, dataCon, strUserId, strUserDocId, event);
        });
    } else {
        console.error('Element with id btnSaveData not found.');
    }
}

function fnSaveDraftDocument(data , dataCon, strUserId, strUserDocId, event)  {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    var dataSend = []
    var strDisplayText = ''
    var descResultPK4 = ''
    var strUserName = fnGetCookie("username");
    var descCon = $('#displayTextCommentEvaluation').text()
    var descConPK4 = (dataCon && dataCon.length > 0) ? dataCon[0].descConPK4 : '';
    var idConPK4 =  $('#inputIdConPK4').val();

    // Loop ผ่าน data เพื่อเปรียบเทียบและ push ข้อมูลลงใน dataSend
    data.forEach(formItem => {
        strDisplayText = $('#displayText' + formItem.id).text();
        descResultPK4 = formItem.descResultPK4 === null ? '' : formItem.descResultPK4;
        if (descResultPK4 !== strDisplayText) { // หาข้อมูลที่มีการแก้ไข
            dataSend.push({
                idPK4: formItem.id,
                userId: strUserId,  // หรือใช้ strUserId ถ้ามีการประกาศ
                userDocId: strUserDocId,
                username: strUserName,
                descResultPK4: strDisplayText
            });
        }
    });
    if (descCon) {
        if (descCon !== descConPK4) {
            dataSend.push({
                idConPK4: idConPK4,
                userId: strUserId,  // หรือใช้ strUserId ถ้ามีการประกาศ
                userDocId: strUserDocId,
                username: strUserName,
                descResultConPK4: descCon
            });
        }
    }

    if (dataSend && dataSend.length > 0) {
        Swal.fire({
            title: "",
            text: "คุณต้องการบันทึกข้อมูลแบบ ปค.๔ ใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึกข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resultId = await fnSetDataFormPK4(dataSend)
                    if (resultId) {
                        if (!idConPK4) { // เช็คว่าถ้า idConPK4 ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConPK4').val(resultId)
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
    const strIdConPK4 = $('#inputIdConPK4').val();
    const strPrefixAsessor = $('#inputPrefixAsessor').val();
    const strUserId = $('#inputIdUsers').val();
    const strUserName = fnGetCookie("username");
    const strResultDocSQL= await fnGetDataResultDoc(strUserId)
    const strUserDocId = (strResultDocSQL && strResultDocSQL.length > 0) ? strResultDocSQL[0].id : '';

    // Result container to display the signature
    const resultContainer = $('#dvSignature');
    
    const data =  {
        idConPK4: strIdConPK4,
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
                const resultId = await fnSetDataSignaturePK4(data)
                if (resultId) {
                    let strHTML = `
                        <div>ผู้ประเมิน: <span style="width: 197px;" class="underline-dotted">${fnCheckFalsy(strPrefixAsessor)}<img src="${signPath}" alt="ลายเซ็น" /></span></div>
                    `;
        
                    resultContainer.html(strHTML); // Use .html() to set the content
                    
                    $('#inputSignPath').val(signPath) // เพิ่มลายเซ็นไปเก็บไว้ใน input

                    if (!strIdConPK4) { // เช็คว่าถ้า strIdConPK4 ยังไม่ข้อมูลในเทเบิ้ล
                        $('#inputIdConPK4').val(resultId)
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
        const strIdConPK4 = $('#inputIdConPK4').val();
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
            idConPK4: strIdConPK4,
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
                    const resultId = await fnSetDataAssessorPK4(data)
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
                        if (!strIdConPK4) { // เช็คว่าถ้า strIdConPK4 ยังไม่ข้อมูลในเทเบิ้ล
                            $('#inputIdConPK4').val(resultId)
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

async function fnSetDataAssessorPK4(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetAssessorPK4', dataSend)
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

async function fnSetDataSignaturePK4(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetSignaturePK4', dataSend)
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
        formId: '5'
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

async function fnGetDataResultPK4(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultPK4', dataSend)
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


async function fnGetDataResultConPK4(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultConPK4', dataSend)
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
/* end ส่วนของลายเซ็นฯ */

async function fnSetDataFormPK4(dataSend) {
    try {
        const response = await axios.post(apiUrl + '/api/documents/fnSetFormPK4', dataSend)
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

async function fnGetDataResultHighRisk(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultHighRisk', dataSend)
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

async function fnGetDataResultImprovePK4(userId) {
    var dataSend = {
        userId: userId
    }

    try {
        const response = await axios.post(apiUrl + '/api/documents/fnGetResultImprovePK4', dataSend)
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