import './index.scss'


export default function Card() {

return (
    <section>
        <div className='mae-geral'>
            
            <div className='left-side'>
                <img src='./assets/images/farofada.png' />

                <div className='informacoes-rigth'>

                    <p>DATA</p>

                    <div className='infos-filhos'>
                        <h3>Alok & Jeffersson M.</h3>
                        <h5>Local</h5>
                    </div>
                </div>
            </div>

            <div className='rigth-side'>
                <div className='informacoes-left'>
                        <div className='filhos-left'>
                                <h3>Disponivel</h3>
                                <p> sim </p>
                        </div>

                        <div className='filhos-rigth'>
                                <h3>Status</h3>
                                <p> FInalizado </p>

                        </div>
                </div>

                <button> osh </button>
            </div>
        </div>
    </section>
);

}