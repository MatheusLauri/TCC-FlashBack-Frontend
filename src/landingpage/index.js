import BoxCity from '../componentes/boxCity';
import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape';
import TitleTag from '../componentes/titleTag';
import { TrianguloCategoria } from '../componentes/trianguloCategoria';
import BoxIngresso from '../componentes/boxIngresso'
import './index.scss';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import DestaqueBox from '../componentes/destaquesBox';
import 'swiper/css/effect-fade';
import { useRef } from 'react';

function LandingPage() {

  const homeRef = useRef(null);

  useEffect(() => {
    // Scroll para o início da página
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const [listarCategoria, setListarCategoria] = useState([])
  const [listarDestaque,setListarDestaque] = useState([])

  async function ListarCategorias () {
    try {
      const nomeCategorias = [];
      let r =  await axios.get('http://localhost:5000/categoria')

      for (let cont = 0; cont < r.data.length; cont++) {

        nomeCategorias[cont] = r.data[cont].NM_CATEGORIA_INGRESSO

      }
      const listagem = []; 
      console.log(nomeCategorias)
      for (let item of nomeCategorias) {
        try {
          r = await axios.get(`http://localhost:5000/ingresso/categoria?categoria=${item}`)
          listagem.push(r);
        } catch (error) {
        }
        
      }
      console.log(listagem)
      setListarCategoria(listagem)
      console.log(listarCategoria)

    } catch (error) {
      
    }
   

  }
  async function ListarDestaques () {
    try {
      let listagem = []
      let r =  await axios.get('http://localhost:5000/ingresso/destaque')
      setListarDestaque(r.data)
    } catch (error) {
      
    }
    
  }
  useEffect(() => {
    ListarDestaques();
    ListarCategorias()
  }, []);


  return (
    <div className="body">
      <Header/>
      <section className='secao-01' ref={homeRef} id="inicio">
        <h1 onClick={() => console.log(listarCategoria)}>Explore e viva a diversão!</h1>
        <div className='secao-01-categoria'>
          <TrianguloCategoria 
            src='./assets/images/teatro.svg' 
            text='Teatros e espetáculos'
          />
          <TrianguloCategoria 
            src='./assets/images/junina.svg' 
            text='Festas Juninas'
          />
          <TrianguloCategoria 
            src='./assets/images/agenda.svg' 
            text='Festas e shows'
          />
          <TrianguloCategoria 
            src='./assets/images/palestra.svg' 
            text='Palestras e congressos'
          />
          <TrianguloCategoria 
            src='./assets/images/balao.svg' 
            text='Infantil'
          />
        </div>
      </section>
      <div className='main-faixa-eventos'>
        <h1>Eventos em Destaque</h1>
      </div>
      <section className='secao-02'>
        <Swiper
          draggable={true}
          loop={true}
          spaceBetween={30}
          effect={'fade'}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{el: '.swiper-pagination', clickable: true, dynamicBullets:true,}}
          modules={[EffectFade, Pagination, Autoplay]}
          className="mySwiper"
        >
          {listarDestaque.map(item =>
            <SwiperSlide className='swiper-slide'>
              <DestaqueBox
                nome={item.NM_EVENTO}
                cidade={item.DS_LOCALIDADE}
                uf={item.DS_UF}
                dataC={item.DT_COMECO}
                dataF={item.DT_FIM}
                imagem={item.IMAGEM_INGRESSO}
                endereco={item.DS_LOGRADOURO}
                id={item.ID_INGRESSO}
              />
            </SwiperSlide>
          )}
        </Swiper>
        <div className='slider-controller'>
          <div className='swiper-pagination'></div>
        </div>
      </section>
      <section className='secao-03'>
        <TitleTag className='titletag' text='Explore o país!'/>
        <div className='secao-03-carrosel-cidade'>
          <div className='carrosel-cidade'>
            <Glider
              iconLeft='‹'
              iconRight='›'
              draggable
              hasArrows
              slidesToShow='5'
              slidesToScroll='5'
            >
              <BoxCity city='São Paulo' src='./assets/images/sp.png' uf='sp'/>
              <BoxCity city='Bahia' src='./assets/images/salvador.png' uf='ba'/>
              <BoxCity city='Rio Grande do Sul' src='./assets/images/porto.png' uf='rs'/>
              <BoxCity city='Belo Horizonte' src='./assets/images/bh.png' uf='bh'/>
              <BoxCity city='Rio de Janeiro' src='./assets/images/rio.png' uf='rj'/>
            </Glider>
          </div>
        </div>
        
        {listarCategoria.length > 0 ?
            listarCategoria.map((item, index) => (
                <>
                  <TitleTag className='titletag' text={item.data[0].NM_CATEGORIA_INGRESSO} />
                  <div className='secao-03-carrosel'  >
                    <Glider
                      iconLeft='‹'
                      iconRight='›'
                      draggable
                      hasArrows
                      slidesToShow={4}
                      slidesToScroll={4}
                    >
                      {item.data.map((item,index) => (
                        <BoxIngresso nome={item.NM_EVENTO} data={item.DT_COMECO} horario={item.DS_HORARIO} imagem={item.IMAGEM_INGRESSO} logradouro={item.DS_LOGRADOURO} cidade={item.DS_LOCALIDADE} uf={item.DS_UF} id={item.ID_INGRESSO} num={item.DS_NUM}/>
                      ))}
                    </Glider>
                  </div>
                  
                </>
            ))
          : 
          <div>
            <p>Desculpe! Não encontramos nenhum ingresso.<br/> Tente em um outro momento.</p>
          </div>
        }
      </section>
      <Rodape/>
    </div>
  );
}

export default LandingPage; 
