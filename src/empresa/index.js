import { Header } from '../componentes/header/header'
import Rodape from '../componentes/rodape'
import './index.scss'


export default function Empresa(){

    return (
        <div className='empresa-main'>
            <section className='header'>
                <Link className='header-img' to='/'><img src='/assets/images/logoTCC.png' /></Link>
            </section>
            <section className='secao-01'>
                <h1>Produza eventos e conteúdos na maior plataforma do país.</h1>
                <p>Produza eventos e conteúdos na maior plataforma do país.</p>
            </section>
            <Rodape/>
        </div>
    )
}