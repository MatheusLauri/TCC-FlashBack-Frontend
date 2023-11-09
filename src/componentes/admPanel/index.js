import { ReceiptLong } from '@mui/icons-material';
import './index.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
export default function AdmPanel() {

    return (
        <section className='adm-side-panel'>
            <div className='side-panel-menu'>
                <img src='./assets/images/logoTCC.png'/>
                <div>
                    <DashboardIcon/>
                    <a>Painel</a>
                </div>
                <div>
                    <PeopleAltIcon/>
                    <a>Usuários</a>
                </div>
                <div>
                    <StoreIcon/>
                    <a>Empresas</a>
                </div>
                <div>
                    <ReceiptLongIcon/>
                    <a>Pedidos</a>
                </div>
                <div>
                    <TrendingUpIcon/>
                    <a>Gráficos</a>
                </div>
                <div>
                    <ConfirmationNumberIcon/>
                    <a>Ingressos</a>
                </div>
                <div>
                    <AddIcon/>
                    <a>Add Ingresso</a>
                </div>
            </div>
            <div>
                <LogoutIcon/>
                <a>Sair</a>
            </div>
        </section>
    )
}