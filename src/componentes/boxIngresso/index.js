
import './index.scss'
import { Link, useNavigate } from 'react-router-dom';
import formatData from '../../componentsFunctions/formatData';
import formatHorario from '../../componentsFunctions/formatHorario';


export default function BoxIngresso(props){
    const teste = 'http://129.148.42.252:5014/' + props.imagem

    const dataFormatada = formatData(props.data)
    

    const horarioFormatado = formatHorario(props.horario)
  
    console.log(horarioFormatado)

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