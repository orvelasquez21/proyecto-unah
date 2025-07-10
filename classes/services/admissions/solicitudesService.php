<?php
require_once __DIR__ . '/../../repositories/solicitudesRepository.php';

function listarSolicitudes($pdo) {
    $solicitudes = obtenerSolicitudesPendientes($pdo);
    // Si necesitas procesamiento extra aquí, hazlo
    return $solicitudes;
}
