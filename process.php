<?php
if (isset($_POST['data'])) {
    $data = $_POST['data'];
    echo $data;
    // callMyFunction($data);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data received.']);
}

function callMyFunction($data) {
    // สมมติว่าเกิดข้อผิดพลาดบางอย่าง
    $error = false; // เปลี่ยนเป็น true เพื่อจำลองข้อผิดพลาด

    if ($error) {
        echo json_encode(['status' => 'error', 'message' => 'An error occurred while calling the function.']);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'PHP function has been called successfully with data: ' . $data]);
    }
}
?>
