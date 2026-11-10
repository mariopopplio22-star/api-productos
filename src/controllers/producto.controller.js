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

//crear - actualizar
const validarCampos = ({marca, descripcion, precio, stock} = {}) =>{
  const errores = []
  if (marca.trim() === '') errores.push('La marca es obligatoria')
  if (descripcion.trim() === '')errores.push('La descripción es necesaria')
  if (precio ===undefined || isNaN(precio) || precio < 0) errores.push('Verifique el precio')
  if (stock === undefined || !Number.isInteger(stock) || Number(stock) <0) errores.push('Error en el stock')
    
  return errores  
}
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

//Buscar ¿Cómo funciona?
//API REST => https://miaplicacion.com/api/productos/1
const obtenerProducto = async(req, res) => {
  try{
    //req.params representa los parámetros enviados por la URL
    const id = Number(req.params.id)
    if (id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El ID no puede ser negativo o 0'
      })
    }

    //Si podemos buscar (>0). Utilizaremos EXECUTE porque pasaremos parametros
    //Evitaremos SQLinjection (tecnica hackeo)
    //? = comodín, representa un valor
    const [registro] = await pool.execute(`SELECT * FROM productos WHRERE id = ?`, [id])

    //Existe la posibilidad que NO encontremos el registro 
    if (registro.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el producto'
      })
    }

    //Si llegamos hasta aqui entonces si existe el registro
    res.status(200).json({
      ok: true,
      data: registro[0]
    })
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
    const errores = validarCampos(req.body) //req.body contiene todos los datos a registrar
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verificar los datos solicitados',
        errores
      })
    }

    //Procedemos a guardar los datos
    const {marca,descripcion, precio, stock} = req.body
    const consulta = `INSERT INTO productos (marca, descripcion, precio, stock) VALUES (?,?,?,?)`
    const [registro] = await pool.execute(consulta, [marca, descripcion, precio, stock])

    res.status(201).json({
      ok: true,
      id: registro.insertId
    })
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
    const id = Number(req.params.id)

    if (id < 0){
      return res.status(400).json({
        ok: false,
        message: 'El id no puede ser negativo'
      })
    }
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }

  //Validar los campos (crearProducto)
const errores = validarCampos(req.body) //req.body contiene todos los datos a registrar
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verificar los datos solicitados',
        errores
      })
    }

    //¿Y si el ID no existe?
    const [existe] = await pool.execute('SELECT id FROM productos WHERE id = ?', [id])
    if (existe === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }

    //Finalmente actualizaremos....
    const consulta = 'UPDATE productos SET marca=?, descripcion=?, precio=?, stock=? WHERE id=?'
    const {marca, descripcion, precio, stock} = req.body
    const [resultado] = await pool.execute(consulta, [marca, descripcion, precio, stock, id])

    res.status(204).json({
      ok: true,
      filasAfectadas: resultado.affectedRows
    })
}


const eliminarProducto = async(req, res) => {
  try{
    const id = Number(req.params.id)

    const [resultado] = await pool.execute('DELETE FROM productos WHERE id = ?', [id])

    if(resultado.affectedRows === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }
    
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