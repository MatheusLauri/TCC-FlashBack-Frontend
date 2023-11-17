import { Link, useNavigate } from 'react-router-dom';
import './index.scss'

export function CardIngresso(props) {  

    let URLimagem = `http://129.148.42.252:5014/${props.imagem}`

    //FORMATAR DATETIME
    let diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let datetime = new Date(props.data);
    let diaDaSemana = diasDaSemana[datetime.getUTCDay()];
    let diaDoMes = datetime.getUTCDate();
    let mes = meses[datetime.getUTCMonth()];
    let hora = datetime.getUTCHours();
    let minutos = datetime.getUTCMinutes();
    if (hora < 10) {
    hora = "0" + hora;
    }
    if (minutos < 10) {
    minutos = "0" + minutos;
    }
    let resultado = diaDaSemana + ", " + diaDoMes + " de " + mes + " - " + hora + ":" + minutos;
    
    return (
        <Link to={`/ingresso/${props.id}`} className="Card-Ingresso-Main">
            <img src={URLimagem}/>
            <div className='info-div'>
                <h1>{props.NomeEvento}</h1>
                <div className='descricao'>
                    <p>{props.descricao}</p>
                    <p>{resultado}</p>
                </div>
            </div>
        </Link>
    )
}