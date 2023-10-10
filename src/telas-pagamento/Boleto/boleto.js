import '../Boleto/boleto.scss';

function Boleto(){
    return(
        <div className='pages-boleto'>
            <div className='card-meio-boleto'>
                    <div className='ordem-dos-objetos'>
                            <div class="img-sacola">
                                    <img src="/assets/images/img-sacola.svg"/>
                                    <h1 class="titulo">Pagamento Via Boleto</h1>
                            </div>
                                
                                
                            <div className='nome-input'>
                                    <p id='titulo-nm'>Gerar no nome de 
                                    <img id='astedisco' src='/assets/images/astedisco.svg'></img>
                                    </p>
                                    <input id='input-nm-usuario' type='text' placeholder="Digite aqui..."></input>
                            </div> 


                            
                            
                            
                            <div class="titulo-de-pagamento">
                                
                                <p id="tp-documento-boleto">Tipo de Documento
                                <img id='astedisco' src="/assets/images/astedisco.svg"></img>
                                </p>
                                
                                <p id="cpf">CPF
                                <img id='astedisco' src="/assets/images/astedisco.svg"></img>
                                </p>

                            </div>

                            <div class="Bolinhas-de-selecao">
                                  <label class="radio">
                                      <input type="radio" value="male" name="gender"/>
                                      CPF
                                     <span></span>
                                </label>
                        
                                <label class="radio">
                                    <input type="radio" value="female" name="gender"/>
                                     CNPJ
                                    <span></span>
                                </label>
                                    
                                 <div class="escolha-de-pagamento-blt">
                                    <input id="input-NR-CPF-CNPJ" type='text' placeholder="000.000.000-00"></input>
                            </div>
                        </div>

                                    <div className='Endereco'>
                                        <p id='titulo-endereco'>Endereço - CEP 
                                        <img id='astedisco-endereco' src="/assets/images/astedisco.svg"></img>
                                        </p>
                                        <input id='input-endereco' type='text' placeholder="Digite aqui..."></input>
                                    </div>


                                    <button class="botao-finalizar-info-boleto">
                                        <b id="texto-finalizar">Finalizar</b>
                                    </button>
                        
                    </div>

                            <div class="img-pagamento">
                                <img src="/assets/images/desenho-pagamento.png"/>
                            </div>
            </div>
        </div>
    )
}

export default Boleto;