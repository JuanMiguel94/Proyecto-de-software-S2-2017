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

exports.agregarRegistro = () => {
    
    agregarPlaza = new Promise((resolve, reject)=>{
        plazaServie.addPlazaReporte(plazaInfo, res => {
            console.log("res.data", res.data)
            resolve(res.data)
        })
    })

    agregarPlaza.then(res => {
        console.log("idPlaza", res.data)
        plazaInfo.idPlaza = res.data
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

//////////////////////////////////////////////////////////////////////////////////////////////////////
    const promises = []
    promises.push( new Promise((resolve, reject) =>
        plazaService.addPlazaReporte(plazaInfo, res => resolve(res))))

    promises.push( new Promise((resolve, reject) =>
        funcionarioService.createFuncionario(funcionarioInfo, res => resolve(res))))
    
    promises.push( new Promise((resolve, reject)=>
        dependencyService.addDependencyReporte(dependencyInfo, res => resolve(res))))

    Promise.all(promises, (results) => {
        
    })
}

exports.foo = (data) => {
    let centroFuncional, plaza, funcionario
    for (let i = 0; i < data.length; i++) {
        if (centroFuncional || data[i].centro != centroFuncional){
            centroFuncional = data[i].centro
            //crea dependencia
        }
        else{
            if (plaza || data[i].codigo != plaza) {
                plaza = data[i].codigo
                //crea plaza
                plazaInfo = {
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
            }
            if (funcionario || funcionario.cedula != data[i].cedula) {
                funcionario = {
                    nombre: data[i].nombre,
                    apellido1: data[i].apellido1,
                    apellido2: data[i].apellido2,
                    cedula: data[i].cedula
                }
                //creafuncionario
            }
        }
    }
}
/*
{ centro: 'SEDE REG. SAN CARLOS - SUPLENCIAS',
  nombre: 'MARIA DE LOS ANGELES',
  apellido1: 'GUZMAN',
  apellido2: 'GUZMAN',
  cedula: '205320418',
  'código': 'SUP05-004',
  fechaInicial: 2014-03-08T00:00:00.000Z,
  fechaFinal: 2014-03-09T00:00:00.000Z,
  periodo: 0,
  porcentajePlaza: 100,
  puesto: 'Suplencias Administración San Carlos',
  tipo: 'SUP05-' }
*/