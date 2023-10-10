import './pix.scss';






function Pix(){
    return(
    <div class="Pages-pix">
        <div class="card-meio-pix">
            <div class="ordem-dos-objetos">
                    <div class="img-sacola">
                    <img src='/assets/images/img-sacola.svg'/>
                        <h1 class="titulo">Pagamento instantâneo</h1>
                    </div>
                    
                    <h1 class="sub-titulo">Como pagar com o Pix?</h1>    
            
                    <div class="texto-pix">
                        <p id="texto-ex">
                            Ao finalizar a compra, será gerado um
                             QR Code de pagamento. Use o seu aplicativo do seu banco ou carteira 
                             digital para escánea-lo e realizar o seu pagamento de ingresso.</p>
                    </div>

                            <div id="linha-do-text">
                                <img src='/assets/images/linha de texto.svg'/>
                            </div>

                    <div class="titulo-de-pagamento-pix">
                        <p id="tp-documento">Tipo de Documento</p>
                        <img src='/assets/images/astedisco.svg'/>
                        
                        <p id="cpf-pix">CPF</p>
                        <img src='/assets/images/astedisco.svg'/>
                    </div>

                        <div class="Bolinhas-de-selecao-pix">
                            <label class="radio-pix">
                                <input type="radio" value="male" name="gender"/>
                                CPF
                                <span></span>
                            </label>
                
                            <label class="radio-pix">
                                <input type="radio" value="female" name="gender"/>
                                CNPJ
                                <span></span>
                            </label>
                            
                            <div class="escolha-de-pagamento">
                                <input id="INPUT-NR-CPF-CNPJ" type='text' placeholder="000.000.000-00"></input>
                        </div>
                   
                    </div>
                    
                     <button class="botao-finalizar-info">
                        <b id="texto-finalizar">Finalizar</b>
                    </button>

            </div>

                <div class="img-pagamento">
                <img src='/assets/images/desenho-pagamento.png'/>
                </div>
        </div>
    </div>
    )
}
export default Pix;