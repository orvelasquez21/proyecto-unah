<?php
require_once '../config/db_config.php';
require_once './SolicitudesService.php';

$listado = listarSolicitudes($pdo);
header('Content-Type: application/json');
echo json_encode($listado);
