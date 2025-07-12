<?php

require_once __DIR__ . "/../../services/academic/domainService.php";

class DomainController{
 private DomainService $domainService;

    public function __construct(DomainService $domainService) {
        $this->domainService = $domainService;
    }

    public function getDomainById():void{
     header('Content-Type: application/json');

        try {
            // Validar método HTTP
            if($_SERVER['REQUEST_METHOD'] != 'GET'){
                throw new Exception('Metodo no permitido', 405);
            }

            // Obtener el ID del parámetro de la URL (ej: /domains/123)
            $id = $_GET['id'] ?? null;

            //validar que el aid existe y es numerico
            if($id === null || !is_numeric($id)){
                throw new InvalidArgumentException("EL id de dominio ingresado no valido", 400);
            }

              // Convertir a entero y obtener el dominio
            $domainId = (int)$id;
            $domainData = $this->domainService->getDomain($domainId);

            // Respuesta exitosa
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $domainData
            ]);

        } catch (Exception $e) {
            // Manejo de errores
            http_response_code($e->getCode() ?: 400);
            echo json_encode([
                'error' => $e->getMessage(),
                'details' => $data ?? null
            ]);
        }

        #catch (InvalidArgumentException $e) {
        #    http_response_code(400);
        #    echo json_encode([
        #        'success' => false,
        #        'error' => $e->getMessage()
        #    ]);
        #} catch (Exception $e) {
        #    $statusCode = $e->getCode() >= 400 ? $e->getCode() : 500;
        #    http_response_code($statusCode);
        #    echo json_encode([
        #        'success' => false,
        #        'error' => $e->getMessage(),
        #        'code' => $e->getCode()
        #    ]);
        #}
    }

}