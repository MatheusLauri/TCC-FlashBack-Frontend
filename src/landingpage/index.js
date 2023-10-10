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

  const [listarCategoria, setListarCategoria] = useState([])

  async function ListarCategorias () {

   const nomeCategorias = [];
   const listagem = []; 
   let r =  await axios.get('http://localhost:5000/categoria')

   for (let cont = 0; cont < r.data.length; cont++) {

    nomeCategorias[cont] = r.data[cont].NM_CATEGORIA_INGRESSO

   }


   
   for (let item of nomeCategorias) {

    r = await axios.get(`http://localhost:5000/ingresso/categoria?categoria=${item}`)
    listagem.push(r)

   }
   
  
   setListarCategoria(listagem)

  }
  
console.log(listarCategoria)
 
  useEffect(() => {
    ListarCategorias();
  }, []);
  



  return (
    <div className="body">
      <Header/>
      <section className='secao-01' onClick={() => console.log()}>
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
        

          {listarCategoria.map((item, idArray) => (
            idArray === 0 ? (
              <div className='carrosel' key={idArray}>
                {item.data.map(category => 
                  <BoxIngresso nome={category.NM_EVENTO} data={category.DT_COMECO} imagem={category.IMAGEM_INGRESSO}/>
                )}
              </div>
            ) : null
          ))}
                   
        
        </div>
        <TitleTag className='titletag' text='Palestras e congressos!'/>
        <div className='secao-03-carrosel'>
          <div className='carrosel-controller'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="gray"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32ZM16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM13.9289 23.1L12.5147 21.6858L18.193 16.008L12.5147 10.3289L13.9289 8.91472L21 15.9858L20.979 16.008L21 16.0289L13.9289 23.1Z" fill="#520DA9"/></svg>
          </div>
          {listarCategoria.map((item, idArray) => (
            idArray === 1 ? (
              <div className='carrosel' key={idArray}>
                {item.data.map(category => 
                  <BoxIngresso nome={category.NM_EVENTO} data={category.DT_COMECO} imagem={category.IMAGEM_INGRESSO}/>
                )}
              </div>
            ) : null
          ))}
        </div>
      </section>
      <Rodape/>
    </div>
  );
}

export default LandingPage; 
