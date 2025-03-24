<?php
include_once '../connection.php';
Include_once '../cors.php';



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['firebase_uid'], $data['nombre'],$data['apellido'] ,$data['email'], $data['telefono'], $data['tipo'])) {
    //!QUITAR TELEFONO
    //?AGREGAR APELLIDO
    
    $con = connectdb();

    $firebase_id = $data['firebase_uid'];
    $name = $data['nombre'];
    $surname = $data['apellido'];
    $email = $data['email'];
    $userType = $data['tipo'];

    // Preparamos la consulta para evitar inyecciones SQL
    $query = $con->prepare("INSERT INTO usuarios (firebase_uid, nombre,apellido ,email, telefono, rol) VALUES (?, ?, ?, ?, ?)");
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