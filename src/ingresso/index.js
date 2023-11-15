import './index.scss'

import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape/index'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import seta from '../assets/images/seta.png'
import calendario from '../assets/images/calendar.png'
import local from '../assets/images/local.png'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function IngressoPage(){
    let {id} = useParams()

    const [showDescription,setShowDescription] = useState(false)
    const [ingressos,setIngressos] = useState([]) 
    const [tipoIngressos,setTipoIngressos] = useState([]) 

    function FormatPreco (vl) {
        const precoTipoFormatado = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(vl)
        return precoTipoFormatado
    }

    
    
    //variaveis listagem data
    const [idData, setIdData] = useState()
    const [idHorario, setIdHorario] = useState([])

    const [listarDatas, setListarDatas] = useState([])  
    const [listarHorarios, setListarHorarios] = useState([]) 
    const [dataSelected, setDataSelected] = useState()
    const [typeSelected, setTypeSelected] = useState()
    const [title,setTitle] = useState('Selecione uma data')
    const [show,setShow] = useState('data')

    const [dadosIngresso, setDadosIngresso] = useState()

    function AltRender(title, show) {
        setTitle(title)
        setShow(show)
    }

    let contArray = 0

    async function ListarTipoIngressos(id) {
        let url = `http://localhost:5000/tipoIngresso/${id}`
        let response = await axios.get(url)
        setTipoIngressos(response.data)
        response.data.forEach((item) => {
            qtd[item.ID_TIPO_INGRESSO] = 0
            if (item.ID_TIPO_INGRESSO > contArray){
                contArray = item.ID_TIPO_INGRESSO
            }
        })
        setPrecos(qtd)
        setQtds(qtd)
    }

    //variaveis para pré compra 
    const qtd = Array(contArray).fill(0)
    const [qtds, setQtds] = useState([])
    const [precos, setPrecos] = useState([])
    const [preco, setPreco] = useState()

    //variaveis para compra 
    const [idTipos, setidTipos] = useState([])

    const[listarPedidoIngresso, setlistarPedidoIngresso] = useState([])


    function condicionalConst(idTp, opcao, preco) {
        setQtds(prevQtds => {
            const newQtds = [...prevQtds];
            let atual = newQtds[idTp] || 0;
    
            if (opcao === 'ad') {
                newQtds[idTp] = atual + 1;
            } else if (opcao === 'sub') {
                newQtds[idTp] = Math.max(atual - 1, 0);
            }
    
            return newQtds;
        });
        setPrecos(prevPrecos => {
            const newPrecos = [...prevPrecos];
            let atualPreco = newPrecos[idTp] || 0;
            
            if (opcao === 'ad') {
                newPrecos[idTp] = atualPreco + 1 * preco;
            } else if (opcao === 'sub') {
                newPrecos[idTp] = Math.max(atualPreco - 1 * preco, 0);
            }
            
            return newPrecos;
        });
        
    }

    useEffect(() => {

        let value = 0;
        precos.forEach((item) => {
            value += item || 0;
        });
        setPreco(value)
    },[precos])

    async function ListarIngressos(){
        let url = `http://localhost:5000/ingresso/busca?nome`
        let response = await axios.get(url)
        let newArray = []
        response.data.forEach((element) => {
            newArray[element.ID_INGRESSO] = element
        });
        setIngressos(newArray[id])
    }
    
    useEffect(() => {
        ListarIngressos();
        ListarData_Comprar();
      
    },[id])



    let url = `http://localhost:5000/${ingressos.IMAGEM_INGRESSO}`

    //FORMATAR DATETIME
    const datetime = new Date(ingressos.DT_COMECO);
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const formattedDate = `${datetime.getDate()} ${monthNames[datetime.getMonth()]} - ${datetime.getFullYear()} | ${datetime.getHours()}:${datetime.getMinutes()}`;

    //Formatar datas Compra
    let diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
     function formatDt (data) {

        let datetimeCompra = new Date(data.DT_INGRESSO);
        let diaDaSemana = diasDaSemana[datetimeCompra.getUTCDay()];
        let diaDoMes = datetimeCompra.getUTCDate();
        let mes = meses[datetimeCompra.getUTCMonth()];
        

        let resultado = {
            Id: data.ID_DATA_INGRESSO,
            Dia_Semana: diaDaSemana,
            Dia_Mes: diaDoMes,
            mes: mes
        } 

        return resultado
     }
    
    //Listar Datas e horarios do Ingresso

    async function ListarData_Comprar () {
        const resp = await axios.get(`http://localhost:5000/data/compra/${id}`)

        let arrayDataFormat = [];

        for (let item of resp.data) {
            
            let dataFormat = formatDt(item);
            arrayDataFormat.push(dataFormat);
        }
        
        setListarDatas(arrayDataFormat)
        

    }

    async function ListarHorario (idData) {
        setDataSelected(idData)
        if(idData > 0){
            const resp = await axios.get(`http://localhost:5000/horario/compra/${idData}`)
        
            setListarHorarios(resp.data)

        }
    }

    function listarPosicoesOcupadas(array) {
        
        const posicoesOcupadas = [];

        for (let pos = 0; pos < array.length; pos++) {
          if (array[pos] !== undefined && array[pos] > 0) {
            posicoesOcupadas.push(pos)
          }
        }

        return posicoesOcupadas;
    }


    function listarQtds (array) {
        const qtdItens = []
        
        for (let item of array) {
            if(item != undefined && item > 0) {
                array.indexOf(item)
                qtdItens.push(item)
            }
        } 
    
  
          return qtdItens;
    }
   

    async function ClickComprar () {

        let idTipos = listarPosicoesOcupadas(qtds)
        let qtdItens = listarQtds(qtds)


        for (let cont = 0; cont < idTipos.length; cont++) {
            const resp = await axios.post(`http://localhost:5000/pedidoIngresso`, {
            
            Cliente: 1,
            Categoria: ingressos.ID_CATEGORIA_INGRESSO,
            Local: ingressos.ID_LOCAL_EVENTO,
            Ingresso: ingressos.ID_INGRESSO,
            Data: idData,
            Horario: idHorario,
            TipoIngresso: idTipos[cont],
            Itens: qtdItens[cont]

          
            }) 

            listarPedidoIngresso.push(resp.data)
            setlistarPedidoIngresso([...listarPedidoIngresso])
        }
        
    }

    console.log(listarPedidoIngresso)
  
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
                        {dataSelected > 0 && 
                            <h1>Descrição do Evento</h1>
                        }
                        <img src={seta}/>
                    </div>
                    <p>{ingressos.DS_EVENTO}</p>
                </div>
                <div className='time-ticket-controller'>
                    <div className='time-ticket-row'>
                        <div className='paginacao'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="gray"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="#520DA9"/></svg>
                        </div>
                        <div className='data-controller'>

                            {listarDatas.map((item, key) => (
                                <div onClick={() => {ListarHorario(item.Id); AltRender('Selecione um horário','horario'); setIdData(item.Id)}}  className={dataSelected == item.Id ? 'data-selected' : 'data-box'}>
                                    <h1>{item.Dia_Semana}</h1>
                                    <p>{item.Dia_Mes} {item.mes}</p>
                                </div>
                            ))}
                            
                        </div>
                        <div className='time-select'>
                            <h1 onClick={()  => console.log(qtds)}>{title}</h1>
                            <div className='ticket-wrapper'>
                                {show == 'data' &&
                                    null
                                }
                                {show == 'horario' &&
                                    listarHorarios.map((item) => (
                                        <div className='time-select-box' onClick={() => {AltRender(`Horário ${item.DS_HORARIO}`,'tipo'); ListarTipoIngressos(id); setIdHorario(item.ID_HORARIO_INGRESSO)}}>
                                            <h1>Horário {item.DS_HORARIO}</h1>
                                            <p>Preços entre R$ 10,00 e R$ 100,00</p>
                                            <p>em até 12x</p>
                                        </div>
                                    ))
                                }
                                
                                {show == 'tipo' || show == 'subtotal' ?
                                    tipoIngressos.map(item => 
                                        <div className='type-select-box' onClick={() => {setShow('subtotal'); setTypeSelected(item.ID_TIPO_INGRESSO)}}>
                                            <h1>{item.NM_TIPO_INGRESSO}</h1>
                                            <p>{FormatPreco(item.VL_PRECO_TIPO)}</p>
                                            <p>Em até 10x</p>
                                            <div>
                                                <a onClick={() => condicionalConst(item.ID_TIPO_INGRESSO,'sub',item.VL_PRECO_TIPO)} >
                                                    <RemoveCircleOutlineIcon/>
                                                </a>
                                                <span>{qtds[item.ID_TIPO_INGRESSO]}</span>
                                                <a onClick={() => condicionalConst(item.ID_TIPO_INGRESSO,'ad',item.VL_PRECO_TIPO) }>
                                                    <ControlPointIcon/>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                    : null
                                }
                                
                                
                               
                            </div>
                            {show == 'subtotal' &&
                                <div  className='subtotal-box'>
                                    <div>
                                        <h1 onClick={() => console.log(precos)}>Subtotal:</h1>
                                        <span>R$ {preco}</span>
                                    </div>
                                
                                    <Link 
                                    to={'/resumo'}
                                    state={{
                                        listarPedidoIngresso,
                                    }}
                                    onClick={ClickComprar}>Comprar ingressos</Link>
                                    
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}