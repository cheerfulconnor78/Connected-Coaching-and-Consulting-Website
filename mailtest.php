<?php
$to = 'bangyan@connectedcoaching.jp'; // <-- Replace with your email address
$subject = 'Test from Sakura PHP mail()';
$message = 'This is a test mail from your Sakura server.';
$headers = 'From: info@connectedcoaching.jp'; // <-- Use a valid address set up in Sakura panel

$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo 'Mail send function returned TRUE. Check your inbox (and spam folder).';
} else {
    echo 'Mail send function returned FALSE. The Sakura server failed to send mail.';
}
?>