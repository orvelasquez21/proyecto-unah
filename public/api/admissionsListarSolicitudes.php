
<?php
// Mostrar errores para depurar
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Ruta correcta, subiendo dos niveles desde 'public'
require_once __DIR__ . '/../../services/admissions/src/controllers/solicitudesController.php';

listarSolicitudesController();
