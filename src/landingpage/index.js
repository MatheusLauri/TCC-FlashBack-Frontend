import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape';
import { TrianguloCategoria } from '../componentes/trianguloCategoria';
import './index.scss';

function App() {
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
      <Rodape/>
    </div>
  );
}

export default App; 
