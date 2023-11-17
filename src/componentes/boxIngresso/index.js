
import './index.scss'
import { Link, useNavigate } from 'react-router-dom';
import formatData from '../../componentsFunctions/formatData';
import formatHorario from '../../componentsFunctions/formatHorario';


export default function BoxIngresso(props){
    const teste = 'http://localhost:5000/' + props.imagem
    // let diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    // let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    // let datetime = new Date(props.data);
    // let diaDaSemana = diasDaSemana[datetime.getUTCDay()];
    // let diaDoMes = datetime.getUTCDate();
    // let mes = meses[datetime.getUTCMonth()];
    // let hora = datetime.getUTCHours();
    // let minutos = datetime.getUTCMinutes();
    // if (hora < 10) {
    // hora = "0" + hora;
    // }
    // if (minutos < 10) {
    // minutos = "0" + minutos;
    // }
    // let resultado = diaDaSemana + ", " + diaDoMes + " de " + mes + " - " + hora + ":" + minutos;
  
    const dataFormatada = formatData(props.data)
    

    const horarioFormatado = formatHorario(props.horario)
  

    return(

        
        <Link className='box-ingresso-main' to={`/ingresso/${props.id}`}>
            <div className='box-ingresso-bgbox'>
                <img className='box-ingresso-bg' src={teste}/>
            </div>
            <div className='box-ingresso-content'>
                <div className='box-ingresso-adress'><h1>{dataFormatada.Dia_Semana}, {dataFormatada.Dia_Mes} de {dataFormatada.mes}  |  {horarioFormatado.format1}</h1></div>
                <div className='box-ingresso-name'>
                    <h1>{props.nome}</h1>
                    <p>{props.logradouro}, {props.num}<br/>{props.cidade}, {props.uf}</p>
                </div>
            </div>
        </Link>
    );
}