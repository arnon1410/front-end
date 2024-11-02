function fnGetCollectDataPK6(type, val) {
    // ประกาศตัวแปร result เพื่อเก็บ id และ title ที่จะ return
    let result = [];

    // ข้อมูลการเก็บข้อมูลที่เป็นออบเจ็กต์สำหรับ 'risking'
    const riskingData = [
        { id: 101, title: '๑.๑ ด้านกำลังพล' },
        { id: 102, title: '๑.๒ ด้านยุทธการ' },
        { id: 103, title: '๑.๓ ด้านการข่าว' },
        { id: 104, title: '๑.๔ ด้านส่งกำลังบำรุง' },
        { id: 105, title: '๑.๕ ด้านการสื่อสาร' },
        { id: 106, title: '๑.๖ ด้านเทคโนโลยีสารสนเทศในการบริหารจัดการ' },
        { id: 107, title: '๑.๗ ด้านกิจการพลเรือน' },
        { id: 108, title: '๑.๑ ด้านการงบประมาณ' },
        { id: 109, title: '๑.๒ ด้านการเงินและการบัญชี' },
        { id: 110, title: '๑.๓ ด้านพัสดุและทรัพย์สิน' }
    ];

    // ข้อมูลการเก็บข้อมูลที่เป็นออบเจ็กต์สำหรับ 'improvement'
    const improvementData = [
        { id: 201, title: '๒.๑ ด้านกำลังพล' },
        { id: 202, title: '๒.๒ ด้านยุทธการ' },
        { id: 203, title: '๒.๓ ด้านการข่าว' },
        { id: 204, title: '๒.๔ ด้านส่งกำลังบำรุง' },
        { id: 205, title: '๒.๕ ด้านการสื่อสาร' },
        { id: 206, title: '๒.๖ ด้านเทคโนโลยีสารสนเทศในการบริหารจัดการ' },
        { id: 207, title: '๒.๗ ด้านกิจการพลเรือน' },
        { id: 208, title: '๒.๑ ด้านการงบประมาณ' },
        { id: 209, title: '๒.๒ ด้านการเงินและการบัญชี' },
        { id: 210, title: '๒.๓ ด้านพัสดุและทรัพย์สิน' }
    ];

    if (type === 'risking') {
        if (val === '1') {
            result = riskingData.slice(0, 7); // 101 - 107
        } else if (val === '44') {
            result = riskingData.slice(7); // 108 - 110
        }
    } else if (type === 'improvement') {
        if (val === '1') {
            result = improvementData.slice(0, 7); // 201 - 207
        } else if (val === '44') {
            result = improvementData.slice(7); // 208 - 210
        }
    }

    // คืนค่า result ซึ่งเป็น array ของออบเจ็กต์ที่มี id และ title
    return result;
}