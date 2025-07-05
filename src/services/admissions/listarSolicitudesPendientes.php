<?php
require_once '../config/conexion.php';
require_once '../src/services/SolicitudesService.php';

$listado = listarSolicitudesPendientes($pdo);
header('Content-Type: application/json');
echo json_encode($listado);
