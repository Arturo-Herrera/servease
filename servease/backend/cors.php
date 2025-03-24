<?php
//Estos headers se usan para evitar problemas de CORS que es algo asi como para especificar el tipo de contenido que se envia(ahi busquenlo bien jaja)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
?>