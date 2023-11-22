import './index.scss'

import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape/index'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import seta from '../assets/images/seta.png'
import calendario from '../assets/images/calendar.png'
import local from '../assets/images/local.png'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Estagio from '../componentes/estagioCompra';
import DevicesIcon from '@mui/icons-material/Devices';
import ReceiptIcon from '@mui/icons-material/Receipt';
import formatDatacomId from '../componentsFunctions/formatDatacomId';
import formatHorario from '../componentsFunctions/formatHorario';
import FormatPreco from '../componentsFunctions/formatPrecos';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import InputMask from 'react-input-mask';
import { Navigation } from 'swiper/modules';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function IngressoPage() {
    let { id } = useParams()
    const [buy, setBuy] = useState(false)

    const inicioRef = useRef(null);
    const [estagio, setEstagio] = useState(1)
    const [concluido, setConcluido] = useState(0)

    useEffect(() => {
        // Scroll para o início da página
        inicioRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [estagio]);
    const [parcelaSelected, setParcelaSelected] = useState('Selecione primeiro')

    const [showDescription, setShowDescription] = useState(false)
    const [ingressos, setIngressos] = useState([])
    const [tipoIngressos, setTipoIngressos] = useState([])



    //variaveis listagem data
    const [idData, setIdData] = useState()
    const [idHorario, setIdHorario] = useState([])

    const [listarDatas, setListarDatas] = useState([])
    const [listarHorarios, setListarHorarios] = useState([])
    const [dataSelected, setDataSelected] = useState()
    const [typeSelected, setTypeSelected] = useState()
    const [title, setTitle] = useState('Selecione uma data')
    const [show, setShow] = useState('data')

    

    function AltRender(title, show) {
        setTitle(title)
        setShow(show)
    }

    let contArray = 0

    async function ListarTipoIngressos(id) {
        let url = `http://localhost:5000/tipoIngresso/${id}`
        let response = await axios.get(url)
        
        let newArray = []
        let newArray2 = []

        setTipoIngressos(response.data)
        response.data.forEach((item) => {
            newArray[item.ID_TIPO_INGRESSO] = item.NM_TIPO_INGRESSO
            newArray2[item.ID_TIPO_INGRESSO] = item.VL_PRECO_TIPO
            qtd[item.ID_TIPO_INGRESSO] = 0
            if (item.ID_TIPO_INGRESSO > contArray) {
                contArray = item.ID_TIPO_INGRESSO
            }
        })
        setNmtipos(newArray)
        setVlTipo(newArray2)
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

    const [listarPedidoIngresso, setlistarPedidoIngresso] = useState([])
    const [listarPedidoIngressoEst1, setlistarPedidoIngressoEst1] = useState([])

    const[nmTipos, setNmtipos] = useState([])

    const [nmTipo, setNmtipo] = useState()
    const [vlTipo, setVlTipo] = useState()
    const [data, setData] = useState()
    const [horario, setHorario] = useState()


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
    }, [precos])

    async function ListarIngressos() {
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

    }, [id])



    let url = `http://localhost:5000/${ingressos.IMAGEM_INGRESSO}`

    //FORMATAR DATETIME
    const datetime = new Date(ingressos.DT_COMECO);
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const formattedDate = `${datetime.getDate()} ${monthNames[datetime.getMonth()]} - ${datetime.getFullYear()} | ${datetime.getHours()}:${datetime.getMinutes()}`;



    //Listar Datas e horarios do Ingresso

    async function ListarData_Comprar() {
        const resp = await axios.get(`http://localhost:5000/data/compra/${id}`)

        let arrayDataFormat = [];

        for (let item of resp.data) {

            let dataFormat = formatDatacomId(item);
            arrayDataFormat.push(dataFormat);
        }

        setListarDatas(arrayDataFormat)


    }

    async function ListarHorario(idData) {
        setDataSelected(idData)
        if (idData > 0) {
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


    function listarQtds(array) {
        const qtdItens = []

        for (let item of array) {
            if (item != undefined && item > 0) {
                array.indexOf(item)
                qtdItens.push(item)
            }
        }


        return qtdItens;
    }



    async function ClickComprar() {
        const dadosUsuario = JSON.parse(localStorage.getItem('usuario-logado')) ?? null;
        if (dadosUsuario){
            setBuy(true)
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
    
                let infosComplete = {
    
                    Ingresso: ingressos.NM_EVENTO,
                    Data: data,
                    Horario: horario,
                    TipoIngresso: nmTipos[idTipos[cont]],
                    VlTipo: vlTipo[idTipos[cont]],
                    Itens: qtdItens[cont]
                }
    
                listarPedidoIngressoEst1.push(infosComplete)
                setlistarPedidoIngressoEst1([...listarPedidoIngressoEst1])
                listarPedidoIngresso.push(resp.data)
                setlistarPedidoIngresso([...listarPedidoIngresso])
            }
        }
        else{
            toast.error('É necessário estar logado para comprar!')
        }
        

    }


    const [numeroCartao, setNumeroCartao] = useState()
    const [validade, setValidade] = useState()
    const [cvv, setCvv] = useState()
    
    async function FinalizarCompra() {
        let url = `http://localhost:5000/cartao`
        let response = await axios.post (url,{
            Numero: numeroCartao,
            Validade: validade,
            Cvv: cvv
        })
        let url2 = `http://localhost:5000/Pagamento`
        let response2 = await axios.post(url2, {
            FormaDePag: response.data.ID
        })
        let url3 = `http://localhost:5000/pedido`
        let response3 = await axios.post(url3,{
            PedidoIngresso: listarPedidoIngresso[0].ID,
            FormaPagamento: response2.data.ID
        })
        console.log(response,response2,response3)
    }

    return (
        <div className='ingresso-body'>
            <Header />
            <div className='ingresso-main' ref={inicioRef} id="inicio">
                {!buy ?
                    <>
                        <img src={url} />
                        <h1>{ingressos.NM_EVENTO}</h1>
                        <div className='ingresso-descricao'>
                            <div className='ingresso-descricao-row'>
                                <img src={calendario}/>
                                <p>{formattedDate}</p>
                            </div>
                            <div className='ingresso-descricao-column'>
                                <div className='ingresso-descricao-row'>
                                    <img src={local} />
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
                                <img src={seta} />
                            </div>
                            <p>{ingressos.DS_EVENTO}</p>
                        </div>
                        <div className='time-ticket-controller'>
                            <div className='time-ticket-row'>
                                <div className='paginacao'>
                                    <a className='prev'><KeyboardArrowLeftIcon/></a>
                                    <a className='next'><KeyboardArrowRightIcon/></a>
                                </div>
                                <div className='data-controller'>
                                    <Swiper
                                        direction='vertical'
                                        slidesPerView={4}
                                        spaceBetween={30}
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: `.prev`,
                                            nextEl: `.next`
                                        }}
                                        className="mySwiper"
                                    >
                                        {listarDatas.map((item, key) => (
                                            <SwiperSlide>
                                                <div onClick={() => { ListarHorario(item.Id); AltRender('Selecione um horário', 'horario'); setIdData(item.Id); setData(item)}} className={dataSelected == item.Id ? 'data-selected' : 'data-box'}>
                                                    <h1>{item.Dia_Semana}</h1>
                                                    <p>{item.Dia_Mes} {item.mes}</p>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                </div>
                                <div className='time-select'>
                                    <h1 onClick={() => console.log(qtds)}>{title}</h1>
                                    <div className='ticket-wrapper'>
                                        {show == 'data' &&
                                            null
                                        }
                                        {show == 'horario' &&
                                            listarHorarios.map((item) => (
                                                <div className='time-select-box' onClick={() => { AltRender(`Horário ${item.DS_HORARIO}`, 'tipo'); ListarTipoIngressos(id); setIdHorario(item.ID_HORARIO_INGRESSO); setHorario(item.DS_HORARIO) }}>
                                                    <h1>Horário {item.DS_HORARIO}</h1>
                                                    <p>Preços entre R$ 10,00 e R$ 100,00</p>
                                                    <p>em até 12x</p>
                                                </div>
                                            ))
                                        }

                                        {show == 'tipo' || show == 'subtotal' ?
                                            tipoIngressos.map(item =>
                                                <div className='type-select-box' onClick={() => { setShow('subtotal'); setTypeSelected(item.ID_TIPO_INGRESSO); setNmtipo(item.NM_TIPO_INGRESSO) }}>
                                                    <h1>{item.NM_TIPO_INGRESSO}</h1>
                                                    <p>{FormatPreco(item.VL_PRECO_TIPO)}</p>
                                                    <p>Em até 10x</p>
                                                    <div>
                                                        <a onClick={() => condicionalConst(item.ID_TIPO_INGRESSO, 'sub', item.VL_PRECO_TIPO)} >
                                                            <RemoveCircleOutlineIcon />
                                                        </a>
                                                        <span>{qtds[item.ID_TIPO_INGRESSO]}</span>
                                                        <a onClick={() => condicionalConst(item.ID_TIPO_INGRESSO, 'ad', item.VL_PRECO_TIPO)}>
                                                            <ControlPointIcon />
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                            : null
                                        }



                                    </div>
                                    {show == 'subtotal' &&
                                        <div className='subtotal-box'>
                                            <div>
                                                <h1>Subtotal:</h1>
                                                <span>{FormatPreco(preco)}</span>
                                            </div>


                                            <a onClick={() => ClickComprar()} >Comprar ingressos</a>

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Estagio estagio={estagio} concluido={concluido}/>
                        {estagio == 1 &&
                            <div className='compra-main'>
                                <div className='box'>
                                    
                                    <div className='box-row'>
                                        <div>
                                            <h1>Resumo da Compra</h1>
                                      
                                            <p>{ingressos.NM_EVENTO}</p>
                                        </div>
                                        <ReceiptIcon />
                                    </div>
                                    <div className='divisor'></div>

                                        <p>{data.Dia_Semana}, {data.Dia_Mes} de {data.mesCompleto} de {data.ano} às {horario}</p>
                                        <div className='wrapper'>
                                        
                                            {listarPedidoIngressoEst1.map((item) => (

                                                    <div>
                                                        <p>{item.Itens}x {item.TipoIngresso}</p>
                                                        <p>{FormatPreco(item.VlTipo)}</p>
                                                    </div>
                                            ))}
                                        </div>
                                    
                                    <div className='divisor'></div>
                                    <div>
                                        <h1>Subtotal</h1>
                                        <h1>{FormatPreco(preco)}</h1>
                                    </div>
                                </div>
                                <div className='box-2'>
                                    <h1>Forma de entrega</h1>
                                    <div>
                                        <DevicesIcon />
                                        <div>
                                            <h1>Disponível no celular e para Impressão</h1>
                                            <p>Seu ingresso ficará disponível na aba “Meus Pedidos” através do site Flashback.</p>
                                        </div>
                                    </div>
                                    <a onClick={() => {setEstagio(2); setConcluido(1)}}>Prosseguir</a>
                                </div>
                            </div>
                        }
                        {estagio == 2 &&
                            <div className='compra-main'>
                                <div className='box-info'>
                                    <div className='box-info-row'>
                                        <div className='box-info-col'>
                                            <h1>Informações de Pagamento</h1>
                                            <div onClick={() => {setEstagio(3); setConcluido(2)}}>
                                                <CreditCardIcon/>
                                                <div>
                                                    <p>Cartão de crédito</p>
                                                    <small>Pague em até 12x</small>
                                                </div>
                                            </div>
                                            <div>
                                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="PIX ICONE">
                                                    <path id="Vector" d="M29.6354 29.0437C28.9026 29.0463 28.1765 28.9038 27.4991 28.6245C26.8217 28.3451 26.2064 27.9344 25.6889 27.416L19.9882 21.7162C19.7866 21.5235 19.5183 21.416 19.2393 21.416C18.9604 21.416 18.6921 21.5235 18.4905 21.7162L12.7706 27.4317C12.2533 27.9508 11.6382 28.3623 10.9608 28.6425C10.2834 28.9227 9.55719 29.066 8.82406 29.0641H7.70801L14.9316 36.2821C16.015 37.3624 17.4831 37.9691 19.0136 37.9691C20.5441 37.9691 22.0122 37.3624 23.0956 36.2821L30.3336 29.0485L29.6354 29.0437Z" fill="#520DA9"/>
                                                    <path id="Vector_2" d="M8.82526 8.90191C9.5584 8.89996 10.2847 9.04322 10.9621 9.32343C11.6394 9.60363 12.2545 10.0152 12.7718 10.5344L18.4917 16.251C18.6905 16.4491 18.9598 16.5603 19.2405 16.5603C19.5213 16.5603 19.7906 16.4491 19.9894 16.251L25.6889 10.556C26.2057 10.0362 26.8207 9.62413 27.4981 9.34369C28.1756 9.06324 28.9021 8.92003 29.6354 8.92237H30.3216L23.0835 1.68993C22.5475 1.15417 21.9112 0.729168 21.2108 0.439206C20.5104 0.149243 19.7597 0 19.0016 0C18.2434 0 17.4927 0.149243 16.7923 0.439206C16.0919 0.729168 15.4556 1.15417 14.9196 1.68993L7.70801 8.90191H8.82526Z" fill="#520DA9"/>
                                                    <path id="Vector_3" d="M36.3088 14.9054L31.9348 10.5349C31.8362 10.5752 31.7308 10.5964 31.6242 10.5974H29.6353C28.6003 10.6 27.6082 11.0107 26.8747 11.7403L21.1752 17.4317C20.6619 17.9436 19.9663 18.2312 19.2411 18.2312C18.5159 18.2312 17.8203 17.9436 17.307 17.4317L11.5858 11.7186C10.8525 10.9886 9.86036 10.5775 8.82521 10.5746H6.38362C6.283 10.5723 6.18356 10.5524 6.08986 10.5156L1.68826 14.9054C0.607161 15.9879 0 17.4548 0 18.9841C0 20.5135 0.607161 21.9804 1.68826 23.0629L6.08023 27.4515C6.17373 27.4141 6.27329 27.3941 6.37399 27.3925H8.82521C9.86033 27.3895 10.8524 26.9783 11.5858 26.2485L17.3058 20.533C18.3399 19.5008 20.1422 19.5008 21.1752 20.533L26.8747 26.2268C27.6082 26.9564 28.6003 27.3671 29.6353 27.3697H31.6242C31.7308 27.3704 31.8363 27.3916 31.9348 27.4322L36.3088 23.0617C36.8449 22.5262 37.2703 21.8903 37.5605 21.1904C37.8506 20.4906 38 19.7405 38 18.9829C38 18.2254 37.8506 17.4753 37.5605 16.7754C37.2703 16.0756 36.8449 15.4397 36.3088 14.9042" fill="#520DA9"/>
                                                    </g>
                                                </svg>
                                                <div>
                                                    <p>Pix</p>
                                                    <small>Pagamento Instântaneo</small>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='boleto'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="11" viewBox="0 0 34 11" fill="none">
                                                        <path d="M0 0H0.391436V11H0V0ZM0.78287 0H1.17431V11H0.78287V0ZM3.13314 0H3.52458V11H3.13314V0ZM10.7524 0H11.1438V11H10.7524V0ZM13.2997 0H13.6911V11H13.2997V0ZM15.7696 0H16.161V11H15.7696V0ZM16.4062 0H16.7976V11H16.4062V0ZM17.0436 0H17.4351V11H17.0436V0ZM17.76 0H18.1515V11H17.76V0ZM18.4764 0H18.8678V11H18.4764V0ZM20.4676 0H20.8591V11H20.4676V0ZM25.4051 0H25.7965V11H25.4051V0ZM30.5552 0H30.9466V11H30.5552V0ZM31.9639 0H32.3553V11H31.9639V0ZM32.9819 0H33.3734V11H32.9819V0ZM33.6086 0H34V11H33.6086V0ZM5.71778 0H6.10921V11H5.71778V0ZM1.80093 0H2.50568V11H1.80093V0ZM6.45245 0H7.1572V11H6.45245V0ZM9.71856 0H10.4233V11H9.71856V0ZM11.3907 0H12.0954V11H11.3907V0ZM14.0185 0H14.7233V11H14.0185V0ZM21.5106 0H22.6068V11H21.5106V0ZM22.9426 0H23.8044V11H22.9426V0ZM24.4535 0H25.1582V11H24.4535V0ZM26.4514 0H27.6265V11H26.4514V0ZM28.7526 0H29.9277V11H28.7526V0ZM3.91601 0H5.32551V11H3.91601V0ZM7.56941 0H8.66559V11H7.56941V0Z" fill="black"/>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="6" viewBox="0 0 34 6" fill="none">
                                                        <path d="M0 5.90084V0.104474H2.22434C2.59602 0.0904476 2.96675 0.150225 3.31415 0.280197C3.58047 0.391494 3.80497 0.580753 3.95678 0.821935C4.10719 1.05018 4.18791 1.31564 4.18948 1.58717C4.1895 1.83472 4.11802 2.07725 3.98328 2.28682C3.83157 2.51779 3.6155 2.70154 3.36053 2.81641C3.68781 2.89855 3.97864 3.08312 4.18865 3.34195C4.38301 3.59454 4.48481 3.90372 4.47767 4.21975C4.4799 4.48202 4.4198 4.74121 4.3021 4.97689C4.20254 5.18825 4.05294 5.3734 3.86568 5.51701C3.67076 5.65357 3.4501 5.751 3.21643 5.80367C2.90312 5.87399 2.58219 5.90663 2.26078 5.90084H0ZM0.785061 2.54028H2.067C2.31737 2.54989 2.56795 2.52729 2.81231 2.47307C2.99112 2.42872 3.14967 2.32726 3.26281 2.18479C3.36814 2.03663 3.42133 1.85899 3.41435 1.67867C3.41801 1.49964 3.36885 1.32337 3.27275 1.17095C3.18102 1.02624 3.03854 0.919156 2.87193 0.869711C2.57641 0.803248 2.27307 0.776012 1.97011 0.788734H0.785061V2.54028ZM0.785061 5.21739H2.26078C2.43929 5.22196 2.61789 5.21276 2.79492 5.18986C2.95505 5.16446 3.10878 5.1095 3.2479 5.0279C3.375 4.94758 3.47813 4.83584 3.54686 4.704C3.62706 4.55423 3.6675 4.38716 3.66445 4.21813C3.66999 4.01646 3.61061 3.81817 3.49468 3.65128C3.38034 3.49102 3.21448 3.37273 3.02348 3.31523C2.74107 3.24056 2.4488 3.2078 2.15644 3.21806H0.785061V5.21739ZM5.62379 3.07796C5.57419 2.25207 5.85887 1.44025 6.41631 0.817886C6.67901 0.548126 6.99722 0.335893 7.34994 0.195193C7.70267 0.0544938 8.08189 -0.0114761 8.4626 0.00163219C8.98252 -0.00536497 9.49443 0.127407 9.94246 0.385465C10.378 0.637203 10.7275 1.00943 10.947 1.45518C11.1837 1.94058 11.3019 2.47308 11.2923 3.01076C11.302 3.55744 11.1773 4.09841 10.9288 4.58819C10.7034 5.03402 10.3435 5.40147 9.89774 5.6409C9.45712 5.87845 8.96161 6.00168 8.45846 5.99882C7.93194 6.00734 7.41362 5.87067 6.96287 5.60446C6.52913 5.34734 6.18171 4.97187 5.96332 4.52422C5.73835 4.07393 5.62219 3.57912 5.62379 3.07796ZM6.43287 3.09011C6.39915 3.69326 6.60709 4.28552 7.01256 4.74124C7.1954 4.93709 7.4191 5.09229 7.66854 5.19636C7.91797 5.30043 8.18734 5.35096 8.45846 5.34453C8.73121 5.3513 9.00224 5.30031 9.25296 5.19506C9.50367 5.08981 9.72815 4.93279 9.91099 4.73476C10.32 4.25113 10.5247 3.63299 10.4832 3.0067C10.4941 2.5827 10.4119 2.16134 10.2422 1.77099C10.0927 1.43437 9.84347 1.14923 9.52674 0.952307C9.21023 0.757815 8.84301 0.656865 8.46922 0.661597C8.20434 0.657673 7.94128 0.705103 7.69524 0.801144C7.4492 0.897185 7.22505 1.03993 7.03574 1.22115C6.81176 1.47678 6.6429 1.77403 6.5393 2.09505C6.4357 2.41608 6.3995 2.75426 6.43287 3.0893V3.09011ZM12.5784 5.90084V0.104474H13.3626V5.21658H16.2817V5.90084H12.5784ZM17.5388 5.90084V0.104474H21.8252V0.788734H18.3231V2.56376H21.6024V3.24397H18.3231V5.21658H21.9627V5.90084H17.5388ZM24.8611 5.90084V0.788734H22.9076V0.104474H27.6063V0.788734H25.6453V5.90084H24.8611ZM28.3293 3.07796C28.2802 2.25185 28.5654 1.44 29.1235 0.817886C29.3862 0.548126 29.7044 0.335893 30.0571 0.195193C30.4098 0.0544938 30.7891 -0.0114763 31.1698 0.00163219C31.6897 -0.00536497 32.2016 0.127407 32.6496 0.385465C33.0852 0.637203 33.4347 1.00943 33.6541 1.45518C33.8908 1.94058 34.009 2.47308 33.9995 3.01076C34.0091 3.55744 33.8845 4.09841 33.6359 4.58819C33.4098 5.03479 33.0487 5.40259 32.6016 5.64171C32.161 5.87926 31.6655 6.00249 31.1623 5.99963C30.6354 6.00806 30.1168 5.8711 29.6659 5.60446C29.2331 5.34698 28.8865 4.97154 28.6688 4.52422C28.4439 4.07393 28.3277 3.57912 28.3293 3.07796ZM29.1384 3.09011C29.1047 3.69326 29.3126 4.28552 29.7181 4.74124C29.9009 4.93709 30.1246 5.09229 30.374 5.19636C30.6235 5.30043 30.8929 5.35096 31.164 5.34453C31.4375 5.35211 31.7094 5.30159 31.9611 5.19646C32.2127 5.09133 32.438 4.93409 32.6215 4.73557C33.0305 4.25194 33.2352 3.6338 33.1937 3.00751C33.2022 2.58298 33.1175 2.1616 32.9453 1.7718C32.7957 1.43518 32.5465 1.15004 32.2298 0.953117C31.9133 0.758625 31.546 0.657677 31.1722 0.66241C30.9074 0.658486 30.6443 0.705913 30.3983 0.801953C30.1522 0.897994 29.9281 1.04074 29.7388 1.22196C29.5152 1.47762 29.3467 1.7748 29.2434 2.09567C29.1401 2.41654 29.1041 2.7545 29.1375 3.0893L29.1384 3.09011Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p>Boleto</p>
                                                    <small>Pagamento à vista</small>
                                                </div>
                                            </div>
                                        </div>
                                        <img src='/assets/images/dinheiro.png'/>
                                    </div>
                                    
                                </div>
                            </div>
                        }
                        {estagio == 3 &&
                            <div className='compra-main'>
                                <div className='box-dados'>
                                    <div className='box-dados-row'>
                                        <div className='box-dados-col'>
                                            <h1>Dados do cartão</h1>
                                            <div  className='credit'>
                                                <CreditCardIcon/>
                                                <p>Cartão de crédito</p>
                                            </div>
                                            <p><b>Parcelamento</b></p>
                                            <div className='parcela-info'>
                                                <small>Compre em até 12 vezes</small>
                                                <ErrorIcon/>
                                                <small><b>Veja as condições de parcelamento</b></small>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)}/>
                                                <label>1x de R$ {Math.floor(preco / 1)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>2x de R$ {Math.floor(preco / 2)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>3x de R$ {Math.floor(preco / 3)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>4x de R$ {Math.floor(preco / 4)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>5x de R$ {Math.floor(preco / 5)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>6x de R$ {Math.floor(preco / 6)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>7x de R$ {Math.floor(preco / 7)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>8x de R$ {Math.floor(preco / 8)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>9x de R$ {Math.floor(preco / 9)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>10x de R$ {Math.floor(preco / 10)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>11x de R$ {Math.floor(preco / 11)}</label>
                                            </div>
                                            <div className='radios'>
                                                <input type='radio' name='parcela' onChange={(e) => setParcelaSelected(e.target.nextSibling.textContent)} />
                                                <label>12x de R$ {Math.floor(preco / 12)}</label>
                                            </div>
                                            <div className='row'>
                                                <div>
                                                    <label>Número do cartão</label>
                                                    <InputMask mask="9999 9999 9999 9999" placeholder="0000 0000 0000 0000" maskChar={null} value={numeroCartao} onChange={(e) => setNumeroCartao(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label>Data de validade</label>
                                                    <InputMask mask="99/99" placeholder="MM/AA" maskChar={null} value={validade} onChange={(e) => setValidade(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label>Código de segurança</label>
                                                    <InputMask mask="999" placeholder="000" maskChar={null} value={cvv} onChange={(e) => setCvv(e.target.value)}/>
                                                </div>
                                            </div>
                                            <a onClick={() => {FinalizarCompra();setEstagio(4);setConcluido(3)}}>Finalizar</a>
                                        </div>
                                        <div className='total'>
                                            <p><b>{parcelaSelected}</b></p>
                                            <p><b style={{color: `#520ad9`}}>Total:</b> R$ {preco}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        }
                        {estagio == 4 &&
                            <div className='compra-main'>
                                <div className='box-final'>
                                    <h1>Compra realizada com sucesso</h1>
                                    <CheckCircleIcon/>

                                    <div>
                                        <DevicesIcon />
                                        <div>
                                            <h1>Verifique a aba "Meus Pedidos"</h1>
                                            <p>Seu ingresso ficará disponível para visualização na aba “Meus Pedidos” através do site Flashback.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </>
                }

            </div>
            <Rodape />
        </div>
    )
}