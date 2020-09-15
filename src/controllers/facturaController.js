export default class FacturaController {

    static crearFactura(req, res) {
        let factura = req.body;
        req.getConnection((error, connection) => {
            connection.query('INSERT INTO facturas(creado, cliente_id, empleado_id, estado) VALUES(?, ?, ?, ?)',
                [factura.creado, factura.cliente_id, factura.empleado_id, factura.estado], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Creado exitosamente'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }

    static obtenerFacturasCliente(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM facturas WHERE cliente_id = ?', [req.params.id], (error, facturas) => {
                if (!error) {
                    res.status(200).send(facturas);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static obtenerFacturasEmpleado(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM facturas WHERE empleado_id = ?', [req.params.id], (error, facturas) => {
                if (!error) {
                    res.status(200).send(facturas);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static obtenerFactura(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM facturas WHERE id = ?', [req.params.id], (error, factura) => {
                if (!error) {
                    res.status(200).send(factura);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static actualizarFactura(req, res) {
        let id = req.params.id;
        let factura = req.body;
        req.getConnection((error, connection) => {
            connection.query('UPDATE facturas SET creado = ?, cliente_id = ?, empleado_id = ?, estado = ? WHERE id = ?',
                [factura.creado, factura.cliente_id, factura.empleado_id, factura.estado, id], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Actualizado exitosamente'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }

    static actualizarEstadoFactura(req, res) {
        let id = req.params.id;
        let factura = req.body;
        req.getConnection((error, connection) => {
            connection.query('UPDATE facturas SET estado = ? WHERE id = ?',
                [factura.estado, id], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Actualizado exitosamente'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }

    static eliminarFactura(req, res) {
        let id = req.params.id;
        let estado = 'ANULADA';
        req.getConnection((error, connection) => {
            connection.query('UPDATE facturas SET estado = ? WHERE id = ?',
                [estado, id], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Anulada exitosamente'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }
}