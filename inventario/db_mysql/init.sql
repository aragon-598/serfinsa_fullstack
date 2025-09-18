
CREATE DATABASE IF NOT EXISTS inventario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE inventario;

CREATE TABLE tipo_producto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);


CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id BIGINT,
    CONSTRAINT fk_rol FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    tipo_producto_id BIGINT,
    CONSTRAINT fk_tipo_producto FOREIGN KEY (tipo_producto_id) REFERENCES tipo_producto(id)
);




INSERT INTO tipo_producto (nombre, descripcion) VALUES ('Electrónico', 'Productos electrónicos y tecnológicos');
INSERT INTO tipo_producto (nombre, descripcion) VALUES ('Ropa', 'Prendas de vestir y accesorios');
INSERT INTO tipo_producto (nombre, descripcion) VALUES ('Alimento', 'Productos alimenticios y bebidas');
INSERT INTO tipo_producto (nombre, descripcion) VALUES ('Hogar', 'Artículos para el hogar y decoración');
INSERT INTO tipo_producto (nombre, descripcion) VALUES ('Deporte', 'Equipos y accesorios deportivos');


INSERT INTO inventario.roles (nombre) VALUES
	 ('ROLE_ADMIN'),
	 ('ROLE_USER');
