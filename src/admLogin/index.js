import './index.scss'

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdmLogin() {

    async function Logar() {

        try {
            const resp = await axios.post('http://localhost:5000/adm/login', {
                email: email,
                senha: senha
            });
            toast.success(`Login efetuado com sucesso, ${email}!`)

        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

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
        <div className='adm-login'>
            <div className='container'>
                <div className="forms-container">
                    <div className="signin-signup">
                        <div action="#" className="sign-in-form">
                            <h2 className="title">Entrar</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            </div>
                            <input type="submit" value="Entrar" className="btn solid" onClick={Logar} />
                        </div>

                    </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Bem-vindo ao Painel do Administrador</h3>
                            <p>Este é o centro de controle, onde você tem o poder de moldar a experiência dos visitantes do site.</p>
                        </div>
                        <img src="./assets/images/log.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}