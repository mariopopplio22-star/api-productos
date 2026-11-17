const { Router } = require('express');
const productoRoutes = require('./producto.routes');
const clienteRoutes = require('./cliente.routes');
const proveedorRoutes = require('./proveedor.routes');

const router = Router();

router.use('/productos', productoRoutes);
router.use('/clientes', clienteRoutes);
router.use('/proveedores', proveedorRoutes);

module.exports = router;
