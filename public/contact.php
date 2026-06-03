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
function draw_section_header($pdf, $title, &$y) {
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->SetTextColor(204, 0, 0); // Primary red theme
    $pdf->SetXY(15, $y);
    $pdf->Cell(180, 6, safe_pdf_string($title), 0, 1, 'L');
    $y += 6;
    
    // Bottom border under title
    $pdf->SetDrawColor(226, 232, 240); // slate-200
    $pdf->SetLineWidth(0.4);
    $pdf->Line(15, $y, 195, $y);
    $y += 4;
}

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(403);
        echo json_encode(["status" => "error", "message" => "There was a problem with your submission, please try again."]);
        exit;
    }

    // Database credentials configuration
    $dbHost = 'localhost';
    $dbName = 'u508480125_shashikiran';
    $dbUser = 'u508480125_shashikiran';
    $dbPass = 'Inymart@Shield#58!';

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
        // Parse fields
        $fullName = isset($_POST['fullName']) ? strip_tags(trim($_POST['fullName'])) : '';
        $parentName = isset($_POST['parentName']) ? strip_tags(trim($_POST['parentName'])) : '';
        $dob = isset($_POST['dob']) ? strip_tags(trim($_POST['dob'])) : '';
        $gender = isset($_POST['gender']) ? strip_tags(trim($_POST['gender'])) : '';
        $mobile = isset($_POST['mobile']) ? strip_tags(trim($_POST['mobile'])) : '';
        $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
        $occupation = isset($_POST['occupation']) ? strip_tags(trim($_POST['occupation'])) : '';
        $education = isset($_POST['education']) ? strip_tags(trim($_POST['education'])) : '';
        
        $currentAddress = isset($_POST['currentAddress']) ? strip_tags(trim($_POST['currentAddress'])) : '';
        $permanentAddress = isset($_POST['permanentAddress']) ? strip_tags(trim($_POST['permanentAddress'])) : '';
        $district = isset($_POST['district']) ? strip_tags(trim($_POST['district'])) : '';
        $state = isset($_POST['state']) ? strip_tags(trim($_POST['state'])) : 'Tamil Nadu';
        $pincode = isset($_POST['pincode']) ? strip_tags(trim($_POST['pincode'])) : '';
        
        $voterIdNumber = isset($_POST['voterIdNumber']) ? strip_tags(trim($_POST['voterIdNumber'])) : '';
        $aadhaarNumber = isset($_POST['aadhaarNumber']) ? strip_tags(trim($_POST['aadhaarNumber'])) : '';
        
        $emergencyName = isset($_POST['emergencyName']) ? strip_tags(trim($_POST['emergencyName'])) : '';
        $emergencyRelationship = isset($_POST['emergencyRelationship']) ? strip_tags(trim($_POST['emergencyRelationship'])) : '';
        $emergencyMobile = isset($_POST['emergencyMobile']) ? strip_tags(trim($_POST['emergencyMobile'])) : '';
        
        $joiningAs = isset($_POST['joiningAs']) ? strip_tags(trim($_POST['joiningAs'])) : 'Volunteer';
        $areaOfInterest = isset($_POST['areaOfInterest']) ? strip_tags(trim($_POST['areaOfInterest'])) : '';
        $skills = isset($_POST['skills']) ? strip_tags(trim($_POST['skills'])) : '';
        $preferredWorkingArea = isset($_POST['preferredWorkingArea']) ? strip_tags(trim($_POST['preferredWorkingArea'])) : '';
        $availableTime = isset($_POST['availableTime']) ? strip_tags(trim($_POST['availableTime'])) : '';

        if (empty($fullName) || empty($mobile) || empty($voterIdNumber)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Please fill in all mandatory fields (Name, Mobile, Voter ID)."]);
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

        // Save Uploaded Files First (so we can render the permanent paths inside FPDF if needed)
        $voterIdProofPath = '';
        if (isset($_FILES['voterIdProof']) && $_FILES['voterIdProof']['error'] == UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES['voterIdProof']['name'], PATHINFO_EXTENSION);
            $filename = uniqid('voter_') . '.' . $ext;
            if (move_uploaded_file($_FILES['voterIdProof']['tmp_name'], $uploadDir . $filename)) {
                $voterIdProofPath = 'uploads/' . $filename;
            }
        }

        $passportPhotoPath = '';
        if (isset($_FILES['passportPhoto']) && $_FILES['passportPhoto']['error'] == UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES['passportPhoto']['name'], PATHINFO_EXTENSION);
            $filename = uniqid('photo_') . '.' . $ext;
            if (move_uploaded_file($_FILES['passportPhoto']['tmp_name'], $uploadDir . $filename)) {
                $passportPhotoPath = 'uploads/' . $filename;
            }
        }

        $signaturePath = '';
        if (isset($_FILES['signature']) && $_FILES['signature']['error'] == UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES['signature']['name'], PATHINFO_EXTENSION);
            $filename = uniqid('sig_') . '.' . $ext;
            if (move_uploaded_file($_FILES['signature']['tmp_name'], $uploadDir . $filename)) {
                $signaturePath = 'uploads/' . $filename;
            }
        }

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
        $pdf->Cell(120, 6, safe_pdf_string('SRIRANGAM 2026 - VOLUNTEER REGISTRATION RECORD'), 0, 1, 'L');
        
        // Passport Photo Frame (Top Right alignment using moved file path)
        if (!empty($passportPhotoPath) && file_exists($uploadDir . basename($passportPhotoPath))) {
            $pdf->Image($uploadDir . basename($passportPhotoPath), 155, 45, 38, 46);
            $pdf->SetDrawColor(226, 232, 240);
            $pdf->Rect(155, 45, 38, 46, 'D');
        } else {
            $pdf->SetDrawColor(200, 200, 200);
            $pdf->Rect(155, 45, 38, 46, 'D');
            $pdf->SetXY(155, 65);
            $pdf->SetFont('Arial', 'I', 7);
            $pdf->Cell(38, 6, '[ Photo Placeholder ]', 0, 0, 'C');
        }
        
        $currentY = 45;
        
        // SECTION 1: Personal Information
        draw_section_header($pdf, '1. Personal Information', $currentY);
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Full Name') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(95, 6, safe_pdf_string($fullName), 0, 1);
        $currentY += 6;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Parent/Spouse Name') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(95, 6, safe_pdf_string($parentName ? $parentName : 'N/A'), 0, 1);
        $currentY += 6;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('DOB / Age') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(35, 6, safe_pdf_string($dob), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(20, 6, safe_pdf_string('Gender') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(40, 6, safe_pdf_string($gender), 0, 1);
        $currentY += 6;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Mobile') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(35, 6, safe_pdf_string($mobile), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(20, 6, safe_pdf_string('Email') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(40, 6, safe_pdf_string($email ? $email : 'N/A'), 0, 1);
        $currentY += 6;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Occupation') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(35, 6, safe_pdf_string($occupation ? $occupation : 'N/A'), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(20, 6, safe_pdf_string('Education') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(40, 6, safe_pdf_string($education ? $education : 'N/A'), 0, 1);
        $currentY += 10;
        
        // SECTION 2: Address details
        $currentY = max($currentY, 96); // Keep clean separation from top layout
        draw_section_header($pdf, '2. Address Details', $currentY);
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Current Address') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->MultiCell(145, 6, safe_pdf_string($currentAddress), 0, 'L');
        $currentY = $pdf->GetY();
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Permanent Address') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->MultiCell(145, 6, safe_pdf_string($permanentAddress), 0, 'L');
        $currentY = $pdf->GetY();
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('District') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(45, 6, safe_pdf_string($district), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(15, 6, safe_pdf_string('State') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(35, 6, safe_pdf_string($state), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(20, 6, safe_pdf_string('Pincode') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(30, 6, safe_pdf_string($pincode), 0, 1);
        $currentY += 8;
        
        // SECTION 3: Identity & Emergency Contact details
        draw_section_header($pdf, '3. Identity & Emergency Details', $currentY);
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Voter ID Number') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(45, 6, safe_pdf_string($voterIdNumber), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Aadhaar Number') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(65, 6, safe_pdf_string($aadhaarNumber ? $aadhaarNumber : 'N/A'), 0, 1);
        $currentY += 6;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Emergency Contact') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(45, 6, safe_pdf_string($emergencyName), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(20, 6, safe_pdf_string('Relation') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(25, 6, safe_pdf_string($emergencyRelationship), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(20, 6, safe_pdf_string('Mobile') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(35, 6, safe_pdf_string($emergencyMobile), 0, 1);
        $currentY += 8;
        
        // SECTION 4: Role & Joining Details
        draw_section_header($pdf, '4. Role & Preferences Details', $currentY);
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Joining As') . ':', 0, 0);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetTextColor(204, 0, 0);
        $pdf->Cell(145, 6, safe_pdf_string($joiningAs), 0, 1);
        $pdf->SetTextColor(30, 30, 30);
        $currentY += 6;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Area of Interest') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(145, 6, safe_pdf_string($areaOfInterest ? $areaOfInterest : 'N/A'), 0, 1);
        $currentY += 6;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Skills / Experience') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->MultiCell(145, 6, safe_pdf_string($skills ? $skills : 'N/A'), 0, 'L');
        $currentY = $pdf->GetY();
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(35, 6, safe_pdf_string('Preferred Work Area') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(45, 6, safe_pdf_string($preferredWorkingArea ? $preferredWorkingArea : 'N/A'), 0, 0);
        
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->SetTextColor(70, 70, 70);
        $pdf->Cell(30, 6, safe_pdf_string('Available Time') . ':', 0, 0);
        $pdf->SetFont('Arial', '', 9);
        $pdf->SetTextColor(30, 30, 30);
        $pdf->Cell(70, 6, safe_pdf_string($availableTime ? $availableTime : 'N/A'), 0, 1);
        $currentY += 8;
        
        // SECTION 5: Declaration & Signature
        draw_section_header($pdf, '5. Declaration & Signature', $currentY);
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'I', 8.5);
        $pdf->MultiCell(180, 4.5, safe_pdf_string('Declaration: I hereby voluntarily join/support the organization and confirm that all submitted details are genuine and correct. I will adhere to the rules and guidelines of the movement.'), 0, 'L');
        $currentY = $pdf->GetY() + 8;
        
        $pdf->SetXY(15, $currentY);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(80, 5, 'Date: ' . date('d-m-Y'), 0, 0, 'L');
        
        // Embed signature if uploaded (from permanent uploads/ path)
        if (!empty($signaturePath) && file_exists($uploadDir . basename($signaturePath))) {
            $pdf->Image($uploadDir . basename($signaturePath), 140, $currentY - 10, 45, 10);
        }
        
        $pdf->Line(140, $currentY, 185, $currentY);
        $pdf->SetXY(140, $currentY + 1);
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->Cell(45, 4, 'Signature of Applicant', 0, 0, 'C');
        
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
        
        $emailSubject = "Join Movement Form: $fullName ($joiningAs)";
        $emailBody = "A new volunteer has registered through the Srirangam 2026 website.\n\n" . 
                     "All registration details and uploaded proofs have been securely saved to the database.\n\n" .
                     "Please find the attached registration details PDF and raw uploaded files for verification.\n\n" . 
                     "Volunteer Name: $fullName\n" . 
                     "Mobile Number: $mobile\n" . 
                     "Email: " . ($email ? $email : 'N/A') . "\n" .
                     "Role Selected: $joiningAs\n";

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
    
    // Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output (0 = off)
    $mail->isSMTP();                           // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';      // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                  // Enable SMTP authentication
    $mail->Username   = 'inymartlabs@gmail.com';   // SMTP username
    $mail->Password   = 'ombt pjxo ccve afhq';    // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
    $mail->Port       = 587;                   // TCP port to connect to
    
    // Disable peer verification if local server environment doesn't have updated CA certs
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    // Recipients
    $mail->setFrom('inymartlabs@gmail.com', ($formType === 'join_movement' ? $fullName : ($formType === 'record_donation' ? $donorName : $name)));
    $mail->addAddress('nsptn2031@gmail.com', 'Website Notification'); // Recipient
    $mail->addReplyTo(
        ($formType === 'join_movement' ? ($email ? $email : 'nsptn2031@gmail.com') : ($formType === 'record_donation' ? ($donorEmail ? $donorEmail : 'nsptn2031@gmail.com') : $email)),
        ($formType === 'join_movement' ? $fullName : ($formType === 'record_donation' ? $donorName : $name))
    );

    // Attach PDF & Uploaded files if join_movement
    if ($formType === 'join_movement') {
        // Attach generated PDF
        $safePdfName = str_replace(' ', '_', $fullName) . "_Registration.pdf";
        $mail->addStringAttachment($pdfDoc, $safePdfName, 'base64', 'application/pdf');
        
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
    echo json_encode(["status" => "success", "message" => "Thank You! Your submission has been processed and saved successfully."]);

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
