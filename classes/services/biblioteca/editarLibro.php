<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

try {
    // Obtener los datos del formulario
    $idLibro = $_POST['id'] ?? '';
    $titulo = $_POST['titulo'] ?? '';
    $autor = $_POST['autor'] ?? '';
    $temas = $_POST['temas'] ?? '';
    
    // Validar datos requeridos
    if (empty($idLibro) || empty($titulo) || empty($autor) || empty($temas)) {
        throw new Exception('Todos los campos son requeridos');
    }
    
    // Validar título (5-70 caracteres)
    if (strlen($titulo) < 5 || strlen($titulo) > 70) {
        throw new Exception('El título debe tener entre 5 y 70 caracteres');
    }
    
    // Validar autor (formato específico)
    $palabras = explode(' ', trim($autor));
    if (count($palabras) < 2) {
        throw new Exception('El autor debe tener al menos un nombre y un apellido');
    }
    
    foreach ($palabras as $palabra) {
        if (!preg_match('/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*\.?$/', $palabra)) {
            throw new Exception('Formato de autor inválido');
        }
        if (strlen($palabra) === 1 && !str_ends_with($palabra, '.')) {
            throw new Exception('Las iniciales deben terminar con punto');
        }
    }
    
    // Ruta de la carpeta upload
    $uploadDir = dirname(__DIR__, 3) . '/upload/';
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
    
    // Actualizar datos del libro (mantener archivo original)
    $datosLibros['libros'][$indiceLibro]['titulo'] = $titulo;
    $datosLibros['libros'][$indiceLibro]['autor'] = $autor;
    $datosLibros['libros'][$indiceLibro]['temas'] = $temas;
    $datosLibros['libros'][$indiceLibro]['fecha_modificacion'] = date('Y-m-d H:i:s');
    $datosLibros['ultima_actualizacion'] = date('Y-m-d H:i:s');
    
    // Guardar archivo JSON actualizado
    if (!file_put_contents($archivoLibros, json_encode($datosLibros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        throw new Exception('Error al guardar los cambios en el archivo JSON');
    }
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Libro editado exitosamente',
        'libro' => [
            'id' => $datosLibros['libros'][$indiceLibro]['id'],
            'titulo' => $datosLibros['libros'][$indiceLibro]['titulo'],
            'autor' => $datosLibros['libros'][$indiceLibro]['autor'],
            'temas' => $datosLibros['libros'][$indiceLibro]['temas'],
            'archivo' => $datosLibros['libros'][$indiceLibro]['archivo'],
            'fecha_modificacion' => $datosLibros['libros'][$indiceLibro]['fecha_modificacion']
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?> 