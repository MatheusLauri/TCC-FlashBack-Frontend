import { Link } from 'react-router-dom'
import './index.scss'

export default function DestaqueBox(props) {
    let url = `http://localhost:5000/${props.imagem}`
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
  
    return(
        <div className='destaque-main'>
            <img src={url}/>
            <div className='destaque-descricao'>
                <p>{resultado}</p>
                <h1>{props.nome}</h1>
                <p>{`${props.endereco} - ${props.cidade}, ${props.uf}`}</p>
                <Link to={`/ingresso/${props.id}`}>Ver detalhes</Link>
            </div>
        </div>
    )
}