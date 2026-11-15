const pool = require('../config/database');
// 1. Listar todos los clientes
const listar = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los clientes', error: error.message });
    }
};

// 2. Obtener un cliente por su ID
const obtener = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
    }
};

// 3. Crear un nuevo cliente
const crear = async (req, res) => {
    try {
        const { apellidos, nombres, telefono, direccion, email } = req.body;
        const [result] = await pool.query(
            'INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES (?, ?, ?, ?, ?)',
            [apellidos, nombres, telefono, direccion, email]
        );
        res.status(201).json({ 
            message: 'Cliente creado con éxito', 
            id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
    }
};

// 4. Actualizar un cliente existente
const actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { apellidos, nombres, telefono, direccion, email } = req.body;
        
        const [result] = await pool.query(
            'UPDATE clientes SET apellidos = ?, nombres = ?, telefono = ?, direccion = ?, email = ? WHERE id = ?',
            [apellidos, nombres, telefono, direccion, email, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado para actualizar' });
        }
        res.json({ message: 'Cliente actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
};

// 5. Eliminar un cliente
const eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado para eliminar' });
        }
        res.json({ message: 'Cliente eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
};

module.exports = {
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
};