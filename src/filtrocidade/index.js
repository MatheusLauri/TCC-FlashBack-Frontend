import { useParams } from 'react-router-dom'
import { Header } from '../componentes/header/header'
import { TrianguloCategoria } from '../componentes/trianguloCategoria'
import './index.scss'
import BoxIngresso from '../componentes/boxIngresso'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function FiltroCidadePage() {
    let {uf,ufExtenso} = useParams()

    const [ingressos,setIngressos] = useState([])
    let ticketPush = []

     
    const [ingressosSugestao,setIngressosSugestao] = useState([])
    let ticketPushSugestao = []

    async function ListarIngressos(){
        try {
            let response = await axios.get(`http://129.148.42.252:5014/ingresso/buscaUF?uf=${uf}`)
            ticketPush.push(response.data)
            setIngressos(...ticketPush)
            if(ingressos.length == 0){
                let response = await axios.get(`http://129.148.42.252:5014/ingresso/busca?nome`)
                ticketPushSugestao.push(response.data)
                setIngressosSugestao(...ticketPushSugestao)
            }
        } catch (error) {
            
        }
        
    }
    useEffect(() => {
        ListarIngressos()
    },[uf])







    return (
        <div className='filtro-cidade-main'>
            <Header/>
            <section className='secao-01'>
                <h1>Explore e viva a diversão!</h1>
                <div className='secao-01-categoria'>
                    <TrianguloCategoria
                        src='../../assets/images/teatro.svg' 
                        text='Teatros e espetáculos'
                    />
                    <TrianguloCategoria 
                        src='../../assets/images/junina.svg' 
                        text='Festas Juninas'
                    />
                    <TrianguloCategoria 
                        src='../../assets/images/agenda.svg' 
                        text='Festas e shows'
                    />
                    <TrianguloCategoria 
                        src='../../assets/images/palestra.svg' 
                        text='Palestras e congressos'
                    />
                    <TrianguloCategoria 
                        src='../../assets/images/balao.svg' 
                        text='Infantil'
                    />
                </div>
            </section>
            <div className='main-faixa-eventos'>
                <h1>{ufExtenso}</h1>
            </div>
            <div className='ticket-wrapper'>
                {ingressos.length > 0 ? (
                    ingressos.map((item) => (
                        <BoxIngresso nome={item.NM_EVENTO} data={item.DT_COMECO} imagem={item.IMAGEM_INGRESSO} logradouro={item.DS_LOGRADOURO} cidade={item.DS_LOCALIDADE} uf={item.DS_UF} id={item.ID_INGRESSO} num={item.DS_NUM}/>
                    ))
                    ) : (
                    <>
                        <p>Nenhum Ingresso encontrado.</p>
                        <div className='divisor'></div>
                        <div className='sugestao-main'>
                            <h1>Eventos especiais...</h1>
                            <p>Confira algumas sugestões!</p>
                            <div className='ticket-wrapper-suggestion'>
                                {ingressosSugestao.map(item => (
                                    <BoxIngresso nome={item.NM_EVENTO} data={item.DT_COMECO} imagem={item.IMAGEM_INGRESSO} logradouro={item.DS_LOGRADOURO} cidade={item.DS_LOCALIDADE} uf={item.DS_UF} id={item.ID_INGRESSO} num={item.DS_NUM}/>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}