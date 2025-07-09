<?php
// src/config/db_config.php

$host = 'localhost';
$dbname = 'modulo_admisiones';
$username = 'root';
$password = 'bd';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configuración para que PDO lance excepciones en errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "coneccion exitosa";
    return $pdo;
} catch (PDOException $e) {
    // Si falla la conexión, muestra error y detiene ejecución
    header("Location:  ./../../public/views/admissions/formulario.html");
     exit("Error de conexión a la base de datos: " . $e->getMessage());
 
}
