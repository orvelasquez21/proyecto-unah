<?php

require_once __DIR__ . "/../../../config/db_test_new_students.php";

class Domain {
    private PDO $pdo;
    public string $table = "domains";

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo; // Corregido: $this->pdo en lugar de $this->$pdo
    }

    /**
     * Busca un dominio por su ID
     * @param int $id ID del dominio
     * @return array Datos del dominio
     * @throws Exception Si no se encuentra el dominio
     */
    public function find(int $id): array {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $stmt->execute([':id' => $id]);
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$result) {
            throw new Exception("Dominio no encontrado");
        }
        
        return $result;
    }
}