const { Router } = require('express')
const {
  listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} = require('../controllers/proveedor.controller')

const router = Router()

router.get('/', listarProveedores)
router.get('/:id', obtenerProveedor)
router.post('/', crearProveedor)
router.put('/:id', actualizarProveedor)
router.delete('/:id', eliminarProveedor)

module.exports = router
