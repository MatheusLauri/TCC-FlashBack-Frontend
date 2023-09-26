import './index.scss'

export default function BoxIngresso(props){
    return(
        <div className='box-ingresso-main'>
            <img className='box-ingresso-bg' src={props.src}/>
            <div className='box-ingresso-content'>
                <div className='box-ingresso-adress'><h1>{props.data}</h1></div>
                <div className='box-ingresso-name'>
                    <h1>{props.nome}</h1>
                    <p>{props.local}</p>
                </div>
            </div>
        </div>
    );
}