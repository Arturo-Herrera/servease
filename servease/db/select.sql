Create view vw_listeningServices as
SELECT 
        id, 
        titulo, 
        descripcion, 
        ST_AsText(ubicacion) AS ubicacion, 
        fecha_limite, 
        categoria_id 
    FROM 
        servicios 
    WHERE 
        cliente_id = ? AND 
        fecha_limite >= CURDATE();
