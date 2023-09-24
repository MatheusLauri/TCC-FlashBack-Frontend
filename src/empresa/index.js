import { useState } from 'react'
import './index.scss'

export default function Empresa() {
    const [isLogged, setIsLogged] = useState(false)
    const [handleMenu, toggle] = useState(false)
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
                                            <input type="text" placeholder="Empresa, E-mail ou CNPJ" />
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Senha" />
                                        </div>
                                        <input type="submit" value="Entrar" className="btn solid" />
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