--Estoy mirando como funciona ENUM para evitar crear otras tablas
--O prefieren que creemos otras tablas?


CREATE TABLE usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
firebase_uid VARCHAR(255) NOT NULL UNIQUE,   --Firebase Authentication
nombre VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
telefono VARCHAR(20),
rol ENUM('cliente', 'proveedor') NOT NULL,
foto_perfil VARCHAR(512),
rating_promedio DECIMAL(3,2) DEFAULT 0.00,
);


CREATE TABLE categorias (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL UNIQUE,
descripcion TEXT,
);


CREATE TABLE servicios (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(255) NOT NULL,
descripcion TEXT,
ubicacion GEOMETRY SRID 4326 NOT NULL,   --latitud y longitud
/* estado ENUM('abierta', 'en_proceso', 'completada', 'cancelada') DEFAULT 'abierta', */
fecha_limite DATE,
cliente_id INT NOT NULL,
categoria_id INT NOT NULL,
FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE propuestas_servicio (
id INT PRIMARY KEY AUTO_INCREMENT,
descripcion TEXT,
precio DECIMAL(10,2),
estado ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
fecha_completado DATETIME,
solicitud_id INT NOT NULL,
proveedor_id INT NOT NULL,
FOREIGN KEY (solicitud_id) REFERENCES servicios(id),
FOREIGN KEY (proveedor_id) REFERENCES usuarios(id)
);

CREATE TABLE ratings (
id INT PRIMARY KEY AUTO_INCREMENT,
puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
comentario TEXT,
usuario_id INT NOT NULL,
usuario_calificado_id INT NOT NULL,
servicio_id INT NOT NULL,
FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
FOREIGN KEY (usuario_calificado_id) REFERENCES usuarios(id),
FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);