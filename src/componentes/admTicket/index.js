
import { useEffect, useState } from 'react';
import axios from 'axios';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'

export default function AdmTicket(props) {
    const [showType,setShowType] = useState(false)

    //FORMATAR ENDEREÇO
    let endereco = props.rua + ' - ' + props.cidade + ', ' + props.estado

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

    const [click,setClick] = useState(false)
    const listagem = []
    const [ListarTipos,setListarTipos] = useState([])
    async function ListarTipoIngresso(){
        try {

            let r = `http://localhost:5000/tipoIngresso/${props.id}`
            let response = await axios.get(r)
            listagem.push(response.data)
            setListarTipos(...listagem)
            console.log(ListarTipos)

        } catch (error) {
            toast.error(error)
        }
        
    }
    useEffect(() => {
        ListarTipoIngresso()
    }, [props.busca])

    return (
        <div className={showType ? 'adm-ticket-grow' : 'adm-ticket'}>
            <div className='ticket-upper-info'>
                <p onClick={() => console.log(ListarTipos)}>ID: <span>{props.id}</span></p>
                <h1 onClick={() => ListarTipoIngresso()}>{props.nome}</h1>
                <div className='ticket-controller'>
                    <img src='../assets/images/edit.svg'/>
                    <img src='../assets/images/delete.svg'/>
                </div>
            </div>
            <div className='ticket-bottom-info'>
                <div className='left-part'>
                    <p>Data/hora: <span>{dataFormatada}</span></p>
                    <p className='last-child'>Local: <span>{endereco}</span></p>
                    <div className={showType ? 'ticket-type-clicked' : 'ticket-type'}>
                        <div className='header'>
                            <a onClick={() => {setShowType(!showType); setClick(!click)}}>Tipos Ingresso, qtd e valor</a>
                            <img src='../assets/images/arrow.svg' onClick={() => setShowType(!showType)}/>
                        </div>
                        <div className='body'>
                            {ListarTipos.map(item =>
                                <div className='body-row'>
                                    <span>{item.NM_TIPO_INGRESSO}</span>				
                                    <span>{item.QTD_TIPO_INGRESSO} Un</span>
                                    <div></div>
                                    <span>R$ {item.VL_PRECO_TIPO}</span>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
                <img className='right-part' src={urlImagem}/>
            </div>
        </div>
    );
}