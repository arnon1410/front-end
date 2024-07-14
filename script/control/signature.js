function fnDrawSignatureAndIsChecked() {
/* start code signature */
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

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

document.getElementById('submitSignatureButton').addEventListener('click', function() {
    let isValid = true;

    // Validate signature
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasSignature = canvasData.data.some(channel => channel !== 0);
    if (!hasSignature) {
        document.getElementById('evaluatorError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('evaluatorError').style.display = 'none';
    }

    // Validate evaluator text
    const evaluatorText = document.getElementById('evaluatorText').value;
    if (!evaluatorText) {
        document.getElementById('evaluatorTextError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('evaluatorTextError').style.display = 'none';
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

    if (isValid) {
        const resultContainer = document.getElementById('dvSignature');

        const evaluatorDataURL = canvas.toDataURL();

        const positionText = position ? position : '................................................';
        const buddhistYear = fnConvertToBuddhistYear(year);
        const shortYear = buddhistYear.toString().slice(-2);
        const dateText = `${fnConvertToThaiNumeralsAndPoint(day)} /  ${fnConvertMonthToShort(month)} / ${fnConvertToThaiNumeralsAndPoint(shortYear)}`;

        let strHTML = `
            <div>ผู้ประเมิน: <span style="width: 200px;" class="underline-dotted">${evaluatorText} <img src="${evaluatorDataURL}" alt="ลายเซ็น" /></span></div>
            <div>ตำแหน่ง: <span style="width: 207px;" class="underline-dotted">${positionText}</span></div>
            <div>วันที่: <span style="width: 232px;" class="underline-dotted">${dateText}</span></div>
        `;

        resultContainer.innerHTML = strHTML;
        $('#signatureModal').modal('hide');
    }
});
/* end code signature */
}
