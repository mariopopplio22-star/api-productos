const express = require('express'); 
const routes = require('./routes'); // Importa el index.js de la carpeta routes

const app = express(); 

// Middleware indispensable para que Express entienda JSON en las peticiones POST, PUT, etc.
app.use(express.json()); 

// Ruta raíz de bienvenida (esta es la que te responde cuando entras a http://localhost:3000/)
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'API REST ejecutandose correctamente'
    });
});

// Prefijo global para todas tus rutas de la aplicación: /api
app.use('/api', routes);

module.exports = app;