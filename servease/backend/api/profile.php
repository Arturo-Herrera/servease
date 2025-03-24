<?php
include_once '../connection.php';
Include_once '../cors.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['nombre'], $data['apellido'], $data['email'], $data['tipo'], $data['foto_perfil'])) {
    //!QUITAR TELEFONO
    //?AGREGAR APELLIDO
    
    $con = connectdb();

    $name = $data['nombre'];
    $surname = $data['apellido'];
    $email = $data['email'];
    $userType = $data['tipo'];
    $profilePic = $data['foto_perfil'];

    // Se evaluara por el id de firebase o por el del usuario?
    $query = $con->prepare("UPDATE InsertUsuario SET nombre = ?,  apellido = ?, email = ?, tipo = ?, foto_perfil = ? WHERE firebase_uid = ?");
    $query->bind_param("ssssss", $name, $email, $phone, $userType, $profilePic, $firebase_id);

    $response = [];

    if ($query->execute()) {
        $response["ok"] = true;
        $response["message"] = "User updated successfully";
    } else {
        $response["ok"] = false;
        $response["message"] = "Error updating user: " . $query->error;
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
