<?php
// src/config/db_config.php

$host = 'localhost';
$dbname = 'BD_ADMISIONES';
$username = 'root';
$password = 'bd';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configuración para que PDO lance excepciones en errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "coneccion exitosa";
} catch (PDOException $e) {
    // Si falla la conexión, muestra error y detiene ejecución
    //header("Location:  ./../../../frontend/views/Admisiones/landing.html");
     exit("Error de conexión a la base de datos: " . $e->getMessage());
 
}
