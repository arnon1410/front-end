function fnGetAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
}

function fnStringToInt(input) {
  // Check if the input is a number and return it directly
  if (typeof input === 'number') {
      return input;
  }
  
  // If the input is a string
  if (typeof input === 'string') {
      // Check if the string is empty or undefined
      if (input.trim() === '') {
          return '';
      }
      
      // Convert the string to an integer
      const num = parseInt(input, 10);
      
      // Check if the result is a valid number
      if (isNaN(num)) {
          return '';
      }
      
      return num;
  }
  
  // If the input is neither a number nor a string, return null
  return null;
}

function fnConvertToThaiNumeralsAndPoint(number) {
    const thaiNumerals = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];

    // แปลงเป็น string ก่อนหากต้องการรองรับทั้งตัวเลขและสตริงที่มีจุดทศนิยม
    let numberString = number.toString(); // แปลงเป็น string โดยตรง

    // ตัด 0 ที่อยู่ด้านหน้าออก ยกเว้นกรณีที่เป็นตัวเลขหลังทศนิยม
    numberString = numberString.replace(/^0+/, '');

    // ถ้า number เป็น 0 หรือเป็นตัวเลขที่มี 0 ด้านหน้าหลังทศนิยม เช่น 0.45 ให้เหลือแค่ตัวเลขเดิม
    if (numberString === '' || numberString[0] === '.') {
        numberString = '0' + numberString;
    }

    // แยกแต่ละตัวเลขแล้วแปลงเป็นตัวอักษรเลขไทย
    const thaiNumeralsString = numberString.split('').map(digit => {
        if (digit === '.') {
            return '.'; // ถ้าเจอจุดทศนิยมให้คงค่าเดิม
        } else {
            return thaiNumerals[parseInt(digit)]; // แปลงตัวเลขเป็นตัวอักษรเลขไทย
        }
    }).join('');

    return thaiNumeralsString;
}

function fnFormatDateToThai(dateSQL) {
  const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const dateParts = dateSQL.split('-');
  const year = parseInt(dateParts[0]) + 543;
  const shortYear = year.toString().slice(-2);
  const month = thaiMonths[parseInt(dateParts[1]) - 1];
  const day = parseInt(dateParts[2]);

  return `${fnConvertToThaiNumeralsAndPoint(day)} / ${fnConvertMonthToShort(month)} / ${fnConvertToThaiNumeralsAndPoint(shortYear)}`;
}

function fnConvertToArabicNumerals(thaiNumber) {
  // Return empty string or null if the input is null or empty
  if (thaiNumber === null || thaiNumber === undefined) {
      return '';
  }
  
  if (typeof thaiNumber !== 'string') {
      // Handle non-string inputs if necessary
      throw new Error('Input must be a string');
  }
  
  // Handle empty string
  if (thaiNumber.trim() === '') {
      return '';
  }
  
  const arabicNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const thaiNumerals = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];

  return thaiNumber.split('').map(digit => arabicNumerals[thaiNumerals.indexOf(digit)] || digit).join('');
}

function fnConvertMonthToShort(month) {
    var monthShortName = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    var monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    var index = monthNames.indexOf(month);
    return index !== -1 ? monthShortName[index] : month;
}

function fnConvertThaiMonthName(monthNumber) { // convert 07 -> กรกฎาคม
  const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  // แปลง monthNumber เป็นเลขจำนวนเต็ม
  const monthIndex = parseInt(monthNumber, 10);

  if (monthIndex < 1 || monthIndex > 12) {
      return "เลขเดือนไม่ถูกต้อง";
  }

  return monthNames[monthIndex - 1];
}

function fnConvertMonthNumber(monthName) { // convert กรกฎาคม ->  07 
  const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const monthIndex = monthNames.indexOf(monthName);

  if (monthIndex === -1) {
      return "ชื่อเดือนไม่ถูกต้อง";
  }

  // เพิ่ม 1 เพราะดัชนีเริ่มต้นจาก 0 แต่เดือนเริ่มต้นจาก 1
  return (monthIndex + 1).toString().padStart(2, '0');
}


function fnGetParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function fnConvertToBuddhistYear(year) {
    return parseInt(year) + 543;
}

function fnCheckUserAuthen(authen) {
    /* start ส่วนของสิทธิผู้ใช้งาน */
    var valAccess = authen || ''
    var strAccess = ''
    var strName = ''
  
    if (valAccess)  {
        if (valAccess == 'admin') {
            strAccess = " หน่วยตรวจสอบ<span class='las la-chart-line'></span>"
            strName = "กรมจเรทหารเรือ"
        } else {
            strAccess = " หน่วยรับตรวจ<span class='las la-chart-line'></span>"
            strName = "กรมจเรทหารเรือ"
        }
        document.getElementById("textStatusUser").innerHTML = strAccess
        document.getElementById("textName").innerHTML = strName
        /* end ส่วนของสิทธิผู้ใช้งาน */
    }

}

// เพื่อตั้งค่า cookie
function fnSetCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}


function fnGetCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

function fnClearAllCookies() {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }
}

function fnExtractNumbersFromArray(input) {
    // ถ้า input เป็นสตริงธรรมดา
    if (typeof input === 'string') {
      var match = input.match(/\d+/);
      return match ? match[0] : '';
  }
  
  // ถ้า input เป็นอาร์เรย์
  if (Array.isArray(input)) {
      return input.map(item => {
          var match = item.match(/\d+/);
          return match ? match[0] : '';
      });
  }

  // ถ้า input ไม่ใช่สตริงหรืออาร์เรย์ คืนค่าเป็นค่าว่าง
  return '';
}

function fnRemoveUnderscoreAndNumbers(input) {
  // ถ้า input เป็นสตริงธรรมดา
  if (typeof input === 'string') {
      return input.replace(/[_\d]/g, '');
  }
  
  // ถ้า input เป็นอาร์เรย์
  if (Array.isArray(input)) {
      return input.map(item => item.replace(/[_\d]/g, ''));
  }

  // ถ้า input ไม่ใช่สตริงหรืออาร์เรย์ คืนค่าเป็นค่าว่าง
  return '';
}

function fnCheckFalsy(value) {
  if (!value || value === 'null' || value === 'undefined') {
    return '';
  } else {
    return value;
  }
}