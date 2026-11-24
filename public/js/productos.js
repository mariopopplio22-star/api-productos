const API = "/api/productos";

//Gestión del DOM
const formProducto = document.getElementById("formProducto");
const formBuscar = document.getElementById("formBuscar");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const mostrarTodos = document.getElementById("mostrarTodos");
const campoID = document.getElementById("id");

//Renderiza los datos obtenidos API REST en el cuerpo de la tabla
function dibujarTabla(productos) {
  //Si no hay productos registrados en la BD...
  if (productos.length === 0) {
    cuerpoTabla.innerHTML = `<tr><td colspan='6' class='text-center'>No hay productos</td></tr>`;
    return;
  }

  cuerpoTabla.innerHTML = "";

  //Si encontramos productos (al menos 1)
  //el type='button' requiere control desde JS
  productos.forEach((p) => {
    cuerpoTabla.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.marca}</td>
            <td>${p.descripcion}</td>
            <td>${p.precio}</td>
            <td>${p.stock}</td>
            <td>
                <button type='button' onclick='editarProducto(${p.id})' class='btn-sm btn-solid theme-primary'>Editar</button>
                <button type='button' onclick='eliminarProducto(${p.id})' class='btn-sm btn-outline theme-danger'>Eliminar</button>
            </td>
        </tr>
    `;
  });
} //fin deibujarTabla

//BUSCADOR...
//Conectamos al BACKEND para buscar el ID
async function editarProducto(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("EL ID no corresponde a ningún producto");
      return;
    }

    //En caso exista
    const producto = resultado.data;

    //Campos formulario <- Atributos del objeto
    campoID.value = producto.id;
    marca.value = producto.marca;
    descripcion.value = producto.descripcion;
    precio.value = producto.precio;
    stock.value = producto.stock;
  } catch (e) {
    console.error(e);
  }
}

// Eliminación física → BACKEND
async function eliminarProducto(id) {
  const rpt = confirm("¿Está seguro de eliminar?");
  if (!rpt) return;

  try {
    const respuesta = await fetch(`${API}/${id}`, { method: "DELETE" });
    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("No se pudo eliminar");
      return;
    }

    cargarProductos();
    alert(resultado.message);
  } catch (e) {
    console.error(e);
  }
}
//¿Cómo accedemos a los datos? -> BACKEND
async function cargarProductos() {
  try {
    //http://localhost:3000 <-> https://miempresa.com
    //agregar el valor de API
    const respuesta = await fetch(API);
    const resultado = await respuesta.json();
    dibujarTabla(resultado.data);
    console.log(resultado);
  } catch (e) {
    console.error(e);
  }
}
//Función para registrar un nuevo producto -> BACKEND
async function guardarProducto() {
  // Crear objeto JS -> enviar datos
  const producto = {
    marca: marca.value,
    descripcion: descripcion.value,
    precio: parseFloat(precio.value),
    stock: parseInt(stock.value),
  };

  try {
    //Debemos evaluar si registramos o actualizamos un producto
    const editando = campoID.value !== "";

    //Construiremos una URL que varía en función de la acción
    const url = editando ? `${API}/?${campoID.value}` : API;

    //El método puede variar
    const metodo = editando ? "PUT" : "POST";

    //Enviamos por el método POST, un JSON, convertido del objeto "producto"
    const respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("No se pudo registrar el producto");
      return;
    }

    //Actualizamos la lista
    cargarProductos();
    formProducto.reset();
    marca.focus();
  } catch (e) {
    console.error(e);
  }
}

// Búsqueda a través de API -> BACKEND
async function buscarProducto(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    // data es un objeto {} por lo que lo enviamos como arreglo [{}]
    dibujarTabla([resultado.data]);
  } catch (e) {
    console.error(e);
  }
}

formBuscar.addEventListener("submit", function (e) {
  e.preventDefault();
  buscarProducto(buscarId.value);
});

// Controla el evento SUBMIT (envío) del formulario
formProducto.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop
  const rpt = confirm("¿Está seguro de guardar?");
  if (!rpt) return;
  guardarProducto(); // Esta función gestiona el proceso
});

cargarProductos();