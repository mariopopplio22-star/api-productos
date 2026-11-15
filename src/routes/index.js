const { Router } = require('express');
const productoRoutes = require('./producto.routes');
const clienteRoutes = require('./cliente.routes'); // 👈 Verifica que esto esté escrito exactamente así

const router = Router();

router.use('/productos', productoRoutes);
router.use('/clientes', clienteRoutes); // 👈 Y esto de aquí

module.exports = router;