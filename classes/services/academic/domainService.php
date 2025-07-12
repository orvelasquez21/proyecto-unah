<?php 

require_once __DIR__ . "/../../models/academic/domain";

class DomainService {
    
    private $domain;

    public function __construct(Domain $domain){
        $this->domain = $domain;
    }

     /**
     * Obtiene un dominio por su ID
     * @param int $id ID del dominio
     * @return array Datos del dominio
     * @throws Exception Si el ID es inválido o no se encuentra el dominio
     */
    public function getDomain(int $id): array{
         // Validación básica
        if ($id <= 0) {
            throw new InvalidArgumentException("EL id debe ser mayor a cero");
        }

        try{
            return $this->domain->find($id);
        }catch(Exception $e){
            throw new Exception("Error al obtener el dominio con id : ". $id." del tipo" . $e->getMessage());

        }

    }



}