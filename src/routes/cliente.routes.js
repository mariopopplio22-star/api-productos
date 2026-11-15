const { Router } = require('express');
const clienteController = require('../controllers/cliente.controller');

const router = Router();

router.get('/', clienteController.listar);
router.get('/:id', clienteController.obtener);
router.post('/', clienteController.crear);
router.put('/:id', clienteController.actualizar);
router.delete('/:id', clienteController.eliminar);

// ¡ESTA LÍNEA ES VITAL! Si falta, Express da 404
module.exports = router;