CREATE DATABASE tiendaperu;
USE tiendaperu;

CREATE TABLE IF NOT EXISTS productos
(
	id 				INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca 			VARCHAR(100) 	NOT NULL,
    descripcion 	VARCHAR(200) 	NOT NULL,
    precio			DECIMAL(10,2)	NOT NULL,
    stock			INT UNSIGNED 	NOT NULL DEFAULT 0,
    create_at		DATETIME		NOT NULL DEFAULT NOW(),
    update_at  		DATETIME		NULL
    
)ENGINE = INNODB;

INSERT INTO productos
(marca, descripcion, precio, stock)
VALUES
('Samsung', 'TV 55', 2500, 10),
('LG', 'Lavadora', 1200, 3),
('Sony', 'Playstation 5', 3200, 2);

SELECT * FROM productos;

CREATE TABLE IF NOT EXISTS clientes
(
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellidos   VARCHAR(100) NOT NULL,
    nombres     VARCHAR(100) NOT NULL,
    telefono    VARCHAR(20)  NOT NULL,
    direccion   VARCHAR(200) NOT NULL,
    email       VARCHAR(150) NOT NULL,
    create_at   DATETIME     NOT NULL DEFAULT NOW(),
    updated_at  DATETIME     NULL
) ENGINE = INNODB;

INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES
('Taboada Mamani', 'Alexander Carlos', '987654321', 'Av. Javier Prado Este 1200, San Isidro', 'jquispe@gmail.com'),
('Flores Achíc', 'María Elena', '912345678', 'Jr. de la Unión 450, Cercado de Lima', 'mflores@yahoo.com'),
('García Uceda', 'Dylan Alberto', '998877665', 'Calle Los Pinos 304, Miraflores', 'lgarcia@outlook.com');

SELECT * FROM clientes;

CREATE TABLE IF NOT EXISTS proveedores
(
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    razonsocial VARCHAR(200) NOT NULL,
    contacto    VARCHAR(150) NOT NULL,
    ruc         VARCHAR(11)  NOT NULL,
    direccion   VARCHAR(200) NOT NULL,
    create_at   DATETIME     NOT NULL DEFAULT NOW(),
    updated_at  DATETIME     NULL
) ENGINE = INNODB;

INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES
('Distribuidora Andina S.A.C.', 'Luis Mendoza', '20123456789', 'Av. Argentina 1850, Cercado de Lima'),
('Comercial del Pacífico E.I.R.L.', 'Rosa Salazar', '20456789123', 'Jr. Paruro 720, Cercado de Lima'),
('Tecnología Peruana S.A.C.', 'Carlos Herrera', '20678912345', 'Av. Arequipa 2450, Lince');

SELECT * FROM proveedores;

