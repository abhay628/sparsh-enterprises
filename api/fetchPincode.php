<?php
header('Content-Type: application/json');

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$pincode = $data['pincode'] ?? null;

// Validate input
if (!$pincode) {
    echo json_encode([
        "status" => false,
        "message" => "Pincode is required."
    ]);
    exit;
}

// Call external API
$response = file_get_contents("http://postalpincode.in/api/pincode/" . $pincode);

if (!$response) {
    echo json_encode([
        "status" => false,
        "message" => "Unable to fetch pincode details."
    ]);
    exit;
}

$data = json_decode($response);

if (isset($data->PostOffice[0])) {

    $city = $data->PostOffice[0]->Taluk ?? null;
    $state = $data->PostOffice[0]->State ?? null;

    echo json_encode([
        "status" => true,
        "message" => "Pincode details found.",
        "city" => $city,
        "state" => $state
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Please enter a valid pincode."
    ]);
}
?>