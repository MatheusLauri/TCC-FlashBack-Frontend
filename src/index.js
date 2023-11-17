import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import LandingPage from './landingpage/index.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdmPage from './adm';
import IngressoPage from './ingresso';
import PageFiltro from './filtro';
import PageFiltroPesquisa from './filtroPesquisa';
import FiltroCidadePage from './filtrocidade';
import DestaqueBox from './componentes/destaquesBox';
import AdmLogin from './admLogin';
import AdmDashboard from './admDashboard';
import Empresa from './empresa/index.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/adm' element={<AdmDashboard/>}/>
            <Route path='/empresas' element={<Empresa/>}/>
            <Route path='/empresas/home' element={<AdmPage/>}/>
            <Route path='/empresas/login' element={<AdmLogin/>}/>
            <Route path='/ingresso/:id' element={<IngressoPage/>}/>
            <Route path='/categoria/:categoria' element={<PageFiltro/>} />
            <Route path='/search/:nome' element={<PageFiltroPesquisa/>} />
            <Route path='/estado/:uf/:ufExtenso' element={<FiltroCidadePage/>} />
            <Route path='/destaque' element={<DestaqueBox/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
