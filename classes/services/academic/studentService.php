<?php
require_once __DIR__ . '/../../models/academic/student.php';

class StudentService {
    private $estudianteModel;

    // Inyectamos el modelo en el constructor
    public function __construct(Students $estudianteModel) {
        $this->estudianteModel = $estudianteModel;
    }

    /**
     * Registra un estudiante con validaciones
     * @param array $data Datos del estudiante
     * @return array Resultado con ID y matrícula
     * @throws Exception Si hay errores de validación
     */
    public function registrarEstudiante(array $data): array {
        // Validación básica
        if (empty($data['nombres']) || empty($data['apellidos'])) {
            throw new Exception("Nombre y apellidos son obligatorios");
        }

        // Validar formato de correo
        if (!filter_var($data['correo_institucional'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Correo institucional no válido");
        }

        // Verificar si el correo ya existe
        $existente = $this->estudianteModel->findByEmail($data['correo_institucional']);
        if ($existente) {
            throw new Exception("El correo ya está registrado");
        }

        // Generar matrícula automática
        $data['matricula'] = 'EST-' . date('Ymd') . '-' . rand(1000, 9999);

        // Guardar en BD
        $id = $this->estudianteModel->create($data);

        return [
            'id' => $id,
            'matricula' => $data['matricula'],
            'mensaje' => 'Estudiante registrado exitosamente'
        ];
    }

    // Otros métodos de servicio...
    // Ej: actualizarEstudiante, desactivarEstudiante, etc.
}