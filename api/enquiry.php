<?php
require_once '../config/conn.php';

header('Content-Type: application/json');

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$enquiry_id = "ENQ-".time();

$full_name = $data['fullName'] ?? null;
$email = $data['email'] ?? null;
$whatsapp = $data['whatsapp'] ?? null;
$monthly_bill = $data['monthlyBill'] ?? null;
$city = $data['city'] ?? null;
$pincode = $data['pincode'] ?? null;
$planning_after_years = $data['planningAfterYears'] ?? null;

// Optional fields
$roof_area = !empty($data['roofArea']) ? $data['roofArea'] : null;
$system_type = !empty($data['systemType']) ? $data['systemType'] : null;
$message = !empty($data['message']) ? $data['message'] : null;


// Check duplicate whatsapp
$check = $conn->prepare("SELECT id FROM enquiries WHERE whatsapp = ?");
$check->bind_param("s", $whatsapp);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {

    echo json_encode([
        "status" => false,
        "message" => "Thank you! An enquiry with this WhatsApp number already exists. Our team will contact you soon."
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO enquiries 
(enquiry_id,full_name,email,whatsapp,monthly_bill,city,pincode,roof_area,system_type,message,planning_after_years)
VALUES(?,?,?,?,?,?,?,?,?,?,?)");

$stmt->bind_param(
    "sssssssissi",
    $enquiry_id,
    $full_name,
    $email,
    $whatsapp,
    $monthly_bill,
    $city,
    $pincode,
    $roof_area,
    $system_type,
    $message,
    $planning_after_years
);

if ($stmt->execute()) {

    echo json_encode([
        "status" => true,
        "message" => "Thank you! Your enquiry has been submitted successfully. We will contact you within 24 hours.",
        "enquiry_id" => $enquiry_id
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Database error"
    ]);
}

?>