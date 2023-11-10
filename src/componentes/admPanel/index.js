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
import { useState } from 'react';
import { useEffect } from 'react';
export default function AdmPanel(props) {
    const [menu,setMenu] = useState(1)

    function HandleMenu(e) {
        setMenu(e)
    }

    useEffect(() => {
        props.f(menu)
    }, [HandleMenu])

    return (
        <section className='adm-side-panel'>
            <div className='side-panel-menu'>
                <img src='./assets/images/logoTCC.png'/>
                <div onClick={() => HandleMenu(1)} className={menu == 1 ? 'clicked' : 'div'}>
                    <DashboardIcon/>
                    <a>Painel</a>
                </div>
                <div onClick={() => HandleMenu(2)} className={menu == 2 ? 'clicked' : 'div'}>
                    <PeopleAltIcon/>
                    <a>Usuários</a>
                </div>
                <div onClick={() => HandleMenu(3)} className={menu == 3 ? 'clicked' : 'div'}>
                    <StoreIcon/>
                    <a>Empresas</a>
                </div>
                <div onClick={() => HandleMenu(4)} className={menu == 4 ? 'clicked' : 'div'}>
                    <ReceiptLongIcon/>
                    <a>Pedidos</a>
                </div>
                <div onClick={() => HandleMenu(5)} className={menu == 5 ? 'clicked' : 'div'}>
                    <TrendingUpIcon/>
                    <a>Gráficos</a>
                </div>
                <div onClick={() => HandleMenu(6)} className={menu == 6 ? 'clicked' : 'div'}>
                    <ConfirmationNumberIcon/>
                    <a>Ingressos</a>
                </div>
                <div onClick={() => HandleMenu(7)} className={menu == 7 ? 'clicked' : 'div'}>
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