<?php

require_once __DIR__ ."/../../../config/db_test_new_students.php";

class Students {
  
    private PDO $pdo;
    private string $table = 'estudiantes';

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function all(): array {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function find(int $id): ?array {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function create(array $data): int {
        $sql = "INSERT INTO {$this->table} 
                (nombres, apellidos, correo_institucional) 
                VALUES (:nombres, :apellidos, :correo_institucional)";
                
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':nombres' => $data['nombres'],
            ':apellidos' => $data['apellidos'],
            ':correo_institucional' => $data['correo_institucional']
        ]);
        
        return (int)$this->pdo->lastInsertId();
    }

    public function update(int $id, array $data): bool {
        $sql = "UPDATE {$this->table} 
                SET nombres = :nombres, 
                    apellidos = :apellidos, 
                    correo_institucional = :correo_institucional 
                WHERE id = :id";
                
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':id' => $id,
            ':nombres' => $data['nombres'],
            ':apellidos' => $data['apellidos'],
            ':correo_institucional' => $data['correo_institucional']
        ]);
    }

    public function delete(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}


