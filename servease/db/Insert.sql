--ST_GeomFromText Mire que es lo que usa para las ubicaciones 
--Colease se encarga que cuando el parametro es null regresa lo que se le pone en esta caso
--Si es null COALESCE regreara Pendiente

DELIMITER $$
CREATE PROCEDURE InsertarUsuario(
    IN p_firebase_uid VARCHAR(255),
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_email VARCHAR(255),
    IN p_rol ENUM('cliente', 'proveedor'),
    IN p_foto_perfil VARCHAR(512)
)
BEGIN
    INSERT INTO usuarios (firebase_uid, nombre, apellido, email, rol, foto_perfil)
    VALUES (p_firebase_uid, p_nombre, p_apellido, p_email, p_rol, p_foto_perfil);
END $$

DELIMITER $$
CREATE PROCEDURE InsertarCategoria(
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT
)
BEGIN
    INSERT INTO categorias (nombre, descripcion)
    VALUES (p_nombre, p_descripcion);
END $$

DELIMITER $$
CREATE PROCEDURE InsertarServicio(
    IN p_titulo VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_latitud DECIMAL(9,6),
    IN p_longitud DECIMAL(9,6),
    IN p_fecha_limite DATE,
    IN p_cliente_id INT,
    IN p_categoria_id INT
)
BEGIN
    INSERT INTO servicios (titulo, descripcion, ubicacion, fecha_limite, cliente_id, categoria_id)
    VALUES (
        p_titulo,
        p_descripcion,
        ST_GeomFromText(CONCAT('POINT(', p_longitud, ' ', p_latitud, ')'), 4326),
        p_fecha_limite,
        p_cliente_id,
        p_categoria_id
    );
END $$

DELIMITER $$
CREATE PROCEDURE InsertarPropuestaServicio(
    IN p_descripcion TEXT,
    IN p_precio DECIMAL(10,2),
    IN p_solicitud_id INT,
    IN p_proveedor_id INT,
    IN p_estado ENUM('pendiente', 'aceptada', 'rechazada'),
    IN p_fecha_completado DATETIME
)
BEGIN
    INSERT INTO propuestas_servicio (descripcion, precio, estado, fecha_completado, solicitud_id, proveedor_id)
    VALUES (
        p_descripcion,
        p_precio,
        COALESCE(p_estado, 'pendiente'),  --Si es null COALESCE regreara Pendiente
        p_fecha_completado,
        p_solicitud_id,
        p_proveedor_id
    );
END $$


DELIMITER $$
CREATE PROCEDURE InsertarRating(
    IN p_puntuacion INT,
    IN p_comentario TEXT,
    IN p_usuario_id INT,
    IN p_usuario_calificado_id INT,
    IN p_servicio_id INT
)
BEGIN
    INSERT INTO ratings (puntuacion, comentario, usuario_id, usuario_calificado_id, servicio_id)
    VALUES (p_puntuacion, p_comentario, p_usuario_id, p_usuario_calificado_id, p_servicio_id);
END $$
DELIMITER ;