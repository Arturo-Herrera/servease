--ST_GeomFromText Mire que es lo que usa para las ubicaciones 
--Colease se encarga que cuando el parametro es null regresa lo que se le pone en esta caso
--Si es null COALESCE regreara Pendiente

DELIMITER $$

CREATE PROCEDURE ActualizarUsuario(
    IN p_id INT,
    IN p_firebase_uid VARCHAR(255),
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_email VARCHAR(255),
    IN p_rol ENUM('cliente', 'proveedor'),
    IN p_foto_perfil VARCHAR(512)
)
BEGIN
    UPDATE usuarios
    SET 
        firebase_uid = p_firebase_uid,
        nombre = p_nombre,
        apellido = p_apellido,
        email = p_email,
        rol = p_rol,
        foto_perfil = p_foto_perfil
    WHERE id = p_id;
END $$

CREATE PROCEDURE ActualizarCategoria(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT
)
BEGIN
    UPDATE categorias
    SET 
        nombre = p_nombre,
        descripcion = p_descripcion
    WHERE id = p_id;
END $$

CREATE PROCEDURE ActualizarServicio(
    IN p_id INT,
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
        COALESCE(p_estado, 'pendiente'), 
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