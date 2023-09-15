import './index.scss'

export default function TitleRange(props){
    return(
        <div className='title-range-main'>
            <div className='pre-title-form'></div>
            <h1>{props.text}</h1>
        </div>
    );
}