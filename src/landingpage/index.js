import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape';
import './index.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <section className='secao-01'>
        <h1>Explore e viva a diversão!</h1>
        <div className='secao-01-categoria'>
          
        </div>
      </section>
      <Rodape/>
    </div>
  );
}

export default App; 
