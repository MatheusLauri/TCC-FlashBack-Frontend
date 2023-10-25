import './index.scss'

import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape/index'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import seta from '../assets/images/seta.png'
import calendario from '../assets/images/calendar.png'
import local from '../assets/images/local.png'

export default function IngressoPage(){
    let {id} = useParams()
    const [showDescription,setShowDescription] = useState(false)
    const [ingressos,setIngressos] = useState([]) 
    const [tipoIngressos,setTipoIngressos] = useState([]) 

    async function ListarIngressos(){
        let url = `http://localhost:5000/ingresso/busca?nome`
        let response = await axios.get(url)
        setIngressos(response.data[id-1])
    }
    
    useEffect(() => {
        ListarIngressos()
    },[ingressos])
    let url = `http://localhost:5000/${ingressos.IMAGEM_INGRESSO}`
    
    //FORMATAR DATETIME
    const datetime = new Date(ingressos.DT_COMECO);
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const formattedDate = `${datetime.getDate()} ${monthNames[datetime.getMonth()]} - ${datetime.getFullYear()} | ${datetime.getHours()}:${datetime.getMinutes()}`;

    return (
        <div className='ingresso-body'>
            <Header/>
            <div className='ingresso-main'>
                <img src={url}/>
                <h1>{ingressos.NM_EVENTO}</h1>
                <div className='ingresso-descricao'>
                    <div className='ingresso-descricao-row'>
                        <img src={calendario}/>
                        <p>{formattedDate}</p>
                    </div>
                    <div className='ingresso-descricao-column'>
                        <div className='ingresso-descricao-row'>
                            <img src={local}/>
                            <h1>{`${ingressos.DS_LOGRADOURO}, ${ingressos.DS_NUM}`}</h1>
                        </div>
                        <p>{`${ingressos.DS_LOCALIDADE}, ${ingressos.DS_UF}`}</p>
                    </div>
                </div>
                <div className={showDescription ? 'descricao-controller-opened' : 'descricao-controller'}>
                    <div className='header' onClick={() => setShowDescription(!showDescription)}>
                        <h1>Descrição do Evento</h1>
                        <img src={seta}/>
                    </div>
                    <p>{ingressos.DS_EVENTO}</p>
                </div>
                <div className='time-ticket-controller'>
                    <h1>Selecione uma data</h1>
                    <div className='time-ticket-row'>
                        <div className='paginacao'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="gray"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="#520DA9"/></svg>
                        </div>
                        <div className='data-controller'>
                            <div className='data-box'>
                                <h1>Segunda-feira</h1>
                                <p>12 set</p>
                            </div>
                            <div className='data-box'>
                                <h1>Terça-feira</h1>
                                <p>12 set</p>
                            </div>
                            <div className='data-box'>
                                <h1>Quarta-feira</h1>
                                <p>12 set</p>
                            </div>
                        </div>
                        <div className='time-select'>
                            <h1>Selecione um horário</h1>
                            <div className='ticket-wrapper'>
                                <div className='time-select-box'>
                                    <h1>Horário 23:00</h1>
                                    <p>Preços entre R$ 10,00 e R$ 100,00</p>
                                    <p>em até 12x</p>
                                </div>
                                <div className='time-select-box'>
                                    <h1>Horário 23:00</h1>
                                    <p>Preços entre R$ 10,00 e R$ 100,00</p>
                                    <p>em até 12x</p>
                                </div>
                                <div className='time-select-box'>
                                    <h1>Horário 23:00</h1>
                                    <p>Preços entre R$ 10,00 e R$ 100,00</p>
                                    <p>em até 12x</p>
                                </div>
                                <div className='time-select-box'>
                                    <h1>Horário 23:00</h1>
                                    <p>Preços entre R$ 10,00 e R$ 100,00</p>
                                    <p>em até 12x</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}