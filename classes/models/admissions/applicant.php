<?php

require_once __DIR__ .'/../../config/db_admissions_config.php';

class aspiranteModel{
    private $pdo;


public function __construct($pdo){
    $this->pdo = $pdo;
}

#Consultar info aspirantes solicitudes
public function obtenerSolicitudes($pdo){
    $stmt = $this->pdo->query("Select * from aspirantes");
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}

#inserter info solicitud aspirante
public function registrarNuevaSolicitud($nombre, $identidad, $correo_personal, $telefono, $centro_regional, $carrera_principal, $carrera_secundaria, $certificado, $tipo_archivo=null, $tamano_archivo = null, $ancho_px = null, $alto_px = null, $estado_solicitud , $revisor_asignado = null){
   $stmt = $this->pdo->prepare("INSERT INTO aspirantes 
(nombre, identidad, correo_personal, telefono, centro_regional, carrera_principal, carrera_secundaria, certificado, tipo_archivo, tamano_archivo, ancho_px, alto_px, estado_solicitud, revisor_asignado, fecha_registro) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    return $stmt->execute([
    $nombre, $identidad, $correo_personal, $telefono, $centro_regional,
    $carrera_principal, $carrera_secundaria, $certificado, $tipo_archivo,
    $tamano_archivo, $ancho_px, $alto_px, $estado_solicitud,
    $revisor_asignado
]);

}

#eliminar registro por id 
public function eliminarUsuario($id){
    $stmt = $this->pdo->prepare("DELETE FROM ASPIRANTES WHERE id = ?");
    return $stmt->execute([$id]);
}

#Actualizar un usuario
public function actualizarUsuario($id, $nombre, $correo) {
    $stmt = $this->pdo->prepare("UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?");
    return $stmt->execute([$nombre, $correo, $id]);
}

}