<?php
require_once __DIR__ . '/../services/admissions/solicitudesService.php';
require_once __DIR__ . '/../../config/db_config.php'; 

function listarSolicitudesController() {
    global $pdo;
    header('Content-Type: application/json; charset=UTF-8');
    try {
        $solicitudes = listarSolicitudes($pdo);
        echo json_encode($solicitudes, JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

