//Este archivo contiene la logica de la aplicación
// 5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//PASO 1
//const Objeto = requiere ('') //TODOS LOS METODOS
//const {otroObjeto} = requiere ('') //SOLO ALGUNAS FUNCIONES
const {pool} = require ('/../config/database')
const CAMPOS = 'id, marca, descripcion, precio, stock' //DATO COMUN

//Todas las funciones seran asíncronas (tardaran un tiempo en ser resueltas...)
//milisegundos, segundos (1000 =1sg)
//Todas las funciones reciben y envian datos (pasarelas)
//req (requiere - >>> solicitar), res (result - <<< resultado)
const listarProductos = async(req, res) => {}

const obtenerProducto = async(req, res) => {}

const crearProducto = async(req, res) => {}

const actualizarProducto = async(req, res) => {}

const eliminarProducto = async(req, res) => {}

//Todos los metodos deben ser EXPORTADOS (se utilizaran desde la app)
//el que lo utilozara sera los 'routes'
module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}