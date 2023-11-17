import './index.scss'
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Estagio(props){
    const estagio = props.estagio
    const concluido = props.concluido

    return(
    <div className='estagio-range'>
        <h1 style={estagio > 0 && estagio <= 5 ? {color: `#520ad9`, border: `2px solid #520ad9`} : {color: `grey`, border: `2px solid #808080`}}>1
            <CheckCircleIcon  style={concluido > 0 && estagio <= 5 ? {display: `flex`} : {display: `none`}}/>
        </h1>
        <div className='divisor' style={estagio > 1 && estagio <= 5 ? {backgroundColor: `#520ad9`} : {backgroundColor: `#808080`}}></div>
        <h1 style={estagio > 1 && estagio <= 5 ? {color: `#520ad9`, border: `2px solid #520ad9`} : {color: `grey`, border: `2px solid #808080`}}>2
            <CheckCircleIcon  style={concluido > 1 && estagio <= 5 ? {display: `flex`} : {display: `none`}}/>
        </h1>
        <div className='divisor' style={estagio > 2 && estagio <= 5 ? {backgroundColor: `#520ad9`} : {backgroundColor: `#808080`}}></div>
        <h1  style={estagio > 2 && estagio <= 5 ? {color: `#520ad9`, border: `2px solid #520ad9`} : {color: `grey`, border: `2px solid #808080`}}>3
            <CheckCircleIcon  style={concluido > 2 && estagio <= 5 ? {display: `flex`} : {display: `none`}}/>
        </h1>
        <div className='divisor' style={estagio > 3 && estagio <= 5 ? {backgroundColor: `#520ad9`} : {backgroundColor: `#808080`}}></div>
        <div  style={estagio > 3 && estagio <= 5 ? {color: `#520ad9`, border: `2px solid #520ad9`} : {color: `grey`, border: `2px solid #808080`}}>
            <DoneIcon/>
            <CheckCircleIcon  style={concluido > 3 && estagio <= 5 ? {display: `flex`} : {display: `none`}}/>
        </div>
    </div>
    )
}