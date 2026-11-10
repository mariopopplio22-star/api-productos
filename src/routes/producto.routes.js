

const {router} = require('express') //Manejador de rutas
const controller = require('../controllers/producto.controller') //Controlador (lógica)

const router = Router() //Considerar los verbos

router.get('/', controller.listarProductos)
router.get('/:id', controller.obtenerProducto)
router.post('/.', controller.crearProducto)

//Pendiente.... PUT, POST, DELETE

module.exports = router