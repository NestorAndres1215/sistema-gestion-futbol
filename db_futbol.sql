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

CREATE TABLE Personas (
    Id INT PRIMARY KEY IDENTITY,

    Nombre NVARCHAR(100) NOT NULL,             -- Nombres
    ApellidoPaterno NVARCHAR(100) NOT NULL,   -- Primer apellido
    ApellidoMaterno NVARCHAR(100) NULL,       -- Segundo apellido

    FechaNacimiento DATE NULL,              -- Fecha nacimiento

    PaisNacimientoId INT NULL,              -- País natal
    CiudadNacimientoId INT NULL,            -- Ciudad natal

    AlturaCm INT NULL,                      -- Altura
    PesoKg INT NULL,                        -- Peso

    PieDominante NVARCHAR(10) NULL,         -- Izquierdo/Derecho/Ambos

    FotoUrl NVARCHAR(300) NULL,             -- Foto perfil

    Estado NVARCHAR(20) DEFAULT 'Activo',
    -- Activo / Inactivo / Retirado

    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME NULL,

    FOREIGN KEY (PaisNacimientoId)
        REFERENCES Paises(Id),

    FOREIGN KEY (CiudadNacimientoId)
        REFERENCES Ciudades(Id),

    CONSTRAINT CK_Persona_Estado
        CHECK (Estado IN ('Activo', 'Inactivo', 'Retirado')),

    CONSTRAINT CK_PieDominante
        CHECK (PieDominante IN ('Izquierdo', 'Derecho', 'Ambos'))
);


CREATE TABLE Paises (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    CodigoISO NVARCHAR(10) NULL -- PER, ESP, BRA
);


CREATE TABLE Paises (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL UNIQUE,
    CodigoISO NVARCHAR(10) NOT NULL UNIQUE
);












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
CREATE TABLE Ciudades (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    PaisId INT NOT NULL,
    FOREIGN KEY (PaisId) REFERENCES Paises(Id)
);

CREATE TABLE Ciudades (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    PaisId INT NOT NULL,
    FOREIGN KEY (PaisId) REFERENCES Paises(Id)
);

INSERT INTO Ciudades (Nombre, PaisId)
VALUES
-- Perú
('Lima', (SELECT Id FROM Paises WHERE Nombre = 'Perú')),
('Arequipa', (SELECT Id FROM Paises WHERE Nombre = 'Perú')),
('Cusco', (SELECT Id FROM Paises WHERE Nombre = 'Perú')),

-- Argentina
('Buenos Aires', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Córdoba', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),
('Rosario', (SELECT Id FROM Paises WHERE Nombre = 'Argentina')),

-- Brasil
('São Paulo', (SELECT Id FROM Paises WHERE Nombre = 'Brasil')),
('Rio de Janeiro', (SELECT Id FROM Paises WHERE Nombre = 'Brasil')),
('Brasilia', (SELECT Id FROM Paises WHERE Nombre = 'Brasil')),

-- España
('Madrid', (SELECT Id FROM Paises WHERE Nombre = 'España')),
('Barcelona', (SELECT Id FROM Paises WHERE Nombre = 'España')),
('Sevilla', (SELECT Id FROM Paises WHERE Nombre = 'España')),

-- Inglaterra
('Londres', (SELECT Id FROM Paises WHERE Nombre = 'Inglaterra')),
('Manchester', (SELECT Id FROM Paises WHERE Nombre = 'Inglaterra')),
('Liverpool', (SELECT Id FROM Paises WHERE Nombre = 'Inglaterra')),

-- Escocia
('Glasgow', (SELECT Id FROM Paises WHERE Nombre = 'Escocia')),
('Edimburgo', (SELECT Id FROM Paises WHERE Nombre = 'Escocia')),

-- Gales
('Cardiff', (SELECT Id FROM Paises WHERE Nombre = 'Gales')),
('Swansea', (SELECT Id FROM Paises WHERE Nombre = 'Gales')),

-- Irlanda del Norte
('Belfast', (SELECT Id FROM Paises WHERE Nombre = 'Irlanda del Norte')),

-- Francia
('París', (SELECT Id FROM Paises WHERE Nombre = 'Francia')),
('Marsella', (SELECT Id FROM Paises WHERE Nombre = 'Francia')),
('Lyon', (SELECT Id FROM Paises WHERE Nombre = 'Francia')),

-- Alemania
('Berlín', (SELECT Id FROM Paises WHERE Nombre = 'Alemania')),
('Múnich', (SELECT Id FROM Paises WHERE Nombre = 'Alemania')),
('Hamburgo', (SELECT Id FROM Paises WHERE Nombre = 'Alemania')),

-- Italia
('Roma', (SELECT Id FROM Paises WHERE Nombre = 'Italia')),
('Milán', (SELECT Id FROM Paises WHERE Nombre = 'Italia')),
('Nápoles', (SELECT Id FROM Paises WHERE Nombre = 'Italia')),

-- Portugal
('Lisboa', (SELECT Id FROM Paises WHERE Nombre = 'Portugal')),
('Oporto', (SELECT Id FROM Paises WHERE Nombre = 'Portugal')),

-- Estados Unidos
('New York', (SELECT Id FROM Paises WHERE Nombre = 'Estados Unidos')),
('Los Angeles', (SELECT Id FROM Paises WHERE Nombre = 'Estados Unidos')),
('Chicago', (SELECT Id FROM Paises WHERE Nombre = 'Estados Unidos')),

-- México
('Ciudad de México', (SELECT Id FROM Paises WHERE Nombre = 'México')),
('Guadalajara', (SELECT Id FROM Paises WHERE Nombre = 'México')),
('Monterrey', (SELECT Id FROM Paises WHERE Nombre = 'México')),

-- Colombia
('Bogotá', (SELECT Id FROM Paises WHERE Nombre = 'Colombia')),
('Medellín', (SELECT Id FROM Paises WHERE Nombre = 'Colombia')),
('Cali', (SELECT Id FROM Paises WHERE Nombre = 'Colombia')),

-- Chile
('Santiago', (SELECT Id FROM Paises WHERE Nombre = 'Chile')),
('Valparaíso', (SELECT Id FROM Paises WHERE Nombre = 'Chile')),

-- Uruguay
('Montevideo', (SELECT Id FROM Paises WHERE Nombre = 'Uruguay')),

-- Paraguay
('Asunción', (SELECT Id FROM Paises WHERE Nombre = 'Paraguay')),

-- Bolivia
('La Paz', (SELECT Id FROM Paises WHERE Nombre = 'Bolivia')),
('Santa Cruz', (SELECT Id FROM Paises WHERE Nombre = 'Bolivia')),

-- Ecuador
('Quito', (SELECT Id FROM Paises WHERE Nombre = 'Ecuador')),
('Guayaquil', (SELECT Id FROM Paises WHERE Nombre = 'Ecuador')),

-- Venezuela
('Caracas', (SELECT Id FROM Paises WHERE Nombre = 'Venezuela')),
('Maracaibo', (SELECT Id FROM Paises WHERE Nombre = 'Venezuela')),

-- Japón
('Tokio', (SELECT Id FROM Paises WHERE Nombre = 'Japón')),
('Osaka', (SELECT Id FROM Paises WHERE Nombre = 'Japón')),

-- Corea del Sur
('Seúl', (SELECT Id FROM Paises WHERE Nombre = 'Corea del Sur')),
('Busan', (SELECT Id FROM Paises WHERE Nombre = 'Corea del Sur')),

-- China
('Beijing', (SELECT Id FROM Paises WHERE Nombre = 'China')),
('Shanghái', (SELECT Id FROM Paises WHERE Nombre = 'China')),

-- Australia
('Sídney', (SELECT Id FROM Paises WHERE Nombre = 'Australia')),
('Melbourne', (SELECT Id FROM Paises WHERE Nombre = 'Australia')),

-- Marruecos
('Casablanca', (SELECT Id FROM Paises WHERE Nombre = 'Marruecos')),
('Rabat', (SELECT Id FROM Paises WHERE Nombre = 'Marruecos')),

-- Egipto
('El Cairo', (SELECT Id FROM Paises WHERE Nombre = 'Egipto')),

-- Sudáfrica
('Johannesburgo', (SELECT Id FROM Paises WHERE Nombre = 'Sudáfrica')),
('Ciudad del Cabo', (SELECT Id FROM Paises WHERE Nombre = 'Sudáfrica')),

-- Nigeria
('Lagos', (SELECT Id FROM Paises WHERE Nombre = 'Nigeria')),
('Abuya', (SELECT Id FROM Paises WHERE Nombre = 'Nigeria')),

-- Camerún
('Yaundé', (SELECT Id FROM Paises WHERE Nombre = 'Camerún')),
('Duala', (SELECT Id FROM Paises WHERE Nombre = 'Camerún')),

-- Turquía
('Estambul', (SELECT Id FROM Paises WHERE Nombre = 'Turquía')),
('Ankara', (SELECT Id FROM Paises WHERE Nombre = 'Turquía')),

-- Rusia
('Moscú', (SELECT Id FROM Paises WHERE Nombre = 'Rusia')),
('San Petersburgo', (SELECT Id FROM Paises WHERE Nombre = 'Rusia')),

-- Ucrania
('Kiev', (SELECT Id FROM Paises WHERE Nombre = 'Ucrania')),

-- Arabia Saudita
('Riad', (SELECT Id FROM Paises WHERE Nombre = 'Arabia Saudita')),
('Yeda', (SELECT Id FROM Paises WHERE Nombre = 'Arabia Saudita')),

-- Catar
('Doha', (SELECT Id FROM Paises WHERE Nombre = 'Catar')),

-- Emiratos Árabes Unidos
('Dubái', (SELECT Id FROM Paises WHERE Nombre = 'Emiratos Árabes Unidos')),
('Abu Dabi', (SELECT Id FROM Paises WHERE Nombre = 'Emiratos Árabes Unidos')),

-- Kosovo
('Pristina', (SELECT Id FROM Paises WHERE Nombre = 'Kosovo')),

-- Gibraltar
('Gibraltar', (SELECT Id FROM Paises WHERE Nombre = 'Gibraltar')),

-- Puerto Rico
('San Juan', (SELECT Id FROM Paises WHERE Nombre = 'Puerto Rico'));

INSERT INTO Ciudades (Nombre, PaisId)
VALUES
-- Afganistán
('Kabul', (SELECT Id FROM Paises WHERE Nombre = 'Afganistán')),

-- Albania
('Tirana', (SELECT Id FROM Paises WHERE Nombre = 'Albania')),

-- Andorra
('Andorra la Vieja', (SELECT Id FROM Paises WHERE Nombre = 'Andorra')),

-- Angola
('Luanda', (SELECT Id FROM Paises WHERE Nombre = 'Angola')),

-- Arabia Saudita
('La Meca', (SELECT Id FROM Paises WHERE Nombre = 'Arabia Saudita')),

-- Argelia
('Argel', (SELECT Id FROM Paises WHERE Nombre = 'Argelia')),

-- Armenia
('Ereván', (SELECT Id FROM Paises WHERE Nombre = 'Armenia')),

-- Austria
('Viena', (SELECT Id FROM Paises WHERE Nombre = 'Austria')),

-- Azerbaiyán
('Bakú', (SELECT Id FROM Paises WHERE Nombre = 'Azerbaiyán')),

-- Bahamas
('Nasáu', (SELECT Id FROM Paises WHERE Nombre = 'Bahamas')),

-- Bangladés
('Daca', (SELECT Id FROM Paises WHERE Nombre = 'Bangladés')),

-- Baréin
('Manama', (SELECT Id FROM Paises WHERE Nombre = 'Baréin')),

-- Bélgica
('Bruselas', (SELECT Id FROM Paises WHERE Nombre = 'Bélgica')),
('Brujas', (SELECT Id FROM Paises WHERE Nombre = 'Bélgica')),

-- Bielorrusia
('Minsk', (SELECT Id FROM Paises WHERE Nombre = 'Bielorrusia')),

-- Bosnia y Herzegovina
('Sarajevo', (SELECT Id FROM Paises WHERE Nombre = 'Bosnia y Herzegovina')),

-- Bulgaria
('Sofía', (SELECT Id FROM Paises WHERE Nombre = 'Bulgaria')),

-- Canadá
('Toronto', (SELECT Id FROM Paises WHERE Nombre = 'Canadá')),
('Vancouver', (SELECT Id FROM Paises WHERE Nombre = 'Canadá')),

-- Costa Rica
('San José', (SELECT Id FROM Paises WHERE Nombre = 'Costa Rica')),

-- Croacia
('Zagreb', (SELECT Id FROM Paises WHERE Nombre = 'Croacia')),

-- Cuba
('La Habana', (SELECT Id FROM Paises WHERE Nombre = 'Cuba')),

-- Dinamarca
('Copenhague', (SELECT Id FROM Paises WHERE Nombre = 'Dinamarca')),

-- Eslovaquia
('Bratislava', (SELECT Id FROM Paises WHERE Nombre = 'Eslovaquia')),

-- Eslovenia
('Liubliana', (SELECT Id FROM Paises WHERE Nombre = 'Eslovenia')),

-- Estonia
('Tallin', (SELECT Id FROM Paises WHERE Nombre = 'Estonia')),

-- Finlandia
('Helsinki', (SELECT Id FROM Paises WHERE Nombre = 'Finlandia')),

-- Grecia
('Atenas', (SELECT Id FROM Paises WHERE Nombre = 'Grecia')),

-- Hungría
('Budapest', (SELECT Id FROM Paises WHERE Nombre = 'Hungría')),

-- India
('Nueva Delhi', (SELECT Id FROM Paises WHERE Nombre = 'India')),
('Mumbai', (SELECT Id FROM Paises WHERE Nombre = 'India')),

-- Indonesia
('Yakarta', (SELECT Id FROM Paises WHERE Nombre = 'Indonesia')),

-- Irak
('Bagdad', (SELECT Id FROM Paises WHERE Nombre = 'Irak')),

-- Irán
('Teherán', (SELECT Id FROM Paises WHERE Nombre = 'Irán')),

-- Irlanda
('Dublín', (SELECT Id FROM Paises WHERE Nombre = 'Irlanda')),

-- Islandia
('Reikiavik', (SELECT Id FROM Paises WHERE Nombre = 'Islandia')),

-- Israel
('Jerusalén', (SELECT Id FROM Paises WHERE Nombre = 'Israel')),
('Tel Aviv', (SELECT Id FROM Paises WHERE Nombre = 'Israel')),

-- Jamaica
('Kingston', (SELECT Id FROM Paises WHERE Nombre = 'Jamaica')),

-- Jordania
('Amán', (SELECT Id FROM Paises WHERE Nombre = 'Jordania')),

-- Kazajistán
('Astaná', (SELECT Id FROM Paises WHERE Nombre = 'Kazajistán')),

-- Kenia
('Nairobi', (SELECT Id FROM Paises WHERE Nombre = 'Kenia')),

-- Kuwait
('Ciudad de Kuwait', (SELECT Id FROM Paises WHERE Nombre = 'Kuwait')),

-- Letonia
('Riga', (SELECT Id FROM Paises WHERE Nombre = 'Letonia')),

-- Líbano
('Beirut', (SELECT Id FROM Paises WHERE Nombre = 'Líbano')),

-- Libia
('Trípoli', (SELECT Id FROM Paises WHERE Nombre = 'Libia')),

-- Lituania
('Vilna', (SELECT Id FROM Paises WHERE Nombre = 'Lituania')),

-- Luxemburgo
('Luxemburgo', (SELECT Id FROM Paises WHERE Nombre = 'Luxemburgo')),

-- Malasia
('Kuala Lumpur', (SELECT Id FROM Paises WHERE Nombre = 'Malasia')),

-- Marruecos
('Marrakech', (SELECT Id FROM Paises WHERE Nombre = 'Marruecos')),

-- México
('Puebla', (SELECT Id FROM Paises WHERE Nombre = 'México')),

-- Noruega
('Oslo', (SELECT Id FROM Paises WHERE Nombre = 'Noruega')),

-- Países Bajos
('Ámsterdam', (SELECT Id FROM Paises WHERE Nombre = 'Países Bajos')),
('Róterdam', (SELECT Id FROM Paises WHERE Nombre = 'Países Bajos')),

-- Pakistán
('Islamabad', (SELECT Id FROM Paises WHERE Nombre = 'Pakistán')),

-- Panamá
('Ciudad de Panamá', (SELECT Id FROM Paises WHERE Nombre = 'Panamá')),

-- Polonia
('Varsovia', (SELECT Id FROM Paises WHERE Nombre = 'Polonia')),
('Cracovia', (SELECT Id FROM Paises WHERE Nombre = 'Polonia')),

-- República Checa
('Praga', (SELECT Id FROM Paises WHERE Nombre = 'República Checa')),

-- República Dominicana
('Santo Domingo', (SELECT Id FROM Paises WHERE Nombre = 'República Dominicana')),

-- Rumanía
('Bucarest', (SELECT Id FROM Paises WHERE Nombre = 'Rumanía')),

-- Serbia
('Belgrado', (SELECT Id FROM Paises WHERE Nombre = 'Serbia')),

-- Singapur
('Singapur', (SELECT Id FROM Paises WHERE Nombre = 'Singapur')),

-- Suecia
('Estocolmo', (SELECT Id FROM Paises WHERE Nombre = 'Suecia')),

-- Suiza
('Zúrich', (SELECT Id FROM Paises WHERE Nombre = 'Suiza')),
('Ginebra', (SELECT Id FROM Paises WHERE Nombre = 'Suiza')),

-- Tailandia
('Bangkok', (SELECT Id FROM Paises WHERE Nombre = 'Tailandia')),

-- Túnez
('Túnez', (SELECT Id FROM Paises WHERE Nombre = 'Túnez')),

-- Uruguay
('Punta del Este', (SELECT Id FROM Paises WHERE Nombre = 'Uruguay')),

-- Venezuela
('Valencia', (SELECT Id FROM Paises WHERE Nombre = 'Venezuela')),

-- Vietnam
('Hanói', (SELECT Id FROM Paises WHERE Nombre = 'Vietnam')),
('Ho Chi Minh', (SELECT Id FROM Paises WHERE Nombre = 'Vietnam'));