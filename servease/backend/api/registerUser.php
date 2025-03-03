<?php
include_once '../connection.php';

//Estos headers se usan para evitar problemas de CORS que es algo asi como para especificar el tipo de contenido que se envia(ahi busquenlo bien jaja)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['firebase_uid'], $data['nombre'], $data['email'], $data['telefono'], $data['tipo'])) {
    $firebase_id = $data['firebase_uid'];
    $name = $data['nombre'];
    $email = $data['email'];
    $phone = $data['telefono'];
    $userType = $data['tipo'];

    // Preparamos la consulta para evitar inyecciones SQL
    $query = $con->prepare("INSERT INTO usuarios (firebase_uid, nombre, email, telefono, rol) VALUES (?, ?, ?, ?, ?)");
    $query->bind_param("sssss", $firebase_id, $name, $email, $phone, $userType);

    $response = [];

    if ($query->execute()) {
        $response["ok"] = true;
        $response["message"] = "User registered successfully";
    } else {
        $response["ok"] = false;
        $response["message"] = "Error registering user: " . $query->error;
        error_log(print_r($data, true));  // Esto te permitirá ver qué parámetros se están recibiendo

    }

    $query->close();
    $con->close();

    echo json_encode($response);
} else {
    echo json_encode(["ok" => false, "message" => "Missing parameters"]);
    error_log(print_r($data, true));  // Esto te permitirá ver qué parámetros se están recibiendo

}
exit();
?>