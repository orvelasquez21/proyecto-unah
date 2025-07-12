CREATE DATABASE IF NOT EXISTS modulo_admisiones;
USE modulo_admisiones;

-- 1. Tabla de aspirantes
CREATE TABLE aspirantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identidad VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo_personal VARCHAR(100),
    centro_regional VARCHAR(100),
    carrera_principal INT,
    carrera_secundaria INT,
    certificado MEDIUMBLOB,
    tipo_archivo VARCHAR(50),
    tamano_archivo INT,
    ancho_px INT,
    alto_px INT,
    estado_solicitud ENUM('pendiente','aprobada','rechazada','corregida') DEFAULT 'pendiente',
    revisor_asignado INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de carreras
CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- 3. Tabla de revisores
CREATE TABLE revisores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100),
    estado ENUM('activo','inactivo') DEFAULT 'activo'
);

-- 4. Tabla de tipo de examenes
CREATE TABLE tipos_examenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    puntaje_maximo DECIMAL(5,2)
);

-- 5. Tabla de examenes por carrera
CREATE TABLE examenes_carrera (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrera_id INT,
    examen_id INT,
    puntaje_minimo DECIMAL(5,2),
    FOREIGN KEY (carrera_id) REFERENCES carreras(id),
    FOREIGN KEY (examen_id) REFERENCES tipos_examenes(id)
);

-- 6. Tabla de resultados de examenes
CREATE TABLE resultados_examenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aspirante_id INT,
    examen_id INT,
    calificacion DECIMAL(5,2),
    fecha_examen DATE,
    aprobado ENUM('si','no'),
    FOREIGN KEY (aspirante_id) REFERENCES aspirantes(id),
    FOREIGN KEY (examen_id) REFERENCES tipos_examenes(id)
);

-- 7. Tabla de aprobaciones finales por carrera
CREATE TABLE resultados_finales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aspirante_id INT,
    carrera_id INT,
    estado ENUM('aprobada','no_aprobada'),
    FOREIGN KEY (aspirante_id) REFERENCES aspirantes(id),
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
);

-- 8. Tabla bitácora de envíos de correos
CREATE TABLE bitacora_correos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aspirante_id INT,
    correo VARCHAR(100),
    asunto VARCHAR(255),
    mensaje TEXT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aspirante_id) REFERENCES aspirantes(id)
);

-- 9. Tabla de cargas csv de notas (temporal)
CREATE TABLE cargas_csv (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identidad VARCHAR(20),
    tipo_examen_id INT,
    calificacion DECIMAL(5,2),
    fecha_carga TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_examen_id) REFERENCES tipos_examenes(id)
);

-- 10. Tabla de bitácora general (opcional para trazabilidad completa)
CREATE TABLE bitacora_general (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tabla_afectada VARCHAR(100),
    operacion VARCHAR(50),
    descripcion TEXT,
    usuario VARCHAR(100),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
