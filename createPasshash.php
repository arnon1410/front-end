<?php
$password = '123456789';
$passwordHash = password_hash($password, PASSWORD_DEFAULT);
echo $passwordHash;
?>