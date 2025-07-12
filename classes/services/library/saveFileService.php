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
    $titulo = $_POST['titulo'] ?? '';
    $autor = $_POST['autor'] ?? '';
    $temas = $_POST['temas'] ?? '';
    
    // Validar datos requeridos
    if (empty($titulo) || empty($autor) || empty($temas)) {
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
    
    // Validar archivo
    if (!isset($_FILES['archivo']) || $_FILES['archivo']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Error al subir el archivo');
    }
    
    $archivo = $_FILES['archivo'];
    $nombreArchivo = $archivo['name'];
    $tipoArchivo = $archivo['type'];
    $tamanoArchivo = $archivo['size'];
    $archivoTemporal = $archivo['tmp_name'];
    
    // Validar tipo de archivo (solo PDF)
    if ($tipoArchivo !== 'application/pdf') {
        throw new Exception('Solo se permiten archivos PDF');
    }
    
    // Validar extensión
    $extension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));
    if ($extension !== 'pdf') {
        throw new Exception('Solo se permiten archivos con extensión .pdf');
    }
    
    // Validar tamaño (máximo 10MB)
    if ($tamanoArchivo > 10 * 1024 * 1024) {
        throw new Exception('El archivo no puede superar los 10MB');
    }
    
    // Usar la carpeta upload existente
    $uploadDir = dirname(__DIR__,3) . '/upload/';
    
    // Verificar que la carpeta existe
    if (!is_dir($uploadDir)) {
        throw new Exception('La carpeta upload no existe en: ' . $uploadDir);
    }
    
    // Verificar permisos de escritura
    if (!is_writable($uploadDir)) {
        throw new Exception('La carpeta upload no tiene permisos de escritura');
    }
    
    // Debug: verificar ruta
    error_log("Upload directory: " . $uploadDir);
    error_log("Upload directory exists: " . (is_dir($uploadDir) ? 'yes' : 'no'));
    
    // Generar nombre único para el archivo
    $timestamp = time();
    $nombreUnico = $timestamp . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $nombreArchivo);
    $rutaArchivo = $uploadDir . $nombreUnico;
    
    // Debug: verificar ruta del archivo
    error_log("File path: " . $rutaArchivo);
    
    // Mover archivo subido
    if (!move_uploaded_file($archivoTemporal, $rutaArchivo)) {
        throw new Exception('Error al guardar el archivo');
    }
    
    // Archivo JSON principal para todos los metadatos
    $archivoLibros = $uploadDir . 'libros.json';
    
    // Leer archivo existente o crear uno nuevo
    if (file_exists($archivoLibros)) {
        $datosLibros = json_decode(file_get_contents($archivoLibros), true);
        if (!$datosLibros) {
            $datosLibros = [
                'libros' => [],
                'ultimo_id' => 0,
                'fecha_creacion' => date('Y-m-d H:i:s'),
                'total_libros' => 0
            ];
        }
    } else {
        $datosLibros = [
            'libros' => [],
            'ultimo_id' => 0,
            'fecha_creacion' => date('Y-m-d H:i:s'),
            'total_libros' => 0
        ];
    }
    
    // Generar ID único para el libro
    $datosLibros['ultimo_id']++;
    $idLibro = 'LIBRO_' . str_pad($datosLibros['ultimo_id'], 6, '0', STR_PAD_LEFT);
    
    // Crear metadatos del libro
    $metadatos = [
        'id' => $idLibro,
        'titulo' => $titulo,
        'autor' => $autor,
        'temas' => $temas,
        'archivo' => $nombreUnico,
        'nombre_original' => $nombreArchivo,
        'tamano' => $tamanoArchivo,
        'fecha_subida' => date('Y-m-d H:i:s'),
        'fecha_creacion' => date('Y-m-d H:i:s'),
        'estado' => 'activo'
    ];
    
    // Agregar libro al array
    $datosLibros['libros'][] = $metadatos;
    $datosLibros['total_libros'] = count($datosLibros['libros']);
    $datosLibros['ultima_actualizacion'] = date('Y-m-d H:i:s');
    
    // Guardar archivo JSON actualizado
    if (!file_put_contents($archivoLibros, json_encode($datosLibros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        // Si falla guardar metadatos, eliminar archivo subido
        unlink($rutaArchivo);
        throw new Exception('Error al guardar los metadatos en el archivo JSON');
    }
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Libro guardado exitosamente',
        'libro' => [
            'id' => $metadatos['id'],
            'titulo' => $metadatos['titulo'],
            'autor' => $metadatos['autor'],
            'temas' => $metadatos['temas'],
            'archivo' => $metadatos['archivo']
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}
?> 