<?php

$conn = new mysqli("localhost","sparshSolarCRM","*n&&C1jkZ7K0","sparsh_enterprises_solar_crm");

// $conn = new mysqli("localhost","root","","solar_crm");

if($conn->connect_error){
    die("Database connection failed");
}

?>