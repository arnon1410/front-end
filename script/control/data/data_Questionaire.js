function fnGetCollectDataQuestionaire (data) {
    var str = []
    if (data == 'branchpersonal') {
        str = [
            // -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "การบริหารจัดการ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้กระบวนงานต่าง ๆ ในการบริหารจัดการด้านกำลังพลเป็นไปอย่างเป็นระบบมีขั้นตอนมีประสิทธิภาพ สอดรับกับแนวทางและนโยบาย ทร.รวมทั้งมีความถูกต้องตามกฎ ระเบียบคำสั่งและหลักเกณฑ์ที่กำหนด"},
            { id: 102, id_control: '1.1', head_id: 1, text: "การกำหนดพันธกิจ" , is_subcontrol:1},
            { id: 103, id_control: '1.1', id_subcontrol: '1.1.1', head_id: 1, text: "มีการกำหนดพันธกิจ เป้าประสงค์และค่าเป้าหมายของการดำเนินงานที่สามารถวัดผลสำเร็จของหน่วยได้เป็น ลายลักษณ์อักษร ที่สอดคล้องกับแผนยุทธศาสตร์ ทร.และนโยบายของ ผบ.ทร." ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 104, id_control: '1.1', id_subcontrol: '1.1.2', head_id: 1, text: "มีการเผยแพร่ประชาสัมพันธ์ให้กำลังพลทราบถึงพันธกิจ เป้าประสงค์ และค่าเป้าหมายของหน่วย" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol

            { id: 105, id_control: '1.2', head_id: 1 ,text: "การจัดทำแผนการดำเนินงาน" , is_subcontrol:1},
            { id: 106, id_control: '1.2', id_subcontrol: '1.2.1', head_id: 1, text: "มีการจัดทำแผนปฏิบัติราชการประจำปีของหน่วย ที่มีความสอดคล้องตามเป้าประสงค์ และค่าเป้าหมายที่กำหนด" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 107, id_control: '1.2', id_subcontrol: '1.2.2', head_id: 1, text: "แผนปฏิบัติราชการประจำปีมีการกำหนดเป้าประสงค์ ค่าเป้าหมายของแผนงาน/โครงการ/กิจกรรมการจัดสรรงบประมาณ และระยะเวลาการปฏิบัติ รวมทั้งกำหนดผู้รับผิดชอบไว้อย่างชัดเจน" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 108, id_control: '1.2', id_subcontrol: '1.2.3', head_id: 1, text: "มีการติดตามประเมินผลการปฏิบัติงานตามที่ ได้กำหนดไว้ในแผนปฏิบัติราชการประจำปี" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 109, id_control: '1.2', id_subcontrol: '1.2.4', head_id: 1, text: "มีการทบทวนและปรับปรุงกระบวนงานด้านการกำลังพลในความรับผิดชอบของตำแหน่งต่าง ๆ" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 110, id_control: '1.2', id_subcontrol: '1.2.5', head_id: 1, text: "มีการชี้แจงและสั่งการให้แก่กำลังพลที่รับผิดชอบ ในการปฏิบัติตามแผนทราบ" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 111, id_control: '1.2', id_subcontrol: '1.2.6', head_id: 1, text: "มีการแจ้งข้อมูลหรือประชาสัมพันธ์นโยบาย ที่เกี่ยวกับการปฏิบัติงานด้านกำลังพลที่มีการแก้ไขหรือเปลี่ยนแปลง ให้กำลังพลที่เกี่ยวข้องในระดับต่าง ๆ ทราบ" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol

            { id: 112, id_control: '1.3', head_id: 1 ,text: "คุณสมบัติประจำตำแหน่ง" , is_subcontrol:1},
            { id: 113, id_control: '1.3', id_subcontrol: '1.3.1', head_id: 1, text: "มีการกำหนดคุณสมบัติ ทักษะ ความรู้ ความสามารถ ประสบการณ์ และเงื่อนไขที่จำเป็นอื่นๆ ขีดความสามารถ/ขีดสมรรถนะของตำแหน่ง/อัตราต่างๆ รวมทั้งขอบเขตหน้าที่ความรับผิดชอบไว้อย่างชัดเจนเป็นลายลักษณ์อักษร เพื่อเป็นมาตรฐานกำหนดตำแหน่ง สำหรับการปฏิบัติงานเพื่อให้กำลังพลที่บรรจุในตำแหน่ง/อัตรานั้น สามารถปฏิบัติงานได้ตามหน้าที่รับผิดชอบที่กำหนดไว้" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 114, id_control: '1.3', id_subcontrol: '1.3.2', head_id: 1, text: "การมอบหมายงาน หรือหน้าที่รับผิดชอบที่สำคัญ มีการจัดทำคำสั่งเป็นลายลักษณ์อักษร โดยผู้บังคับบัญชาของหน่วยหรือผู้ที่ได้รับมอบหมาย เช่น คณะกรรมการ หรือคณะทำงานต่าง ๆ" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            
            { id: 115, id_control: '1.4', head_id: 1 ,text: "การบรรจุ การสรรหา และการโยกย้ายกำลังพล" , is_subcontrol:1},
            { id: 116, id_control: '1.4', id_subcontrol: '1.4.1', head_id: 1, text: "มีการจัดโครงสร้างและสายงาน การบังคับบัญชา ที่ชัดเจน เหมาะสมกับขนาดและลักษณะการปฏิบัติภารกิจ ของหน่วยงาน" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 117, id_control: '1.4', id_subcontrol: '1.4.2', head_id: 1, text: "มีการบรรจุกำลังพลที่เพียงพอ เหมาะสมกับขนาดและลักษณะการปฏิบัติภารกิจของหน่วยงาน" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 118, id_control: '1.4', id_subcontrol: '1.4.3', head_id: 1, text: "มีการวิเคราะห์ ทบทวนแผนการผลิตและจัดหากำลังพล เพื่อบรรจุในตำแหน่งต่างๆ ตามที่ ทร.อนุมัติ (เฉพาะ กพ.ทร.และหน่วยหัวหน้าสายวิทยาการ)" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 119, id_control: '1.4', id_subcontrol: '1.4.4', head_id: 1, text: "การมอบหมายงาน หรือหน้าที่รับผิดชอบที่สำคัญ มีการจัดทำคำสั่งเป็นลายลักษณ์อักษร โดยผู้บังคับบัญชาของหน่วยหรือผู้ที่ได้รับมอบหมาย เช่น คณะกรรมการ หรือคณะทำงานต่าง ๆมีการเผยแพร่ข้อมูลการรับสมัครหรือสรรหา กำลังพล เพื่อบรรจุในตำแหน่งต่าง ๆ ตามที่ ทร.อนุมัติ (เฉพาะ กพ.ทร.และหน่วยที่มีการจัดหากำลังพลทุกประเภท)" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 120, id_control: '1.4', id_subcontrol: '1.4.5', head_id: 1, text: "มีการกำหนดกระบวนการสอบคัดเลือกในการ คัดสรรกำลังพล เพื่อบรรจุและแต่งตั้งเป็นกำลังพลใหม่ที่มีความรู้ ทักษะ และความสามารถที่เหมาะสมกับตำแหน่งงาน (เฉพาะ กพ.ทร.และหน่วยที่มีการจัดหากำลังพลทุกประเภท)" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 121, id_control: '1.4', id_subcontrol: '1.4.6', head_id: 1, text: "มีคณะกรรมการสอบคัดเลือกกำลังพลประเภทต่าง ๆ ตามแผนการผลิตและจัดหากำลังพลที่ ทร.อนุมัติโดยคณะกรรมการฯ สามารถใช้ข้อมูลที่เกี่ยวข้องประกอบการคัดเลือก รวมทั้งเป็นไปตามข้อบังคับ ระเบียบ และหลักเกณฑ์ต่าง ๆ ที่เกี่ยวข้อง (เฉพาะ กพ.ทร.และหน่วยที่มีการจัดหากำลังพล ทุกประเภท)" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 122, id_control: '1.4', id_subcontrol: '1.4.7', head_id: 1, text: "มีคณะกรรมการพิจารณาการย้ายบรรจุกำลังพลเพื่อปฏิบัติงานในตำแหน่งต่าง ๆ ตามหลักเกณฑ์ที่กำหนด อย่างเหมาะสม โดยคณะกรรมการฯ สามารถนำข้อมูลที่เกี่ยวข้องไปใช้ประกอบการพิจารณาย้ายบรรจุกำลังพลที่มีคุณสมบัติ ตรงตามที่กำหนด"  ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
        
            { id: 123, id_control: '1.5', head_id: 1 ,text: "การประเมินผลการปฏิบัติงาน" , is_subcontrol:1},
            { id: 124, id_control: '1.5', id_subcontrol: '1.5.1', head_id: 1, text: "มีการบันทึกและบันทึกเวลาการมาปฏิบัติงานของกำลังพล โดยมีผู้บังคับบัญชาตามลำดับชั้น" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 125, id_control: '1.5', id_subcontrol: '1.5.2', head_id: 1, text: "มีการประเมินผลการปฏิบัติงานตามช่วงเวลา ที่หน่วยกำหนดเป็นประจำ" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 126, id_control: '1.5', id_subcontrol: '1.5.3', head_id: 1, text: "มีการแจ้งประเมินผลการปฏิบัติงานให้แก่กำลังพลทราบ เพื่อแก้ไขและปรับปรุงการปฏิบัติงาน" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 127, id_control: '1.5', id_subcontrol: '1.5.4', head_id: 1, text: "การเลื่อนชั้นเงินเดือน มีกระบวนการพิจารณา และจัดทำคำสั่งเป็นลายลักษณ์อักษร" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 128, id_control: '1.5', id_subcontrol: '1.5.5', head_id: 1, text: "การพิจารณาเลื่อนขึ้นเงินเดือน หรือบำเหน็จประจำปี มีความสอดคล้องตามผลการประเมินการปฏิบัติงาน รวมถึงการปฏิบัติงานที่นอกเหนือจากหน้าที่รับผิดชอบปกติ" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 129, id_control: '1.5', id_subcontrol: '1.5.6', head_id: 1, text: "มีการทดสอบสมรรถภาพกำลังพลของ ทร. และการกำกับกำลังพลในหน่วยให้มีการตรวจสุขภาพประจำปี" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 130, id_control: '1.5', id_subcontrol: '1.5.7', head_id: 1, text: "มีการประเมินผลการเข้ารับการตรวจสุขภาพประจำปีของข้าราชการ ทร.ในห้วงเวลาที่กำหนด" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
        
            { id: 131, id_control: '1.6', head_id: 1 ,text: "การร้องเรียน ร้องทุกข์" , is_subcontrol:1},
            { id: 132, id_control: '1.6', id_subcontrol: '1.6.1', head_id: 1, text: "มีการกำหนดช่องทางและวิธีการสื่อสารเพื่อให้กำลังพลสามารถแจ้งเรื่องร้องเรียน ร้องทุกข์ หรือข้อเสนอแนะให้กับผู้บังคับบัญชาได้" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 133, id_control: '1.6', id_subcontrol: '1.6.2', head_id: 1, text: "มีการกำหนดให้คณะกรรมการ/คณะทำงานของหน่วย ตรวจสอบ สอบสวน ติดตามผลและตอบข้อร้องเรียน ร้องทุกข์ หรือข้อเสนอแนะของกำลังพล" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 134, id_control: '1.6', id_subcontrol: '1.6.3', head_id: 1, text: "มีการแจ้งผลการพิจารณาของคณะกรรมการ/คณะทำงานของหน่วย ที่ทำการตรวจสอบหรือสอบสวนในเรื่อง ร้องเรียน ร้องทุกข์ต่าง ๆ เพื่อชี้แจงให้กำลังพลรับทราบ" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            
            { id: 1001 , head_id: 1, sum_id: 101, text: "การบริหารจัดการ" },
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้", isradio:1},

            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 106, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 107, is_improvement: 1},
            { id: 105 , head_id: 1, risk_id: 108, is_improvement: 1},
            { id: 106 , head_id: 1, risk_id: 109, is_improvement: 1},
            { id: 107 , head_id: 1, risk_id: 110, is_improvement: 1},
            { id: 108 , head_id: 1, risk_id: 111, is_improvement: 1},
            { id: 109 , head_id: 1, risk_id: 113, is_improvement: 1},
            { id: 110 , head_id: 1, risk_id: 114, is_improvement: 1},
            { id: 111 , head_id: 1, risk_id: 116, is_improvement: 1},
            { id: 112 , head_id: 1, risk_id: 117, is_improvement: 1},
            { id: 113 , head_id: 1, risk_id: 118, is_improvement: 1},
            { id: 114 , head_id: 1, risk_id: 119, is_improvement: 1},
            { id: 115 , head_id: 1, risk_id: 120, is_improvement: 1},
            { id: 116 , head_id: 1, risk_id: 121, is_improvement: 1},
            { id: 117 , head_id: 1, risk_id: 122, is_improvement: 1},
            { id: 118 , head_id: 1, risk_id: 124, is_improvement: 1},
            { id: 119 , head_id: 1, risk_id: 125, is_improvement: 1},
            { id: 120 , head_id: 1, risk_id: 126, is_improvement: 1},
            { id: 121 , head_id: 1, risk_id: 127, is_improvement: 1},
            { id: 122 , head_id: 1, risk_id: 128, is_improvement: 1},
            { id: 123 , head_id: 1, risk_id: 129, is_improvement: 1},
            { id: 124 , head_id: 1, risk_id: 130, is_improvement: 1},
            { id: 125 , head_id: 1, risk_id: 132, is_improvement: 1},
            { id: 126 , head_id: 1, risk_id: 133, is_improvement: 1},
            { id: 127 , head_id: 1, risk_id: 134, is_improvement: 1},       
           
            // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.',  head_id: 2, mainControl_id: 2 , text: "การศึกษาและฝึกอบรม" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้กระบวนงานต่าง ๆในกิจกรรมการศึกษาและฝึกอบรมเป็นไปตามขั้นตอนสอดคล้องกับระเบียบ ข้อปังคับ หลักเกณฑ์ที่กำหนดและทันต่อเวลาซึ่งจะทำให้การผลิตและการพัฒนากำลังพลเป็นไปอย่างมีประสิทธิภาพ บังเกิดผลสัมฤทธิ์ต่อการปฏิบัติภารกิจของหน่วยงานและไปอย่างต่อเนื่อง"},
            { id: 202, id_control: '2.1', head_id: 2, text: "ผู้บังคับบัญชาให้ความสำคัญต่อการพัฒนาความรู้ความสามารถของกำลังพลภายในหน่วย" , is_subcontrol:0, ischeckbox:1},
            { id: 203, id_control: '2.2', head_id: 2, text: "มีการพิจารณาความต้องการและจัดทำโครงการ/แผนงาน/แผนการฝึก ศึกษา อบรม กำลังพลของหน่วยที่ได้รับอนุมัติจากผู้บังคับบัญชา เพื่อพัฒนาทักษะความรู้ความสามารถของกำลังพล โดยการพิจารณาให้ความสำคัญตามยุทธศาสตร์ ภารกิจหน้าที่ และแนวทางการรับราชการ ตลอดจนสอดคล้องกับงบประมาณที่ได้รับการจัดสรร" , is_subcontrol:0, ischeckbox:1},
            { id: 204, id_control: '2.3', head_id: 2, text: "มีการจัดสรรงบประมาณเพื่อดำเนินการตามโครงการ/แผนงาน/แผนการฝึก ศึกษา อบรม อย่างเพียงพอต่อความต้องการพัฒนากำลังพลภายในหน่วย" , is_subcontrol:0, ischeckbox:1},
            { id: 205, id_control: '2.4', head_id: 2, text: "มีการกำหนดหน่วยรับผิดชอบเพื่อทบทวนและปรับปรุงวิธีการพิจารณาความต้องการและจัดทำโครงการ/แผนงาน/แผนการฝึก ศึกษา อบรม กำลังพลภายในหน่วย" , is_subcontrol:0, ischeckbox:1},
            { id: 206, id_control: '2.5', head_id: 2, text: "มีการทบทวนและปรับปรุงวิธีการพิจารณาความต้องการและจัดทำโครงการ/แผนงาน/แผนการฝึก ศึกษา อบรม กำลังพลของหน่วยเป็นประจำทุกปี" , is_subcontrol:0, ischeckbox:1},
            { id: 207, id_control: '2.6', head_id: 2, text: "มีการแต่งตั้งคณะกรรมการสอบคัดเลือกกำลังพลเพื่อไปทำการฝึก ศึกษา อบรม ที่มีความโปร่งใส เป็นไปตามหลักเกณฑ์ และเงื่อนไขต่างๆ ที่กำหนด" , is_subcontrol:0, ischeckbox:1},
            { id: 208, id_control: '2.7', head_id: 2, text: "มีวิธีการหรือกระบวนการเพื่อพัฒนา กำลังพลที่ปฏิบัติงานได้ต่ำกว่าที่มาตรฐานกำหนด สำหรับใช้เป็นแนวทางในการพัฒนากำลังพลที่ชัดเจนเป็นลายลักษณ์อักษร" , is_subcontrol:0, ischeckbox:1},
            { id: 209, id_control: '2.8', head_id: 2, text: "มีการพัฒนากำลังพลที่ปฏิบัติงานได้ต่ำกว่ามาตรฐาน ตามแนวทางที่กำหนด" , is_subcontrol:0, ischeckbox:1},
            
            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "การศึกษาและฝึกอบรม" },
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ", isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้", isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 203, is_improvement: 1},
            { id: 203 , head_id: 2, risk_id: 204, is_improvement: 1},
            { id: 204 , head_id: 2, risk_id: 205, is_improvement: 1},
            { id: 205 , head_id: 2, risk_id: 206, is_improvement: 1},
            { id: 206 , head_id: 2, risk_id: 207, is_improvement: 1},
            { id: 207 , head_id: 2, risk_id: 208, is_improvement: 1},
            { id: 208 , head_id: 2, risk_id: 209, is_improvement: 1},
            
            // -------------------------- 3 -------------------------- //
            { id: 301, id_control: '3.',   head_id: 3,  mainControl_id: 3 ,text: "การบริการ สวัสดิการ และสิทธิกำลังพล" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การบริการ สวัสดิการและสิทธิกำลังพล เป็นไปอย่าง ถูกต้อง สอดคล้องกับระเบียบ ข้อบังคับ และหลักเกณฑ์ที่กำหนดในการเสริมสร้างให้กำลังพลและครอบครัวในทุกระดับ มีคุณภาพชีวิตที่ดี สามารถดำรงชีพ สมควรแก่ฐานะอยู่ในสังคมได้อย่างมีเกียรติและศักดิ์ศรี"},
            { id: 302, id_control: '3.1',  head_id: 3, text: "มีการจัดให้มีการบริการต่างๆ กับกำลังพลในหน่วย เช่น การจัดบริการรถ/เรือรับ - ส่ง กำลังพล" , is_subcontrol:0, ischeckbox:1},
            { id: 303, id_control: '3.2',  head_id: 3, text: "มีการจัดสวัสดิการต่าง ๆ ให้กับกำลังพลภายในหน่วย" , is_subcontrol:0, ischeckbox:1},
            { id: 304, id_control: '3.3',  head_id: 3, text: "กำลังพลได้รับสิทธิกำลังพลต่างๆ ตามหลักเกณฑ์ที่กำหนด" , is_subcontrol:0, ischeckbox:1},
            { id: 305, id_control: '3.4',  head_id: 3, text: "มีการจัดวางกฎ ระเบียบ และข้อบังคับเกี่ยวกับการสวัสดิการ และสิทธิกำลังพล" , is_subcontrol:0, ischeckbox:1},
            { id: 306, id_control: '3.5',  head_id: 3, text: "มีการปฏิบัติตามกฎ ระเบียบ และข้อบังคับเกี่ยวกับ การสวัสดิการ และสิทธิกำลังที่จัดวางไว้" , is_subcontrol:0, ischeckbox:1},
    
            { id: 1007 , head_id: 3, sum_id: 301, value:  '', text: "การบริการ สวัสดิการ และสิทธิกำลังพล" },
            { id: 1008 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ", isradio:1},
            { id: 1009 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้", isradio:1},

            // ส่วนเก็บ improvement
            { id: 301 , head_id: 3, risk_id: 302, is_improvement: 1},
            { id: 302 , head_id: 3, risk_id: 303, is_improvement: 1},
            { id: 303 , head_id: 3, risk_id: 304, is_improvement: 1},
            { id: 304 , head_id: 3, risk_id: 305, is_improvement: 1},
            { id: 305 , head_id: 3, risk_id: 306, is_improvement: 1},
        ];
    } else if (data == 'branchnews') { //  branchnews
        str = [
// -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "การรักษาความปลอดภัยเกี่ยวกับข้อมูลข่าวสารลับ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่ามีเครื่องมือ และอุปกรณ์ที่มีประสิทธิภาพเพียงพอต่อการรักษาความปลอดภัยเกี่ยวกับข้อมูลข่าวสารลับ"},
            { id: 102, id_control: '1.1', head_id: 1, text: "มีการแต่งตั้งนายทะเบียน ผู้ช่วย เจ้าหน้าที่ข้อมูลข่าวสารลับ" , is_subcontrol:0,  ischeckbox:1},
            { id: 103, id_control: '1.2', head_id: 1, text: "มีการกำหนดชั้นความลับตามระเบียบว่าด้วยการรักษาความลับของทางราชการ พ.ศ.๒๕๕๔" , is_subcontrol:0,  ischeckbox:1},
            { id: 104, id_control: '1.3', head_id: 1, text: "การอนุญาตให้บุคลากรเข้าถึงชั้นความลับ โดยยืดหลักจำกัดให้ทราบเท่าที่จำเป็น" , is_subcontrol:0,  ischeckbox:1},
            { id: 105, id_control: '1.4', head_id: 1 ,text: "ผู้เข้าถึงชั้นความลับ รักษาความลับโดยปฏิบัติตามระเบียบที่กำหนดไว้โดยเคร่งครัด" , is_subcontrol:0,  ischeckbox:1},
            { id: 106, id_control: '1.5', head_id: 1 ,text: "มีการดำเนินการเกี่ยวกับข้อมูลข่าวสารลับให้เป็นไปตามระเบียบว่าด้วยการรักษาความลับของทางราชการ พ.ศ.๒๕๔๔ ทะเบียนรับ ทะเบียนส่ง และทะเบียนควบคุมข้อมูลข่าวสารลับ" , is_subcontrol:0,  ischeckbox:1},
            { id: 107, id_control: '1.6', head_id: 1 ,text: "การดำเนินการเกี่ยวกับเอกสารลับมีใบปกปิดทับตามชั้นเอกสารลับ ชั้นลับ ลับมาก ลับที่สุด" , is_subcontrol:0,  ischeckbox:1},
            { id: 108, id_control: '1.7', head_id: 1 ,text: "การส่งเอกสารลับ ใช้ซองทึบแสง ๒ ชั้น โดยชั้นในแสดงความลับทั้งด้านหน้า - หลัง ส่วนชั้นนอกจะต้องไม่มีเครื่องหมายแสดงใดๆ ที่บ่งบอกว่าเป็นข้อมูลข่าวสารลับ" , is_subcontrol:0,  ischeckbox:1},
            { id: 109, id_control: '1.8', head_id: 1 ,text: "การเก็บรักษาข้อมูลข่าวสารลับเก็บไว้ในที่ปลอดภัย กรณีเก็บไว้ในเครื่องคอมพิวเตอร์มีการกำหนดรหัสผ่าน" , is_subcontrol:0,  ischeckbox:1},
            { id: 110, id_control: '1.9', head_id: 1 ,text: "การยืม มีการพิจารณาผู้ยืมเกี่ยวกับเรื่องนั้นหรือไม่ และเจ้าของเรื่องเดิมต้องอนุญาตก่อน และมีการทำบันทึกการยืมไว้" , is_subcontrol:0,  ischeckbox:1},
            { id: 111, id_control: '1.10',head_id: 1 ,text: "การทำลายข้อมูลข่าวสารลับ มีการดำเนินการตามขั้นตอนที่กำหนดตามระเบียบที่เกี่ยวข้อง " , is_subcontrol:0,  ischeckbox:1},
            { id: 112, id_control: '1.11',head_id: 1 ,text: "กรณีข้อมูลข่าวสารลับสูญหาย หรือรั่วไหล มีการแต่งตั้งกรรมการสอบสวน เพื่อหาสาเหตุ และกำหนดมาตรการป้องกันมิให้เกิดซ้ำ" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "การรักษาความปลอดภัยเกี่ยวกับข้อมูลข่าวสารลับ"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 105, is_improvement: 1},
            { id: 105 , head_id: 1, risk_id: 106, is_improvement: 1},
            { id: 106 , head_id: 1, risk_id: 107, is_improvement: 1},
            { id: 107 , head_id: 1, risk_id: 108, is_improvement: 1},
            { id: 108 , head_id: 1, risk_id: 109, is_improvement: 1},
            { id: 109 , head_id: 1, risk_id: 110, is_improvement: 1},
            { id: 110 , head_id: 1, risk_id: 111, is_improvement: 1},
            { id: 111 , head_id: 1, risk_id: 112, is_improvement: 1},
           
            // // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.',  mainControl_id: 2 , head_id: 2, text: "การรักษาความปลอดภัยเกี่ยวกับบุคคล" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่ามีเครื่องมือ และอุปกรณ์ที่มีประสิทธิภาพเพียงพอต่อการรักษาความปลอดภัยเกี่ยวกับบุคคล"},
            { id: 202, id_control: '2.1', head_id: 2, text: "มีการอบรมชี้แจง ข้าราชการที่มีหน้าที่เกี่ยวข้องกับสิ่งที่เป็นความลับของทางราชการให้ทราบโดยละเอียดถึงความสำคัญและมาตรการของการรักษาความปลอดภัยเป็นครั้งคราวตามโอกาส" , is_subcontrol:0,  ischeckbox:1},
            { id: 203, id_control: '2.2', head_id: 2, text: "มีการลงคำสั่งเป็นลายลักษณ์อักษรแต่งตั้งบุคคลให้ทำหน้าที่เกี่ยวกับสิ่งที่เป็นความลับของทางราชการ" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "การรักษาความปลอดภัยเกี่ยวกับบุคคล" },
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 203, is_improvement: 1},

            // // -------------------------- 3 -------------------------- //
            { id: 301, id_control: '3.',  mainControl_id: 3 , head_id: 3, text: "การรักษาความปลอดภัยเกี่ยวกับสถานที่" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าเครื่องมือและอุปกรณ์ ที่มีประสิทธิภาพเพียงพอต่อการรักษาความปลอดภัยเกี่ยวกับสถานที่"},
            { id: 302, id_control: '3.1',  head_id: 3, text: "มีการกำหนดมาตรการ เพื่อรักษาความปลอดภัยแก่อาคาร สถานที่ วัสดุ อุปกรณ์ ในอาคารสถานที่ให้พ้นจากการโจรกรรม จารกรรม และการก่อวินาศกรรม" , is_subcontrol:0,  ischeckbox:1},
            { id: 303, id_control: '3.2',  head_id: 3, text: "ข้าราชการมีการติดป้ายแสดงตน เพื่อแสดงว่าเป็นผู้ที่ได้รับอนุญาตให้เข้าพื้นที่ได้" , is_subcontrol:0,  ischeckbox:1},
            { id: 304, id_control: '3.3',  head_id: 3, text: "การป้องกันอัคคีภัย มีการแต่งตั้งข้าราชการเป็นเจ้าหน้าที่ดับเพลิงโดยแบ่งเป็น ๒ กลุ่ม คือ กลุ่มที่มีหน้าที่ดับเพลิง และกลุ่มที่มีหน้าที่ขนย้าย" , is_subcontrol:0,  ischeckbox:1},
            { id: 305, id_control: '3.4',  head_id: 3, text: "มีหมายเลขโทรศัพท์ของหน่วยดับเพลิงและที่จำเป็นเพื่อ ติดต่อขอความช่วยเหลือหรือแจ้งเหตุให้ทราบ" , is_subcontrol:0,  ischeckbox:1},
            { id: 306, id_control: '3.5',  head_id: 3, text: "ข้าราชการได้รับการอบรมชี้แจงเกี่ยวกับขั้นตอนการปฏิบัติเมื่อเกิดอัคคีภัย เส้นทางอพยพและขนย้ายและการใช้เครื่องมือ ดับเพลิงเบื้องต้น" , is_subcontrol:0,  ischeckbox:1},
            { id: 307, id_control: '3.6',  head_id: 3, text: "มีการจัดลำดับความสำคัญในการขนย้ายพัสดุ สิ่งของเอกสารภายในสำนักงาน และมีการปิดป้ายหมายเลขไว้" , is_subcontrol:0,  ischeckbox:1},
    
            { id: 1007 , head_id: 3, sum_id: 301, value:  '', text: "การรักษาความปลอดภัยเกี่ยวกับสถานที่" },
            { id: 1008 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 301 , head_id: 3, risk_id: 302, is_improvement: 1},
            { id: 302 , head_id: 3, risk_id: 303, is_improvement: 1},
            { id: 303 , head_id: 3, risk_id: 304, is_improvement: 1},
            { id: 304 , head_id: 3, risk_id: 305, is_improvement: 1},
            { id: 305 , head_id: 3, risk_id: 306, is_improvement: 1},
            { id: 306 , head_id: 3, risk_id: 307, is_improvement: 1},

            // // -------------------------- 4 -------------------------- //
            { id: 401, id_control: '4.',  mainControl_id: 4 , head_id: 4, text: "ความพร้อมในการดำเนินงานด้านการข่าว" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าการดำเนินงาน ด้านการข่าว มีแนวทางการบริหารจัดการเพียงพอให้การปฏิบัติงาน ด้านการข่าวบรรลุภารกิจของหน่วย"},
            { id: 402, id_control: '4.1', head_id: 4, text: "มีการจัดทำแผนการปฏิบัติงานด้านการข่าวของหน่วย" , is_subcontrol:1},
            { id: 403, id_control: '4.1', id_subcontrol: '4.1.1', head_id: 4, text: "ระยะสั้น" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 404, id_control: '4.1', id_subcontrol: '4.1.2', head_id: 4, text: "ระยะปานกลาง" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 405, id_control: '4.2', head_id: 4, text: "มีการกำหนดผู้รับผิดชอบหลัก ผู้รับผิดชอบรอง ผู้ปฏิบัติและหน่วยสนับสนุนในการปฏิบัติงานด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 406, id_control: '4.3', head_id: 4, text: 'มีการจัดทำแผนรวบรวมข่าวสาร เพื่อแบ่งมอบภารกิจ/เป้าหมายในการรวบรวมข่าวอย่างชัดเจน' , is_subcontrol:0,  ischeckbox:1},
            { id: 407, id_control: '4.4', head_id: 4 ,text: "กำลังพลในหน่วยมีความเข้าใจหน้าที่และความรับผิดชอบในการดำเนินงานด้านการข่าวของตนเอง" , is_subcontrol:0,  ischeckbox:1},
            { id: 408, id_control: '4.5', head_id: 4 ,text: "มีงบประมาณที่ใช้ในการปฏิบัติงานด้านการข่าวอย่างเพียงพอ" , is_subcontrol:0,  ischeckbox:1},
            { id: 409, id_control: '4.6', head_id: 4 ,text: "มีการกำหนดวงรอบการรายงานข่าวสารอย่างเป็นระบบ" , is_subcontrol:0,  ischeckbox:1},
            { id: 410, id_control: '4.7', head_id: 4 ,text: "มีขีดความสามารถในการฝึกอบรมให้กำลังพลมีความรู้ความสามารถในการปฏิบัติงานด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 411, id_control: '4.8', head_id: 4 ,text: "มีแผนการฝึกอบรมเพิ่มเติมหรือการฝึกทบทวนทั้งในระยะสั้นหรือระยะปานกลาง เพื่อพัฒนาให้กำลังพลมีความพร้อมและประสบการณ์ เพิ่มมากขึ้น" , is_subcontrol:0,  ischeckbox:1},
            { id: 412, id_control: '4.9', head_id: 4 ,text: "มีการสนับสนุนการฝึก ศึกษา และอบรม ทั้งจากภายในและภายนอก ทร." , is_subcontrol:0,  ischeckbox:1},
            { id: 413, id_control: '4.10',head_id: 4 ,text: "มีการประชุมหน่วยเกี่ยวข้องเพื่อประสานงานและแก้ไข ปัญหาที่เกิดขึ้นในการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 414, id_control: '4.11',head_id: 4 ,text: "กำลังพลมีความเข้าใจแผนปฏิบัติงานด้านการข่าว หรือแผนรวบรวมข่าวสาร" , is_subcontrol:0,  ischeckbox:1},
            { id: 415, id_control: '4.12',head_id: 4 ,text: "มีการจัดทำแผน และมาตรการ การรักษาความปลอดภัย" , is_subcontrol:1},
            { id: 416, id_control: '4.12', id_subcontrol: '4.12.1', head_id: 4, text: "ด้านสถานที่" ,is_innercontrol:0,  ischeckbox:1},
            { id: 417, id_control: '4.12', id_subcontrol: '4.12.2', head_id: 4, text: "ด้านเอกสาร" ,is_innercontrol: 0,  ischeckbox:1},
            { id: 418, id_control: '4.12', id_subcontrol: '4.12.3', head_id: 4, text: "ด้านบุคคล" ,is_innercontrol: 0,  ischeckbox:1},
    
            { id: 419, id_control: '4.13',head_id: 4 ,text: "มีการจัดทำแผนต่อต้านข่าวกรอง" , is_subcontrol:0,  ischeckbox:1},
            { id: 420, id_control: '4.14',head_id: 4 ,text: "มีการจัดหาแหล่งข่าว เพื่อรวบรวมข่าวสารทั้งภายในและภายนอกประเทศ" , is_subcontrol:0,  ischeckbox:1},
            { id: 421, id_control: '4.15',head_id: 4 ,text: "มีการจัดหาแหล่งข่าวเพิ่มเติม เพื่อให้เพียงพอต่อการรวบรวม ข้อมูลหรือข่าวสาร ตามเป้าหมายด้านการข่าวที่เพิ่มมากขึ้น" , is_subcontrol:0,  ischeckbox:1},
            { id: 422, id_control: '4.16',head_id: 4 ,text: "มีการกระจายข้อมูลข่าวสารหรือข่าวกรองไปยังหน่วยที่จำเป็นต้องใช้" , is_subcontrol:0,  ischeckbox:1},
            { id: 423, id_control: '4.17',head_id: 4 ,text: "มีการจัดเก็บข้อมูลด้านการข่าว อย่างเป็นระบบ" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1010 , head_id: 4, sum_id: 101, value: '',  text: "ความพร้อมในการดำเนินงานด้านการข่าว" },
            { id: 1011 , head_id: 4, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1012 , head_id: 4, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 401 , head_id: 4, risk_id: 403, is_improvement: 1},
            { id: 402 , head_id: 4, risk_id: 404, is_improvement: 1},
            { id: 403 , head_id: 4, risk_id: 405, is_improvement: 1},
            { id: 404 , head_id: 4, risk_id: 406, is_improvement: 1},
            { id: 405 , head_id: 4, risk_id: 407, is_improvement: 1},
            { id: 406 , head_id: 4, risk_id: 408, is_improvement: 1},
            { id: 407 , head_id: 4, risk_id: 409, is_improvement: 1},
            { id: 408 , head_id: 4, risk_id: 410, is_improvement: 1},
            { id: 409 , head_id: 4, risk_id: 411, is_improvement: 1},
            { id: 410 , head_id: 4, risk_id: 412, is_improvement: 1},
            { id: 411 , head_id: 4, risk_id: 413, is_improvement: 1},
            { id: 412 , head_id: 4, risk_id: 414, is_improvement: 1},
            { id: 413 , head_id: 4, risk_id: 416, is_improvement: 1},
            { id: 414 , head_id: 4, risk_id: 417, is_improvement: 1},
            { id: 415 , head_id: 4, risk_id: 418, is_improvement: 1},
            { id: 416 , head_id: 4, risk_id: 419, is_improvement: 1},
            { id: 417 , head_id: 4, risk_id: 420, is_improvement: 1},
            { id: 418 , head_id: 4, risk_id: 421, is_improvement: 1},
            { id: 419 , head_id: 4, risk_id: 422, is_improvement: 1},
            { id: 420 , head_id: 4, risk_id: 423, is_improvement: 1},

            // -------------------------- 5 -------------------------- //
            { id: 501, id_control: '5.',  mainControl_id: 5 , head_id: 5, text: "เครื่องมือและอุปกรณ์ที่ใช้ในงานด้านการข่าว" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าเครืองมือและอุปกรณ์ที่มีประสิทธิภาพเพียงพอต่อการปฏิบัติงานด้านการข่าว"},
            { id: 502, id_control: '5.1',  head_id: 5, text: "มีการจัดหาเครื่องมือ อุปกรณ์ และยานพาหนะด้านการข่าว ที่มีความทันสมัยและประสิทธิภาพเพียงพอต่อการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 503, id_control: '5.2',  head_id: 5, text: "มีการลงทะเบียนครุภัณฑ์และจัดทำรายการแจกจ่ายเครื่องมือและอุปกรณ์ถูกต้องตามระเบียบ รวมทั้งมีการตรวจสอบประจำปี" , is_subcontrol:0,  ischeckbox:1},
            { id: 504, id_control: '5.3',  head_id: 5, text: "มีสถานที่เก็บเครื่องมือและอุปกรณ์ที่มีความปลอดภัย" , is_subcontrol:0,  ischeckbox:1},
            { id: 505, id_control: '5.4',  head_id: 5, text: "มีการจัดทำแผน เพื่อจัดหาและซ่อมบำรุงเครื่องมือและ อุปกรณ์ด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 506, id_control: '5.5',  head_id: 5, text: "มีการดำเนินการจำหน่ายเครื่องมือและอุปกรณ์ด้านการข่าว ที่ชำรุดหรือหมดความจำเป็นในการใช้งาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 507, id_control: '5.6',  head_id: 5, text: "มีการนำระบบเทคโนโลยีสารสนเทศมาใช้ในการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
    
            { id: 1013 , head_id: 5, sum_id: 501, value:  '', text: "เครื่องมือและอุปกรณ์ที่ใช้ในงานด้านการข่าว" },
            { id: 1014 , head_id: 5, sum_id: 502, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1015 , head_id: 5, sum_id: 503, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 501 , head_id: 5, risk_id: 502, is_improvement: 1},
            { id: 502 , head_id: 5, risk_id: 503, is_improvement: 1},
            { id: 503 , head_id: 5, risk_id: 504, is_improvement: 1},
            { id: 504 , head_id: 5, risk_id: 505, is_improvement: 1},
            { id: 505 , head_id: 5, risk_id: 506, is_improvement: 1},
            { id: 506 , head_id: 5, risk_id: 507, is_improvement: 1},
    
            // -------------------------- 6 -------------------------- //
            { id: 601, id_control: '6.',   head_id: 6, mainControl_id: 6 , main_Obj:"วัตถุประสงค์ของการควบคุม",text: "การปฏิบัติงานด้านการข่าว" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่ากำลังพล มีเพียงพอที่จะปฏิบัติงานด้านการข่าว มีความรู้ ความชำนาญ ในการ วิเคราะห์ข่าว และปฏิบัติตามกฎ ระเบียบ ข้อบังคับหรือมาตรการเกี่ยวกับการรักษาความปลอดภัยโดยเคร่งครัดรวมทั้งมีแนวทางในการบริหารงานด้านบุคคลากรด้านการข่าว"},
            { id: 602, id_control: '6.1', head_id: 6, text: "มีการกำหนดคุณสมบัติของกำลังพลที่ปฏิบัติงานด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 603, id_control: '6.2', head_id: 6, text: "ระบบการรายงานข้อมูลด้านการข่าวมีความรวดเร็ว ทันต่อเหตุการณ์ และการตัดสินใจของผู้บังคับบัญชา" , is_subcontrol:0,  ischeckbox:1},
            { id: 604, id_control: '6.3', head_id: 6, text: 'มีการฝึกอบรมให้เจ้าหน้าที่มีความรู้ ความชำนาญในการใช้เครื่องมือ อุปกรณ์ หรือระบบสารสนเทศด้านการข่าว' , is_subcontrol:0,  ischeckbox:1},
            { id: 605, id_control: '6.4', head_id: 6 ,text: "มีการฝึกอบรมเพื่อให้ความรู้ ความชำนาญและประสบการณ์ในการปฏิบัติงานด้านการข่าว โดยเฉพาะในการวิเคราะห์ข่าวสาร" , is_subcontrol:0,  ischeckbox:1},
            { id: 606, id_control: '6.5', head_id: 6 ,text: "มีการสรรหาหรือคัดเลือกกำลังพลที่มีขีดความสามารถและเหมาะสม เพื่อให้มาปฏิบัติงานด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 607, id_control: '6.6', head_id: 6 ,text: "มีแนวทางในการบริหารบุคลากร และมีสิ่งจูงใจในการปฏิบัติงาน ให้กำลังพลด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 608, id_control: '6.7', head_id: 6 ,text: "มีกำลังพลเพียงพอในการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 609, id_control: '6.8', head_id: 6 ,text: "มีนักวิเคราะห์ข่าวในการปฏิบัติงานด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 610, id_control: '6.9', head_id: 6 ,text: "มีการตรวจสอบขีดความสามารถ และความไว้วางใจ บุคคลของกำลังพลที่ปฏิบัติงานด้านการข่าวของหน่วย" , is_subcontrol:0,  ischeckbox:1},
            { id: 611, id_control: '6.10',head_id: 6 ,text: "มีการประชุมหน่วยเกี่ยวข้องเพื่อประสานงานและแก้ไข ปัญหาที่เกิดขึ้นในการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 612, id_control: '6.11',head_id: 6 ,text: "มีการปฏิบัติตามกฎ ระเบียบ ข้อบังคับ ด้านการรักษาความปลอดภัยและด้านการข่าว" , is_subcontrol:0,  ischeckbox:1},
            { id: 613, id_control: '6.12',head_id: 6 ,text: "มีการกวดขันกำลังพลให้ปฏิบัติตามกฎ ระเบียบ ข้อบังคับหรือมาตรการที่เกี่ยวกับการรักษาความปลอดภัย" , is_subcontrol:0,  ischeckbox:1},
            { id: 614, id_control: '6.13',head_id: 6 ,text: "มีการลงโทษผู้ละเมิดกฎ ระเบียบ ข้อบังคับหรือมาตรการรักษาความปลอดภัย หรือมีมาตรการการลงโทษผู้ละเมิด ดังกล่าว", is_subcontrol:0,  ischeckbox:1 },
            { id: 615, id_control: '6.14',head_id: 6 ,text: "มีการปรับปรุงกฎ ระเบียบ ข้อบังคับหรือมาตรการรักษาความปลอดภัย เพื่อให้ทันกับการเปลี่ยนแปลงของสถานการณ์ในปัจจุบัน" , is_subcontrol:0,  ischeckbox:1},
            { id: 616, id_control: '6.15',head_id: 6 ,text: "มีแนวทางการสร้างเสริมจิตสำนึกในการปฏิบัติงานด้านการข่าวให้กับกำลังพลทั่วไปของหน่วย", is_subcontrol:0,  ischeckbox:1 },
            { id: 617, id_control: '6.16',head_id: 6 ,text: "มีการประเมินผลการปฏิบัติและทบทวน ปรับปรุงแก้ไขแผนรวบรวมข่าวสารให้ทันสมัย", is_subcontrol:0,  ischeckbox:1 },
            
            { id: 1016 , head_id: 6, sum_id: 601, value: '',  text: "การปฏิบัติงานด้านการข่าว" },
            { id: 1017 , head_id: 6, sum_id: 602, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1018 , head_id: 6, sum_id: 603, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 601 , head_id: 6, risk_id: 602, is_improvement: 1},
            { id: 602 , head_id: 6, risk_id: 603, is_improvement: 1},
            { id: 603 , head_id: 6, risk_id: 604, is_improvement: 1},
            { id: 604 , head_id: 6, risk_id: 605, is_improvement: 1},
            { id: 605 , head_id: 6, risk_id: 606, is_improvement: 1},
            { id: 606 , head_id: 6, risk_id: 607, is_improvement: 1},
            { id: 607 , head_id: 6, risk_id: 608, is_improvement: 1},
            { id: 608 , head_id: 6, risk_id: 609, is_improvement: 1},
            { id: 609 , head_id: 6, risk_id: 610, is_improvement: 1},
            { id: 610 , head_id: 6, risk_id: 611, is_improvement: 1},
            { id: 611 , head_id: 6, risk_id: 612, is_improvement: 1},
            { id: 612 , head_id: 6, risk_id: 613, is_improvement: 1},
            { id: 613 , head_id: 6, risk_id: 614, is_improvement: 1},
            { id: 614 , head_id: 6, risk_id: 615, is_improvement: 1},
            { id: 615 , head_id: 6, risk_id: 616, is_improvement: 1},
            { id: 616 , head_id: 6, risk_id: 617, is_improvement: 1},
        ];
    } else if (data == 'branchlogistics') { //  branchlogistics
        str = [
            // -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "กิจกรรมทั่วไป" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การปฏิบัติเป็นไปตาม นโยบาย กฎหมาย ระเบียบ มติคณะรัฐมนตรี คำสั่งที่เกี่ยวกับงานด้านการส่งกำลังบำรุง และที่เกี่ยวข้อง"},
            { id: 102, id_control: '1.1', head_id: 1, text: "มีนโยบาย กฎหมาย ระเบียบ มติคณะรัฐมนตรี คำสั่งที่เกี่ยวกับงานด้านการส่งกำลังบำรุง และที่เกี่ยวข้องกำหนดไว้ สามารถอ้างอิงได้" , is_subcontrol:0,  ischeckbox:1},
            { id: 103, id_control: '1.2', head_id: 1, text: "เจ้าหน้าที่มีวิธีการติดตาม การจัดหาพัสดุยุทโธปกรณ์ที่ได้กำหนดไว้ในแผนการจัดซื้อจัดจ้างประจำปี" , is_subcontrol:0,  ischeckbox:1},
            { id: 104, id_control: '1.3', head_id: 1, text: "การปรับแผนหรือโครงการ ไม่ส่งผลกระทบต่อการดำเนินการจัดหาพัสดุยุทโธปกรณ์ตามกรอบของเวลา" , is_subcontrol:0,  ischeckbox:1},
            { id: 105, id_control: '1.4', head_id: 1 ,text: "มีการฝึกอบรมให้ความรู้และกำหนดแนวทางการปฏิบัติงานในสายงานส่งกำลังบำรุง" , is_subcontrol:0,  ischeckbox:1},
            { id: 106, id_control: '1.5', head_id: 1 ,text: "มีการลงโทษทางวินัย และอาญาในกรณีเจ้าหน้าที่กระทำผิดฝ่าฝืนกฎหมาย ระเบียบ มติคณะรัฐมนตรี และคำสั่งที่เกี่ยวข้อง" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "กิจกรรมทั่วไป"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 105, is_improvement: 1},
            { id: 105 , head_id: 1, risk_id: 106, is_improvement: 1},

            // // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.',  head_id: 2, mainControl_id: 2 , text: "กิจกรรมการส่งกำลัง" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การบริหารจัดการพัสดุเป็นไปตามแผนและความต้องการ ที่ได้กำหนดไว้โดยถูกต้องตามระเบียบทำให้กำลังพลที่ปฏิบัติภารกิจตามปกติได้รับการส่งกำลัง รวมทั้งมีความพร้อมในการส่งกำลังในภาวะไม่ปกติ"},
           
            // // -------------------------- 2.1 -------------------------- //
            { id: 202, id_control: '2.1', head_id: 2, text: "การกำหนดความต้องการ" , is_subcontrol:1},
            { id: 203, id_control: '2.1', id_subcontrol: '2.1.1', head_id: 2, text: "ผู้ใช้พัสดุเป็นผู้กำหนดความต้องการ" , is_subcontrol:0,  ischeckbox:1},
            { id: 204, id_control: '2.1', id_subcontrol: '2.1.2', head_id: 2, text: "มีการกำหนดระยะเวลา การแจ้งความต้องการพัสดุหรือขอให้จัดหาไว้อย่างเหมาะสมและเพียงพอสำหรับการจัดหาเพื่อป้องกันการจัดหาโดยวิธีพิเศษ โดยอ้างความเร่งด่วน" , is_subcontrol:0,  ischeckbox:1},
            { id: 205, id_control: '2.1', id_subcontrol: '2.1.3', head_id: 2, text: "การแจ้งความต้องการพัสดุหรือขอให้จัดหา (รายงานการขอจัดซื้อหรือจ้าง) ได้ระบุรายการหรือประเภทพัสดุ ปริมาณพัสดุ กำหนดเวลาที่ต้องการอย่างละเอียดและชัดเจน" , is_subcontrol:0,  ischeckbox:1},
            
            // // -------------------------- 2.2 -------------------------- //
            { id: 206, id_control: '2.2', head_id: 2, text: "การจัดหา" , is_subcontrol:1},
            { id: 207, id_control: '2.2', id_subcontrol: '2.2.1', head_id: 2, text: "การดำเนินการจัดหา เป็นไปตามแผนปฏิบัติราชการ หรือแผนการจัดซื้อจัดจ้างประจำปี" , is_subcontrol:0,  ischeckbox:1},
            { id: 208, id_control: '2.2', id_subcontrol: '2.2.2', head_id: 2, text: "มีการติดตาม ควบคุม ตรวจสอบ การปฏิบัติตามแผนปฏิบัติราชการ หรือแผนการจัดซื้อจัดจ้างประจำปี เช่น มีระเบียบ แนวทางปฏิบัติ" , is_subcontrol:0,  ischeckbox:1},
            { id: 209, id_control: '2.2', id_subcontrol: '2.2.3', head_id: 2, text: "การจัดหาไม่มีอุปสรรคที่มีผลให้ไม่สามารถดำเนินการได้" , is_subcontrol:0,  ischeckbox:1},
            { id: 210, id_control: '2.2', id_subcontrol: '2.2.4', head_id: 2, text: "มีการประเมินความพึงพอใจของหน่วยผู้ใช้บริการ/ผู้รับบริการ" , is_subcontrol:0,  ischeckbox:1},

            // // -------------------------- 2.3 -------------------------- //
            { id: 211, id_control: '2.3', head_id: 2, text: "การควบคุมและการเก็บรักษา" , is_subcontrol:1},
            { id: 212, id_control: '2.3', id_subcontrol: '2.3.1', head_id: 2, text: "มีการขึ้นทะเบียนคุมทรัพย์สินถูกต้องครบถ้วนตามระเบียบ และเป็นปัจจุบัน" , is_subcontrol:0,  ischeckbox:1},
            { id: 213, id_control: '2.3', id_subcontrol: '2.3.2', head_id: 2, text: "สถานที่จัดเก็บพัสดุ เก็บไว้ในที่ปลอดภัยและเป็นระเบียบเรียบร้อย" , is_subcontrol:0,  ischeckbox:1},
            { id: 214, id_control: '2.3', id_subcontrol: '2.3.3', head_id: 2, text: "มีการลงบัญชี/ทะเบียนพัสดุ โดยแยกเป็นประเภทและรายการโดยถูกต้อง ครบถ้วน" , is_subcontrol:0,  ischeckbox:1},

            // // -------------------------- 2.4 -------------------------- //
            { id: 215, id_control: '2.4', head_id: 2, text: "การแจกจ่าย มีระบบ/กระบวนการที่สามารถทำให้พัสดุส่งถึงผู้ใช้ได้อย่างถูกต้องและทันเวลาที่ต้องการใช้งาน" , is_subcontrol:0,  ischeckbox:1},
            
            // // -------------------------- 2.5 -------------------------- //
            { id: 216, id_control: '2.5', head_id: 2, text: "การจำหน่ายพัสดุ" , is_subcontrol:1},
            { id: 217, id_control: '2.5', id_subcontrol: '2.5.1', head_id: 2, text: "มีการลงบัญชี/ทะเบียนทันทีที่มีการจำหน่ายพัสดุออกไป" , is_subcontrol:0,  ischeckbox:1},
            { id: 218, id_control: '2.5', id_subcontrol: '2.5.2', head_id: 2, text: "กรณีมีการจำหน่ายพัสดุเป็นสูญ ได้รับการอนุมัติโดยผู้มีอำนาจ" , is_subcontrol:0,  ischeckbox:1},

            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "กิจกรรมการส่งกำลัง" },
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 203, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 204, is_improvement: 1},
            { id: 203 , head_id: 2, risk_id: 205, is_improvement: 1},
            { id: 204 , head_id: 2, risk_id: 207, is_improvement: 1},
            { id: 205 , head_id: 2, risk_id: 208, is_improvement: 1},
            { id: 206 , head_id: 2, risk_id: 209, is_improvement: 1},
            { id: 207 , head_id: 2, risk_id: 210, is_improvement: 1},
            { id: 208 , head_id: 2, risk_id: 212, is_improvement: 1},
            { id: 209 , head_id: 2, risk_id: 213, is_improvement: 1},
            { id: 210 , head_id: 2, risk_id: 214, is_improvement: 1},
            { id: 211 , head_id: 2, risk_id: 217, is_improvement: 1},
            { id: 212 , head_id: 2, risk_id: 218, is_improvement: 1},
         
            // -------------------------- 3 -------------------------- //
            { id: 301, id_control: '3.',   head_id: 3,  mainControl_id: 3 ,text: "กิจกรรมการซ่อมบำรุง" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การซ่อมบำรุงยุทโธปกรณ์ของกองทัพเรือ เป็นไปตามแผน และความต้องการที่ได้กำหนดไว้ โดยถูกต้องตามกฎหมาย ระเบียบ และคำสั่งที่เกี่ยวข้อง เพื่อให้กำลังรบสามารถปฏิบัติภารกิจได้อย่าง มีประสิทธิภาพและประสิทธิผล"},
            
            // -------------------------- 3.1 -------------------------- //
            { id: 302, id_control: '3.1',  head_id: 3, text: "การซ่อมทำ" , is_subcontrol:1},
            { id: 303, id_control: '3.1', id_subcontrol: '3.1.1', head_id: 3, text: "มีคู่มือ/เอกสารอ้างอิงในการซ่อมบำรุง" , is_subcontrol:0,  ischeckbox:1},
            { id: 304, id_control: '3.1', id_subcontrol: '3.1.2', head_id: 3, text: "มีการกำหนดแผนการซ่อมทำยุทโธปกรณ์ประจำปี" , is_subcontrol:0,  ischeckbox:1},
            { id: 305, id_control: '3.1', id_subcontrol: '3.1.3', head_id: 3, text: "มีการกำหนดรายการอุปกรณ์ของยุทโธปกรณ์ต่าง ๆ ที่ต้องได้รับการซ่อมบำรุงในแต่ละระดับการซ่อมบำรุง" , is_subcontrol:0,  ischeckbox:1},
            { id: 306, id_control: '3.1', id_subcontrol: '3.1.4', head_id: 3, text: "มีการตรวจสอบ/ควบคุม/เร่งรัดการดำเนินการให้เป็นไปตามแผนการซ่อมบำรุง/ตารางการปฏิบัติในการซ่อมบำรุง" , is_subcontrol:0,  ischeckbox:1},
            { id: 307, id_control: '3.1', id_subcontrol: '3.1.5', head_id: 3, text: "มีการติดตามและประเมินผลการซ่อมบำรุง" , is_subcontrol:0,  ischeckbox:1},
            { id: 308, id_control: '3.1', id_subcontrol: '3.1.6', head_id: 3, text: "มีการทบทวน/สรุปผลการซ่อมบำรุง เพื่อเป็นข้อมูลในการปรับปรุงแผนการซ่อมบำรุง/ตารางการปฏิบัติในการซ่อมบำรุงต่อไป" , is_subcontrol:0,  ischeckbox:1},

            // -------------------------- 3.2 -------------------------- //
            { id: 309, id_control: '3.2',  head_id: 3, text: "มีการอบรมให้ความรู้และกำหนดแนวทางการปฏิบัติของเจ้าหน้าที่ที่เกี่ยวข้องกับการซ่อมบำรุง" , is_subcontrol:0,  ischeckbox:1},
     
            { id: 1007 , head_id: 3, sum_id: 301, value:  '', text: "กิจกรรมการซ่อมบำรุง" },
            { id: 1008 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 301 , head_id: 3, risk_id: 303, is_improvement: 1},
            { id: 302 , head_id: 3, risk_id: 304, is_improvement: 1},
            { id: 303 , head_id: 3, risk_id: 305, is_improvement: 1},
            { id: 304 , head_id: 3, risk_id: 306, is_improvement: 1},
            { id: 305 , head_id: 3, risk_id: 307, is_improvement: 1},
            { id: 306 , head_id: 3, risk_id: 308, is_improvement: 1},
            { id: 307 , head_id: 3, risk_id: 309, is_improvement: 1},

            // // -------------------------- 4 -------------------------- //
            { id: 401, id_control: '4.',  head_id: 4,  mainControl_id: 4 ,text: "กิจกรรมการพัฒนาฐานทัพและอสังหาริมทรัพย์" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าการพัฒนาฐานทัพมีแผนหรือโครงการงานจ้างก่อสร้าง และในด้านของที่ดิน มีการกำหนดเงื่อนไขตามกฎหมาย คำสั่ง ระเบียบมติคณะรัฐมนตรี รวมไปถึงมีการอบรมให้ความรู้กับเจ้าหน้าที่ที่เกี่ยวข้องในการงานจ้าง"},
            { id: 402, id_control: '4.1', head_id: 4, text: "การปรับเปลี่ยนแผนหรือโครงการงานจ้างก่อสร้าง ไม่ทำให้ระยะเวลาที่ใช้ในการดำเนินการกระชั้นชิด หรือไม่ทันเวลา" , is_subcontrol:0,  ischeckbox:1},
            { id: 403, id_control: '4.2', head_id: 4, text: "กำหนดเงื่อนไขการคัดเลือก บริษัทรับจ้างก่อสร้างเป็นไป ตามระเบียบ" , is_subcontrol:0,  ischeckbox:1},
            { id: 404, id_control: '4.3', head_id: 4, text: 'การจ้างก่อสร้างดำเนินการตามกฎหมาย ระเบียบ มติคณะรัฐมนตรี และคำสั่งที่เกี่ยวข้องอย่างเคร่งครัดทุกขั้นตอน' , is_subcontrol:0,  ischeckbox:1},
            { id: 405, id_control: '4.4', head_id: 4 ,text: "มีการฝึกอบรมให้ความรู้ และกำหนดแนวทางในการปฏิบัติงาน ของเจ้าหน้าที่ ที่เกี่ยวกับงานจ้างก่อสร้าง" , is_subcontrol:0,  ischeckbox:1},
            { id: 406, id_control: '4.5', head_id: 4 ,text: "ผู้รับจ้างก่อสร้างมีการขอขยายระยะเวลาทำการตามสัญญา" , is_subcontrol:0,  ischeckbox:1},

            // // -------------------------- 4.6 -------------------------- //
            { id: 407, id_control: '4.6', head_id: 4 ,text: "ด้านที่ดิน" , is_subcontrol:1},

            // // -------------------------- 4.6.1 -------------------------- //            
            // { id: 408, id_control: '4.6.1', head_id: 4.6, text: "มีคู่มือ/เอกสารอ้างอิงในการซ่อมบำรุง" , is_subcontrol:0,  ischeckbox:1},
            { id: 408, id_control: '4.6', id_subcontrol: '4.6.1', head_id: 4, text: "หน่วยใช้ประโยชน์ที่ดิน" ,is_innercontrol:1},
            { id: 409, id_control: '4.6', id_subcontrol: '4.6.1', id_innercontrol: '4.6.1.1', head_id: 4, text: "มีการตรวจตราดูแลที่ดิน สอดส่องดูแลและบำรุงรักษาที่ดินที่ได้รับอนุญาตให้ใช้ประโยชน์ ตามวงรอบที่กำหนด",is_innercontrol: 0,  ischeckbox:1},
            { id: 410, id_control: '4.6', id_subcontrol: '4.6.1', id_innercontrol: '4.6.1.2', head_id: 4, text: "เมื่อมีผู้บุกรุกหรือการกระทำใดๆ อันจะก่อให้เกิดความเสียหายต่อทรัพย์สินของทางราชการ มีการแต่งตั้งผู้แทนไปแจ้งความร้องทุกข์ต่อเจ้าหน้าที่ตำรวจในท้องที่ที่เกิดเหตุเพื่อดำเนินคดี ตามกฎหมายแก่ผู้บุกรุก",is_innercontrol: 0,  ischeckbox:1},

            // // -------------------------- 4.6.2 -------------------------- //                 
            { id: 411, id_control: '4.6', id_subcontrol: '4.6.2', head_id: 4, text: "หน่วยปกครองที่ดิน" ,is_innercontrol:1},
            { id: 412, id_control: '4.6', id_subcontrol: '4.6.2', id_innercontrol: '4.6.2.1', head_id: 4, text: "มีการตรวจตราดูแลที่ดิน สอดส่องดูแลและบำรุงรักษาที่ดินที่ได้รับอนุญาตให้ใช้ประโยชน์ และอยู่ในความปกครอง ตามวงรอบที่กำหนด",is_innercontrol: 0,  ischeckbox:1},
            { id: 413, id_control: '4.6', id_subcontrol: '4.6.2', id_innercontrol: '4.6.2.2', head_id: 4, text: "เมื่อมีผู้บุกรุกหรือการกระทำใด ๆ อันจะก่อให้เกิดความเสียหายต่อทรัพย์สินของทางราชการ มีการแต่งตั้งผู้แทนไปแจ้งความร้องทุกข์ต่อเจ้าหน้าที่ตำรวจในท้องที่ที่เกิดเหตุ เพื่อดำเนินคดี ตามกฎหมายแก่ผู้บุกรุก",is_innercontrol: 0,  ischeckbox:1},
            { id: 414, id_control: '4.6', id_subcontrol: '4.6.2', id_innercontrol: '4.6.2.3', head_id: 4, text: "จัดทำหลักฐานทะเบียนประวัติที่ดินกองทัพเรือที่อยู่ในความรับผิดชอบ โดยกำหนดขอบเขตและจัดทำผังพื้นที่ของหน่วยใช้ประโยชน์ที่ดินอย่างละเอียด",is_innercontrol: 0,  ischeckbox:1},
            { id: 415, id_control: '4.6', id_subcontrol: '4.6.2', id_innercontrol: '4.6.2.4', head_id: 4, text: "สำรวจและจัดทำแนวเขตที่ดินที่ตนปกครอง อยู่ให้ถูกต้องและชัดเจน รวมทั้งซ่อมแซมแนวเขตที่ดินเมื่อมีการชำรุดเสียหาย",is_innercontrol: 0,  ischeckbox:1},
            { id: 416, id_control: '4.6', id_subcontrol: '4.6.2', id_innercontrol: '4.6.2.5', head_id: 4, text: "ประสานหน่วยที่เกี่ยวข้องเพื่อดำเนินการขึ้นทะเบียนและจัดทำหนังสือสำคัญสำหรับที่หลวงแล้วแต่กรณีไว้เป็นหลักฐาน",is_innercontrol: 0,  ischeckbox:1},
        
            { id: 1010 , head_id: 4, sum_id: 101, value: '',  text: "กิจกรรมการพัฒนาฐานทัพและอสังหาริมทรัพย์" },
            { id: 1011 , head_id: 4, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1012 , head_id: 4, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 401 , head_id: 4, risk_id: 402, is_improvement: 1},
            { id: 402 , head_id: 4, risk_id: 403, is_improvement: 1},
            { id: 403 , head_id: 4, risk_id: 404, is_improvement: 1},
            { id: 404 , head_id: 4, risk_id: 405, is_improvement: 1},
            { id: 405 , head_id: 4, risk_id: 406, is_improvement: 1},
            { id: 406 , head_id: 4, risk_id: 409, is_improvement: 1},
            { id: 407 , head_id: 4, risk_id: 410, is_improvement: 1},
            { id: 408 , head_id: 4, risk_id: 412, is_improvement: 1},
            { id: 409 , head_id: 4, risk_id: 413, is_improvement: 1},
            { id: 410 , head_id: 4, risk_id: 414, is_improvement: 1},
            { id: 411 , head_id: 4, risk_id: 415, is_improvement: 1},
            { id: 412 , head_id: 4, risk_id: 416, is_improvement: 1},

            // -------------------------- 5 -------------------------- //
            { id: 501, id_control: '5.',    head_id: 5, mainControl_id: 5 , text: "กิจกรรมการขนส่ง" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าการขนส่งในด้านการส่งกำลังบำรุงมีการบริหารจัดการครอบคลุม ในเรื่องขององค์วัตถุ องค์บุคคล และองค์ยุทธวิธีมีการควบคุมที่เพียงพอต่อการปฏิบัติงาน"},
           
            // -------------------------- 5.1 -------------------------- //          
            { id: 502, id_control: '5.1',  head_id: 5, text: "ด้านการบริหารจัดการ" , is_subcontrol:1},
            { id: 503, id_control: '5.1', id_subcontrol: '5.1.1', head_id: 5, text: "การดำเนินการด้านการจัดการลำเลียงขนส่งแบบรวมการ" , is_subcontrol:0,  ischeckbox:1},
            { id: 504, id_control: '5.1', id_subcontrol: '5.1.2', head_id: 5, text: "มีการกำหนดหน้าที่ความรับผิดชอบที่ชัดเจนให้กับหน่วยที่ต้องดำเนินการ" , is_subcontrol:0,  ischeckbox:1},
            { id: 505, id_control: '5.1', id_subcontrol: '5.1.3', head_id: 5, text: "การขอใช้รถเพื่อการสวัสดิการของข้าราชการและลูกจ้างเป็นไปโดยประหยัด ไม่ส่งผลกระทบต่อภารกิจปกติของหน่วย" , is_subcontrol:0,  ischeckbox:1},
            { id: 506, id_control: '5.1', id_subcontrol: '5.1.4', head_id: 5, text: "หน่วยที่มีรถของตนเองใช้รถของหน่วยตนเองเป็นอันดับแรก" , is_subcontrol:0,  ischeckbox:1},
            { id: 507, id_control: '5.1', id_subcontrol: '5.1.5', head_id: 5, text: "พัสดุและสิ่งอำนวยความสะดวกด้านการขนส่งสามารถดำเนินการได้ตามวงรอบการส่งกำลัง" , is_subcontrol:0,  ischeckbox:1},
            
            // -------------------------- 5.2 -------------------------- //
            { id: 508, id_control: '5.2',  head_id: 5, text: "ด้านองค์วัตถุ" , is_subcontrol:1},
            { id: 509, id_control: '5.2', id_subcontrol: '5.2.1', head_id: 5, text: "มีรถเพียงพอต่อการใช้งานในภารกิจต่าง ๆ" , is_subcontrol:0,  ischeckbox:1},
            { id: 510, id_control: '5.2', id_subcontrol: '5.2.2', head_id: 5, text: "สามารถจัดหาชิ้นส่วนอะไหล่และการซ่อมบำรุงสามารถกระทำได้" , is_subcontrol:0,  ischeckbox:1},
           
            // -------------------------- 5.3 -------------------------- //
            { id: 511, id_control: '5.3',  head_id: 5, text: "ด้านองค์บุคคล" , is_subcontrol:1},
            { id: 512, id_control: '5.3', id_subcontrol: '5.3.1', head_id: 5, text: "พลขับดูแลเอาใจใส่ในการปรนนิบัติบำรุงรถให้ดี" , is_subcontrol:0,  ischeckbox:1},
            { id: 513, id_control: '5.3', id_subcontrol: '5.3.2', head_id: 5, text: "กำลังพลมีประสบการณ์ความรู้ความสามารถในการซ่อมทำระดับโรงงาน/ระดับศูนย์บริการรถยนต์" , is_subcontrol:0,  ischeckbox:1},
            
            // -------------------------- 5.4 -------------------------- //
            { id: 514, id_control: '5.4',  head_id: 5, text: "ด้านองค์ยุทธวิธี" , is_subcontrol:1},
            { id: 515, id_control: '5.4', id_subcontrol: '5.4.1', head_id: 5, text: "หลักนิยมและแนวทางการปฏิบัติในการลำเลียงขนส่งครอบคลุมทุกเรื่องของการลำเลียงขนส่งในยุทโธปกรณ์หลักแต่ละประเภท" , is_subcontrol:0,  ischeckbox:1},
            { id: 516, id_control: '5.4', id_subcontrol: '5.4.2', head_id: 5, text: "มีความชัดเจนในหน้าที่และความรับผิดชอบของทุกหน่วยที่เกี่ยวข้อง" , is_subcontrol:0,  ischeckbox:1},
            { id: 517, id_control: '5.4', id_subcontrol: '5.4.3', head_id: 5, text: "มีการทดสอบหลักนิยมและแนวทางการปฏิบัติในการลำเลียงขนส่ง" , is_subcontrol:0,  ischeckbox:1},
           
            { id: 1013 , head_id: 5, sum_id: 501, value:  '', text: "กิจกรรมการขนส่ง" },
            { id: 1014 , head_id: 5, sum_id: 502, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1015 , head_id: 5, sum_id: 503, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 501 , head_id: 5, risk_id: 503, is_improvement: 1},
            { id: 502 , head_id: 5, risk_id: 504, is_improvement: 1},
            { id: 503 , head_id: 5, risk_id: 505, is_improvement: 1},
            { id: 504 , head_id: 5, risk_id: 506, is_improvement: 1},
            { id: 505 , head_id: 5, risk_id: 507, is_improvement: 1},
            { id: 506 , head_id: 5, risk_id: 509, is_improvement: 1},
            { id: 507 , head_id: 5, risk_id: 510, is_improvement: 1},
            { id: 508 , head_id: 5, risk_id: 512, is_improvement: 1},
            { id: 509 , head_id: 5, risk_id: 513, is_improvement: 1},
            { id: 510 , head_id: 5, risk_id: 515, is_improvement: 1},
            { id: 511 , head_id: 5, risk_id: 516, is_improvement: 1},
            { id: 512 , head_id: 5, risk_id: 517, is_improvement: 1},

            // -------------------------- 6 -------------------------- //
            { id: 601, id_control: '6.',  head_id: 6, mainControl_id: 6 ,text: "กิจกรรมการบริการทางการแพทย์" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้กำลังพลมีความรู้ความเข้าใจในการดูแลตนเองและหน่วยงาน ให้มีสุขอนามัยที่ดี และเพิ่มประสิทธิภาพการปฏิบัติภารกิจประจำ"},
            
            // -------------------------- 6.1 -------------------------- //
            { id: 602, id_control: '6.1', head_id: 6, text: "เวชกรรมป้องกัน" , is_subcontrol:1},
            { id: 603, id_control: '6.1', id_subcontrol: '6.1.1', head_id: 6, text: "กำลังพลมีความรู้เข้าใจในการดูแลสุขภาพด้วยตนเอง (SELF CARE) และการเพิ่มประสิทธิภาพของการปฏิบัติภารกิจประจำที่สนับสนุน กำลังพลและครอบครัว" , is_subcontrol:0,  ischeckbox:1},
            { id: 604, id_control: '6.1', id_subcontrol: '6.1.2', head_id: 6, text: "จัดหาครุภัณฑ์/อุปกรณ์สำหรับการตรวจสอบสมรรถภาพกำลังพลเพิ่มเติม โดยพิจารณาแจกจ่ายไปตามหน่วยต่าง ๆ ตามความเหมาะสม" , is_subcontrol:0,  ischeckbox:1},
            { id: 605, id_control: '6.1', id_subcontrol: '6.1.3', head_id: 6, text: "มีการสำรวจประเมินสถานการณ์ปฏิบัติงานที่เสี่ยงต่อการเป็นอันตรายต่อสุขภาพ" , is_subcontrol:0,  ischeckbox:1},
            { id: 606, id_control: '6.1', id_subcontrol: '6.1.4', head_id: 6, text: "มีประชาสัมพันธ์ให้กำลังพลได้รับรู้/ทราบวิธีการดูแลสุขภาพด้วยตนเอง" , is_subcontrol:0,  ischeckbox:1},

            // -------------------------- 6.2 -------------------------- //
            { id: 607, id_control: '6.2', head_id: 6, text: "การรักษาพยาบาล" , is_subcontrol:1},
            { id: 608, id_control: '6.2', id_subcontrol: '6.2.1', head_id: 6, text: "ให้บริการข้าราชการในสังกัดให้มีคุณภาพและประสิทธิภาพอย่างสูงสุด" , is_subcontrol:0,  ischeckbox:1},
            { id: 609, id_control: '6.2', id_subcontrol: '6.2.2', head_id: 6, text: "มีการทบทวนการรักษาพยาบาลผู้ป่วยเจ็บโรคทางเวชศาสตร์ใต้น้ำให้กับกำลังพลสายแพทย์" , is_subcontrol:0,  ischeckbox:1},
            { id: 610, id_control: '6.2', id_subcontrol: '6.2.3', head_id: 6, text: "มีแพทย์/พยาบาลเวชศาสตร์ใต้น้ำเพื่อสนับสนุนงานการรักษาโรค" , is_subcontrol:0,  ischeckbox:1},

            // -------------------------- 6.3 -------------------------- //
            { id: 611, id_control: '6.3', head_id: 6, text: 'การส่งกำลังสายแพทย์' , is_subcontrol:1},
            { id: 612, id_control: '6.3', id_subcontrol: '6.3.1', head_id: 6, text: "การส่งกำลังสายแพทย์" , is_subcontrol:0,  ischeckbox:1},
            { id: 613, id_control: '6.3', id_subcontrol: '6.3.2', head_id: 6, text: "มีการนำระบบสารสนเทศมาช่วยดำเนินการ" , is_subcontrol:0,  ischeckbox:1},
            { id: 614, id_control: '6.3', id_subcontrol: '6.3.3', head_id: 6, text: "การซ่อมบำรุงสายแพทย์ โดยเฉพาะเครื่องมือ/ครุภัณฑ์ เป็นไปอย่างมีประสิทธิภาพ" , is_subcontrol:0,  ischeckbox:1},
            { id: 615, id_control: '6.3', id_subcontrol: '6.3.4', head_id: 6, text: "รถพยาบาล/อุปกรณ์สายแพทย์รถพยาบาลของ โรงพยาบาลประจำฐานทัพ มีความพร้อมในการส่งกลับผู้ป่วย" , is_subcontrol:0,  ischeckbox:1},
            { id: 616, id_control: '6.3', id_subcontrol: '6.3.5', head_id: 6, text: "จัดทำบัญชีรายการยา/เวชภัณฑ์ ครุภัณฑ์และเครื่องมือแพทย์ที่มีความจำเป็น" , is_subcontrol:0,  ischeckbox:1},
            { id: 617, id_control: '6.3', id_subcontrol: '6.3.6', head_id: 6, text: "กำหนดรายการเครื่องมือแพทย์/ยา/เวชภัณฑ์ เพื่อการรองรับสถานการณ์สู้รบที่สอดคล้องกับแผนปฏิบัติการของ ทร." , is_subcontrol:0,  ischeckbox:1},
            { id: 618, id_control: '6.3', id_subcontrol: '6.3.7', head_id: 6, text: "มีการฝึกซ้อมแผนระดมเครื่องมือแพทย์ตามสถานการณ์ที่วางแผน" , is_subcontrol:0,  ischeckbox:1},
            { id: 619, id_control: '6.3', id_subcontrol: '6.3.8', head_id: 6, text: "การจัดทำบัญชีรายละเอียดแหล่งการจัดหายาเวชภัณฑ์ อุปกรณ์การแพทย์ จากภาคเอกชนที่เคยดำเนินการมาจัดเก็บเป็นข้อมูลพื้นฐานในระบบสารสนเทศ พร." , is_subcontrol:0,  ischeckbox:1},
           
            // -------------------------- 6.4 -------------------------- //
            { id: 620, id_control: '6.4', head_id: 6 ,text: "การส่งกลับสายแพทย์" , is_subcontrol:1},
            { id: 621, id_control: '6.4', id_subcontrol: '6.4.1', head_id: 6, text: "มีรถพยาบาลพร้อมอุปกรณ์ทางการแพทย์" , is_subcontrol:0,  ischeckbox:1},
            { id: 622, id_control: '6.4', id_subcontrol: '6.4.2', head_id: 6, text: "บุคลากรสายแพทย์มีความรู้ความชำนาญในการเคลื่อนย้ายผู้ป่วย การปฏิบัติการช่วยชีวิตเบื้องต้นและเบื้องสูง" , is_subcontrol:0,  ischeckbox:1},
            { id: 623, id_control: '6.4', id_subcontrol: '6.4.3', head_id: 6, text: "มีการกระจายความรู้และเพิ่มขีดความสามารถ ในการเคลื่อนย้ายผู้ป่วยไปสู่กำลังพลทุกนาย ของ ทร." , is_subcontrol:0,  ischeckbox:1},
           
            // -------------------------- 6.5 -------------------------- //
            { id: 624, id_control: '6.5', head_id: 6 ,text: "เวชศาสตร์ใต้น้ำและการบิน" , is_subcontrol:1},
            { id: 625, id_control: '6.5', id_subcontrol: '6.5.1', head_id: 6, text: "อบรมหลักสูตรพยาบาลเวชศาสตร์ใต้น้ำและการบิน เพื่อเพิ่มจำนวนพยาบาลที่มีความรู้ความสามารถ" , is_subcontrol:0,  ischeckbox:1},
            { id: 626, id_control: '6.5', id_subcontrol: '6.5.2', head_id: 6, text: "ตรวจสอบสมรรถภาพผู้ปฏิบัติงานในอากาศตามวงรอบอย่างมีประสิทธิภาพ" , is_subcontrol:0,  ischeckbox:1},
            { id: 627, id_control: '6.5', id_subcontrol: '6.5.3', head_id: 6, text: "กำหนดมาตรการทางสายแพทย์เพื่อรองรับงานนิรภัยการบิน หรือการนิรภัยเวชกรรมการบิน" , is_subcontrol:0,  ischeckbox:1},
            { id: 628, id_control: '6.5', id_subcontrol: '6.5.4', head_id: 6, text: "มีแผนนิรภัยเวชกรรมการบินเพื่อรองรับเกี่ยวกับอากาศยาน ทร.และสนับสนุนแผนนิรภัยการบินที่ ทร.จะจัดทำในอนาคต" , is_subcontrol:0,  ischeckbox:1},
          
            { id: 1016 , head_id: 6, sum_id: 601, value: '',  text: "กิจกรรมการบริการทางการแพทย์" },
            { id: 1017 , head_id: 6, sum_id: 602, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1018 , head_id: 6, sum_id: 603, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 601 , head_id: 6, risk_id: 603, is_improvement: 1},
            { id: 602 , head_id: 6, risk_id: 604, is_improvement: 1},
            { id: 603 , head_id: 6, risk_id: 605, is_improvement: 1},
            { id: 604 , head_id: 6, risk_id: 606, is_improvement: 1},
            { id: 605 , head_id: 6, risk_id: 608, is_improvement: 1},
            { id: 606 , head_id: 6, risk_id: 609, is_improvement: 1},
            { id: 607 , head_id: 6, risk_id: 610, is_improvement: 1},
            { id: 608 , head_id: 6, risk_id: 612, is_improvement: 1},
            { id: 609 , head_id: 6, risk_id: 613, is_improvement: 1},
            { id: 610 , head_id: 6, risk_id: 614, is_improvement: 1},
            { id: 611 , head_id: 6, risk_id: 615, is_improvement: 1},
            { id: 612 , head_id: 6, risk_id: 616, is_improvement: 1},
            { id: 613 , head_id: 6, risk_id: 617, is_improvement: 1},
            { id: 614 , head_id: 6, risk_id: 618, is_improvement: 1},
            { id: 615 , head_id: 6, risk_id: 619, is_improvement: 1},
            { id: 616 , head_id: 6, risk_id: 621, is_improvement: 1},
            { id: 617 , head_id: 6, risk_id: 622, is_improvement: 1},
            { id: 618 , head_id: 6, risk_id: 623, is_improvement: 1},
            { id: 619 , head_id: 6, risk_id: 625, is_improvement: 1},
            { id: 620 , head_id: 6, risk_id: 626, is_improvement: 1},
            { id: 621 , head_id: 6, risk_id: 627, is_improvement: 1},
            { id: 622 , head_id: 6, risk_id: 628, is_improvement: 1},
            
        ];
    } else if (data == 'branchcommunication') { //  branchcommunication
        str = [
            // -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "ความพร้อมของเครื่องมือสื่อสาร" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่ามีเครื่องมือ/อุปกรณ์ทางด้านการสื่อสารของหน่วย มีเพียงพอต่อการใช้งาน มีประสิทธิภาพ ใช้ปฏิบัติงานได้ต่อเนื่อง ทุกสถานที่ และมีความทันสมัยตามเทคโนโลยี และเป็นไปตามระเบียบ ทร.ว่าด้วยการรักษาความปลอดภัย พ.ศ.๒๕๖๓"},
            { id: 102, id_control: '1.1', head_id: 1, text: "เครื่องมือ/อุปกรณ์สื่อสาร มีจำนวนเพียงพอต่อการใช้งาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 103, id_control: '1.2', head_id: 1, text: "เครื่องมือ/อุปกรณ์สื่อสาร มีความทันสมัยและมีประสิทธิภาพ เพียงพอต่อการใช้งาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 104, id_control: '1.3', head_id: 1, text: "มีการจัดทำทะเบียนครุภัณฑ์ จัดทำรายการแจกจ่ายเครื่องมือ/อุปกรณ์สื่อสาร และมีการตรวจสอบตามห้วงระยะเวลาที่ระเบียบกำหนด" , is_subcontrol:0,  ischeckbox:1},
            { id: 105, id_control: '1.4', head_id: 1 ,text: "มีการตรวจสอบและทดสอบทดลองประสิทธิภาพเครื่องมือ/อุปกรณ์สื่อสาร ตามห้วงเวลาที่กำหนด" , is_subcontrol:0,  ischeckbox:1},
            { id: 106, id_control: '1.5', head_id: 1 ,text: "สถานที่เก็บเครื่องมือ/อุปกรณ์ที่ปลอดภัย ถูกจัดเก็บไว้ในสถานที่ที่เหมาะสม และมีระบบการรักษาความปลอดภัยที่ดี" , is_subcontrol:0,  ischeckbox:1},
            { id: 107, id_control: '1.6', head_id: 1 ,text: "มีการติดตั้งอุปกรณ์รักษาความปลอดภัยสถานที่เก็บเครื่องมือ/อุปกรณ์สื่อสารที่สำคัญ เช่น กล้องวงจรปิด กุญแจนิรภัยและสัญญาณกันขโมย เป็นต้น" , is_subcontrol:0,  ischeckbox:1},
            { id: 108, id_control: '1.7', head_id: 1 ,text: "มีการจัดทำแผนจัดซื้อจัดหา และซ่อมบำรุงเครื่องมือ/อุปกรณ์สื่อสาร" , is_subcontrol:0,  ischeckbox:1},
         
            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "ความพร้อมของเครื่องมือสื่อสาร"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 105, is_improvement: 1},
            { id: 105 , head_id: 1, risk_id: 106, is_improvement: 1},
            { id: 106 , head_id: 1, risk_id: 107, is_improvement: 1},
            { id: 107 , head_id: 1, risk_id: 108, is_improvement: 1},

            // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.',  head_id: 2, mainControl_id: 2 , text: "ความพร้อมของบุคลากรทางด้านการสื่อสาร" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่ากำลังพลที่ปฏิบัติงานด้านการสื่อสารมีจำนวนที่เหมาะสม มีความรู้ ความสามารถ อย่างเพียงพอในการปฏิบัติงานและการรักษาความปลอดภัยทางการสื่อสาร "},
            { id: 202, id_control: '2.1', head_id: 2, text: "มีการกำหนดหน้าที่ความรับผิดชอบของกำลังพลในทุกตำแหน่งอย่างชัดเจน" , is_subcontrol:0,  ischeckbox:1},
            { id: 203, id_control: '2.2', head_id: 2, text: "มีการสรรหา/คัดเลือก/บรรจุกำลังพลตรงตามคุณลักษณะของงานที่ปฏิบัติ" , is_subcontrol:0,  ischeckbox:1},
            { id: 204, id_control: '2.3', head_id: 2, text: "มีการบรรจุกำลังพลที่เพียงพอต่อการปฏิบัติงานหรือสามารถบริหารจัดการกำลังพลรองรับกับภาระงานอย่างเหมาะสม" , is_subcontrol:0,  ischeckbox:1},
            { id: 205, id_control: '2.4', head_id: 2, text: "กำลังพลที่บรรจุในแต่ละตำแหน่งมีความรู้ มีความเข้าใจในภารกิจ หน้าที่ และความรับผิดชอบในตำแหน่งหน้าที่ของตน" , is_subcontrol:0,  ischeckbox:1},
            { id: 206, id_control: '2.5', head_id: 2, text: "กำลังพลที่บรรจุในแต่ละตำแหน่ง สามารถปฏิบัติงานตามหน้าที่ได้อย่างมีประสิทธิภาพ รวมทั้งกำลังพลสามารถปฏิบัติงานทดแทนกันได้" , is_subcontrol:0,  ischeckbox:1},
            { id: 207, id_control: '2.6', head_id: 2, text: "มีการตรวจสอบ/ประเมินผลการปฏิบัติงานของกำลังพล ตามห้วงเวลาที่เหมาะสม" , is_subcontrol:0,  ischeckbox:1},
            { id: 208, id_control: '2.7', head_id: 2, text: "มีการจัดทำแผนการพัฒนาบุคลากรที่เป็นรูปธรรม" , is_subcontrol:0,  ischeckbox:1},
            { id: 209, id_control: '2.8', head_id: 2, text: "มีการจัดฝึกอบรมเพื่อพัฒนาบุคลากรให้มีความรู้เกี่ยวกับ เทคโนโลยีการสื่อสารโทรคมนาคมและการรักษาความปลอดภัยด้านการสื่อสาร" , is_subcontrol:0,  ischeckbox:1},
            { id: 210, id_control: '2.9', head_id: 2, text: "มีการฝึกอบรมเกี่ยวกับการใช้อุปกรณ์/เครื่องมือสื่อสารในความรับผิดชอบ เพื่อให้เกิดความชำนาญ มีทักษะความรู้ เพิ่มประสิทธิภาพ การปฏิบัติงาน และการรักษาความปลอดภัยทางการสื่อสาร" , is_subcontrol:0,  ischeckbox:1},
            { id: 211, id_control: '2.10', head_id: 2, text: "มีการปฏิบัติตามกฎหมาย ระเบียบ ข้อบังคับ หลักปฏิบัติ/ระเบียบปฏิบัติประจำและมาตรการด้านการสื่อสารที่กำหนด" , is_subcontrol:0,  ischeckbox:1},
            { id: 212, id_control: '2.11', head_id: 2, text: "มีการติดตามและประเมินผลการปฏิบัติตามกฎหมาย ระเบียบ ข้อบังคับ หลักปฏิบัติ/ระเบียบปฏิบัติประจำและมาตรการ ด้านการสื่อสารอื่น ๆ และกำหนดบทลงโทษหากตรวจพบการละเมิด" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "ความพร้อมของบุคลากรทางด้านการสื่อสาร" },
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 203, is_improvement: 1},
            { id: 203 , head_id: 2, risk_id: 204, is_improvement: 1},
            { id: 204 , head_id: 2, risk_id: 205, is_improvement: 1},
            { id: 205 , head_id: 2, risk_id: 206, is_improvement: 1},
            { id: 206 , head_id: 2, risk_id: 207, is_improvement: 1},
            { id: 207 , head_id: 2, risk_id: 208, is_improvement: 1},
            { id: 208 , head_id: 2, risk_id: 209, is_improvement: 1},
            { id: 209 , head_id: 2, risk_id: 210, is_improvement: 1},
            { id: 210 , head_id: 2, risk_id: 211, is_improvement: 1},
            { id: 211 , head_id: 2, risk_id: 212, is_improvement: 1},
            
            // -------------------------- 3 -------------------------- //
            { id: 301, id_control: '3.',   head_id: 3,  mainControl_id: 3 ,text: "ระเบียบ ข้อบังคับ หลักปฏิบัติ/ระเบียบปฏิบัติประจำ และมาตรการต่าง ๆ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่ากำลังพลที่ปฏิบัติงานด้านการสื่อสารมีแนวทาง ในการปฏิบัติงานได้อย่างถูกต้อง เหมาะสม สอดคล้องต่อเทคโนโลยีด้านการสื่อสาร รวมทั้งการรักษาความปลอดภัยทางการสื่อสารเพียงพอ"},
            { id: 302, id_control: '3.1',  head_id: 3, text: "มีระเบียบ ข้อบังคับ หลักปฏิบัติ/ระเบียบปฏิบัติประจำ และมาตรการต่าง ๆ รองรับการปฏิบัติงานด้านการสื่อสารเพียงพอ" , is_subcontrol:0,  ischeckbox:1},
            { id: 303, id_control: '3.2',  head_id: 3, text: "มีการปรับปรุงระเบียบ ข้อบังคับ หลักปฏิบัติ/ระเบียบปฏิบัติประจำ และมาตรการต่าง ๆ ให้มีความเหมาะสม ทันสมัย เป็นปัจจุบันอย่างสม่ำเสมอ" , is_subcontrol:0,  ischeckbox:1},
            { id: 304, id_control: '3.3',  head_id: 3, text: "ระเบียบ ข้อบังคับ หลักปฏิบัติ/ระเบียบปฏิบัติประจำ และมาตรการต่าง ๆ มีความสอดคล้องและรองรับกับเทคโนโลยีด้านการสื่อสารในปัจจุบัน" , is_subcontrol:0,  ischeckbox:1},
    
            { id: 1007 , head_id: 3, sum_id: 301, value:  '', text: "ระเบียบ ข้อบังคับ หลักปฏิบัติ/ระเบียบปฏิบัติประจำ และมาตรการต่างๆ" },
            { id: 1008 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
             // ส่วนเก็บ improvement
             { id: 301 , head_id: 3, risk_id: 302, is_improvement: 1},
             { id: 302 , head_id: 3, risk_id: 303, is_improvement: 1},
             { id: 303 , head_id: 3, risk_id: 304, is_improvement: 1},

            // -------------------------- 4 -------------------------- //
            { id: 401, id_control: '4.',  head_id: 4,  mainControl_id: 4 ,text: "การบริหารจัดการทรัพยากรทางด้านการสื่อสาร" , main_Obj:"เพื่อให้การดำเนินงานมีความมั่นใจว่าทรัพยากรทางด้านการสื่อสารของผู้ใช้ มีประสิทธิภาพ เพียงพอต่อการปฏิบัติงานและสอดคล้อง กับการรักษาความปลอดภัยทางการสื่อสาร" , objectName: "เพื่อให้มั่นใจว่าการดำเนินงาน ด้านการข่าว มีแนวทางการบริหารจัดการเพียงพอให้การปฏิบัติงาน ด้านการข่าวบรรลุภารกิจของหน่วย"},
            { id: 402, id_control: '4.1', head_id: 4, text: "มีการวางแผนการจัดสรรทรัพยากร เครื่องมือ/อุปกรณ์สื่อสารให้กับผู้ใช้งานได้อย่างเป็นระบบ" , is_subcontrol:0,  ischeckbox:1},
            { id: 403, id_control: '4.2', head_id: 4, text: "ผู้ใช้พัสดุ (Users) มีส่วนร่วมในการกำหนดความต้องการพัสดุ" , is_subcontrol:0,  ischeckbox:1},
            { id: 404, id_control: '4.3', head_id: 4, text: 'มีการจัดทำแผนรวบรวมข่าวสาร เพื่อแบ่งมอบภารกิจ/เป้าหมายในการรวบรวมข่าวอย่างชัดเจน' , is_subcontrol:0,  ischeckbox:1},
            { id: 405, id_control: '4.4', head_id: 4 ,text: "การแจ้งความต้องการพัสดุสื่อสารได้ระบุรายการ หรือประเภทพัสดุ ปริมาณพัสดุ กำหนดเวลาความต้องการอย่างละเอียด และชัดเจน" , is_subcontrol:0,  ischeckbox:1},
            { id: 406, id_control: '4.5', head_id: 4 ,text: "มีการจัดทำบัญชี/ทะเบียนรับ-จ่ายพัสดุสื่อสาร แยกออก เป็นประเภท หรือมีหลักฐานประกอบทุกรายการ" , is_subcontrol:0,  ischeckbox:1},
            { id: 407, id_control: '4.6', head_id: 4 ,text: "การเบิกจ่ายพัสดุสื่อสารได้รับการอนุมัติจากหัวหน้าหน่วยที่ได้รับการแต่งตั้งเป็นผู้สั่งจ่ายพัสดุ" , is_subcontrol:0,  ischeckbox:1},
            { id: 408, id_control: '4.7', head_id: 4 ,text: "มีการบำรุงรักษาอุปกรณ์และเครื่องมือสื่อสาร เพื่อให้สามารถใช้งานได้อย่างต่อเนื่อง" , is_subcontrol:0,  ischeckbox:1},
            { id: 409, id_control: '4.8', head_id: 4 ,text: "มีการจัดฝึกอบรมผู้ใช้งาน หรือมีคู่มือการบำรุงรักษา" , is_subcontrol:0,  ischeckbox:1},
     
            { id: 1010 , head_id: 4, sum_id: 101, value: '',  text: "การบริหารจัดการทรัพยากรทางด้านการสื่อสาร" },
            { id: 1011 , head_id: 4, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1012 , head_id: 4, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
             // ส่วนเก็บ improvement
             { id: 401 , head_id: 4, risk_id: 402, is_improvement: 1},
             { id: 402 , head_id: 4, risk_id: 403, is_improvement: 1},
             { id: 403 , head_id: 4, risk_id: 404, is_improvement: 1},
             { id: 404 , head_id: 4, risk_id: 405, is_improvement: 1},
             { id: 405 , head_id: 4, risk_id: 406, is_improvement: 1},
             { id: 406 , head_id: 4, risk_id: 407, is_improvement: 1},
             { id: 407 , head_id: 4, risk_id: 408, is_improvement: 1},
             { id: 408 , head_id: 4, risk_id: 409, is_improvement: 1},
        ];
    } else if (data == 'branchtechnology') { //  branchtechnology
        str = [
            // -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "นโยบายด้านความมั่นคงปลอดภัยของระบบเทคโนโลยีสารสนเทศภายในหน่วยงาน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อกำหนดทิศทางและให้การสนับสนุนการดำเนินการด้านความมั่นคง ปลอดภัยสำหรับสารสนเทศของหน่วยงาน ให้เป็นไปตามกฎหมาย และระเบียบปฏิบัติที่เกี่ยวข้อง"},
            { id: 102, id_control: '1.1', head_id: 1, text: "หน่วยงานมีการกำหนดแผนแม่บท/แผนยุทธศาสตร์/นโยบาย ด้านเทคโนโลยีสารสนเทศที่เป็นลายลักษณ์อักษร" , is_subcontrol:0,  ischeckbox:1},
            { id: 103, id_control: '1.2', head_id: 1, text: "หน่วยงานมีการทบทวนแผนแม่บท/แผนยุทธศาสตร์นโยบาย ด้านเทคโนโลยีสารสนเทศตามระยะเวลาที่กำหนดหรือมีการเปลี่ยนแปลงที่สำคัญของหน่วยงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 104, id_control: '1.3', head_id: 1, text: "หน่วยงานมีการจัดทำ/เผยแพร่ กฎหมาย ระเบียบ ข้อบังคับ ที่เกี่ยวข้องกับการใช้งานระบบเทคโนโลยีสารสนเทศ ตลอดจนกำกับดูแลการปฏิบัติของกำลังพลให้เป็นไปตามกฎหมาย ระเบียบ ข้อบังคับ" , is_subcontrol:0,  ischeckbox:1},
            { id: 105, id_control: '1.4', head_id: 1 ,text: "หน่วยงานมีการสร้างความตระหนัก การให้ความรู้ และการอบรมด้านความมั่นคงปลอดภัยให้แก่บุคลากรภายในหน่วยงาน" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "นโยบายด้านความมั่นคงปลอดภัยของระบบสารสนเทศ"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 105, is_improvement: 1},

            // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.',  mainControl_id: 2 , head_id: 2, text: "การบริหารจัดการด้านความมั่นคงปลอดภัยของระบบเทคโนโลยีสารสนเทศ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , 
            objectName: `เพื่อบริหารจัดการให้ระบบเทคโนโลยีสารสนเทศให้มีความน่าเชื่อถือ ๓ ประการ ได้แก่<br>
                 <span style='display:inline-block; width: 20px;'></span>C=Confidentiality ความสามารถของระบบในการควบคุมการเข้าถึงข้อมูลเพื่อรักษาความลับ ไม่ให้ผู้ที่ไม่มีสิทธิ (Unauthorized Person) สามารถเข้าถึงได้<br>
                 <span style='display:inline-block; width: 20px;'></span>I=Integrity ความสามารถของระบบในการการทำงานได้อย่างถูกต้องตลอดเวลา<br>
                 <span style='display:inline-block; width: 20px;'></span>A=Availability ความสามารถของระบบที่จะคงอยู่ให้บริการหรือทำงานได้ตลอดเวลา`},
            { id: 202, id_control: '2.1', head_id: 2, text: "หน่วยงานมีการจัดทำ/ทบทวนคำสั่งแต่งตั้งเจ้าหน้าที่ผู้รับผิดชอบด้านการดูแลระบบเทคโนโลยีสารสนเทศ" , is_subcontrol:0,  ischeckbox:1},
            { id: 203, id_control: '2.2', head_id: 2, text: "หน่วยงานมีการกำหนด/ทบทวนสิทธิ (Authorization) ของกำลังพล/ผู้รับบริการในการใช้และเข้าถึงระบบสารสนเทศ" , is_subcontrol:0,  ischeckbox:1},
            { id: 204, id_control: '2.3', head_id: 2, text: "หน่วยงานมีกระบวนการตรวจสอบ/ยืนยันตัวตน (Authentication) เช่น รหัสผ่านของกำลังพล/ผู้รับบริการในการเข้าถึงระบบสารสนเทศที่เหมาะสมและปลอดภัย" , is_subcontrol:0,  ischeckbox:1},
            { id: 205, id_control: '2.4', head_id: 2, text: "หน่วยงานมีการจัดทำฐานข้อมูลบัญชีครุภัณฑ์ /บัญชีควบคุมสินทรัพย์ฯ /ระบบสารสนเทศ และหมายเลข IP address" , is_subcontrol:0,  ischeckbox:1},
            { id: 206, id_control: '2.5', head_id: 2, text: "หน่วยงานมีการปรับปรุง(Update)และตรวจสอบฐาน ข้อมูลบัญชีครุภัณฑ์ /บัญชีควบคุมสินทรัพย์ฯ /ระบบสารสนเทศ เป็นประจำตามวงรอบ" , is_subcontrol:0,  ischeckbox:1},
            { id: 207, id_control: '2.6', head_id: 2, text: "หน่วยงานมีการติดตั้งโปรแกรมป้องกันไวรัส (Anti-virus) ให้กับเครื่องคอมพิวเตอร์ทุกเครื่อง" , is_subcontrol:0,  ischeckbox:1},
            { id: 208, id_control: '2.7', head_id: 2, text: "หน่วยงานมีระบบหรืออุปกรณ์สนับสนุนการทำงานประเภท UPS อุปกรณ์สำรองข้อมูล อุปกรณ์สำรองไฟฟ้า เป็นต้น" , is_subcontrol:0,  ischeckbox:1},
            { id: 209, id_control: '2.8', head_id: 2, text: "หน่วยงานมีการดูแล บำรุงรักษาอุปกรณ์ การเดินสายไฟ/สายสัญญาณ ให้อยู่ในสภาพที่เรียบร้อยและปลอดภัย" , is_subcontrol:0,  ischeckbox:1},
            { id: 210, id_control: '2.9', head_id: 2, text: "หน่วยงานมีการกำหนดบริเวณที่ต้องมีการรักษาความมั่นคงปลอดภัย (Secure Areas) มีมาตรการตรวจสอบและจำกัดการเข้าถึง ตลอดจนมีอุปกรณ์ตรวจจับ เฝ้าระวัง แจ้งเตือน ที่เหมาะสมและเพียงพอ" , is_subcontrol:0,  ischeckbox:1},
            { id: 211, id_control: '2.10', head_id: 2, text: "หน่วยงานมีการสำรองข้อมูล (Back-up) " , is_subcontrol:0,  ischeckbox:1},
            { id: 212, id_control: '2.11', head_id: 2, text: "หน่วยงานมีการตรวจสอบ /การบันทึกข้อมูลจราจรทางคอมพิวเตอร์ ในการเข้าใช้งานระบบสารสนเทศ ในกรณีที่หน่วยงานมีการให้บริการสารสนเทศผ่านระบบเครือข่าย" , is_subcontrol:0,  ischeckbox:1},
            { id: 213, id_control: '2.12', head_id: 2, text: "หน่วยมีการจัดทำ/ทบทวน และซักซ้อมแผนเผชิญเหตุ/ แผนบริหารจัดการความต่อเนื่องเทคโนโลยีสารสนเทศเป็นประจำตามวงรอบ" , is_subcontrol:0,  ischeckbox:1},
            { id: 214, id_control: '2.13', head_id: 2, text: "หน่วยงานมีการรายงานเหตุการณ์ผิดปกติหรือจุดอ่อน       ที่เกี่ยวข้องกับความมั่นคงปลอดภัยของระบบสารสนเทศ ไปยังศูนย์ไซเบอร์ กรมการสื่อสารและเทคโนโลยีสารสนเทศทหารเรือ" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "การบริหารจัดการด้านความมั่นคงปลอดภัยของระบบเทคโนโลยีสารสนเทศ"},
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 203, is_improvement: 1},
            { id: 203 , head_id: 2, risk_id: 204, is_improvement: 1},
            { id: 204 , head_id: 2, risk_id: 205, is_improvement: 1},
            { id: 205 , head_id: 2, risk_id: 206, is_improvement: 1},
            { id: 206 , head_id: 2, risk_id: 207, is_improvement: 1},
            { id: 207 , head_id: 2, risk_id: 208, is_improvement: 1},
            { id: 208 , head_id: 2, risk_id: 209, is_improvement: 1},
            { id: 209 , head_id: 2, risk_id: 210, is_improvement: 1},
            { id: 210 , head_id: 2, risk_id: 211, is_improvement: 1},
            { id: 211 , head_id: 2, risk_id: 212, is_improvement: 1},
            { id: 212 , head_id: 2, risk_id: 213, is_improvement: 1},
            { id: 213 , head_id: 2, risk_id: 214, is_improvement: 1},

        ];
    } else if (data == 'branchcivilaffairs') { //  branchcivilaffairs
        str = [
        // -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "ความพร้อมในการปฏิบัติงานด้านกิจการพลเรือน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าการปฏิบัติงานด้านกิจการพลเรือน มีแนวทางการบริหารจัดการที่มีประสิทธิภาพ เพื่อให้การปฏิบัติงานด้านกิจการพลเรือนบรรลุภารกิจ"},
            { id: 102, id_control: '1.1', head_id: 1, text: "มีการจัดทำแผนการปฏิบัติงานระยะสั้นและระยะปานกลางที่สอดคล้องกับนโยบาย ผบ.ทร. และแผนยุทธศาสตร์ ทร." , is_subcontrol:0,  ischeckbox:1},
            { id: 103, id_control: '1.2', head_id: 1, text: "มีการกำหนดหน่วยรับผิดชอบหลัก หน่วยรับผิดชอบรอง หน่วยปฏิบัติ และหน่วยสนับสนุน" , is_subcontrol:0,  ischeckbox:1},
            { id: 104, id_control: '1.3', head_id: 1, text: "มีการสื่อสาร ชี้แจงทำความเข้าใจแนวทางและแผน ปฏิบัติงานให้แก่หน่วยงานที่เกี่ยวข้อง" , is_subcontrol:0,  ischeckbox:1},
            { id: 105, id_control: '1.4', head_id: 1 ,text: "มีการประสานงานและอำนวยการให้หน่วยที่เกี่ยวข้องสามารถดำเนินงานได้อย่างมีประสิทธิภาพ" , is_subcontrol:0,  ischeckbox:1},
            { id: 106, id_control: '1.5', head_id: 1 ,text: "มีการปฏิบัติงานด้านกิจการพลเรือนทั้ง ๘ สาขา ได้อย่างมีประสิทธิภาพหรือไม่ ดังนี้" , is_subcontrol:1},
            { id: 107, id_control: '1.5', id_subcontrol: '1.5.1', head_id: 1, text: "การกิจการพลเรือน มีการประสานการปฏิบัติกับหน่วยงานภาครัฐ เอกชน องค์กร ประชาชนและกลุ่มมวลชนต่างๆ หรือในพื้นที่รับผิดชอบหรือที่ตั้งหน่วย" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 108, id_control: '1.5', id_subcontrol: '1.5.2', head_id: 1, text: "การปฏิบัติการจิตวิทยา มีกิจกรรมเสริมสร้างภาพลักษณ์ที่ดีและแสดงออกถึงศักยภาพของ ทร. รวมทั้งงานเกี่ยวกับมวลชนสัมพันธ์" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 109, id_control: '1.5', id_subcontrol: '1.5.3', head_id: 1, text: "การประชาสัมพันธ์ มีการประชาสัมพันธ์ตามสื่อโทรทัศน์   สื่อสิ่งพิมพ์ หนังสือพิมพ์ นิตยสารทั้งภายในและภายนอก ทร.และสื่อออนไลน์ต่างๆ" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 110, id_control: '1.5', id_subcontrol: '1.5.4', head_id: 1, text: "การช่วยเหลือประชาชน มีการจัดเตรียมกำลังพล เครื่องมือ/อุปกรณ์ในการช่วยเหลือผู้ประสบภัยพิบัติในพื้นที่รับผิดชอบหรือพื้นที่ ที่ได้รับมอบหมายได้อย่างรวดเร็ว" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 111, id_control: '1.5', id_subcontrol: '1.5.5', head_id: 1, text: "การเมืองในหน่วยทหาร มีการปลูกฝังอุดมการณ์ การปกครองตามระบอบประชาธิปไตยให้กับกำลังพล ครอบครัว และประชาชนในพื้นที่รับผิดชอบ เพื่อให้ยึดมั่นและศรัทธาในสถาบันชาติ ศาสนา และพระมหากษัตริย์ และการปกครองในระบอบประชาธิปไตยอันมี พระมหากษัตริย์ทรงเป็นประมุข" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 112, id_control: '1.5', id_subcontrol: '1.5.6', head_id: 1, text: "การเผยแพร่วิทยาการกิจการพลเรือน มีการดำเนินการและจัดส่งกำลังพลเข้าร่วมอบรม ประชุม และสัมมนาทั้งภายในและภายนอกหน่วย" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 113, id_control: '1.5', id_subcontrol: '1.5.7', head_id: 1, text: "การพัฒนาประเทศ มีงานโครงการอันเนื่องมาจากพระราชดำริ โครงการเศรษฐกิจพอเพียง และงานสนับสนุนการแก้ไขปัญหายาเสพติด รวมทั้งกิจกรรม/โครงการสร้างความสมานฉันท์และความสามัคคีของคนในชาติ" ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 114, id_control: '1.5', id_subcontrol: '1.5.8', head_id: 1, text: "การอนุรักษ์และฟื้นฟูสภาพแวดล้อมทางทะเลและชายฝั่ง  มีการจัดและสนับสนุนการจัดกิจกรรมกับหน่วยงานภายในและภายนอก ทร." ,is_innercontrol: 0,  ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 115, id_control: '1.6', head_id: 1 ,text: "มีการกำหนดวงรอบและรายงานผลการปฏิบัติตามแผนการปฏิบัติงานของหน่วย" , is_subcontrol:0,  ischeckbox:1},
            { id: 116, id_control: '1.7', head_id: 1 ,text: "มีการติดตามผลการดำเนินงานกับหน่วยเกี่ยวข้องอย่างต่อเนื่อง เพื่อประสานงานและแก้ไขปัญหาที่เกิดขึ้นในการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "ความพร้อมในการปฏิบัติงานด้านกิจการพลเรือน"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 105, is_improvement: 1},
            { id: 105 , head_id: 1, risk_id: 107, is_improvement: 1},
            { id: 106 , head_id: 1, risk_id: 108, is_improvement: 1},
            { id: 107 , head_id: 1, risk_id: 109, is_improvement: 1},
            { id: 108 , head_id: 1, risk_id: 110, is_improvement: 1},
            { id: 109 , head_id: 1, risk_id: 111, is_improvement: 1},
            { id: 110 , head_id: 1, risk_id: 112, is_improvement: 1},
            { id: 111 , head_id: 1, risk_id: 113, is_improvement: 1},
            { id: 112 , head_id: 1, risk_id: 114, is_improvement: 1},
            { id: 113 , head_id: 1, risk_id: 115, is_improvement: 1},
            { id: 114 , head_id: 1, risk_id: 116, is_improvement: 1},
            
            // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.',  head_id: 2, mainControl_id: 2 , text: "ความพร้อมทางด้านองค์บุคคล" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่ากำลังพลที่ปฏิบัติงานด้านกิจการพลเรือนมีจำนวนที่เหมาะสม มีความรู้ความสามารถอย่างเพียงพอในการปฏิบัติงาน"},
            { id: 202, id_control: '2.1', head_id: 2, text: "มีการกำหนดหน้าที่ ความรับผิดชอบของกำลังพลในทุกตำแหน่ง" , is_subcontrol:0,  ischeckbox:1},
            { id: 203, id_control: '2.2', head_id: 2, text: "มีกำลังพลเพียงพอและเหมาะสมต่อปริมาณงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 204, id_control: '2.3', head_id: 2, text: "กำลังพลสามารถปฏิบัติงานทดแทนกันได้ในกรณีขาดแคลนกำลังพล" , is_subcontrol:0,  ischeckbox:1},
            { id: 205, id_control: '2.4', head_id: 2, text: "กำลังพลมีความรู้ความสามารถ และทักษะที่จำเป็นต่อการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 206, id_control: '2.5', head_id: 2, text: "กำลังพลมีการศึกษาหาความรู้เพิ่มเติม หรือได้รับการฝึกอบรมเพื่อเพิ่มทักษะการปฏิบัติงานอย่างสม่ำเสมอ" , is_subcontrol:0,  ischeckbox:1},
            { id: 207, id_control: '2.6', head_id: 2, text: "มีการตรวจสอบและประเมินผลการปฏิบัติงานของกำลังพล ตามห้วงระยะเวลาที่เหมาะสม" , is_subcontrol:0,  ischeckbox:1},
            { id: 208, id_control: '2.7', head_id: 2, text: "มีการกำหนดวิธีปฏิบัติงาน มาตรฐานการปฏิบัติงาน เพื่อให้บรรลุวัตถุประสงค์ของการดำเนินงาน และมีการปรับปรุงตามห้วงเวลาที่เหมาะสม" , is_subcontrol:0,  ischeckbox:1},
            { id: 209, id_control: '2.8', head_id: 2, text: "มีการจัดทำองค์ความรู้และถ่ายทอดองค์ความรู้ของกำลังพลที่โยกย้าย เกษียณ และบรรจุใหม่" , is_subcontrol:0,  ischeckbox:1},
           
            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "ความพร้อมทางด้านองค์บุคคล" },
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 203, is_improvement: 1},
            { id: 203 , head_id: 2, risk_id: 204, is_improvement: 1},
            { id: 204 , head_id: 2, risk_id: 205, is_improvement: 1},
            { id: 205 , head_id: 2, risk_id: 206, is_improvement: 1},
            { id: 206 , head_id: 2, risk_id: 207, is_improvement: 1},
            { id: 207 , head_id: 2, risk_id: 208, is_improvement: 1},
            { id: 208 , head_id: 2, risk_id: 209, is_improvement: 1},

            // -------------------------- 3 -------------------------- //
            { id: 301, id_control: '3.',   head_id: 3,  mainControl_id: 3 ,text: "ความพร้อมทางด้านองค์วัตถุ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่ามีเครื่องมือ/อุปกรณ์ที่มีประสิทธิภาพเพียงพอต่อการปฏิบัติงานด้านกิจการพลเรือน"},
            { id: 302, id_control: '3.1',  head_id: 3, text: "มีเครื่องมือ/อุปกรณ์ และสิ่งอำนวยความสะดวกที่เพียงพอต่อการปฏิบัติงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 303, id_control: '3.2',  head_id: 3, text: "มีการปรับปรุง ซ่อมแซม และพัฒนา เครื่องมือและสิ่งอำนวยความสะดวก ให้มีสภาพพร้อมใช้งาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 304, id_control: '3.3',  head_id: 3, text: "มีเครื่องมือ/อุปกรณ์เครือข่ายสารสนเทศที่สามารถเผยแพร่ประชาสัมพันธ์ข้อมูลที่จำเป็นไปยังหน่วยที่เกี่ยวข้องได้อย่างมีประสิทธิภาพ" , is_subcontrol:0,  ischeckbox:1},
            { id: 305, id_control: '3.4',  head_id: 3, text: "มีการจัดทำแผน เพื่อจัดหาและซ่อมบำรุงเครื่องมือ/อุปกรณ์" , is_subcontrol:0,  ischeckbox:1},
    
            { id: 1007 , head_id: 3, sum_id: 301, value:  '', text: "ความพร้อมทางด้านองค์วัตถุ" },
            { id: 1008 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 301 , head_id: 3, risk_id: 302, is_improvement: 1},
            { id: 302 , head_id: 3, risk_id: 303, is_improvement: 1},
            { id: 303 , head_id: 3, risk_id: 304, is_improvement: 1},
            { id: 304 , head_id: 3, risk_id: 305, is_improvement: 1},

        ];
    } else if (data == 'branchbudget') { //  branchbudget
        str = [
            // -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "จุดมุ่งหมายและรูปแบบ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าหน่วยงานมีการกำหนดจุดมุ่งหมายและรูปแบบให้มีความสอดคล้องเหมาะสม"},
            { id: 102, id_control: '1.1', head_id: 1, text: "มีความเข้าใจเป้าหมายยุทธศาสตร์ชาติเป้าหมายการให้บริการของกระทรวง ยุทธศาสตร์กระทรวง ยุทธศาสตร์ของกองทัพเรือ และแผนยุทธศาสตร์ของกองทัพเรือ ที่หน่วยงานของท่านต้องรับผิดชอบดำเนินการให้บรรลุผลสำเร็จ" , is_subcontrol:0,  ischeckbox:1},
            { id: 103, id_control: '1.2', head_id: 1, text: "มีเป้าหมายการให้บริการของหน่วยงาน มีความสอดคล้องและเหมาะสมต่อการนําส่งเป้าหมายระดับกองทัพเรือ ระดับกระทรวง และเป้าหมายยุทธศาสตร์ระดับชาติ" , is_subcontrol:0,  ischeckbox:1},
            { id: 104, id_control: '1.3', head_id: 1, text: "หน่วยงานมีการกำหนดความต้องการในการแก้ไขปัญหาของหน่วยงาน และ/หรือเรื่องที่สนใจของกลุ่มเป้าหมาย (Target Group) ผู้รับบริการ (Customer) และ/หรือผู้มีส่วนได้ส่วนเสีย (Stakeholders) เพื่อให้งานหรือเป้าหมายของหน่วยงานและของกองทัพเรือบรรลุตามวัตถุประสงค์" , is_subcontrol:0,  ischeckbox:1},
            { id: 105, id_control: '1.4', head_id: 1 ,text: "ผลผลิตกิจกรรมและงาน/โครงการที่หน่วยงานกำหนด เป็นส่วนสำคัญที่ตอบสนองความต้องการ ปัญหาหรือเรื่องที่สนใจของกลุ่มเป้าหมาย และเป้าหมายของหน่วยงานรวมทั้งระดับกองทัพเรือ กระทรวง/เป้าหมาย ยุทธศาสตร์ชาติ ตามที่ได้วิเคราะห์ในข้อ ๑.๓" , is_subcontrol:0,  ischeckbox:1},
            { id: 106, id_control: '1.5', head_id: 1 ,text: "การกำหนดผลผลิต กิจกรรมและงาน/โครงการของหน่วยงานไม่มีความซ้ำซ้อนกับหน่วยงานอื่นๆ ของกองทัพเรือ ภาครัฐและภาคเอกชน" , is_subcontrol:0,  ischeckbox:1},
            { id: 107, id_control: '1.6', head_id: 1 ,text: "กรณีที่หน่วยงานมีความซ้ำซ้อนกับหน่วยงานอื่น สามารถจำแนกลักษณะผลผลิตที่แตกต่างกันได้" , is_subcontrol:0,  ischeckbox:1},
            { id: 108, id_control: '1.7', head_id: 1 ,text: "หน่วยงานได้คำนึงถึง และ/หรือ มีอุปสรรคและข้อจำกัด (อาทิ ด้านกฎหมาย ระเบียบโครงสร้างส่วนราชการ และปัจจัยในกระบวนการปฏิบัติงาน) ที่มีต่อการนำส่งผลผลิตให้กองทัพเรือ" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "จุดมุ่งหมายและรูปแบบ"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
              // ส่วนเก็บ improvement
              { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
              { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
              { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
              { id: 104 , head_id: 1, risk_id: 105, is_improvement: 1},
              { id: 105 , head_id: 1, risk_id: 106, is_improvement: 1},
              { id: 106 , head_id: 1, risk_id: 107, is_improvement: 1},
              { id: 107 , head_id: 1, risk_id: 108, is_improvement: 1},

            // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.',  head_id: 2, mainControl_id: 2 , text: "การวางแผนกลยุทธ์/แผนปฏิบัติราชการของหน่วย" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าหน่วยงานมีการวางแผนกลยุทธ์ แผนปฏิบัติราชการของหน่วย ที่ส่งผลกระทบต่อการดำเนินงานให้บรรลุเป้าหมายของหน่วยงานตามที่กำหนดไว้"},
            { id: 202, id_control: '2.1', head_id: 2, text: "หน่วยงานมีการจัดทําแผนกลยุทธ์/แผนปฏิบัติราชการของหน่วยที่แสดงความเชื่อมโยงและถ่ายทอดภารกิจจากจุดมุ่งหมายของรัฐบาล (เป้าหมายเชิงยุทธศาสตร์ชาติ) กระทรวง กองทัพไทย กองทัพเรือมายังผลลัพธ์ผลผลิตที่หน่วยจะต้องปฏิบัติ ตามลําดับ" , is_subcontrol:0,  ischeckbox:1},
            { id: 203, id_control: '2.2', head_id: 2, text: "แผนกลยุทธ์/แผนปฏิบัติราชการของหน่วยได้มีการกำหนดเป้าหมาย/ตัวชี้วัด ระดับผลผลิตระยะยาว" , is_subcontrol:0,  ischeckbox:1},
            { id: 204, id_control: '2.3', head_id: 2, text: "แผนกลยุทธ์/แผนปฏิบัติราชการของหน่วยงานได้กําหนดเป้าหมาย/ตัวชี้วัดระยะยาวที่ส่งผลต่อความสําเร็จ ของผลลัพธ์ที่ท้าทาย (มีประสิทธิภาพสูงขึ้น)" , is_subcontrol:0,  ischeckbox:1},
            { id: 205, id_control: '2.4', head_id: 2, text: "แผนกลยุทธ์ของหน่วยงานมีการจำแนกเป้าหมาย/ตัวชี้วัด ผลผลิต เป็นรายปี" , is_subcontrol:0,  ischeckbox:1},
            { id: 206, id_control: '2.5', head_id: 2, text: "แผนกลยุทธ์/แผนปฏิบัติราชการของหน่วยงาน ได้กําหนดวิธีการประสานความร่วมมือกับหน่วยงานที่เกี่ยวข้องอื่นๆ ทั้งหน่วยงานในกองทัพเรือ ภาครัฐและภาคเอกชนที่มีผลต่อความสำเร็จของการดำเนินงานตามผลผลิต" , is_subcontrol:0,  ischeckbox:1},
            { id: 207, id_control: '2.6', head_id: 2, text: "แผนกลยุทธ์/แผนปฏิบัติราชการของหน่วยงานกำหนดให้มีแผนการประเมินผลการปฏิบัติงานที่ตามเป้าหมายการให้บริการของหน่วยงานที่มีคุณภาพด้านขอบเขตของเนื้อหาที่จำเป็นเพื่อการปรับปรุงอย่างสม่ำเสมอโดยประเมินตนเอง และโดยผู้ประเมินอิสระ" , is_subcontrol:0,  ischeckbox:1},
            { id: 208, id_control: '2.7', head_id: 2, text: "หน่วยงานกำหนดให้มีกระบวนการทบทวนกลยุทธ์/ทบทวนแผนปฏิบัติราชการของหน่วย เมื่อมีการเปลี่ยนแปลงสถานการณ์ที่ส่งผลกระทบต่อการดำเนินงานให้บรรลุเป้าหมายของหน่วยงานตามที่กำหนดไว้ (การเปลี่ยนแปลงด้านยุทธศาสตร์ชาติ ยุทธศาสตร์กระทรวงระดับกองทัพเรือและ/หรือข้อกฎหมายและระเบียบปฏิบัติที่เกี่ยวข้อง) ของหน่วยงาน" , is_subcontrol:0,  ischeckbox:1},

            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "การวางแผนกลยุทธ์/แผนปฏิบัติราชการของหน่วย" },
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 203, is_improvement: 1},
            { id: 203 , head_id: 2, risk_id: 204, is_improvement: 1},
            { id: 204 , head_id: 2, risk_id: 205, is_improvement: 1},
            { id: 205 , head_id: 2, risk_id: 206, is_improvement: 1},
            { id: 206 , head_id: 2, risk_id: 207, is_improvement: 1},
            { id: 207 , head_id: 2, risk_id: 208, is_improvement: 1},
            

            // -------------------------- 3 -------------------------- //
            { id: 301, id_control: '3.',   head_id: 3,  mainControl_id: 3 ,text: "การเชื่อมโยงงบประมาณ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าหน่วยงานมีการเชื่อมโยงงบประมาณ มีการกำหนดเป้าหมายผลผลิตกิจกรรมหลัก และกำหนดตัวชี้วัด ทำให้มีข้อมูลด้านงบประมาณอย่างเพียงพอ"},
            { id: 302, id_control: '3.1',  head_id: 3, text: "หน่วยงานมีขั้นตอนการรวบรวมความต้องการของหน่วยงานย่อยของตนเอง รวมทั้งสามารถที่จะจัดทำงบประมาณได้อย่างมีประสิทธิภาพ" , is_subcontrol:0,  ischeckbox:1},
            { id: 303, id_control: '3.2',  head_id: 3, text: "หน่วยงานมีการกำหนดเป้าหมายผลผลิตประจำปี ซึ่งแสดงให้เห็นความก้าวหน้าในการบรรลุเป้าหมายผลผลิต ตามแผนปฏิบัติราชการ ๕ ปี" , is_subcontrol:0,  ischeckbox:1},
            { id: 304, id_control: '3.3',  head_id: 3, text: "หน่วยงานมีการกำหนดกิจกรรมหลักที่มีความเชื่อมโยงกับทรัพยากรที่ต้องการซึ่งสนับสนุนให้บรรลุเป้าหมายผลผลิตประจำปี" , is_subcontrol:0,  ischeckbox:1},
            { id: 305, id_control: '3.4',  head_id: 3, text: "หน่วยงานมีการกำหนดตัวชี้วัดความก้าวหน้าตามระยะเวลาหรือช่วงการรายงานผลการปฏิบัติราชการทุกกิจกรรมหลัก" , is_subcontrol:0,  ischeckbox:1},
            { id: 306, id_control: '3.5',  head_id: 3, text: "หน่วยงานมีการกำหนดให้มีกิจกรรมงาน/โครงการเพื่อคำนวณต้นทุนต่อหน่วยผลผลิต" , is_subcontrol:0,  ischeckbox:1},
            { id: 307, id_control: '3.6',  head_id: 3, text: "หน่วยงานมีการพิจารณาผลการปฏิบัติงานที่ผ่านมา เพื่อเป็นแนวทางในการกำหนดเป้าหมายผลผลิตประจำปี" , is_subcontrol:0,  ischeckbox:1},
    
            { id: 1007 , head_id: 3, sum_id: 301, value:  '', text: "การเชื่อมโยงงบประมาณ" },
            { id: 1008 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 301 , head_id: 3, risk_id: 302, is_improvement: 1},
            { id: 302 , head_id: 3, risk_id: 303, is_improvement: 1},
            { id: 303 , head_id: 3, risk_id: 304, is_improvement: 1},
            { id: 304 , head_id: 3, risk_id: 305, is_improvement: 1},
            { id: 305 , head_id: 3, risk_id: 306, is_improvement: 1},
            { id: 306 , head_id: 3, risk_id: 307, is_improvement: 1},

            // -------------------------- 4 -------------------------- //
            { id: 401, id_control: '4.',  head_id: 4,  mainControl_id: 4 ,text: "การบริหารจัดการ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่ามีหน่วยงานมีการนำส่งผลผลิต เป็นไปตามขั้นตอนการบริหารงบประมาณอย่างมีประสิทธิภาพบรรลุวัตถุประสงค์ของหน่วยงาน"},
            { id: 402, id_control: '4.1', head_id: 4, text: "หน่วยปฏิบัตินำส่งผลผลิตของหน่วยงานมีการจัดทำและบริหารแผนการปฏิบัติงานและแผนการใช้จ่ายงบประมาณประจำปี ซึ่งประกอบด้วยขั้นตอนและระยะเวลา ให้บรรลุเป้าหมายที่กำหนดของแต่ละขั้นตอน จนส่งผลสำเร็จในระดับผลผลิตของหน่วย" , is_subcontrol:0,  ischeckbox:1},
            { id: 403, id_control: '4.2', head_id: 4, text: "หน่วยปฏิบัตินำส่งผลผลิตของหน่วยงานมีการจัดทำระบบรายงานข้อมูลย้อนกลับของแต่ละผลผลิตที่เชื่อถือได้ และตรงตามกำหนดเวลา" , is_subcontrol:0,  ischeckbox:1},
            { id: 404, id_control: '4.3', head_id: 4, text: 'หน่วยปฏิบัตินำส่งผลผลิตของหน่วยงานมีการนำข้อมูลดังกล่าวมาใช้ในการบริหารจัดการและปรับปรุงการดำเนินงานให้ดีขึ้น' , is_subcontrol:0,  ischeckbox:1},
            { id: 405, id_control: '4.4', head_id: 4 ,text: "หน่วยปฏิบัตินำส่งผลผลิตของหน่วยงานมีการนำต้นทุนต่อหน่วยผลผลิตไปใช้ประโยชน์ในการบริหารจัดการ (โยงกับ ข้อ ๓.๕)" , is_subcontrol:0,  ischeckbox:1},
            { id: 406, id_control: '4.5', head_id: 4 ,text: "หน่วยปฏิบัตินำส่งผลผลิตของหน่วยงานมีกระบวนการจัดการที่ช่วยวัดผลการดำเนินงานและ/หรือ ปรับปรุงการดำเนินงาน ให้มีประสิทธิภาพ และ ความคุ้มค่า" , is_subcontrol:0,  ischeckbox:1},
            { id: 407, id_control: '4.6', head_id: 4 ,text: "หน่วยปฏิบัตินำส่งผลผลิตของหน่วยงานมีการรายงานผลการตรวจสอบทางการเงินที่แสดงถึงประสิทธิภาพการจัดการทางการเงินและเป็นไปตามกฎข้อบังคับที่เกี่ยวข้อง" , is_subcontrol:0,  ischeckbox:1},
            { id: 408, id_control: '4.7', head_id: 4 ,text: "ในการบริหารจัดการงบประมาณหน่วยปฏิบัตินำส่งผลผลิตได้ดำเนินการตามขั้นตอนการบริหารงบประมาณ อันได้แก่ การขออนุมัติปรับแผนปรับปรุงการใช้จ่ายงบประมาณประจำปี การตรวจสอบการใช้จ่ายงบประมาณ การขออนุมัติเงินประจำงวด การส่งคืนเงินประจำงวด ตามระยะเวลาที่กำหนด" , is_subcontrol:0,  ischeckbox:1},
            { id: 409, id_control: '4.8', head_id: 4 ,text: "หน่วยปฏิบัตินำส่งผลผลิตของหน่วยงานมีการประเมินบุคคลผู้รับผิดชอบผลผลิตในการนำส่งผลผลิตว่ามีประสิทธิภาพ" , is_subcontrol:0,  ischeckbox:1},
            { id: 410, id_control: '4.9', head_id: 4 ,text: "หากพบว่าการดำเนินการในข้อ ๔.๘ ไม่มีประสิทธิภาพ หน่วยงานมีการส่งบุคลากรผู้รับผิดชอบเข้ารับการสัมมนาและถ่ายทอดให้บุคลากรในหน่วยงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 411, id_control: '4.10',head_id: 4 ,text: "หน่วยงานมีรายงานที่แสดงความก้าวหน้าโดยการเปรียบเทียบผลลัพธ์ที่ได้กับเป้าหมายและตัวชี้วัดระยะยาวที่กําหนดไว้ตามแผนปฏิบัติราชการ" , is_subcontrol:0,  ischeckbox:1},
            
            { id: 1010 , head_id: 4, sum_id: 401, value: '',  text: "การบริหารจัดการ" },
            { id: 1011 , head_id: 4, sum_id: 402, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1012 , head_id: 4, sum_id: 403, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 401 , head_id: 4, risk_id: 402, is_improvement: 1},
            { id: 402 , head_id: 4, risk_id: 403, is_improvement: 1},
            { id: 403 , head_id: 4, risk_id: 404, is_improvement: 1},
            { id: 404 , head_id: 4, risk_id: 405, is_improvement: 1},
            { id: 405 , head_id: 4, risk_id: 406, is_improvement: 1},
            { id: 406 , head_id: 4, risk_id: 407, is_improvement: 1},
            { id: 407 , head_id: 4, risk_id: 408, is_improvement: 1},
            { id: 408 , head_id: 4, risk_id: 409, is_improvement: 1},
            { id: 409 , head_id: 4, risk_id: 410, is_improvement: 1},
            { id: 410 , head_id: 4, risk_id: 411, is_improvement: 1},
            
            //-------------------------- 5 -------------------------- //
            { id: 501, id_control: '5.',    head_id: 5, mainControl_id: 5 , text: "การประเมินผลในระดับผลผลิต/ผลลัพธ์" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าหน่วยงานมีการประเมินผลในระดับผลผลิต/ ผลลัพธ์ เป็นไปอย่างมีประสิทธิภาพและมีความคุ้มค่า"},
            { id: 502, id_control: '5.1',  head_id: 5, text: "ผลการประเมินในระดับผลผลิตตามรายงานล่าสุด มีความก้าวหน้าเมื่อเปรียบเทียบกับแผนกลยุทธ์/แผนปฏิบัติราชการของหน่วยงาน (ให้พิจารณาข้อ ๒.๔ ประกอบ)" , is_subcontrol:0,  ischeckbox:1},
            { id: 503, id_control: '5.2',  head_id: 5, text: "ผลการประเมินในระดับผลลัพธ์ (เป้าหมายหน่วยงาน) ตามรายงานล่าสุดมีความก้าวหน้าเมื่อเปรียบเทียบกับแผนกลยุทธ์/แผนปฏิบัติราชการของหน่วยงาน" , is_subcontrol:0,  ischeckbox:1},
            { id: 504, id_control: '5.3',  head_id: 5, text: "ผลการดําเนินงานของหน่วยงานมีประสิทธิภาพสูงขึ้น และมีความคุ้มค่าโดยเฉพาะความคุ้มค่าในการปฏิบัติภารกิจ ของรัฐ (ให้พิจารณาข้อ ๔.๕ ประกอบ)" , is_subcontrol:0,  ischeckbox:1},
            { id: 505, id_control: '5.4',  head_id: 5, text: "ผลการดำเนินงานของหน่วยงานอยู่ในเกณฑ์มาตรฐาน/ดีไม่น้อยกว่า เมื่อการเปรียบเทียบผลผลิตและเป้าหมายผลผลิตกับหน่วยงานเอกชนอื่นที่มีลักษณะเหมือน/คล้ายคลึงกัน" ,is_subcontrol:0,  ischeckbox:1},
            { id: 506, id_control: '5.5',  head_id: 5, text: "ผลการประเมินจากผู้ประเมินอิสระ แสดงให้เห็นว่าหน่วยงานบรรลุผลสำเร็จในระดับผลผลิตและผลลัพธ์ (ต่อเนื่องจากข้อ ๒.๖)" ,is_subcontrol:0,  ischeckbox:1},
            { id: 507, id_control: '5.6',  head_id: 5, text: "หน่วยงานมีการรวบรวมปัญหา อุปสรรค และข้อขัดข้องในการปฏิบัติ รวมทั้งผลการประเมินที่เกี่ยวข้องเพื่อนำไปปรับปรุงการดำเนินการด้านงบประมาณตามที่กำหนดในข้อ ๒, ๓, และ ๔" ,is_subcontrol:0,  ischeckbox:1},
                  
            { id: 1013 , head_id: 5, sum_id: 501, value: '',  text: "การบริหารจัดการ" },
            { id: 1014 , head_id: 5, sum_id: 502, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1015 , head_id: 5, sum_id: 503, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 501 , head_id: 5, risk_id: 502, is_improvement: 1},
            { id: 502 , head_id: 5, risk_id: 503, is_improvement: 1},
            { id: 503 , head_id: 5, risk_id: 504, is_improvement: 1},
            { id: 504 , head_id: 5, risk_id: 505, is_improvement: 1},
            { id: 505 , head_id: 5, risk_id: 506, is_improvement: 1},
            { id: 506 , head_id: 5, risk_id: 507, is_improvement: 1},
            
        ];
    } else if (data == 'branchpercelsandproperty') { //  branchpercelsandproperty

        str = [
            // หัวข้อคือเทเบิ้ลหลัก 
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "เรื่องทั่วไป (General)" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่ามีการกำหนดอำนาจหน้าที่ความรับผิดชอบระเบียบและระบบการตรวจสอบที่เหมาะสม"},
            { id: 102, id_control: '1.1', head_id: 1, text: "มีการกำหนดสายงานการปฏิบัติด้านพัสดุของหน่วย" , is_subcontrol:0 , ischeckbox:1 },
            { id: 103, id_control: '1.2', head_id: 1, text: "มีการกำหนดหน้าที่อย่างเหมาะสมสำหรับแต่ละคนหรือแต่ละหน่วยงานในเรื่องเกี่ยวกับการบริหารพัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 104, id_control: '1.3', head_id: 1, text: "มีการกำหนดวิธีปฏิบัติ หรือคู่มือด้านพัสดุของหน่วย" , is_subcontrol:0 , ischeckbox:1 },
            { id: 105, id_control: '1.4', head_id: 1 ,text: "มีระเบียบจัดซื้อที่ครอบคลุมถึงเรื่องต่อไปนี้ (กรณีมิได้ใช้ พ.ร.บ.การจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ.๒๕๖๐ ระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ.๒๕๖๐ กฎกระทรวง และระเบียบข้อบังคับอื่น ๆ ที่เกี่ยวข้อง)" , is_subcontrol:1 },
            { id: 106, id_control: '1.4', id_subcontrol: '1.4.1', head_id: 1, text: "นโยบายการจัดซื้อ เช่น ซื้อจากผู้ขายหรือหรือผู้ผลิต โดยตรง" , is_subcontrol:0 , ischeckbox:1 },
            { id: 107, id_control: '1.4', id_subcontrol: '1.4.2', head_id: 1, text: "วิธีการคัดเลือกผู้ขาย" , is_subcontrol:0 , ischeckbox:1 },
            { id: 108, id_control: '1.4', id_subcontrol: '1.4.3', head_id: 1, text: "ขั้นตอนการจัดหา" , is_subcontrol:0 , ischeckbox:1 },
            { id: 109, id_control: '1.4', id_subcontrol: '1.4.4', head_id: 1, text: "การทำสัญญา" , is_subcontrol:0 , ischeckbox:1 },
            { id: 110, id_control: '1.4', id_subcontrol: '1.4.5', head_id: 1, text: "การตรวจรับพัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 111, id_control: '1.4', id_subcontrol: '1.4.6', head_id: 1, text: "การขึ้นบัญชีควบคุมพัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 112, id_control: '1.4', id_subcontrol: '1.4.7', head_id: 1, text: "การเก็บรักษาพัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 113, id_control: '1.4', id_subcontrol: '1.4.8', head_id: 1, text: "การจำหน่ายพัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 114, id_control: '1.5', head_id: 1, text: "มีการแต่งตั้งหัวหน้าเจ้าหน้าที่พัสดุ และเจ้าหน้าที่พัสดุเพื่อปฏิบัติงานด้านพัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 115, id_control: '1.6', head_id: 1, text: "มีการกำหนดผู้รับผิดชอบด้านพัสดุโดยแยกออกจากผู้รับผิดชอบด้านการเงินและการบัญชี" , is_subcontrol:0 , ischeckbox:1 },
            { id: 116, id_control: '1.7', head_id: 1, text: "มีระบบการตรวจสอบเพื่อให้มีความมั่นใจในการปฏิบัติ พระราชบัญญัติการจัดซื้อจัดจ้างฯ และระเบียบกฎหมายกำหนดไว้" , is_subcontrol:0 , ischeckbox:1 },
  
            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "เรื่องทั่วไป"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 106, is_improvement: 1},
            { id: 105 , head_id: 1, risk_id: 107, is_improvement: 1},
            { id: 106 , head_id: 1, risk_id: 108, is_improvement: 1},
            { id: 107 , head_id: 1, risk_id: 109, is_improvement: 1},
            { id: 108 , head_id: 1, risk_id: 110, is_improvement: 1},
            { id: 109 , head_id: 1, risk_id: 111, is_improvement: 1},
            { id: 110 , head_id: 1, risk_id: 112, is_improvement: 1},
            { id: 111 , head_id: 1, risk_id: 113, is_improvement: 1},
            { id: 112 , head_id: 1, risk_id: 114, is_improvement: 1},
            { id: 113 , head_id: 1, risk_id: 115, is_improvement: 1},
            { id: 114 , head_id: 1, risk_id: 116, is_improvement: 1},


            { id: 201, id_control: '2.',  head_id: 2, mainControl_id: 2 , text: "การกำหนดความต้องการ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่าการกำหนดความต้องการพัสดุตรงตามความต้องการที่แท้จริงและได้พัสดุมาใช้งานทันเวลา"},
            { id: 202, id_control: '2.1', head_id: 2, text: "การกำหนดความต้องการพัสดุมีการปฏิบัติตามระเบียบหรือวิธีปฏิบัติที่กำหนดไว้" , is_subcontrol:0 , ischeckbox:1 },
            { id: 203, id_control: '2.2', head_id: 2, text: "ผู้ใช้พัสดุ (Users) เป็นผู้กำหนดความต้องการพัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 204, id_control: '2.3', head_id: 2, text: "การกำหนดความต้องการพัสดุ คำนวณจากแผนงาน งาน/โครงการ ตามระยะเวลาที่จะใช้พัสดุ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 205, id_control: '2.4', head_id: 2, text: "การแจ้งความต้องการพัสดุหรือขอให้จัดหา ได้ระบุรายการหรือประเภทพัสดุ ปริมาณพัสดุ กำหนดเวลา ต้องการอย่างละเอียดและชัดเจน" , is_subcontrol:0 , ischeckbox:1 },
            { id: 206, id_control: '2.5', head_id: 2, text: "มีการกำหนดระยะเวลา การเสนอความต้องการพัสดุไว้อย่างเหมาะสมและเพียงพอสำหรับการใช้งาน และมีความสอดคล้องกับวิธีการซื้อ/จ้าง ที่กำหนดภายใต้ กฎ ระเบียบที่เกี่ยวข้อง โดยมีเหตุผลความจำเป็น" , is_subcontrol:0 , ischeckbox:1 },

            { id: 1004 , head_id: 2, sum_id: 201, value:  '', text: "การกำหนดความต้องการ" },
            { id: 1005 , head_id: 2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 2, risk_id: 203, is_improvement: 1},
            { id: 203 , head_id: 2, risk_id: 204, is_improvement: 1},
            { id: 204 , head_id: 2, risk_id: 205, is_improvement: 1},
            { id: 205 , head_id: 2, risk_id: 206, is_improvement: 1},
            

            { id: 301, id_control: '3.',   head_id: 3,  mainControl_id: 3 ,text: "การจัดหา" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจ ว่าการจัดหาพัสดุบรรลุตามวัตถุประสงค์และประหยัด"},
            { id: 302, id_control: '3.1',  head_id: 3, text: "การจัดหาพัสดุเป็นไปตามแผนการจัดหา" , is_subcontrol:0 , ischeckbox:1 },
            { id: 303, id_control: '3.2',  head_id: 3, text: "การกำหนดระยะเวลาการดำเนินการจัดหาในแต่ละวิธีไว้เหมาะสมและทันกับความต้องการ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 304, id_control: '3.3',  head_id: 3, text: "มีการจัดทำทะเบียนประวัติผู้ขาย รวมทั้งสถิติราคา และปริมาณไว้" , is_subcontrol:0 , ischeckbox:1 },
            { id: 305, id_control: '3.4',  head_id: 3, text: "มีการหมุนเวียนเจ้าหน้าที่จัดหา" , is_subcontrol:0 , ischeckbox:1 },
            { id: 306, id_control: '3.5',  head_id: 3, text: "มีการจัดทำราคากลางตามแนวทางการประกาศและคำนวณราคากลางเกี่ยวกับการจัดซื้อจัดจ้างของหน่วยงานของรัฐ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 307, id_control: '3.6',  head_id: 3, text: "มีการจัดทำราคากลางเพื่อใช้เป็นฐานสำหรับเปรียบเทียบราคาที่ผู้ยื่นข้อเสนอได้ยื่นเสนอไว้ ที่สามารถจัดซื้อ/จ้างได้จริง" , is_subcontrol:0 , ischeckbox:1 },
            { id: 308, id_control: '3.7',  head_id: 3, text: "การจัดหากระทำโดยหน่วยจัดหา หรือเจ้าหน้าที่พัสดุ ตามใบแจ้งความต้องการพัสดุหรือใบขออนุมัติจัดหาที่ได้รับอนุมัติแล้ว" , is_subcontrol:0 , ischeckbox:1 },
            { id: 309, id_control: '3.8',  head_id: 3, text: "กำหนดให้รวมการจัดซื้อพัสดุคราวละมากๆ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 310, id_control: '3.9',  head_id: 3, text: "มีการจัดทำใบสั่งซื้อและสำเนาให้ผู้เกี่ยวข้อง คือ ผู้ตรวจรับของ ผู้แจ้งจัดหา บัญชีหรือการเงิน ฯลฯ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 311, id_control: '3.10',  head_id: 3, text: "กำหนดหลักเกณฑ์ในการจัดทำสัญญาชัดเจนและรัดกุม" , is_subcontrol:0 , ischeckbox:1 },
            { id: 312, id_control: '3.11',  head_id: 3, text: "รูปแบบสัญญาเป็นไปตามมาตรฐาน กวพ." , is_subcontrol:0 , ischeckbox:1 },
            { id: 313, id_control: '3.12',  head_id: 3, text: "การจัดหาแต่ละขั้นตอนมีการบันทึกในระบบ e-GP ถูกต้องครบถ้วนตามขั้นตอน" , is_subcontrol:0 , ischeckbox:1 },
    
            { id: 1007 , head_id: 3, sum_id: 301, value:  '', text: "การจัดหา" },
            { id: 1008 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 301 , head_id: 3, risk_id: 302, is_improvement: 1},
            { id: 302 , head_id: 3, risk_id: 303, is_improvement: 1},
            { id: 303 , head_id: 3, risk_id: 304, is_improvement: 1},
            { id: 304 , head_id: 3, risk_id: 305, is_improvement: 1},
            { id: 305 , head_id: 3, risk_id: 306, is_improvement: 1},
            { id: 306 , head_id: 3, risk_id: 307, is_improvement: 1},
            { id: 307 , head_id: 3, risk_id: 308, is_improvement: 1},
            { id: 308 , head_id: 3, risk_id: 309, is_improvement: 1},
            { id: 309 , head_id: 3, risk_id: 310, is_improvement: 1},
            { id: 310 , head_id: 3, risk_id: 311, is_improvement: 1},
            { id: 311 , head_id: 3, risk_id: 312, is_improvement: 1},
            { id: 312 , head_id: 3, risk_id: 313, is_improvement: 1},


            { id: 401, id_control: '4.',  head_id: 4,  mainControl_id: 4 ,text: "การบริหารสัญญาและการตรวจรับ" ,main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่าการบริหารสัญญาและการตรวจรับเป็นไปตามสัญญา"},
            { id: 402, id_control: '4.1', head_id: 4, text: "มีการเร่งรัดการส่งมอบ ตามใบสั่งซื้อ/สัญญา และแจ้งสงวนสิทธิ์การปรับเรียกร้องสิทธิ์ตามสัญญาเมื่อใกล้ครบกำหนด" , is_subcontrol:0 , ischeckbox:1 },
            { id: 403, id_control: '4.2', head_id: 4, text: "กรณีผู้ขายไม่ส่งมอบพัสดุตามกำหนดและมีการปรับ ซึ่งค่าปรับกำลังจะเกินร้อยละสิบของมูลค่าพัสดุ ได้มีการแจ้งเตือนการยกเลิกสัญญา" , is_subcontrol:0 , ischeckbox:1 },
            { id: 404, id_control: '4.3', head_id: 4, text: "พัสดุที่สำคัญ หรือพัสดุที่คุณภาพพิเศษ มีการแต่งตั้งคณะกรรมการตรวจรับโดยผู้ชำนาญ ในเรื่องนั้นโดยเฉพาะ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 405, id_control: '4.4', head_id: 4, text: "ตรวจนับจำนวน และชนิดของพัสดุที่ได้รับกับใบสั่งซื้อหรือใบส่งของ พร้อมลงนามผู้ตรวจรับ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 406, id_control: '4.5', head_id: 4, text: "ทดสอบคุณภาพตามข้อกำหนดในใบสั่งซื้อ หรือสัญญาซื้อขาย" , is_subcontrol:0 , ischeckbox:1 },
            { id: 407, id_control: '4.6', head_id: 4, text: "จัดทำรายงานสิ่งผิดปกติที่เกิดขึ้น เช่น พัสดุไม่ได้คุณภาพ พัสดุขาดหรือเสียหาย" , is_subcontrol:0 , ischeckbox:1 },
            { id: 408, id_control: '4.7', head_id: 4, text: "หลังการตรวจรับมีการรายงานผลการตรวจรับขออนุมัติขึ้นบัญชี และมีการบันทึกลงระบบ e-GP หรือไม่" , is_subcontrol:0 , ischeckbox:1 },
            { id: 409, id_control: '4.8', head_id: 4, text: "ในกรณีที่ผู้ขายส่งมอบพัสดุเกินกำหนดเวลา มีการแจ้งการปรับ" , is_subcontrol:0 , ischeckbox:1 },
            { id: 410, id_control: '4.9', head_id: 4, text: "มีการติดตามกับผู้ขายสำหรับสินค้าที่ชำรุดเสียหาย และ/หรือได้รับไม่ครบ" , is_subcontrol:0 , ischeckbox:1 },
           
            { id: 1010 , head_id: 4, sum_id: 101, value: '',  text: "การบริหารสัญญาและการตรวจรับ" },
            { id: 1011 , head_id: 4, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1012 , head_id: 4, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            
            // ส่วนเก็บ improvement
            { id: 401 , head_id: 4, risk_id: 402, is_improvement: 1},
            { id: 402 , head_id: 4, risk_id: 403, is_improvement: 1},
            { id: 403 , head_id: 4, risk_id: 404, is_improvement: 1},
            { id: 404 , head_id: 4, risk_id: 405, is_improvement: 1},
            { id: 405 , head_id: 4, risk_id: 406, is_improvement: 1},
            { id: 406 , head_id: 4, risk_id: 407, is_improvement: 1},
            { id: 407 , head_id: 4, risk_id: 408, is_improvement: 1},
            { id: 408 , head_id: 4, risk_id: 409, is_improvement: 1},
            { id: 409 , head_id: 4, risk_id: 410, is_improvement: 1},

            // { id: 401, id_control: '4.1', id_subcontrol: '4.1.1', head_id: 4, text: "ระยะสั้น" ,is_innercontrol: 0}, // เทเบิ้ล subcontrol
            // { id: 402, id_control: '4.1', id_subcontrol: '4.1.2', head_id: 4, text: "ระยะปานกลาง" ,is_innercontrol: 0}, // เทเบิ้ล subcontrol
            
            { id: 501, id_control: '5.',   head_id: 5, mainControl_id: 5 , text: "การควบคุมและการแจกจ่าย" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่ามีพัสดุไว้เพียงพอและทันกับความต้องการและจัดเก็บไว้อย่างปลอดภัย ไม่ชำรุดเสียหายหรือเสื่อมสภาพ"},
            { id: 502, id_control: '5.1',  head_id: 5, text: "มีเครื่องมือในการควบคุมการบริหารพัสดุ เช่น บัตรคุมพัสดุ ระบบควบคุมพัสดุอัตโนมัติ ทร. SUPPINV. 1-3 vol.4 หรือคอมพิวเตอร์" , is_subcontrol:0 , ischeckbox:1},
            { id: 503, id_control: '5.2',  head_id: 5, text: "มีการจัดทำบัญชีพัสดุ และทะเบียนคุมทรัพย์สินของหน่วย" , is_subcontrol:0 , ischeckbox:1},
            { id: 504, id_control: '5.3',  head_id: 5, text: "มีการตรวจสอบความถูกต้องของใบเบิก และลงบัญชี/ทะเบียนทุกครั้งที่มีการจ่ายพัสดุ" , is_subcontrol:0 , ischeckbox:1},
            { id: 505, id_control: '5.4',  head_id: 5, text: "มีการกำหนดระดับปลอดภัย ( Safety Stock )" , is_subcontrol:0 , ischeckbox:1},
            { id: 506, id_control: '5.5',  head_id: 5, text: "มีการกำหนดจุดสั่งซื้อเพิ่มเติมเข้าคลัง (Order Point)" , is_subcontrol:0 , ischeckbox:1},
            { id: 507, id_control: '5.6',  head_id: 5, text: "การเบิกจ่ายพัสดุได้รับอนุมัติจากหัวหน้าหน่วยพัสดุ" , is_subcontrol:0 , ischeckbox:1},
            { id: 508, id_control: '5.7',  head_id: 5, text: "มีการเก็บใบเบิกจ่ายพัสดุไว้เป็นหลักฐานเพื่อนำมาตรวจสอบยังความถูกต้องของพัสดุคงเหลือกับบัญชีทะเบียน" , is_subcontrol:0 , ischeckbox:1},
            { id: 509, id_control: '5.8',  head_id: 5, text: "มีการแต่งตั้งคณะกรรมการตรวจสอบพัสดุประจำปี ตามระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ.๒๕๖๐ และที่แก้ไขเพิ่มเติม" , is_subcontrol:0 , ischeckbox:1},
            { id: 510, id_control: '5.9',  head_id: 5, text: "มีการจัดทำรายงานผลการตรวจสอบการรับ-จ่ายพัสดุคงเหลือประจำปี" , is_subcontrol:0 , ischeckbox:1},
            { id: 511, id_control: '5.10', head_id: 5, text: "กรณีมีพัสดุชำรุด เสื่อมสภาพ สูญหายหรือหมดความจำเป็น ต้องใช้งานมีการรายงานเพื่อแต่งตั้งคณะกรรมการสอบหาข้อเท็จจริง และดำเนินการตามระเบียบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 512, id_control: '5.11', head_id: 5, text: "กรณีพัสดุสูญหายหรือเสียหาย ใช้การไม่ได้โดยไม่ทราบสาเหตุ มีการสอบสวนหาตัวผู้รับผิดทางละเมิดและติดตามเรียกค่าสินไหมทดแทน" , is_subcontrol:0 , ischeckbox:1},
            { id: 513, id_control: '5.12', head_id: 5, text: "สถานที่จัดเก็บพัสดุ มีการแต่งตั้งเวรยามรักษาความปลอดภัย" , is_subcontrol:0 , ischeckbox:1},
            { id: 514, id_control: '5.13', head_id: 5, text: "สถานที่จัดเก็บพัสดุ มีการประกันภัยไว้" , is_subcontrol:0 , ischeckbox:1},
            { id: 515, id_control: '5.14', head_id: 5, text: "มีสถานที่จัดเก็บเพียงพอ" , is_subcontrol:0 , ischeckbox:1},

            { id: 1013 , head_id: 5, sum_id: 101, value: '',  text: "การควบคุมและการแจกจ่าย" },
            { id: 1014 , head_id: 5, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1015 , head_id: 5, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            
            // ส่วนเก็บ improvement
            { id: 501 , head_id: 5, risk_id: 502, is_improvement: 1},
            { id: 502 , head_id: 5, risk_id: 503, is_improvement: 1},
            { id: 503 , head_id: 5, risk_id: 504, is_improvement: 1},
            { id: 504 , head_id: 5, risk_id: 505, is_improvement: 1},
            { id: 505 , head_id: 5, risk_id: 506, is_improvement: 1},
            { id: 506 , head_id: 5, risk_id: 507, is_improvement: 1},
            { id: 507 , head_id: 5, risk_id: 508, is_improvement: 1},
            { id: 508 , head_id: 5, risk_id: 509, is_improvement: 1},
            { id: 509 , head_id: 5, risk_id: 510, is_improvement: 1},
            { id: 510 , head_id: 5, risk_id: 511, is_improvement: 1},
            { id: 511 , head_id: 5, risk_id: 512, is_improvement: 1},
            { id: 512 , head_id: 5, risk_id: 513, is_improvement: 1},
            { id: 513 , head_id: 5, risk_id: 514, is_improvement: 1},
            { id: 514 , head_id: 5, risk_id: 515, is_improvement: 1},
            

            
            { id: 601, id_control: '6.', head_id: 6, mainControl_id: 6 , text: "การบำรุงรักษา" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่าพัสดุมีการบำรุงรักษาและซ่อมแซมให้สามารถใช้งานได้"},
            { id: 602, id_control: '6.1',  head_id: 6, text: "มีการจัดทำแผนการบำรุงรักษาพัสดุ" , is_subcontrol:0 , ischeckbox:1},
            { id: 603, id_control: '6.2', head_id: 6, text: "มีการจัดทำรายงานการการบำรุงรักษาเป็นไปตามแผน" , is_subcontrol:0 , ischeckbox:1},
            { id: 604, id_control: '6.3', head_id: 6, text: "มีการจัดฝึกอบรมหรือมีคู่มือการบำรุงรักษาให้แก่ผู้ใช้พัสดุ" , is_subcontrol:0 , ischeckbox:1},
            { id: 605, id_control: '6.4', head_id: 6, text: "มีการพิจารณาข้อเปรียบเทียบการบำรุงรักษาระหว่าง การดำเนินงานเองและการจ้างหน่วยงานภายนอก" , is_subcontrol:0 , ischeckbox:1},

            { id: 1016 , head_id: 6, sum_id: 101, value: '',  text: "การบำรุงรักษา" },
            { id: 1017 , head_id: 6, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1018 , head_id: 6, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 601 , head_id: 6, risk_id: 602, is_improvement: 1},
            { id: 602 , head_id: 6, risk_id: 603, is_improvement: 1},
            { id: 603 , head_id: 6, risk_id: 604, is_improvement: 1},
            { id: 604 , head_id: 6, risk_id: 605, is_improvement: 1},
          

            { id: 701, id_control: '7.', head_id: 7, mainControl_id: 7 , text: "การจำหน่ายพัสดุ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่ามีการจำหน่ายพัสดุที่หมดความจำเป็น"},
            { id: 702, id_control: '7.1',  head_id: 7, text: "มีการรายงานพัสดุที่หมดความจำเป็นหรือหากใช้ต่อไปจะสิ้นเปลืองค่าใช้จ่ายมาก และรายงานพัสดุที่สูญหายต่อผู้มีอำนาจเพื่อพิจารณาให้จำหน่ายพัสดุ" , is_subcontrol:0 , ischeckbox:1},
            { id: 703, id_control: '7.2', head_id: 7, text: "เมื่อได้รับการอนุมัติจำหน่ายบัญชีแล้ว หน่วยดำเนินการลงจ่ายออกบัญชีและรายงานตามระเบียบฯ" , is_subcontrol:0 , ischeckbox:1},
            { id: 704, id_control: '7.3', head_id: 7, text: "พัสดุที่ได้รับอนุมัติจำหน่ายแล้ว ได้ดำเนินการส่งคืนหน่วยเทคนิค เพื่อดำเนินการตามระเบียบฯ" , is_subcontrol:0 , ischeckbox:1},

            { id: 1019 , head_id: 7, sum_id: 101, value: '',  text: "การจำหน่ายพัสดุ" },
            { id: 1020 , head_id: 7, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1021 , head_id: 7, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            
            
            // ส่วนเก็บ improvement
            { id: 701 , head_id: 7, risk_id: 702, is_improvement: 1},
            { id: 702 , head_id: 7, risk_id: 703, is_improvement: 1},
            { id: 703 , head_id: 7, risk_id: 704, is_improvement: 1},
       
        ]
    } else if (data == 'branchfinanceandacc') { //  branchfinanceandacc
        str = [
            // -------------------------- 1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            
            { id: 101, id_control: '1.',  mainControl_id: 1 , head_id: 1, text: "กิจกรรมการเบิกเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่าการเบิกเงินมีเอกสารประกอบ การอนุมัติถูกต้อง ตามระเบียบ"},
            { id: 102, id_control: '1.1', head_id: 1, text: "การเบิกเงินมีเอกสารหลักฐานครบถ้วนถูกต้องตามระเบียบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 103, id_control: '1.2', head_id: 1, text: "มีการตรวจสอบการบันทึกรายการในสมุดคู่มือวางฎีกาว่าครบถ้วนถูกต้องเป็นไปตามระเบียบที่กำหนด" , is_subcontrol:0,  ischeckbox:1},
            { id: 104, id_control: '1.3', head_id: 1, text: "ผู้มีอำนาจสั่งจ่ายเงินอนุมัติกรณีมีความจำเป็นต้องใช้สมุดคู่มือวางฎีกาเกินกว่าหนึ่งเล่มในเวลาเดียวกัน" , is_subcontrol:0,  ischeckbox:1},
            { id: 105, id_control: '1.4', head_id: 1 ,text: "มีคำสั่งแต่งตั้งผู้เก็บรักษาสมุดคู่มือวางฎีกาที่ยังไม่ได้ใช้และจัดทำรายการแสดงการรับจ่ายสมุดคู่มือวางฎีกา" , is_subcontrol:0,  ischeckbox:1},
            { id: 106, id_control: '1.5', head_id: 1 ,text: "มีการลงลายมือชื่อผู้รับฎีกาในสมุดคู่มือวางฎีกา" , is_subcontrol:0,  ischeckbox:1},
            { id: 107, id_control: '1.6', head_id: 1 ,text: "การวางฎีกาเบิกเงินกระทำเมื่อต้องการเบิกเงินไปจ่ายตามงวด หรือมีรายการที่จะต้องจ่ายอยู่แล้ว" , is_subcontrol:0,  ischeckbox:1},
            { id: 108, id_control: '1.7', head_id: 1 ,text: "มีการจัดทำทะเบียนคุมใบสำคัญการขอเบิกเงิน" , is_subcontrol:0,  ischeckbox:1},
            { id: 109, id_control: '1.8', head_id: 1 ,text: "มีการจัดทำทะเบียนคุมการเบิกเงินงบประมาณ" , is_subcontrol:0,  ischeckbox:1},
            { id: 110, id_control: '1.9', head_id: 1 ,text: "มีการตรวจสอบก่อนการอนุมัติจ่ายเงิน ว่ามีงบประมาณเพียงพอหรือไม่ ก่อนการเบิกเงินและอนุมัติให้จ่ายเงินได้" , is_subcontrol:0,  ischeckbox:1},
            { id: 111, id_control: '1.10',head_id: 1 ,text: "เมื่อวางฎีกาเบิกเงินมีการบันทึกหักงบประมาณในทะเบียนคุมการเบิกเงินงบประมาณ" , is_subcontrol:0,  ischeckbox:1},
            { id: 112, id_control: '1.11',head_id: 1 ,text: "เมื่อมีการรับคืนงบประมาณและนำส่งคืนให้หน่วยที่เกี่ยวข้องมีการบันทึกไว้ในทะเบียนคุมการเบิกเงินงบประมาณ" , is_subcontrol:0,  ischeckbox:1},
            { id: 113, id_control: '1.12', head_id: 1 ,text: "มีการจัดทำรายงานเบิกเงินงบประมาณเพื่อแสดงสถานภาพเงินงบประมาณที่ได้รับจัดสรรคงเหลือ ณ วันสิ้นเดือนตามแบบและระยะเวลาที่กำหนด" , is_subcontrol:0,  ischeckbox:1},
            { id: 114, id_control: '1.13', head_id: 1 ,text: "มีการตรวจสอบเงินงบประมาณที่ได้รับจัดสรรคงเหลือกับหน่วย ที่เกี่ยวข้องเป็นประจำทุกเดือน" , is_subcontrol:0,  ischeckbox:1},
            { id: 115, id_control: '1.14',head_id: 1 ,text: "มีการตรวจสอบการเบิกจ่ายที่มีโอกาสเบิกซ้ำซ้อนอย่างสม่ำเสมอ โดยใช้ระบบโปรแกรม NFMIS ควบคุม เช่น ค่าปฏิบัติงานนอกเวลาราชการ ค่าใช้จ่ายในการเดินทางไปราชการ ค่าตอบแทนให้กับผู้ปฏิบัติหน้าที่เผชิญเหตุการณ์" , is_subcontrol:0,  ischeckbox:1},
            { id: 116, id_control: '1.15',head_id: 1 ,text: "มีการตรวจสอบการเบิกเงินเดือนหรือเบี้ยเลี้ยงพลทหารอย่างสม่ำเสมอ เช่น การขาด ลา หนี " , is_subcontrol:0,  ischeckbox:1},

            { id: 1001 , head_id: 1, sum_id: 101, value: '',  text: "การเบิกเงิน"},
            { id: 1002 , head_id: 1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1, risk_id: 105, is_improvement: 1},
            { id: 105 , head_id: 1, risk_id: 106, is_improvement: 1},
            { id: 106 , head_id: 1, risk_id: 107, is_improvement: 1},
            { id: 107 , head_id: 1, risk_id: 108, is_improvement: 1},
            { id: 108 , head_id: 1, risk_id: 109, is_improvement: 1},
            { id: 109 , head_id: 1, risk_id: 110, is_improvement: 1},
            { id: 110 , head_id: 1, risk_id: 111, is_improvement: 1},
            { id: 111 , head_id: 1, risk_id: 112, is_improvement: 1},
            { id: 112 , head_id: 1, risk_id: 113, is_improvement: 1},
            { id: 113 , head_id: 1, risk_id: 114, is_improvement: 1},
            { id: 114 , head_id: 1, risk_id: 115, is_improvement: 1},
            { id: 115 , head_id: 1, risk_id: 116, is_improvement: 1},


            // -------------------------- 2 -------------------------- //
            { id: 201, id_control: '2.1',  head_id: 2.1, mainControl_id: 2 , text: "การรับเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่าการรับเงินมีเอกสารประกอบการอนุมัติ ตรวจสอบและมีการบันทึกอย่างถูกต้องครบถ้วน"},

            { id: 203, id_control: '2.1', id_subcontrol: '2.1.1', head_id: 2.1, text: "มีการแบ่งแยกหน้าที่ด้านการรับเงินมิให้บุคคลใดบุคคลหนึ่ง มีหน้าที่รับผิดชอบมากกว่าหนึ่งลักษณะงานต่อไปนี้" ,is_innercontrol:1},
            { id: 204, id_control: '2.1', id_subcontrol: '2.1.1', id_innercontrol: '2.1.1.1', head_id: 2.1, text: "การอนุมัติการรับเงินสด",is_innercontrol: 0,  ischeckbox:1},
            { id: 205, id_control: '2.1', id_subcontrol: '2.1.1', id_innercontrol: '2.1.1.2', head_id: 2.1, text: "การบันทึกบัญชีเงินสดและเงินฝากธนาคาร",is_innercontrol: 0,  ischeckbox:1},
            { id: 206, id_control: '2.1', id_subcontrol: '2.1.1', id_innercontrol: '2.1.1.3', head_id: 2.1, text: "การนำเงินสดฝากธนาคาร",is_innercontrol: 0,  ischeckbox:1},
            { id: 207, id_control: '2.1', id_subcontrol: '2.1.1', id_innercontrol: '2.1.1.4', head_id: 2.1, text: "การกระทบยอดเงินสดและเงินฝากธนาคาร",is_innercontrol: 0,  ischeckbox:1},      
           
            { id: 208, id_control: '2.1', id_subcontrol: '2.1.2', head_id: 2.1, text: "การรับเงินราชการมีเอกสารหลักฐานประกอบการรับเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 209, id_control: '2.1', id_subcontrol: '2.1.3', head_id: 2.1, text: "มีการตรวจสอบการรับเงินตามฎีกาเบิกเงินกับสมุดคู่มือวางฎีกา" , is_subcontrol:0 , ischeckbox:1},
            { id: 210, id_control: '2.1', id_subcontrol: '2.1.4', head_id: 2.1, text: "มีการตรวจสอบการรับเงินตามฎีกาเบิกเงินกับสมุดคู่มือวางฎีกา" , is_subcontrol:0 , ischeckbox:1},
            { id: 211, id_control: '2.1', id_subcontrol: '2.1.5', head_id: 2.1, text: "มีการกำหนดแนวทางปฏิบัติในการรับส่งเงินระหว่างบุคคลและหน่วยงานเป็นลายลักษณ์อักษร" , is_subcontrol:0 , ischeckbox:1},
            { id: 212, id_control: '2.1', id_subcontrol: '2.1.6', head_id: 2.1, text: "เงินที่ไม่สามารถระบุที่มา ได้มีการบันทึกบัญชีเพื่อรอการตรวจสอบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 213, id_control: '2.1', id_subcontrol: '2.1.7', head_id: 2.1, text: "มีการสะสางเงินที่ไม่สามารถระบุที่มาและปรับปรุงรายการบัญชีให้ถูกต้อง" , is_subcontrol:0 , ischeckbox:1},
            { id: 214, id_control: '2.1', id_subcontrol: '2.1.8', head_id: 2.1, text: "การรับเงินโดยการโอนผ่านระบบอิเล็กทรอนิกส์ มีการยืนยันเป็นลายลักษณ์อักษรโดยระบุชื่อ ผู้จ่ายเงิน จำนวนเงินและวัตถุประสงค์การจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 215, id_control: '2.1', id_subcontrol: '2.1.9', head_id: 2.1, text: "มีการตรวจสอบใบฝากเงินหรือใบนำส่งเงินกับหลักฐานประกอบการฝากเงินหรือนำส่ง" , is_subcontrol:0 , ischeckbox:1},
           
            { id: 216, id_control: '2.1', id_subcontrol: '2.1.10', head_id: 2.1, text: "การรับเอกสารการเงินซึ่งมีมูลค่าเป็นเงิน ในกรณีดังต่อไปนี้ได้ปฏิบัติตามระเบียบที่กำหนด" ,is_innercontrol:1},
            { id: 217, id_control: '2.1', id_subcontrol: '2.1.10', id_innercontrol: '2.1.10.1', head_id: 2.1, text: "รับเงินจากส่วนราชการ รัฐวิสาหกิจ ข้าราชการทหารประจำการ",is_innercontrol: 0,  ischeckbox:1},
            { id: 218, id_control: '2.1', id_subcontrol: '2.1.10', id_innercontrol: '2.1.10.2', head_id: 2.1, text: "รับชำระหนี้จากบุคคลอื่น",is_innercontrol: 0,  ischeckbox:1},
            { id: 219, id_control: '2.1', id_subcontrol: '2.1.10', id_innercontrol: '2.1.10.3', head_id: 2.1, text: "รับบริจาคเป็นพันธบัตรรัฐบาล",is_innercontrol: 0,  ischeckbox:1},
            { id: 220, id_control: '2.1', id_subcontrol: '2.1.10', id_innercontrol: '2.1.10.4', head_id: 2.1, text: "รับเพื่อเป็นหลักประกันซองหรือหลักประกันสัญญา",is_innercontrol: 0,  ischeckbox:1},         
            
            { id: 221, id_control: '2.1', id_subcontrol: '2.1.11', head_id: 2.1, text: "มีการตรวจสอบความถูกต้องและเชื่อถือได้ของ เช็คก่อนรับ" , is_subcontrol:0 , ischeckbox:1},
            { id: 222, id_control: '2.1', id_subcontrol: '2.1.12', head_id: 2.1, text: "เช็คที่มีการแก้ไขอย่างน่าสงสัย มีการส่งคืน ผู้สั่งจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 223, id_control: '2.1', id_subcontrol: '2.1.13', head_id: 2.1, text: "มีการออกใบเสร็จรับเงินทุกครั้งที่มีการรับเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 224, id_control: '2.1', id_subcontrol: '2.1.14', head_id: 2.1, text: "ใบเสร็จรับเงินมีการพิมพ์หมายเลขกำกับเล่มและใบเสร็จรับเงินเรียงกันไปทุกฉบับ" , is_subcontrol:0 , ischeckbox:1},
            { id: 225, id_control: '2.1', id_subcontrol: '2.1.15', head_id: 2.1, text: "มีการจัดทำทะเบียนคุมใบเสร็จรับเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 226, id_control: '2.1', id_subcontrol: '2.1.16', head_id: 2.1, text: "มีการสรุปยอดเงินที่ได้รับทุกวันเมื่อสิ้นเวลารับเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 227, id_control: '2.1', id_subcontrol: '2.1.17', head_id: 2.1, text: "เงินรายได้แผ่นดิน ได้นำส่งส่วนราชการทั้งหมดภายในเวลาที่ระเบียบกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 228, id_control: '2.1', id_subcontrol: '2.1.18', head_id: 2.1, text: "มีคำสั่งแต่งตั้งข้าราชการสัญญาบัตรที่มิใช่เจ้าหน้าที่การเงินเป็นผู้จัดเก็บเงินรายได้แผ่นดิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 229, id_control: '2.1', id_subcontrol: '2.1.19', head_id: 2.1, text: "มีการนำฝากเงินบูรณะทรัพย์สินเข้าบัญชีของส่วนราชการภายในเวลาที่ระเบียบกำหนด" , is_subcontrol:0 , ischeckbox:1},

            
            { id: 1004 , head_id: 2.1, sum_id: 201, value:  '', text: "การรับเงิน" },
            { id: 1005 , head_id: 2.1, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 2.1, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
 
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 2.1, risk_id: 204, is_improvement: 1},
            { id: 202 , head_id: 2.1, risk_id: 205, is_improvement: 1},
            { id: 203 , head_id: 2.1, risk_id: 206, is_improvement: 1},
            { id: 204 , head_id: 2.1, risk_id: 207, is_improvement: 1},
            { id: 205 , head_id: 2.1, risk_id: 208, is_improvement: 1},
            { id: 206 , head_id: 2.1, risk_id: 209, is_improvement: 1},
            { id: 207 , head_id: 2.1, risk_id: 210, is_improvement: 1},
            { id: 208 , head_id: 2.1, risk_id: 211, is_improvement: 1},
            { id: 209 , head_id: 2.1, risk_id: 212, is_improvement: 1},
            { id: 210 , head_id: 2.1, risk_id: 213, is_improvement: 1},
            { id: 211 , head_id: 2.1, risk_id: 214, is_improvement: 1},
            { id: 212 , head_id: 2.1, risk_id: 215, is_improvement: 1},
            { id: 213 , head_id: 2.1, risk_id: 217, is_improvement: 1},
            { id: 214 , head_id: 2.1, risk_id: 218, is_improvement: 1},
            { id: 215 , head_id: 2.1, risk_id: 219, is_improvement: 1},
            { id: 216 , head_id: 2.1, risk_id: 220, is_improvement: 1},
            { id: 217 , head_id: 2.1, risk_id: 221, is_improvement: 1},
            { id: 218 , head_id: 2.1, risk_id: 222, is_improvement: 1},
            { id: 219 , head_id: 2.1, risk_id: 223, is_improvement: 1},
            { id: 220 , head_id: 2.1, risk_id: 224, is_improvement: 1},
            { id: 221 , head_id: 2.1, risk_id: 225, is_improvement: 1},
            { id: 222 , head_id: 2.1, risk_id: 226, is_improvement: 1},
            { id: 223 , head_id: 2.1, risk_id: 227, is_improvement: 1},
            { id: 224 , head_id: 2.1, risk_id: 228, is_improvement: 1},
            { id: 225 , head_id: 2.1, risk_id: 229, is_improvement: 1},


            { id: 230, id_control: '2.2',  head_id: 2.2, mainControl_id: 2 , text: "การเก็บรักษาเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่าการเก็บเงินเป็นไปตามระเบียบที่กำหนด"},
            { id: 231, id_control: '2.2', id_subcontrol: '2.2.1', head_id: 2.2, text: "มีการเก็บรักษาเงินสดไว้อย่างปลอดภัย กรณีที่มีความจำเป็นจะต้องเบิกเป็นเงินสด" , is_subcontrol:0 , ischeckbox:1},
            { id: 232, id_control: '2.2', id_subcontrol: '2.2.2', head_id: 2.2, text: "กำปั่นเก็บเงินมีกุญแจอย่างน้อย ๒ ดอกขึ้นไป ผู้มีอำนาจสั่งจ่ายเงินหรือผู้แทนถือกุญแจดอกหนึ่ง และหัวหน้านายทหารการเงินหรือเจ้าหน้าที่การเงินเป็นผู้ถือลูกกุญแจอีกดอกหนึ่ง" , is_subcontrol:0 , ischeckbox:1},
            { id: 233, id_control: '2.2', id_subcontrol: '2.2.3', head_id: 2.2, text: "ที่เก็บกำปั่นเก็บเงินมีกุญแจใส่ที่ประตู และให้นายทหารเวรหรือเรียกชื่ออย่างอื่นเป็นผู้ถือลูกกุญแจที่เก็บกำปั่นเก็บเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 234, id_control: '2.2', id_subcontrol: '2.2.4', head_id: 2.2, text: "มีคำสั่งแต่งตั้งพยานประจำวันในวันที่นำเงินออกหรือเข้าเก็บในกำปั่นเก็บเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 235, id_control: '2.2', id_subcontrol: '2.2.5', head_id: 2.2, text: "การเปิดปิดที่เก็บกำปั่นเก็บเงินและกำปั่น เก็บเงิน     ผู้ถือลูกกุญแจทุกดอกมาพร้อมกันและไขด้วยตนเองเสร็จแล้วผู้ถือลูกกุญแจใส่กุญแจให้เรียบร้อยพร้อมทั้งผูกเชือกประทับตราที่คลั่งหรือดินเหนียว" , is_subcontrol:0 , ischeckbox:1},
            { id: 236, id_control: '2.2', id_subcontrol: '2.2.6', head_id: 2.2, text: "มีการตรวจนับตัวเงินและหลักฐานแทนตัวเงินให้ถูกต้องตามสมุดบันทึกนำเงินเข้าออก และจำนวนเงินคงเหลือในกำปั่นเก็บเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 237, id_control: '2.2', id_subcontrol: '2.2.7', head_id: 2.2, text: "ผู้ถือลูกกุญแจทุกดอกลงลายมือชื่อในสมุดบันทึกนำเงินเข้าออกทุกครั้งที่นำเงินเข้าออก" , is_subcontrol:0 , ischeckbox:1},
            { id: 238, id_control: '2.2', id_subcontrol: '2.2.8', head_id: 2.2, text: "ไม่มีการมอบกุญแจกำปั่นเก็บเงินให้ผู้อื่นเป็นผู้เปิด-ปิดกำปั่นเก็บเงินแทนตน" , is_subcontrol:0 , ischeckbox:1},
            { id: 239, id_control: '2.2', id_subcontrol: '2.2.9', head_id: 2.2, text: "มีการตรวจสอบจำนวนเงินสดคงเหลือในสมุดบันทึก นำเงินเข้าออกกับสมุดรายวันรับเงิน สมุดรายวันจ่ายเงิน หรือสมุดเงินสดเป็นครั้งคราว" , is_subcontrol:0 , ischeckbox:1},
            { id: 240, id_control: '2.2', id_subcontrol: '2.2.10', head_id: 2.2, text: "การเก็บรักษาเงินทดรองราชการเป็นไปตามระเบียบที่กำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 241, id_control: '2.2', id_subcontrol: '2.2.11', head_id: 2.2, text: "มีการนำเงินสดที่ได้รับฝากธนาคารภายในวันที่ได้รับเงินนั้นหรือวันทำการถัดไป" , is_subcontrol:0 , ischeckbox:1},
            { id: 242, id_control: '2.2', id_subcontrol: '2.2.12', head_id: 2.2, text: "การเปิดบัญชีเงินฝากธนาคารเป็นไปตามระเบียบที่กำหนดและได้รับอนุมัติจากหัวหน้าส่วนราชการ" , is_subcontrol:0 , ischeckbox:1},
            { id: 243, id_control: '2.2', id_subcontrol: '2.2.13', head_id: 2.2, text: "บัญชีเงินฝากธนาคารเปิดในนามของส่วนราชการ" , is_subcontrol:0 , ischeckbox:1},
            { id: 244, id_control: '2.2', id_subcontrol: '2.2.14', head_id: 2.2, text: "ธนาคารที่ฝากเงินเป็นธนาคารตามที่ระเบียบกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 245, id_control: '2.2', id_subcontrol: '2.2.15', head_id: 2.2, text: "เจ้าหน้าที่รายงานให้ผู้มีอำนาจสั่งจ่ายเงินทราบโดยเร็วเมื่อพบว่ามีเงินสดหรือเงินฝากธนาคารสูญหาย" , is_subcontrol:0 , ischeckbox:1},
            { id: 246, id_control: '2.2', id_subcontrol: '2.2.16', head_id: 2.2, text: "มีการแต่งตั้งเจ้าหน้าที่ชั้นยศไม่ต่ำกว่า ร.อ.ขึ้นไป เพื่อตรวจสอบรายการเคลื่อนไหวในทะเบียนคุมเงินทดรองราชการเป็นประจำทุกวัน" , is_subcontrol:0 , ischeckbox:1},
            { id: 247, id_control: '2.2', id_subcontrol: '2.2.17', head_id: 2.2, text: "มีการตรวจนับเงินทดรองราชการคงเหลือทุกสิ้นวัน" , is_subcontrol:0 , ischeckbox:1},
            { id: 248, id_control: '2.2', id_subcontrol: '2.2.18', head_id: 2.2, text: "มีการตรวจสอบจำนวนเงินฝากธนาคารคงเหลือใน บัญชีแยกประเภทเงินฝากธนาคารเป็นครั้งคราว" , is_subcontrol:0 , ischeckbox:1},
            { id: 249, id_control: '2.2', id_subcontrol: '2.2.19', head_id: 2.2, text: "มีการปฏิบัติตามคำสั่งที่เกี่ยวกับการเก็บรักษาเงินอย่างครบถ้วน" , is_subcontrol:0 , ischeckbox:1},
            { id: 250, id_control: '2.2', id_subcontrol: '2.2.20', head_id: 2.2, text: "มีคำสั่งแต่งตั้งผู้เก็บรักษาสมุดใบเสร็จรับเงินที่ยังไม่ได้ใช้และจัดทำทะเบียนคุมการรับจ่ายสมุดใบเสร็จรับเงิน" , is_subcontrol:0 , ischeckbox:1},

            { id: 1007 , head_id: 2.2, sum_id: 201, value:  '', text: "การเก็บรักษาเงิน" },
            { id: 1008 , head_id: 2.2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 2.2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 226 , head_id: 2.2, risk_id: 231, is_improvement: 1},
            { id: 227 , head_id: 2.2, risk_id: 232, is_improvement: 1},
            { id: 228 , head_id: 2.2, risk_id: 233, is_improvement: 1},
            { id: 229 , head_id: 2.2, risk_id: 234, is_improvement: 1},
            { id: 230 , head_id: 2.2, risk_id: 235, is_improvement: 1},
            { id: 231 , head_id: 2.2, risk_id: 236, is_improvement: 1},
            { id: 232 , head_id: 2.2, risk_id: 237, is_improvement: 1},
            { id: 233 , head_id: 2.2, risk_id: 238, is_improvement: 1},
            { id: 234 , head_id: 2.2, risk_id: 239, is_improvement: 1},
            { id: 235 , head_id: 2.2, risk_id: 240, is_improvement: 1},
            { id: 236 , head_id: 2.2, risk_id: 241, is_improvement: 1},
            { id: 237 , head_id: 2.2, risk_id: 242, is_improvement: 1},
            { id: 238 , head_id: 2.2, risk_id: 243, is_improvement: 1},
            { id: 239 , head_id: 2.2, risk_id: 244, is_improvement: 1},
            { id: 240 , head_id: 2.2, risk_id: 245, is_improvement: 1},
            { id: 241 , head_id: 2.2, risk_id: 246, is_improvement: 1},
            { id: 242 , head_id: 2.2, risk_id: 247, is_improvement: 1},
            { id: 243 , head_id: 2.2, risk_id: 248, is_improvement: 1},
            { id: 244 , head_id: 2.2, risk_id: 249, is_improvement: 1},
            { id: 245 , head_id: 2.2, risk_id: 250, is_improvement: 1},
            

            // -------------------------- 3 -------------------------- //
            { id: 301, id_control: '3.',   head_id: 3,  mainControl_id: 3 ,text: "การจ่ายเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่าการจ่ายเงินมีความถูกต้อง ครบถ้วน"},
            { id: 302, id_control: '3.1', head_id: 3 ,text: "มีการแบ่งแยกหน้าที่ด้านการจ่ายเงิน มิให้บุคคลใดบุคคลหนึ่ง มีหน้าที่รับผิดชอบมากกว่าหนึ่งลักษณะงานต่อไปนี้" , is_subcontrol:1},
            { id: 303, id_control: '3.1', id_subcontrol: '3.1.1', head_id: 3, text: "การอนุมัติการจ่ายเงินสดและเงินฝากธนาคาร" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 304, id_control: '3.1', id_subcontrol: '3.1.2', head_id: 3, text: "การเก็บรักษาเงินสด" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 305, id_control: '3.1', id_subcontrol: '3.1.3', head_id: 3, text: "การบันทึกบัญชีเงินสดและเงินฝากธนาคาร" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol
            { id: 306, id_control: '3.1', id_subcontrol: '3.1.4', head_id: 3, text: "การกระทบยอดเงินสดและเงินฝากธนาคาร" ,is_innercontrol: 0, ischeckbox:1}, // เทเบิ้ล subcontrol


            { id: 307, id_control: '3.2',   head_id: 3, text: "เงินที่ขอเบิกจากคลังเพื่อการใดนำไปจ่ายเฉพาะ เพื่อการนั้นเท่านั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 308, id_control: '3.3',   head_id: 3, text: "การจ่ายเงินมีหลักฐานการจ่ายและได้รับอนุมัติจากผู้มีอำนาจสั่งจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 309, id_control: '3.4',   head_id: 3, text: "กรณีรับเงินแทนต้องมีหลักฐานการมอบฉันทะและได้รับอนุญาตจากผู้มีอำนาจสั่งจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 310, id_control: '3.5',   head_id: 3, text: "จ่ายเงินให้แก่เจ้าหนี้ซึ่งเป็นบุคคลภายนอกเป็นเช็ค ยกเว้นวงเงินต่ำกว่าห้าพันบาทจ่ายเป็นเงินสด" , is_subcontrol:0 , ischeckbox:1},
            { id: 311, id_control: '3.6',   head_id: 3, text: "ไม่มีการลงลายมือชื่อล่วงหน้าในเช็คโดยไม่ระบุจำนวนเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 312, id_control: '3.7',   head_id: 3, text: "ไม่มีการออกเช็คสั่งจ่ายเงินสด" , is_subcontrol:0 , ischeckbox:1},
            { id: 313, id_control: '3.8',   head_id: 3, text: "เช็คเสียหรือไม่ใช้ ขีดฆ่าและลงลายมือชื่อเก็บไว้กับต้นขั้ว" , is_subcontrol:0 , ischeckbox:1},
            { id: 314, id_control: '3.9',   head_id: 3, text: "เมื่อเสนอเช็คให้ผู้มีอำนาจสั่งจ่ายเงินลงนามมีเอกสารประกอบการจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 315, id_control: '3.10',  head_id: 3, text: "มีการตรวจสอบต้นขั้วเช็คสั่งจ่ายกับสมุดรายวันจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 316, id_control: '3.11',  head_id: 3, text: "มีการตรวจสอบใบแจ้งยอดเงินฝากธนาคารกับใบนำฝากและต้นขั้วเช็คสั่งจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 317, id_control: '3.12',  head_id: 3, text: "เก็บรักษาสมุดเช็คที่ยังไม่ใช้และที่ใช้แล้วไว้ในที่มั่นคงและปลอดภัย" , is_subcontrol:0 , ischeckbox:1},
            { id: 318, id_control: '3.13',  head_id: 3, text: "พิสูจน์ยอดเงินฝากธนาคารคงเหลืออย่างน้อยเดือนละครั้ง" , is_subcontrol:0 , ischeckbox:1},
            { id: 319, id_control: '3.14',  head_id: 3, text: "ฎีกาเบิกเงินที่มีการรองจ่าย ผ่านการตรวจสอบจากผู้รับผิดชอบแล้ว" , is_subcontrol:0 , ischeckbox:1},
            { id: 320, id_control: '3.15',  head_id: 3, text: "ผู้มีอำนาจสั่งจ่ายเงินอนุมัติก่อนการรองจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 321, id_control: '3.16',  head_id: 3, text: "การจ่ายเงินมีใบสำคัญคู่จ่ายหรือเอกสารหลักฐานประกอบที่มีการอนุมัติอย่างถูกต้อง" , is_subcontrol:0 , ischeckbox:1},
            { id: 322, id_control: '3.17',  head_id: 3, text: "มีการตรวจสอบรายการจ่ายเงินที่บันทึกไว้ในบัญชีกับหลักฐานการจ่ายทุกสิ้นวัน" , is_subcontrol:0 , ischeckbox:1},
            { id: 323, id_control: '3.18',  head_id: 3, text: "มีการตรวจสอบใบถอนเงินฝากธนาคารกับหลักฐานการถอนเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 324, id_control: '3.19',  head_id: 3, text: "มีการกำหนดให้ผู้มีอำนาจมากกว่าหนึ่งคนร่วมกัน ลงนามในเช็คที่สั่งจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 325, id_control: '3.20',  head_id: 3, text: "มีการตรวจสอบเอกสารหลักฐานประกอบการเบิกจ่ายก่อนการลงนามในเช็คที่สั่งจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 326, id_control: '3.21',  head_id: 3, text: "เช็คที่ลงนามแล้วมีการส่งให้เจ้าหน้าที่อื่นที่มิใช่เป็นผู้จัดเตรียมเช็ค เพื่อจ่ายให้แก่ผู้รับเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 327, id_control: '3.22',  head_id: 3, text: "มีการกระทบยอดการจ่ายเงินจากสมุดจ่ายเงินเดือน สมุด จ่ายเงินอื่น สมุดจ่ายเงินเดือนทหาร สมุดจ่ายเบี้ยเลี้ยงทหาร กับสมุดรายวันจ่ายเงินหรือฎีกาเบิกเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 328, id_control: '3.23',  head_id: 3, text: "มีการระงับการจ่ายเงินชั่วคราวกรณีมีข้อพิพาทระหว่างผู้มีส่วนได้เสีย จนกว่าจะได้ข้อยุติ" , is_subcontrol:0 , ischeckbox:1},
            { id: 329, id_control: '3.24',  head_id: 3, text: "มีการเขียนหรือประทับตรายางว่า จ่ายเงินแล้ว ไว้ในหลักฐานการจ่ายที่ชำระเงินแล้ว" , is_subcontrol:0 , ischeckbox:1},
            { id: 330, id_control: '3.25',  head_id: 3, text: "มีการนำส่งเงินด้วยวิธีการที่ปลอดภัยและภายในระยะเวลาตามที่ระเบียบกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 331, id_control: '3.26',  head_id: 3, text: "การนำส่งเงินมีการสอบยันความถูกต้องระหว่างผู้ส่งกับผู้รับ" , is_subcontrol:0 , ischeckbox:1},
            { id: 332, id_control: '3.27',  head_id: 3, text: "เงินที่เบิกไปแล้วถ้าไม่ได้จ่ายหรือจ่ายไม่หมดได้ส่งคืนตามระยะเวลาที่กำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 333, id_control: '3.28',  head_id: 3, text: "เงินที่จ่ายไปแล้วถ้ารับคืนผู้เบิกนำส่งคืนคลังภายใน ๑๕ วันทำการ นับจากวันที่รับคืน หรือที่ได้รับการตกลงจากคลัง" , is_subcontrol:0 , ischeckbox:1},
            { id: 334, id_control: '3.29',  head_id: 3, text: "มีการตรวจสอบความถูกต้องของใบยืมก่อนเสนออนุมัติจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 335, id_control: '3.30',  head_id: 3, text: "มีการตรวจสอบหลักฐานประกอบการยืมเงินก่อนเสนอผู้มีอำนาจอนุมัติ" , is_subcontrol:0 , ischeckbox:1},
            { id: 336, id_control: '3.31',  head_id: 3, text: "ผู้จัดเก็บเงินรายได้แผ่นดินนำส่งเงินโดยมีหลักฐานการรับและนำส่งเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 337, id_control: '3.32',  head_id: 3, text: "มีการนำส่งเงินบูรณะทรัพย์สินฝากคลัง ภายในเวลาที่ระเบียบกำหนด" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1010 , head_id: 3, sum_id: 301, value:  '', text: "การรักษาความปลอดภัยเกี่ยวกับสถานที่" },
            { id: 1011 , head_id: 3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1012 , head_id: 3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 300 , head_id: 3, risk_id: 303, is_improvement: 1},
            { id: 301 , head_id: 3, risk_id: 304, is_improvement: 1},
            { id: 302 , head_id: 3, risk_id: 305, is_improvement: 1},
            { id: 303 , head_id: 3, risk_id: 306, is_improvement: 1},
            { id: 304 , head_id: 3, risk_id: 307, is_improvement: 1},
            { id: 305 , head_id: 3, risk_id: 308, is_improvement: 1},
            { id: 306 , head_id: 3, risk_id: 309, is_improvement: 1},
            { id: 307 , head_id: 3, risk_id: 310, is_improvement: 1},
            { id: 308 , head_id: 3, risk_id: 311, is_improvement: 1},
            { id: 309 , head_id: 3, risk_id: 312, is_improvement: 1},
            { id: 310 , head_id: 3, risk_id: 313, is_improvement: 1},
            { id: 311 , head_id: 3, risk_id: 314, is_improvement: 1},
            { id: 312 , head_id: 3, risk_id: 315, is_improvement: 1},
            { id: 313 , head_id: 3, risk_id: 316, is_improvement: 1},
            { id: 314 , head_id: 3, risk_id: 317, is_improvement: 1},
            { id: 315 , head_id: 3, risk_id: 318, is_improvement: 1},
            { id: 316 , head_id: 3, risk_id: 319, is_improvement: 1},
            { id: 317 , head_id: 3, risk_id: 320, is_improvement: 1},
            { id: 318 , head_id: 3, risk_id: 321, is_improvement: 1},
            { id: 319 , head_id: 3, risk_id: 322, is_improvement: 1},
            { id: 320 , head_id: 3, risk_id: 323, is_improvement: 1},
            { id: 321 , head_id: 3, risk_id: 324, is_improvement: 1},
            { id: 322 , head_id: 3, risk_id: 325, is_improvement: 1},
            { id: 323 , head_id: 3, risk_id: 326, is_improvement: 1},
            { id: 324 , head_id: 3, risk_id: 327, is_improvement: 1},
            { id: 325 , head_id: 3, risk_id: 328, is_improvement: 1},
            { id: 326 , head_id: 3, risk_id: 329, is_improvement: 1},
            { id: 327 , head_id: 3, risk_id: 330, is_improvement: 1},
            { id: 328 , head_id: 3, risk_id: 331, is_improvement: 1},
            { id: 329 , head_id: 3, risk_id: 332, is_improvement: 1},
            { id: 330 , head_id: 3, risk_id: 333, is_improvement: 1},
            { id: 331 , head_id: 3, risk_id: 334, is_improvement: 1},
            { id: 332 , head_id: 3, risk_id: 335, is_improvement: 1},
            { id: 333 , head_id: 3, risk_id: 336, is_improvement: 1},
            { id: 334 , head_id: 3, risk_id: 337, is_improvement: 1},

            // -------------------------- 4 -------------------------- //
            { id: 401, id_control: '4.1', head_id: 4.1, mainControl_id: 4 , text: "การบันทึกบัญชี" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่ารายการทางการเงินมีการบันทึกบัญชีอย่างถูกต้องครบถ้วน สม่ำเสมอและเป็นไปตามกำหนดเวลา"},

            // -------------------------- 4.1 -------------------------- //
            { id: 403, id_control: '4.1', id_subcontrol: '4.1.1', head_id: 4.1, text: "การจัดทำบัญชีราชการปฏิบัติตามระเบียบที่กำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 404, id_control: '4.1', id_subcontrol: '4.1.2', head_id: 4.1, text: "มีเอกสารประกอบการลงบัญชีทุกรายการ" , is_subcontrol:0 , ischeckbox:1},
            { id: 405, id_control: '4.1', id_subcontrol: '4.1.3', head_id: 4.1, text: "มีการบันทึกเงินที่ได้รับในบัญชีเงินสดภายในวันที่ได้รับเงินนั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 406, id_control: '4.1', id_subcontrol: '4.1.4', head_id: 4.1, text: "มีการบันทึกเงินที่นำฝากธนาคารในบัญชีเงินฝากธนาคารภายในวันที่นำฝาก" , is_subcontrol:0 , ischeckbox:1},
            { id: 407, id_control: '4.1', id_subcontrol: '4.1.5', head_id: 4.1, text: "มีการบันทึกบัญชีแยกรายการรับที่เป็นเงินสดกับรับเป็นเช็ค และการรับโอนเงินเข้าบัญชี" , is_subcontrol:0 , ischeckbox:1},
            { id: 408, id_control: '4.1', id_subcontrol: '4.1.6', head_id: 4.1, text: "ข้อมูลการบันทึกบัญชีรายการรับเงินประกอบด้วยวันที่ จำนวนเงิน รายการวิธีการจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 409, id_control: '4.1', id_subcontrol: '4.1.7', head_id: 4.1, text: "มีการตรวจสอบจำนวนเงินที่รับกับหลักฐานการรับและรายการที่บันทึกไว้ในบัญชี" , is_subcontrol:0 , ischeckbox:1},
            { id: 410, id_control: '4.1', id_subcontrol: '4.1.8', head_id: 4.1, text: "มีการจัดทำงบพิสูจน์ยอดเงินฝากธนาคารทุกสิ้นเดือน" , is_subcontrol:0 , ischeckbox:1},
            { id: 411, id_control: '4.1', id_subcontrol: '4.1.9', head_id: 4.1, text: "มีการบันทึกการจ่ายเงินในบัญชีเงินสด หรือบัญชีเงินฝากธนาคารภายในวันที่จ่ายเงินนั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 412, id_control: '4.1', id_subcontrol: '4.1.10', head_id: 4.1, text: "ข้อมูลการบันทึกบัญชีรายการจ่ายเงินประกอบด้วยวันที่ ผู้รับ จำนวนเงิน และวัตถุประสงค์การจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 413, id_control: '4.1', id_subcontrol: '4.1.11', head_id: 4.1, text: "การจัดเก็บเอกสารหลักฐานประกอบการลงบัญชี มีการจัดเก็บที่ดี ค้นหาได้ง่ายและรวดเร็ว" , is_subcontrol:0 , ischeckbox:1},
            { id: 414, id_control: '4.1', id_subcontrol: '4.1.12', head_id: 4.1, text: "การแก้ไขหรือปรับปรุงบัญชีด้วยสมุดรายวันทั่วไป ผู้มีอำนาจอนุมัติให้ดำเนินการก่อนการลงบัญชี" , is_subcontrol:0 , ischeckbox:1},
            { id: 415, id_control: '4.1', id_subcontrol: '4.1.13', head_id: 4.1, text: "สมุดบันทึกรายการขั้นต้นบันทึกรายการครบถ้วนและถูกต้อง" , is_subcontrol:0 , ischeckbox:1},
            { id: 416, id_control: '4.1', id_subcontrol: '4.1.14', head_id: 4.1, text: "สมุดบันทึกรายการขั้นต้น มีการผ่านรายการไปบัญชีแยกประเภททั่วไป และบัญชีย่อย และทะเบียนต่าง ๆ ทุกรายการ" , is_subcontrol:0 , ischeckbox:1},
            { id: 417, id_control: '4.1', id_subcontrol: '4.1.15', head_id: 4.1, text: "มีการลงบัญชีจ่ายตามจำนวนเงินที่จ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 418, id_control: '4.1', id_subcontrol: '4.1.16', head_id: 4.1, text: "มีการปิดบัญชีเมื่อสิ้นปีงบประมาณทุกปีครบถ้วน ตามระเบียบกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 419, id_control: '4.1', id_subcontrol: '4.1.17', head_id: 4.1, text: "มีการจัดทำรายงานการเงินส่งให้หน่วยที่เกี่ยวข้องทราบภายในระยะเวลาที่กำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 420, id_control: '4.1', id_subcontrol: '4.1.18', head_id: 4.1, text: "มีการกระทบยอดเงินทดรองราชการทุกสิ้นเดือน" , is_subcontrol:0 , ischeckbox:1},
            { id: 421, id_control: '4.1', id_subcontrol: '4.1.19', head_id: 4.1, text: "บัญชีแยกประเภทมีการบันทึกรายการถูกต้องและครบถ้วน" , is_subcontrol:0 , ischeckbox:1},
            { id: 422, id_control: '4.1', id_subcontrol: '4.1.20', head_id: 4.1, text: "สามารถติดตามตรวจสอบรายการบัญชี จากเอกสารประกอบ การลงบัญชี หรือเอกสารเบื้องต้นไปยังบัญชีแยกประเภท" , is_subcontrol:0 , ischeckbox:1},
            { id: 423, id_control: '4.1', id_subcontrol: '4.1.21', head_id: 4.1, text: "มีการกระทบยอดบัญชีย่อยกับบัญชีคุมหรือบัญชีแยกประเภทที่มีบัญชีย่อย หรือรายละเอียดประกอบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 424, id_control: '4.1', id_subcontrol: '4.1.22', head_id: 4.1, text: "มีการสอบทานหรือตรวจสอบการบันทึกบัญชีเป็น ประจำทุกเดือน" , is_subcontrol:0 , ischeckbox:1},
            { id: 425, id_control: '4.1', id_subcontrol: '4.1.23', head_id: 4.1, text: "มีการฝึกอบรมอย่างเพียงพอให้แก่เจ้าหน้าที่การเงินและบัญชี" , is_subcontrol:0 , ischeckbox:1},
            { id: 426, id_control: '4.1', id_subcontrol: '4.1.24', head_id: 4.1, text: "มีการตรวจสอบความถูกต้องรายการบันทึกบัญชีสินทรัพย์กับระเบียบของทางราชการหรือตามหนังสือกรมบัญชีกลาง เช่น ครุภัณฑ์ต่ำกว่าเกณฑ์ ค่าใช้จ่ายความมั่นคงหรือบัญชีสินทรัพย์พื้นฐานที่มีไว้เฉพาะ เช่น กรมทางหลวง กรมชลประทาน (ถนน เขื่อน)" , is_subcontrol:0 , ischeckbox:1},
            { id: 427, id_control: '4.1', id_subcontrol: '4.1.25', head_id: 4.1, text: "การตัดจำหน่ายสินทรัพย์ในระบบ New GFMIS Thai ตามที่ได้รับอนุมัติ" , is_subcontrol:0 , ischeckbox:1},
           
            { id: 1013 , head_id: 4.1, sum_id: 101, value: '',  text: "การบันทึกบัญชี" },
            { id: 1014 , head_id: 4.1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1015 , head_id: 4.1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
             // ส่วนเก็บ improvement
             { id: 401 , head_id: 4.1, risk_id: 403, is_improvement: 1},
             { id: 402 , head_id: 4.1, risk_id: 404, is_improvement: 1},
             { id: 403 , head_id: 4.1, risk_id: 405, is_improvement: 1},
             { id: 404 , head_id: 4.1, risk_id: 406, is_improvement: 1},
             { id: 405 , head_id: 4.1, risk_id: 407, is_improvement: 1},
             { id: 406 , head_id: 4.1, risk_id: 408, is_improvement: 1},
             { id: 407 , head_id: 4.1, risk_id: 409, is_improvement: 1},
             { id: 408 , head_id: 4.1, risk_id: 410, is_improvement: 1},
             { id: 409 , head_id: 4.1, risk_id: 411, is_improvement: 1},
             { id: 410 , head_id: 4.1, risk_id: 412, is_improvement: 1},
             { id: 411 , head_id: 4.1, risk_id: 413, is_improvement: 1},
             { id: 412 , head_id: 4.1, risk_id: 414, is_improvement: 1},
             { id: 413 , head_id: 4.1, risk_id: 415, is_improvement: 1},
             { id: 414 , head_id: 4.1, risk_id: 416, is_improvement: 1},
             { id: 415 , head_id: 4.1, risk_id: 417, is_improvement: 1},
             { id: 416 , head_id: 4.1, risk_id: 418, is_improvement: 1},
             { id: 417 , head_id: 4.1, risk_id: 419, is_improvement: 1},
             { id: 418 , head_id: 4.1, risk_id: 420, is_improvement: 1},
             { id: 419 , head_id: 4.1, risk_id: 421, is_improvement: 1},
             { id: 420 , head_id: 4.1, risk_id: 422, is_improvement: 1},
             { id: 421 , head_id: 4.1, risk_id: 423, is_improvement: 1},
             { id: 422 , head_id: 4.1, risk_id: 424, is_improvement: 1},
             { id: 423 , head_id: 4.1, risk_id: 425, is_improvement: 1},
             { id: 424 , head_id: 4.1, risk_id: 426, is_improvement: 1},
             { id: 425 , head_id: 4.1, risk_id: 427, is_improvement: 1},
           
             // -------------------------- 4.2 -------------------------- //
             { id: 428, id_control: '4.2', head_id: 4.2, mainControl_id: 4 , text: "รายงานการเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้ความมั่นใจว่ารายงานการเงินมีความน่าเชื่อถือ ถูกต้อง และมีประโยชน์"},
             { id: 429, id_control: '4.2', id_subcontrol: '4.2.1', head_id: 4.2, text: "รายงานทางการเงินจัดเตรียมขึ้นจากบัญชีแยกประเภท" , is_subcontrol:0 , ischeckbox:1},
             { id: 430, id_control: '4.2', id_subcontrol: '4.2.2', head_id: 4.2, text: "มีการสอบทานและให้ความเห็นชอบรายงานการเงินโดยมีผู้อำนาจสั่งจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
             { id: 431, id_control: '4.2', id_subcontrol: '4.2.3', head_id: 4.2, text: "มีการกำหนดแผนการปฏิบัติ เพื่อให้มั่นใจว่าการจัดทำรายงานการเงินจะแล้วเสร็จภายในเวลาตามที่กำหนด" , is_subcontrol:0 , ischeckbox:1},
             { id: 432, id_control: '4.2', id_subcontrol: '4.2.4', head_id: 4.2, text: "มีการใช้ประโยชน์จากรายงานการเงินเป็นครั้งคราว" , is_subcontrol:0 , ischeckbox:1},
             { id: 433, id_control: '4.2', id_subcontrol: '4.2.5', head_id: 4.2, text: "มีการติดตามผลเพื่อค้นหาการใช้ประโยชน์จากเงินทดรอง และดำเนินการยกเลิกเงินทดรองราชการที่ไม่เคลื่อนไหว" , is_subcontrol:0 , ischeckbox:1},
             { id: 434, id_control: '4.2', id_subcontrol: '4.2.6', head_id: 4.2, text: "มีการกระทบยอดบัญชีลูกหนี้รายตัวกับบัญชีคุมลูกหนี้" , is_subcontrol:0 , ischeckbox:1},
             { id: 435, id_control: '4.2', id_subcontrol: '4.2.7', head_id: 4.2, text: "มีการติดตามทวงถามลูกหนี้ที่ค้างชำระเกินกำหนด" , is_subcontrol:0 , ischeckbox:1},
             { id: 436, id_control: '4.2', id_subcontrol: '4.2.8', head_id: 4.2, text: "มีการรายงานลูกหนี้ที่ไม่ชำระตามเวลาที่กำหนดให้ผู้มีอำนาจสั่งจ่ายเงินทราบเพื่อพิจารณาดำเนินการ" , is_subcontrol:0 , ischeckbox:1},

             { id: 1016 , head_id: 4.2, sum_id: 101, value: '',  text: "รายงานการเงิน" },
             { id: 1017 , head_id: 4.2, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
             { id: 1018 , head_id: 4.2, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},         

            // ส่วนเก็บ improvement
            { id: 426 , head_id: 4.2, risk_id: 429, is_improvement: 1},
            { id: 427 , head_id: 4.2, risk_id: 430, is_improvement: 1},
            { id: 428 , head_id: 4.2, risk_id: 431, is_improvement: 1},
            { id: 429 , head_id: 4.2, risk_id: 432, is_improvement: 1},
            { id: 430 , head_id: 4.2, risk_id: 433, is_improvement: 1},
            { id: 431 , head_id: 4.2, risk_id: 434, is_improvement: 1},
            { id: 432 , head_id: 4.2, risk_id: 435, is_improvement: 1},
            { id: 433 , head_id: 4.2, risk_id: 436, is_improvement: 1},

            // -------------------------- 5.1 -------------------------- /
            { id: 501, id_control: '5.1', head_id: 5.1, mainControl_id: 5 , text: "การจ่ายเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การปฏิบัติงานในการจ่ายเงินสำหรับหน่วยงานผ่านระบบอิเล็กทรอนิกส์ เป็นไปด้วยความถูกต้อง สะดวก รวดเร็ว คล่องตัวในการปฏิบัติงาน"},
            { id: 503, id_control: '5.1', id_subcontrol: '5.1.1',  head_id: 5.1, text: "การจ่ายเงินของส่วนราชการมีการทำภายใต้กฎหมาย ระเบียบ ข้อบังคับ คำสั่ง กำหนดไว้หรือมติคณะรัฐมนตรีอนุญาตให้จ่าย หรือตามที่ได้รับอนุญาตจากกระทรวงการคลัง และผู้มีอำนาจได้อนุมัติให้จ่ายได้" , is_subcontrol:0 , ischeckbox:1},
            { id: 504, id_control: '5.1', id_subcontrol: '5.1.2',  head_id: 5.1, text: "มีการจ่ายเงินให้แก่ผู้มีสิทธิรับเงินผ่านระบบอิเล็กทรอนิกส์ (e-Payment) กรณีการขอเบิกเงินสวัสดิการค่าตอบแทน หรือกรณีอื่นใด หรือกรณีที่กระทรวงการคลังกำหนดให้กรมบัญชีกลางจ่ายเงินเข้าบัญชีเงินฝากธนาคารของส่วนราชการ เช่น ค่ารักษาพยาบาล ค่าช่วยการศึกษาบุตร ค่าเช่าบ้าน ค่าใช้จ่ายในการเดินทางไปราชการ เบี้ยเลี้ยงพลทหาร ฯลฯ" , is_subcontrol:0 , ischeckbox:1},
            { id: 505, id_control: '5.1', id_subcontrol: '5.1.3',  head_id: 5.1, text: "มีการตรวจสอบการใช้จ่ายเงินให้เป็นไป ตามที่กำหนดไว้ในกฎหมาย หรือกฎ หรือตามที่ได้รับอนุญาตให้จ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 506, id_control: '5.1', id_subcontrol: '5.1.4',  head_id: 5.1, text: "การจ่าย โดยที่ยังมิได้มีการจ่ายเงินให้แก่เจ้าหนี้หรือผู้มีสิทธิรับเงิน มีการห้ามมิให้ผู้มีหน้าที่จ่ายเงินเรียกหลักฐานการจ่ายหรือให้ผู้รับเงินลงลายมือชื่อรับเงินในหลักฐาน" , is_subcontrol:0 , ischeckbox:1},
            { id: 507, id_control: '5.1', id_subcontrol: '5.1.5',  head_id: 5.1, text: "มีหลักฐานการจ่ายเงินเพื่อประโยชน์ในการตรวจสอบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 508, id_control: '5.1', id_subcontrol: '5.1.6',  head_id: 5.1, text: "มีการกระทบยอดบัญชีลูกหนี้รายตัวกับบัญชีคุมลูกหนี้" , is_subcontrol:0 , ischeckbox:1},
            { id: 509, id_control: '5.1', id_subcontrol: '5.1.7',  head_id: 5.1, text: "เจ้าหน้าที่ผู้จ่ายเงินมีการประทับตราข้อความว่า“จ่ายเงินแล้ว” โดยลงลายมือชื่อรับรองการจ่ายและระบุชื่อ ผู้จ่ายเงิน  ด้วยตัวบรรจง พร้อมทั้งวัน เดือน ปี ที่จ่ายกำกับไว้ในหลักฐานการจ่ายเงินทุกฉบับ เพื่อประโยชน์ในการตรวจสอบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 510, id_control: '5.1', id_subcontrol: '5.1.8',  head_id: 5.1, text: "ไม่มีการมอบกุญแจกำปั่นเก็บเงินให้ผู้อื่นเป็นผู้เปิด-ปิดกำปั่นเก็บเงินแทนตน" , is_subcontrol:0 , ischeckbox:1},
            { id: 511, id_control: '5.1', id_subcontrol: '5.1.9',  head_id: 5.1, text: "มีการบันทึกการจ่ายเงินทุกรายการต้องไว้ในระบบและให้หัวหน้าส่วนราชการหรือผู้ที่ได้รับมอบหมายเป็นลายลักษณ์อักษร จากหัวหน้าส่วนราชการตรวจสอบการจ่ายเงิน กับหลักฐานการจ่ายทุกสิ้นวัน" , is_subcontrol:0 , ischeckbox:1},
            { id: 512, id_control: '5.1', id_subcontrol: '5.1.10', head_id: 5.1, text: "มีการใช้ใบเสร็จรับเงินหรือใบสำคัญรับเงิน ซึ่งผู้รับเงินเป็นผู้ออกให้ หรือรายงานการจ่ายเงินจากระบบอิเล็กทรอนิกส์ (e-Payment) หรือใบรับรอง การจ่ายเงิน หรือเอกสารอื่นใดที่กระทรวง การคลังกำหนดเป็นหลักฐานการจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 513, id_control: '5.1', id_subcontrol: '5.1.11', head_id: 5.1, text: "มีการจ่ายเงินโดยกรมบัญชีกลาง เพื่อเข้าบัญชีให้กับเจ้าหนี้หรือผู้มีสิทธิรับเงินโดยตรงให้ใช้รายงานในระบบตามที่กระทรวงการคลังกำหนดเป็นหลักฐานการจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 514, id_control: '5.1', id_subcontrol: '5.1.12', head_id: 5.1, text: "มีการจ่ายเงินผ่านระบบอิเล็กทรอนิกส์ (e-Payment) ให้แก่ผู้มีสิทธิรับเงินที่เป็นข้าราชการ ลูกจ้าง พนักงานราชการ ผู้รับบำนาญ ผู้รับเบี้ยหวัด หรือบุคคลภายนอก รวมทั้งการจ่ายเงินเพื่อชดใช้คืนเงินทดรองราชการ" , is_subcontrol:0 , ischeckbox:1},

            { id: 1019 , head_id: 5.1, sum_id: 101, value: '',  text: "การจ่ายเงิน" },
            { id: 1020 , head_id: 5.1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1021 , head_id: 5.1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
          
             // ส่วนเก็บ improvement
             { id: 501 , head_id: 5.1, risk_id: 503, is_improvement: 1},
             { id: 502 , head_id: 5.1, risk_id: 504, is_improvement: 1},
             { id: 503 , head_id: 5.1, risk_id: 505, is_improvement: 1},
             { id: 504 , head_id: 5.1, risk_id: 506, is_improvement: 1},
             { id: 505 , head_id: 5.1, risk_id: 507, is_improvement: 1},
             { id: 506 , head_id: 5.1, risk_id: 508, is_improvement: 1},
             { id: 507 , head_id: 5.1, risk_id: 509, is_improvement: 1},
             { id: 508 , head_id: 5.1, risk_id: 510, is_improvement: 1},
             { id: 509 , head_id: 5.1, risk_id: 511, is_improvement: 1},
             { id: 510 , head_id: 5.1, risk_id: 512, is_improvement: 1},
             { id: 511 , head_id: 5.1, risk_id: 513, is_improvement: 1},
             { id: 512 , head_id: 5.1, risk_id: 514, is_improvement: 1},


            // -------------------------- 5.2 -------------------------- /
            { id: 515, id_control: '5.2', head_id: 5.2, mainControl_id: 5 , text: "การเบิกจ่ายเงินยืมของส่วนราชการ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การจ่ายเงินยืมของหน่วยงาน เป็นไปด้วยความถูกต้อง สะดวก รวดเร็ว มีความคล่องตัวในการปฏิบัติงาน"},
            { id: 516, id_control: '5.2', id_subcontrol: '5.2.1', head_id: 5.2, text: "การจ่ายเงินยืมมีการจ่ายเฉพาะผู้ยืมได้ทำสัญญาการยืมเงิน และผู้มีอำนาจ ได้อนุมัติให้จ่ายเงินยืมตามสัญญาการยืมเงินนั้นแล้วเท่านั้น โดยจ่ายผ่านระบบอิเล็กทรอนิกส์ (e-Payment) ตามหลักเกณฑ์วิธีปฏิบัติ ที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 517, id_control: '5.2', id_subcontrol: '5.2.2', head_id: 5.2, text: "มีการอนุมัติให้ยืมเงินเพื่อใช้ในราชการ ให้ผู้มีอำนาจพิจารณาอนุมัติให้ยืมเฉพาะ เท่าที่จำเป็น และห้ามมิให้อนุมัติให้ยืมเงินรายใหม่ในเมื่อผู้ยืมมิได้ชำระคืนเงินยืมรายเก่าให้เสร็จสิ้นไปก่อน" , is_subcontrol:0 , ischeckbox:1},
            { id: 518, id_control: '5.2', id_subcontrol: '5.2.3', head_id: 5.2, text: "มีการจ่ายเงินยืมจากเงินนอกงบประมาณ ให้ส่วนราชการกระทำได้เฉพาะเพื่อใช้จ่าย ในการดำเนินงานตามวัตถุประสงค์ของเงินนอกงบประมาณประเภทนั้น หรือกรณีอื่น ซึ่งจำเป็นเร่งด่วนแก่ราชการ และได้รับอนุมัติจากหัวหน้าส่วนราชการผู้ให้ยืมนั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 519, id_control: '5.2', id_subcontrol: '5.2.4', head_id: 5.2, text: "มีการทำสัญญาการยืมเงินไว้เป็นหลักฐานสองฉบับ พร้อมกับมอบให้ส่วนราชการผู้ให้ยืมเก็บรักษาไว้เป็นหลักฐานหนึ่งฉบับ ให้ผู้ยืมเก็บไว้หนึ่งฉบับ" , is_subcontrol:0 , ischeckbox:1},
            { id: 520, id_control: '5.2', id_subcontrol: '5.2.5', head_id: 5.2, text: "มีการใช้จ่ายเงินยืมสำหรับค่าใช้จ่ายในการเดินทางไปราชการ โดยให้ใช้จ่ายได้ไม่เกินเก้าสิบวันนับแต่วันเริ่มต้นปีงบประมาณใหม่ เงินยืมสำหรับปฏิบัติราชการอื่น ๆ ให้ใช้จ่ายได้ไม่เกินสามสิบวันนับแต่วันเริ่มต้นปีงบประมาณใหม่" , is_subcontrol:0 , ischeckbox:1},
            { id: 521, id_control: '5.2', id_subcontrol: '5.2.6', head_id: 5.2, text: "ผู้ยืมมีการส่งหลักฐานการจ่ายและ/หรือเงินเหลือจ่าย ที่ยืม (ถ้ามี) ให้เจ้าหน้าที่ผู้รับคืน บันทึกการรับคืนในสัญญาการยืมเงินพร้อมทั้งพิมพ์หลักฐานการรับเงินคืนจากระบบอิเล็กทรอนิกส์ (e-Payment) ตามที่กระทรวงการคลังกำหนด และ/หรือออกใบรับใบสำคัญตามแบบที่กรมบัญชีกลางกำหนดให้ผู้ยืมไว้เป็นหลักฐาน" , is_subcontrol:0 , ischeckbox:1},
   
            { id: 1022 , head_id: 5.2, sum_id: 101, value: '',  text: "การเบิกจ่ายเงินยืมของส่วนราชการ" },
            { id: 1023 , head_id: 5.2, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1024 , head_id: 5.2, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

              // ส่วนเก็บ improvement
            { id: 513 , head_id: 5.2, risk_id: 516, is_improvement: 1},
            { id: 514 , head_id: 5.2, risk_id: 517, is_improvement: 1},
            { id: 515 , head_id: 5.2, risk_id: 518, is_improvement: 1},
            { id: 516 , head_id: 5.2, risk_id: 519, is_improvement: 1},
            { id: 517 , head_id: 5.2, risk_id: 520, is_improvement: 1},
            { id: 518 , head_id: 5.2, risk_id: 521, is_improvement: 1},

          
            // -------------------------- 5.3 -------------------------- /
            { id: 522, id_control: '5.3', head_id: 5.3, mainControl_id: 5 , text: "การรับเงินของส่วนราชการ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การรับเงินของส่วนราชการมีการปฏิบัติให้ถูกต้องเป็นไปตามที่กระทรวงการคลังกำหนด"},
            { id: 523, id_control: '5.3', id_subcontrol: '5.3.1',  head_id: 5.3, text: "มีการใช้ใบเสร็จรับเงิน ตามแบบที่กระทรวงการคลัง กำหนด และให้มีสำเนา เย็บติดไว้กับเล่มอย่างน้อยหนึ่งฉบับ หรือตามแบบที่ได้รับความเห็นชอบจากกระทรวงการคลัง" , is_subcontrol:0 , ischeckbox:1},
            { id: 524, id_control: '5.3', id_subcontrol: '5.3.2',  head_id: 5.3, text: "มีการออกใบเสร็จรับเงินด้วยคอมพิวเตอร์ที่เป็นไปตามที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 525, id_control: '5.3', id_subcontrol: '5.3.3',  head_id: 5.3, text: "มีการพิมพ์ใบเสร็จรับเงินซึ่งมีหมายเลขกำกับเล่ม และหมายเลขกำกับใบเสร็จรับเงิน เรียงกันไปทุกฉบับ" , is_subcontrol:0 , ischeckbox:1},
            { id: 526, id_control: '5.3', id_subcontrol: '5.3.4',  head_id: 5.3, text: "มีการจัดทำทะเบียนคุมใบเสร็จรับเงินไว้เพื่อให้ทราบ และตรวจสอบได้ว่าได้จัดพิมพ์ขึ้นจำนวนเท่าใด ได้จ่ายใบเสร็จรับเงินเท่าใด เลขที่ใดถึงเลขที่ใด ให้หน่วยงานใด หรือเจ้าหน้าที่ผู้ใดไปดำเนินการจัดเก็บเงินเมื่อวัน เดือน ปีใด" , is_subcontrol:0 , ischeckbox:1},
            { id: 527, id_control: '5.3', id_subcontrol: '5.3.5',  head_id: 5.3, text: "มีการจ่ายใบเสร็จรับเงิน ให้หน่วยงานหรือเจ้าหน้าที่ไปจัดเก็บเงิน โดยพิจารณาจ่ายในจำนวนที่เหมาะสมแก่ลักษณะงานที่ปฏิบัติ และมีหลักฐานการรับส่งใบเสร็จรับเงินนั้นไว้ด้วย" , is_subcontrol:0 , ischeckbox:1},
            { id: 528, id_control: '5.3', id_subcontrol: '5.3.6',  head_id: 5.3, text: "ใบเสร็จรับเงินเล่มใด เมื่อไม่มีความจำเป็นต้องใช้ เช่น ยุบเลิกสำนักงานหรือ ไม่มีการจัดเก็บเงินต่อไปอีกให้หัวหน้าหน่วยงานที่รับใบเสร็จรับเงินนั้น มีการนำส่งคืนส่วนราชการที่จ่ายใบเสร็จรับเงินนั้นโดยด่วน" , is_subcontrol:0 , ischeckbox:1},
            { id: 529, id_control: '5.3', id_subcontrol: '5.3.7',  head_id: 5.3, text: "มีการใช้ใบเสร็จรับเงินเล่มใดสำหรับรับเงินของปีงบประมาณใด โดยให้ใช้รับเงินภายในปีงบประมาณนั้น เมื่อขึ้นปีงบประมาณใหม่ ให้ใช้ใบเสร็จรับเงินเล่มใหม่ ใบเสร็จรับเงินฉบับใด  ยังไม่ใช้ ให้คงติดไว้กับเล่มแต่ให้ปรุเจาะรู หรือประทับตราเลิกใช้ เพื่อให้เป็นที่สังเกตมิให้นำมารับเงินได้อีกต่อไป" , is_subcontrol:0 , ischeckbox:1},
            { id: 530, id_control: '5.3', id_subcontrol: '5.3.8',  head_id: 5.3, text: "มีการห้ามขูดลบเพื่อแก้ไขเพิ่มเติมจำนวนเงินหรือชื่อผู้ชำระเงินในใบเสร็จรับเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 531, id_control: '5.3', id_subcontrol: '5.3.9',  head_id: 5.3, text: "มีการเก็บรักษาสำเนาใบเสร็จรับเงินซึ่งสำนักงาน การตรวจเงินแผ่นดิน ยังมิได้ตรวจสอบไว้ในที่ปลอดภัยอย่าให้สูญหายหรือเสียหายได้ และเมื่อได้ตรวจสอบแล้วให้เก็บไว้อย่างเอกสารธรรมดาได้" , is_subcontrol:0 , ischeckbox:1},

            { id: 1025 , head_id: 5.3, sum_id: 101, value: '',  text: "การรับเงินของส่วนราชการ" },
            { id: 1026 , head_id: 5.3, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1027 , head_id: 5.3, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 519 , head_id: 5.3, risk_id: 523, is_improvement: 1},
            { id: 520 , head_id: 5.3, risk_id: 524, is_improvement: 1},
            { id: 521 , head_id: 5.3, risk_id: 525, is_improvement: 1},
            { id: 522 , head_id: 5.3, risk_id: 526, is_improvement: 1},
            { id: 523 , head_id: 5.3, risk_id: 527, is_improvement: 1},
            { id: 524 , head_id: 5.3, risk_id: 528, is_improvement: 1},
            { id: 525 , head_id: 5.3, risk_id: 529, is_improvement: 1},
            { id: 526 , head_id: 5.3, risk_id: 530, is_improvement: 1},
            { id: 527 , head_id: 5.3, risk_id: 531, is_improvement: 1},
            

            // -------------------------- 5.4 -------------------------- /
            { id: 532, id_control: '5.4', head_id: 5.4, mainControl_id: 5 , text: "การรับเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การรับเงินผ่านระบบอิเล็กทรอนิกส์มีการปฏิบัติให้ถูกต้องเป็นไปตามที่กระทรวงการคลังกำหนด"},
            { id: 533, id_control: '5.4', id_subcontrol: '5.4.1',  head_id: 5.4, text: "มีการรับเงินผ่านระบบอิเล็กทรอนิกส์(e-Payment) ตามหลักเกณฑ์ วิธีปฏิบัติที่กระทรวงการคลังกำหนด เว้นแต่กรณีมีเหตุขัดข้องหรือความจำเป็น เร่งด่วนซึ่งไม่สามารถรับผ่านระบบอิเล็กทรอนิกส์ (e-Payment) ได้ให้รับเป็นเงินสดหรือเช็ค หรือเอกสารแทนตัวเงินอื่นที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 534, id_control: '5.4', id_subcontrol: '5.4.2',  head_id: 5.4, text: "มีการจัดเก็บหรือรับชำระเงินโดยการออกใบเสร็จรับเงิน หรือพิมพ์รายงานซึ่งเป็นหลักฐานการรับชำระเงินจากระบบอิเล็กทรอนิกส์ (e-Payment) ตามที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 535, id_control: '5.4', id_subcontrol: '5.4.3',  head_id: 5.4, text: "มีการใช้ใบเสร็จรับเงินเล่มเดียวกันรับเงินทุกประเภท เว้นแต่เงินประเภทใดที่มีการรับชำระเป็นประจำและมีจำนวนมากราย จะแยกใบเสร็จรับเงินเล่มหนึ่ง สำหรับการรับชำระเงินประเภทนั้นก็ได้  เมื่อสิ้นเวลารับจ่ายเงิน ให้เจ้าหน้าที่ ผู้มีหน้าที่จัดเก็บหรือรับชำระเงินนำเงินสด หรือเช็ค หรือเอกสารแทนตัวเงินอื่นที่ได้รับ พร้อมกับสำเนาใบเสร็จรับเงินและเอกสารอื่นที่จัดเก็บ ในวันนั้นทั้งหมดส่งต่อเจ้าหน้าที่การเงินของส่วนราชการนั้น" , is_subcontrol:0 , ischeckbox:1},

            { id: 1028 , head_id: 5.4, sum_id: 101, value: '',  text: "การรับเงิน" },
            { id: 1029 , head_id: 5.4, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1030 , head_id: 5.4, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 528 , head_id: 5.4, risk_id: 533, is_improvement: 1},
            { id: 529 , head_id: 5.4, risk_id: 534, is_improvement: 1},
            { id: 530 , head_id: 5.4, risk_id: 535, is_improvement: 1},


            // -------------------------- 5.5 -------------------------- /
            { id: 536, id_control: '5.5', head_id: 5.5, mainControl_id: 5 , text: "การเก็บรักษาเงิน" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การเก็บรักษาเงินมีความมั่นคง ปลอดภัย และเป็นไปตามแนวทางที่ทางราชการกำหนด"},
            { id: 537, id_control: '5.5', id_subcontrol: '5.5.1',  head_id: 5.5, text: "มีการจัดทำรายงานเงินคงเหลือประจำวันเป็นประจำทุกวันที่มีการรับเงินสดหรือเช็ค หรือเอกสารแทนตัวเงินอื่น" , is_subcontrol:0 , ischeckbox:1},
            { id: 538, id_control: '5.5', id_subcontrol: '5.5.2',  head_id: 5.5, text: "เมื่อสิ้นเวลารับจ่ายเงินเจ้าหน้าที่การเงินมีการนำเงินที่จะเก็บรักษาและรายงาน เงินคงเหลือประจำวันส่งมอบให้คณะกรรมการเก็บรักษาเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 539, id_control: '5.5', id_subcontrol: '5.5.3',  head_id: 5.5, text: "รายงานเงินคงเหลือประจำวัน เมื่อกรรมการเก็บรักษาเงินได้ลงลายมือชื่อแล้ว ผู้อำนวยการกองคลังหรือเจ้าหน้าที่การเงิน มีการเสนอหัวหน้าส่วนราชการเพื่อทราบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 540, id_control: '5.5', id_subcontrol: '5.5.4',  head_id: 5.5, text: "เมื่อนำเงินและเอกสารแทนตัวเงินเก็บในตู้นิรภัยเรียบร้อยแล้ว กรรมการมีการเก็บรักษาเงินใส่กุญแจให้เรียบร้อยแล้ว ลงลายมือชื่อบนกระดาษปิดทับ ในลักษณะที่แผ่นกระดาษปิดทับ จะต้องถูกทำลายเมื่อมีการเปิดตู้นิรภัย" , is_subcontrol:0 , ischeckbox:1},
            { id: 541, id_control: '5.5', id_subcontrol: '5.5.5',  head_id: 5.5, text: "ในกรณีที่ตู้นิรภัยตั้งอยู่ในห้องมั่นคงหรือกรงเหล็ก  มีการลงลายมือชื่อบนกระดาษปิดทับ จะกระทำที่ประตูห้องมั่นคงหรือกรงเหล็กเพียงแห่งเดียวก็ได้" , is_subcontrol:0 , ischeckbox:1},
            { id: 542, id_control: '5.5', id_subcontrol: '5.5.6',  head_id: 5.5, text: "ในวันทำการถัดไป หากจะต้องนำเงินออกจ่าย คณะกรรมการเก็บรักษาเงินมีการมอบเงินที่เก็บรักษาทั้งหมดให้ผู้อำนวยการกองคลังหรือเจ้าหน้าที่การเงิน แล้วแต่กรณี รับไปจ่าย โดยให้ผู้อำนวยการกองคลังหรือเจ้าหน้าที่การเงิน แล้วแต่กรณี ลงลายมือชื่อรับเงินไว้ในรายงาน เงินคงเหลือประจำวันก่อน วันทำการที่รับเงินไปจ่าย" , is_subcontrol:0 , ischeckbox:1},
            { id: 543, id_control: '5.5', id_subcontrol: '5.5.7',  head_id: 5.5, text: "การเปิดประตูห้องมั่นคง หรือประตูกรงเหล็ก หรือตู้นิรภัย กรรมการเก็บรักษาเงิน มีการตรวจกุญแจ ลงลายมือชื่อบนแผ่นกระดาษปิดทับ เมื่อปรากฏว่าอยู่ในสภาพเรียบร้อยจึงให้เปิดได้หากปรากฏว่าแผ่นกระดาษปิดทับอยู่ในสภาพไม่เรียบร้อย หรือมีพฤติการณ์อื่นใดที่สงสัยว่าจะมีการทุจริตให้รายงานให้หัวหน้าส่วนราชการนั้นทราบ เพื่อพิจารณาสั่งการโดยด่วน" , is_subcontrol:0 , ischeckbox:1},

            { id: 1028 , head_id: 5.5, sum_id: 101, value: '',  text: "การเก็บรักษาเงิน" },
            { id: 1029 , head_id: 5.5, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1030 , head_id: 5.5, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 531 , head_id: 5.5, risk_id: 537, is_improvement: 1},
            { id: 532 , head_id: 5.5, risk_id: 538, is_improvement: 1},
            { id: 533 , head_id: 5.5, risk_id: 539, is_improvement: 1},
            { id: 534 , head_id: 5.5, risk_id: 540, is_improvement: 1},
            { id: 535 , head_id: 5.5, risk_id: 541, is_improvement: 1},
            { id: 536 , head_id: 5.5, risk_id: 542, is_improvement: 1},
            { id: 537 , head_id: 5.5, risk_id: 543, is_improvement: 1},
        
            
            // -------------------------- 5.6 -------------------------- /
            { id: 534, id_control: '5.6', head_id: 5.6, mainControl_id: 5 , text: "การนำเงินส่งคลังและฝากคลังของส่วนราชการ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การนำเงินส่งคลังและฝากคลังของส่วนราชการ เป็นไปตามแนวทางที่ทางราชการกำหนด"},
            { id: 545, id_control: '5.6', id_subcontrol: '5.6.1',  head_id: 5.6, text: "เงินที่เบิกจากคลัง ถ้าไม่ได้จ่ายหรือจ่ายไม่หมด ส่วนราชการผู้เบิกมีการนำส่งคืนคลัง ภายในสิบห้าวันทำการนับแต่วันรับเงินจากคลัง" , is_subcontrol:0 , ischeckbox:1},
            { id: 546, id_control: '5.6', id_subcontrol: '5.6.2',  head_id: 5.6, text: "ในกรณีที่ส่วนราชการมีการรับคืนเงินที่ได้จ่ายไปแล้วเป็นเงินสด หรือเช็ค มีการนำส่งคืนคลังภายใน สิบห้าวันทำการนับแต่วันที่ได้รับคืน ยกเว้นกรณีมีการรับคืนเงินที่ได้จ่ายไปแล้วด้วยระบบอิเล็กทรอนิกส์ (e-Payment) ให้นำส่งคืนคลังตามระยะเวลาที่กำหนด โดยนำส่งผ่านระบบอิเล็กทรอนิกส์ (e-Payment) ตามหลักเกณฑ์วิธีปฏิบัติ ที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 547, id_control: '5.6', id_subcontrol: '5.6.3',  head_id: 5.6, text: "การนำเงินส่งคลัง ถ้านำส่งก่อนสิ้นปีงบประมาณหรือก่อนสิ้นระยะเวลาเบิกเงินที่กันไว้เบิกเหลื่อมปี มีการนำส่งเป็นเงินเบิกเกินส่งคืน แต่ถ้านำส่งภายหลัง กำหนดดังกล่าว ให้นำส่งเป็นรายได้แผ่นดินประเภทเงินเหลือจ่ายปีเก่าส่งคืน" , is_subcontrol:0 , ischeckbox:1},
            { id: 548, id_control: '5.6', id_subcontrol: '5.6.4',  head_id: 5.6, text: "เงินทั้งปวงที่อยู่ในความรับผิดชอบของหน่วย มีการนำส่งหรือนำฝากคลังภายในกำหนดเวลา ดังต่อไปนี้" , is_subcontrol:0 , ischeckbox:1},
            { id: 549, id_control: '5.6', id_subcontrol: '5.6.5',  head_id: 5.6, text: "เช็ค หรือเอกสารแทนตัวเงินอื่นมีการนำส่ง หรือนำฝากในวันที่ได้รับหรืออย่างช้าภายใน วันทำการถัดไป" , is_subcontrol:0 , ischeckbox:1},
            { id: 550, id_control: '5.6', id_subcontrol: '5.6.6',  head_id: 5.6, text: "เงินรายได้แผ่นดินที่ได้รับเป็นเงินสดมีการนำส่งอย่างน้อยเดือนละหนึ่งครั้ง แต่ถ้าส่วนราชการใดมีเงินรายได้แผ่นดินเก็บรักษาในวันใดเกินหนึ่งหมื่นบาท ก็ให้นำเงินส่งโดยด่วนแต่อย่างช้า   ต้องไม่เกินสามวันทำการถัดไป" , is_subcontrol:0 , ischeckbox:1},
            { id: 551, id_control: '5.6', id_subcontrol: '5.6.7',  head_id: 5.6, text: "เงินรายได้แผ่นดินที่รับด้วยระบบอิเล็กทรอนิกส์ (e-Payment) มีการนำส่งภายในระยะเวลาที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 552, id_control: '5.6', id_subcontrol: '5.6.8',  head_id: 5.6, text: "เงินเบิกเกินส่งคืน หรือเงินเหลือจ่ายปีเก่าส่งคืน มีการนำส่งภายในสิบห้าวันทำการนับแต่ วันรับเงินจากคลังหรือนับแต่วันที่ได้รับคืน" , is_subcontrol:0 , ischeckbox:1},
            { id: 553, id_control: '5.6', id_subcontrol: '5.6.9',  head_id: 5.6, text: "เงินนอกงบประมาณที่รับเป็นเงินสด มีการนำฝากคลังอย่างน้อยเดือนละหนึ่งครั้ง แต่สำหรับเงินที่เบิกจากคลังเพื่อรอการจ่าย ให้นำฝากคลังภายในสิบห้าวันทำการนับแต่วันรับเงินจากคลัง" , is_subcontrol:0 , ischeckbox:1},

            { id: 1031 , head_id: 5.6, sum_id: 101, value: '',  text: "การนำเงินส่งคลังและฝากคลังของส่วนราชการ" },
            { id: 1032 , head_id: 5.6, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1033 , head_id: 5.6, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            
            // ส่วนเก็บ improvement
            { id: 538 , head_id: 5.6, risk_id: 545, is_improvement: 1},
            { id: 539 , head_id: 5.6, risk_id: 546, is_improvement: 1},
            { id: 540 , head_id: 5.6, risk_id: 547, is_improvement: 1},
            { id: 541 , head_id: 5.6, risk_id: 548, is_improvement: 1},
            { id: 542 , head_id: 5.6, risk_id: 549, is_improvement: 1},
            { id: 543 , head_id: 5.6, risk_id: 550, is_improvement: 1},
            { id: 544 , head_id: 5.6, risk_id: 551, is_improvement: 1},
            { id: 545 , head_id: 5.6, risk_id: 552, is_improvement: 1},
            { id: 546 , head_id: 5.6, risk_id: 553, is_improvement: 1},


            // -------------------------- 5.7 -------------------------- /
            { id: 554, id_control: '5.7', head_id: 5.7, mainControl_id: 5 , text: "การนำเงินส่งคลังและฝากคลัง" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การนำเงินส่งคลังและฝากคลัง เป็นไปตามแนวทางที่ทางราชการกำหนด"},
            { id: 555, id_control: '5.7', id_subcontrol: '5.6.7',  head_id: 5.7, text: "มีการให้หัวหน้าหน่วยงานของรัฐหรือผู้ที่ได้รับมอบหมายเป็นผู้นำเงินส่งคลัง" , is_subcontrol:0 , ischeckbox:1},
            { id: 556, id_control: '5.7', id_subcontrol: '5.6.7',  head_id: 5.7, text: "การนำเงินส่งคลังหรือฝากคลัง ผู้เบิกในส่วนกลาง หรือในส่วนภูมิภาค มีการนำส่งหรือนำฝากเงินผ่านระบบอิเล็กทรอนิกส์ (e-Payment) ตามหลักเกณฑ์วิธีปฏิบัติที่กระทรวงการคลังกำหนดเพื่อเข้าบัญชีเงินฝากธนาคารของกรมบัญชีกลาง หรือของสำนักงานคลังจังหวัด แล้วแต่กรณี" , is_subcontrol:0 , ischeckbox:1},
            { id: 557, id_control: '5.7', id_subcontrol: '5.6.7',  head_id: 5.7, text: "กรณีที่เป็นเงินสด หรือเช็ค หรือเอกสารแทนตัวเงินอื่น มีการจัดทำใบนำฝากเงิน พร้อมทั้งนำเงินสด หรือเช็ค หรือเอกสารแทนตัวเงินฝากเข้าบัญชีเงินฝากธนาคารของกรมบัญชีกลาง หรือของสำนักงานคลังจังหวัด แล้วแต่กรณี โดยปฏิบัติตามวิธีการที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 558, id_control: '5.7', id_subcontrol: '5.6.7',  head_id: 5.7, text: "ผู้เบิกมีการใช้วิธีการเชื่อมโยงข้อมูลเข้าระบบหรือวิธีการอื่นให้ถือปฏิบัติ ตามที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},

            { id: 1034 , head_id: 5.7, sum_id: 101, value: '',  text: "การนำเงินส่งคลังและฝากคลัง" },
            { id: 1035 , head_id: 5.7, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1036 , head_id: 5.7, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},


            // ส่วนเก็บ improvement
            { id: 547 , head_id: 5.7, risk_id: 555, is_improvement: 1},
            { id: 548 , head_id: 5.7, risk_id: 556, is_improvement: 1},
            { id: 549 , head_id: 5.7, risk_id: 557, is_improvement: 1},
            { id: 550 , head_id: 5.7, risk_id: 558, is_improvement: 1},
        
            
            // -------------------------- 5.8 -------------------------- /
            { id: 559, id_control: '5.8', head_id: 5.8, mainControl_id: 5 , text: "การกันเงินไว้เบิกเหลื่อมปี" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การกันเงินไว้เบิกเหลื่อมปี เป็นไปตามแนวทางที่ทางราชการกำหนด"},
            { id: 560, id_control: '5.8', id_subcontrol: '5.8.1',  head_id: 5.8, text: "การก่อหนี้ผูกพันไว้ก่อนสิ้นปีงบประมาณและมีวงเงินตั้งแต่หนึ่งแสนบาทขึ้นไปหรือตามที่กระทรวงการคลังกำหนด กรณีที่ไม่สามารถเบิกเงินไปชำระหนี้ได้ทัน สิ้นปีงบประมาณ มีการขอกันเงินไว้เบิกเหลื่อมปีต่อไปได้อีกไม่เกินหกเดือนของปีงบประมาณถัดไป เว้นแต่ มีความจำเป็นต้องขอเบิกเงินจากคลังภายหลังเวลาดังกล่าว ให้ขอทำ ความตกลงกับกระทรวงการคลัง เพื่อขอขยายเวลาออกไปได้อีกไม่เกิน หกเดือน" , is_subcontrol:0 , ischeckbox:1},
            { id: 561, id_control: '5.8', id_subcontrol: '5.8.2',  head_id: 5.8, text: "การขอกันเงินไว้เบิกเหลื่อมปี มีการดำเนินการก่อนสิ้นปีงบประมาณ โดยปฏิบัติตามวิธีการที่กระทรวงการคลังกำหนดการควบคุมและตรวจสอบของหน่วยงานผู้เบิกที่เป็นส่วนราชการ" , is_subcontrol:0 , ischeckbox:1},
            { id: 562, id_control: '5.8', id_subcontrol: '5.8.3',  head_id: 5.8, text: "ทุกสิ้นวันทำการให้เจ้าหน้าที่การเงินของหน่วยมีการตรวจสอบจำนวนเงินสด และเช็คคงเหลือกับรายงานเงินคงเหลือประจำวันที่กรมบัญชีกลางกำหนด กรณีการรับจ่ายเงินผ่านระบบอิเล็กทรอนิกส์ (e-Payment) มีการตรวจสอบการรับจ่ายเงินจากรายงานในระบบอิเล็กทรอนิกส์ (e-Payment) ตามหลักเกณฑ์วิธีปฏิบัติที่กระทรวงการคลังกำหนด" , is_subcontrol:0 , ischeckbox:1},
            { id: 563, id_control: '5.8', id_subcontrol: '5.8.4',  head_id: 5.8, text: "มีการกำหนดตัวบุคคลผู้มีสิทธิเข้าใช้งานในระบบ Internet Banking ของธนาคาร" , is_subcontrol:0 , ischeckbox:1},
            { id: 564, id_control: '5.8', id_subcontrol: '5.8.5',  head_id: 5.8, text: "มีการกำหนดจำนวนผู้ใช้งานในระบบ Company User ในส่วนของ Company User Maker ซึ่งปฏิบัติหน้าที่ในการจ่ายเงิน" , is_subcontrol:0 , ischeckbox:1},

            { id: 1037 , head_id: 5.8, sum_id: 101, value: '',  text: "การกันเงินไว้เบิกเหลื่อมปี" },
            { id: 1038 , head_id: 5.8, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1039 , head_id: 5.8, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            

            // ส่วนเก็บ improvement
            { id: 551 , head_id: 5.8, risk_id: 560, is_improvement: 1},
            { id: 552 , head_id: 5.8, risk_id: 561, is_improvement: 1},
            { id: 553 , head_id: 5.8, risk_id: 562, is_improvement: 1},
            { id: 554 , head_id: 5.8, risk_id: 563, is_improvement: 1},
            { id: 555 , head_id: 5.8, risk_id: 564, is_improvement: 1},

            
            // อาจจะแยกออกจากกันในอนาคต ตอนนี้นำมาต่อกันก่อน จะเว้นค่า 6 ไว้เพื่อเก็บคำถามอื่น ๆ เพื่อให้สอดคล้องกับทั้งสองกรณี 
            { id: 701, id_control: '1.',  head_id: 7, mainControl_id: 7, text: "การปฏิบัติงานในระบบ New GFMIS Thai (ส่วนที่ ๒)" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การปฏิบัติงานในระบบ New GFMIS Thai มีปลอดภัย เป็นไปตามแนวทางที่ทางราชการกำหนด"},
            { id: 702, id_control: '1.1', head_id: 7, text: "มีคำสั่งแต่งตั้งหรือมอบหมายเป็นลายลักษณ์อักษร กำหนดตัวบุคคลที่ได้รับมอบหมาย ผู้มีสิทธิถือบัตรกำหนดสิทธิการใช้ ผู้มีสิทธิถือรหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) ในการปฏิบัติงาน ในระบบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 703, id_control: '1.2', head_id: 7, text: "มีผู้มีหน้าที่ความรับผิดชอบ กำหนดแนวทางการควบคุมการปฏิบัติงาน และวิธีเก็บรักษา GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) ในการปฏิบัติงานในระบบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 704, id_control: '1.3', head_id: 7, text: 'มีการเปลี่ยนแปลง รหัสผ่าน (Password) ในการเข้า ใช้งาน  ในระบบ ทุก ๓ เดือน หรือตามที่หัวหน้าส่วนราชการกำหนด' , is_subcontrol:0 , ischeckbox:1},
            { id: 705, id_control: '1.4', head_id: 7,text: "หากมีการเปลี่ยนแปลงผู้มีสิทธิเข้าปฏิบัติงานในระบบให้หน่วยงานผู้เบิกมีหนังสือแจ้งกรมบัญชีกลางพร้อมแนบคำสั่งแต่งตั้งให้ดำรงตำแหน่งของผู้ถือ GFMIS Token Key หรือ รหัสผู้ใช้งาน (User Name) ใหม่ เพื่ออนุมัติเปลี่ยนชื่อผู้ถือทันทีหลังจากได้รับการอนุมัติ" , is_subcontrol:0 , ischeckbox:1},
            
            { id: 1040 , head_id: 7, sum_id: 601, value: '',  text: "การปฏิบัติงานในระบบ New GFMIS Thai" },
            { id: 1041 , head_id: 7, sum_id: 602, value: '1', text: "มีการควบคุมเพียงพอ", isradio:1},
            { id: 1042 , head_id: 7, sum_id: 603, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
           
            // ส่วนเก็บ improvement
            { id: 701 , head_id: 7, risk_id: 702, is_improvement: 1},
            { id: 702 , head_id: 7, risk_id: 703, is_improvement: 1},
            { id: 703 , head_id: 7, risk_id: 704, is_improvement: 1},
            { id: 704 , head_id: 7, risk_id: 705, is_improvement: 1},

            // -------------------------- 2 -------------------------- //
            { id: 801, id_control: '2.',  head_id: 8, mainControl_id: 8 , text: "การเบิกเงิน (ส่วนที่ ๒)" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การเบิกเงิน เป็นไปด้วยความถูกต้อง ปลอดภัย ตามแนวทางที่ทางราชการกำหนด"},
            { id: 802, id_control: '2.1', head_id: 8, text: "การบันทึกรายการขอเบิกเงินในระบบกระทำโดยผู้มีสิทธิถือบัตรกำหนดสิทธิการใช้มีสิทธิถือรหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) หรือผู้ที่ได้รับมอบหมายเท่านั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 803, id_control: '2.2', head_id: 8, text: "การอนุมัติเบิกเงินในระบบกระทำโดย ผู้มีสิทธิถือบัตรกำหนดสิทธิการใช้มีสิทธิถือรหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) หรือผู้ที่ได้รับมอบหมายเท่านั้น " , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1043 , head_id: 8, sum_id: 701, value:  '', text: "การเบิกเงิน" },
            { id: 1044 , head_id: 8, sum_id: 702, value: '1', text: "มีการควบคุมเพียงพอ", isradio:1},
            { id: 1045 , head_id: 8, sum_id: 703, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
        
            // ส่วนเก็บ improvement
            { id: 801 , head_id: 8, risk_id: 802, is_improvement: 1},
            { id: 802 , head_id: 8, risk_id: 803, is_improvement: 1},
            
            // -------------------------- 3 -------------------------- //
            { id: 901, id_control: '3.' , head_id: 9, mainControl_id: 9 , text: "การรับและเก็บรักษาเงิน (ส่วนที่ ๒)" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การรับและเก็บรักษาเงินมีความปลอดภัย เป็นไปตามแนวทางที่ทางราชการกำหนด"},
            { id: 902, id_control: '3.1', head_id: 9, text: "การบันทึกรายการรับเงินเพื่อนำส่ง กระทำโดยผู้มีสิทธิถือบัตรกำหนดสิทธิการใช้ ผู้มีสิทธิถือรหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) หรือผู้ที่ได้รับมอบหมายเท่านั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 903, id_control: '3.2', head_id: 9, text: "มีการตรวจสอบความถูกต้องของเลขที่เอกสารในระบบและรหัสต่างๆ ในการรับเงินเพื่อนำส่ง" , is_subcontrol:0 , ischeckbox:1},
            { id: 904, id_control: '3.3', head_id: 9, text: "มีการตรวจสอบการแจ้งโอนเงินของธนาคารกับรายงานสรุปรายการขอเบิกของหน่วยงานหรือรายงานแสดงรายละเอียดสถานะ การเบิกจ่ายเงินทุกครั้งที่มีการรับเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 905, id_control: '3.4', head_id: 9 ,text: "เก็บรักษาบัตรกำหนดสิทธิการใช้ผู้มีสิทธิถือ รหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) บันทึกรายการรับเงินไว้ในที่ปลอดภัยตลอดเวลา" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1046 , head_id: 9, sum_id: 301, value:  '', text: "ระดับความพร้อมรบของ ทร." },
            { id: 1047 , head_id: 9, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ", isradio:1},
            { id: 1048 , head_id: 9, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},    
    
            // ส่วนเก็บ improvement
            { id: 901 , head_id: 9, risk_id: 902, is_improvement: 1},
            { id: 902 , head_id: 9, risk_id: 903, is_improvement: 1},
            { id: 903 , head_id: 9, risk_id: 904, is_improvement: 1},
            { id: 904 , head_id: 9, risk_id: 905, is_improvement: 1},

            // -------------------------- 4 -------------------------- //
            { id: 1001, id_control: '4.',  head_id: 10, mainControl_id: 10 , text: "การจ่ายเงิน (ส่วนที่ ๒)" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้การจ่ายเงินมีความปลอดภัย เป็นไปตามแนวทางที่ทางราชการกำหนด"},
            { id: 1002, id_control: '4.1', head_id: 10, text: "การบันทึกการจ่ายชำระเงินในระบบกระทำโดยผู้มีสิทธิถือบัตร กำหนดสิทธิการใช้ผู้มีสิทธิถือรหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) หรือผู้ที่ได้รับมอบหมายเท่านั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 1003, id_control: '4.2', head_id: 10, text: "การบันทึกรายการนำส่งเงินกระทำโดยผู้มีสิทธิถือบัตรกำหนดสิทธิการใช้ผู้มีสิทธิถือรหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) เท่านั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 1004, id_control: '4.3', head_id: 10, text: "มีการตรวจสอบความถูกต้องของยอดเงินในสำเนาใบรับเงิน (DEPOSIT RECEIPT) กับใบนำส่งเงินทุกครั้ง" , is_subcontrol:0 , ischeckbox:1},
            { id: 1005, id_control: '4.4', head_id: 10, text: "มีการตรวจสอบรายงานแสดงสถานะเอกสารนำส่งเงินของส่วนราชการ ว่าครบถ้วน ถูกต้อง และกระทรวงการคลัง ได้ผ่านรายการแล้ว โดยผู้ที่มิใช่ผู้บันทึกรายการนำส่งเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 1006, id_control: '4.5', head_id: 10, text: "มีการตรวจสอบการจ่ายเงินเข้าบัญชีธนาคารของเจ้าหนี้ ผู้มีสิทธิโดยตรง" , is_subcontrol:0 , ischeckbox:1},
            { id: 1007, id_control: '4.6', head_id: 10, text: "มีการทบทวนแผนการเสริมสร้างกำลังกองทัพ ตามห้วงเวลา ที่เหมาะสม" , is_subcontrol:0 , ischeckbox:1},
            { id: 1008, id_control: '4.7', head_id: 10, text: "มีการตรวจสอบการจ่ายชำระเงินว่าได้หักล้างกับรายการขอเบิกครบถ้วน ถูกต้องตรงกัน โดยผู้ที่มิใช่ผู้บันทึกการจ่ายชำระเงิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 1009, id_control: '4.8', head_id: 10, text: "มีการตรวจสอบรหัสต่างๆ และจำนวนเงิน ในรายการบันทึกการจ่ายชำระเงิน ว่าถูกต้องตรงกันกับรายการขอเบิก " , is_subcontrol:0 , ischeckbox:1},
            { id: 1010, id_control: '4.9', head_id: 10, text: "เก็บรักษาบัตรกำหนดสิทธิการใช้ผู้มีสิทธิถือ รหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) บันทึกการจ่ายชำระเงินและรายการนำส่งเงินไว้ในที่ปลอดภัยตลอดเวลา" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1049 , head_id: 10, sum_id: 401, value:  '', text: "การจ่ายเงิน" },
            { id: 1050 , head_id: 10, sum_id: 402, value: '1', text: "มีการควบคุมเพียงพอ", isradio:1},
            { id: 1051 , head_id: 10, sum_id: 403, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1}, 
            
            // ส่วนเก็บ improvement
            { id: 1001 , head_id: 10, risk_id: 1002, is_improvement: 1},
            { id: 1002 , head_id: 10, risk_id: 1003, is_improvement: 1},
            { id: 1003 , head_id: 10, risk_id: 1004, is_improvement: 1},
            { id: 1004 , head_id: 10, risk_id: 1005, is_improvement: 1},
            { id: 1005 , head_id: 10, risk_id: 1006, is_improvement: 1},
            { id: 1006 , head_id: 10, risk_id: 1007, is_improvement: 1},
            { id: 1007 , head_id: 10, risk_id: 1008, is_improvement: 1},
            { id: 1008 , head_id: 10, risk_id: 1009, is_improvement: 1},
            { id: 1009 , head_id: 10, risk_id: 1010, is_improvement: 1},
        
            // -------------------------- 5 -------------------------- //
            { id: 1101, id_control: '5.',  head_id: 11, mainControl_id: 10 , text: "การบันทึกบัญชีและการจัดทำรายงานการเงิน (ส่วนที่ ๒)" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าการฝึกมีความสอดคล้องกับการปฏิบัติงานตามพันธกิจของ ทร.และการดำเนินการฝึก มีประสิทธิภาพ"},
            { id: 1102, id_control: '5.1', head_id: 11, text: "การบันทึกรายการบัญชีในระบบกระทำโดยผู้มีสิทธิถือบัตรกำหนดสิทธิการใช้ผู้มีสิทธิถือรหัสผู้ใช้งาน GFMIS Token Key และรหัสผ่าน (Password) หรือรหัสผู้ใช้งาน (User Name) และรหัสผ่าน (Password) หรือผู้ที่ได้รับมอบหมาย เท่านั้น" , is_subcontrol:0 , ischeckbox:1},
            { id: 1103, id_control: '5.2', head_id: 11, text: "มีการตรวจสอบรายงานสมุดรายวันทั่วไปกับเอกสารที่นำเข้าระบบเป็นประจำทุกวัน" , is_subcontrol:0 , ischeckbox:1},
            { id: 1104, id_control: '5.3', head_id: 11, text: "มีการตรวจสอบงบทดลองเป็นประจำทุกสัปดาห์" , is_subcontrol:0 , ischeckbox:1},
            { id: 1105, id_control: '5.4', head_id: 11, text: "มีการตรวจสอบรายงานการเคลื่อนไหวเงินฝากกระทรวงการคลัง และรายงานเงินฝากคลังตามประเภท เงินฝาก ทุกครั้งที่มีการฝากหรือถอนเงินฝากคลัง" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1052 , head_id: 11, sum_id: 501, value:  '', text: "การบันทึกบัญชีและการจัดทำรายงานการเงิน" },
            { id: 1053 , head_id: 11, sum_id: 502, value: '1', text: "มีการควบคุมเพียงพอ", isradio:1},
            { id: 1054 , head_id: 11, sum_id: 503, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 1101 , head_id: 11, risk_id: 1102, is_improvement: 1},
            { id: 1102 , head_id: 11, risk_id: 1103, is_improvement: 1},
            { id: 1103 , head_id: 11, risk_id: 1104, is_improvement: 1},
            { id: 1104 , head_id: 11, risk_id: 1105, is_improvement: 1},
            
        ];
    } else { //  branchoperation
        str = [
            // -------------------------- 1.1 -------------------------- //
            // หัวข้อคือเทเบิ้ลหลัก 
            { id: 101, id_control: '1.1',   head_id: 1.1, mainControl_id: 1, text: "การจัดทำยุทธศาสตร์และนโยบาย" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่ายุทธศาสตร์ และนโยบายมีความเหมาะสมกับสภาวการณ์และได้รับการนำไปใช้อย่างถูกต้อง"},
            { id: 102, id_control: '1.1.1', head_id: 1.1, text: "มีระเบียบวิธีในการจัดทำยุทธศาสตร์และนโยบายที่เหมาะสมและมีความน่าเชื่อถือ" , is_subcontrol:0 , ischeckbox:1},
            { id: 103, id_control: '1.1.2', head_id: 1.1, text: "มีระบบรวบรวมข้อมูลและประเมินปัจจัยต่าง ๆ (สถานการณ์ สภาพแวดล้อม ข่าวกรอง ขีดความสามารถกำลังรบ ฯลฯ) ที่เกี่ยวข้องกับการวางแผนที่ถูกต้องและรวดเร็ว" , is_subcontrol:0 , ischeckbox:1},
            { id: 104, id_control: '1.1.3', head_id: 1.1, text: "มีการดำเนินการเพื่อถ่ายทอดยุทธศาสตร์และนโยบายของ ทร.ให้หน่วยต่าง ๆ รับทราบและนำไปเป็นแนวทางการปฏิบัติงานได้ อย่างถูกต้อง" , is_subcontrol:0 , ischeckbox:1},
            { id: 105, id_control: '1.1.4', head_id: 1.1,text: "มีการประเมินผลการปฏิบัติตามยุทธศาสตร์และนโยบายของ ทร.และระเบียบวิธีในการจัดทำฯ" , is_subcontrol:0 , ischeckbox:1},
            
            { id: 1001 , head_id: 1.1, sum_id: 101, value: '',  text: "การรักษาความปลอดภัยเกี่ยวกับข้อมูลข่าวสารลับ" },
            { id: 1002 , head_id: 1.1, sum_id: 102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1003 , head_id: 1.1, sum_id: 103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            // ส่วนเก็บ improvement
            { id: 101 , head_id: 1.1, risk_id: 102, is_improvement: 1},
            { id: 102 , head_id: 1.1, risk_id: 103, is_improvement: 1},
            { id: 103 , head_id: 1.1, risk_id: 104, is_improvement: 1},
            { id: 104 , head_id: 1.1, risk_id: 105, is_improvement: 1},
            // -------------------------- 1.2 -------------------------- //
            { id: 201, id_control: '1.2',   head_id: 1.2, mainControl_id: 1 , text: "การจัดทำ/ทบทวนแผนป้องกันประเทศและแผนป้องกันชายแดนวัตถุประสงค์ของการควบคุม" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มั่นใจว่าแผนป้องกันประเทศและแผนป้องกันชายแดน มีคาวมเหมาะสมกับสภาวการณ์ มีการทบทวนแผนตามขั้นตอนและห้วงเวลาที่เหมาะสม และหน่วยรองมีความเข้าใจและสามารถนำไปจัดทำแผนรองรับได้อย่างถูกต้อง"},
            { id: 202, id_control: '1.2.1', head_id: 1.2, text: "มีกระบวนการในการจัดทำแผนฯ ที่เหมาะสม ถูกต้องและมีความน่าเชื่อถือ" , is_subcontrol:0 , ischeckbox:1},
            { id: 203, id_control: '1.2.2', head_id: 1.2, text: "มีกระบวนการ/ขั้นตอนการรวบรวมข้อมูลและประเมินสภาวะแวดล้อมรวมทั้งปัจจัยต่างๆ ที่เกี่ยวข้องกับการวางแผนในขั้นตอนต่าง ๆ ที่ถูกต้องและรวดเร็ว" , is_subcontrol:0 , ischeckbox:1},
            { id: 204, id_control: '1.2.3', head_id: 1.2, text: "มีกระบวนการถ่ายทอดแนวทางการใช้กำลังทางเรือตามแผนป้องกันประเทศระดับ ทร. ไปสู่หน่วยเหนือและหน่วยรอง หรือ นขต.ทร.เพื่อเป็นกรอบในการวางแผนได้ถูกต้องตามระดับของแผนฯ" , is_subcontrol:0 , ischeckbox:1},
            { id: 205, id_control: '1.2.4', head_id: 1.2 ,text: "มีการประเมินผลการปฏิบัติและการทบทวนปรับปรุง/แก้ไข ตามแผนป้องกันประเทศและแผนป้องกันชายแดน ตามห้วงเวลาที่เหมาะสม" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1004 , head_id: 1.2, sum_id: 201, value:  '', text: "การจัดทำ/ทบทวนแผนป้องกันประเทศและแผนป้องกันชายแดนวัตถุประสงค์ของการควบคุม" },
            { id: 1005 , head_id: 1.2, sum_id: 202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1006 , head_id: 1.2, sum_id: 203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
            
            // ส่วนเก็บ improvement
            { id: 201 , head_id: 1.2, risk_id: 202, is_improvement: 1},
            { id: 202 , head_id: 1.2, risk_id: 203, is_improvement: 1},
            { id: 203 , head_id: 1.2, risk_id: 204, is_improvement: 1},
            { id: 204 , head_id: 1.2, risk_id: 205, is_improvement: 1},
            // -------------------------- 1.3 -------------------------- //
            { id: 301, id_control: '1.3' ,  head_id: 1.3, mainControl_id: 1 , text: "ระดับความพร้อมรบของ ทร." , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าระดับความพร้อมรบของ ทร.มีความเหมาะสม กับสภาวการณ์ตลอดจนความเป็นไปได้ในด้านงบประมาณ มีการทบทวนระดับความพร้อมรบตามขั้นตอนและห้วงเวลาที่เหมาะสม ได้รับการนำไปใช้อย่างถูกต้องและหน่วยเตรียมกำลังสามารถจัดส่งกำลังให้หน่วยใช้กำลังตรงตามระดับความพร้อมรบที่กำหนด"},
            { id: 302, id_control: '1.3.1', head_id: 1.3, text: "มีกระบวนการในการจัดทำความพร้อมรบของ ทร.ที่เหมาะสม น่าเชื่อถือ โดยสอดคล้องตามยุทธศาสตร์ ทร." , is_subcontrol:0 , ischeckbox:1},
            { id: 303, id_control: '1.3.2', head_id: 1.3, text: "จำนวน ประเภท กำลังรบในแต่ละระดับความพร้อมรบ มีความสอดคล้องกับการประเมินสภาวะแวดล้อมและการปฏิบัติภารกิจของหน่วย" , is_subcontrol:0 , ischeckbox:1},
            { id: 304, id_control: '1.3.3', head_id: 1.3, text: "มีเป้าหมายให้หน่วยต่างๆในการเตรียมกำลังและระดมความพร้อมรบในขั้นต่ำสุดไว้อย่างชัดเจน" , is_subcontrol:0 , ischeckbox:1},
            { id: 305, id_control: '1.3.4', head_id: 1.3 ,text: "มีการประเมินผลการดำเนินการตามระดับความพร้อมรบของ ทร." , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1007 , head_id: 1.3, sum_id: 301, value:  '', text: "ระดับความพร้อมรบของ ทร." },
            { id: 1008 , head_id: 1.3, sum_id: 302, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1009 , head_id: 1.3, sum_id: 303, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},    
    
            // ส่วนเก็บ improvement
            { id: 301 , head_id: 1.3, risk_id: 302, is_improvement: 1},
            { id: 302 , head_id: 1.3, risk_id: 303, is_improvement: 1},
            { id: 303 , head_id: 1.3, risk_id: 304, is_improvement: 1},
            { id: 304 , head_id: 1.3, risk_id: 305, is_improvement: 1},

            // -------------------------- 1.4 -------------------------- //
            { id: 401, id_control: '1.4',   head_id: 1.4, mainControl_id: 1 , text: "แผนการเสริมสร้างกำลังกองทัพ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าแผนการเสริมสร้างกำลังกองทัพ มีความเหมาะสมกับสภาวการณ์สอดคล้องกับยุทธศาสตร์กองทัพเรือและ จัดลำดับความเร่งด่วนของการเสริมสร้างกำลังกองทัพได้อย่างเหมาะสมตลอดจนมีการทบทวนแผนตามขั้นตอนและห้วงเวลาที่เหมาะสม และนำไปใช้ในการจัดทำโครงการเสริมสร้างกำลังกองทัพประจำ ปีงบประมาณได้อย่างถูกต้อง สามารถชี้แจงเหตุผลความจำเป็นได้ในทุกขั้นตอนของการเสนอขอรับการจัดสรรงบประมาณ"},
            { id: 402, id_control: '1.4.1', head_id: 1.4, text: "มีกระบวนการในการจัดหาแผนการเสริมสร้างกำลังกองทัพที่เหมาะสม ถูกต้อง และสอดคล้องกับยุทธศาสตร์และนโยบายของ ทร.และหน่วยเหนือ" , is_subcontrol:0 , ischeckbox:1},
            { id: 403, id_control: '1.4.2', head_id: 1.4, text: "มีกระบวนการจัดทำโครงการเสริมสร้างกำลังกองทัพ รวมทั้งการลำดับความสำคัญเร่งด่วนที่เหมาะสม ถูกต้อง ตามขั้นตอน และสอดคล้องตามความต้องการทางยุทธการและยุทธศาสตร์ของ ทร." , is_subcontrol:0 , ischeckbox:1},
            { id: 404, id_control: '1.4.3', head_id: 1.4, text: "มีการทบทวนแผนการเสริมสร้างกำลังกองทัพ ตามห้วงเวลา ที่เหมาะสม" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1010 , head_id: 1.4, sum_id: 401, value:  '', text: "แผนการเสริมสร้างกำลังกองทัพ" },
            { id: 1011 , head_id: 1.4, sum_id: 402, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1012 , head_id: 1.4, sum_id: 403, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1}, 
            
            // ส่วนเก็บ improvement
            { id: 401 , head_id: 1.4, risk_id: 402, is_improvement: 1},
            { id: 402 , head_id: 1.4, risk_id: 403, is_improvement: 1},
            { id: 403 , head_id: 1.4, risk_id: 404, is_improvement: 1},

            // -------------------------- 1.5 -------------------------- //
            { id: 501, id_control: '1.5',   head_id: 1.5, mainControl_id: 1 , text: "การฝึกด้านยุทธการ วัตถุประสงค์ของการควบคุม" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าการฝึกมีความสอดคล้องกับการปฏิบัติงานตามพันธกิจของ ทร.และการดำเนินการฝึก มีประสิทธิภาพ"},
            { id: 502, id_control: '1.5.1', head_id: 1.5, text: "แผนการฝึกของหน่วยตอบสนองต่อวัตถุประสงค์ของ ทร. ในบทบาทต่างๆ ตามยุทธศาสตร์และนโยบายของ ทร." , is_subcontrol:0 , ischeckbox:1},
            { id: 503, id_control: '1.5.2', head_id: 1.5, text: "วัตถุประสงค์และหัวข้อของการฝึกสอดคล้องกับ การฝึกของ ทร.และภารกิจของหน่วย ตลอดจนหลักนิยมของสาขา การปฏิบัติการต่างๆ ที่เกี่ยวข้อง" , is_subcontrol:0 , ischeckbox:1},
            { id: 504, id_control: '1.5.3', head_id: 1.5, text: "มีการกำหนดโครงสร้างและความรับผิดชอบของ กองอำนวยการฝึก และหน่วยฝึก" , is_subcontrol:0 , ischeckbox:1},
            { id: 505, id_control: '1.5.4', head_id: 1.5, text: "มีการควบคุม กำกับดูแล การดำเนินการฝึกให้เป็นไปตามขั้นตอนและแผนการฝึกที่กำหนดไว้" , is_subcontrol:0 , ischeckbox:1},
            { id: 506, id_control: '1.5.5', head_id: 1.5, text: "มีการประเมินผลการฝึกอย่างเที่ยงธรรมและเชื่อถือได้" , is_subcontrol:0 , ischeckbox:1},
            { id: 507, id_control: '1.5.6', head_id: 1.5, text: "มีการนำบทเรียนที่ได้รับมาปรับปรุงพัฒนาและใช้เป็นข้อมูลวางแผนการฝึกครั้งต่อไป" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1013 , head_id: 1.5, sum_id: 501, value:  '', text: "การฝึกด้านยุทธการ วัตถุประสงค์ของการควบคุม" },
            { id: 1014 , head_id: 1.5, sum_id: 502, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1015 , head_id: 1.5, sum_id: 503, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 501 , head_id: 1.5, risk_id: 502, is_improvement: 1},
            { id: 502 , head_id: 1.5, risk_id: 503, is_improvement: 1},
            { id: 503 , head_id: 1.5, risk_id: 504, is_improvement: 1},
            { id: 504 , head_id: 1.5, risk_id: 505, is_improvement: 1},
            { id: 505 , head_id: 1.5, risk_id: 506, is_improvement: 1},
            { id: 506 , head_id: 1.5, risk_id: 507, is_improvement: 1},
            // -------------------------- 1.6 -------------------------- //
            { id: 601, id_control: '1.6',   head_id: 1.6, mainControl_id: 1 , text: "ความพร้อมรบด้านองค์ยุทธวิธี" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าหน่วยงานใช้แนวทางตามหลักนิยม/หลัก ยุทธวิธี/เอกสาร/คู่มือ ฯลฯ ที่ ทร.ได้ให้ความเห็นชอบไว้ เป็นแนวทางในการปฏิบัติงาน และปรับปรุง/พัฒนาหลักนิยมและแนวทางการปฏิบัติทางยุทธวิธีที่หน่วยรับผิดชอบให้เหมาะสมและทันสมัย"},
            { id: 602, id_control: '1.6.1', head_id: 1.6, text: "หน่วยมีเอกสารหลักนิยมและแนวทางการปฏิบัติ ทางยุทธวิธีที่เกี่ยวข้องกับการปฏิบัติของหน่วยครบถ้วน" , is_subcontrol:0 , ischeckbox:1},
            { id: 603, id_control: '1.6.2', head_id: 1.6, text: "มีระเบียบวิธีในการกำหนดหรือแก้ไขปรับปรุงหลักนิยม และแนวทางการปฏิบัติทางยุทธวิธีที่หน่วยรับผิดชอบ" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1016 , head_id: 1.6, sum_id: 601, value:  '', text: "ความพร้อมรบด้านองค์ยุทธวิธี" },
            { id: 1017 , head_id: 1.6, sum_id: 602, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1018 , head_id: 1.6, sum_id: 603, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 601 , head_id: 1.6, risk_id: 602, is_improvement: 1},
            { id: 602 , head_id: 1.6, risk_id: 603, is_improvement: 1},

            // -------------------------- 1.7 -------------------------- //
            { id: 701, id_control: '1.7',   head_id: 1.7, mainControl_id: 1 , text: "ความพร้อมรบด้านองค์วัตถุ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่ายุทโธปกรณ์มีความพร้อมใช้งานได้อย่างเต็มประสิทธิภาพ สอดคล้องกับระดับความพร้อมรบที่กำหนด"},
            { id: 702, id_control: '1.7.1', head_id: 1.7, text: "มีการกำหนดวงรอบการตรวจสอบและรายงานความพร้อมใช้งานอย่างน้อยปีละ ๑ ครั้ง และทุกครั้งก่อนนำมาใช้งาน" , is_subcontrol:0 , ischeckbox:1},
            { id: 703, id_control: '1.7.2', head_id: 1.7, text: "มีระเบียบวิธีการปฏิบัติเพื่อประเมินความพอเพียงและประสิทธิภาพของ วงรอบการตรวจสอบความพร้อมใช้งาน และระบบรายงานสถานภาพความพร้อมฯ" , is_subcontrol:0 , ischeckbox:1},
            { id: 704, id_control: '1.7.3', head_id: 1.7, text: "มีระเบียบวิธีในการจัดทำแผนดำรงความพร้อมรบของยุทโธปกรณ์ ตามแผนยุทธศาสตร์และโครงการเสริมสร้างกำลังรบ" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1019 , head_id: 1.7, sum_id: 701, value:  '', text: "ความพร้อมรบด้านองค์วัตถุ" },
            { id: 1020 , head_id: 1.7, sum_id: 702, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1021 , head_id: 1.7, sum_id: 703, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 701 , head_id: 1.7, risk_id: 702, is_improvement: 1},
            { id: 702 , head_id: 1.7, risk_id: 703, is_improvement: 1},
            { id: 703 , head_id: 1.7, risk_id: 704, is_improvement: 1},
            
            // -------------------------- 1.8 -------------------------- //
            { id: 801, id_control: '1.8',   head_id: 1.8, mainControl_id: 1 , text: "ความพร้อมรบด้านการควบคุมบังคับบัญชาและสั่งการ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่า ระยยการควบคุมบังคับบัญชาและสั่งการมีความพร้อมใช้งานและเชื่อถือได้"},
            { id: 802, id_control: '1.8.1', head_id: 1.8, text: "มีระเบียบปฏิบัติประจำในการควบคุมบังคับบัญชาและสั่งการอย่างเป็นระบบ" , is_subcontrol:0 , ischeckbox:1},
            { id: 803, id_control: '1.8.2', head_id: 1.8, text: "มีฐานข้อมูลและวิธีการติดต่อสื่อสาร กับหน่วยงาน/บุคคลที่เกี่ยวข้อง และพร้อมนำมาใช้ได้ตลอดเวลา" , is_subcontrol:0 , ischeckbox:1},
            { id: 804, id_control: '1.8.3', head_id: 1.8, text: "มีระเบียบปฏิบัติประจำในการทดสอบระบบควบคุมบังคับบัญชาและสั่งการตามวงรอบที่เหมาะสม" , is_subcontrol:0 , ischeckbox:1},
            { id: 805, id_control: '1.8.4', head_id: 1.8 ,text: "มีระบบสำรองในการควบคุมบังคับบัญชาและสั่งการ และต้องมีมีระเบียบปฏิบัติประจำในการทดสอบระบบสำรองตามวงรอบที่เหมาะสม" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1022 , head_id: 1.8, sum_id: 801, value:  '', text: "ความพร้อมรบด้านการควบคุมบังคับบัญชาและสั่งการ" },
            { id: 1023 , head_id: 1.8, sum_id: 802, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1024 , head_id: 1.8, sum_id: 803, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},    

            // ส่วนเก็บ improvement
            { id: 801 , head_id: 1.8, risk_id: 802, is_improvement: 1},
            { id: 802 , head_id: 1.8, risk_id: 803, is_improvement: 1},
            { id: 803 , head_id: 1.8, risk_id: 804, is_improvement: 1},
            { id: 804 , head_id: 1.8, risk_id: 805, is_improvement: 1},
            
            // -------------------------- 2.1 -------------------------- //
            { id: 901, id_control: '2.1',   head_id: 2.1, mainControl_id: 2 , text: "การพิทักษ์รักษาและเทิดทูนสถาบันพระมหากษัตริย์" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าการถวายความปลอดภัยฯ มีความสำคัญสูงสุดและหน่วยงานมีกิจกรรม ที่แสดงถึงการรักษาและเทิดทูนสถาบันพระมหากษัตริย์"},
            { id: 902, id_control: '2.1.1', head_id: 2.1, text: "มีแผนและแนวทางในการถวายความปลอดภัยแด่บุคคลสำคัญในสถาบันพระมหากษัตริย์" , is_subcontrol:0 , ischeckbox:1},
            { id: 903, id_control: '2.1.2', head_id: 2.1, text: "มีขั้นตอนการทดสอบความเข้าใจและซักซ้อมการปฏิบัติของเจ้าหน้าที่" , is_subcontrol:0 , ischeckbox:1},
            { id: 904, id_control: '2.1.3', head_id: 2.1, text: "ทุกระดับเกี่ยวกับระบบการทำงานของหน่วยงานภาครัฐที่มีหน้าที่เกี่ยวข้องกับการถวายความปลอดภัย" , is_subcontrol:0 , ischeckbox:1},
            { id: 905, id_control: '2.1.4', head_id: 2.1 ,text: "มีการจัดแสดงหรือจัดกิจกรรม เพื่อจัดถวายสักการะและเทิดพระเกียรติ แด่พระบาทสมเด็จพระเจ้าอยู่หัวฯ และสมเด็จพระนางเจ้าฯ พระบรมราชินีนาถ และพระบรมวงศานุวงศ์ชั้นสูงทุกวันครบรอบเฉลิมพระชนมพรรษา และในวโรกาสที่สำคัญ" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1025 , head_id:  2.1, sum_id: 901, value:  '', text: "การพิทักษ์รักษาและเทิดทูนสถาบันพระมหากษัตริย์" },
            { id: 1026 , head_id:  2.1, sum_id: 902, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1027 , head_id:  2.1, sum_id: 903, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 901 , head_id: 2.1, risk_id: 902, is_improvement: 1},
            { id: 902 , head_id: 2.1, risk_id: 903, is_improvement: 1},
            { id: 903 , head_id: 2.1, risk_id: 904, is_improvement: 1},
            { id: 904 , head_id: 2.1, risk_id: 905, is_improvement: 1},
            
            // -------------------------- 2.2 -------------------------- //
            { id: 1001, id_control: '2.2',   head_id: 2.2, mainControl_id: 2 , text: "การป้องกันประเทศ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าหน่วยงานมีความพร้อมในการป้องกันประเทศตามแผนของหน่วยเหนือ"},
            { id: 1002, id_control: '2.2.1', head_id: 2.2, text: "มีแผนป้องกันประเทศและแผนยุทธการที่สอดคล้องกับแผนของหน่วยเหนือ รวมทั้งยุทธศาสตร์และนโยบายของ ทร." , is_subcontrol:0 , ischeckbox:1},
            { id: 1003, id_control: '2.2.2', head_id: 2.2, text: "มีขั้นตอน มีระเบียบปฏิบัติ ในการปรับปรุงแผนป้องกันประเทศ และแผนยุทธการ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1004, id_control: '2.2.3', head_id: 2.2, text: "มีการกำหนดกฎการใช้กำลังให้กับหน่วยปฏิบัติ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1005, id_control: '2.2.4', head_id: 2.2 ,text: "มีระบบทดสอบความพร้อมในการใช้กำลัง" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1028 , head_id:  2.2, sum_id: 1001, value:  '', text: "การป้องกันประเทศ" },
            { id: 1029 , head_id:  2.2, sum_id: 1002, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1030 , head_id:  2.2, sum_id: 1003, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 1001 , head_id: 2.2, risk_id: 1002, is_improvement: 1},
            { id: 1002 , head_id: 2.2, risk_id: 1003, is_improvement: 1},
            { id: 1003 , head_id: 2.2, risk_id: 1004, is_improvement: 1},
            { id: 1004 , head_id: 2.2, risk_id: 1005, is_improvement: 1},

            // -------------------------- 2.3 -------------------------- //
            { id: 1031, id_control: '2.3',   head_id: 2.3, mainControl_id: 2 , text: "การรักษาความมั่นคงของรัฐ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าการปฏิบัติในการรักษาความม่ันคงของรัฐมีความสอดคล้องกับแผนที่กำหนดขึ้น และมีประสิทธิภาพ"},
            { id: 1032, id_control: '2.3.1', head_id: 2.3, text: "มีแผนการปฏิบัติในการรักษาความมั่นคงของรัฐ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1033, id_control: '2.3.2', head_id: 2.3, text: "มีระเบียบวิธี และแนวทางในการปฏิบัติ เพื่อให้ความรู้แก่เจ้าหน้าที่เกี่ยวกับกฎหมายที่มอบอำนาจให้เจ้าหน้าที่ทหารเรือ และภัยคุกคามต่อความมั่นคงของชาติในรูปแบบใหม่ เช่น การค้ายาเสพติด การค้ามนุษย์ การก่อการร้าย การก่อความไม่สงบเพื่อผลทางการเมือง การปราบปรามผู้ลักลอบตัดไม้ทำลายป่า การปราบปรามผู้หลบหนีเข้าเมือง ฯลฯ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1034, id_control: '2.3.3', head_id: 2.3, text: "มีขั้นตอนการตรวจสอบเพื่อให้การปฏิบัติมีความสอดคล้อง กับยุทธศาสตร์และนโยบาย ทร." , is_subcontrol:0 , ischeckbox:1},
            { id: 1035, id_control: '2.3.4', head_id: 2.3 ,text: "มีการควบคุมกำกับการดำเนินการ และการตรวจสอบการปฏิบัติ รวมทั้งการรายงานผลการปฏิบัติ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1036, id_control: '2.3.5', head_id: 2.3 ,text: "มีการนำผลการปฏิบัติมาปรับปรุงแผนการรักษาความมั่นคงของรัฐ ที่หน่วยต้องจัดทำขึ้น" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1028 , head_id:  2.3, sum_id: 1101, value:  '', text: "การรักษาความมั่นคงของรัฐ" },
            { id: 1029 , head_id:  2.3, sum_id: 1102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1030 , head_id:  2.3, sum_id: 1103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1}, 
    
            // ส่วนเก็บ improvement
            { id: 1101 , head_id: 2.3, risk_id: 1032, is_improvement: 1},
            { id: 1102 , head_id: 2.3, risk_id: 1033, is_improvement: 1},
            { id: 1103 , head_id: 2.3, risk_id: 1034, is_improvement: 1},
            { id: 1104 , head_id: 2.3, risk_id: 1035, is_improvement: 1},
            { id: 1105 , head_id: 2.3, risk_id: 1036, is_improvement: 1},
            
            // -------------------------- 2.4 -------------------------- //
            { id: 1037, id_control: '2.4',   head_id: 2.4, mainControl_id: 2 , text: "การสนับสนุนรัฐบาลในการพัฒนาประเทศ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าหน่วยงานสามารถสนับสนุนรัฐบาลในการ พัฒนาประเทศได้ และเป็นไปตามแนวทางที่ ทร.เห็นชอบ รวมทั้งยอมรับผลกระทบจากการดำเนินการนั้นได้"},
            { id: 1038, id_control: '2.4.1', head_id: 2.4, text: "มีแนวทางการดำเนินงานตามนโยบายรัฐบาล" , is_subcontrol:0 , ischeckbox:1},
            { id: 1039, id_control: '2.4.2', head_id: 2.4, text: "มีขั้นตอนการตรวจสอบความสอดคล้องกับยุทธศาสตร์และนโยบาย ทร." , is_subcontrol:0 , ischeckbox:1},
            { id: 1040, id_control: '2.4.3', head_id: 2.4, text: "มีแนวทางในการควบคุมกำกับการดำเนินการ และการตรวจสอบการปฏิบัติ รวมทั้งการรายงานผลการปฏิบัติ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1041, id_control: '2.4.4', head_id: 2.4 ,text: "มีขั้นตอนการประเมินความเสี่ยง เพื่อให้ความพร้อมรบที่อาจลดลงเนื่องจากการปฏิบัติภารกิจนี้ อยู่ในระดับที่ยอมรับได้" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1031 , head_id:  2.4, sum_id: 1101, value:  '', text: "การสนับสนุนรัฐบาลในการพัฒนาประเทศ" },
            { id: 1032 , head_id:  2.4, sum_id: 1102, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1033 , head_id:  2.4, sum_id: 1103, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},
    
            // ส่วนเก็บ improvement
            { id: 1201 , head_id: 2.4, risk_id: 1038, is_improvement: 1},
            { id: 1202 , head_id: 2.4, risk_id: 1039, is_improvement: 1},
            { id: 1203 , head_id: 2.4, risk_id: 1040, is_improvement: 1},
            { id: 1204 , head_id: 2.4, risk_id: 1041, is_improvement: 1},

            // -------------------------- 2.5 -------------------------- //
            { id: 1042, id_control: '2.5',   head_id: 2.5, mainControl_id: 2 , text: "การเสริมสร้างความร่วมมือด้านความมั่นคงกับประเทศเพื่อนบ้านและมิตรประเทศ" , main_Obj:"วัตถุประสงค์ของการควบคุม" , objectName: "เพื่อให้มีความมั่นใจว่าหน่วยงานได้กำหนดขั้นตอนการปฏิบัติเกี่ยวกับการเสริมสร้างความร่วมมือด้านความมั่นคงกับประเทศเพื่อนบ้านและมิตรประเทศไว้อย่างเหมาะสม ทั้งในภาวะปกติและภาวะฉุกเฉิน"},
            { id: 1043, id_control: '2.5.1', head_id: 2.5, text: "มีการกำหนดนโยบายหรือแนวทางการปฏิบัติ เกี่ยวกับข้อตกลงตามความร่วมมือฯ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1044, id_control: '2.5.2', head_id: 2.5, text: "มีแผนหรือระเบียบปฏิบัติประจำที่เกี่ยวข้องการดำเนินการตามความร่วมมือฯ" , is_subcontrol:0 , ischeckbox:1},
            { id: 1045, id_control: '2.5.3', head_id: 2.5, text: "มีระบบการดำเนินการตามความร่วมมือ ที่เหมาะสม ทั้งในภาวะปกติและภาวะฉุกเฉิน" , is_subcontrol:0 , ischeckbox:1},
            { id: 1046, id_control: '2.5.4', head_id: 2.5 ,text: "มีระเบียบวิธี เพื่อการทบทวน ปรับปรุง แก้ไข ข้อตกลง และระเบียบปฏิบัติประจำที่เกี่ยวข้อง" , is_subcontrol:0 , ischeckbox:1},
    
            { id: 1034 , head_id:  2.5, sum_id: 1201, value:  '', text: "การเสริมสร้างความร่วมมือด้านความมั่นคงกับประเทศเพื่อนบ้านและมิตรประเทศ" },
            { id: 1035 , head_id:  2.5, sum_id: 1202, value: '1', text: "มีการควบคุมเพียงพอ" , isradio:1},
            { id: 1036 , head_id:  2.5, sum_id: 1203, value: '0', text: "กรณีไม่เพียงพอมีแนวทางหรือวิธีการปรับปรุงการควบคุมภายในให้ดีขึ้น ดังนี้" , isradio:1},

            // ส่วนเก็บ improvement
            { id: 1301 , head_id: 2.5, risk_id: 1043, is_improvement: 1},
            { id: 1302 , head_id: 2.5, risk_id: 1044, is_improvement: 1},
            { id: 1303 , head_id: 2.5, risk_id: 1045, is_improvement: 1},
            { id: 1304 , head_id: 2.5, risk_id: 1046, is_improvement: 1},
        ];
    }
    return str
}
