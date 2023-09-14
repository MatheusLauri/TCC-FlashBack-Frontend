import './header.scss'

export function Header(){
    return(
        <section className="secao-header">
            <img src='/assets/images/logoTCC.png'/>
            <div className='secao-header-input-div'>
                <img src='/assets/images/lupa.svg'/>
                <input type='text' placeholder='Pesquisar eventos, shows, teatros, festas...'/>
            </div>
            <div className='secao-header-menu'>
                <div className='menu-select'>
                    <img src='/assets/images/local.svg'/>
                    <select>
                        <option>Escolha um local</option>
                        <option>Map-api</option>
                    </select>
                </div>
                <div className='menu-carrinho'>
                    <img src='/assets/images/carrinho.svg'/>
                    <span>0</span>
                </div>
                <a>Entrar</a>
            </div>

        </section>
    );
}