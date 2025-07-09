<?php
class ArchivoService {

    private $archivo;
    private $tamanoMaximo = 10 * 1024 * 1024; // 10 MB

    public function __construct($archivo) {
        $this->archivo = $archivo;
    }

    public function validar() {
        if ($this->archivo['error'] !== UPLOAD_ERR_OK) {
            return ['error' => 'Error en la subida del archivo.'];
        }

        if ($this->archivo['size'] > $this->tamanoMaximo) {
            return ['error' => 'Archivo demasiado grande. Máximo 10MB.'];
        }

        return ['error' => null];
    }

    public function obtenerDatos() {
        $ancho = null;
        $alto = null;

        if (strpos($this->archivo['type'], 'image/') === 0) {
            $dimensiones = getimagesize($this->archivo['tmp_name']);
            if ($dimensiones) {
                $ancho = $dimensiones[0];
                $alto = $dimensiones[1];
            }
        }

        $contenido = file_get_contents($this->archivo['tmp_name']);

        return [
            'nombre' => $this->archivo['name'],
            'tipo' => $this->archivo['type'],
            'tamano' => $this->archivo['size'],
            'ancho' => $ancho,
            'alto' => $alto,
            'contenido' => $contenido
        ];
    }
}
?>


/*Array
(
    [certificado] => Array
        (
            [name] => nombre_del_archivo.pdf
            [type] => application/pdf
            [tmp_name] => /tmp/phpABCD.tmp
            [error] => 0
            [size] => 1256
        )
)
 */
