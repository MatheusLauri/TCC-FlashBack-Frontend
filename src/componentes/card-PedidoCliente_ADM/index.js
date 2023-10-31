

import './index.scss'


export default function CardPedidoCliente_Adm() {  

    return (
        <div className="Card-PedidoCliente-Main">
           <p>01</p>
           <p>Carlinhos Jesuitas</p>
           <p>048.755.121-80</p>
           <p>carlin@gmail.com</p>
           <p>(11) 95577-3905</p>

           <div className='container-infosIngresso_PedidoCliente'>
                <div>
                    <img className='container-imgEvento_PedidoCliente'src='/assets/images/numanice.JPG'></img>
                </div>
                <div className='sub-container-infosIngresso_PedidoCliente'>
                    <div className='valorqtd-infosIngresso_PedidoCliente'>
                        <h3>Valor:<p>199,99</p></h3>
                        <h3>Qtd:<p>2</p></h3>
                    </div>
                    <p>Front Stage: Inteira</p>
                </div>
           </div>

           <div className='containerParcela-infosIngresso_PedidoCliente'>
                <p>6x (5 restantes)</p>
                <h3>Valor:<p>199,99</p></h3>
           </div>

           <p>399,99</p>
        </div>
    )
}