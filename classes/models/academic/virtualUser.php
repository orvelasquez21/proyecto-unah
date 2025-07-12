<?php

require_once __DIR__ . "/../../config/db_test_new_students.php";

class VirtualUser {
      private PDO  $pdo;

      private string $table="Virual_users";

      public function __construct(PDO $pdo){
        $this->pdo = $pdo;

      }

      public function all(){
        $stmt = $this->pdo->prepare("Select *  from {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
      }






}