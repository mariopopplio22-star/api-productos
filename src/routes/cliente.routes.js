const { Router } = require('express');
const { 
    listarClientes, 
    obtenerCliente, 
    crearCliente, 
    actualizarCliente, 
    eliminarCliente 
} = require('../controllers/cliente.controller');

const router = Router();

router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router; // 👈 Esto es vital para que el index.js lo pueda leer