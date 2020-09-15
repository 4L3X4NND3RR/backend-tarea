export default class ProductosFacturaController {

    static crearProductoFactura(req, res) {
        let factura_id = req.params.id;
        let p_factura = req.body;
        req.getConnection((error, connection) => {
            connection.query('INSERT INTO productos_facturas(factura_id, producto_id, cantidad, subtotal, creado_por) VALUES(?, ?, ?, ?, ?)',
                [factura_id, p_factura.producto_id, p_factura.cantidad, p_factura.subtotal, p_factura.creado_por], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Creado exitosamente'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }

    static obtenerProductosFactura(req, res) {
        let fatura_id = req.params.id;
        req.getConnection((error, connection) => {
            let query = 'SELECT f.id, f.cliente_id, f.empleado_id, pf.producto_id, p.nombre, p.precio, pf.cantidad, pf.subtotal FROM productos_facturas AS pf INNER JOIN facturas AS f ON f.id = pf.factura_id INNER JOIN productos AS p ON p.id = pf.producto_id WHERE pf.factura_id = ?';
            connection.query(query, [fatura_id], (error, data) => {
                if (!error) {
                    res.status(200).send(data);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static eliminarProductoFactura(req, res) {
        let factura_id = req.params.id;
        let producto_id = req.query.id_producto;
        req.getConnection((error, connection) => {
            connection.query('DELETE FROM productos_facturas WHERE factura_id = ? AND producto_id = ?',
                [factura_id, producto_id], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Eliminado exitosamente'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }
}