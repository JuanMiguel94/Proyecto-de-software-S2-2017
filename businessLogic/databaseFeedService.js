const plazaServie = require("./plazaService")
const funcionarioService = require("./funcionarioService")
const dependencyService = require("./dependencyService")
const funDepService = require("./funDepService")
const plazaDependenciaService = require("./plazaDependenciaService")
const contratoService = require("./contratroService")
const plazaContratacionService = require("./plazaContratacionService")

/*
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
const insertPlaza = (user, information) => {
    plazaInfo = {
        usuarioActual: user,
        descripcion: null,
        codigo: information.codigo,
        periodo: information.periodo,
        programa: null,
        categoria: information.categoria,
        tipo: information.codigo.slice(0,2),
        puesto: information.puesto,
        jornada: information.porcentajePlaza,
        fechaAutorizacionInicio: information.fechaInicial,
        fechaAutorizacionFinal: information.fechaFinal,
        articulo: null,
        numeroSesion: null,
        fechaAcuerdo: null,
        tce: information.tce
    }
    agregarPlaza = new Promise((resolve, reject)=>
    plazaServie.addPlazaReporte(plazaInfo, res => resolve(res.data)))
    
    agregarPlaza.then(res => {
        console.log("Plaza: ", information.codigo)    
        plazaInfo.idPlaza = res
        plazaServie.addPlazaInfo(plazaInfo, res => console.log(res))
    })  
}
*/
exports.foo2 = (user, data) => {
    let plaza
    let i = 0
    foo2Aux(user, data, plaza, i)
}
let foo2Aux = (user, data, plaza, i)=>{
    if(i >= data.length)
        return
    if (!plaza || data[i].codigo != plaza) {
        plaza = data[i].codigo

        plazaInfo = {
            usuarioActual: user,
            descripcion: null,
            codigo: data[i].codigo,
            periodo: data[i].periodo,
            programa: null,
            categoria: data[i].categoria,
            tipo: data[i].codigo.slice(0,2),
            puesto: data[i].puesto,
            jornada: data[i].porcentajePlaza,
            fechaAutorizacionInicio: data[i].fechaInicial,
            fechaAutorizacionFinal: data[i].fechaFinal,
            articulo: null,
            numeroSesion: null,
            fechaAcuerdo: null,
            tce: data[i].tce
        }
        agregarPlaza = new Promise((resolve, reject)=>
        plazaServie.addPlazaReporte(plazaInfo, res => resolve(res.data)))
        
        agregarPlaza.then(res => {
            plazaInfo.idPlaza = res
            plazaInfo.puesto = 1;            
            plazaServie.addPlazaInfo(plazaInfo, res => console.log(res))
            foo2Aux(user, data, plaza, i + 1)
        })
    }
    else{
        foo2Aux(user, data, plaza, i + 1)
    }  
}
/*
exports.foo3 = (user, data) => {
    let cedula;
    let i = 0    
    foo3Aux(user, data, cedula, i)
}

foo3Aux = (user, data, cedula, i) => {
    if(i >= data.length)
        return    
    if (!cedula || cedula != data[i].cedula) {        
        cedula = data[i].cedula
        insertFuncionario(user, data[i])
        foo3Aux(user, data, cedula, i + 1)
        
    }
    else {
        foo3Aux(user, data, cedula, i + 1)
    }
}*/

exports.foo3 = (user, data) => {
    let cedulas = [];
    let i = 0
    foo3Aux(user, data, cedulas, i)
}

foo3Aux = (user, data, cedulas, i) => {
    if(i >= data.length)
        return
    if (!cedulas.find(cedula => data[i].cedula == cedula)) {        
        cedulas.push(data[i].cedula)
    
        let prom = insertFuncionario(user, data[i])

        prom.then(res => {            
            foo3Aux(user, data, cedulas, i + 1)
        })        
    }
    else {        
        foo3Aux(user, data, cedulas, i + 1)
    }
}

exports.foo = (user, data) => {    
    let centroFuncional;
    let i = 0
    fooAux(user, data, centroFuncional, i)
}
fooAux = (user, data, centroFuncional, i) => {
    if(i >= data.length)
        return    
    if (!centroFuncional || data[i].centro != centroFuncional){
        centroFuncional = data[i].centro            
        insertarDependencia(user, data[i]).then(()=>{
            fooAux(user, data, centroFuncional, i + 1)    
        })
    }
    else {
        fooAux(user, data, centroFuncional, i + 1)
    }
}
const insertPlaza = (user, information) => {
    plazaInfo = {
        usuarioActual: user,
        descripcion: null,
        codigo: information.codigo,
        periodo: information.periodo,
        programa: null,
        categoria: information.categoria,
        tipo: information.codigo.slice(0,2),
        puesto: information.puesto,
        jornada: information.porcentajePlaza,
        fechaAutorizacionInicio: information.fechaInicial,
        fechaAutorizacionFinal: information.fechaFinal,
        articulo: null,
        numeroSesion: null,
        fechaAcuerdo: null,
        tce: information.tce
    }
    agregarPlaza = new Promise((resolve, reject)=>
    plazaServie.addPlazaReporte(plazaInfo, res => resolve(res.data)))
    
    agregarPlaza.then(res => {
        console.log("Plaza: ", information.codigo)    
        plazaInfo.idPlaza = res
        plazaServie.addPlazaInfo(plazaInfo, res => console.log(res))
    })  
}




const insertarDependencia = (user, information) => {
    var dependencyInfo = {
        usuario: user,
        codigo: null,
        nombre: information.centro 
    }
    return new Promise((resolve, reject)=>{
        resolve(dependencyService.addDependencyReporte(dependencyInfo, res => 
            console.log(res)))
    })
}

const insertFuncionario = (user, information) => {
    
    funcionarioInfo = {
        nombre: information.nombre,
        primerApellido: information.apellido1,
        segundoApellido: information.apellido2,
        cedula: information.cedula,
        fecha: null,
        especialidad: null,
        activo: 1,
        usuarioActual: user
    }
    
    return new Promise((resolve, reject)=>{
        funcionarioService.createFuncionario(funcionarioInfo, res => {
            console.log(res)
            resolve(res)
        })
    })
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