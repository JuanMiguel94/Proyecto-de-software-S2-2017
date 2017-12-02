const plazaService = require("./plazaService")
const funcionarioService = require("./funcionarioService")
const dependencyService = require("./dependencyService")
const funDepService = require("./funDepService")
const plazaDependenciaService = require("./plazaDependenciaService")
const contratoService = require("./contratroService")
const plazaContratacionService = require("./plazaContratacionService")


/*
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
*/

exports.insertarPlazas = (user, data) => {
    let plaza
    let i = 0
    insertarPlazasAux(user, data, plaza, i)
}
exports.insertarDependencias = (user, data) => {    
    let registrados = {
        centrosFuncionales: [],
        plazas: [],
        funcionarios: []
    };
    let i = 0
    insertarDependenciasAux(user, data, {},  registrados, i)
}
exports.insertarFuncionarios = (user, data) => {
    let cedulas = [];
    let i = 0
    insertarFuncionariosAux(user, data, cedulas, i)
}
const insertarPlazasAux = (user, data, plaza, i)=>{
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
        plazaService.addPlazaReporte(plazaInfo, res => resolve(res.data)))
        
        agregarPlaza.then(res => {        
            plazaInfo.idPlaza = res
            plazaInfo.puesto = 1;            
            plazaService.addPlazaInfo(plazaInfo, res => res)
            insertarPlazasAux(user, data, plaza, i + 1)
        })
    }
    else{
        insertarPlazasAux(user, data, plaza, i + 1)
    }  
}
const insertarFuncionariosAux = (user, data, cedulas, i) => {
    if(i >= data.length)
        return
    if (!cedulas.find(cedula => data[i].cedula == cedula)) {        
        cedulas.push(data[i].cedula)
    
        let prom = insertFuncionario(user, data[i])

        prom.then(res => {          
            insertarFuncionariosAux(user, data, cedulas, i + 1)
        })        
    }
    else {
        insertarFuncionariosAux(user, data, cedulas, i + 1)
    }
}
const insertarDependenciasAux = (user, data, idTemporal, registrados, i) => {

    if(i >= data.length)
        return

    if (!registrados.centrosFuncionales.find(centroFuncional => data[i].centro == centroFuncional)){

        registrados.centrosFuncionales.push(data[i].centro)

        insertarDependencia(user, data[i])
        .then(res =>{
            idTemporal.dependencia = res.data
            insertarPlazaSection(user, registrados, data, idTemporal, i)
        })
    }
    else {
        insertarPlazaSection(user, registrados, data, idTemporal, i)
    }
}

const insertarPlazaSection = (user, registrados, data, idTemporal, i) => {
    let promises = []
    promises.push(insertPlaza2(user, registrados, data[i]))
    promises.push(insertFuncionario2(user, registrados, data[i]))
    Promise.all(promises).then(results => {
        let promises2 = []
        if(results[0]){
            idTemporal.plaza = results[0]
            insertarCaracteristicasPlaza(user, data[i], results[0])
            promises2.push(insertarPlazaDependencia(user, data[i], idTemporal))
        }
        if(results[1]){
            idTemporal.funcionario = results[1].data
            promises2.push(insertarFuncionarioDependencia(user, idTemporal.dependencia, idTemporal.funcionario))
        }                                            

        Promise.all(promises2).then(results =>{            
            insertarDependenciasAux(user, data, idTemporal, registrados, i + 1)
        })
    })
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

    return new Promise((resolve, reject) =>
        plazaService.addPlazaReporte(plazaInfo, res => resolve(res.data))) 
}

const insertarCaracteristicasPlaza = (user, information, res) => {    
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
    plazaInfo.idPlaza = res        
    plazaService.addPlazaInfo(plazaInfo, res => res)
}

const insertarDependencia = (user, information) => {
    var dependencyInfo = {
        usuario: user,
        codigo: null,
        nombre: information.centro 
    }
    return new Promise((resolve, reject)=>{
        dependencyService.addDependencyReporte(dependencyInfo, res => 
            resolve(res))
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
            resolve(res)
        })
    })
}

////////////


const insertPlaza2 = (user, registrados, infomacion) => {
    
    if(!registrados.plazas.find(codigo => infomacion.codigo == codigo)){
        registrados.plazas.push(infomacion.codigo)
        return insertPlaza(user, infomacion)
    }        
    else
        return new Promise((resolve, reject) => resolve(false))

}

const insertFuncionario2 = (user, registrados, infomacion) => {
    
    if (!registrados.funcionarios.find(cedula => infomacion.cedula == cedula)){
        registrados.funcionarios.push(infomacion.cedula)
        return insertFuncionario(user, infomacion)
    }        
    else
        return new Promise((resolve, reject) => resolve(false))

}

const insertarPlazaDependencia = (user, information, idTemporal) => {
    var plazaDependeciaInfo = {
        fechaInicio:  null,
        fechaFinal:  null,
        indefinida: 0,
        porcentajeAsignado: null,
        descripcion: null,
        codigo: information.codigo,
        tipo: information.tipo,
        jornada: information.porcentajePlaza,
        usuario: user,
        idPlaza: idTemporal.plaza,
        idDependencia: idTemporal.dependencia
    }
    return new Promise((resolve, reject) => {
        plazaDependenciaService.assignPlazaDependencia(plazaDependeciaInfo, res => resolve(res))
    })    
}

const insertarFuncionarioDependencia = (user, idDependencia, idFuncionario) => {
    var funDepInfo = {
        usuario: user,
        idFuncionario: idFuncionario,
        idDependencia: idDependencia
    }
    return new Promise((resolve, reject) => {
        funDepService.assignFunDep(funDepInfo, res => resolve(res))
    })    
}
