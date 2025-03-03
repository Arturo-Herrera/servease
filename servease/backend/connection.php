<?php
    $host = "localhost";
    $user = "root";
    $password = "";
    $db = "servease";

    $con = mysqli_connect($host, $user, $password, $db);

    if(!$con){
        die("Conection failed: " . mysqli_connect_error());
    }
?>