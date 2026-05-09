CREATE DATABASE FootballManagerSystem;
GO

USE FootballManagerSystem;
GO

CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(50) NOT NULL
);

INSERT INTO roles (nombre) 
	VALUES ('Jugador'),('Entrenador'),('Admin'),('User');

CREATE TABLE Usuarios (
    Id INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Password  NVARCHAR(300) NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activo',
    RolId INT NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (RolId) REFERENCES Roles(Id)
);

CREATE TABLE Categorias (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200) NULL,

    FechaCreacion DATETIME DEFAULT GETDATE(),

    CONSTRAINT UQ_Categorias_Nombre UNIQUE (Nombre)
);

CREATE TABLE Estadios (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    FechaApertura DATE NULL,
    Anio INT NULL,
    Ciudad NVARCHAR(100) NOT NULL,
    Pais NVARCHAR(100) NOT NULL,
    Capacidad INT NOT NULL,
    FotoUrl NVARCHAR(300) NULL,
    Estado NVARCHAR(20) DEFAULT 'Disponible',
    CONSTRAINT CK_Estadio_Capacidad 
        CHECK (Capacidad > 0),

    CONSTRAINT CK_Estadio_Estado
        CHECK (Estado IN ('Disponible', 'Mantenimiento', 'Suspendido','Cerrado'))
);