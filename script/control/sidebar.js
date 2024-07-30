function fnSetSidebarMenuConTrol(namePages){
    var strHTML = ''
    var menuItemsMain = [
        { page: 'dashboard', text: 'Dashboard', icon: 'las la-chart-pie' },
        { page: 'collation', text: 'การสอบทาน', icon: 'las la-award' },
        { page: 'sendReport', text: 'การจัดส่งรายงาน', icon: 'las la-paper-plane' }
    ];
    var menuItemsForm = [
        { page: 'Appointment', text: 'คำสั่งแต่งตั้งคณะทำงาน', icon: 'las la-file' },
        { page: 'branchPersonal', text: 'ด้านกำลังพล', icon: 'las la-user' },
        { page: 'branchOperation', text: 'ด้านการยุทธการ', icon: 'las la-share-alt' },
        { page: 'branchNews', text: 'ด้านการข่าว', icon: 'las la-newspaper' },
        { page: 'branchLogistics', text: 'ด้านส่งกำลังบำรุง', icon: 'las la-box-open' },
        { page: 'branchCommunication', text: 'ด้านสื่อสาร', icon: 'las la-satellite-dish' },
        { page: 'branchTechnology', text: 'ด้านระบบเทคโนโลยี', icon: 'las la-globe-americas' },
        { page: 'branchCivilAffairs', text: 'ด้านกิจการพลเรือน', icon: 'las la-user-check' },
        { page: 'branchBudget', text: 'ด้านการงบประมาณ', icon: 'las la-balance-scale' },
        { page: 'branchFinanceAndAcc', text: 'ด้านการเงินและการบัญชี', icon: 'las la-coins' },
        { page: 'branchPercelsAndProPerty', text: 'ด้านพัสดุและทรัพย์สิน', icon: 'las la-cubes' },
        { page: 'reportAssessment', text: 'รายงานการประเมินผล', icon: 'lar la-chart-bar' }
    ];
    strHTML += " <ul> "
    strHTML += " <li class='headMenuTitle'><span>หน้าหลัก</span></li> "

    // loop create tab main
    for (var i = 0; i < menuItemsMain.length; i++) {
        var menuItemA = menuItemsMain[i];
        var isActive = (namePages === menuItemA.page) ? ' active' : '';
        strHTML += `<li><a href='${menuItemA.page}.html' class='nounderline${isActive}'><span class='${menuItemA.icon}'></span><span>${menuItemA.text}</span></a></li>`;
    }
    
    strHTML += " <li class='headMenuTitle'><span>ควบคุมภายในทหารเรือ</span></li> "

    // loop create tab form
    for (var i = 0; i < menuItemsForm.length; i++) {
        var menuItemB = menuItemsForm[i];
        var isActive = (namePages === menuItemB.page) ? ' active' : '';
        strHTML += `<li><a href='${menuItemB.page}.html' class='nounderline${isActive}'><span class='${menuItemB.icon}'></span><span>${menuItemB.text}</span></a></li>`;
    }
    
    strHTML += " <hr class='border-2 border-top border-primary' /> "
    strHTML += " <li class='lineEndTitle'></li> "
    strHTML += " <li><a id='logout' href='#' class='nounderline'><span class='las la-sign-out-alt'></span><span>ออกจากระบบ</span></a></li> "
    strHTML += " </ul> "

    $("#dvUlSidebarMenu")[0].innerHTML = strHTML
    // return strHTML
}

function fnCreateBtnTabForm (namePages) {
    var strHTML = ""
    var menuItems = []
    if (namePages == 'Appointment') {
        strHTML += " <button type='button' class='btn gradient-btn' onclick='fnGetDataModal()'  data-bs-toggle='modal' data-bs-target='#AssessmentModal' style='margin-top: 20px;'> "
        strHTML += " <span class='las la-plus'></span> "
        strHTML += " นำเข้าข้อมูล "
        strHTML += " </button> "
    }
    else {
        strHTML += " <div class='dropdown'> "
        strHTML += " <button class='btn dropdown-toggle gradient-btn' type='button' data-bs-toggle='dropdown' aria-expanded='false' style='margin-top: 20px;'> "
        strHTML += " กรอกแบบฟอร์ม "
        strHTML += " </button> "
        strHTML += " <ul class='dropdown-menu'> "
        if (namePages == 'reportAssessment') { // เอกสารปลายน้ำ
            menuItems = [
                { page: 'reportAssessmentPK4', text: 'แบบ ปค.๔'},
                { page: 'reportAssessmentPK5', text: 'แบบ ปค.๕'},
                { page: 'reportAssessmentFollowPK5', text: 'แบบติดตาม ปค.๕'}
            ];
        } else { // เอกสารต้นน้ำ
            menuItems = [
                { page: 'Questionnaire', text: 'แบบสอบถาม'},
                { page: 'AssessmentForm', text: 'แบบประเมิน'},
                { page: 'PerformanceEVForm', text: 'แบบ ปม.'}
            ];
        }
        for (var i = 0; i < menuItems.length; i++) {
            var menuItemA = menuItems[i];
            // var isActive = (namePages === menuItemA.page) ? ' active' : '';
            strHTML += `<li><a class='dropdown-item text-center' href='${menuItemA.page}.html?sides=${namePages}' target='_blank'>${menuItemA.text}</a></li>`        
        }

        strHTML += " </ul>"
        strHTML += " </div>"
    
    }
    
    // strHTML2 += " <button type='button' class='btn btn-danger' onclick='fnGetDataModal2()' data-bs-toggle='modal' data-bs-target='#AssessmentModal2' > "
    // strHTML2 += " <span class='las la-plus'></span> "
    // strHTML2 += " นำเข้าข้อมูล "
    // strHTML2 += " </button> "

    $("#btnAddData")[0].innerHTML = strHTML

    // if (namePages == 'branchNews') { // เอกสารปลายน้ำ
    //     $("#btnAddData2")[0].innerHTML = strHTML2
    // }
}
  
  

    
    
    

