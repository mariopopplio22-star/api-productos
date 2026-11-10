//app = apllication
const express = require('express')  //Framework
const routes = requiere('./routes') //Rutas

const app = express() //Inicializamos la App

app.use(express.json()) //Comunicación es JSON

//Mensaje predeterminado 
//https://miaplicacion.com/
app.get('/', (req, res) => {
 res.status(200).json({
  ok: true,
  message: 'API REST ejecutandose correctamente'
 })
})

//Habilitamos las rutas de todos los modulos (index.js)
app.use('/api', routes)
module.exports = app
