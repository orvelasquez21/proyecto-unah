<?php
// listFilesController.php

require_once __DIR__ . '/../../../../services/library/listFileService.php';

class listFilesController {

    public function getLibros() {
        // Simplemente incluimos el servicio y lo ejecutamos.
        // El servicio ya tiene la lógica y la salida JSON.
        include __DIR__ . '/../../../../services/library/listFileService.php';
    }
}
