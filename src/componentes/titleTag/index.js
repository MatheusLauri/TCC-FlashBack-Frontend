import './index.scss'

export default function TitleTag(props){
    return(
      <div className='secao-title-tag'>
        <div className='top-faixa'><h1>{props.text}</h1></div>
        <div className='bottom-faixa'></div>
      </div>  
    );
}