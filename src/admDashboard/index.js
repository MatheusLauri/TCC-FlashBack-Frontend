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
import { useEffect, useState } from 'react';
import AdmTicket from '../componentes/admTicket';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import MixedChart from '../componentes/mixedChart';
import emailjs from '@emailjs/browser'
import InputMask from 'react-input-mask';

export default function AdmDashboard() {
    //Variáveis de controle de menu
    const [menu, setMenu] = useState(1)

    //Variáveis de Listagem de Usuários
    const [listarUser, setListarUser] = useState([])

    //Variáveis de Listagem de Empresas
    const [listarEmpresas, setListarEmpresas] = useState([])

    //Variáveis de Listagem de Solicitação de Cadastros de Empresas
    const [listarSolicitacao, setListarSolicitacao] = useState([])

    //Variáveis de Listagem de Ingresso
    const [listarIngressos, setListarIngressos] = useState()
    const [pesquisa, setPesquisa] = useState('')

    async function ListarIngressos() {

        try {
            if (pesquisa.length) {
                const resp = await axios.get(`http://localhost:5000/ingresso/busca?nome=${pesquisa}`)
                
                setListarIngressos(resp.data)
            }
            else {
                const resp = await axios.get(`http://localhost:5000/ingresso/busca?nome=`)
                
                setListarIngressos(resp.data)
            }

        } catch (err) {
            toast.error(err)
        }
    }


    function calcularQuantidadeTotalVendas(dadosPedidos) {
    let quantidadeTotalVendas = 0;

    // Iterar sobre cada pedido e somar o resultado de vl_preco_tipo * qtd_tipo_ingresso
    dadosPedidos.forEach((pedido) => {
        const precoTipo = parseFloat(pedido.VL_PRECO_TIPO);
        const quantidadeTipo = parseInt(pedido.QTD_TIPO_INGRESSO, 10);

        if (!isNaN(precoTipo) && !isNaN(quantidadeTipo)) {
        quantidadeTotalVendas += precoTipo * quantidadeTipo;
        }
    });

    return quantidadeTotalVendas;
    }

    function calcularQuantidadeTotalVendasComDesconto(dadosPedidos) {
        let quantidadeTotalVendasComDesconto = 0;
      
        dadosPedidos.forEach((pedido) => {
          const precoTipo = parseFloat(pedido.VL_PRECO_TIPO);
          const quantidadeTipo = parseInt(pedido.QTD_TIPO_INGRESSO, 10);
      
          if (!isNaN(precoTipo) && !isNaN(quantidadeTipo)) {
            const totalPedido = precoTipo * quantidadeTipo;
            const desconto = totalPedido * 0.1; // 10% de desconto
            const totalComDesconto = totalPedido - desconto;
      
            quantidadeTotalVendasComDesconto += totalComDesconto;
          }
        });
      
        return quantidadeTotalVendasComDesconto.toFixed(2);
    }
      
    const [pedidos, setPedidos] = useState([])
    const [pedidos10, setPedidos10] = useState([])

    async function ListarPedidos() {
        let url = `http://localhost:5000/listartudo`
        let response = await axios.get(url)
        setPedidos(response.data)
        setPedidos10(response.data.slice(0,5))
        console.log(response.data)
    }

    //Função para controle de menu
    function HandleMenu(e) {
        setMenu(e)
    }

    function contarIngressosPorCategoria(pedidos) {
        // Criar um objeto para armazenar a contagem de ingressos por categoria
        const contagemPorCategoria = {};
      
        // Iterar sobre os pedidos
        pedidos.forEach(pedido => {
          // Obter a categoria do ingresso do pedido
          const categoria = pedido.NM_CATEGORIA_INGRESSO;
      
          // Verificar se a categoria já existe no objeto de contagem
          if (contagemPorCategoria[categoria] === undefined) {
            // Se não existir, inicializar com 1
            contagemPorCategoria[categoria] = 1;
          } else {
            // Se existir, incrementar a contagem
            contagemPorCategoria[categoria]++;
          }
        });
      
        // Retornar o objeto com a contagem por categoria
        return contagemPorCategoria;
      }
      
      // Se 'pedidos' for o array que você forneceu
      const resultado = contarIngressosPorCategoria(pedidos);
      
      console.log(resultado);
      

    async function Aprovar(id, razao, email, senha) {
        try {
            let url = `http://localhost:5000/Aprovacao`
            let response = await axios.post(url, {
                id: id
            })
            await ListarFormulario()

            const params = {
                from_name: "Flashback Ltda.",
                nm_razao_social: razao,
                ds_email: email,
                ds_senha: senha,
                emai_to: email,
                reply_to: "naoresponda.flashback@gmail.com"
            }
            try {
                emailjs.send("GmailService","template_tscrywf", params,"o4dTb4R0Y__hwBfwK")
                toast.success('email enviado com sucesso.')
            } catch (error) {
                toast.error('Erro de envio')
            }
            
        } catch (error) {
            toast.error(error)
        }
    }
    async function Reprovar(id) {
        try {
            let url = `http://localhost:5000/FormularioDel/${id}`
            let response = await axios.delete(url)
            await ListarFormulario()
        } catch (error) {
            toast.error(error)
        }
    }

    async function ListarUsuarios() {
        try {
            let url = `http://localhost:5000/cliente`
            let response = await axios.get(url)
            setListarUser(response.data)
        } catch (error) {
            toast.error(error)
        }
    }

    async function ListarFormulario() {
        try {
            let url = `http://localhost:5000/listForm`
            let response = await axios.get(url)
            setListarSolicitacao(response.data)
        } catch (error) {
            toast.error(error)
        }
    }

    function calcularTotalGanhoComDesconto(dadosPedidos) {
        let totalGanhoComDesconto = 0;
      
        dadosPedidos.forEach((pedido) => {
          const precoTipo = parseFloat(pedido.VL_PRECO_TIPO);
          const quantidadeTipo = parseInt(pedido.QTD_TIPO_INGRESSO, 10);
      
          if (!isNaN(precoTipo) && !isNaN(quantidadeTipo)) {
            const totalPedido = precoTipo * quantidadeTipo;
            const desconto = totalPedido * 0.1; // 10% de desconto
            const totalComDesconto = totalPedido - desconto;
      
            totalGanhoComDesconto += desconto;
          }
        });
      
        return totalGanhoComDesconto.toFixed(2);
    }

    async function ListarEmpresas() {
        try {
            let url = `http://localhost:5000/empresas`
            let response = await axios.get(url)
            setListarEmpresas(response.data)
        } catch (error) {
            toast.error(error)
        }
    }


    // Variáveis de Cadastro do usuário
    const [NomeUsuario, setNomeUsuario] = useState('');
    const [cpfUsuario, setcpfUsuario] = useState('');
    const [emailUsuario, setemailUsuario] = useState('');
    const [senhaUsuario, setsenhaUsuario] = useState();

    function FormatarData(data) {
        const dataEvento = new Date(data);

        // Data e hora atuais
        const dataAtual = new Date();

        // Calculando a diferença em milissegundos
        const diferencaEmMilissegundos = dataAtual - dataEvento;

        // Convertendo a diferença para minutos e horas
        const diferencaEmMinutos = diferencaEmMilissegundos / (1000 * 60);
        const diferencaEmHoras = diferencaEmMinutos / 60;
        let ago = ''
        console.log(diferencaEmHoras)
        console.log(diferencaEmMinutos)
        if (diferencaEmHoras >= 1) {

            // Exibir a diferença em horas atrás
            ago = `${Math.floor(diferencaEmHoras)} horas atrás`;

        } else {
            if (Math.floor(diferencaEmMinutos < 1)){
                ago = `Agora`
            }
            else{
                // Exibir a diferença em minutos atrás
                ago = `${Math.floor(diferencaEmMinutos)} minutos atrás`
            }
            
        }

        return ago
    }
    // Variáveis de Cadastro do usuário
    const [NomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpjEmpresa, setcnpjEmpresa] = useState('');
    const [emailEmpresa, setemailEmpresa] = useState('');
    const [senhaEmpresa, setsenhaEmpresa] = useState();

    // Função de cadastro de empresa com API
    async function CadastrarEmpresa() {
        try {

            let empresa = {

                DS_CNPJ: NomeEmpresa,
                NM_RAZAO_SOCIAL: cnpjEmpresa,
                DS_EMAIL_EMPRESA: emailEmpresa,
                DS_SENHA_EMPRESA: senhaEmpresa

            }

            const r = await axios.post('http://localhost:5000/empresa', empresa)
            toast.success(`Cadastro realizado com sucesso!`)

            setNomeEmpresa('')
            setemailEmpresa('')
            setcnpjEmpresa('')
            setsenhaEmpresa('')
            ListarEmpresas()
        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }

    // Função de cadastro de usuário com API
    async function CadastrarCliente() {
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

            setNomeUsuario('')
            setemailUsuario('')
            setcpfUsuario('')
            setsenhaUsuario('')
            ListarUsuarios()
        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }

    useEffect(() => {
        if (menu == 1 || menu == 2 || menu == 5) {
            ListarUsuarios()
        }
        if (menu == 1 || menu == 3 || menu == 5) {
            ListarEmpresas()
        }
        if (menu == 4 || menu == 1) {
            ListarPedidos()
        }
        if (menu == 8) {
            ListarFormulario()
        }
        if (menu == 6) {
            ListarIngressos()
        }
    }, [menu, pesquisa])


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
            <ToastContainer />
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
                                                <span>R${calcularQuantidadeTotalVendas(pedidos)}</span>
                                            </div>
                                            
                                        </div>
                                        <small>Ultimas 24 horas</small>
                                    </div>
                                    <div className='insight'>
                                        <ShoppingCartIcon />
                                        <div className='middle'>
                                            <div className='left'>
                                                <h1>Total pago às empresas</h1>
                                                <span>R$ {calcularQuantidadeTotalVendasComDesconto(pedidos)}</span>
                                            </div>
                                        </div>
                                        <small>Ultimas 24 horas</small>
                                    </div>
                                    <div className='insight'>
                                        <StackedLineChartIcon />
                                        <div className='middle'>
                                            <div className='left'>
                                                <h1>Lucro</h1>
                                                <span>R$ {calcularTotalGanhoComDesconto(pedidos)}</span>
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
                                                <th>Nome Evento</th>
                                                <th>Nome Tipo Ingresso</th>
                                                <th>Usuário</th>
                                                <th>Qtd</th>
                                                <th>Preco Unitário</th>
                                                <th>Preco Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pedidos10.map(item =>
                                                <tr>
                                                    <td>{item.NM_EVENTO}</td>
                                                    <td>{item.NM_TIPO_INGRESSO}</td>
                                                    <td>{`${item.NM_CLIENTE} ${item.NM_SOBRENOME}`}</td>
                                                    <td>{item.QTD_TIPO_INGRESSO}</td>
                                                    <td>R$ {item.VL_PRECO_TIPO}</td>
                                                    <td>R$ {item.VL_PRECO_TIPO * item.QTD_TIPO_INGRESSO}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <a>Ver todos</a>
                                </div>
                            </section>
                            <section className='painel-right'>
                                <h1>Cadastros recentes</h1>
                                <div className='cadastros'>
                                    {listarUser.map(item =>
                                        <div>
                                            <span><span>{`${item.NM_CLIENTE} ${item.NM_SOBRENOME} (${item.NM_USUARIO})`}</span> se cadastrou na flashback.</span>
                                            <small>{FormatarData(item.DT_CADASTRO)}</small>
                                        </div>
                                    )}
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
                                    <input type='text' placeholder='João' />
                                </div>
                                <div>
                                    <label>Sobrenome</label>
                                    <input type='text' placeholder='Paulo' />
                                </div>
                                <div>
                                    <label>CPF</label>
                                    <input type='text' placeholder='XXX.XXX.XXX-XX' value={cpfUsuario} onChange={(e) => setcpfUsuario(e.target.value)} />
                                </div>
                                <div>
                                    <label>Usuário</label>
                                    <input type='text' placeholder='nasccjp' value={NomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} />
                                </div>
                                <div>
                                    <label>E-mail</label>
                                    <input type='text' placeholder='joao.paulo@email.com' value={emailUsuario} onChange={(e) => setemailUsuario(e.target.value)} />
                                </div>
                                <div>
                                    <label>Senha</label>
                                    <input type='text' placeholder='Joao_123' value={senhaUsuario} onChange={(e) => setsenhaUsuario(e.target.value)} />
                                </div>
                            </div>
                            <div className='add-btn'>
                                <AddIcon />
                                <a onClick={() => CadastrarCliente()}>Adicionar usuário</a>
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
                                        <th>Data de Cadastro</th>
                                        <th>E-mail</th>
                                        <th>Senha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listarUser.map(item =>
                                        <tr>

                                            {item.NM_CLIENTE != null
                                                ?
                                                <td>{item.NM_CLIENTE}</td>
                                                :
                                                <td style={{ color: `red` }}>Não Preenchido</td>
                                            }


                                            {item.NM_SOBRENOME != null
                                                ?
                                                <td>{item.NM_SOBRENOME}</td>
                                                :
                                                <td style={{ color: `red` }}>Não Preenchido</td>
                                            }


                                            {item.NM_USUARIO != null
                                                ?
                                                <td>{item.NM_USUARIO}</td>
                                                :
                                                <td style={{ color: `red` }}>Não Preenchido</td>
                                            }


                                            {item.DS_CPF != null
                                                ?
                                                <td>{item.DS_CPF}</td>
                                                :
                                                <td style={{ color: `red` }}>Não Preenchido</td>
                                            }


                                            {item.DT_CADASTRO != null
                                                ?
                                                <td>{FormatarData(item.DT_CADASTRO)}</td>
                                                :
                                                <td style={{ color: `red` }}>Não Preenchido</td>
                                            }


                                            {item.DS_EMAIL != null
                                                ?
                                                <td>{item.DS_EMAIL}</td>
                                                :
                                                <td style={{ color: `red` }}>Não Preenchido</td>
                                            }


                                            {item.DS_SENHA != null
                                                ?
                                                <td>{item.DS_SENHA}</td>
                                                :
                                                <td style={{ color: `red` }}>Não Preenchido</td>
                                            }

                                        </tr>
                                    )}
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
                                <AddBusinessIcon />
                                <h1>Cadastro</h1>
                            </div>
                            <div className='wrapper'>
                                <div>
                                    <label>Empresa/Razão Social</label>
                                    <input type='text' placeholder='Flashback Ltda.' value={NomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} />
                                </div>
                                <div>
                                    <label>CNPJ</label>
                                    <InputMask mask="99.999.999/9999-99" maskChar={null} placeholder="Insira o CNPJ"  value={cnpjEmpresa} onChange={(e) => setcnpjEmpresa(e.target.value)}  />
                                </div>
                                <div>
                                    <label>E-mail</label>
                                    <input type='text' placeholder='vendas@flashback.com.br' value={emailEmpresa} onChange={(e) => setemailEmpresa(e.target.value)} />
                                </div>
                                <div>
                                    <label>Senha</label>
                                    <input type='text' placeholder='flashback@123' value={senhaEmpresa} onChange={(e) => setsenhaEmpresa(e.target.value)} />
                                </div>
                            </div>
                            <div className='add-btn'>
                                <AddIcon />
                                <a onClick={() => CadastrarEmpresa()}>Adicionar empresa</a>
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
                                    {listarEmpresas.map(item =>
                                        <tr>
                                            <td>{item.NM_RAZAO_SOCIAL}</td>
                                            <td>{item.DS_CNPJ}</td>
                                            <td>{item.DS_EMAIL_EMPRESA}</td>
                                            <td>{item.DS_SENHA_EMPRESA}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <a>Ver todos</a>
                        </div>
                    </section>
                }
                {menu == 4 &&
                    <section className='pedido-main'>
                        <AdmUser page='Controle de Pedidos' user='Flashback' funcao='Admin' />
                        <div className='table'>
                            <h1>Pedidos</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome Evento</th>
                                        <th>Nome Tipo Ingresso</th>
                                        <th>Usuário</th>
                                        <th>Qtd</th>
                                        <th>Preco Unitário</th>
                                        <th>Preco Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.map(item =>
                                        <tr>
                                            <td>{item.NM_EVENTO}</td>
                                            <td>{item.NM_TIPO_INGRESSO}</td>
                                            <td>{`${item.NM_CLIENTE} ${item.NM_SOBRENOME}`}</td>
                                            <td>{item.QTD_TIPO_INGRESSO}</td>
                                            <td>R$ {item.VL_PRECO_TIPO}</td>
                                            <td>R$ {item.VL_PRECO_TIPO * item.QTD_TIPO_INGRESSO}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <a>Ver todos</a>
                        </div>
                    </section>
                }
                {menu == 5 &&
                    <section className='chart-main'>
                        <AdmUser page='Gráficos' user='Flashback' funcao='Admin' />
                        <MixedChart empresa={listarEmpresas} usuario={listarUser} />

                    </section>
                }
                {menu == 6 &&
                    <section className='ingresso-main'>
                        <AdmUser page='Ingressos' user='Flashback' funcao='Admin' />
                        <div className='search-bar'>
                            <SearchIcon />
                            <input type='text' placeholder='Pesquise por eventos...' value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}/>
                        </div>
                        <div className='wrapper'>
                            {listarIngressos &&
                                listarIngressos.map((item, index) => (
                                    <AdmTicket
                                        id={item.ID_INGRESSO}
                                        nome={item.NM_EVENTO}
                                        data={item.DT_COMECO}
                                        imagem={item.IMAGEM_INGRESSO}
                                        qtd={item.QTD_TIPO_INGRESSO}
                                        valor={item.VL_PRECO_TIPO}
                                        nomeTipo={item.NM_TIPO_INGRESSO}
                                        rua={item.DS_LOGRADOURO}
                                        cidade={item.DS_LOCALIDADE}
                                        estado={item.DS_UF}
                                        busca={pesquisa}
                                    />
                                ))}
                        </div>

                    </section>
                }
                {menu == 7 &&
                    <section className='ingresso-main'>
                        <AdmUser page='Adicionar Ingressos' user='Flashback' funcao='Admin' />


                    </section>
                }
                {menu == 8 &&
                    <section className='chamados-main'>
                        <AdmUser page='Chamados' user='Flashback' funcao='Admin' />
                        <div className='table'>
                            <h1>Solicitações de cadastro</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Empresa/Razão Social</th>
                                        <th>CNPJ</th>
                                        <th>E-mail</th>
                                        <th>Senha</th>
                                        <th>Plano</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listarSolicitacao.map(item =>
                                        <tr>
                                            <td>{item.NM_RAZAO_SOCIAL}</td>
                                            <td>{item.DS_CNPJ}</td>
                                            <td>{item.DS_EMAIL_EMPRESA}</td>
                                            <td>{item.DS_SENHA_EMPRESA}</td>
                                            <td>Criações Pagas</td>
                                            <td className='aprove' onClick={() => Aprovar(item.ID_EMPRESA, item.NM_RAZAO_SOCIAL, item.DS_EMAIL_EMPRESA, item.DS_SENHA_EMPRESA)}>Aprovar</td>
                                            <td className='reprove' onClick={() => Reprovar(item.ID_EMPRESA)}>Reprovar</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <a>Ver todos</a>
                        </div>

                    </section>
                }



            </section>
        </>
    )
}