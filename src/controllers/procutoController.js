export default class ProductoController {

    static crearProducto(req, res) {
        let producto = req.body;
        req.getConnection((error, connection) => {
            connection.query('INSERT INTO productos(nombre, precio, creado_por) VALUES(?, ?, ?)',
            [producto.nombre, producto.precio, producto.creado_por], error => {
                if (!error) {
                    res.status(200).send({mensaje: 'Creado exitosamente'});
                } else {
                    console.log(error);
                }
            });
        });
    }

    static obtenerProductos(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM productos', (error, productos) => {
                if (!error) {
                    res.status(200).send(productos);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static obtenerProducto(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (error, producto) => {
                if (!error) {
                    res.status(200).send(producto);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static actualizarProducto(req, res) {
        let id = req.params.id;
        let producto = req.body;
        req.getConnection((error, connection) => {
            connection.query('UPDATE productos SET nombre = ?, precio = ?, creado_por = ? WHERE id = ?',
            [producto.nombre, producto.precio, producto.creado_por, id], error => {
                if (!error) {
                    res.status(200).send({mensaje: 'Actualizado exitosamente'});
                } else {
                    console.log(error);
                }
            });
        });
    }

    static eliminarProducto(req, res) {
        req.getConnection((error, connection) => {
            connection.query('DELETE FROM productos WHERE id = ?', [req.params.id], error => {
                if (!error) {
                    res.status(200).send({mensaje: 'Eliminado exitosamente'});
                } else {
                    console.log(error);
                }
            });
        });
    }
}