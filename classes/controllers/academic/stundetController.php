<?php
// Ejemplo: public/index.php (punto de entrada)

require_once __DIR__ . '/../config/db_config.php';
require_once __DIR__ . '/../models/Estudiante.php';
require_once __DIR__ . '/../services/EstudianteService.php';


class StundetController
{
    public $studentService;
    public function __construct()
    {
        $pdo = createConnectionPDO();
        $student = new Students($pdo);
        $this->studentService = new StudentService($student);
    }



    public function registrar()
    {
        header('Content-Type: application/json');

        try {
            // Validar método HTTP
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception("Método no permitido", 405);
            }

            // Obtener y validar datos POST
            $data = [
                'nombres' => $_POST['nombres'] ?? '',
                'apellidos' => $_POST['apellidos'] ?? '',
                'correo_institucional' => $_POST['correo_institucional'] ?? ''
            ];

            // Procesar con el servicio
            $resultado = $this->studentService->registrarEstudiante($data);

            // Respuesta exitosa
            http_response_code(201);
            echo json_encode($resultado);

        } catch (Exception $e) {
            // Manejo de errores
            http_response_code($e->getCode() ?: 400);
            echo json_encode([
                'error' => $e->getMessage(),
                'details' => $data ?? null
            ]);
        }

        // 3. Ejemplo de uso (simulando datos POST)
        #try {
        #    $nuevoEstudiante = [
        #        'nombres' => 'Ana',
        #        'apellidos' => 'Gómez',
        #        'correo_institucional' => 'ana.gomez@example.edu'
        #    ];
        #
        #    $resultado = $estudianteService->registrarEstudiante($nuevoEstudiante);
        #    echo json_encode($resultado);
        #} catch (Exception $e) {
        #    http_response_code(400);
        #    echo json_encode(['error' => $e->getMessage()]);
        #}
    }

}