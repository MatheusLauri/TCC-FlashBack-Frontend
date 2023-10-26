import './index.scss'


export default function Card() {

return (
    <div className='primaria'>
            
            <div className='card-info-img'>
                <img src='./assets/images/farofada.png' />

                <div className='informacoes-left'>

                    <p>Sáb, 30 Nov - 20:00</p>

                    <div className='infos-filhos'>
                        <h3>Alok & Jeffersson M.</h3>
                        <p>Teatro Municipal - São Paulo, SP </p>
                    </div>
                </div>
            </div>

            <div className='card-info'>
                <div className='informacoes-rigth'>
                        <div className='filhos-left'>
                                <h3>Disponivel:</h3>
                                <p> sim </p>
                        </div>

                        <div className='filhos-rigth'>
                                <h3>Status:</h3>
                                <p> FInalizado </p>
                        </div>
                </div>

                <button> Visualizar </button>
            </div>
    </div>
);

}