<?php
require_once __DIR__ . "/../../../../classes/controllers/library/deleteFileController.php";

// Encabezados generales de la API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Validar métodos aquí, por que ahorita lo tenemos en los servicios 