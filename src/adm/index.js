import React, { Component } from 'react';
import './index.scss'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import storage from 'local-storage'
import { Await, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import MenuAdm from '../componentes/menu-adm'
import CategorySection from '../componentes/categoryBtn';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import TitleRange from '../componentes/titleRange/index'
import AdmTicket from '../componentes/admTicket';

import Modal from 'react-modal'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import FormatPreco from '../componentsFunctions/formatPrecos';

export default function AdmPage() {

    const [graphicChosen, setGraphicChosen] = useState(1)
    const [menu, setMenu] = useState(1)
    const [showMenu, setShowMenu] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [logOutModal, setLogOutModal] = useState(true)

    const [toggleCondicional, setToggleCondicional] = useState(1)
    const [addPage, setAddPage] = useState(1)

    const [userBar, setUserBar] = useState(false)
    const [userRightBar, setUserRightBar] = useState(false)


    //Variáveis de login empresa

    const navigate = useNavigate();

    //Variáveis de cadastro do ingresso 
    
    const [evento, setEvento] = useState('')
    const [idEmpresa, setIdEmpresa] = useState()
    const [idLocal, setIdLocal] = useState(0)
    const [idIngresso, setIdIngresso] = useState(0)
    const [category, setCategory] = useState(1)
    const [nomeEvento, setNomeEvento] = useState('')
    const [destaque, setDestaque] = useState(false)
    const [descricao, setDescricao] = useState('')
    const [dtInicio, setDtInicio] = useState('')
    const [dtTermino, setDtTermino] = useState('')
    const [imgIngresso, setImgIngresso] = useState()

    //variáveis para a tela de pesquisa de ingressos

    const [listarIngressos, setListarIngressos] = useState()
    const [pesquisa, setPesquisa] = useState('')

    //variaveis de tipo Ingresso

    const [idTipos, setIdTipos] = useState([])
    const [nomeTipo, setNomeTipo] = useState('')
    const [qtdTipo, setQtdTipo] = useState('')
    const [precoTipo, setPrecoTipo] = useState('')

    const [vetorTipo, setVetorTipo] = useState([])

    const [alterarTipo, setAlterarTipo] = useState(false)


    //variáveis de local do evento

    const [CEP, setCEP] = useState()
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [numeroLocalEvento, setNumeroLocalEvento] = useState('')


    //variaveis listagem pedido

    const [listarPedido, setListarpedido] = useState([])


    //variaveis de cadastro de data e horario

    const [dataIngresso, setDataIngresso] = useState()
    const [listarDatas, setlistarDatas] = useState([])

    const [idData, setIdData] = useState()

    const [horarioIngresso, setHorarioIngresso] = useState()
    const [listarHorarios, setListarHorarios] = useState([])
    
    useEffect(() => {
        if( localStorage.getItem('empresa-logada')){
            let empresalogged = localStorage.getItem('empresa-logada')
            empresalogged = JSON.parse(empresalogged)
    
            let id_Empresa = empresalogged.data.ID_EMPRESA;
    
            setIdEmpresa(id_Empresa)
           
        }
        else{
            navigate('/empresas/login')
        }
        
    }, [])

    async function ListarIngressos() {
        const listagem = []

        try {
            if (pesquisa.length) {
                const resp = await axios.get(`http://localhost:5000/IngressoPorEmpresa?id=${idEmpresa}&evento=${pesquisa}`)
                listagem.push(...resp.data)
                setListarIngressos(listagem)
            }
            else {
                const resp = await axios.get(`http://localhost:5000/IngressoPorEmpresa?id=${idEmpresa}&evento=`)
                listagem.push(...resp.data)
                setListarIngressos(listagem)
            }

        } catch (err) {
            toast.error(err)
        }
    }


    useEffect(() => {

        if (listarPedido.length != 0) {
            ListarPedidos()
        };

        if (addPage === 1) {
            setDataIngresso('')
        }

    }, [pesquisa, listarIngressos, menu]);


    useEffect(() => {
        ListarIngressos()
    }, [menu, listarIngressos, pesquisa])



    function MenuPage(pagedata) {

        setMenu(pagedata)

        if (pagedata == 5) {

            setLogOutModal(true)

        }

    }

    async function addIngresso() {

        try {

            if (!imgIngresso)
                throw new Error('Insira uma imagem!')

            if (vetorTipo.length === 0)
                throw new Error('Insira ao menos um tipo de ingresso!')


            toast.success('Ingresso Adicionado!')

        } catch (err) {
            if (err.response)
                toast.error(err.response.data.erro);
            else
                toast.error(err.message);
        }

    }


    async function AdicionarInfos_Ingresso() {

        try {

            if (idIngresso === 0) {

                //Cadastro Local do evento
                const responseLocal = await axios.post(`http://localhost:5000/local`, {

                    CEP: CEP,
                    Logradouro: logradouro,
                    Bairro: bairro,
                    Localidade: cidade,
                    UF: uf,
                    Numero: numeroLocalEvento

                })


                const Id_Local = responseLocal.data.ID

                setIdLocal(Id_Local)

                //Cadastro Infos Ingresso
                let infosIngresso = {
                    Categoria: category,
                    Empresa: idEmpresa,
                    Local: Id_Local,
                    NomeEvento: nomeEvento,
                    Descricao: descricao,
                    Destaque: destaque
                }


                const responseInfosIngresso = await axios.post('http://localhost:5000/ingresso', infosIngresso)


                setIdIngresso(responseInfosIngresso.data.ID)

                const idIngresso = responseInfosIngresso.data.ID

                //Envio de imagem
                const responseImagem = await uploadImagem(idIngresso)

 

                setAddPage(2)
            }

        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }



    async function alterarInfosIngresso () {

    try {

            if(idIngresso > 0) {

            //alterar Local do evento
            const responseLocal = await axios.put(`http://localhost:5000/local/${idLocal}`, {

                CEP: CEP,
                Logradouro: logradouro,
                Bairro: bairro,
                Localidade: cidade,
                UF: uf,
                Numero: numeroLocalEvento

            })

            //Alterar Infos Ingresso
            let infosIngresso = {
                Categoria: category,
                Empresa: idEmpresa,
                Local: idLocal,
                NomeEvento: nomeEvento,
                Descricao: descricao,
                Destaque: destaque
            }


            const responseInfosIngresso = await axios.put(`http://localhost:5000/ingresso/${idIngresso}`, infosIngresso)

            //Alterar imagem de imagem
            const responseImagem = await uploadImagem(idIngresso)

            toast.success('Informações alteradas!!')

   

    }

        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }

    async function AdicionarIngresso() {
        addIngresso()
        await ListarIngressos()
    }


    async function uploadImagem(id) {


        const formData = new FormData();
        formData.append('capa', imgIngresso)

        const reposta = await axios.put(`http://localhost:5000/ingresso/${id}/capa`, formData, {

            headers: {
                "Content-Type": "multipart/form-data"
            },

        })


    }


    function escolherImagem() {
        document.getElementById('imagemCapa').click();
    }


    function mostrarImagem() {
        return URL.createObjectURL(imgIngresso)

    }



    async function cadastrarTipo() {

        try {

            const reposta = await axios.post(`http://localhost:5000/tipoIngresso`, {
                Ingresso: idIngresso,
                Tipo: nomeTipo,
                Quantidade: qtdTipo,
                Preco: precoTipo
            })

            vetorTipo.push(reposta.data)

            setVetorTipo([...vetorTipo])

            
        } catch (err) {
            if(!err) {
                toast.error(err.message)
            } else{
            toast.error(err.response.data.erro)}
        }
        
    }
   

    async function buscarInfosLocal() {

        try {

            const r = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`)


            setLogradouro(r.data.logradouro)
            setBairro(r.data.bairro)
            setCidade(r.data.localidade)
            setUf(r.data.uf)


        } catch (err) {
            toast.error('Endereço não encontrado ou CEP inválido')
        }



    }


    async function cadastrarLocal() {

        const response = await axios.post(`http://localhost:5000/local`, {

            CEP: CEP,
            Logradouro: logradouro,
            Bairro: bairro,
            Localidade: cidade,
            UF: uf,
            Numero: numeroLocalEvento

        })


        setIdLocal(response.data.ID)
    }


    async function deletarTipo(idArray, idTipo) {

        vetorTipo.splice(idArray, 1)

        setVetorTipo([...vetorTipo])

        const r = await axios.delete(`http://localhost:5000/tipoIngresso/${idTipo}`)


    }


    async function CadastrarData() {

        try {
            
            const resp = await axios.post(`http://localhost:5000/data`, {
                Ingresso: idIngresso,
                Data: dataIngresso
            })

            listarDatas.push(resp.data)
            setlistarDatas([...listarDatas])

            setDataIngresso('') 

        } catch (err) {
            toast.error(err.response.data.erro)
        }
        


    }



    async function CadastrarHorario() {

        const resp = await axios.post(`http://localhost:5000/horario`, {
            Data: idData,
            Horario: horarioIngresso
        })

        listarHorarios.push(resp.data)
        setListarHorarios([...listarHorarios])

        setHorarioIngresso('')
    }


    async function DeletarData(idArray, idData) {
        const setData = new Set();

        listarDatas.splice(idArray, 1)

        setlistarDatas([...listarDatas])

        const resp = await axios.delete(`http://localhost:5000/data/${idData}`)

        // for (let item of listarHorarios) {
        //     if (item.Data === idData) {
        //         listarHorarios.splice(listarHorarios.indexOf(item.Data), 1)
        //         setListarHorarios([...listarHorarios])
        //     }
        // }

        const filterData = listarHorarios.filter((data) => {
            const apagarHorarios = setData.has(data.Data);
            setData.add(data.Data);
            return !apagarHorarios;
          });
        

    }


    async function DeletarHorario(idArray, idHorario) {

        listarHorarios.splice(idArray, 1)

        setListarHorarios([...listarHorarios])

        const resp = await axios.delete(`http://localhost:5000/horario/${idHorario}`)

    }


    async function novoIngressoClick() {

        setIdIngresso(0)
        setNomeEvento('')
        setDtInicio('')
        setDtTermino('')
        setDescricao('')
        setCEP('')
        setLogradouro('')
        setBairro('')
        setCidade('')
        setUf('')
        setNumeroLocalEvento('')
        setNomeTipo('')
        setQtdTipo('')
        setPrecoTipo('')
        setVetorTipo([])
        setShowMenu(false)
        setDataIngresso('')
        setlistarDatas([])
        setListarHorarios([])
        setAddPage(1)

    }


    async function ListarPedidos() {

        const resp = await axios.get(`http://localhost:5000/listarPedido`)

        setListarpedido(resp.data)

    }
    

    function SairClickEmpresa() {

        storage.remove('empresa-logada')
        navigate('/empresas/login')
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            <section className='adm-main'>
                <section className='adm-panel'>
                    <MenuAdm f={MenuPage} />
                </section>
                <section className='adm-content'>
                    <section className='adm-home'>
                        {menu == 1 &&
                            <>
                                <CategorySection funcao={setCategory} valor={category} page='home' />
                                <section className='home-content'>
                                    <TitleRange text='Gráfico de vendas:' />
                                    <div className='home-grafico'>
                                        <img src='../assets/images/grafico.png' />
                                        <div className='grafico-controller'>
                                            <div onClick={() => setGraphicChosen(1)} style={graphicChosen == 1 ? { backgroundColor: `#520DA9` } : { backgroundColor: `white` }}>
                                                <div className='title'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                        <path d="M1.5625 21.875V3.12501C1.5625 2.2629 2.26446 1.5625 3.12501 1.5625H18.75C19.6121 1.5625 20.3125 2.2629 20.3125 3.12501V12.3108L21.875 10.7483V3.12501C21.875 1.39922 20.4758 0 18.75 0H3.12501C1.39922 0 0 1.39922 0 3.12501V21.875C0 23.6008 1.39922 25 3.12501 25H11.7188V23.4375H3.12501C2.26446 23.4375 1.5625 22.7372 1.5625 21.875ZM17.1875 4.68751H4.68751V6.25001H17.1875V4.68751ZM17.1875 7.81252H4.68751V9.37502H17.1875V7.81252ZM17.1875 10.9375H4.68751V12.5H17.1875V10.9375ZM4.68751 15.625H10.9375V14.0625H4.68751V15.625ZM24.5422 14.0625L23.4375 12.9578C23.1323 12.6526 22.7327 12.5 22.3329 12.5C21.9331 12.5 21.5332 12.6526 21.2282 12.9578L14.5203 19.6657C14.2151 19.9707 13.2813 21.151 13.2813 21.5508L12.5 25L15.9485 24.2188C15.9485 24.2188 17.5293 23.285 17.8344 22.9797L24.5422 16.2719C25.1526 15.6617 25.1526 14.6721 24.5422 14.0625ZM17.2836 22.4258C17.1952 22.5098 16.8891 22.7165 16.5153 22.9545L14.4912 20.9305C14.6989 20.6459 14.9299 20.3598 15.0727 20.218L20.1233 15.1674L22.3329 17.377L17.2836 22.4258Z" fill={graphicChosen == 1 ? `white` : `#520DA9`} />
                                                    </svg>
                                                    <h1 style={graphicChosen == 1 ? { color: `white` } : { color: `#520DA9` }}>Total de vendas</h1>
                                                </div>
                                                <div className='valor-filtro'>
                                                    <div className='valor' style={graphicChosen == 1 ? { color: `white` } : { color: `#520DA9` }}>
                                                        <p>$35,485</p>
                                                        <span>+2.0%<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M6.0001 1.79297L9.7072 5.50007L9.0001 6.20717L6.5001 3.70718V10.0001H5.5001V3.70718L3.00007 6.20717L2.29297 5.50007L6.0001 1.79297Z" fill={graphicChosen == 1 ? `white` : `#520DA9`} />
                                                        </svg></span>
                                                    </div>
                                                    <select className='filtro' onClick={() => setGraphicChosen(1)} style={graphicChosen == 1 ? { color: `#520DA9`, backgroundColor: `white` } : { color: `white`, backgroundColor: `#520DA9`, border: `none` }}>
                                                        <option>Semana</option>
                                                        <option>Mês</option>
                                                        <option>Ano</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div onClick={() => setGraphicChosen(2)} style={graphicChosen == 2 ? { backgroundColor: `#520DA9` } : { backgroundColor: `white` }}>
                                                <div className='title'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                        <path d="M1.5625 21.875V3.12501C1.5625 2.2629 2.26446 1.5625 3.12501 1.5625H18.75C19.6121 1.5625 20.3125 2.2629 20.3125 3.12501V12.3108L21.875 10.7483V3.12501C21.875 1.39922 20.4758 0 18.75 0H3.12501C1.39922 0 0 1.39922 0 3.12501V21.875C0 23.6008 1.39922 25 3.12501 25H11.7188V23.4375H3.12501C2.26446 23.4375 1.5625 22.7372 1.5625 21.875ZM17.1875 4.68751H4.68751V6.25001H17.1875V4.68751ZM17.1875 7.81252H4.68751V9.37502H17.1875V7.81252ZM17.1875 10.9375H4.68751V12.5H17.1875V10.9375ZM4.68751 15.625H10.9375V14.0625H4.68751V15.625ZM24.5422 14.0625L23.4375 12.9578C23.1323 12.6526 22.7327 12.5 22.3329 12.5C21.9331 12.5 21.5332 12.6526 21.2282 12.9578L14.5203 19.6657C14.2151 19.9707 13.2813 21.151 13.2813 21.5508L12.5 25L15.9485 24.2188C15.9485 24.2188 17.5293 23.285 17.8344 22.9797L24.5422 16.2719C25.1526 15.6617 25.1526 14.6721 24.5422 14.0625ZM17.2836 22.4258C17.1952 22.5098 16.8891 22.7165 16.5153 22.9545L14.4912 20.9305C14.6989 20.6459 14.9299 20.3598 15.0727 20.218L20.1233 15.1674L22.3329 17.377L17.2836 22.4258Z" fill={graphicChosen == 2 ? `white` : `#520DA9`} />
                                                    </svg>
                                                    <h1 style={graphicChosen == 2 ? { color: `white` } : { color: `#520DA9` }}>Avaliação de vendas</h1>
                                                </div>
                                                <div className='valor-filtro'>
                                                    <div className='valor' style={graphicChosen == 2 ? { color: `white` } : { color: `#520DA9` }}>
                                                        <p>$35,485</p>
                                                        <span>+2.0%<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M6.0001 1.79297L9.7072 5.50007L9.0001 6.20717L6.5001 3.70718V10.0001H5.5001V3.70718L3.00007 6.20717L2.29297 5.50007L6.0001 1.79297Z" fill={graphicChosen == 2 ? `white` : `#520DA9`} />
                                                        </svg></span>
                                                    </div>
                                                    <select className='filtro' onClick={() => setGraphicChosen(2)} style={graphicChosen == 2 ? { color: `#520DA9`, backgroundColor: `white` } : { color: `white`, backgroundColor: `#520DA9`, border: `none` }}>
                                                        <option>Semana</option>
                                                        <option>Mês</option>
                                                        <option>Ano</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div onClick={() => setGraphicChosen(3)} style={graphicChosen == 3 ? { backgroundColor: `#520DA9` } : { backgroundColor: `white` }}>
                                                <div className='title'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                        <path d="M1.5625 21.875V3.12501C1.5625 2.2629 2.26446 1.5625 3.12501 1.5625H18.75C19.6121 1.5625 20.3125 2.2629 20.3125 3.12501V12.3108L21.875 10.7483V3.12501C21.875 1.39922 20.4758 0 18.75 0H3.12501C1.39922 0 0 1.39922 0 3.12501V21.875C0 23.6008 1.39922 25 3.12501 25H11.7188V23.4375H3.12501C2.26446 23.4375 1.5625 22.7372 1.5625 21.875ZM17.1875 4.68751H4.68751V6.25001H17.1875V4.68751ZM17.1875 7.81252H4.68751V9.37502H17.1875V7.81252ZM17.1875 10.9375H4.68751V12.5H17.1875V10.9375ZM4.68751 15.625H10.9375V14.0625H4.68751V15.625ZM24.5422 14.0625L23.4375 12.9578C23.1323 12.6526 22.7327 12.5 22.3329 12.5C21.9331 12.5 21.5332 12.6526 21.2282 12.9578L14.5203 19.6657C14.2151 19.9707 13.2813 21.151 13.2813 21.5508L12.5 25L15.9485 24.2188C15.9485 24.2188 17.5293 23.285 17.8344 22.9797L24.5422 16.2719C25.1526 15.6617 25.1526 14.6721 24.5422 14.0625ZM17.2836 22.4258C17.1952 22.5098 16.8891 22.7165 16.5153 22.9545L14.4912 20.9305C14.6989 20.6459 14.9299 20.3598 15.0727 20.218L20.1233 15.1674L22.3329 17.377L17.2836 22.4258Z" fill={graphicChosen == 3 ? `white` : `#520DA9`} />
                                                    </svg>
                                                    <h1 style={graphicChosen == 3 ? { color: `white` } : { color: `#520DA9` }}>Bruto de vendas</h1>
                                                </div>
                                                <div className='valor-filtro'>
                                                    <div className='valor' style={graphicChosen == 3 ? { color: `white` } : { color: `#520DA9` }}>
                                                        <p>$35,485</p>
                                                        <span>+2.0%<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M6.0001 1.79297L9.7072 5.50007L9.0001 6.20717L6.5001 3.70718V10.0001H5.5001V3.70718L3.00007 6.20717L2.29297 5.50007L6.0001 1.79297Z" fill={graphicChosen == 3 ? `white` : `#520DA9`} />
                                                        </svg></span>
                                                    </div>
                                                    <select className='filtro' onClick={() => setGraphicChosen(3)} style={graphicChosen == 3 ? { color: `#520DA9`, backgroundColor: `white` } : { color: `white`, backgroundColor: `#520DA9`, border: `none` }}>
                                                        <option>Semana</option>
                                                        <option>Mês</option>
                                                        <option>Ano</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>
                            </>
                        }
                        {menu == 2 &&
                            <>
                                <section className='search-content'>
                                    <div className='input-div'>
                                        <img src='../assets/images/search.png' />
                                        <input type='text' placeholder='Ex: Numanice, The town...' value={pesquisa} onChange={(e) => { setPesquisa(e.target.value); console.log(e.target.value) }} />
                                    </div>
                                    <div className='ticket-wrapper'>
                                        {listarIngressos &&
                                            listarIngressos.map((item, index) => (
                                                <>
                                                    <AdmTicket
                                                        id={item.ID_INGRESSO}
                                                        nome={item.NM_EVENTO}
                                                        data={item.DT_COMECO}
                                                        horario={item.DS_HORARIO}
                                                        imagem={item.IMAGEM_INGRESSO}
                                                        qtd={item.QTD_TIPO_INGRESSO}
                                                        valor={item.VL_PRECO_TIPO}
                                                        nomeTipo={item.NM_TIPO_INGRESSO}
                                                        rua={item.DS_LOGRADOURO}
                                                        cidade={item.DS_LOCALIDADE}
                                                        estado={item.DS_UF}
                                                        busca={pesquisa}
                                                    />
                                                </>
                                            ))}


                                    </div>
                                </section>
                            </>
                        }
                        {menu == 3 &&
                            <>
                                <section className='add-content'>
                                    <div className='category-range'>
                                        {
                                            addPage === 1 &&

                                            <>
                                                <TitleRange text='Categorias' />
                                                <CategorySection funcao={setCategory} valor={category} />
                                            </>
                                        }

                                    </div>
                                    <div className='add-range'>
                                        <TitleRange text='Informações do evento' />
                                        {addPage == 1 ?
                                            <div className='add-input-main-1'>
                                                <div className='text-file-inputs-box'>

                                                    <div className='file-input-box' onClick={escolherImagem}>

                                                        {!imgIngresso &&
                                                            <img src='../assets/images/imgUpload.svg' />
                                                        }

                                                        {imgIngresso &&
                                                            <img className='imgCapaIngresso' src={mostrarImagem()} />
                                                        }


                                                        <input type='file' id='imagemCapa' onChange={e => setImgIngresso(e.target.files[0])} />

                                                    </div>




                                                </div>

                                                <div className='divisor'></div>
                                                <div className='text-inputs-box' >

                                                    <div className='text-input-box'>
                                                        <input type='text' placeholder='Nome do Evento' value={nomeEvento} onChange={(e) => setNomeEvento(e.target.value)} />
                                                    </div>


                                                    <div className='text-input-box-desc'>
                                                        <textarea type='text' placeholder='Adicionar descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                                    </div>


                                                    <div>
                                                        <input type='checkbox' name="Destaque" onChange={(e) => setDestaque(e.target.checked)} />
                                                        <label> Destaque?</label>
                                                    </div>

                                                </div>
                                                <div className='divisor'></div>
                                                <div className='text-inputs-box' >
                                                    <div className='text-input-box'>
                                                        <input type='text' placeholder='CEP' onBlur={buscarInfosLocal} value={CEP} onChange={(e) => setCEP(e.target.value)} />
                                                    </div>

                                                    <div className='text-input-box'>
                                                        <input type='text' placeholder='Logradouro' value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                                                    </div>

                                                    <div className='text-input-box'>
                                                        <input type='text' placeholder='Bairro' value={bairro} onChange={(e) => setBairro(e.target.value)} />
                                                    </div>

                                                    <div className='text-input-box'>
                                                        <input type='text' placeholder='Localidade' value={cidade} onChange={(e) => setCidade(e.target.value)} />
                                                    </div>

                                                    <div className='text-input-box'>
                                                        <input type='text' placeholder='UF' value={uf} onChange={(e) => setUf(e.target.value)} />
                                                    </div>

                                                    <div className='text-input-box'>
                                                        <input type='text' placeholder='Número' value={numeroLocalEvento} onChange={(e) => setNumeroLocalEvento(e.target.value)} />
                                                    </div>

                                                </div>

                                            </div>

                                            :
                                            <div className='add-input-main'>
                                                <div className='text-inputs-box' >

                                                    <div className='text-input-box'>
                                                        <input type='date' value={dataIngresso} onChange={(e) => setDataIngresso(e.target.value)} />
                                                    </div>
                                                    <a onClick={() => CadastrarData()}>Adicionar data</a>
                                                    <p>Clique na caixa de data para adicionar os horários</p>
                                                    <a onClick={() => setToggleCondicional(1)}>Adicionar Tipo Ingresso</a>

                                                </div>
                                                {
                                                    listarDatas.length > 0 &&
                                                    <div className='divisor'></div>
                                                }
                                                <div className='data-boxes' >

                                                    {listarDatas.map((item, idArray) => (
                                                        <div className='data-box' onClick={() => { setToggleCondicional(2); setIdData(item.ID) }}>
                                                            <p>{item.Data}</p>
                                                            <DeleteForeverIcon onClick={() => DeletarData(idArray, item.ID)} />
                                                        </div>
                                                    ))}

                                                </div>
                                                {
                                                    listarDatas.length > 0 &&
                                                    <div className='divisor'></div>
                                                }

                                                {toggleCondicional == 1 ?
                                                    <div className={showMenu ? 'type-controller-clicked' : 'type-controller'}>
                                                        <div className='header' onClick={() => setShowMenu(!showMenu)}>
                                                            <h1>Tipos de ingresso, quantidade e preço</h1>
                                                            <img src='../assets/images/arrow.svg' />
                                                        </div>
                                                        <div className='body'>
                                                            <div className='input-row'>
                                                                <input type='text' placeholder='Nome' value={nomeTipo} onChange={(e) => setNomeTipo(e.target.value)} />
                                                                <input type='number' placeholder='Qtd' value={qtdTipo} onChange={(e) => setQtdTipo(Number(e.target.value))} />
                                                                <input type='number' placeholder='R$ 0,00' value={precoTipo} onChange={(e) => { setPrecoTipo(Number(e.target.value)) }} />

                                                                <a onClick={cadastrarTipo}>Adicionar</a>

                                                            </div>
                                                            <div className='body-table'>

                                                                {vetorTipo.map((item, idArray) => (
                                                                    <div className='body-table-row'>
                                                                        <span>{item.Tipo}</span>
                                                                        <div className='divisor'></div>
                                                                        <span> {item.Quantidade} Un</span>
                                                                        <div className='divisor'></div>
                                                                        <span>{FormatPreco(item.Preco)}</span>
                                                                        <a><img src='../assets/images/delete.svg' onClick={() => deletarTipo(idArray, item.ID)} /></a>
                                                                    </div>
                                                                ))}

                                                            </div>
                                                        </div>
                                                    </div>

                                                    :

                                                    <div className={showMenu ? 'type-controller-clicked' : 'type-controller'}>
                                                        <div className='header' onClick={() => setShowMenu(!showMenu)}>
                                                            <h1>Horários de ingresso</h1>
                                                            <img src='../assets/images/arrow.svg' />
                                                        </div>
                                                        <div className='body'>
                                                            <div className='input-row'>
                                                                <input type='time' placeholder='Horário' value={horarioIngresso} onChange={(e) => setHorarioIngresso(e.target.value)} />
                                                                <a onClick={() => CadastrarHorario()}>Adicionar</a>
                                                            </div>
                                                            <div className='body-table'>

                                                                {listarHorarios.map((item, idArray) => (
                                                                    idData == item.Data &&
                                                                    <div className='body-table-row'>
                                                                        <span>{item.Horario}</span>
                                                                        <a><img src='../assets/images/delete.svg' onClick={() => DeletarHorario(idArray, item.ID)} /></a>
                                                                    </div>
                                                                ))}

                                                            </div>
                                                        </div>
                                                    </div>

                                                }

                                            </div>

                                        }
                                        <div className='button-controller'>
                                            {addPage == 2 &&

                                                <button onClick={() => setAddPage(1)}>Voltar</button>

                                            }

                                            <div>

                                                {addPage == 1 ?

                                                    idIngresso != 0 ?
                                                        <>
                                                        <button onClick={() => alterarInfosIngresso()}>Alterar Informações</button>
                                                

                                                        <button onClick={() => {AdicionarInfos_Ingresso(); setAddPage(2)}}>Prosseguir</button></>
                                                    :   <button onClick={() => AdicionarInfos_Ingresso()}>Prosseguir</button>
                                                    :
                                                    //     idIngresso != 0 ? 
                                                    //     <>
                                                    //         <button onClick={() => AdicionarIngresso()}>Alterar Infos</button>
                                                    //         <button onClick={novoIngressoClick}>Novo Ingresso</button>
                                                        
                                                    //     </>
                                                    //  :
                                                    <>
                                    
                                                        <button onClick={() => AdicionarIngresso()}>Adicionar ingresso</button>
                                                        <button onClick={() => novoIngressoClick()}>Novo Ingresso</button>
                                                    </>

                                                }

                                            </div>


                                        </div>
                                    </div>
                                </section>
                            </>
                        }
                        {menu == 4 &&

                            <>
                                <section className='Pedidos-adm'>
                                    <TitleRange text='Pedidos' />
                                    <section className='cont-options_Pedidos-adm'>
                                        <div className='pedidos-option' onClick={() => { setUserBar(true); setUserRightBar(true) }}>
                                            <a>Em andamento</a>
                                        </div>
                                        <div className='pedidos-option' onClick={() => { setUserBar(false); setUserRightBar(false) }}>
                                            <a>Concluídos</a>
                                        </div>
                                        <div className={userBar ? 'bar-left' : 'bar-right'}></div>
                                    </section>
                                    <div className='contInfosPedido_Pedidos-adm'>
                                        <table >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <h3>ID</h3>
                                                    </th>
                                                    <th>
                                                        <h3>Nome</h3>
                                                    </th>
                                                    <th>
                                                        <h3>CPF</h3>
                                                    </th>
                                                    <th>
                                                        <h3>E-mail</h3>
                                                    </th>
                                                    <th>
                                                        <h3>Telefone</h3>
                                                    </th>
                                                    <th>
                                                        <h3>Ingresso</h3>
                                                    </th>
                                                    <th>
                                                        <h3>Parcelas</h3>
                                                    </th>
                                                    <th>
                                                        <h3>Total</h3>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {listarPedido.map((item) => (
                                                    <>
                                                        <tr>
                                                            <td>{item.ID_PEDIDO}</td>
                                                            <td>{item.NM_CLIENTE} {item.NM_SOBRENOME}</td>
                                                            <td>{item.DS_CPF}</td>
                                                            <td>{item.DS_EMAIL}</td>
                                                            <td>{item.DS_TELEFONE}</td>
                                                            <td>
                                                                <div className='container-infosIngresso_PedidoCliente'>
                                                                    <div>
                                                                        <img className='container-imgEvento_PedidoCliente' src={`http://localhost:5000/${item.IMAGEM_INGRESSO}`}></img>
                                                                    </div>
                                                                    <div className='sub-container-infosIngresso_PedidoCliente'>
                                                                        <div className='valorqtd-infosIngresso_PedidoCliente'>
                                                                            <h3>Valor:<p>{item.VL_PRECO_TIPO}</p></h3>
                                                                            <h3>Qtd:<p>{item.QTD_ITENS}</p></h3>
                                                                        </div>
                                                                        <p>{item.NM_TIPO_INGRESSO}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='containerParcela-infosIngresso_PedidoCliente'>
                                                                    <p>6x (5 restantes)</p>
                                                                    <h3>Valor:<p>199,99</p></h3>
                                                                </div>
                                                            </td>
                                                            <td>399,99</td>
                                                        </tr>

                                                    </>
                                                ))}


                                            </tbody>

                                        </table>
                                    </div>
                                    <div className='listar-cards_Pedidos-adm'>


                                    </div>
                                </section>
                            </>
                        }
                        {menu == 5 &&
                            <Modal
                                className={'modal'}
                                overlayClassName={'overlay-modal'}
                                isOpen={logOutModal}
                                shouldCloseOnOverlayClick={() => setLogOutModal(!logOutModal)}
                                closeTimeoutMS={500}
                            >
                                <section className='logout-modal-content'>
                                    <h1>Você tem certeza que deseja sair?</h1>
                                    <a onClick={() => setIsLogged(false)}>Sim</a>
                                </section>
                            </Modal>
                        }

                    </section>
                </section>
            </section >
        </>
    );
}