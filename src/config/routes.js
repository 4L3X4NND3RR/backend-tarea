import Router from "express";
import ClienteController from "../controllers/clienteController.js";
import EmpleadoController from "../controllers/empleadoController.js";
import ProductoController from "../controllers/procutoController.js";
import FacturaController from "../controllers/facturaController.js";
import ProductosFacturaController from "../controllers/productosFacturaController.js";
import Security from "./security.js";
const router = new Router();
const routerAuth = new Router();

// middleware para rutas
routerAuth.use((req, res, next) => {
    Security.protegerRutas(req, res, next);
});

// rutas para jsw
router.post('/autenticacion', (req, res) => {
    Security.autenticar(req, res);
});

router.get('/verificacion', (req, res) => {
    Security.tokenValido(req, res);
});
 
// rutas para clientes
router.post('/clientes', routerAuth, (req, res) => {
    ClienteController.crearCliente(req, res);
});

router.get('/clientes', routerAuth, (req, res) => {
    ClienteController.obtenerClientes(req, res);
});

router.get('/clientes/:id', routerAuth, (req, res) => {
    ClienteController.obtenerCliente(req, res);
});

router.put('/clientes/:id', routerAuth, (req, res) => {
    ClienteController.actualizarCliente(req, res);
});

router.delete('/clientes/:id', routerAuth, (req, res) => {
    ClienteController.eliminarCliente(req, res);
});

// rutas para empleados
router.post('/empleados', routerAuth, (req, res) => {
    EmpleadoController.crearEmpleado(req, res);
});

router.get('/empleados', routerAuth, (req, res) => {
    EmpleadoController.obtenerEmpleados(req, res);
});

router.get('/empleados/:id', routerAuth, (req, res) => {
    EmpleadoController.obtenerEmpleado(req, res);
});

router.put('/empleados/:id', routerAuth, (req, res) => {
    EmpleadoController.actualizarEmpleado(req, res);
});

router.delete('/empleados/:id', routerAuth, (req, res) => {
    EmpleadoController.eliminarEmpleado(req, res);
});

// rutas para productos
router.post('/productos', routerAuth, (req, res) => {
    ProductoController.crearProducto(req, res);
});

router.get('/productos', routerAuth, (req, res) => {
    ProductoController.obtenerProductos(req, res);
});

router.get('/productos/:id', routerAuth, (req, res) => {
    ProductoController.obtenerProducto(req, res);
});

router.put('/productos/:id', routerAuth, (req, res) => {
    ProductoController.actualizarProducto(req, res);
});

router.delete('/productos/:id', routerAuth, (req, res) => {
    ProductoController.eliminarProducto(req, res);
});

// rutas para facturas
router.post('/facturas', routerAuth, (req, res) => {
    FacturaController.crearFactura(req, res);
});

router.get('/clientes/:id/facturas', routerAuth, (req, res) => {
    FacturaController.obtenerFacturasCliente(req, res);
});

router.get('/empleados/:id/facturas', routerAuth, (req, res) => {
    FacturaController.obtenerFacturasEmpleado(req, res);
});

router.get('/facturas/:id', routerAuth, (req, res) => {
    FacturaController.obtenerFactura(req, res);
});

router.put('/facturas/:id', routerAuth, (req, res) => {
    FacturaController.actualizarFactura(req, res);
});

router.patch('/facturas/:id', routerAuth, (req, res) => {
    FacturaController.actualizarEstadoFactura(req, res);
});

router.delete('/facturas/:id', routerAuth, (req, res) => {
    FacturaController.eliminarFactura(req, res);
});

// rutas para productos factura
router.post('/facturas/:id/detalle', routerAuth, (req, res) => {
    ProductosFacturaController.crearProductoFactura(req, res);
});

router.get('/facturas/:id/productos', routerAuth, (req, res) => {
    ProductosFacturaController.obtenerProductosFactura(req, res);
});

router.delete('/facturas/:id/detalle', routerAuth, (req, res) => {
    ProductosFacturaController.eliminarProductoFactura(req, res);
});

export default router;