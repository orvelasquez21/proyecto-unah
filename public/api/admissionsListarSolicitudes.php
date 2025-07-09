<?php
//require_once __DIR__ .  '/../../src/config/db_config.php';
//require_once __DIR__ .  '/../../src/services/admissions/solicitudesService.php';

//$listado = listarSolicitudesPendientes($pdo);
//header('Content-Type: application/json');
//echo json_encode($listado);
require_once __DIR__ . '/../../src/controllers/solicitudesController.php';
listarSolicitudesController();



// Mostrar errores para depurar
//ini_set('display_errors', 1);
//error_reporting(E_ALL);





