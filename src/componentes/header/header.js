
import { useState } from 'react';
import './header.scss'
import Modal from 'react-modal'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Header() {
    const [showModal, setShowModal] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('');
    const [handleMenu, toggle] = useState(false)
    const [senha, setSenha] = useState('');
    const [userModal, setUserModal] = useState(false)
    const [userPopUp, setUserPopUp] = useState(false)

    function Sair(){
        setIsLogged(false)
        setUserModal(false)
    }

    const navigate = useNavigate();

    async function Logar() {

        try {
            const resp = await axios.post('http://localhost:5000/cliente/login', {
                NomeUsuario: email,
                cpf: email,
                email: email,
                senha: senha
            });
            toast.success('Login efetuado com sucesso!')
            setIsLogged(true)
            setShowModal(false)
            setUsuario(resp.data.NM_USUARIO)

        } catch (err) {
            toast.error(err.response.data.erro)
        }

    }

    return (
        <section className='header-main'>
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
            <section className="secao-header">
                <img src='/assets/images/logoTCC.png' />
                <div className='secao-header-input-div'>
                    <img src='/assets/images/lupa.svg' />
                    <input type='text' placeholder='Pesquisar eventos, shows, teatros, festas...' />
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
                                    <div className='user-option-row' onClick={() => setUserModal(!userModal)}>
                                        <img src='./assets/images/info.svg'/>
                                        <a>Informações da conta</a>
                                    </div>
                                    <div className='user-option-row' onClick={() => Sair()}>
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
                                        <input type="text" placeholder="Usuário" />
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-envelope"></i>
                                        <input type="email" placeholder="E-mail" />
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-envelope"></i>
                                        <input type="text" placeholder="CPF" />
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" placeholder="Senha" />
                                    </div>
                                    <input type="submit" className="btn" value="Cadastre-se" />
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
                oi
            </Modal>

        </section>
    );
}