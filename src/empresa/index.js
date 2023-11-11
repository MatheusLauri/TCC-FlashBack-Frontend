import { Link } from 'react-router-dom'
import { Header } from '../componentes/header/header'
import Rodape from '../componentes/rodape'
import './index.scss'


export default function Empresa(){

    return (
        <div className='empresa-main'>
            <section className='header'>
                <Link className='header-img' to='/'><img src='/assets/images/logoTCC.png' /></Link>
            </section>
            <section className='secao-inicial'>
                <div>
                    <h1>Produza eventos e conteúdos na maior plataforma do país.</h1>
                    <p>Crie agora diferentes jeitos de viver, com soluções completas para a publicação, gestão, venda e entrega das suas produções</p>
                </div>
                
            </section>
            <Rodape/>
        </div>
    )
}