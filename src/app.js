const express = require('express'); // Framework
const routes = require('./routes/producto.routes'); // Rutas

const app = express(); // Inicializamos la App

app.use(express.json()); // Comunicación es JSON

// Mensaje predeterminado
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'API REST ejecutandose correctamente'
    });
});

// Habilitamos las rutas de los modulos
app.use('/api', routes);

module.exports = app;