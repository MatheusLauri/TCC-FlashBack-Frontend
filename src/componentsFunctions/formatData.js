//Formatar datas 
 
export default function formatData(data) {

    let diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let mesesCompletos = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


    let datetime = new Date(data);
    let diaDaSemana = diasDaSemana[datetime.getUTCDay()];
    let diaDoMes = datetime.getUTCDate();
    let mes = meses[datetime.getUTCMonth()];
    let mesCompleto = mesesCompletos[datetime.getUTCMonth()];
    let ano = datetime.getFullYear()

    let resultado = {
        Dia_Semana: diaDaSemana,
        Dia_Mes: diaDoMes,
        mes: mes,
        ano: ano,
        mesCompleto: mesCompleto
    }

    return resultado
}