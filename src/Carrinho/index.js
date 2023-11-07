import './index.scss'
import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape';

export default function PageCarrinho (){
    return(
        <div className="ordem-pages-pedidos">
                        <div className='cabecalho-pedidos'>        
                            <Header></Header>
                        </div>
                        
                    <div className='txt-pedidos'>
                        <img id='barra-pedidos' src='/assets/images/barrapedidos.svg' />
                        <p>Meus pedidos</p>
                    </div>
                
                <div className='pages-pedidos'>

                    <div className='ingresso-pedidos'>
                        <img id='alok' src='/assets/images/alok.png'/>
                        <div className='ordem-ingresso-pedidos'>

                                
                                
                                
                                
                                
                                <div className='nome-ingresso' id='info-ticket'>
                                    <a id='horario'>Sáb, 30 Nov - 20:00</a>
                                    <a id='artista'>Alok & Jefferson M.</a>
                                    <a id='local-ingresso'>Teatro Municipal - São Paulo, SP</a>
                                </div>


                                
                                
                                
                                
                                
                                
                                <div className='local-qtd-ingresso' id='info-ticket'>

                                    <div id='reserva-ingresso'>
                                        <a id='txt-r-i'>Ingresso (s)</a>
                                    </div>

                                    <div id='qtd-ingresso'>
                                        <a id='qtd'> Qtd: </a>
                                        <a id='valor-ingresso'> Valor: </a>
                                    </div>

                                </div>


                                            
                                            
                                            
                                            
                                            
                                            
                                            <div className='editar-qtd-ingresso' id='info-ticket'>
                                                    <div id='icone-lixeira'>
                                                    <img src='/assets/images/icone-lixeira.svg'/>
                                                    </div>


                                                    <div id='ordem-editar-qtd'> 
                                                        <img id='icone-menos' src='/assets/images/icone-menos.svg'/> 
                                                            <a id='qtd-ingresso-container'>1</a>
                                                            <img id='icone-mais' src='/assets/images/icone-mais.svg'/>
                                                    </div>
                                            </div>
                        </div>
                    </div>





                        <div className='tp-pagamento-pedidos'>
                                        <div className='ordem-cartao-pix'>
                                            <div className='cartao-pedidos'>
                                                <div id='img-cartao-pedidos'>
                                                    <img src='/assets/images/icone-cartao.svg'/>
                                                </div>

                                                <div id='txt-cartao-pedidos'>
                                                    <div id='tl-pagamento'>Cartão</div>
                                                    <div id='tp-de-pg'>Pague em até 12x</div>
                                                </div>



                                                <div className='cartao-parcelas-pedidos'>
                                                    <a id='parcelas-cartao'>12x de R$ 
                                                     <a id='valor-cor-roxo'>19,00</a> 
                                                    </a>
                                                </div>
                                                <img id='seta' src='/assets/images/seta.svg'/>
                                            </div>
                                            


                                            <div className='pix-pedidos'>
                                                <div id='img-pix-pedidos'>
                                                    <img src='/assets/images/icone-pix.svg'/>
                                                </div>

                                                <div id='txt-pix-pedidos'>
                                                    <div id='tl-pagamento'>Pix</div>
                                                    <div id='tp-de-pg'>Pagamento Instântaneo</div>
                                                </div>
                                            
                                                
                                                <div className='pix-parcelas-pedidos'>
                                                    <a id='parcelas-pix'>R$ 
                                                        <a id='valor-cor-roxo'>499,00</a> 
                                                    </a>
                                                </div>
                                                <img id='seta' src='/assets/images/seta.svg'/>
                                            
                                            </div>

                                        </div>
                        
                                
                                
                                        <div className='ordem-boleto-botao'>
                                                
                                                <div className='boleto-pedidos'>
                                                    <div id='img-boleto-pedidos'>
                                                        <img src='/assets/images/icone-boleto.svg'/>
                                                    </div>

                                                    <div id='txt-boleto-pedidos'>
                                                        <div id='tl-pagamento'>Boleto</div>
                                                        <div id='tp-de-pg'>Pagamento à vista</div>
                                                    </div>

                                                    <div className='boleto-parcelas-pedidos'>
                                                        <a id='parcelas-boleto'>R$
                                                            <a id='valor-cor-roxo'>499,00</a> 
                                                        </a>
                                                    </div>
                                                    <img id='seta' src='/assets/images/seta.svg'/>
                                                </div>

                                                <div className='botao-flz-pedidos'>
                                                    <a>Finalizar Compra</a>
                                                </div>

                                        </div>
                        </div>


                </div>
                            
                            <div className='rodaape-pedidos'>
                               
                            </div>
        </div>
    )
}

