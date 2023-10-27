import { TrianguloCategoria } from '../componentes/trianguloCategoria'
import { Header } from '../componentes/header/header';
import './index.scss'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BoxIngresso from '../componentes/boxIngresso'
import axios from 'axios';

export default function PageFiltro() {
    let {categoria} = useParams()
    const [ingressos,setIngressos] = useState([])
    let ticketPush = []

    async function ListarIngressos(){
        let response = await axios.get(`http://localhost:5000/tipo/busca?nome=${categoria}`)
        ticketPush.push(response.data)
        setIngressos(...ticketPush)
    }
    useEffect(() => {
        ListarIngressos()
    },[categoria])
    
    return (
        <div className='secao-pesquisa'>
            <Header/>
            <section className='secao-01'>
                <h1>Explore e viva a diversão!</h1>
                <div className='secao-01-categoria'>
                    <TrianguloCategoria 
                        src='../assets/images/teatro.svg' 
                        text='Teatros e espetáculos'
                    />
                    <TrianguloCategoria 
                        src='../assets/images/junina.svg' 
                        text='Festas Juninas'
                    />
                    <TrianguloCategoria 
                        src='../assets/images/agenda.svg' 
                        text='Festas e shows'
                    />
                    <TrianguloCategoria 
                        src='../assets/images/palestra.svg' 
                        text='Palestras e congressos'
                    />
                    <TrianguloCategoria 
                        src='../assets/images/balao.svg' 
                        text='Infantil'
                    />
                </div>
            </section>
            <div className='main-faixa-eventos'>
                <h1>{categoria}</h1>
            </div>
            <div className='ticket-wrapper'>
                {ingressos.map(item => (
                    <BoxIngresso nome={item.NM_EVENTO} data={item.DT_COMECO} imagem={item.IMAGEM_INGRESSO} logradouro={item.DS_LOGRADOURO} cidade={item.DS_LOCALIDADE} uf={item.DS_UF} id={item.ID_INGRESSO} num={item.DS_NUM}/>
                ))

                }
            </div>
        </div>
    )
}