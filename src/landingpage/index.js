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

function LandingPage() {

  const [listar, setListar] = useState([])

  async function ListarIngressos () {

   const r =  await axios.get('http://localhost:5000/ingresso')

   setListar(r.data)
  }

  useEffect(() => {
    ListarIngressos();
  }, [])
  


  return (
    <div className="body">
      <Header/>
      <section className='secao-01'>
        <h1>Explore e viva a diversão!</h1>
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
      </section>
      <section className='secao-03'>
        <TitleTag className='titletag' text='Explore o país!'/>
        <div className='secao-03-carrosel'>
          <div className='carrosel-controller'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="gray"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="#520DA9"/></svg>
          </div>
          <div className='carrosel'>
            <BoxCity city='São Paulo' src='./assets/images/sp.png'/>
            <BoxCity city='Salvador' src='./assets/images/salvador.png'/>
            <BoxCity city='Porto Alegre' src='./assets/images/porto.png'/>
            <BoxCity city='Belo Horizonte' src='./assets/images/bh.png'/>
            <BoxCity city='Rio de Janeiro' src='./assets/images/rio.png'/>
          </div>
        </div>
        <TitleTag className='titletag' text='Festas e shows!'/>
        <div className='secao-03-carrosel'>
          <div className='carrosel-controller'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="gray"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="#520DA9"/></svg>
          </div>
          <div className='carrosel'>
            
              {listar.map(item =>
                <BoxIngresso nome={item.NM_EVENTO} data={item.DT_COMECO} imagem={item.IMAGEM_INGRESSO}/> 
              )}
            
            <BoxIngresso src='./assets/images/farofada.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='FaroFada'/>
            <BoxIngresso src='./assets/images/inter.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='Inter Tenda'/>
            <BoxIngresso src='./assets/images/numanice.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='Numanice'/>
            <BoxIngresso src='./assets/images/alok.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='Alok & Jefferson .M'/>
          </div>
        </div>
        <TitleTag className='titletag' text='Palestras e congressos!'/>
        <div className='secao-03-carrosel'>
          <div className='carrosel-controller'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="gray"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="#520DA9"/></svg>
          </div>
          <div className='carrosel'>
          <BoxIngresso src='./assets/images/matue.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='Matuê'/>
            <BoxIngresso src='./assets/images/scar.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='Scarlxrd'/>
            <BoxIngresso src='./assets/images/daddy.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='Daddy Yanke'/>
            <BoxIngresso src='./assets/images/lucas.png' local='Teatro Municipal - São Paulo, SP ' data='Sáb, 30 Nov - 20:00' evento='Inutilismo'/>
          </div>
        </div>
      </section>
      <Rodape/>
    </div>
  );
}

export default LandingPage; 
