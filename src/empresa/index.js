import { Link } from 'react-router-dom'
import Rodape from '../componentes/rodape'
import Modal from 'react-modal'
import { TrianguloCategoria } from '../componentes/trianguloCategoria';
import './index.scss'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';


export default function Empresa(){
    const [registerModal, setRegisterModal] = useState(true)


    //Variaveis de CNPJ
    const [cnpj,setCnpj] = useState('')
    const [nmFantasia,setNmFantasia] = useState('')
    const [razaoSocial,setRazaoSocial] = useState('')
    const [email,setEmail] = useState('')
    const [bairro,setBairro] = useState('')
    const [numero,setNumero] = useState('')
    const [municipio,setMunicipio] = useState('')
    const [uf,setUf] = useState('')
    const [cep,setCep] = useState('')
    const [logradouro,setLogradouro] = useState('')

    function CnpjVerifier(e) {
        setCnpj(e)
    }

    async function ListarCnpj() {
        let url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
        let response = await axios.get(url)
        console.log(response.data)
    }

    return (
        
        <div className='empresa-main'>
            <Modal
                    className="cadastromodal"
                    overlayClassName="modal-overlay"
                    closeTimeoutMS={500}
                    isOpen={registerModal}
                    onRequestClose={() => setRegisterModal(false)}
            >
                    <div className='cadastro-main'>
                        <h1>Trabalhe conosco</h1>
                        <small><b>Preencha o formulário:</b></small>
                        <div className='wrapper'>

                            <input type='text' placeholder='Insira o CPNJ' value={cnpj} onChange={(e) => CnpjVerifier(e.target.value)} onBlur={() => ListarCnpj()} />
                            <input type='text' placeholder='Nome Fantasia' value={nmFantasia}/>
                            <input type='text' placeholder='Razão Social' value={razaoSocial}/>
                            <input type='text' placeholder='E-mail' value={email}/>
                            <input type='text' placeholder='Bairro'  value={bairro}/>
                            <input type='text' placeholder='Numero' value={numero}/>
                            <input type='text' placeholder='Municipio' value={municipio}/>
                            <input type='text' placeholder='UF' value={uf}/>
                            <input type='text' placeholder='CEP'  value={cep}/>
                            <input type='text' placeholder='Logradouro' value={logradouro}/>
                            
                        </div>
                        <small>Agora é só <b>aguardar</b> a nossa aprovação. Entraremos em contato <b>via e-mail.</b> 🚀</small>
                    </div>
            </Modal>
            <ToastContainer/>
            <section className='header'>
                <Link className='header-img' to='/'><img src='/assets/images/logoTCC.png' />| For Business</Link>
            </section>
            <section className='secao-inicial'>
                <div>
                    <h1>Produza eventos e conteúdos na maior plataforma do país.</h1>
                    <p>Crie agora diferentes jeitos de viver, com soluções completas para a publicação, gestão, venda e entrega das suas produções</p>
                    <a  href='#preco'>Comece a criar</a>
                </div>
            </section>
            <section className='secao-dashboard'>
                <h1>Vários segmentos em um só lugar</h1>
                <p>Seja em festas, teatros ou palestras a gestão do seu negócio em um só lugar</p>
                <div>
                    <TrianguloCategoria 
                        src='./assets/images/teatro.svg' 
                        text='Teatros e espetáculos'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/junina.svg' 
                        text='Festas Juninas'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/agenda.svg' 
                        text='Festas e shows'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/palestra.svg' 
                        text='Palestras e congressos'
                    />
                    <TrianguloCategoria 
                        src='./assets/images/balao.svg' 
                        text='Infantil'
                    />
                </div>
            </section>
            <section className='secao-preco' id='preco'>
                <h1>Quanto custa?</h1>
                <div className='planos-row'>
                    <div className='plano'>
                        <div className='head'>
                            <p style={{color: `#69af00`, border: `2px dashed #69af00`}}>Criações gratuitas</p>
                            <h1>Gratuito</h1>
                            <small>Para produtores com eventos presenciais e conteúdos digitais gratuitos.</small>
                            <a onClick={() => toast.error('ingresso esgotado')}>ESGOTADO</a>
                            <div className='divisor'></div>
                            <span>Presencial</span>
                            <ul>
                                <li>Um ou mais ingressos</li>
                            </ul>
                            <span>Digital</span>
                            <ul>
                                <li>Upload de arquivos, links e textos</li>
                                <li>Sistema de Dashboard</li>
                            </ul>
                        </div>
                        <div className='bottom'>
                            <span><b>Serviços</b> <i>Inclusos</i></span>
                            <ul>
                                <li>Atendimento em nossos canais de comunicação</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className='plano'>
                        <div className='head'>
                            <p style={{color: `#520AD9`, border: `2px dashed #520AD9`}}>Criações pagas</p>
                            <h1>Taxa de 10%</h1>
                            <small>Para vender na Sympla com todas as possibilidades de monetização</small>
                            <a onClick={() => setRegisterModal(true)}>COMECE AGORA</a>
                            <div className='divisor'></div>
                            <span>Presencial</span>
                            <ul>
                                <li>Um ou mais ingressos</li>
                            </ul>
                            <span>Digital</span>
                            <ul>
                                <li>Upload de arquivos, links e textos</li>
                                <li>Sistema de Dashboard</li>
                                <li>CRM for Business</li>
                                <li>Cadastros ilimitados</li>
                            </ul>
                        </div>
                        <div className='bottom'>
                            <span><b>Serviços</b> <i>Inclusos</i></span>
                            <ul>
                                <li>Atendimento em nossos canais de comunicação</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className='plano'>
                        <div className='head'>
                            <p style={{color: `rgb(0, 151, 255)`, border: `2px dashed rgb(0, 151, 255)`}}>Criações gratuitas</p>
                            <h1>Enterprises</h1>
                            <small>Para empresas e eventos com necessidades customizadas.</small>
                            <a onClick={() => toast.error('ingresso esgotado')}>ESGOTADO</a>
                            <div className='divisor'></div>
                            <span>Presencial</span>
                            <ul>
                                <li>Um ou mais ingressos</li>
                            </ul>
                            <span>Digital</span>
                            <ul>
                                <li>Upload de arquivos, links e textos</li>
                                <li>Sistema de Dashboard</li>
                                <li>CRM for Business</li>
                                <li>Cadastros ilimitados</li>
                            </ul>
                        </div>
                        <div className='bottom'>
                            <span><b>Serviços</b> <i>sob negociação</i></span>
                            <ul>
                                <li>Atendimento com nossos especialistas</li>
                                <li>Serviço de cadastro customizado</li>
                                <li>Suporte Local</li>
                            </ul>
                        </div>
                        
                    </div>
                    
                </div>
            </section>
            <section className='secao-screen'>
                <div className='row'>
                    <div>
                        <h1>Plataforma Advanced Flashback</h1>
                        <p>Tenha total <b>autonomia</b> para cadastrar, gerenciar e acompanhar todas as informações do seu evento ou conteúdo digital. Além de contar com o <b>suporte</b> da nossa equipe de especialistas.</p>
                    </div>
                    <img src='./assets/images/dashboard.png'/>
                </div>
                <div className='row'>
                    <img src='./assets/images/graficoDesempenho.jpg'/>
                    <div>
                        <h1>Tudo em tempo real!</h1>
                        <p>Vendas de ingressos e inscrições, gestão dos participantes, dados demográficos e de interesse do seu público, desempenho das suas campanhas, etc. Tudo isso você acompanha com <b>relatórios em tempo real.</b></p>
                    </div>
                </div>
                <div className='row'>
                    <div>
                        <h1>Ferramentas de marketing digital</h1>
                        <p>Integração com as principais ferramentas de marketing digital do mercado para <b>divulgar e impulsionar sua produção:</b> Google Analytics, Google Ads, Facebook Ads, RD Station e muito mais!</p>
                    </div>
                    <img src='./assets/images/laptop.png'/>
                </div>
            </section>
            <section className='secao-plataforma'>
                <div className='head'>
                    <h1>A maior plataforma do Brasil</h1>
                    <div>
                        <div>
                            <p>+ 1.800.000</p>
                            <span>eventos já realizados</span>
                        </div>
                        <div>
                            <p>+ 312.000</p>
                            <span>produtores cadastrados</span>
                        </div>
                        <div>
                            <p>+ 3.600</p>
                            <span>cidades atendidas</span>
                        </div>
                        <div>
                            <p>+ 168.000.000</p>
                            <span>ingressos vendidos</span>
                        </div>

                    </div>
                    <a href='#preco'>COMECE AGORA MESMO!</a>
                </div>
                <div className='bottom'>
                    <img src='./assets/images/logoTCC.png' />
                    <small>Dúvidas? Envie um email para <b><i>SAC@flashback.com.br</i></b></small>
                </div>
                </section>
            <Rodape/>
        </div>
    )
}