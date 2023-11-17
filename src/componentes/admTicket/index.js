
import { useEffect, useState } from 'react';
import axios from 'axios';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'

import formatHorario from '../../componentsFunctions/formatHorario';
import formatData from '../../componentsFunctions/formatData';

export default function AdmTicket(props) {
    const [showType,setShowType] = useState(false)

    //FORMATAR ENDEREÇO
    let endereco = props.rua + ' - ' + props.cidade + ', ' + props.estado

    //FORMATAR DATA
    
    const dataFormatada = formatData(props.data);
    const horarioFormatado = formatHorario(props.horario)
    
    //IMAGEM
    const urlImagem = `http://129.148.42.252:5014/${props.imagem}`

    const [click,setClick] = useState(false)
    const [ListarTipos,setListarTipos] = useState([])

    async function ListarTipoIngresso(){
        try {

            let r = `http://129.148.42.252:5014/tipoIngresso/${props.id}`
            let response = await axios.get(r)
            setListarTipos(response.data)
            console.log(ListarTipos)

        } catch (error) {
            toast.error(error)
        }
        
    }

    //Deltar Ingresso

    async function deletarIngresso (id) {

        try {

            const resp = await axios.delete(`http://129.148.42.252:5014/ingresso/${id}`)
            
        } catch (err) {

            toast.error(err.response.data.erro)
            
        }
    }
    useEffect(() => {
        ListarTipoIngresso()
    }, [props.busca])

    return (
        <div className={showType ? 'adm-ticket-grow' : 'adm-ticket'}>
            {props &&
                <>
                     <div className='ticket-upper-info'>
                <p onClick={() => console.log(ListarTipos)}>ID: <span>{props.id}</span></p>
                <h1 onClick={() => ListarTipoIngresso()}>{props.nome}</h1>
                <div className='ticket-controller'>
                    <img src='../assets/images/edit.svg'/>
                    <img src='../assets/images/delete.svg' onClick={() => deletarIngresso(props.id)}/>
                </div>
            </div>
            <div className='ticket-bottom-info'>
                <div className='left-part'>
                    <p>Data/hora: <span>{dataFormatada.Dia_Mes}, {dataFormatada.mesCompleto} de {dataFormatada.ano} - {horarioFormatado.format1}</span></p>
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
                </>
            }
           
        </div>
    );
}