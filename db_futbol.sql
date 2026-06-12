CREATE DATABASE FootballManagerSystem;
GO

USE FootballManagerSystem;
GO

-- TABLA ROLES
CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(50) NOT NULL
);

-- INSERTAR LOS ROLES
INSERT INTO roles (nombre) 
	VALUES ('Admin'),('User');

-- TABLA USUARIOS
CREATE TABLE Usuarios (
    Id INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Password  NVARCHAR(300) NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activo',
    RolId INT NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (RolId) REFERENCES Roles(Id)
);

--TABLA CATEGORIA

CREATE TABLE Categorias (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200) NULL,

    FechaCreacion DATETIME DEFAULT GETDATE(),

    CONSTRAINT UQ_Categorias_Nombre UNIQUE (Nombre)
);

-- TABLA ESTADIOS

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

-- TABLA PAISES

CREATE TABLE Paises (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    CodigoISO NVARCHAR(10) NULL -- PER, ESP, BRA
);

-- CIUDADES

CREATE TABLE Ciudades (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    PaisId INT NOT NULL,
    FOREIGN KEY (PaisId) REFERENCES Paises(Id)
);

-- TABLA PERSONAS
CREATE TABLE Personas (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(200) NOT NULL,
    FechaNacimiento DATE NULL,
    PaisNacimientoId INT NULL,
    CiudadNacimientoId INT NULL,
    FotoUrl NVARCHAR(300) NULL,
    Estado NVARCHAR(20) DEFAULT 'Activo',
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME NULL,

    FOREIGN KEY (PaisNacimientoId) REFERENCES Paises(Id),
    FOREIGN KEY (CiudadNacimientoId) REFERENCES Ciudades(Id),

    CONSTRAINT CK_Persona_Estado
        CHECK (Estado IN ('Activo', 'Inactivo', 'Retirado'))
);

-- TABLA ARBITROS

CREATE TABLE Arbitros (
    Id INT PRIMARY KEY IDENTITY,
    PersonaId INT NOT NULL UNIQUE,
    Categoria NVARCHAR(50) NULL,
    RolArbitral NVARCHAR(30) NULL,
    FechaDebut DATE NULL,
    FechaRetiro DATE NULL,
    AnosExperiencia INT DEFAULT 0,
    Nivel INT DEFAULT 50,
    Reputacion INT DEFAULT 50,
    PrecisionDecisiones INT DEFAULT 50,
    PartidosDirigidos INT DEFAULT 0,
    TarjetasAmarillas INT DEFAULT 0,
    TarjetasRojas INT DEFAULT 0,
    EstadoFisico NVARCHAR(20) DEFAULT 'Activo',
    Estado NVARCHAR(20) DEFAULT 'Activo',

    FOREIGN KEY (PersonaId)
        REFERENCES Personas(Id),

    CONSTRAINT CK_Arbitro_Estado
        CHECK (Estado IN ('Activo', 'Retirado')),

    CONSTRAINT CK_Arbitro_Rol
        CHECK (RolArbitral IN ('Principal', 'VAR', 'Asistente')),

    CONSTRAINT CK_Arbitro_Nivel
        CHECK (Nivel BETWEEN 1 AND 100),

    CONSTRAINT CK_Arbitro_Reputacion
        CHECK (Reputacion BETWEEN 1 AND 100),

);

-- TABLA ENTRENADORES

CREATE TABLE Entrenadores (
    Id INT PRIMARY KEY IDENTITY(1,1),  
    PersonaId INT NOT NULL UNIQUE,  
    EstiloJuego NVARCHAR(50) NULL,  
    SistemaTactico NVARCHAR(30) NULL,  
    Licencia NVARCHAR(50) NULL,  
    FechaDebut DATE NULL,  
    FechaRetiro DATE NULL,  
    AnosExperiencia INT DEFAULT 0,  
    Nivel INT DEFAULT 50,  
    Reputacion INT DEFAULT 50,  
    ManejoEquipo INT DEFAULT 50,  
    Motivacion INT DEFAULT 50,  
    Disciplina INT DEFAULT 50,  
    Adaptabilidad INT DEFAULT 50,  
    Estado NVARCHAR(20) DEFAULT 'Activo',  

    FOREIGN KEY (PersonaId) REFERENCES Personas(Id),  
    CONSTRAINT CK_Entrenador_Estado
        CHECK (Estado IN ('Activo', 'Retirado')),  

    CONSTRAINT CK_Entrenador_Nivel
        CHECK (Nivel BETWEEN 1 AND 100),  

    CONSTRAINT CK_Entrenador_Reputacion
        CHECK (Reputacion BETWEEN 1 AND 100)  
);

-- TABLA JUGADORES

CREATE TABLE Jugadores (
    Id INT PRIMARY KEY IDENTITY,
    PersonaId INT NOT NULL,
    PosicionPrincipal NVARCHAR(50) NOT NULL,
    PosicionSecundaria NVARCHAR(50) NULL,
    PiernaHabil NVARCHAR(10) NULL,
    AlturaCm INT NULL,
    PesoKg INT NULL,
    FechaDebut DATE NULL,
    FechaRetiro DATE NULL,
    AnosExperiencia INT DEFAULT 0,
    Estado NVARCHAR(20) DEFAULT 'Activo',
    EstadoFisico NVARCHAR(30) DEFAULT 'Disponible',

    FOREIGN KEY (PersonaId)
        REFERENCES Personas(Id),

    CONSTRAINT CK_Jugador_Estado
        CHECK (Estado IN ('Activo', 'Retirado')),

    CONSTRAINT CK_Jugador_EstadoFisico
        CHECK (EstadoFisico IN ('Disponible', 'Lesionado', 'Suspendido')),

    CONSTRAINT CK_Jugador_Pierna
        CHECK (PiernaHabil IN ('Izquierda', 'Derecha', 'Ambas'))
);


--TABLA LESIONES

CREATE TABLE Lesiones (
    Id INT PRIMARY KEY IDENTITY,
    JugadorId INT NOT NULL,
    Tipo NVARCHAR(50) NOT NULL,
    Gravedad NVARCHAR(20),
    FechaInicio DATE NOT NULL,
    FechaFin DATE NULL,
    Estado NVARCHAR(20) DEFAULT 'Activa',

    FOREIGN KEY (JugadorId)
        REFERENCES Jugadores(PersonaId),

    CONSTRAINT CK_Lesion_Estado
        CHECK (Estado IN ('Activa', 'Recuperado')),

    CONSTRAINT CK_Lesion_Gravedad
        CHECK (Gravedad IN ('Leve', 'Moderada', 'Grave'))
);

-- TABLA PARAMETROS SISTEMA
CREATE TABLE ParametrosSistema (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Clave NVARCHAR(100) NOT NULL UNIQUE,
    Valor NVARCHAR(500) NOT NULL,
    Nombre NVARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(300) NULL,
    Categoria NVARCHAR(100) NULL,
    TipoDato NVARCHAR(50) NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    Editable NVARCHAR(20) NOT NULL DEFAULT 'SI',
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    FechaActualizacion DATETIME NULL
);




INSERT INTO Ciudades (Nombre, PaisId)
VALUES
('Avellaneda', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('La Plata', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Lanús', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Mendoza', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Santa Fe', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Banfield', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('San Miguel de Tucumán', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Quilmes', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Santiago del Estero', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Liniers', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('La Paternal', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Parque Patricios', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Junín', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Mar del Plata', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Vicente López', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Florencio Varela', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Sarandí', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Rafaela', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('San Juan', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Resistencia', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Corrientes', (SELECT Id FROM Paises WHERE Nombre = 'Argentina'));


INSERT INTO Paises (Nombre, CodigoISO)
VALUES
('Afganistán', 'AFG'),
('Albania', 'ALB'),
('Alemania', 'DEU'),
('Andorra', 'AND'),
('Angola', 'AGO'),
('Antigua y Barbuda', 'ATG'),
('Arabia Saudita', 'SAU'),
('Argelia', 'DZA'),
('Argentina', 'ARG'),
('Armenia', 'ARM'),
('Aruba', 'ABW'),
('Australia', 'AUS'),
('Austria', 'AUT'),
('Azerbaiyán', 'AZE'),
('Bahamas', 'BHS'),
('Bangladés', 'BGD'),
('Barbados', 'BRB'),
('Baréin', 'BHR'),
('Bélgica', 'BEL'),
('Belice', 'BLZ'),
('Benín', 'BEN'),
('Bermudas', 'BMU'),
('Bielorrusia', 'BLR'),
('Birmania', 'MMR'),
('Bolivia', 'BOL'),
('Bosnia y Herzegovina', 'BIH'),
('Botsuana', 'BWA'),
('Brasil', 'BRA'),
('Brunéi', 'BRN'),
('Bulgaria', 'BGR'),
('Burkina Faso', 'BFA'),
('Burundi', 'BDI'),
('Bután', 'BTN'),
('Cabo Verde', 'CPV'),
('Camboya', 'KHM'),
('Camerún', 'CMR'),
('Canadá', 'CAN'),
('Catar', 'QAT'),
('Chad', 'TCD'),
('Chile', 'CHL'),
('China', 'CHN'),
('Chipre', 'CYP'),
('Colombia', 'COL'),
('Comoras', 'COM'),
('Corea del Norte', 'PRK'),
('Corea del Sur', 'KOR'),
('Costa de Marfil', 'CIV'),
('Costa Rica', 'CRI'),
('Croacia', 'HRV'),
('Cuba', 'CUB'),
('Curazao', 'CUW'),
('Dinamarca', 'DNK'),
('Dominica', 'DMA'),
('Ecuador', 'ECU'),
('Egipto', 'EGY'),
('El Salvador', 'SLV'),
('Emiratos Árabes Unidos', 'ARE'),
('Eritrea', 'ERI'),
('Escocia', 'SCO'),
('Eslovaquia', 'SVK'),
('Eslovenia', 'SVN'),
('España', 'ESP'),
('Estados Unidos', 'USA'),
('Estonia', 'EST'),
('Etiopía', 'ETH'),
('Filipinas', 'PHL'),
('Finlandia', 'FIN'),
('Fiyi', 'FJI'),
('Francia', 'FRA'),
('Gabón', 'GAB'),
('Gales', 'WAL'),
('Gambia', 'GMB'),
('Georgia', 'GEO'),
('Ghana', 'GHA'),
('Gibraltar', 'GIB'),
('Granada', 'GRD'),
('Grecia', 'GRC'),
('Guam', 'GUM'),
('Guatemala', 'GTM'),
('Guyana', 'GUY'),
('Guinea', 'GIN'),
('Guinea Ecuatorial', 'GNQ'),
('Guinea-Bisáu', 'GNB'),
('Haití', 'HTI'),
('Honduras', 'HND'),
('Hong Kong', 'HKG'),
('Hungría', 'HUN'),
('India', 'IND'),
('Indonesia', 'IDN'),
('Inglaterra', 'ENG'),
('Irak', 'IRQ'),
('Irán', 'IRN'),
('Irlanda', 'IRL'),
('Irlanda del Norte', 'NIR'),
('Islandia', 'ISL'),
('Islas Feroe', 'FRO'),
('Israel', 'ISR'),
('Italia', 'ITA'),
('Jamaica', 'JAM'),
('Japón', 'JPN'),
('Jordania', 'JOR'),
('Kazajistán', 'KAZ'),
('Kenia', 'KEN'),
('Kirguistán', 'KGZ'),
('Kosovo', 'XKX'),
('Kuwait', 'KWT'),
('Laos', 'LAO'),
('Lesoto', 'LSO'),
('Letonia', 'LVA'),
('Líbano', 'LBN'),
('Liberia', 'LBR'),
('Libia', 'LBY'),
('Liechtenstein', 'LIE'),
('Lituania', 'LTU'),
('Luxemburgo', 'LUX'),
('Macao', 'MAC'),
('Macedonia del Norte', 'MKD'),
('Madagascar', 'MDG'),
('Malasia', 'MYS'),
('Malaui', 'MWI'),
('Maldivas', 'MDV'),
('Malí', 'MLI'),
('Malta', 'MLT'),
('Marruecos', 'MAR'),
('Mauricio', 'MUS'),
('Mauritania', 'MRT'),
('México', 'MEX'),
('Moldavia', 'MDA'),
('Mónaco', 'MCO'),
('Mongolia', 'MNG'),
('Montenegro', 'MNE'),
('Mozambique', 'MOZ'),
('Namibia', 'NAM'),
('Nepal', 'NPL'),
('Nicaragua', 'NIC'),
('Níger', 'NER'),
('Nigeria', 'NGA'),
('Noruega', 'NOR'),
('Nueva Caledonia', 'NCL'),
('Nueva Zelanda', 'NZL'),
('Omán', 'OMN'),
('Países Bajos', 'NLD'),
('Pakistán', 'PAK'),
('Palestina', 'PSE'),
('Panamá', 'PAN'),
('Papúa Nueva Guinea', 'PNG'),
('Paraguay', 'PRY'),
('Perú', 'PER'),
('Polonia', 'POL'),
('Portugal', 'PRT'),
('Puerto Rico', 'PRI'),
('República Centroafricana', 'CAF'),
('República Checa', 'CZE'),
('República del Congo', 'COG'),
('República Democrática del Congo', 'COD'),
('República Dominicana', 'DOM'),
('Ruanda', 'RWA'),
('Rumanía', 'ROU'),
('Rusia', 'RUS'),
('Samoa', 'WSM'),
('San Cristóbal y Nieves', 'KNA'),
('San Marino', 'SMR'),
('San Vicente y las Granadinas', 'VCT'),
('Santa Lucía', 'LCA'),
('Santo Tomé y Príncipe', 'STP'),
('Senegal', 'SEN'),
('Serbia', 'SRB'),
('Seychelles', 'SYC'),
('Sierra Leona', 'SLE'),
('Singapur', 'SGP'),
('Siria', 'SYR'),
('Somalia', 'SOM'),
('Sri Lanka', 'LKA'),
('Sudáfrica', 'ZAF'),
('Sudán', 'SDN'),
('Sudán del Sur', 'SSD'),
('Suecia', 'SWE'),
('Suiza', 'CHE'),
('Surinam', 'SUR'),
('Tailandia', 'THA'),
('Taiwán', 'TWN'),
('Tanzania', 'TZA'),
('Tayikistán', 'TJK'),
('Timor Oriental', 'TLS'),
('Togo', 'TGO'),
('Tonga', 'TON'),
('Trinidad y Tobago', 'TTO'),
('Túnez', 'TUN'),
('Turkmenistán', 'TKM'),
('Turquía', 'TUR'),
('Ucrania', 'UKR'),
('Uganda', 'UGA'),
('Uruguay', 'URY'),
('Uzbekistán', 'UZB'),
('Vanuatu', 'VUT'),
('Vaticano', 'VAT'),
('Venezuela', 'VEN'),
('Vietnam', 'VNM'),
('Yemen', 'YEM'),
('Yibuti', 'DJI'),
('Zambia', 'ZMB'),
('Zimbabue', 'ZWE');

CREATE TABLE Clubes (
    Id INT PRIMARY KEY IDENTITY,

    Nombre NVARCHAR(100) NOT NULL UNIQUE,
    Clave NVARCHAR(100) NOT NULL UNIQUE,

    Seudonimo NVARCHAR(100) NULL,

    Confederacion NVARCHAR(50) NOT NULL,

    Pais NVARCHAR(100) NOT NULL,
    Ciudad NVARCHAR(100) NULL,

    FechaFundacion DATE NULL,

    EscudoUrl NVARCHAR(500) NULL,
CodigoFifa NVARCHAR(10) NULL,
    Estado VARCHAR(20) NOT NULL,

    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    FechaActualizacion DATETIME NULL
);


CREATE TABLE ClubEstadio (
    Id INT PRIMARY KEY IDENTITY,

    ClubId INT NOT NULL,
    EstadioId INT NOT NULL,

    Tipo VARCHAR(20) NOT NULL DEFAULT 'Principal',

    FechaInicio DATE NOT NULL,
    FechaFin DATE NULL,

    FOREIGN KEY (ClubId)
        REFERENCES Clubes(Id),

    FOREIGN KEY (EstadioId)
        REFERENCES Estadios(Id)
);

CREATE TABLE ClubEntrenador (
    Id INT PRIMARY KEY IDENTITY,

    ClubId INT NOT NULL,
    EntrenadorId INT NOT NULL,

    Cargo NVARCHAR(50) NOT NULL ,

    FechaInicio DATE NOT NULL,
    FechaFin DATE NULL,
	Estado VARCHAR(20) DEFAULT 'Activo',
    FOREIGN KEY (ClubId)
        REFERENCES Clubes(Id),

    FOREIGN KEY (EntrenadorId)
        REFERENCES Entrenadores(Id)
);

CREATE TABLE Selecciones (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    Confederacion NVARCHAR(50) NOT NULL,
    Clave NVARCHAR(100) UNIQUE,
	Seudonimo  NVARCHAR(100),
    CodigoFIFA CHAR(3) UNIQUE,
    Pais NVARCHAR(100),
    BanderaUrl NVARCHAR(500),
    EscudoUrl NVARCHAR(500),

    Estado VARCHAR(20) DEFAULT 'Activo',

    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME NULL
);

CREATE TABLE SeleccionEstadio (
    Id INT PRIMARY KEY IDENTITY,

    SeleccionId INT NOT NULL,
    EstadioId INT NOT NULL,

    Tipo VARCHAR(20) DEFAULT 'Principal',

    FOREIGN KEY (SeleccionId)
        REFERENCES Selecciones(Id),

    FOREIGN KEY (EstadioId)
        REFERENCES Estadios(Id)
);

CREATE TABLE EntrenadorSeleccion (
    Id INT PRIMARY KEY IDENTITY,

    EntrenadorId INT NOT NULL,
    SeleccionId INT NOT NULL,

    Cargo NVARCHAR(50),

    FechaInicio DATE,
    FechaFin DATE,

    FOREIGN KEY (EntrenadorId)
        REFERENCES Entrenadores(Id),

    FOREIGN KEY (SeleccionId)
        REFERENCES Selecciones(Id)
);

CREATE TABLE EstadisticasEntrenadorSeleccion (
    Id INT PRIMARY KEY IDENTITY,
    EntrenadorSeleccionId INT NOT NULL,
    PartidosDirigidos INT DEFAULT 0,
    Victorias INT DEFAULT 0,
    Empates INT DEFAULT 0,
    Derrotas INT DEFAULT 0,
	 GolesFavor INT DEFAULT 0,
    GolesContra INT DEFAULT 0,

    TitulosGanados INT DEFAULT 0,

    FOREIGN KEY (EntrenadorSeleccionId)
        REFERENCES EntrenadorSeleccion(Id),

    CONSTRAINT UQ_EntrenadorSeleccion
        UNIQUE (EntrenadorSeleccionId)
);