
import { useState } from 'react';
import './header.scss'
import Modal from 'react-modal'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
// Função de cadastro com API
    async function CadastrarCliente () {
        try {

            let cliente = {

                NomeUsuario: NomeUsuario, 
                CPF: cpfUsuario,
                Email: emailUsuario,
                Senha: senhaUsuario

            }
            console.log(cliente)

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



    const [busca, setBusca] = useState('')
    const [listagembusca, setlistagemBusca] = useState([])
    const [listagembuscaMostrarDialog, setlistagembuscaMostrarDialog] = useState(false)

  
// Função de Login com API



    async function AlterarCadastro(){


        const InfoAdicionais = {

            Nome: userNome,
            Sobrenome:userSobrenome,
            CPF: userCPF,
            Telefone: userTelefone,
            NomeUsuario: userNomeDeUsuario,
            Email: userEmail,
            Senha: userSenha  

        }

        const url = await axios.put(`http://localhost:5000/cliente/alterarInfos/${userId}`, InfoAdicionais)
        setUsuario(userNomeDeUsuario)
        toast.success(`Cadastro feito!`)

    }


    async function Logar() {

        try {
            const resp = await axios.post('http://localhost:5000/cliente/login', {
                NomeUsuario: email,
                cpf: email,
                email: email,
                senha: senha
            });


            // Armazenar informações do usuário
            setUserId(resp.data.ID_CLIENTE)
            setUserNomeDeUsuario(resp.data.NM_USUARIO)
            setUserCPF(resp.data.DS_CPF)
            setUserEmail(resp.data.DS_EMAIL)
            setUserSenha(resp.data.DS_SENHA)
            setUserTelefone(resp.data.DS_TELEFONE)
            setUserNome(resp.data.NM_CLIENTE)
            setUserSobrenome(resp.data.NM_SOBRENOME)
            setUsuario(resp.data.NM_USUARIO)
            // Alert de sucesso para o usuário
            toast.success(`Seja bem-vindo, ${resp.data.NM_USUARIO} !`)
            // Realizar alterações na renderização dos modais
            setIsLogged(true)
            setShowModal(false)
            setUserPopUp(false)
        } catch (err) {
            toast.error(err.response.data.erro)
        }

    }

    async function BarraDePesquisaIngresso() {
        try {
            
            let response = await axios.get(`http://localhost:5000/ingresso/busca?nome=${busca}`)
            setlistagemBusca(response)
            console.log(response)
            if(response.status === 200){
                setlistagembuscaMostrarDialog(true)
            }
           
            
           

        } catch (err) {
            toast.error(err.response.data.erro);
        }
    }
     
    


    return (
        <section className='header-main'>
            <ToastContainer />
            <section className="secao-header">
                <img src='/assets/images/logoTCC.png' />
                <div className='secao-header-input-div'>
                    <img src='/assets/images/lupa.svg'  onClick={BarraDePesquisaIngresso} />
                    <input type='text' placeholder='Pesquisar eventos, shows, teatros, festas...' />

                    {listagembuscaMostrarDialog &&
                        <dialog open className='infos-Barra_de_pesquisa-header'>oioiiii</dialog>
                    }
                    
                </div>
                <div className='secao-header-menu'>
                    <div className='menu-select'>
                        <img src='/assets/images/local.svg' />
                        <select>
                            <option>Escolha um local</option>
                            <option>Map-api</option>
                        </select>
                    </div>
                    <div className='menu-carrinho'>
                        <img src='/assets/images/carrinho.svg' />
                        <span>0</span>
                    </div>
                    {isLogged
                        ?   <>
                            <div className='user-div'>
                                <div className='user' onClick={() => setUserPopUp(!userPopUp)}>
                                    <i className="fas fa-user"></i>
                                    <a>{usuario}</a>
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
                                        <a>Sair</a>
                                    </div>
                                </div>
                            </div>
                            
                            </>

                            : <a onClick={() => setShowModal(!showModal)}>Entrar</a>
                    }
                        </div>

            </section>
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
                                        <input type="text" placeholder="Usuário, E-mail ou CPF" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Fazer Login" className="btn solid" onClick={Logar} />
                                    <p className="social-text">Ou entre com suas redes sociais.</p>
                                    <div className="social-media">
                                        <a className="social-icon">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
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
                                        <input type="text" placeholder="CPF"  value={cpfUsuario}  onChange={e => setcpfUsuario(e.target.value)}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" placeholder="Senha" value={senhaUsuario}  onChange={e => setsenhaUsuario(e.target.value)}/>
                                    </div>
                                    <input type="submit" className="btn" value="Cadastre-se" onClick={CadastrarCliente}/>
                                    <p className="social-text">Ou cadastre-se com suas redes sociais</p>
                                    <div className="social-media">
                                        <a className="social-icon">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
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
                className="modal"
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
                                    <label>Genêro</label>
                                    <select>
                                        <option>Selecione --</option>
                                        <option>Homem</option>
                                        <option>Mulher</option>
                                        <option>Filho do diabo</option>
                                    </select>
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
                                    <label>E-mail</label>
                                    <input type='email' value={userEmail} onChange={(e) => {setUserEmail(e.target.value); setUpdateUser(true)}}/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Senha</label>
                                    <input type='password' value={userSenha} onChange={(e) => {setUserSenha(e.target.value); setUpdateUser(true)}}/>
                                </div>
                            </div>
                            {uptadeUser 
                            ? 
                                <div className='user-info-button'>
                                    <a onClick={() => setUserPopUp(false)}>Fechar</a>
                                    <a onClick={AlterarCadastro}>Atualizar</a>
                                </div>
                            :
                                <div className='user-info-button'>
                                    <a onClick={() => setUserPopUp(false)}>Fechar</a>
                                </div>
                            }
                        </section>
                        <section className='image-part'>
                            <img src='./assets/images/bguserinfo.png'/>
                        </section>
                    </section>
                    }
                </section>
            </Modal>

        </section>
    );
}