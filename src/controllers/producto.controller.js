const db = require('../config/database'); // Asegúrate de que esta sea la ruta correcta a tu conexión de BD

// 1. Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos'); // Cambia 'productos' por el nombre de tu tabla
        res.status(200).json({
            ok: true,
            total: rows.length,
            data: rows
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

// 2. Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
        }

        res.status(200).json({
            ok: true,
            data: rows[0]
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

// 3. Crear un producto
const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body; // Ajusta según las columnas de tu tabla
        const [result] = await db.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', 
            [nombre, precio, stock]
        );

        res.status(201).json({
            ok: true,
            message: 'Producto creado correctamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

// 4. Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;

        const [result] = await db.query(
            'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
            [nombre, precio, stock, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, message: 'Producto no encontrado para actualizar' });
        }

        res.status(200).json({
            ok: true,
            message: `Producto ${id} actualizado correctamente`
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

// 5. Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM productos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, message: 'Producto no encontrado para eliminar' });
        }

        res.status(200).json({
            ok: true,
            message: `Producto ${id} eliminado correctamente`
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};