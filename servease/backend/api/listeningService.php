<?php
//Vamos a utilizar variables de status activo?
//O como haremos estos
$cliente_id = 1; 

$query = "Select * from vw_listeningServices where cliente_id = ?";

// Assuming you're using PDO for database interaction
$stmt = $pdo->prepare($query);
$stmt->execute([$cliente_id]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output the results
print_r($results);
?>
