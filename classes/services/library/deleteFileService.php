<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar que sea una petición POST o DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

try {
    // Obtener el ID del libro a eliminar
    $idLibro = $_POST['id'] ?? $_GET['id'] ?? '';
    
    if (empty($idLibro)) {
        throw new Exception('ID del libro es requerido');
    }
    
    // Ruta de la carpeta upload
    $uploadDir = dirname(__DIR__,3) . '/upload/';
    $archivoLibros = $uploadDir . 'libros.json';
    
    // Verificar que existe el archivo de libros
    if (!file_exists($archivoLibros)) {
        throw new Exception('No se encontró el archivo de libros');
    }
    
    // Leer archivo de libros
    $datosLibros = json_decode(file_get_contents($archivoLibros), true);
    if (!$datosLibros || !isset($datosLibros['libros'])) {
        throw new Exception('Error al leer el archivo de libros');
    }
    
    // Buscar el libro por ID
    $libroEncontrado = null;
    $indiceLibro = -1;
    
    foreach ($datosLibros['libros'] as $indice => $libro) {
        if ($libro['id'] === $idLibro) {
            $libroEncontrado = $libro;
            $indiceLibro = $indice;
            break;
        }
    }
    
    if (!$libroEncontrado) {
        throw new Exception('Libro no encontrado con ID: ' . $idLibro);
    }
    
    // Ruta del archivo PDF
    $rutaArchivo = $uploadDir . $libroEncontrado['archivo'];
    
    // Eliminar archivo PDF si existe
    if (file_exists($rutaArchivo)) {
        if (!unlink($rutaArchivo)) {
            throw new Exception('Error al eliminar el archivo PDF');
        }
    }
    
    // Eliminar libro del array
    array_splice($datosLibros['libros'], $indiceLibro, 1);
    $datosLibros['total_libros'] = count($datosLibros['libros']);
    $datosLibros['ultima_actualizacion'] = date('Y-m-d H:i:s');
    
    // Guardar archivo JSON actualizado
    if (!file_put_contents($archivoLibros, json_encode($datosLibros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        throw new Exception('Error al actualizar el archivo de libros');
    }
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Libro eliminado exitosamente',
        'libro_eliminado' => [
            'id' => $libroEncontrado['id'],
            'titulo' => $libroEncontrado['titulo'],
            'autor' => $libroEncontrado['autor']
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?> 