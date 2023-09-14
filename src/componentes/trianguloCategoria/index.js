import './index.scss'

export function TrianguloCategoria(props) {
    return(
        <div className='box-categoria'>
            <div className='triangulo-1'>
            </div>
            <div className='triangulo-2'>
            </div>
            <img src={props.src}/>
            <h1>{props.text}</h1>
        </div>
    );
}