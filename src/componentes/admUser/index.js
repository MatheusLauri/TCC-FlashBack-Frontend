import './index.scss'

export default function AdmUser(props) {

    return(
        <div className='user-bar'>
            <h1>{props.page}</h1>
            <div>
                <span>Olá novamente, {props.user}</span>
                <span>{props.funcao}</span>
            </div>
        </div>
    )
}