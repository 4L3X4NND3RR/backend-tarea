export default class EmpleadoController {

    static crearEmpleado(req, res) {
        let empleado = req.body;
        req.getConnection((error, connection) => {
            connection.query('INSERT INTO empleados(codigo, nombre, salario, creado_por) VALUES(?, ?, ?, ?)',
                [empleado.codigo, empleado.nombre, empleado.salario, empleado.creado_por], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Creado exitosamente'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }

    static obtenerEmpleados(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM empleados', (error, empleados) => {
                if (!error) {
                    res.status(200).send(empleados);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static obtenerEmpleado(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM empleados WHERE id = ?', [req.params.id], (error, empleado) => {
                if (!error) {
                    res.status(200).send(empleado);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static actualizarEmpleado(req, res) {
        let id = req.params.id;
        let empleado = req.body;
        req.getConnection((error, connection) => {
            connection.query('UPDATE empleados SET codigo = ?, nombre = ?, salario = ?, creado_por = ? WHERE id = ?',
                [empleado.codigo, empleado.nombre, empleado.salario, empleado.creado_por, id], error => {
                    if (!error) {
                        res.status(200).send({mensaje: 'Actualizado con exito'});
                    } else {
                        console.log(error);
                    }
                });
        });
    }

    static eliminarEmpleado(req, res) {
        req.getConnection((error, connection) => {
            connection.query('DELETE FROM empleados WHERE id = ?', [req.params.id], error => {
                if (!error) {
                    res.status(200).send({mensaje: 'Eliminado exitosamente'});
                } else {
                    console.log(error);
                }
            });
        });
    }
}