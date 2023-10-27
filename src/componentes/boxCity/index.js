import { Link } from 'react-router-dom';
import './index.scss'

export default function BoxCity(props){
    return(
        <Link to={`/estado/${props.uf}/${props.city}`} className='Link-box-city'>
            <div className='box-main' style={{backgroundImage:`url(${props.src})`}}>
                <h1>{props.city}</h1>
            </div>
        </Link>
            
    );
}
