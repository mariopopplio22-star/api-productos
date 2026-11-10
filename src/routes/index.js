// 1. Importar el Router de express
const { Router } = require('express');

// 2. Importar tus rutas de módulos
const productoRoutes = require('./producto.routes');

// 3. Declarar el router UNA SOLA VEZ
const router = Router();

// 4. Usar las rutas
router.use('/productos', productoRoutes);

// 5. Exportarlo
module.exports = router;