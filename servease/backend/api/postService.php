<!-- //Donde se crea el post  InsertarServicio -->
<?php
include_once '../connection.php';
Include_once '../cors.php';



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['titulo'], $data['descripcion'],$data['latitud'] ,$data['longitud'], $data['fecha_limite'], $data['cliente_id'], $data['categoria_id'])) {
    //!QUITAR TELEFONO
    //?AGREGAR APELLIDO
    
    $con = connectdb();

    $title = $data['titulo'];
    $description = $data['descripcion'];
    $latitud = $data['latitud'];
    $longitud = $data['longitud'];
    $date = $data['fecha_limite'];
    $client_id = $data['cliente_id'];
    $category_id = $data['categoria_id'];

    // Preparamos la consulta para evitar inyecciones SQL
    $query = $con->prepare("INSERT INTO InsertarServicio (titulo, descripcion,latitud ,longitud, fecha_limite,cliente_id,categoria_id) VALUES (?, ?, ?, ?, ?,?,?)");
    $query->bind_param("sssssss", $title, $description, $latitud, $longitud, $data,$client_id,$category_id);

    $response = [];

    if ($query->execute()) {
        $response["ok"] = true;
        $response["message"] = "Service registered successfully";
    } else {
        $response["ok"] = false;
        $response["message"] = "Error posting service: " . $query->error;
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