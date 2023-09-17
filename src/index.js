import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Landingpage from './landingpage/index.js';
import Rodape from './componentes/rodape/index.js'
import MenuAdm from './componentes/menu-adm/index.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './componentes/header/header';
import { TrianguloCategoria } from './componentes/trianguloCategoria';
import TitleTag from './componentes/titleTag';
import BoxCity from './componentes/boxCity';
import BoxIngresso from './componentes/boxIngresso';
import AdmPage from './adm';
import CategoryBtn from './componentes/categoryBtn';
import AdmTicket from './componentes/admTicket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landingpage/>}/>
            <Route path='/rodape' element={<Rodape/>}/>
            <Route path='/adm' element={<AdmPage/>}/>
            <Route path='/h' element={<AdmTicket/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
