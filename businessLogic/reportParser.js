const XLSX = require('../xlsx.full.min.js')

exports.parse = function(file){     
    const workbook = XLSX.read(file, {type: "binary", cellFormula: false, cellHTML: false});
    const registers =  workbook.Sheets.Hoja1;    
    for (let i = 1; i <= getNumberOfRegisters(workbook); i++) {

        let temp = registers['A'+i].v;

        if (temp.match(/Centro Funcional/)) 
            var centro = parseFirstHeader(temp)

        else if (temp.match(/Plaza(: | :)/))
            var plaza = parseSecondHeader(temp)

        else if (temp.match(/Empleado/))
            continue

        else {

            const {cedula, apellido1, apellido2, nombre} = parseEmpleadoColumn(temp)

            temp = registers['B'+i].v

            const {fechaInicial, fechaFinal, months} = parseDates(temp)
            const {codigo, tipo, puesto} = parsePlaza(plaza)
            const porcentajePlaza = registers['C'+i].v;            

            const newRegister = { "centro": centro,                                        
                                "nombre": nombre,
                                "apellido1": apellido1,
                                "apellido2": apellido2,
                                "cedula": cedula,
                                "código": codigo,                                                                         
                                "fechaInicial": fechaInicial,
                                "fechaFinal": fechaFinal,
                                "periodo": months,
                                "porcentajePlaza": porcentajePlaza,
                                "puesto": puesto,
                                "tipo": tipo};

            console.log(newRegister);
        }                                            
    };
};
parseFirstHeader =  cell =>
    cell.replace(/Centro Funcional(: | : )/, "")

parseSecondHeader = cell => 
    cell.replace(/Plaza(: | : )/,"")


parseEmpleadoColumn = cell => {
    let cedula = cell.replace(/ [\wñÑáéíóúÁÉÍÓÚ ]*/, "");
    let apellidoAux = cell.replace(/\d* /,"");
    let apellido1 = apellidoAux.replace(/ [\w ]*/, "");
    let apellido2Aux = apellidoAux.replace(/(\w+ ){1}/, "");
    let apellido2 = apellido2Aux.replace(/ [\w ]*/, "");
    let nombre = apellidoAux.replace(/(\w+ ){2}/, "");
    return {cedula: cedula, apellido1: apellido1, apellido2: apellido1, nombre: nombre}
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

parsePlaza = plaza => {
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
};

monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;
    return months <= 0 ? 0 : months;
};