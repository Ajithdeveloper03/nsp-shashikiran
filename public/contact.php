<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader (adjust the path if necessary for your server)
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill out all required fields."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;                      // Enable verbose debug output (0 = off)
        $mail->isSMTP();                           // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';      // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                  // Enable SMTP authentication
        $mail->Username   = 'inymart@gmail.com';// SMTP username
        $mail->Password   = 'uzwrizowxqouqefe';   // SMTP password (app password if using Gmail)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
        $mail->Port       = 587;                   // TCP port to connect to
        
        // Note: As per your previous context, we'll keep the basic setup, you should uncomment 
        // and configure the SMTP settings above to use authenticated SMTP properly.
        
        // Fallback to PHP mail() function internally if SMTP isn't explicitly configured above
        // Remove this if you configure SMTP above.
        
        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('inymart@gmail.com', 'InyMart Contact'); // Add a recipient
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(false); // Set email format to HTML or plain text
        $mail->Subject = 'New Contact Form Submission: ' . $subject;
        $mail->Body    = "Name: $name\nEmail: $email\n\nSubject: $subject\n\nMessage:\n$message";

        $mail->send();
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Thank You! Your message has been sent."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "There was a problem with your submission, please try again."]);
}
?>
