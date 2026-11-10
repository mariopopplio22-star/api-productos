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
const listarProductos = async(req, res) => {
  //Se utiliza try - catch porque existe una probabilidad de error 
  try{
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id')
    res.status(200).json({
      ok:true,
      total: productos.length,
      data: productos
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const obtenerProducto = async(req, res) => {
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const crearProducto = async(req, res) => {
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const actualizarProducto = async(req, res) => {
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const eliminarProducto = async(req, res) => {
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

//Todos los metodos deben ser EXPORTADOS (se utilizaran desde la app)
//el que lo utilozara sera los 'routes'
module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}