<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// listBooks.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../../../../../classes/controllers/library/listFileController.php';

$controller = new listFilesController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller->getLibros();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
