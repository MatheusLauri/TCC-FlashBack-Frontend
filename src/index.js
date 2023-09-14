import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Landingpage from './landingpage/index.js';
import Rodape from './componentes/rodape/index.js'
import MenuAdm from './componentes/menu-adm/index.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './componentes/header/header';
import { TrianguloCategoria } from './componentes/trianguloCategoria';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landingpage/>}/>
            <Route path='/rodape' element={<Rodape/>}/>
            <Route path='/admR' element={<MenuAdm/>}/>
            <Route path='/h' element={<TrianguloCategoria/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
