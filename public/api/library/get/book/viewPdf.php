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
    $nameFile = $_GET['file'] ?? '';
    
    if (empty($nameFile)) {
        throw new Exception('Nombre del archivo es requerido');
    }
    
    // Validar que el nombre del archivo sea seguro (solo caracteres permitidos)
    if (!preg_match('/^[0-9]+_[a-zA-Z0-9._-]+\.pdf$/', $nameFile)) {
        throw new Exception('Nombre de archivo inválido');
    }
    
    // Ruta de la carpeta upload (fuera de public, retroceder 3 niveles)
    $uploadDir = dirname(dirname(dirname(__FILE__))) . '/classes/upload/';
    $rutaArchivo = $uploadDir . $nameFile;
    
    // Debug: mostrar rutas para verificar
    error_log("Upload directory: " . $uploadDir);
    error_log("File path: " . $rutaArchivo);
    error_log("File exists: " . (file_exists($rutaArchivo) ? 'yes' : 'no'));
    
    // Verificar que el archivo existe
    if (!file_exists($rutaArchivo)) {
        throw new Exception('Archivo no encontrado: ' . $rutaArchivo . ' (Directorio: ' . $uploadDir . ')');
    }
    
    // Verificar que es realmente un archivo PDF (verificar extensión)
    $extension = strtolower(pathinfo($rutaArchivo, PATHINFO_EXTENSION));
    if ($extension !== 'pdf') {
        throw new Exception('El archivo no es un PDF válido');
    }
    
    // Leer y servir el archivo PDF
    $contenido = file_get_contents($rutaArchivo);
    if ($contenido === false) {
        throw new Exception('Error al leer el archivo');
    }
    
    // Establecer encabezados para visualización (no descarga)
    header('Content-Disposition: inline; filename="' . $nameFile . '"');
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