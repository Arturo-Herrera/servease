<?php
include_once '../connection.php';
Include_once '../cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['nombre'], $data['descripcion'])) {
    
    $con = connectdb();

    $firebase_id = $data['firebase_uid'];
    $name = $data['nombre'];
    $description = $data['descripcion'];

    // Preparamos la consulta para evitar inyecciones SQL
    $query = $con->prepare("INSERT INTO InsertarCategoria (nombre,descripcion) VALUES (?, ?)");
    $query->bind_param("ss", $name, $description);

    $response = [];

    if ($query->execute()) {
        $response["ok"] = true;
        $response["message"] = "Category registered successfully";
    } else {
        $response["ok"] = false;
        $response["message"] = "Error registering Category: " . $query->error;
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