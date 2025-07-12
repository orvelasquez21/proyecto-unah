


-- 1. Estados de Solicitudes
INSERT INTO ESTADOS_SOLICITUDES (NOMBRE_TIPO_ESTADO) VALUES 
('Pendiente'), ('Revisado'), ('Rechazado'), ('Autorizado');

-- 2. Tipos de Exámenes
INSERT INTO TIPO_EXAMENES (TIPO_EXAMEN, PUNTUACION_MAXIMA) VALUES 
('PUMA', 100), ('PAM', 100), ('PCNNS', 100);

-- 3. Facultades
INSERT INTO FACULTADES (CODIGO_FACULTAD, NOMBRE_FACULTAD) VALUES 
('ING', 'Ingeniería'), ('DER', 'Derecho'), ('FIS', 'Física'), 
('AST', 'Astronomía'), ('LEN', 'Lenguas');

-- 4. Tipos de Revisores
INSERT INTO TIPOS_REVISORES (CODIGO_TIPO_REVISOR, TIPO_REVISOR) VALUES 
('EMP', 'Empleado'), ('EST', 'Estudiante'), ('SUB', 'Subcontratado');

-- 5. Tipos de Eventos
INSERT INTO TIPOS_EVENTOS (TIPO_EVENTO, DESCRIPTION) VALUES 
('Solicitud Admisión', 'Proceso de solicitud de admisión regular'),
('Examen de Ingreso', 'Evaluación para nuevos aspirantes'),
('Entrevista', 'Evaluación personalizada del aspirante');

-- 6. Tipos de Aprobación
INSERT INTO TIPO_APROBACION (TIPO_APROBACION, DESCRIPTION) VALUES 
('Aprobado', 'Cumple con todos los requisitos'),
('Condicionado', 'Cumple parcialmente con los requisitos'),
('Rechazado', 'No cumple con los requisitos mínimos');

-- 7. Centros Regionales
INSERT INTO CENTROS_REGIONALES (CODIGO_CENTRO, NOMBRE_CENTRO, DEPARTAMENTO, CIUDAD) VALUES 
('CRT', 'Centro Regional Tegucigalpa', 'Francisco Morazán', 'Tegucigalpa'),
('CRS', 'Centro Regional San Pedro Sula', 'Cortés', 'San Pedro Sula'),
('CRL', 'Centro Regional La Ceiba', 'Atlántida', 'La Ceiba');

-- 8. Carreras
INSERT INTO CARRERAS (CODIGO_CARRERA, NOMBRE_CARRERA, GRADO_ACADEMICO, ID_FACULTAD) VALUES 
('ICIV', 'Ingeniería Civil', 'Licenciatura', 1),
('ISIS', 'Ingeniería en Sistemas', 'Licenciatura', 1),
('DERP', 'Derecho Penal', 'Licenciatura', 2),
('FISP', 'Física Pura', 'Maestría', 3),
('ASTC', 'Astronomía Computacional', 'Doctorado', 4),
('LENG', 'Lenguas Modernas', 'Licenciatura', 5);

-- 9. Relación Facultades-Centros
INSERT INTO FACULTATES_X_CENTRO (ID_FACULTAD, ID_CENTRO_REGIONAL) VALUES 
(1, 1), (1, 2), (2, 1), (2, 3), (3, 1), (4, 1), (5, 1), (5, 2);

-- 10. Exámenes por Carrera
INSERT INTO EXAMENES_X_CARRERA (PUNTAJE_MINIMO, ID_TIPO_EXAMEN, ID_CARRERA) VALUES 
(70, 1, 1), (65, 1, 2), (60, 2, 3), (75, 1, 4), (80, 3, 5), (50, 2, 6);

-- 11. Archivos (certificados)
INSERT INTO ARCHIVOS (TIPO_ARCHIVO, TAMANO, DIMENSION_PIXELES, URL_ARCHIVO) VALUES 
('PDF', 1024, NULL, '/certificados/cert1.pdf'),
('PDF', 2048, NULL, '/certificados/cert2.pdf');

-- 12. Personas
INSERT INTO PERSONAS (NOMBRES, APELLIDOS, DNI, CORREO_PERSONAL, TELEFONO, GRADO_ACADEMICO, URL_ARCHIVO_CERTIFICADO) VALUES 
('Juan', 'Pérez', '0801199901234', 'juan@email.com', 98765432, 'Bachiller en Ciencias', 1),
('María', 'Gómez', '0801199805678', 'maria@email.com', 98765433, 'Bachiller en Letras', 2);

-- 13. Aspirantes
INSERT INTO ASPIRANTES (FECHA_REGISTRO, URL_TOKEN, ID_PERSONA, ID_CENTRO_REGIONAL) VALUES 
(CURDATE(), 'token123', 1, 1), (CURDATE(), 'token456', 2, 2);

-- 14. Revisores
INSERT INTO REVISORES (CODIGO_REVISOR, ESTADO_REVISOR, ID_TIPO_REVISOR, ID_PERSONA) VALUES 
('REV001', TRUE, 1, 1), ('REV002', TRUE, 2, 2);

-- 15. Solicitudes Pendientes
INSERT INTO SOLICITUDES_PENDIENTES (FECHA_RECIBIDA, ID_ASPIRANTE, ID_REVISOR_ASIGNADO) VALUES 
(NOW(), 1, 1), (NOW(), 2, 2);

















-- 1. Insertar más personas y aspirantes
INSERT INTO PERSONAS (NOMBRES, APELLIDOS, DNI, CORREO_PERSONAL, TELEFONO, GRADO_ACADEMICO, URL_ARCHIVO_CERTIFICADO) VALUES 
('Carlos', 'Martínez', '0801199709123', 'carlos@email.com', 98765434, 'Bachiller Técnico', 1),
('Ana', 'Rodríguez', '0801199604567', 'ana@email.com', 98765435, 'Bachiller en Humanidades', 2),
('Luis', 'Hernández', '0801199507890', 'luis@email.com', 98765436, 'Bachiller en Ciencias', 1);

INSERT INTO ASPIRANTES (FECHA_REGISTRO, URL_TOKEN, ID_PERSONA, ID_CENTRO_REGIONAL) VALUES 
(CURDATE(), 'token789', 3, 1),
(CURDATE(), 'token012', 4, 2),
(CURDATE(), 'token345', 5, 3);

-- 2. Relacionar aspirantes con carreras (CARRERAS_X_ASPIRANTE)
INSERT INTO CARRERAS_X_ASPIRANTE (ID_ASPIRANTE, ID_CARRERA) VALUES 
(1, 2),  -- Juan Pérez -> Ingeniería en Sistemas
(1, 6),  -- Juan Pérez -> Lenguas Modernas (aspirante a dos carreras)
(2, 3),  -- María Gómez -> Derecho Penal
(3, 1),  -- Carlos Martínez -> Ingeniería Civil
(4, 4),  -- Ana Rodríguez -> Física Pura
(5, 2),  -- Luis Hernández -> Ingeniería en Sistemas
(5, 5);  -- Luis Hernández -> Astronomía Computacional

-- 3. Insertar más solicitudes pendientes
INSERT INTO SOLICITUDES_PENDIENTES (FECHA_RECIBIDA, ID_ASPIRANTE, ID_REVISOR_ASIGNADO) VALUES 
(NOW() - INTERVAL 2 DAY, 3, 1),
(NOW() - INTERVAL 1 DAY, 4, 2),
(NOW(), 5, 1);

-- 4. Insertar más revisores
INSERT INTO REVISORES (CODIGO_REVISOR, ESTADO_REVISOR, ID_TIPO_REVISOR, ID_PERSONA) VALUES 
('REV003', TRUE, 1, 3),
('REV004', TRUE, 2, 4),
('REV005', TRUE, 3, 5);