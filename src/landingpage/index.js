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
import "glider-js/glider.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, EffectFade, Navigation } from 'swiper/modules'
import DestaqueBox from '../componentes/destaquesBox';
import 'swiper/css/effect-fade';
import { useRef } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
      let r =  await axios.get('http://129.148.42.252:5014/categoria')

      for (let cont = 0; cont < r.data.length; cont++) {

        nomeCategorias[cont] = r.data[cont].NM_CATEGORIA_INGRESSO

      }
      const listagem = []; 
      for (let item of nomeCategorias) {
        try {
          r = await axios.get(`http://129.148.42.252:5014/ingresso/categoria?categoria=${item}`)
          listagem.push(r);
        } catch (error) {
        }
        
      }
      setListarCategoria(listagem)

    } catch (error) {
      
    }
   

  }
  async function ListarDestaques () {
    try {
      let r =  await axios.get('http://129.148.42.252:5014/ingresso/destaque')
      setListarDestaque(r.data)
    } catch (error) {
      
    }
    
  }
  useEffect(() => {
    ListarDestaques();
    ListarCategorias()
  }, []);
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  return (
    <div className="body">
      <Header/>
      <section className='secao-01' ref={homeRef} id="inicio">
        <h1>Explore e viva a diversão!</h1>
        <div className='secao-01-categoria'>
          <Swiper
            slidesPerView={5}
            spaceBetween={60}
            modules={[Navigation]}
            centerInsufficientSlides={true}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <TrianguloCategoria 
                src='./assets/images/teatro.svg' 
                text='Teatros e espetáculos'
              />
            </SwiperSlide>
            <SwiperSlide>
              <TrianguloCategoria 
                src='./assets/images/junina.svg' 
                text='Festas Juninas'
              />
            </SwiperSlide>
            <SwiperSlide>
              <TrianguloCategoria 
                src='./assets/images/agenda.svg' 
                text='Festas e shows'
              />
            </SwiperSlide>
            <SwiperSlide>
              <TrianguloCategoria 
                src='./assets/images/palestra.svg' 
                text='Palestras e congressos'
              />
            </SwiperSlide>
            <SwiperSlide>
              <TrianguloCategoria 
                src='./assets/images/balao.svg' 
                text='Infantil'
              />
            </SwiperSlide>
            
            
            
            
          </Swiper>
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
          pagination={{
            dynamicBullets: true,
            clickable: true
          }}
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
      </section>
      <section className='secao-03'>
        <TitleTag className='titletag' text='Explore o país!'/>
        <div className='secao-03-carrosel-cidade'>
            <div className='carrosel-controller'>
              <a ref={navigationPrevRef}>
                <KeyboardArrowLeftIcon/>
              </a>
              <a ref={navigationNextRef}>
                <KeyboardArrowRightIcon/>
              </a>
            </div>
          <div className='carrosel-cidade'>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              modules={[Navigation]}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              className="mySwiper"
            >
              <SwiperSlide>
                <BoxCity city='São Paulo' src='./assets/images/sp.png' uf='sp'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Rio de Janeiro' src='./assets/images/rio.png' uf='rj'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Minas Gerais' src='./assets/images/bh.png' uf='bh'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Santa Catarina' src='./assets/images/SC.jpg' uf='sc'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Rio Grande do Sul' src='./assets/images/porto.png' uf='rs'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Paraná' src='./assets/images/PR.jpg' uf='pr'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Bahia' src='./assets/images/salvador.png' uf='ba'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Maranhão' src='./assets/images/maranhao.jpg' uf='ma'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Mato grosso' src='./assets/images/mt.jpg' uf='mt'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Ceará' src='./assets/images/ceara.jpg' uf='ce'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Paraíba' src='./assets/images/paraiba.jpg' uf='pb'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Pará' src='./assets/images/para.jpg' uf='pa'/>
              </SwiperSlide>
              <SwiperSlide>
                <BoxCity city='Goias' src='./assets/images/goias.jpg' uf='go'/>
              </SwiperSlide>
            </Swiper>
            <div className='slider-controller'>
              <div className='swiper-pagination'></div>
            </div>
            
          </div>
        </div>
        
        {listarCategoria.length > 0 ?
            listarCategoria.map((item, index) => (
                <>
                  <TitleTag className='titletag' text={item.data[0].NM_CATEGORIA_INGRESSO} />
                  <div className='secao-03-carrosel'  >
                    <div className='carrosel-controller'>
                      <a className={`prev${index}`}>
                        <KeyboardArrowLeftIcon/>
                      </a>
                      <a className={`next${index}`}>
                        <KeyboardArrowRightIcon/>
                      </a>
                    </div>
                    <Swiper
                      slidesPerView={4}
                      spaceBetween={30}
                      modules={[Navigation]}
                      navigation={{
                        prevEl: `.prev${index}`,
                        nextEl: `.next${index}`
                      }}
                      className="mySwiper"
                    >
                      {item.data.map((item,index) => (
                        <SwiperSlide>
                          <BoxIngresso nome={item.NM_EVENTO} data={item.DT_COMECO} horario={item.DS_HORARIO} imagem={item.IMAGEM_INGRESSO} logradouro={item.DS_LOGRADOURO} cidade={item.DS_LOCALIDADE} uf={item.DS_UF} id={item.ID_INGRESSO} num={item.DS_NUM}/>
                        </SwiperSlide>
                      ))}
                    </Swiper>
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
