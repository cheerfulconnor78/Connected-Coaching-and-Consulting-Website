<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "bangyan@connectedcoaching.jp";
    $from_real = "info@connectedcoaching.jp";
    $subject = "Contact Form Submission";

    // 1. Verify hCaptcha with your secret
    $hcat_response = $_POST['h-captcha-response'] ?? '';
    $hcat_secret = "ES_faef78012a494178a0d1312148959bf3";

    $post_data = [
        'secret' => $hcat_secret,
        'response' => $hcat_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($post_data)
        ]
    ];
    $context  = stream_context_create($options);
    $verify = file_get_contents("https://hcaptcha.com/siteverify", false, $context);
    $captcha_success = json_decode($verify);

    if (!$captcha_success || !$captcha_success->success) {
        echo 'CAPTCHA verification failed. Please try again.';
        exit;
    }

    // Sanitize and fetch the fields
    function field($key) {
        return isset($_POST[$key]) ? htmlspecialchars($_POST[$key]) : "";
    }
    $name = field("name");
    $email = field("email");
    $WXWA = field("WXWA");
    $available_time_1 = field("available_time_1");
    $available_time_2 = field("available_time_2");
    $available_time_3 = field("available_time_3");
    $message = field("message");
    $challenge = field("challenge");
    $hope = field("hope");
    $preferences = field("preferences");
    $remarks = field("remarks");
    $referral_source = field("referral_source");
    $outreach = isset($_POST["outreach"]) ? implode(", ", array_map('htmlspecialchars', $_POST["outreach"])) : "";
    $consent = isset($_POST["consent"]) ? "Yes" : "No";
    $emailme = isset($_POST["emailme"]);

    $body = 
        "Name: $name\n".
        "Email: $email\n".
        "WeChat/WhatsApp: $WXWA\n".
        "Available Time 1: $available_time_1\n".
        "Available Time 2: $available_time_2\n".
        "Available Time 3: $available_time_3\n".
        "Short Message: $message\n\n".
        "Biggest Challenge: $challenge\n".
        "Hopes: $hope\n".
        "Special Needs/Preferences: $preferences\n".
        "Remarks: $remarks\n".
        "Program Interest: $referral_source\n".
        "How did you learn about us: $outreach\n".
        "Consent Given: $consent\n";

    $headers = "From: $from_real\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    $mail1 = mail($to, $subject, $body, $headers, "-f$from_real");
    $mail2 = null;
    if ($emailme && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $user_subject = "Copy of your submission to Connected Coaching & Consulting";
        $user_body = "Dear $name,\n\nThank you for reaching out. Here is a copy of your form response:\n\n" . $body . "\n\nBest regards,\nConnected Coaching & Consulting";
        $user_headers = "From: $from_real\r\n";
        $user_headers .= "Reply-To: $to\r\n";
        $user_headers .= "Content-Type: text/plain; charset=utf-8\r\n";
        $mail2 = mail($email, $user_subject, $user_body, $user_headers, "-f$from_real");
    }

    // Output mail status to page, just like in your test script
    if ($mail1) {
        echo 'Mail send function returned TRUE. Check your inbox (and spam folder).';
    } else {
        echo 'Mail send function returned FALSE. The Sakura server failed to send mail.';
    }
} else {
    echo "Invalid request.";
}
?>