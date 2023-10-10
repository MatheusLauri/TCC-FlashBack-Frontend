
import { useState } from 'react';
import axios from 'axios';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'

export default function AdmTicket() {
    const [showType,setShowType] = useState(false)


    return (
        <div className={showType ? 'adm-ticket-grow' : 'adm-ticket'}>
            <div className='ticket-upper-info'>
                <p>ID: <span>1</span></p>
                <h1>Numanice</h1>
                <div className='ticket-controller'>
                    <img src='../assets/images/edit.svg'/>
                    <img src='../assets/images/delete.svg'/>
                </div>
            </div>
            <div className='ticket-bottom-info'>
                <div className='left-part'>
                    <p>Data/hora: <span>20/11/2023 20:00</span></p>
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
                <div className='right-part'></div>
            </div>
        </div>
    );
}