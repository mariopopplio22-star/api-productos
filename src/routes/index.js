const { Router } = require('express');
const productoRoutes = require('./producto.routes');
const clienteRoutes = require('./cliente.routes');

const router = Router();

router.use('/productos', productoRoutes);
router.use('/clientes', clienteRoutes);

module.exports = router;