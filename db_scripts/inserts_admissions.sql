USE modulo_admisiones;

-- Carreras
INSERT INTO carreras (nombre) VALUES
('Ingeniería en Sistemas'),
('Derecho'),
('Medicina'),
('Administración de Empresas');

-- Revisores
INSERT INTO revisores (nombre, correo, estado) VALUES
('María López', 'mlopez@unah.edu.hn', 'activo'),
('Carlos Pérez', 'cperez@unah.edu.hn', 'activo');

-- Tipos de Examenes
INSERT INTO tipos_examenes (nombre, puntaje_maximo) VALUES
('Matemática', 100),
('Español', 100),
('Ciencias Naturales', 100),
('Historia', 100);

-- Examenes por carrera (asociar cada carrera con mínimo un examen)
INSERT INTO examenes_carrera (carrera_id, examen_id, puntaje_minimo) VALUES
(1, 1, 60), -- Ingeniería en Sistemas requiere Matemática
(1, 2, 50), -- Ingeniería en Sistemas requiere Español
(2, 2, 55), -- Derecho requiere Español
(2, 4, 50), -- Derecho requiere Historia
(3, 3, 65), -- Medicina requiere Ciencias Naturales
(3, 1, 60), -- Medicina requiere Matemática
(4, 2, 50); -- Administración requiere Español

-- Aspirantes
INSERT INTO aspirantes (identidad, nombre, apellidos, telefono, correo_personal, centro_regional,
carrera_principal, carrera_secundaria, tipo_archivo, tamano_archivo,
ancho_px, alto_px, estado_solicitud)
VALUES
('0801199900011','Juan','Hernández','9999-1111','juan.h@gmail.com','Tegucigalpa',1,2,'pdf',150000,1024,768,'pendiente'),
('0801199900012','Ana','Martínez','9999-2222','ana.m@gmail.com','San Pedro',3,4,'jpg',200000,800,600,'pendiente'),
('0801199900013','Luis','García','9999-3333','luis.g@gmail.com','Choluteca',2,1,'pdf',180000,1024,768,'pendiente'),
('0801199900014','María','López','9999-4444','maria.l@gmail.com','Tegucigalpa',1,3,'png',160000,1280,720,'pendiente'),
('0801199900015','Carlos','Pérez','9999-5555','carlos.p@gmail.com','Comayagua',4,2,'pdf',190000,1024,768,'pendiente'),
('0801199900016','Sofía','Ramírez','9999-6666','sofia.r@gmail.com','La Ceiba',3,2,'jpg',200000,800,600,'pendiente'),
('0801199900017','Diego','Castro','9999-7777','diego.c@gmail.com','Tegucigalpa',1,4,'png',170000,1280,720,'pendiente'),
('0801199900018','Laura','Vásquez','9999-8888','laura.v@gmail.com','San Pedro',2,3,'pdf',180000,1024,768,'pendiente'),
('0801199900019','José','Flores','9999-9999','jose.f@gmail.com','Choluteca',4,1,'jpg',150000,800,600,'pendiente'),
('0801199900020','Fernanda','Reyes','9999-1010','fernanda.r@gmail.com','Comayagua',3,1,'png',160000,1280,720,'pendiente'),
('0801199900021','Ricardo','Suárez','9999-2020','ricardo.s@gmail.com','Tegucigalpa',1,2,'pdf',150000,1024,768,'pendiente'),
('0801199900022','Daniela','Ortega','9999-3030','daniela.o@gmail.com','San Pedro',3,4,'jpg',200000,800,600,'pendiente'),
('0801199900023','Miguel','Mendoza','9999-4040','miguel.m@gmail.com','Choluteca',2,1,'pdf',180000,1024,768,'pendiente'),
('0801199900024','Gabriela','Hernández','9999-5050','gabriela.h@gmail.com','Tegucigalpa',1,3,'png',160000,1280,720,'pendiente'),
('0801199900025','Andrés','Morales','9999-6060','andres.m@gmail.com','Comayagua',4,2,'pdf',190000,1024,768,'pendiente'),
('0801199900026','Valeria','Sánchez','9999-7070','valeria.s@gmail.com','La Ceiba',3,2,'jpg',200000,800,600,'pendiente'),
('0801199900027','Jorge','Mejía','9999-8080','jorge.m@gmail.com','Tegucigalpa',1,4,'png',170000,1280,720,'pendiente'),
('0801199900028','Natalia','Ruiz','9999-9090','natalia.r@gmail.com','San Pedro',2,3,'pdf',180000,1024,768,'pendiente'),
('0801199900029','Kevin','Torres','9999-1112','kevin.t@gmail.com','Choluteca',4,1,'jpg',150000,800,600,'pendiente'),
('0801199900030','Paola','Fernández','9999-2223','paola.f@gmail.com','Comayagua',3,1,'png',160000,1280,720,'pendiente');

-- Opcional: Inserta notas en resultados_examenes luego de poblar aspirantes y tipos de examen.
