<?php
header('Content-Type: application/pdf');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar que sea una petición GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

try {
    // Obtener el nombre del archivo desde el parámetro GET
    $nombreArchivo = $_GET['archivo'] ?? '';
    
    if (empty($nombreArchivo)) {
        throw new Exception('Nombre del archivo es requerido');
    }
    
    // Validar que el nombre del archivo sea seguro (solo caracteres permitidos)
    if (!preg_match('/^[0-9]+_[a-zA-Z0-9._-]+\.pdf$/', $nombreArchivo)) {
        throw new Exception('Nombre de archivo inválido');
    }
    
    // Ruta de la carpeta upload (fuera de public)
    $uploadDir = dirname(__DIR__, 3) . '/upload/';
    $rutaArchivo = $uploadDir . $nombreArchivo;
    
    // Verificar que el archivo existe
    if (!file_exists($rutaArchivo)) {
        throw new Exception('Archivo no encontrado');
    }
    
    // Verificar que es realmente un archivo PDF
    $mimeType = mime_content_type($rutaArchivo);
    if ($mimeType !== 'application/pdf') {
        throw new Exception('El archivo no es un PDF válido');
    }
    
    // Leer y servir el archivo PDF
    $contenido = file_get_contents($rutaArchivo);
    if ($contenido === false) {
        throw new Exception('Error al leer el archivo');
    }
    
    // Establecer encabezados adicionales para descarga
    header('Content-Disposition: inline; filename="' . $nombreArchivo . '"');
    header('Content-Length: ' . filesize($rutaArchivo));
    header('Cache-Control: public, max-age=3600');
    
    // Imprimir el contenido binario del PDF
    echo $contenido;
    
} catch (Exception $e) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?> 