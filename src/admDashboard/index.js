import AdmPanel from '../componentes/admPanel'
import AdmUser from '../componentes/admUser'
import './index.scss'


export default function AdmDashboard(){

    return (
        <section className='secao-adm-dashboard'>
            <AdmPanel/>
            <section className='painel'>
                <AdmUser page='Dashboard' user='Flashback' funcao='Admin'/>
            </section>

        </section>
    )
}