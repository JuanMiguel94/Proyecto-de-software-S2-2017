const plazaServie = require("./plazaService")
const funcionarioService = require("./funcionarioService")
const dependencyService = require("./dependencyService")

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
    nombre: "nombre_de_dependencia2"
}

exports.foo = () => {
    /*
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
*/
/*
    funcionarioService.createFuncionario(funcionarioInfo, (res) => {
        console.log(res)
        return res
    })
*/
    dependencyService.addDependencyReporte(dependencyInfo, res => 
        console.log(res))
}
