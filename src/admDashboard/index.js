import AdmPanel from '../componentes/admPanel'
import AdmUser from '../componentes/admUser'
import './index.scss'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function AdmDashboard() {
    //Variáveis de controle de menu
    const [menu, setMenu] = useState(3)

    //Função para controle de menu
    function HandleMenu(e) {
        setMenu(e)
    }

    return (
        <section className='secao-adm-dashboard'>
            <AdmPanel f={HandleMenu} />
            {menu == 1 &&
                <section className='painel-main'>
                    <AdmUser page='Dashboard' user='Flashback' funcao='Admin' />
                    <div className='painel-row'>
                        <section className='painel'>
                            <div className='input-time-controller'>
                                <div>
                                    <label>Data de inicio</label>
                                    <input type='date' placeholder='mm / dd / yyyy' />
                                </div>
                                <div>
                                    <label>Data final</label>
                                    <input type='date' placeholder='mm / dd / yyyy' />
                                </div>
                            </div>
                            <div className='insights-bar'>
                                <div className='insight'>
                                    <AnalyticsIcon />
                                    <div className='middle'>
                                        <div className='left'>
                                            <h1>Total de vendas</h1>
                                            <span>R$25.024</span>
                                        </div>
                                        <div className='progress'>
                                            <svg>
                                                <circle cx={'38'} cy={'38'} r={'36'}></circle>
                                            </svg>
                                            <div className='number'>
                                                <p>81%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <small>Ultimas 24 horas</small>
                                </div>
                                <div className='insight'>
                                    <ShoppingCartIcon />
                                    <div className='middle'>
                                        <div className='left'>
                                            <h1>Total de vendas</h1>
                                            <span>R$25.024</span>
                                        </div>
                                        <div className='progress'>
                                            <svg>
                                                <circle cx={'38'} cy={'38'} r={'36'}></circle>
                                            </svg>
                                            <div className='number'>
                                                <p>81%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <small>Ultimas 24 horas</small>
                                </div>
                                <div className='insight'>
                                    <StackedLineChartIcon />
                                    <div className='middle'>
                                        <div className='left'>
                                            <h1>Total de vendas</h1>
                                            <span>R$25.024</span>
                                        </div>
                                        <div className='progress'>
                                            <svg>
                                                <circle cx={'38'} cy={'38'} r={'36'}></circle>
                                            </svg>
                                            <p>81%</p>
                                        </div>
                                    </div>
                                    <small>Ultimas 24 horas</small>
                                </div>
                            </div>
                            <div className='table'>
                                <h1>Pedidos recentes</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome do Evento</th>
                                            <th>Tipo de Ingresso</th>
                                            <th>Qtd</th>
                                            <th>Status</th>
                                            <th>Pagamento</th>
                                            <th>Usuário</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Cena 2k23</td>
                                            <td>Pista</td>
                                            <td>2</td>
                                            <td style={{ color: 'green' }}>Concluído</td>
                                            <td style={{ color: 'green' }}>À vista</td>
                                            <td>João Paulo</td>
                                        </tr>
                                        <tr>
                                            <td>Numanice</td>
                                            <td>VIP</td>
                                            <td>1</td>
                                            <td style={{ color: 'green' }}>Concluído</td>
                                            <td style={{ color: 'green' }}>À vista</td>
                                            <td>Cleber</td>
                                        </tr>
                                        <tr>
                                            <td>Lollapaloza 2024</td>
                                            <td>Front</td>
                                            <td>10</td>
                                            <td style={{ color: 'green' }}>Concluído</td>
                                            <td style={{ color: 'yellow' }}>10X</td>
                                            <td>Bruna</td>
                                        </tr>
                                        <tr>
                                            <td>Cena 2k23</td>
                                            <td>Pista</td>
                                            <td>2</td>
                                            <td style={{ color: 'green' }}>Concluído</td>
                                            <td style={{ color: 'green' }}>À vista</td>
                                            <td>João Paulo</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a>Ver todos</a>
                            </div>
                        </section>
                        <section className='painel-right'>
                            <h1>Cadastros recentes</h1>
                            <div className='cadastros'>
                                <div>
                                    <span><span>João Paulo</span> se cadastrou na flashback.</span>
                                    <small>2 minutos atrás</small>
                                </div>
                                <div>
                                    <span><span>João Paulo</span> se cadastrou na flashback.</span>
                                    <small>2 minutos atrás</small>
                                </div>
                                <div>
                                    <span><span>João Paulo</span> se cadastrou na flashback.</span>
                                    <small>2 minutos atrás</small>
                                </div>
                            </div>
                            <h1 className='analise-h1'>Análise de Vendas</h1>
                            <div className='analise-wrapper'>
                                <div className='analise-box'>
                                    <div className='info-main'>
                                        <NightlifeIcon />
                                        <div>
                                            <h1>Festas e Shows</h1>
                                            <small>Ultimas 24 horas</small>
                                        </div>
                                    </div>

                                    <span>3849</span>
                                </div>
                                <div className='analise-box'>
                                    <div className='info-main'>
                                        <TheaterComedyIcon />
                                        <div>
                                            <h1>Teatros</h1>
                                            <small>Ultimas 24 horas</small>
                                        </div>
                                    </div>

                                    <span>3849</span>
                                </div>
                                <div className='analise-box'>
                                    <div className='info-main'>
                                        <CelebrationIcon />
                                        <div>
                                            <h1>Festa Junina</h1>
                                            <small>Ultimas 24 horas</small>
                                        </div>
                                    </div>

                                    <span>3849</span>
                                </div>
                                <div className='analise-box'>
                                    <div className='info-main'>
                                        <InterpreterModeIcon />
                                        <div>
                                            <h1>Palestras e Congressos</h1>
                                            <small>Ultimas 24 horas</small>
                                        </div>
                                    </div>

                                    <span>3849</span>
                                </div>
                                <div className='analise-box'>
                                    <div className='info-main'>
                                        <FamilyRestroomIcon />
                                        <div>
                                            <h1>Infantil</h1>
                                            <small>Ultimas 24 horas</small>
                                        </div>
                                    </div>

                                    <span>3849</span>
                                </div>
                                <div className='add-card'>
                                    <AddIcon />
                                    <h1>Add Ingresso</h1>
                                </div>
                            </div>


                        </section>
                    </div>

                </section>
            }
            {menu == 2 &&
                <section className='usuario-main'>
                    <AdmUser page='Controle de usuários' user='Flashback' funcao='Admin' />
                    <div className='cadastro'>
                        <div className='title'>
                            <PersonAddAltIcon />
                            <h1>Cadastro</h1>
                        </div>
                        <div className='wrapper'>
                            <div>
                                <label>Nome</label>
                                <input type='text' placeholder='João'/>
                            </div>
                            <div>
                                <label>Sobrenome</label>
                                <input type='text' placeholder='Paulo'/>
                            </div>
                            <div>
                                <label>CPF</label>
                                <input type='text' placeholder='XXX.XXX.XXX-XX'/>
                            </div>
                            <div>
                                <label>Usuário</label>
                                <input type='text' placeholder='nasccjp'/>
                            </div>
                            <div>
                                <label>E-mail</label>
                                <input type='text' placeholder='joao.paulo@email.com'/>
                            </div>
                            <div>
                                <label>Senha</label>
                                <input type='text' placeholder='Joao_123'/>
                            </div>
                        </div>
                        <div className='add-btn'>
                            <AddIcon />
                            <a>Adicionar usuário</a>
                        </div>
                    </div>
                    <div className='table'>
                        <h1>Usuários</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Sobrenome</th>
                                    <th>Usuário</th>
                                    <th>CPF</th>
                                    <th>E-mail</th>
                                    <th>Senha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>João</td>
                                    <td>Paulo</td>
                                    <td>nascJP</td>
                                    <td>495.426.828-16</td>
                                    <td>nascc.joao@gmail.com</td>
                                    <td>jp101205</td>
                                </tr>
                                <tr>
                                    <td>João</td>
                                    <td>Paulo</td>
                                    <td>nascJP</td>
                                    <td>495.426.828-16</td>
                                    <td>nascc.joao@gmail.com</td>
                                    <td>jp101205</td>
                                </tr>
                                <tr>
                                    <td>João</td>
                                    <td>Paulo</td>
                                    <td>nascJP</td>
                                    <td>495.426.828-16</td>
                                    <td>nascc.joao@gmail.com</td>
                                    <td>jp101205</td>
                                </tr>
                                <tr>
                                    <td>João</td>
                                    <td>Paulo</td>
                                    <td>nascJP</td>
                                    <td>495.426.828-16</td>
                                    <td>nascc.joao@gmail.com</td>
                                    <td>jp101205</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            }
            {menu == 3 &&
                <section className='empresa-main'>
                    <AdmUser page='Controle de empresas' user='Flashback' funcao='Admin' />
                    <div className='cadastro'>
                        <div className='title'>
                            <AddBusinessIcon/>
                            <h1>Cadastro</h1>
                        </div>
                        <div className='wrapper'>
                            <div>
                                <label>Empresa/Razão Social</label>
                                <input type='text' placeholder='Flashback Ltda.'/>
                            </div>
                            <div>
                                <label>CNPJ</label>
                                <input type='text' placeholder='XX. XXX. XXX/0001-XX'/>
                            </div>
                            <div>
                                <label>E-mail</label>
                                <input type='text' placeholder='vendas@flashback.com.br'/>
                            </div>
                            <div>
                                <label>Senha</label>
                                <input type='text' placeholder='flashback@123'/>
                            </div>
                        </div>
                        <div className='add-btn'>
                            <AddIcon />
                            <a>Adicionar empresa</a>
                        </div>
                    </div>
                    <div className='table'>
                        <h1>Usuários</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Empresa/Razão Social</th>
                                    <th>CNPJ</th>
                                    <th>E-mail</th>
                                    <th>Senha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Flashback</td>
                                    <td>XX. XXX. XXX/0001-XX</td>
                                    <td>admin@flashback.com.br</td>
                                    <td>jp101205</td>
                                </tr>
                                <tr>
                                    <td>Flashback</td>
                                    <td>XX. XXX. XXX/0001-XX</td>
                                    <td>admin@flashback.com.br</td>
                                    <td>jp101205</td>
                                </tr>
                                <tr>
                                    <td>Flashback</td>
                                    <td>XX. XXX. XXX/0001-XX</td>
                                    <td>admin@flashback.com.br</td>
                                    <td>jp101205</td>
                                </tr>
                            </tbody>
                        </table>
                        <a>Ver todos</a>
                    </div>
                </section>
            }
            {menu == 6 &&
                <section className='ingresso-main'>
                    <AdmUser page='Ingressos' user='Flashback' funcao='Admin' />
                    <div className='search-bar'>
                        <SearchIcon/>
                        <input type='text' placeholder='Pesquise por eventos...'/>
                    </div>
                    
                </section>
            }



        </section>
    )
}