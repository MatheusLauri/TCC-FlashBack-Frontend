import { Link } from 'react-router-dom'
import Rodape from '../componentes/rodape'
import { TrianguloCategoria } from '../componentes/trianguloCategoria';
import './index.scss'


export default function Empresa(){

    return (
        <div className='empresa-main'>
            <section className='header'>
                <Link className='header-img' to='/'><img src='/assets/images/logoTCC.png' />| For Business</Link>
            </section>
            <section className='secao-inicial'>
                <div>
                    <h1>Produza eventos e conteúdos na maior plataforma do país.</h1>
                    <p>Crie agora diferentes jeitos de viver, com soluções completas para a publicação, gestão, venda e entrega das suas produções</p>
                    <a>Comece a criar</a>
                </div>
            </section>
            <section className='secao-dashboard'>
                <h1>Vários segmentos em um só lugar</h1>
                <p>Seja em festas, teatros ou palestras a gestão do seu negócio em um só lugar</p>
                <div>
                    <TrianguloCategoria 
                        src='./assets/images/teatro.svg' 
                        text='Teatros e espetáculos'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/junina.svg' 
                        text='Festas Juninas'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/agenda.svg' 
                        text='Festas e shows'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/palestra.svg' 
                        text='Palestras e congressos'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/balao.svg' 
                        text='Infantil'
                    />
                </div>
            </section>
            <Rodape/>
        </div>
    )
}