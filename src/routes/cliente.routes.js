const { Router } = require('express');
// Importas el controlador completo como un objeto
const clienteController = require('../controllers/cliente.controller');

const router = Router();

// Y llamas a cada función utilizando clienteController.[nombre_de_la_funcion]
router.get('/', clienteController.listar);
router.get('/:id', clienteController.obtener);
router.post('/', clienteController.crear);
router.put('/:id', clienteController.actualizar);
router.delete('/:id', clienteController.eliminar);

module.exports = router;