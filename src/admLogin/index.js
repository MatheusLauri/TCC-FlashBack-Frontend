import './index.scss'

import LoadingBar from 'react-top-loading-bar';
import storage from 'local-storage'

import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdmLogin() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate();
    const ref = useRef();

    const[carregando, setCarregando] = useState(false)

    async function Logar() {

        ref.current.continuousStart();
        setCarregando(true)

        try {

            const resp = await axios.post('http://129.148.42.252:5014/empresa/login', {
                email: email,
                senha: senha
            });

            storage('empresa-logada', resp)

            setTimeout(() => {

                navigate('/empresas/home')

            }, 3000)
           
            
            

        } catch (err) {
            ref.current.complete();
            setCarregando(false)

            toast.error(err.response.data.erro)
        }
    }

    function HandleEnterDown(e){
        if (e.key === 'Enter'){
            Logar()
        }
    }

    return (
    <>
        <LoadingBar color='#F9DD4A' ref={ref}/>
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
                                <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => HandleEnterDown(e)}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} onKeyDown={(e) => HandleEnterDown(e)}/>
                            </div>
                            <input type="submit" value="Entrar" className="btn solid" onClick={Logar}  disabled={carregando}/>
                        </div>

                    </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Bem-vindo ao Painel do Administrador</h3>
                            <p>Este é o centro de controle, onde você tem o poder de moldar a experiência dos visitantes do site.</p>
                        </div>
                        <img src="../assets/images/log.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}