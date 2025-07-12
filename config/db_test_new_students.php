<?php


function createConnectionPDO():PDO{

$host  = 'localhost';
$dbname = 'test_new_students';
$username = 'root';
$password = 'bd';
$charset = 'utf8mb4';

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

try{
    $dsn = "mysql:host=$host; dbname=$dbname; charset=utf8";
    $pdo = new PDO($dsn, $username, $password, $options);

    //echo ("coneccion exitosa a : " . $dbname);
    return $pdo;
}
catch(PDOException $e){
     header("Location:  ./../public/");
     exit("Error de conexión a la base de datos: ". $dbname. "---->" . $e->getMessage());

}
}