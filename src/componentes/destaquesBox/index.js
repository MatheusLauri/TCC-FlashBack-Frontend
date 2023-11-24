import { Link, useNavigate } from 'react-router-dom'
import './index.scss'

export default function DestaqueBox(props) {

    const navigate = useNavigate()

    let url = `http://129.148.42.252:5014/${props.imagem}`
    function FormatDate(e){
        let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        let datetime = new Date(e);
        let diaDoMes = datetime.getUTCDate();
        let mes = meses[datetime.getUTCMonth()];
        let resultado = `${diaDoMes} ${mes}`
        return resultado
    }
    let dataC = FormatDate(props.dataC)
    let dataF = FormatDate(props.dataF)
    let barra = '›'
    
  
    return(
        <div className='destaque-main'>
            <div className='img-div'>
                <img src={url} className='img'/>
            </div>
            <div className='destaque-descricao'>
                <div className='desc'>
                    <p>{dataC}<span> {barra} </span> {dataF}</p>
                    <h1>{props.nome}</h1>
                    <p>{`${props.endereco} - ${props.cidade}, ${props.uf}`}</p>
                </div>
                <a onClick={() => navigate(`/ingresso/${props.id}`)}>Ver detalhes</a>
            </div>
        </div>
    )
}