//Este archivo contiene la logica de la aplicación
// 5 procedimientos: buscar, listar, registrar, actualizar, eliminar

const {pool} = require ('../config/database') // Corregido el path relativo
const CAMPOS = 'id, marca, descripcion, precio, stock' //DATO COMUN

//crear - actualizar
const validarCampos = ({marca, descripcion, precio, stock} = {}) =>{
  const errores = []
  if (!marca || marca.trim() === '') errores.push('La marca es obligatoria')
  if (!descripcion || descripcion.trim() === '') errores.push('La descripción es necesaria')
  if (precio === undefined || isNaN(precio) || precio < 0) errores.push('Verifique el precio')
  if (stock === undefined || !Number.isInteger(Number(stock)) || Number(stock) < 0) errores.push('Error en el stock')
    
  return errores  
}

const listarProductos = async(req, res) => {
  try{
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id')
    res.status(200).json({
      ok: true,
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
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El ID no puede ser negativo, cero o inválido'
      })
    }

    const [registro] = await pool.execute(`SELECT * FROM productos WHERE id = ?`, [id])

    if (registro.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el producto'
      })
    }

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
    const errores = validarCampos(req.body)
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verificar los datos solicitados',
        errores
      })
    }

    const {marca, descripcion, precio, stock} = req.body
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
  try {
    const id = Number(req.params.id)

    if (isNaN(id) || id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El id no puede ser negativo, cero o inválido'
      })
    }

    // Validar los campos enviados en el body
    const errores = validarCampos(req.body)
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verificar los datos solicitados',
        errores
      })
    }

    const [existe] = await pool.execute('SELECT id FROM productos WHERE id = ?', [id])
    if (existe.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }

    const consulta = 'UPDATE productos SET marca=?, descripcion=?, precio=?, stock=? WHERE id=?'
    const {marca, descripcion, precio, stock} = req.body
    const [resultado] = await pool.execute(consulta, [marca, descripcion, precio, stock, id])

    res.status(200).json({
      ok: true,
      message: 'Producto actualizado correctamente',
      filasAfectadas: resultado.affectedRows
    })

  } catch(e) {
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const eliminarProducto = async(req, res) => {
  try{
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'ID inválido'
      })
    }

    const [resultado] = await pool.execute('DELETE FROM productos WHERE id = ?', [id])

    if(resultado.affectedRows === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }
    
    res.status(200).json({
      ok: true,
      message: 'Producto eliminado correctamente'
    })

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}