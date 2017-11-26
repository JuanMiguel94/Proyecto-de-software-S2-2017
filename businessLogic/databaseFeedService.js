const plazaServie = require("./plazaService")
const funcionarioService = require("./funcionarioService")
const dependencyService = require("./dependencyService")
const funDepService = require("./funDepService")
const plazaDependenciaService = require("./plazaDependenciaService")
const contratoService = require("./contratroService")
const plazaContratacionService = require("./plazaContratacionService")

var plazaInfo = {
    usuarioActual: "user",
    descripcion: null,
    codigo: "HH5223",
    periodo: 6,
    programa: 4,
    categoria: 6,
    tipo: "BM",
    puesto: 4,
    jornada: 30,
    fechaAutorizacionInicio: new Date(20, 11, 2016),
    fechaAutorizacionFinal: new Date(20, 11, 2017),
    articulo: null,
    numeroSesion: null,
    fechaAcuerdo: null,
    tce: 5
}

var funcionarioInfo = {
    cedula: "207330043",
    nombre: "Juan",
    primerApellido: "Arce",
    segundoApellido: "Rodríguez",
    fecha: null,
    especialidad: null,
    activo: 1,
    usuarioActual: "user"

}

var dependencyInfo = {
    usuario: "user",
    codigo: null,
    nombre: "nombre_de_dependencia"
}
var funDepInfo = {
    usuario: "user",
    idFuncionario: 1,
    idDependencia: "1"
}

var plazaDependeciaInfo = {
    fechaInicio:  new Date(20, 11, 2016),
    fechaFinal:  new Date(20, 11, 2016),
    indefinida: 0,
    porcentajeAsignado: 100,
    descripcion: "descripcion corta",
    codigo: "HH5223",
    tipo: "BM",
    jornada: 5,
    usuario: "user",
    idPlaza: 1,
    idDependencia: 1
}

var contratoInfo = {
    idContratoLiberado: null,
    idDependencia: 1,
    idFuncionario: 1,
    activo: 1,
    actividad: null,
    porqueContratacion: null,
    quienNombro: null,
    puestoQuienNombro: null,
    porcentajeTotalContratacion: 100,
    descripcion: "descripcion",
    anno: 2017,
    fechaInicio: new Date(20, 11, 2016),
    fechaFinal: new Date(20, 11, 2016),
    numeroConcurso: null,
    suplencia: null,                   
    porcentajeLiberado: null
}

var plazaContratacionInfo = {
    idPlaza: 1,
    idContrato: 1,
    idDependencia: 1,
    idFuncionario: 1,
    porcentajeContratacion: 100
}

exports.foo = () => {
    
    agregarPlaza = new Promise((resolve, reject)=>{
        plazaServie.addPlazaReporte(plazaInfo, res => {
            console.log("res.data", res.data)
            resolve(res.data)
        })
    })


    agregarPlaza.then(idPlaza => {
        console.log("idPlaza", idPlaza)
        plazaInfo.idPlaza = idPlaza
        plazaServie.addPlazaInfo(plazaInfo, res => console.log(res))
    })
    
    funcionarioService.createFuncionario(funcionarioInfo, (res) => {
        console.log(res)
        return res
    })
    dependencyService.addDependencyReporte(dependencyInfo, res => 
        console.log(res))
  
  funDepService.assignFunDep(funDepInfo, res => console.log(res))
  
  plazaDependenciaService.assignPlazaDependencia(plazaDependeciaInfo, res => console.log(res))
  
  contratoService.addContrato(contratoInfo, res => console.log(res))
  plazaContratacionService.addPlazaContratacion(plazaContratacionInfo, res => console.log(res))
}
