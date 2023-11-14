import { Link } from 'react-router-dom'
import Rodape from '../componentes/rodape'
import { TrianguloCategoria } from '../componentes/trianguloCategoria';
import './index.scss'


export default function Empresa(){

    return (
        <div className='empresa-main'>
            <section className='header'>
                <Link className='header-img' to='/'><img src='/assets/images/logoTCC.png' />| For Business</Link>
            </section>
            <section className='secao-inicial'>
                <div>
                    <h1>Produza eventos e conteúdos na maior plataforma do país.</h1>
                    <p>Crie agora diferentes jeitos de viver, com soluções completas para a publicação, gestão, venda e entrega das suas produções</p>
                    <a>Comece a criar</a>
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
            <section className='secao-preco'>
                <h1>Quanto custa?</h1>
                <div className='planos-row'>
                    <div className='plano'>
                        <div className='head'>
                            <p style={{color: `#69af00`, border: `2px dashed #69af00`}}>Criações gratuitas</p>
                            <h1>Gratuito</h1>
                            <small>Para produtores com eventos presenciais e conteúdos digitais gratuitos.</small>
                            <a>ESGOTADO</a>
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
                            <a>COMECE AGORA</a>
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
                            <a>ESGOTADO</a>
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
                    
                    <a>COMECE AGORA MESMO!</a>
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