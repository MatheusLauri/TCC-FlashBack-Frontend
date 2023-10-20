
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

    const Tipos = []
    const [click,setClick] = useState(false)
    const [ListarTipos,setListarTipos] = useState([])
    async function ListarTipoIngresso(){
        try {
            let r = `http://localhost:5000/tipoIngresso/${props.id}`
            let response = await axios.get(r)
            Tipos.push(response)
            setListarTipos(Tipos)
            console.log(ListarTipos)
        } catch (error) {
            toast.error(error)
        }
        
    }
    useEffect(() => {
        ListarTipoIngresso()
    }, [click])

    return (
        <div className={showType ? 'adm-ticket-grow' : 'adm-ticket'}>
            <div className='ticket-upper-info'>
                <p>ID: <span>{props.id}</span></p>
                <h1 onClick={() => ListarTipoIngresso()}>{props.nome}</h1>
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
                            <a onClick={() => {setShowType(!showType); setClick(!click)}}>Tipos Ingresso, qtd e valor</a>
                            <img src='../assets/images/arrow.svg' onClick={() => setShowType(!showType)}/>
                        </div>
                        <div className='body'>
                            {ListarTipos.map(item => {
                                <div className='body-row'>
                                    <span>{props.nomeTipo}</span>
                                    <span>{props.qtd} Un</span>
                                    <div></div>
                                    <span>R$ {props.valor}</span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <img className='right-part' src={urlImagem}/>
            </div>
        </div>
    );
}