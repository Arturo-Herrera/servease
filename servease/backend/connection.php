<?php
    define('DBHOST', 'localhost');
    define('DBUSER', 'root');
    define('DBPASSW', '');
    define('DBNAME', 'servease');

    function connectdb(){
        try {
            $db = mysqli_connect(DBHOST, DBUSER, DBPASSW, DBNAME);
            if (!$db) {
                throw new Exception("Connection error: " . mysqli_connect_error());
            }
            return $db;
        } catch (Exception $e) {
            error_log($e->getMessage());
            return false;
        }
    }
?>