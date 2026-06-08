<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable output buffering to prevent random PHP warnings/notices from corrupting JSON output
ob_start();

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

/**
 * Transliterates or decodes strings safely to standard ISO-8859-1 for FPDF.
 */
function safe_pdf_string($str) {
    if (empty($str)) return '';
    
    // Replace standard smart punctuation and dashes
    $str = str_replace(
        array("\xe2\x80\x98", "\xe2\x80\x99", "\xe2\x80\x9c", "\xe2\x80\x9d", "\xe2\x80\x93", "\xe2\x80\x94"),
        array("'", "'", '"', '"', '-', '-'),
        $str
    );
    
    if (function_exists('iconv')) {
        $converted = @iconv('UTF-8', 'windows-1252//TRANSLIT', $str);
        if ($converted !== false) {
            return $converted;
        }
    }
    return utf8_decode($str);
}

/**
 * Draw a standardized section header in the PDF
 */
function draw_section_header($pdf, $title, &$y, $lineWidth = 180) {
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->SetTextColor(204, 0, 0); // Primary red theme
    $pdf->SetXY(15, $y);
    $pdf->Cell(180, 6, safe_pdf_string($title), 0, 1, 'L');
    $y += 6;
    
    // Bottom border under title
    $pdf->SetDrawColor(226, 232, 240); // slate-200
    $pdf->SetLineWidth(0.4);
    $pdf->Line(15, $y, 15 + $lineWidth, $y);
    $y += 4;
}

/**
 * Generates a styled HTML-based Excel spreadsheet (.xls) containing all registered volunteers.
 * The newly registered volunteer is highlighted with a yellow background and a 'NEW MEMBER' badge.
 */
function generate_volunteers_excel($pdo, $newVolunteerId) {
    $stmt = $pdo->query("SELECT * FROM volunteers ORDER BY id DESC");
    $rows = $stmt->fetchAll();

    $html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    $html .= '<head><meta charset="UTF-8">';
    $html .= '<style>';
    $html .= 'table { border-collapse: collapse; width: 100%; }';
    $html .= 'th { background-color: #FF8C00; color: white; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; border: 0.5pt solid #cccccc; padding: 6px; text-align: left; }';
    $html .= 'td { font-family: Arial, sans-serif; font-size: 10pt; border: 0.5pt solid #cccccc; padding: 6px; }';
    $html .= '.new-member-row { background-color: #FFFF99; font-weight: bold; }';
    $html .= '.new-member-badge { background-color: #CC0000; color: white; font-weight: bold; padding: 2px 6px; border-radius: 4px; text-align: center; }';
    $html .= '</style>';
    $html .= '</head>';
    $html .= '<body>';
    $html .= '<h2>Registered Volunteers List</h2>';
    $html .= '<p>Generated on: ' . date('d-m-Y H:i:s') . '</p>';
    $html .= '<table>';
    $html .= '<thead>';
    $html .= '<tr>';
    $html .= '<th>Status</th>';
    $html .= '<th>ID</th>';
    $html .= '<th>Full Name</th>';
    $html .= '<th>Joining As</th>';
    $html .= '<th>Mobile</th>';
    $html .= '<th>Email</th>';
    $html .= '<th>Occupation</th>';
    $html .= '<th>Education</th>';
    $html .= '<th>Voter ID Number</th>';
    $html .= '<th>Aadhaar Number</th>';
    $html .= '<th>DOB / Age</th>';
    $html .= '<th>Gender</th>';
    $html .= '<th>District</th>';
    $html .= '<th>Pincode</th>';
    $html .= '<th>Registration Date</th>';
    $html .= '</tr>';
    $html .= '</thead>';
    $html .= '<tbody>';

    foreach ($rows as $row) {
        $isNew = ($row['id'] == $newVolunteerId);
        $rowClass = $isNew ? ' class="new-member-row"' : '';
        $statusVal = $isNew ? 'NEW MEMBER' : 'Active';

        $html .= '<tr' . $rowClass . '>';
        $html .= '<td>' . htmlspecialchars($statusVal) . '</td>';
        $html .= '<td>' . htmlspecialchars($row['id']) . '</td>';
        $html .= '<td>' . htmlspecialchars($row['full_name']) . '</td>';
        $html .= '<td>' . htmlspecialchars($row['joining_as']) . '</td>';
        // Force string type in Excel to avoid formatting numbers as scientific notation or dropping leading zeroes
        $html .= '<td style="vnd.ms-excel.numberformat:@">' . htmlspecialchars($row['mobile']) . '</td>';
        $html .= '<td>' . htmlspecialchars($row['email'] ? $row['email'] : 'N/A') . '</td>';
        $html .= '<td>' . htmlspecialchars($row['occupation'] ? $row['occupation'] : 'N/A') . '</td>';
        $html .= '<td>' . htmlspecialchars($row['education'] ? $row['education'] : 'N/A') . '</td>';
        $html .= '<td>' . htmlspecialchars($row['voter_id_number']) . '</td>';
        $html .= '<td style="vnd.ms-excel.numberformat:@">' . htmlspecialchars($row['aadhaar_number'] ? $row['aadhaar_number'] : 'N/A') . '</td>';
        $html .= '<td>' . htmlspecialchars($row['dob']) . '</td>';
        $html .= '<td>' . htmlspecialchars($row['gender']) . '</td>';
        $html .= '<td>' . htmlspecialchars($row['district']) . '</td>';
        $html .= '<td style="vnd.ms-excel.numberformat:@">' . htmlspecialchars($row['pincode']) . '</td>';
        $html .= '<td>' . htmlspecialchars($row['created_at']) . '</td>';
        $html .= '</tr>';
    }

    $html .= '</tbody>';
    $html .= '</table>';
    $html .= '</body>';
    $html .= '</html>';

    return $html;
}

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(403);
        echo json_encode(["status" => "error", "message" => "There was a problem with your submission, please try again."]);
        exit;
    }

    // Load local configuration if exists
    $configPath = __DIR__ . '/config.php';
    $config = file_exists($configPath) ? include($configPath) : [];

    // Database credentials configuration
    $dbHost = isset($config['DB_HOST']) ? $config['DB_HOST'] : (getenv('DB_HOST') ?: 'localhost');
    $dbName = isset($config['DB_NAME']) ? $config['DB_NAME'] : (getenv('DB_NAME') ?: 'u508480125_shashikiran');
    $dbUser = isset($config['DB_USER']) ? $config['DB_USER'] : (getenv('DB_USER') ?: 'u508480125_shashikiran');
    $dbPass = isset($config['DB_PASS']) ? $config['DB_PASS'] : (getenv('DB_PASS') ?: 'Inymart@Shield#58!');

    try {
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        // Auto-create volunteers table
        $pdo->exec("CREATE TABLE IF NOT EXISTS volunteers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            parent_name VARCHAR(255) NOT NULL,
            dob VARCHAR(50) NOT NULL,
            gender VARCHAR(50) NOT NULL,
            mobile VARCHAR(20) NOT NULL,
            email VARCHAR(255) DEFAULT '',
            occupation VARCHAR(255) DEFAULT '',
            education VARCHAR(255) DEFAULT '',
            current_address TEXT NOT NULL,
            permanent_address TEXT NOT NULL,
            district VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            pincode VARCHAR(20) NOT NULL,
            voter_id_number VARCHAR(100) NOT NULL,
            aadhaar_number VARCHAR(100) DEFAULT '',
            emergency_name VARCHAR(255) NOT NULL,
            emergency_relationship VARCHAR(100) NOT NULL,
            emergency_mobile VARCHAR(20) NOT NULL,
            joining_as VARCHAR(100) NOT NULL,
            area_of_interest VARCHAR(255) DEFAULT '',
            skills TEXT DEFAULT NULL,
            preferred_working_area VARCHAR(255) DEFAULT '',
            available_time VARCHAR(100) DEFAULT '',
            voter_id_proof_path VARCHAR(255) DEFAULT '',
            passport_photo_path VARCHAR(255) DEFAULT '',
            signature_path VARCHAR(255) DEFAULT '',
            pdf_path VARCHAR(255) DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");


        // Auto-create donations table
        $pdo->exec("CREATE TABLE IF NOT EXISTS donations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            donor_name VARCHAR(255) NOT NULL,
            donor_email VARCHAR(255) NOT NULL,
            donor_mobile VARCHAR(20) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            transaction_id VARCHAR(100) NOT NULL,
            payment_date VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    } catch (PDOException $dbEx) {
        throw new Exception("Database Connection/Initialization Failed: " . $dbEx->getMessage());
    }

    $formType = isset($_POST['formType']) ? $_POST['formType'] : 'contact';

    if ($formType === 'join_movement') {
        $newVolunteerId = 0;
        // Parse fields
        $fullName = isset($_POST['fullName']) ? strip_tags(trim($_POST['fullName'])) : '';
        $dob = isset($_POST['dob']) ? strip_tags(trim($_POST['dob'])) : '';
        $gender = isset($_POST['gender']) ? strip_tags(trim($_POST['gender'])) : '';
        $mobile = isset($_POST['mobile']) ? strip_tags(trim($_POST['mobile'])) : '';
        $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';

        $state = isset($_POST['state']) ? strip_tags(trim($_POST['state'])) : 'Tamil Nadu';
        $constituency = isset($_POST['constituency']) ? strip_tags(trim($_POST['constituency'])) : 'N/A';
        $district = $constituency; // District stores constituency

        // Other fields have default fallback values
        $parentName = 'N/A';
        $occupation = 'N/A';
        $education = 'N/A';
        $currentAddress = 'N/A';
        $permanentAddress = 'N/A';
        $pincode = '000000';
        $voterIdNumber = 'N/A';
        $aadhaarNumber = 'N/A';
        $emergencyName = 'N/A';
        $emergencyRelationship = 'N/A';
        $emergencyMobile = '0000000000';
        $joiningAs = 'Digital Member';
        $areaOfInterest = 'N/A';
        $skills = 'N/A';
        $preferredWorkingArea = $constituency;
        $availableTime = 'N/A';

        $validationErrors = [];

        // Required text fields check
        if (empty($fullName)) $validationErrors['fullName'] = "Full Name is required.";
        if (empty($dob)) $validationErrors['dob'] = "Date of Birth / Age is required.";
        if (empty($gender)) $validationErrors['gender'] = "Gender is required.";
        if (empty($constituency) || $constituency === 'N/A') $validationErrors['constituency'] = "Constituency is required.";

        
        if (empty($mobile)) {
            $validationErrors['mobile'] = "Mobile Number is required.";
        } else if (!preg_match('/^[0-9]{10}$/', $mobile)) {
            $validationErrors['mobile'] = "Mobile Number must be a valid 10-digit number.";
        }

        if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $validationErrors['email'] = "Please enter a valid email address.";
        }

        if (!empty($validationErrors)) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Please correct the errors highlighted in the form.",
                "errors" => $validationErrors
            ]);
            exit;
        }

        if (!class_exists('FPDF')) {
            throw new Exception("FPDF library is not loaded. Run composer install inside public directory.");
        }

        // Initialize uploads directory
        $uploadDir = __DIR__ . '/uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }


        // No uploaded files
        $voterIdProofPath = '';
        $passportPhotoPath = '';
        $signaturePath = '';

        // Initialize FPDF
        $pdf = new FPDF();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        
        // Charcoal top banner block
        $pdf->SetFillColor(34, 34, 34); // Slate 900
        $pdf->Rect(0, 0, 210, 35, 'F');
        
        // Orange accent stripe
        $pdf->SetFillColor(255, 140, 0); // Orange
        $pdf->Rect(0, 35, 210, 2, 'F');
        
        // Logo embedding
        if (file_exists('favicon.png')) {
            $pdf->Image('favicon.png', 15, 5, 25, 25);
            $pdf->SetXY(45, 8);
        } else {
            $pdf->SetXY(15, 8);
        }
        
        // Header Text
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(120, 8, safe_pdf_string('SHASHIKIRAN KN'), 0, 1, 'L');
        
        if (file_exists('favicon.png')) {
            $pdf->SetXY(45, 17);
        } else {
            $pdf->SetXY(15, 17);
        }
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetTextColor(255, 140, 0);
        $pdf->Cell(120, 6, safe_pdf_string('TAMILNADU 2026 - MEMBERSHIP REGISTRATION RECORD'), 0, 1, 'L');
        
        $currentY = 50;
        
        // SECTION 1: Member Registration Details
        draw_section_header($pdf, 'Membership Registration Record', $currentY, 180);
        
        $fields = [
            'Full Name' => $fullName,
            'Mobile Number' => $mobile,
            'Email Address' => $email ? $email : 'N/A',
            'Date of Birth' => $dob,
            'Gender' => $gender,
            'State' => $state,
            'Assembly Constituency' => $constituency,
            'Role' => $joiningAs,
            'Registration Date' => date('d-m-Y H:i:s')
        ];

        foreach ($fields as $label => $value) {
            $pdf->SetXY(15, $currentY);
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->SetTextColor(70, 70, 70);
            $pdf->Cell(50, 8, safe_pdf_string($label) . ':', 0, 0);
            $pdf->SetFont('Arial', '', 10);
            $pdf->SetTextColor(30, 30, 30);
            $pdf->Cell(130, 8, safe_pdf_string($value), 0, 1);
            $currentY += 8;
        }
        
        $currentY += 10;

        // SECTION 2: Declaration
        draw_section_header($pdf, 'Declaration & Guidelines', $currentY, 180);
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'I', 9.5);
        $pdf->SetTextColor(80, 80, 80);
        $pdf->MultiCell(180, 6, safe_pdf_string('Declaration: I hereby voluntarily join the movement and confirm that all details provided are correct. I will support the organization and its campaigns to build a modern, digital, and dharma-driven Srirangam.'), 0, 'L');
        $currentY = $pdf->GetY() + 15;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(90, 5, 'Date: ' . date('d-m-Y'), 0, 0, 'L');
        
        $pdf->Line(130, $currentY, 185, $currentY);
        $pdf->SetXY(130, $currentY + 1);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(55, 4, 'Signature of Member', 0, 0, 'C');
        
        // Red bottom bar
        $pdf->SetFillColor(204, 0, 0);
        $pdf->Rect(0, 292, 210, 5, 'F');
        
        $pdfDoc = $pdf->Output('S');
        
        // Save PDF report file on server
        $pdfFilename = uniqid('reg_') . '.pdf';
        file_put_contents($uploadDir . $pdfFilename, $pdfDoc);
        $pdfPath = 'uploads/' . $pdfFilename;

        // DB SQL INSERT (Using Parameterized SQL prepared statement)
        $stmt = $pdo->prepare("INSERT INTO volunteers (
            full_name, parent_name, dob, gender, mobile, email, occupation, education,
            current_address, permanent_address, district, state, pincode,
            voter_id_number, aadhaar_number, emergency_name, emergency_relationship, emergency_mobile,
            joining_as, area_of_interest, skills, preferred_working_area, available_time,
            voter_id_proof_path, passport_photo_path, signature_path, pdf_path
        ) VALUES (
            :full_name, :parent_name, :dob, :gender, :mobile, :email, :occupation, :education,
            :current_address, :permanent_address, :district, :state, :pincode,
            :voter_id_number, :aadhaar_number, :emergency_name, :emergency_relationship, :emergency_mobile,
            :joining_as, :area_of_interest, :skills, :preferred_working_area, :available_time,
            :voter_id_proof_path, :passport_photo_path, :signature_path, :pdf_path
        )");

        $stmt->execute([
            ':full_name' => $fullName,
            ':parent_name' => $parentName,
            ':dob' => $dob,
            ':gender' => $gender,
            ':mobile' => $mobile,
            ':email' => $email,
            ':occupation' => $occupation,
            ':education' => $education,
            ':current_address' => $currentAddress,
            ':permanent_address' => $permanentAddress,
            ':district' => $district,
            ':state' => $state,
            ':pincode' => $pincode,
            ':voter_id_number' => $voterIdNumber,
            ':aadhaar_number' => $aadhaarNumber,
            ':emergency_name' => $emergencyName,
            ':emergency_relationship' => $emergencyRelationship,
            ':emergency_mobile' => $emergencyMobile,
            ':joining_as' => $joiningAs,
            ':area_of_interest' => $areaOfInterest,
            ':skills' => $skills,
            ':preferred_working_area' => $preferredWorkingArea,
            ':available_time' => $availableTime,
            ':voter_id_proof_path' => $voterIdProofPath,
            ':passport_photo_path' => $passportPhotoPath,
            ':signature_path' => $signaturePath,
            ':pdf_path' => $pdfPath
        ]);
        
        $newVolunteerId = $pdo->lastInsertId();
        
        $emailSubject = "New Member Joined: $fullName ($constituency)";
        $emailBody = "A new member has joined the movement through the website.\n\n" . 
                     "All registration details have been securely saved to the database.\n\n" .
                     "Please find the attached registration details PDF for verification.\n\n" . 
                     "Member Name: $fullName\n" . 
                     "Mobile Number: $mobile\n" . 
                     "Email: " . ($email ? $email : 'N/A') . "\n" .
                     "State: $state\n" .
                     "Constituency: $constituency\n";

    } else if ($formType === 'record_donation') {
        // Record payment form parameters
        $donorName = isset($_POST['donorName']) ? strip_tags(trim($_POST['donorName'])) : '';
        $donorEmail = isset($_POST['donorEmail']) ? filter_var(trim($_POST['donorEmail']), FILTER_SANITIZE_EMAIL) : '';
        $donorMobile = isset($_POST['donorMobile']) ? strip_tags(trim($_POST['donorMobile'])) : '';
        $amount = isset($_POST['amount']) ? floatval($_POST['amount']) : 0.0;
        $transactionId = isset($_POST['transactionId']) ? strip_tags(trim($_POST['transactionId'])) : '';
        $paymentDate = isset($_POST['paymentDate']) ? strip_tags(trim($_POST['paymentDate'])) : date('Y-m-d');

        if (empty($donorName) || empty($donorMobile) || empty($transactionId) || $amount <= 0) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Please fill in all mandatory donation fields (Name, Mobile, Amount, Transaction ID)."]);
            exit;
        }

        // Insert into donations table
        $stmt = $pdo->prepare("INSERT INTO donations (
            donor_name, donor_email, donor_mobile, amount, transaction_id, payment_date
        ) VALUES (
            :donor_name, :donor_email, :donor_mobile, :amount, :transaction_id, :payment_date
        )");

        $stmt->execute([
            ':donor_name' => $donorName,
            ':donor_email' => $donorEmail,
            ':donor_mobile' => $donorMobile,
            ':amount' => $amount,
            ':transaction_id' => $transactionId,
            ':payment_date' => $paymentDate
        ]);

        $emailSubject = "New Donation Recorded: INR $amount by $donorName";
        $emailBody = "A new campaign contribution has been recorded on the website and saved to the database.\n\n" .
                     "Donor Details:\n" .
                     "Name: $donorName\n" .
                     "Email: " . ($donorEmail ? $donorEmail : 'N/A') . "\n" .
                     "Mobile: $donorMobile\n" .
                     "Amount: INR " . number_format($amount, 2) . "\n" .
                     "UPI Transaction Reference ID: $transactionId\n" .
                     "Payment Date: $paymentDate\n\n" .
                     "Please cross-verify this Ref ID in your bank statement/UPI app to confirm receipt.";

    } else {
        // Standard Contact Form
        $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
        $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
        $subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
        $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

        if (empty($name) || empty($email) || empty($message)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Please fill out all required fields."]);
            exit;
        }
        
        $emailSubject = 'New Contact Form Submission: ' . $subject;
        $emailBody = "Name: $name\nEmail: $email\n\nSubject: $subject\n\nMessage:\n$message";
    }

    $mail = new PHPMailer(true);
    
    // Load config if not already loaded
    if (!isset($config)) {
        $configPath = __DIR__ . '/config.php';
        $config = file_exists($configPath) ? include($configPath) : [];
    }

    $smtpHost = isset($config['SMTP_HOST']) ? $config['SMTP_HOST'] : (getenv('SMTP_HOST') ?: 'smtp.gmail.com');
    $smtpUser = isset($config['SMTP_USER']) ? $config['SMTP_USER'] : (getenv('SMTP_USER') ?: 'inymartlabs@gmail.com');
    $smtpPass = isset($config['SMTP_PASS']) ? $config['SMTP_PASS'] : (getenv('SMTP_PASS') ?: 'ombt pjxo ccve afhq');
    $smtpPort = isset($config['SMTP_PORT']) ? (int)$config['SMTP_PORT'] : (getenv('SMTP_PORT') ? (int)getenv('SMTP_PORT') : 587);
    $smtpSecureStr = isset($config['SMTP_SECURE']) ? $config['SMTP_SECURE'] : (getenv('SMTP_SECURE') ?: 'tls');
    
    $mailFromEmail = isset($config['MAIL_FROM_EMAIL']) ? $config['MAIL_FROM_EMAIL'] : (getenv('MAIL_FROM_EMAIL') ?: $smtpUser);
    $mailToEmail = isset($config['MAIL_TO_EMAIL']) ? $config['MAIL_TO_EMAIL'] : (getenv('MAIL_TO_EMAIL') ?: 'nsptn2031@gmail.com');

    // Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output (0 = off)
    $mail->isSMTP();                           // Send using SMTP
    $mail->Host       = $smtpHost;             // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                  // Enable SMTP authentication
    $mail->Username   = $smtpUser;             // SMTP username
    $mail->Password   = $smtpPass;             // SMTP password
    
    if (strtolower($smtpSecureStr) === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }
    $mail->Port       = $smtpPort;             // TCP port to connect to
    
    // Disable peer verification if local server environment doesn't have updated CA certs
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    // Recipients
    $mail->setFrom($mailFromEmail, ($formType === 'join_movement' ? $fullName : ($formType === 'record_donation' ? $donorName : $name)));
    $mail->addAddress($mailToEmail, 'Website Notification'); // Recipient
    $mail->addReplyTo(
        ($formType === 'join_movement' ? ($email ? $email : $mailToEmail) : ($formType === 'record_donation' ? ($donorEmail ? $donorEmail : $mailToEmail) : $email)),
        ($formType === 'join_movement' ? $fullName : ($formType === 'record_donation' ? $donorName : $name))
    );

    // Attach PDF & Uploaded files if join_movement
    if ($formType === 'join_movement') {
        // Attach generated PDF
        $safePdfName = str_replace(' ', '_', $fullName) . "_Registration.pdf";
        $mail->addStringAttachment($pdfDoc, $safePdfName, 'base64', 'application/pdf');
        
        // Generate and attach Excel list of all volunteers with new member highlighted
        try {
            $excelData = generate_volunteers_excel($pdo, $newVolunteerId);
            $mail->addStringAttachment($excelData, 'All_Registered_Volunteers.xls', 'base64', 'application/vnd.ms-excel');
        } catch (Exception $excelEx) {
            error_log("Failed to generate/attach Excel sheet: " . $excelEx->getMessage());
        }
        
        // Attach files if they are uploaded (using relocated folder files)
        if (!empty($voterIdProofPath) && file_exists($uploadDir . basename($voterIdProofPath))) {
            $mail->addAttachment($uploadDir . basename($voterIdProofPath), $_FILES['voterIdProof']['name']);
        }
        if (!empty($passportPhotoPath) && file_exists($uploadDir . basename($passportPhotoPath))) {
            $mail->addAttachment($uploadDir . basename($passportPhotoPath), $_FILES['passportPhoto']['name']);
        }
        if (!empty($signaturePath) && file_exists($uploadDir . basename($signaturePath))) {
            $mail->addAttachment($uploadDir . basename($signaturePath), $_FILES['signature']['name']);
        }
    }

    // Content
    $mail->isHTML(false);
    $mail->Subject = $emailSubject;
    $mail->Body    = $emailBody;

    $mail->send();
    
    // Clear buffer and send successful response
    ob_end_clean();
    http_response_code(200);
    $formattedMemberId = isset($newVolunteerId) && $newVolunteerId > 0
        ? 'NSP-' . str_pad($newVolunteerId, 6, '0', STR_PAD_LEFT)
        : null;
    $responsePayload = ["status" => "success", "message" => "Thank You! Your submission has been processed and saved successfully."];
    if ($formattedMemberId) {
        $responsePayload["member_id"] = $formattedMemberId;
    }
    echo json_encode($responsePayload);

} catch (Exception $e) {
    ob_end_clean();
    $mailerError = isset($mail) ? $mail->ErrorInfo : 'Mailer not initialized';
    http_response_code(500);
    echo json_encode([
        "status" => "error", 
        "message" => "Submission could not be completed. Mailer Error: {$mailerError}. Exception: {$e->getMessage()}"
    ]);
} catch (Throwable $t) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "A server runtime error occurred. Details: {$t->getMessage()} in {$t->getFile()} on line {$t->getLine()}"
    ]);
}
?>
