 //Formatar Horário2
 
 export default function formatHorario2(horario) {

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
   
    let resultado = `${horas}h${minutos}`
  

    return resultado
}