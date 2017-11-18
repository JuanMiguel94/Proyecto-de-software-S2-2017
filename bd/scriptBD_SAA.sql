CREATE SCHEMA `mydb` DEFAULT CHARACTER SET utf8;
USE `mydb`;

create table `mydb`.`Usuario` (
  `usuario` VARCHAR(30) NOT NULL,
  `contrasena` VARCHAR(32) NOT NULL,
  `cedula` VARCHAR(11) NOT NULL,
  `nombre` VARCHAR(60) NOT NULL,
  `correo` VARCHAR(60) NOT NULL,
  `tipo` VARCHAR(15) NOT NULL,
  `activo` bit NOT NULL,
  `fechaInicioAutorizacion` DATETIME NOT NULL,
  `fechaFinalAutorizacion` DATETIME NOT NULL,
  PRIMARY KEY (`usuario`))
ENGINE = InnoDB;

create table `mydb`.`HistorialLogin` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `usuario` varchar(30) not null,
    `fecha` varchar(20) not null,
    primary key (`id`),
    CONSTRAINT `fk_usuario_historial`
		FOREIGN KEY (`usuario`)
		REFERENCES `Usuario` (`usuario`))
ENGINE = InnoDB;

create table `mydb`.`HistorialGestionUsuario` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `usuarioEjecutador` varchar(30) not null,
    `usuarioGestionado` varchar(30) not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    CONSTRAINT `fk_usuarioEjec_gestion_usuario_historial`
		FOREIGN KEY (`usuarioEjecutador`)
		REFERENCES `Usuario` (`usuario`),
	
    CONSTRAINT `fk_usuarioGest_gestion_usuario_historial`
		FOREIGN KEY (`usuarioGestionado`)
		REFERENCES `Usuario` (`usuario`))
ENGINE = InnoDB;

create table `mydb`.`Funcionario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(11) NOT NULL, 
  `nombre` VARCHAR(60) NOT NULL,
  `apellido1` VARCHAR(60) NOT NULL,
  `apellido2` VARCHAR(60) NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  `fechaNacimiento` DATETIME NOT NULL,
  `areaEspecialidad` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

create table `mydb`.`HistorialGestionFuncionario` (
	`id` int not null auto_increment,
    `usuario` varchar(30) not null,
    `idFuncionario` int not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    CONSTRAINT `fk_usuario_gestion_funcionario_historial`
		FOREIGN KEY (`usuario`)
		REFERENCES `Usuario` (`usuario`),
	
    CONSTRAINT `fk_idFuncionario_gestion_funcionario_historial`
		FOREIGN KEY (`idFuncionario`)
		REFERENCES `Funcionario` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Dependencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(10) NOT NULL, 
  `nombre` VARCHAR(60) NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

create table `mydb`.`HistorialGestionDependencia` (
	`id` int not null auto_increment,
    `usuario` varchar(30) not null,
    `idDependencia` int not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    constraint `fk_usuario_dependencia_historial`
		foreign key (`usuario`)
        references `Usuario` (`usuario`),
        
	constraint `fk_dependencia_historial`
		foreign key (`idDependencia`)
        references `Dependencia` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Pertenece` (
  `idFuncionario` INT NOT NULL,
  `idDependencia` INT NOT NULL, 
  `activo` BIT NOT NULL DEFAULT 1,
  
  PRIMARY KEY (`idFuncionario`,`idDependencia`), 
  
  CONSTRAINT `fk_pertenece_funcionario`
	FOREIGN KEY (`idFuncionario`)
    REFERENCES `Funcionario` (`id`),
  
  CONSTRAINT `fk_pertenece_dependencia`
    FOREIGN KEY (`idDependencia`)
    REFERENCES `Dependencia` (`id`))
ENGINE = InnoDB;

create table `mydb`.`HistorialAsignacionFuncionarioDependencia` (
	`id` int not null auto_increment,
    `usuario` varchar(30) not null,
    `idFuncionario` int not null,
    `idDependencia` int not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    
    CONSTRAINT `fk_usuario_asignar_funcionario_dependencia_historial`
		FOREIGN KEY (`usuario`)
		REFERENCES `Usuario` (`usuario`),
	
    CONSTRAINT `fk_idFuncionario_asignar_funcionario_dependencia_historial`
		FOREIGN KEY (`idFuncionario`)
		REFERENCES `Funcionario` (`id`),
        
	CONSTRAINT `fk_idDependencia_asignar_funcionario_dependencia_historial`
		FOREIGN KEY (`idDependencia`)
		REFERENCES `Dependencia` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Antecedente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idFuncionario` INT NOT NULL, 
  `descripcion` VARCHAR(60) NOT NULL,
  
  PRIMARY KEY (`id`,`idFuncionario`),
  
  CONSTRAINT `fk_antecedente_funcionario`
	FOREIGN KEY (`idFuncionario`)
    REFERENCES `Funcionario` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Titulo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idFuncionario` INT NOT NULL, 
  `titulo` VARCHAR(30) NOT NULL,
  `universidad` VARCHAR(30) NOT NULL,
  `gradoAcademico` VARCHAR(30) NOT NULL,
  `annoGraduacion` VARCHAR(4) NOT NULL,
  
  PRIMARY KEY (`id`,`idFuncionario`),
  
  CONSTRAINT `fk_titulo_funcionario`
	FOREIGN KEY (`idFuncionario`)
    REFERENCES `Funcionario` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Plaza` (   
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(200) NOT NULL, 
  `fechaRegistro` DATETIME NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

create table `mydb`.`CategoriasPlaza` ( 
	`id` int not null auto_increment,
    `categoria` int,
    primary key(`id`)) 
ENGINE = InnoDB;

create table `mydb`.`PuestosPlaza` ( 
	`id` int not null auto_increment, 
    `codigoPuesto` int not null, 
    `puesto` varchar(100) not null,
	`idCategoria` int not null,
    primary key(`id`),
    CONSTRAINT `fk_categoria_puesto`
		FOREIGN KEY (`idCategoria`)
		REFERENCES `CategoriasPlaza` (`id`))
ENGINE = InnoDB;

create table `mydb`.`CaracteristicaPlaza` ( 
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPlaza` INT NOT NULL, 
  `codigo` VARCHAR(8) NOT NULL,
  `periodo` DOUBLE NOT NULL,
  `programa` INT NOT NULL,
  `tipo` VARCHAR(6) NOT NULL,
  `categoria` INT NOT NULL,   	
  `tce` DOUBLE NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  `idPuesto` int NOT NULL, 
  `jornada` INT NOT NULL,
  `asignacionDependencia` BIT NOT NULL DEFAULT 0,
  `fechaAutorizacionInicio` DATETIME NOT NULL,
  `fechaAutorizacionFinal` DATETIME,
  `articulo` INT NOT NULL, 
  `numeroSesion` VARCHAR(35) NOT NULL,
  `fechaAcuerdo` DATETIME NOT NULL,
  
  PRIMARY KEY (`id`,`idPlaza`),
  
  CONSTRAINT `fk_caracteristica_plaza`
	FOREIGN KEY (`idPlaza`)
    REFERENCES `Plaza` (`id`),
  CONSTRAINT `fk_caracteristica_plaza_puesto`
	FOREIGN KEY (`idPuesto`)
    REFERENCES `PuestosPlaza` (`id`))
ENGINE = InnoDB;

create table `mydb`.`HistorialGestionPlaza` (
	`id` int not null auto_increment,
    `usuario` varchar(30) not null,
    `idPlaza` int not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    CONSTRAINT `fk_usuario_gestion_plaza_historial`
		FOREIGN KEY (`usuario`)
		REFERENCES `Usuario` (`usuario`),
	
    CONSTRAINT `fk_idPlaza_gestion_plaza_historial`
		FOREIGN KEY (`idPlaza`)
		REFERENCES `Plaza` (`id`))
ENGINE = InnoDB;


create table `mydb`.`PlazaDependencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPlaza` INT NOT NULL, 
  `idDependencia` INT NOT NULL,
  `porcentajeAcordado` INT NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  `fechaInicio` DATETIME NOT NULL,
  `fechaFinal` DATETIME ,
  `indefinida` BIT NOT NULL DEFAULT 0,
  `descripcion` VARCHAR(60) NOT NULL,
  
  PRIMARY KEY (`id`,`idPlaza`,`idDependencia`),
  
  CONSTRAINT `fk_plazaDependencia_plaza`
	FOREIGN KEY (`idPlaza`)
    REFERENCES `Plaza` (`id`),
  
  CONSTRAINT `fk_plazaDependencia_dependencia`
    FOREIGN KEY (`idDependencia`)
    REFERENCES `Dependencia` (`id`))
ENGINE = InnoDB;


create table `mydb`.`HistorialAsignacionPlazaDependencia` (
	`id` int not null auto_increment,
    `usuario` varchar(30) not null,
    `idPlaza` int not null,
    `idDependencia` int not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    
    CONSTRAINT `fk_usuario_asignar_plaza_dependencia_historial`
		FOREIGN KEY (`usuario`)
		REFERENCES `Usuario` (`usuario`),
	
    CONSTRAINT `fk_idPlaza_asignar_plaza_dependencia_historial`
		FOREIGN KEY (`idPlaza`)
		REFERENCES `Plaza` (`id`),
        
	CONSTRAINT `fk_idDependencia_asignar_plaza_dependencia_historial`
		FOREIGN KEY (`idDependencia`)
		REFERENCES `Dependencia` (`id`))
ENGINE = InnoDB;


create table `mydb`.`ResolucionRectoriaPlaza` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numeroResolucion` INT NOT NULL, 
  `fechaResolucion` DATETIME NOT NULL,
  `nombreRector` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

create table `mydb`.`DatosResolucionPlaza` (
	`idPlazaAfectada` int not null,
    `idResolucionRectoriaPlaza` int not null,
    `fechaInicioAfectacion` datetime not null,
    `fechaFinalAfectacion` datetime not null,
    `puestoAutorizado` varchar(20) not null,
    `categoríaAutorizada` varchar(20) not null,
    `porcentajeJornadaAutorizado` int not null,
    `activo` bit not null,
    primary key (`idPlazaAfectada`,	`idResolucionRectoriaPlaza`),
    
    constraint `fk_idPlazaAfectada` 
		foreign key (`idPlazaAfectada`) 
        references `mydb`.`Plaza` (`id`),
        
	constraint `fk_idResolucionRectoriaPlaza`
		foreign key (`idResolucionRectoriaPlaza`) 
        references `mydb`.`ResolucionRectoriaPlaza` (`id`)
)
engine = innodb;

create table `mydb`.`PlazaResolucionRectoriaPlaza` (
	`idPlaza` int not null,
    `idResolucionRectoriaPlaza` int not null,
    primary key (`idPlaza`, `idResolucionRectoriaPlaza`),
    
    constraint `fk_idPlaza`
		foreign key (`idPlaza`)
        references `mydb`.`Plaza` (`id`),
        
	constraint `fk_idPlazaResolucionRectoriaPlaza`
		foreign key (`idResolucionRectoriaPlaza`)
        references `mydb`.`ResolucionRectoriaPlaza` (`id`)
)
engine = innodb;


create table `mydb`.`Contrato` (
	`id` int not null auto_increment,
    `idContratoLiberado` int null,
    `idDependencia` int not null,
    `idFuncionario` int not null,
    `activo` bit not null,
    `actividad` varchar(30) not null,
    `descripcion` varchar(40) not null,
    `anno` int not null,
    `fechaInicio` datetime not null,
    `fechaFinal` datetime not null,
    `númeroConcurso` varchar(10) not null,
    `suplencia` bit not null,
    `porqueContratacion` varchar(40) not null,
    `quienNombro` varchar(50) not null,
    `puestoQuienNombro` varchar(15) not null,
    `porcentajeTotalContratacion` int not null,
    `porcentajeLiberado` int null,
    
    primary key (`id`, `idDependencia`, `idFuncionario`),
    
    constraint `fk_idDependenciaContrato`
		foreign key (`idDependencia`)
        references `mydb`.`Dependencia` (`id`),
        
	constraint `fk_idFuncionarioContrato`
		foreign key (`idFuncionario`)
        references `mydb`.`Funcionario` (`id`)
	/*
	constraint `fk_idContratoLiberadoContrato`
		foreign key (`idContratoLiberado`)
        references `mydb`.`Contrato` (`idContratoLiberado`)*/
)
engine = innodb;


create table `mydb`.`ResolucionRectoriaPersona` (
	`id` int not null auto_increment,
    `idContrato` int not null,
    `idDependecia` int not null,
    `idFuncionario` int not null,
    `numeroResolucion` int not null,
    `fechaResolucion` datetime not null,
    `nombreRector` varchar(50) not null,
    
    primary key (`id`),
    
    constraint `fk_idContratoDependenciaFuncionario`
		foreign key (`idContrato`, `idDependecia`, `idFuncionario`)
        references `mydb`.`Contrato` (`id`, `idDependencia`, `idFuncionario`)
)
engine = innodb;


create table `mydb`.`DatosResolucionPersona` (
	`idPlazaAsignada` int not null,
    `idResolucionPersona` int not null,
    `fechaInicioAfectacion` datetime not null,
    `fechaFinalAfectacion` datetime not null,
    `puestoAutorizado` varchar(20) not null,
    `categoriaAutorizada` varchar(20) not null,
    `activo` bit not null, 
    `porcentajeJornadaAutorizado` int not null,
    `cedula` int not null,
    `nombre` varchar(15) not null,
    `apellido1` varchar(15) not null,
    `apellido2` varchar(15) not null,
    `gradoAcademico` varchar(40) not null, 
    `codigoCursoAutorizado` varchar(10) not null,
    
    primary key (`idPlazaAsignada`, `idResolucionPersona`),
    
    constraint `fk_idPlazaAsignada`
		foreign key (`idPlazaAsignada`)
        references `mydb`.`Plaza` (`id`),
        
	constraint `fk_idResolucionPersona`
		foreign key (`idResolucionPersona`)
        references `mydb`.`ResolucionRectoriaPersona` (`id`)
)
engine = innodb;


create table `mydb`.`Ampliacion` (
	`id` int not null auto_increment,
    `idContrato` int not null,
    `idDependencia` int not null,
    `idFuncionario` int not null,
    `tipo` varchar(15) not null,
    `puestoQuienDioPermiso` varchar(20) not null,
    `quienDioPermiso` varchar(50) not null,
    `tienePermiso` bit not null,
    `fechaInicio` datetime not null,
    `fechaFinal` datetime not null,
    
    primary key (`id`),
    
    constraint `fk_idContratoDependenciaFuncionarioAmpliacion`
		foreign key (`idContrato`, `idDependencia`, `idFuncionario`)
		references `mydb`.`Contrato` (`id`, `idDependencia`, `idFuncionario`)
)
engine = innodb;


create table `mydb`.`PlazaContratacion` (
	`idPlaza` int not null,
    `idContrato` int not null,
    `idDependencia` int not null,
    `idFuncionario` int not null,
    `idCaracteristicaPlaza` int not null,
    `porcentajeContratacion` int not null,
    
    primary key (`idCaracteristicaPlaza`, `idPlaza`, `idContrato`, `idDependencia`, `idFuncionario`),
    
    constraint `fk_idCaracteristicaPlaza`
		foreign key (`idCaracteristicaPlaza`, `idPlaza`)
        references `mydb`.`CaracteristicaPlaza` (`id`, `idPlaza`),
	
	constraint `fk_idContrato`
		foreign key (`idContrato`, `idDependencia`, `idFuncionario`)
        references `mydb`.`Contrato` (`id`, `idDependencia`, `idFuncionario`)
)
engine = innodb;

INSERT INTO Usuario(usuario, contrasena, cedula, nombre, correo, tipo, activo, fechaInicioAutorizacion, fechaFinalAutorizacion) 
    VALUES('user', md5('123'), '209870654', 'Jose', 'correo', 'Administrador', 1, '2017-01-02', '2017-02-03');

insert into CategoriasPlaza(categoria) values(2);
insert into CategoriasPlaza(categoria) values(3);
insert into CategoriasPlaza(categoria) values(4);
insert into CategoriasPlaza(categoria) values(5);
insert into CategoriasPlaza(categoria) values(7);
insert into CategoriasPlaza(categoria) values(8);
insert into CategoriasPlaza(categoria) values(9);
insert into CategoriasPlaza(categoria) values(10);
insert into CategoriasPlaza(categoria) values(11);
insert into CategoriasPlaza(categoria) values(12);
insert into CategoriasPlaza(categoria) values(13);
insert into CategoriasPlaza(categoria) values(14);
insert into CategoriasPlaza(categoria) values(15);
insert into CategoriasPlaza(categoria) values(16);
insert into CategoriasPlaza(categoria) values(23);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(110, 'Trabajador(a) en construcción y áreas verdes',1);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(111, 'Auxiliar Académico (A) – Administrativo (A) 1',1);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(121, 'Auxiliar Académico (A) – Administrativo (A) 2',2);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(130, 'Auxiliar de Administración 1',3);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(136, 'Conserje',3);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(137, 'Auxiliar de cocina',3);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(140, 'Operario (A)',4);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(141, 'Auxiliar de Administración 2',4);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(204, 'Cocinero (A) Institucional',5);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(214, 'Cajero 1',5);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(213, 'Chofer',5);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(217, 'Oficial de seguridad 1',5);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(220, 'Asistente de administración 1',6);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(221, 'Asistente en soporte computacional',6);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(226, 'Bodeguero (A)',6);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(227, 'Asistente en bibliotecología 1',6);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(223, 'Asistente Académico (A) – Administrativo (A) 1',6);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(224, 'Asistente en mantenimiento o artes gráficas',7);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(229, 'Asistente en bibliotecología 2',7);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(247, 'Asistente en Ingeniería o arquitectura',7);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(230, 'Secretaria (o) Ejecutiva (o) 1',7);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(241, 'Asistente de administración 2',8);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(242, 'Asistente Académico (A) – Administrativo (A) 1',8);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(246, 'Asistente de Administración Supervisor (A)',8);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(250, 'Secretaria (o) Ejecutiva (o) de Actas',9);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(251, 'Secretaria (o) Ejecutiva (o) 2',9);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(252, 'Asistente en soporte computacional 2',9);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(260, 'Secretaria (o) Ejecutiva (o) 3',10);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(261, 'Asistente de Salud',10);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(301, 'Oficial de Seguridad 3',11);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(310, 'Técnico en Mantenimiento o Artes Gráficas',12);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(312, 'Técnico en Salud',12);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(313, 'Técnico Académico Administrativo',12);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(311, 'Cajero (A) 2',12);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(320, 'Técnico en Bibliotecología',13);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(321, 'Técnico en Ingeniería y Arquitectura',13);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(330, 'Técnico (A) en Soporte Computacional',14);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(331, 'Técnico (A) en Análisis de Sistemas',14);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(332, 'Técnico en Administración',14);

insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(507, 'Auditor (a) Interno (a)',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(408, 'Auditor (a)',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(502, 'Director (a) de Centro Académico',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(504, 'Director (a) de Sede Regional',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(501, 'Director (a) Ejecutivo (a) de la Secretaría del Consejo Institucional',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(503, 'Director (a) Ejecutivo (a)',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(508, 'Miembro del Consejo Institucional',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(415, 'Profesional en Asesoría Académica',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(409, 'Profesional en Asesoría Estudiantil',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(411, 'Profesional en Asesoría Legal',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(401, 'Profesional en Bibliotecología',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(404, 'Profesional en Comunicación',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(403, 'Profesional en Gestión de Cooperación o Proyectos',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(410, 'Profesional en Ingeniería o Arquitectura',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(412, 'Profesional en Salud',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(406, 'Profesional en Tecnologías de Información y Comunicaciones',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(407, 'Profesor (a)',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(430, 'Regente',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(506, 'Rector (a)',15);
insert into PuestosPlaza(codigoPuesto, puesto, idCategoria) values(505, 'Vicerrector (a)',15);
