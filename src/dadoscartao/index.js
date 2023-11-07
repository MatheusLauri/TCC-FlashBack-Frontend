import './index.scss'
import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape';
import { useEffect, useState } from 'react';
import ValorTotalClick from '../componentes/valortotalclick';

export default function Bdcartao(){

    const [textoInput, setTextoInput] = useState('');

    const [numParcelas, setNumParcela] = useState('');
    const [Preco, setPreco] = useState('');
    const [vlparcela, setVlparcela] = useState('');

    const[popUpParcelaAtivo, setPopUpParcelaAtivo] = useState(false);
 


    function textoInputado(e){

        setTextoInput(e.target.value);


    }



    useEffect(()=>{


    }, [textoInput]);




    return(
        <div className='ordem-pages-bdcartao'>
            <div className='cabecalho-bdcartao'>
                <Header></Header>
            </div>

            <div  className='pages-bdcartao'>
                <div className='bd-cartao'>
                    <div className='ordem-bdcartao'>
                                            
                                            
                                            <div className='info-bdcartao'>
                                                <h1 id='titulo-bdcartao'>Dados do cartão</h1>
                                                
                                                <div className='tp-pg-bdcartao-txt'>
                                                    <img id='img-cartao-bdcartao' src='/assets/images/icone-cartao.svg'/>
                                                    <p id='ttl-cartao'>Cartão de Crédito</p>
                                                </div>



                                                <div className='txt-parcelamento-bdcartao'>
                                                        <a id='txt-parcelamento'>Parcelamento</a>
                                                    <div className='ordem-txt-tp-parcela'>
                                                        <a id='pt1-tp'>Compre em até 12 vezes</a>
                                                        <img id='icone-esclamacao' src='/assets/images/icone-esclamacao.svg'/>   <a id='pt2-tp'>Veja as condições de parcelamento</a>
                                                    </div>
                                                </div>



                                                <div className='selecao-valores-bd'>
                                                       <div className='selecoes-click'> 
                                                                
                                                                <div className='click-selecao'>
                                                                    <input className='click' name='theradio' id='radio1' type='radio'
                                                                     onClick={() => {setNumParcela(1); setPreco(199,99); setVlparcela(Preco / numParcelas); setPopUpParcelaAtivo(true)}}></input>
                                                                    <label for='click1'         
                                                                    ></label> 
                                                                </div>

                                                                <div className='click-selecao'>
                                                                    <input className='click' name='theradio' id='radio1' type='radio'
                                                                    onClick={() => {setNumParcela(2); setPreco(199,99); setVlparcela(Preco / numParcelas); setPopUpParcelaAtivo(true)}}></input>
                                                                    <label for='click2'></label> 
                                                                </div>

                                                                <div className='click-selecao'>
                                                                    <input className='click' name='theradio' id='radio1' type='radio'
                                                                    onClick={() => {setNumParcela(4); setPreco(199,99); setVlparcela(Preco / numParcelas); setPopUpParcelaAtivo(true)}}></input>
                                                                    <label for='click3'></label> 
                                                                </div>

                                                                <div className='click-selecao'>
                                                                    <input className='click' name='theradio' id='radio1' type='radio'
                                                                    onClick={() => {setNumParcela(10); setPreco(199,99); setVlparcela(Preco / numParcelas); setPopUpParcelaAtivo(true)}}></input>
                                                                    <label for='click4'></label> 
                                                                </div>

                                                                <div className='click-selecao'>
                                                                    <input className='click' name='theradio' id='radio1' type='radio'
                                                                    onClick={() => {setNumParcela(12); setPreco(199,99); setVlparcela(Preco / numParcelas); setPopUpParcelaAtivo(true)}}></input>
                                                                    <label for='click5'></label> 
                                                                </div>
                                                        </div>


                                                        <div className='valores-click'>
                                                            <div className='valores-txt'>
                                                                
                                                                <div id='ordem-vl-juros'>
                                                                <a id='vl-total'>1 X de R$ 199,00</a>
                                                                </div>

                                                                <div id='ordem-vl-juros'>
                                                                    <a id='vl'>2 X de R$ 99,50</a>
                                                                    <a id='juros'>sem juros</a>
                                                                </div>

                                                                <div id='ordem-vl-juros'>
                                                                    <a id='vl'>4 X de R$ 49,75</a>
                                                                    <a id='juros'>sem juros</a>
                                                                </div>

                                                                <div id='ordem-vl-juros'>
                                                                    <a id='vl'>10 X de R$ 19,90</a>
                                                                    <a id='juros'>sem juros</a>
                                                                </div>

                                                                <div id='ordem-vl-juros'>
                                                                    <a id='vl'>12 X de R$ 16,65</a>
                                                                    <a id='juros'>sem juros</a>
                                                                </div>
                                                            </div>
                                                        </div>


                                                {

                                                    (popUpParcelaAtivo == true)

                                                    ?<ValorTotalClick
                                                    preco={Preco}
                                                    parcela={numParcelas}
                                                    vlparcela={vlparcela}>
                                                    </ValorTotalClick>
    

                                                    :<></>


                                                }
                                          
                                                </div>
                                                
                                                
                                                
                                                
                                                    <div className='validade-compra-ingresso'>
                                                            <div className='txt-validade-ingresso-cliente'>
                                                                <div> <a id='nr-cartao-ingresso'>Número do cartão</a>  <img id='astedisco-validade-ingresso' src='/assets/images/astedisco.svg'/> </div>
                                                                <div> <a id='dt-validade-ingresso'>Data de validade</a> <img id='astedisco-validade-ingresso' src='/assets/images/astedisco.svg'/> </div>
                                                                <div> <a id='codigo-seguranca-ingresso'>Código de segurança</a> <img id='astedisco-validade-ingresso' src='/assets/images/astedisco.svg'/> </div>
                                                            </div>
                                                            

                                                            <div className='inputs-validade-ingresso'>
                                                                    <div className='ordem-inputs-validade'>

                                                                        <div className='input-vl'><input id='vl-input1' type='text' placeholder="0000.0000.0000.0000"></input></div>

                                                                        <div className='input-vl'><input id='vl-input2' type='text' placeholder="MM/AA"></input></div>

                                                                        <div className='input-vl3'>
                                                                            <input id='vl-input3' type='text' placeholder="000"
                                                                            onChange={textoInputado}></input>

                                                                            {

                                                                                (textoInput.length > 0)

                                                                                ?<></>

                                                                                :<img id='icone-chave-input3' src='/assets/images/chave.svg'/>
                                                                                
                                                                                
                                                                            }
                                                                            
                                                                            </div>

                                                                    </div>
                                                            </div>
                                                    </div>


                                                    <div className='botao-finalizar-validade'>
                                                        <div className='botao-validade'>
                                                            <a id='font-botao-validade'> Finalizar</a>
                                                        </div>
                                                    </div>


                                            </div>



                                            <div className='img-bdcartao'>
                                                <img src='/assets/images/desenho-pagamento.png'/>
                                            </div>
                    </div>
                </div>
            </div>


            <div className='rodape-bdcartao'>
                   <Rodape></Rodape> 
            </div>
        </div>
    )
}
