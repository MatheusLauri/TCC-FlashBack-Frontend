import { useState } from 'react'
import './index.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Empresa() {
    const [isLogged, setIsLogged] = useState(false)
    const [handleMenu, toggle] = useState(false)



    const [emailCNPJ, setEmailCNPJ] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();



    async function Cadastrar () {

        

    }

    async function Logar() {

        try {
            const resp = await axios.post('http://localhost:5000/empresa/login', {
                
                cnpj: emailCNPJ,
                email: emailCNPJ,
                senha: senha

            });
            if (!resp.data) {
                alert('Errado')
            }
            else {
                alert('logado')
                navigate('/adm')
            }


        } catch (err) {

            
        }


    }



    return (
        <section className='empresa-main'>
            {isLogged
                ?
                    <p>Boa mestre!</p>
                :
                    <div className='adm-login'>
                        <div className={handleMenu ? 'sign-up-mode' : 'container'}>
                            <div className="forms-container">
                                <div className="signin-signup">
                                    <div action="#" className="sign-in-form">
                                        <h2 className="title">Entrar</h2>
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <input type="text" placeholder="Empresa, E-mail ou CNPJ" value={emailCNPJ} onChange={(e) => setEmailCNPJ(e.target.value)}/>
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                        </div>
                                        <input type="submit" value="Entrar" className="btn solid" onClick={Logar}/>
                                    </div>
                                    <div action="#" className="sign-up-form">
                                        <h2 className="title">Cadastre-se</h2>
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <input type="text" placeholder="Empresa/Razão Social" />
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-envelope"></i>
                                            <input type="email" placeholder="E-mail" />
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="CNPJ" />
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Senha" />
                                        </div>
                                        <input type="submit" className="btn" value="Cadastre-se" />
                                    </div>
                                </div>
                            </div>

                            <div className="panels-container">
                                <div className="panel left-panel">
                                    <div className="content">
                                        <h3>Bem-vindo ao Painel de Empresas</h3>
                                        <p>Este é o seu centro de controle, onde você tem o poder de moldar a experiência dos visitantes do site.</p>
                                        <button className="btn transparent" id="sign-up-btn" onClick={() => toggle(true)}>Cadastre-se</button>
                                    </div>
                                    <img src="./assets/images/log.svg" className="image" alt="" />
                                </div>
                                <div className="panel right-panel">
                                    <div className="content">
                                        <h3>Já tem cadastro?</h3>
                                        <p>Entre com suas informações de acesso.</p>
                                        <button className="btn transparent" id="sign-in-btn" onClick={() => toggle(false)}>
                                            Entrar
                                        </button>
                                    </div>
                                    <img src="./assets/images/register.svg" className="image" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </section>
    )
}