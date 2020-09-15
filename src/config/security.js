import jwt from "jsonwebtoken";
import llave from "./llave.js";

export default class Security {

    static autenticar(req, res) {
        let user = req.body;
        req.getConnection((error, connection) => {
            connection.query('SELECT * FROM usuarios WHERE nombre = ? AND password = ?', 
            [user.nombre, user.password], (error, usuario) => {
                if (!error) {
                    console.log(usuario);
                    if (usuario.length > 0) {
                        const payload = {
                            check: true
                        };
                        const token = jwt.sign(payload, llave.secret, { expiresIn: '1h' });
                        res.status(200).send({
                            mensaje: 'Autenticación correcta',
                            token: token
                        });
                    } else {
                        res.status(401).send('Datos invalidos');
                    }
                } else {
                    console.log(error);
                }
            });
        });
    }

    static tokenValido(req, res) {
        const token = req.headers['access-token'];
        if (token) {
            jwt.verify(token, llave.secret, (err, decoded) => {
                if (err) {
                    res.send({ mensaje: 'Token invalido' });
                } else {
                    req.decoded = decoded;
                    res.send({ mensaje: 'Token valido' });
                }
            });
        } else {
            res.send({
                mensaje: 'Token no proveido'
            });
        }
    }

    static protegerRutas(req, res, next) {
        const token = req.headers['access-token'];
        if (token) {
            jwt.verify(token, llave.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ mensaje: 'Token invalido' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(401).send({
                mensaje: 'Token no proveido'
            });
        }
    }
}