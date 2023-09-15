import './index.scss'

export default function BoxCity(props){
    return(
        <div className='box-main' style={{backgroundImage:`url(${props.src})`}}>
            <h1>{props.city}</h1>
        </div>
    );
}
