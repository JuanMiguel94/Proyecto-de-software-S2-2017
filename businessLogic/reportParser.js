const XLSX = require('../xlsx.full.min.js')
const plazaService = require('./plazaService')
const puestoPlazaService = require('./puestoPlazaService')
var puestos
var puestoTemporal = ""

exports.parse = (file) => {
    return new Promise((resolve, reject)=>{
        const workbook = XLSX.read(file, {type: "binary", cellFormula: false, cellHTML: false});    
        plazaService.getPuestos(res => {
            puestos = res.data                
            resolve (startToParseFile2(workbook))
        })
    })
        
}
parseFirstHeader =  cell =>
    cell.replace(/Centro Funcional(: | : )/, "")

parseSecondHeader = cell => 
    cell.replace(/Plaza(: | : )/,"")


parseEmpleadoColumn = cell => {
    let cedula = cell.replace(/ [\wñÑáéíóúÁÉÍÓÚ. ]*/, "");
    let nombre = cell.replace(/\d* /,"");

    let apellido1 = ""
    let apellido2 = ""   
    
    return {cedula: cedula, apellido1: apellido1, apellido2: apellido2, nombre: nombre}
}

parseDates = cell => {
    let fechaAux = cell.replace(/Desde el /, "");
    let fechaInicial = fechaAux.replace(/ .*/, "");
    let fechaFinal = fechaAux.replace(/[/\d]* Hasta /, "");

    let diaIni = fechaInicial.replace(/\/\d{2}\/\d{4}/, "");
    let mesIni = fechaInicial.replace(/\d{2}\//, "");
    mesIni = mesIni.replace(/\/\d{4}/, "");                    
    let annoIni = fechaInicial.replace(/\d{2}\/\d{2}\//, "");                    

    let diaFin = fechaFinal.replace(/\/\d{2}\/\d{4}/, "");
    let mesFin = fechaFinal.replace(/\d{2}\//, "");
    mesFin = mesFin.replace(/\/\d{4}/, "");                    
    let annoFin = fechaFinal.replace(/\d{2}\/\d{2}\//, "");

    let date1Input = annoIni + '-' + mesIni + '-' + diaIni;                    
    let date2Input = annoFin + '-' + mesFin + '-' + diaFin;

    fechaInicial = new Date(date1Input);
    fechaFinal = new Date(date2Input);                                        

    let months = monthDiff(fechaInicial, fechaFinal);
    return {fechaInicial: fechaInicial, fechaFinal: fechaFinal, months: months}
}

parsePlazaSegment = plaza => {
    let codigo = plaza.replace(/ - .*/, "");
    let tipo = plaza.replace(/\d* - .*/, "");
    let puesto = plaza.replace(/.* - /, "");

    return {codigo: codigo, tipo: tipo, puesto: puesto}
}

getNumberOfRegisters = workbook => {
    let first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    let worksheet = workbook.Sheets[first_sheet_name];
    let value = worksheet['!ref'];
    return parseInt(value.substring(4));
}

monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;
    return months <= 0 ? 0 : months;
}
calcularTCE = (periodo, jornada) => periodo/12 * jornada/100

obtenerCategoriaDePuesto = (puesto) => {
    let cat = null
    
    puestos.map((p) =>{
        if(p.puesto == puesto){
            cat = p.categoria
        }
    })
    return cat
}

obtenerIdDePuesto = (puesto) => {
    let id = null
    puestos.map((p) => {
        if(p.puesto == puesto){
            id = p.id
            return p.id
        }
    })
    return null
}

parseDependencia = (temp, data, registers, i) => {
    if (temp.match(/Centro Funcional/)){
        data.centro = parseFirstHeader(temp)
        return data
    }
    else{
        return parsePlaza(temp, data, registers, i)
    }
}
parsePlaza = (temp, data, registers, i) => {    
    if (temp.match(/Plaza(: | :)/)){
        data.plaza = parseSecondHeader(temp)
        var {codigo, tipo, puesto} = parsePlazaSegment(data.plaza)
        data.codigo = codigo
        data.tipo = tipo
        data.puesto = puesto

        
        data.categoria = obtenerCategoriaDePuesto(puesto)
        data.puestoId = obtenerIdDePuesto(puesto)
        return data        
    }
    else if (temp.match(/Empleado/))
    {
        return data
    }
    else{
        return finishParsing(temp, data, registers, i)
    }
}

finishParsing = (temp, data, registers, i) => {
    const {cedula, apellido1, apellido2, nombre} = parseEmpleadoColumn(temp)
    data.cedula = cedula
    data.apellido1 = apellido1
    data.apellido2 = apellido2
    data.nombre = nombre

    temp = registers['B'+i].v

    const {fechaInicial, fechaFinal, months} = parseDates(temp)
    data.fechaInicial = fechaInicial
    data.fechaFinal = fechaFinal
    data.months = months

    data.porcentajePlaza = registers['C'+i].v;
    
    data.tce = calcularTCE(months, data.porcentajePlaza)         

    const newRegister = { "centro": data.centro,                                        
                        "nombre": data.nombre,
                        "apellido1": data.apellido1,
                        "apellido2": data.apellido2,
                        "cedula": data.cedula,
                        "codigo": data.codigo,                                                                         
                        "fechaInicial": data.fechaInicial,
                        "fechaFinal": data.fechaFinal,
                        "periodo": data.months,
                        "porcentajePlaza": data.porcentajePlaza,
                        "puesto": data.puestoId,
                        "tipo": data.tipo,
                        "tce": data.tce,
                        "categoria": data.categoria};

    data.newRegisters.push(newRegister);
    return data
}

startToParseFile2 = (workbook) => {
    const registers =  workbook.Sheets.Hoja1;    
    let data = {
        newRegisters: []
    }
    
    for (let i = 1; i <= getNumberOfRegisters(workbook); i++) {        
        let temp = registers['A'+i].v;
        data = parseDependencia(temp, data, registers, i)                                   
    }
    return data.newRegisters
}