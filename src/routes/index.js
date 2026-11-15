const { Router } = require('express');
const productoRoutes = require('./producto.routes'); // Asegúrate de que el nombre del archivo coincida exactamente

const router = Router();


router.use('/productos', productoRoutes);

module.exports = router;