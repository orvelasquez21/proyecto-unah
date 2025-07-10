<?php
require_once __DIR__ . '/../models/admissions/aspirantesModel.php';
require_once __DIR__ . '/../services/admissions/subirArchivo.php';
$pdo = require_once __DIR__ . '/../config/db_admissions.php';

$usuarioModel = new aspiranteModel($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
     // Valores por defecto si no suben archivo
    $datosArchivo = [
        'contenido' => null,
        'tipo' => null,
        'tamano' => null,
        'ancho' => null,
        'alto' => null
    ];

    if (isset($_FILES['certificado']) && $_FILES['certificado']['error'] === UPLOAD_ERR_OK) {
        $archivoService = new ArchivoService($_FILES['certificado']);
        $procesarArchivo = $archivoService->validar();

        if ($procesarArchivo['error']) {
            echo $procesarArchivo['error'];
            exit;
        }

        $datosArchivo = $archivoService->obtenerDatos();
    }

    // Obtiene los datos que el usuario envió en el formulario
    $nombre = $_POST['nombre'];
    $identidad = $_POST['dni'];
    $correo_personal = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $centro_regional = $_POST['centro_regional'];
    $carrera_principal = $_POST['carrera_p'];
    $carrera_secundaria = $_POST['carrera_s'];
    $certificado = $datosArchivo['contenido'];
    $tipo_archivo = $datosArchivo['tipo'];
    $tamano_archivo = $datosArchivo['tamano'];
    $ancho_px = $datosArchivo['ancho'];
    $alto_px = $datosArchivo['alto'];
    $estado_solicitud = "pendiente";
    


    // Ahora los usa sin estar quemados
   // $usuarioModel->crearUsuario($nombre, $identidad, $correo_personal, $telefono, $centro_regional, $carrera_principal, $carrera_secundaria, $certificado, $tipo_archivo, $tamano_archivo , $ancho_px, $alto_px, $estado_solicitud , $fecha_registro);
   $usuarioModel->registrarNuevaSolicitud(
    $nombre, $identidad, $correo_personal, $telefono, $centro_regional,
    $carrera_principal, $carrera_secundaria, $certificado, $tipo_archivo,
    $tamano_archivo, $ancho_px, $alto_px, $estado_solicitud, null
);
 echo "Usuario creado correctamente.";
}

/*echo $datosArchivo['nombre'];

return [
            'nombre' => $this->archivo['name'],
            'tipo' => $this->archivo['type'],
            'tamano' => $this->archivo['size'],
            'ancho' => $ancho,
            'alto' => $alto,
            'contenido' => $contenido
        ];
 */

