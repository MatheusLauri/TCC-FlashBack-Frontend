import './index.scss';

function Rodape() {
  return (
    <div className="main-rodape">
        
        <h1>Redes sociais</h1>

        <div className='fotos-cab'>
            <a><img src='/assets/images/Twitter.png'/></a>
            <a><img src='/assets/images/faceboook.png'/></a>
            <a><img src='/assets/images/faceboook.png'/></a>
            <a><img src='/assets/images/faceboook.png'/></a>
            <a><img src='/assets/images/youtube.png'/></a>
        </div>

        <div className='barra-long'>

        </div>

        <div className='textos-cab'>
            <p>Todos os preços e condições comerciais estão sujeitos a alterração comercial sem prévio aviso</p>
            <p className='t2'>FlashBack Tecnolia e Soluções LTDA - CNPJ 10.316.295/0001-05</p>
            <p>Rua laurinopólis, 303,  C|224 - CEP - 03110-010 - São Paulo - SP</p>  
        </div>
    </div>
  );
}

export default Rodape; 
