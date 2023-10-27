import { Link } from 'react-router-dom';
import './index.scss'

export function TrianguloCategoria(props) {
    return(
        <Link className='box-categoria' to={`/search/${props.text}`}>
            <div className='triangulo-1'>
            </div>
            <div className='triangulo-2'>
            </div>
            <img src={props.src}/>
            <h1>{props.text}</h1>
        </Link>
    );
}