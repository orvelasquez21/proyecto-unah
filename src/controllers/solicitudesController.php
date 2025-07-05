<?php

require_once __DIR__ . '/../services/solicitudesServices.php';

require_once __DIR__ . '/../../config/db_config.php'; 

function listarSolicitudesController() {
    global $pdo;
    header('Content-Type: application/json');
    try {
        $solicitudes = listarSolicitudes($pdo);
        echo json_encode($solicitudes);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
