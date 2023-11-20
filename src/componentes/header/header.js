
import { useRef, useState } from 'react';
import './header.scss'
import Modal from 'react-modal'
import axios from 'axios';
import storage from 'local-storage'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardIngresso } from '../cardIngressoPesquisa';
import Card from '../card-Meuspedidos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RoomIcon from '@mui/icons-material/Room';
import InputMask from 'react-input-mask';

export function Header() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

// Variáveis de Cadastro do usuário
    const [NomeUsuario, setNomeUsuario] = useState('');
    const [cpfUsuario, setcpfUsuario] = useState('');
    const [emailUsuario, setemailUsuario] = useState('');
    const [senhaUsuario, setsenhaUsuario] = useState();

// Variáveis de Login do usuário
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

// Variáveis de abertura de modal
    const [handleMenu, toggle] = useState(false)
    const [userModal, setUserModal] = useState(false)
    const [userPopUp, setUserPopUp] = useState(false)


//  Variável para renderização condicional
    const [uptadeUser,setUpdateUser] = useState(false)


// Variável para modificação da barra de usuário
    const [userBar,setUserBar] = useState(false)
    const [userRightBar,setUserRightBar] = useState(false)



// Variavel de estado barra de pesquisa
    const cardsPequenos = []
    const [busca, setBusca] = useState('')
    const [listagembusca, setlistagemBusca] = useState([])
    const [listagembuscaMostrarDialog, setlistagembuscaMostrarDialog] = useState(false)

// Variavel de paginação de Cadastro
    const [page,setPage] = useState(1)

    const [listarPedido, setListarPedido] = useState()

    function VerificarLoginAuto() {
        const dadosUsuario = JSON.parse(localStorage.getItem('usuario-logado')) ?? null;
        if (dadosUsuario) {
            // O usuário está logado, você pode definir o estado de autenticação aqui
            // Exemplo utilizando um estado com React
            // Armazenar informações do usuário
            setIsLogged(true)
            setUserId(dadosUsuario.data.ID_CLIENTE)
            setUserNomeDeUsuario(dadosUsuario.data.NM_USUARIO)
            setUserCPF(dadosUsuario.data.DS_CPF)
            setUserEmail(dadosUsuario.data.DS_EMAIL)
            setUserSenha(dadosUsuario.data.DS_SENHA)
            setUserTelefone(dadosUsuario.data.DS_TELEFONE)
            setUserNome(dadosUsuario.data.NM_CLIENTE)
            setUserSobrenome(dadosUsuario.data.NM_SOBRENOME)
            setUsuario(dadosUsuario.data.NM_USUARIO)
            SetAniversario(dadosUsuario.data.DT_NASCIMENTO)
            
        }
    }
    async function ListarPedido() {
        try {
            let user = localStorage.getItem(`usuario-logado`)
            user = JSON.parse(user)
            let id = user.data.ID_CLIENTE
            let url = `http://localhost:5000/pedido?id=${id}`
            let response = await axios.get(url)
            setListarPedido(response.data)
        } catch (error) {
            toast.error(error)
        }
        
    }

    useEffect(() => {
        VerificarLoginAuto()
        ListarPedido()
    }, [userRightBar])

// Função de cadastro com API
    async function CadastrarCliente () {
        try {

            let cliente = {
                NomeUsuario: NomeUsuario, 
                CPF: cpfUsuario,
                Email: emailUsuario,
                Senha: senhaUsuario, 
                DataNasc: aniversario,
                Nome: userNome,
                Sobrenome:userSobrenome
            }
        

            const r = await axios.post('http://localhost:5000/cliente', cliente)
            toast.success(`Cadastro realizado com sucesso!`)
            toggle(false)
        
            setNomeUsuario('')
            setemailUsuario('')
            setcpfUsuario('')
            setsenhaUsuario('')

        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }




// Variáveis de informação do usuário
    const [userId,setUserId] = useState('')
    const [userNomeDeUsuario, setUserNomeDeUsuario] = useState('')
    const [userCPF,setUserCPF] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [userSenha,setUserSenha] = useState('')
    const [userTelefone,setUserTelefone] = useState('')
    const [userNome,setUserNome] = useState('')
    const [userSobrenome,setUserSobrenome] = useState('')
    const [usuario, setUsuario] = useState('')
    const [aniversario, SetAniversario] = useState('') 
  
// Função de Login com API

    async function AlterarCadastro(){


        const InfoAdicionais = {

            Nome: userNome,
            Sobrenome:userSobrenome,
            CPF: userCPF,
            DataNasc: aniversario,
            Telefone: userTelefone,
            NomeUsuario: userNomeDeUsuario,
            Email: userEmail,
            Senha: userSenha,

        }

        const url = await axios.put(`http://localhost:5000/cliente/alterarInfos/${userId}`, InfoAdicionais)
        setUsuario(userNomeDeUsuario)
        toast.success(`Cadastro feito!`)

    }

    function HandleEnterDown(e){
        if (e.key === 'Enter'){
            navigate(`/search/${busca}`)
        }
    }

    async function Logar() {

        try {
            const resp = await axios.post('http://localhost:5000/cliente/login', {
                NomeUsuario: email,
                cpf: email,
                email: email,
                senha: senha
            });

            storage('usuario-logado', resp)
            const dadosUsuario = JSON.parse(localStorage.getItem('usuario-logado')) ?? null;

            // Armazenar informações do usuário
            setUserId(dadosUsuario.data.ID_CLIENTE)
            setUserNomeDeUsuario(dadosUsuario.data.NM_USUARIO)
            setUserCPF(dadosUsuario.data.DS_CPF)
            setUserEmail(dadosUsuario.data.DS_EMAIL)
            setUserSenha(dadosUsuario.data.DS_SENHA)
            setUserTelefone(dadosUsuario.data.DS_TELEFONE)
            setUserNome(dadosUsuario.data.NM_CLIENTE)
            setUserSobrenome(dadosUsuario.data.NM_SOBRENOME)
            setUsuario(dadosUsuario.data.NM_USUARIO)
            SetAniversario(dadosUsuario.data.DT_NASCIMENTO)
            setIsLogged(true)

            // Alert de sucesso para o usuário
            toast.success(`Seja bem-vindo, ${dadosUsuario.data.NM_CLIENTE} ${dadosUsuario.data.NM_SOBRENOME}!`)

            // Realizar alterações na renderização dos modais
            setShowModal(false)
            setUserPopUp(false)

        } catch (err) {
            toast.error(err.response.data.erro)
        }

    }

    
    // useEffect(() => {
    //     let empresalogged = localStorage.getItem('empresa-logada')
    //     empresalogged = JSON.parse(empresalogged)

    //     let id_Empresa = empresalogged.data.ID_EMPRESA;

    //     setIdEmpresa(id_Empresa)

    // }, [])

    useEffect(() => {
        if( localStorage.getItem('usuario-logado')){
            let usuariologged = localStorage.getItem('usuario-logado')
            usuariologged = JSON.parse(usuariologged)
        
            setUserr(usuariologged.data.NM_USUARIO)
        
           
        }
        
    }, [])

    const [userr, setUserr] = useState()

    const [ShowUfModal,setShowUfModal] = useState(false)


// função barra de pesquisa

    useEffect(() => {
        BarraDePesquisaIngresso()
    }, [busca])

    
    async function BarraDePesquisaIngresso() {
        try {
            let response = await axios.get(`http://localhost:5000/ingresso/busca?nome=${busca}`)
            cardsPequenos.push(...response.data)
            setlistagemBusca(cardsPequenos)
            if(busca.length > 0)
                setlistagembuscaMostrarDialog(true)
            else{
                setlistagembuscaMostrarDialog(false)
            }
        } catch (err) {
            toast.error(err.response.data.erro);
            setlistagembuscaMostrarDialog(false)
        }
    }


    async function SairUsuario(){
        storage.remove('usuario-logado')
        navigate('/')
    }
    const searchInputRef = useRef(null);
    useEffect(() => {
        const outsideClickListener = (event) => {
          // Verificar se o clique ocorreu fora do dialog
          if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setlistagembuscaMostrarDialog(false);
          }
        };
    
        if (listagembuscaMostrarDialog) {
          // Adicionar um event listener para fechar o dialog clicando fora dele
          document.addEventListener('click', outsideClickListener);
        }
    
        return () => {
          // Remover o event listener ao desmontar o componente
          document.removeEventListener('click', outsideClickListener);
        };
    }, [listagembuscaMostrarDialog]);
     
    return (
        <section className='header-main'>
            <ToastContainer />
            <section className="secao-header">
                <Link className='header-img' to='/'><img src='/assets/images/logoTCC.png' /></Link>
                <div className='secao-header-input-div'>
                    <img src='/assets/images/lupa.svg'/>
                    
                    <input type='text' ref={searchInputRef} placeholder='Pesquisar eventos, shows, teatros, festas...' onChange={(e) => setBusca(e.target.value)} onKeyDown={(e) => HandleEnterDown(e)} onClick={() => setlistagembuscaMostrarDialog(true)}/>

                    {listagembuscaMostrarDialog && busca.length > 0 && 
                        <dialog open className='infos-Barra_de_pesquisa-header'>
                            <h1>Resultados</h1>
                            <div className='listagem'>
                                {listagembusca.map((item,index) => (
                                    <CardIngresso 
                                        id={item.ID_INGRESSO}
                                        NomeEvento={item.NM_EVENTO} 
                                        imagem={item.IMAGEM_INGRESSO}
                                        descricao={item.DS_EVENTO}
                                        data={item.DT_COMECO}
                                    />
                                ))}
                            </div>
                        </dialog>

                    }
                    
                </div>
                
                <div className='secao-header-menu'>
                    <div className='menu-select' onClick={() => setShowUfModal(true)}>
                        <img src='/assets/images/local.svg' />
                        <a>Escolha um local</a>
                        <KeyboardArrowDownIcon/>
                    </div>
                    <Link className='revendedor' to={'/empresas'}>Seja um revendedor!</Link>
                    {isLogged && userr
                        ?   <>
                            <div className='user-div'>
                                <div className='user' onClick={() => setUserPopUp(!userPopUp)}>
                                    <i className="fas fa-user"></i>
                                    <a>{`${userNome} ${userSobrenome}`}</a>
                                </div>
                                <div className='user-option' style={userPopUp ? {display:'flex'} : {display: 'none'}}>
                                    <div className='baloon'></div>
                                    <div className='user-option-row' onClick={() => {setUserModal(!userModal); setUserPopUp(!userPopUp)}}
                                    >
                                        <img src='./assets/images/info.svg'/>
                                        <a>Informações da conta</a>
                                    </div>
                                    <div className='user-option-row' onClick={() => {setIsLogged(false); setUserModal(false)}}>
                                        <img src='./assets/images/sair.svg'/>
                                        <a onClick={SairUsuario}>sair</a>
                                    </div>
                                </div>
                            </div>
                            
                            </>

                            : <a onClick={() => setShowModal(!showModal)}>Entrar</a>
                    }
                        </div>

            </section>
            <Modal
                className="ufmodal"
                overlayClassName="modal-overlay"
                closeTimeoutMS={500}
                isOpen={ShowUfModal}
                onRequestClose={() => setShowUfModal(false)}
            >
                <div className='uf-main'>
                    <h1>Localização</h1>
                    <input placeholder='Pesquise por estados...'/>
                    <div className='my-loc'>
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.93126 12.1308C1.9261 12.1308 1.63559 10.7247 2.55465 10.308L20 2.49992C21 1.99995 22 3 21.5 4L13.8527 21.4417C13.4379 22.3727 12.0765 22.0698 12.0765 21.0465L10 14L2.93126 12.1308Z"></path></svg>
                        <div>
                            <h1>Usar minha localização atual</h1>
                            <small>Encontre eventos perto de você</small>
                        </div>
                    </div>
                    <div className='wrapper'>
                        <div onClick={() => navigate('/estado/sp/São Paulo')}>
                            <RoomIcon/>
                            <a>São Paulo</a>
                        </div>
                        <div>
                            <RoomIcon/>
                            <a>Rio de Janeiro</a>
                        </div>
                        <div>
                            <RoomIcon/>
                            <a>Belo Horizonte</a>
                        </div>
                        
                    </div>
                </div>
            </Modal>
            <Modal
                className="modal"
                overlayClassName="modal-overlay"
                closeTimeoutMS={500}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <div className='adm-login'>
                    <div className={handleMenu ? 'sign-up-mode' : 'container'}>
                        <div className="forms-container">
                            <div className="signin-signup">
                                <div className="sign-in-form">
                                    <h2 className="title">Entrar</h2>
                                    <div className="input-field">
                                        <i className="fas fa-user"></i>
                                        <input type="text" placeholder="Usuário, E-mail ou CPF"  value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Fazer Login" className="btn solid" onClick={Logar} />
                                                                       
                                </div>
                                {page == 1 &&
                                    <div className="sign-up-form">
                                        <h2 className="title">Cadastre-se</h2>
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <input type="text" placeholder="Usuário"  value={NomeUsuario}  onChange={e => setNomeUsuario(e.target.value)}/>
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-envelope"></i>
                                            <input type="email" placeholder="E-mail" value={emailUsuario}  onChange={e => setemailUsuario(e.target.value)}/>
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-envelope"></i>
                                            <InputMask mask="999.999.999-99" placeholder="CPF" value={cpfUsuario} onChange={e => setcpfUsuario(e.target.value)}/>

                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Senha" value={senhaUsuario}  onChange={e => setsenhaUsuario(e.target.value)}/>
                                        </div>
                                        <input type="submit" className="btn" value="Prosseguir" onClick={() => setPage(2)}/>
                                        
                                       
                                    </div>
                                }
                                {page == 2 &&
                                    <div className="sign-up-form">
                                        <h2 className="title">Estamos quase terminando...</h2>
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <input type="text" placeholder="Nome"  value={userNome}  onChange={e => setUserNome(e.target.value)}/>
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <input type="text" placeholder="Sobrenome"  value={userSobrenome}  onChange={e => setUserSobrenome(e.target.value)}/>
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <input type="date" placeholder="Data de Nascimento"  value={aniversario}  onChange={e => SetAniversario(e.target.value)}/>
                                        </div>

                                        <div style={{display: `flex`,gap: `10px`}}>
                                            <input type="submit" className="btn" value="Voltar" onClick={() => setPage(1)}/>
                                            <input type="submit" className="btn" value="Cadastre-se" onClick={CadastrarCliente}/>
                                        </div>
                                        
                                    </div>
                                }
                                
                            </div>
                        </div>

                        <div className="panels-container">
                            <div className="panel left-panel">
                                <div className="content">
                                    <h3>Não tem cadastro?</h3>
                                    <p>Cadastre-se e inicie sua jornada conosco.</p>
                                    <button className="btn transparent" id="sign-up-btn" onClick={() => toggle(true)}>Cadastre-se</button>
                                </div>
                                <img src="./assets/images/log.svg" className="image" alt="" />
                            </div>
                            <div className="panel right-panel">
                                <div className="content">
                                    <h3>Já tem cadastro?</h3>
                                    <p>Faça login com suas informações de acesso.</p>
                                    <button className="btn transparent" id="sign-in-btn" onClick={() => toggle(false)}>
                                        Entrar
                                    </button>
                                </div>
                                <img src="./assets/images/register.svg" className="image" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                className="modal-user"
                overlayClassName="modal-overlay"
                closeTimeoutMS={500}
                isOpen={userModal}
                onRequestClose={() => setUserModal(false)}
            >
                <section className='user-modal-main'>
                    <section className='user-option-select'>
                        <div className='user-option' onClick={() => {setUserBar(true); setUserRightBar(true)}}>
                            <i class="fas fa-paste"></i>
                            <a>Meus Pedidos</a>
                        </div>
                        <div className='user-option' onClick={() => {setUserBar(false); setUserRightBar(false)}}>
                            <i className="fas fa-user"></i>
                            <a>Informações da Conta</a>
                        </div>
                        <div className={userBar ? 'bar-left' : 'bar-right'}></div>
                    </section>
                    {userRightBar
                    ?
                    <section className='left-side'>
                        {listarPedido ?
                                listarPedido.map(item => (
                                    <Card imagem={item.IMAGEM_INGRESSO} evento={item.NM_EVENTO} rua={item.DS_LOGRADOURO} data={item.DT_INGRESSO} situacao={item.BT_SITUACAO}/>
                                ))
                            :
                                <p>É necessário realizar uma compra para visualizar seus pedidos</p>
                        }
                    </section>
                    :
                    <section className='right-side'> 
                        <section className='info-part'>
                            <h1>Dados Pessoais</h1>
                            <div className='info-form-div'>
                                <div className='info-input-div'>
                                    <label>Nome de usuário</label>
                                    <input type='text' value={userNomeDeUsuario} onChange={(e) => {setUserNomeDeUsuario(e.target.value); setUpdateUser(true)}}/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Nome </label>
                                    <input type='text' value={userNome} onChange={(e) => {setUserNome(e.target.value); setUpdateUser(true)}}/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Sobrenome</label>
                                    <input type='text' value={userSobrenome} onChange={(e) => {setUserSobrenome(e.target.value); setUpdateUser(true)}}/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Data de nascimento</label>
                                    <input type='date'/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Celular</label>
                                    <input type='tel' value={userTelefone} onChange={(e) => {setUserTelefone(e.target.value); setUpdateUser(true) }}/>
                                </div>
                                <div className='info-input-div'>
                                    <label>CPF</label>
                                    <input type='text' value={userCPF} onChange={(e) => {setUserCPF(e.target.value); setUpdateUser(true)}}/>
                                </div>
                            </div>
                            <h1>Dados de Login</h1>
                            <div className='info-form-div'>
                                <div className='info-input-div'>
                                    <label>Senha</label>
                                    <input type='password' value={userSenha} onChange={(e) => {setUserSenha(e.target.value); setUpdateUser(true)}}/>
                                </div>
                                    {uptadeUser &&
                                        <div className='info-input-div'>
                                            <label>Confirme sua Senha</label>
                                            <input type='password'/>
                                        </div>
                                    }
                            </div>
                            {uptadeUser 
                            ? 
                                <div className='user-info-button'>
                                    <a onClick={() => setUserModal(false)}>Fechar</a>
                                    <a onClick={AlterarCadastro}>Atualizar</a>
                                </div>
                            :
                                <div className='user-info-button'>
                                    <a onClick={() => setUserModal(false)}>Fechar</a>
                                </div>
                            }
                        </section>
                        <section className='image-part'>
                            <img src='/assets/images/bguserinfo.png'/>
                        </section>
                    </section>
                    }
                </section>
            </Modal>

        </section>
    );
}