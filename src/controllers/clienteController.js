export default class ClienteController {

    static crearCliente(req, res) {
        let cliente = req.body;
        req.getConnection((error, connection) => {
            connection.query('INSERT INTO clientes(nombre, direccion, nit, creado_por) VALUES(?, ?, ?, ?)', 
            [cliente.nombre, cliente.direccion, cliente.nit, cliente.creado_por], error => {
                if (!error) {
                    res.status(200).send({mensaje: 'Creado exitosamente'});
                } else {
                    console.log(error);
                }
            });
        });
    }

    static obtenerClientes(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM clientes', (error, clientes) => {
                if (!error) {
                    res.status(200).send(clientes);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static obtenerCliente(req, res) {
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM clientes WHERE id = ?', [req.params.id], (error, cliente) => {
                if (!error) {
                    res.status(200).send(cliente);
                } else {
                    console.log(error);
                }
            });
        });
    }

    static actualizarCliente(req, res) {
        let id = req.params.id;
        let cliente = req.body;
        req.getConnection((error, connection) => {
            connection.query('UPDATE clientes SET nombre = ?, direccion = ?, nit = ?, creado_por = ? WHERE id = ?',
            [cliente.nombre, cliente.direccion, cliente.nit, cliente.creado_por,id], error => {
                if (!error) {
                    res.status(200).send({mensaje: 'Actualizado exitosamente'});
                } else {
                    console.log(error);
                }
            });
        });
    }

    static eliminarCliente(req, res) {
        req.getConnection((error, connection) => {
            connection.query('DELETE FROM clientes WHERE id = ?', [req.params.id], error => {
                if (!error) {
                    res.status(200).send({mensaje: 'Eliminado exitosamente'});
                } else {
                    console.log(error);
                }
            });
        });
    }
}