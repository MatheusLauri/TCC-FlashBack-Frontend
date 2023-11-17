 //Formatar Horário
 
 export default function formatHorario(horario) {

    let dataFake = (`2023-11-14T${horario}`)
    let timeCompra = new Date(dataFake);
    let horas = timeCompra.getHours();
    let minutos = timeCompra.getMinutes(); 

    if (horas < 10) {
        horas = "0" + horas;
        }
        if (minutos < 10) {
         minutos = "0" + minutos;
        }
   
    let resultado = {
        format1: `${horas}h${minutos}`,
        format2: `${horas}:${minutos}`
    }

    return resultado
}