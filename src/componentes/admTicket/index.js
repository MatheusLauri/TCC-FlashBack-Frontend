
import { useEffect, useState } from 'react';
import axios from 'axios';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'

export default function AdmTicket(props) {
    const [showType,setShowType] = useState(false)

    //FORMATAR DATETIME
    const data = new Date(props.data);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0 (janeiro)
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    
    //IMAGEM
    const urlImagem = `http://localhost:5000/${props.imagem}`

    return (
        <div className={showType ? 'adm-ticket-grow' : 'adm-ticket'}>
            <div className='ticket-upper-info'>
                <p onClick={(e) => console.log(props)}>ID: <span>{props.id}</span></p>
                <h1>{props.nome}</h1>
                <div className='ticket-controller'>
                    <img src='../assets/images/edit.svg'/>
                    <img src='../assets/images/delete.svg'/>
                </div>
            </div>
            <div className='ticket-bottom-info'>
                <div className='left-part'>
                    <p>Data/hora: <span>{dataFormatada}</span></p>
                    <p className='last-child'>Local: <span>Teatro Municipal - São Paulo, SP</span></p>
                    <div className={showType ? 'ticket-type-clicked' : 'ticket-type'}>
                        <div className='header'>
                            <a onClick={() => setShowType(!showType)}>Tipos Ingresso, qtd e valor</a>
                            <img src='../assets/images/arrow.svg' onClick={() => setShowType(!showType)}/>
                        </div>
                        <div className='body'>
                            <div className='body-row'>
                                <span>Front Stage:</span>
                                <span>15 Un</span>
                                <div></div>
                                <span>R$ 150,00</span>
                            </div>
                            <div className='body-row'>
                                <span>Front Stage:</span>
                                <span>15 Un</span>
                                <div></div>
                                <span>R$ 150,00</span>
                            </div>
                            <div className='body-row'>
                                <span>Front Stage:</span>
                                <span>15 Un</span>
                                <div></div>
                                <span>R$ 150,00</span>
                            </div>
                            <div className='body-row'>
                                <span>Front Stage:</span>
                                <span>15 Un</span>
                                <div></div>
                                <span>R$ 150,00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <img className='right-part' src={urlImagem}/>
            </div>
        </div>
    );
}