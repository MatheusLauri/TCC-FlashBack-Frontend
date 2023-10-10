import './pixQRcode.scss';




function PixQRcode(){
    return(
        <div className='Pages-PixQRcode'>
            <div className='card-PixQRcode'>
                <div className='ordem-objetos-PixQRcode'>
                    <div className='titulo-QRcode'>
                        <h1 id='letra-QRcode'>Pagamento Via QRcode</h1>
                    </div>
                    


                    <div className='img-de-QRcode'>
                        <img src='/assets/images/QRcode-pix.svg'/>
                    </div>
                    


                    <div className='local-do-evento'>
                        <b id='local'>Teatro Municipal - São Paulo</b>
                    </div>



                    <div className='valor-do-evento'>
                            <b id='texto-valor'>Valor:</b> <a id='valor'>R$ 199,00</a>
                    </div>



                    <div className='Linha-roxo'>
                        <img id='linha' src='./assets/images/LinhaCorRoxo.svg'/>
                    </div>


                    <p id='txt-indicador'>Aproxime a camera do seu dispositivo</p>

                </div>

                <div className='img-pagamento-vetor'>
                    <img src='/assets/images/desenho-pagamento.png'/>
                </div>

            </div>
        </div>
    )
}

export default PixQRcode; 