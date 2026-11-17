# API de productos

API REST para administrar información de una tienda con Node.js, Express y MySQL. La aplicación incluye operaciones CRUD para productos, clientes y proveedores.

## Requisitos

- Node.js y npm
- MySQL

## Instalación

1. Instale las dependencias con `npm install`.
2. Ejecute el script `database/db.sql` en MySQL para crear la base `tiendaperu`, sus tablas y los datos de ejemplo.
3. Si sus datos de conexión son distintos a los valores predeterminados, configure estas variables en un archivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=tiendaperu
DB_CONNECTION_LIMIT=10
```

4. Inicie el servidor con `node src/server.js`.

## Rutas de proveedores

Todas las rutas usan el prefijo `/api/proveedores`:

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | `/api/proveedores` | Listar proveedores |
| GET | `/api/proveedores/:id` | Obtener un proveedor |
| POST | `/api/proveedores` | Crear un proveedor |
| PUT | `/api/proveedores/:id` | Actualizar un proveedor |
| DELETE | `/api/proveedores/:id` | Eliminar un proveedor |

Para crear o actualizar, envíe un JSON con `razonsocial`, `contacto`, `ruc` y `direccion`. La tabla también registra `create_at` y `updated_at`.

Ejemplo de cuerpo:

```json
{
  "razonsocial": "Distribuidora Andina S.A.C.",
  "contacto": "Luis Mendoza",
  "ruc": "20123456789",
  "direccion": "Av. Argentina 1850, Cercado de Lima"
}
```

## Otras rutas

- Productos: `/api/productos`
- Clientes: `/api/clientes`
