<?php
require_once __DIR__ . '/../classes/config/db_config.php'; // Asegúrate que $pdo está configurado
require_once __DIR__ . '/../classes/repositories/obtenerSolicitudesPendientesRepository.php';

function testObtenerSolicitudes() {
    global $pdo;
    
    try {
        $solicitudes = obtenerSolicitudesPendientes($pdo);
        
        // devuelve un array
        if (!is_array($solicitudes)) {
            throw new Exception("La función no devolvió un array");
        }
        
        // Verificar que no está vacío 
        if (empty($solicitudes)) {
            echo "Advertencia: No se encontraron solicitudes (puede ser esperado)";
        }
        
        // Imprime resultados para inspección
        echo "<pre>" . json_encode($solicitudes, JSON_PRETTY_PRINT) . "</pre>";
        
        return true;
        
    } catch (Exception $e) {
        echo "Error en la prueba: " . $e->getMessage();
        return false;
    }
}

// Ejecuta la prueba
testObtenerSolicitudes();