<?php
header('Content-Type: application/json');
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
    // Ruta de la carpeta upload
    $uploadDir = dirname(__DIR__, 3) . '/upload/';
    $archivoLibros = $uploadDir . 'libros.json';
    
    // Verificar que existe el archivo de libros
    if (!file_exists($archivoLibros)) {
        echo json_encode([
            'success' => true,
            'libros' => [],
            'total_libros' => 0,
            'mensaje' => 'No hay libros registrados'
        ]);
        exit;
    }
    
    // Leer archivo de libros
    $datosLibros = json_decode(file_get_contents($archivoLibros), true);
    if (!$datosLibros) {
        throw new Exception('Error al leer el archivo de libros');
    }
    
    // Filtrar solo libros activos
    $librosActivos = array_filter($datosLibros['libros'], function($libro) {
        return $libro['estado'] === 'activo';
    });
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'libros' => array_values($librosActivos),
        'total_libros' => count($librosActivos),
        'ultima_actualizacion' => $datosLibros['ultima_actualizacion'] ?? 'N/A'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?> 