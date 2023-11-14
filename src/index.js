import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import LandingPage from './landingpage/index.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdmPage from './adm';
import Pix from '../src/telas-pagamento/Pix/pix.js';
import PixQRcode from '../src/telas-pagamento/Pix-QRcode/pixQRcode.js';
import Boleto from '../src/telas-pagamento/Boleto/boleto.js';
import IngressoPage from './ingresso';
import Card from '../src/componentes/card-Meuspedidos/index.js'
import PageFiltro from './filtro';
import PageFiltroPesquisa from './filtroPesquisa';
import FiltroCidadePage from './filtrocidade';
import DestaqueBox from './componentes/destaquesBox';
import PageCarrinho from './Carrinho';
import Bdcartao from './dadoscartao';
import AdmLogin from './admLogin';
import AdmDashboard from './admDashboard';
import Empresa from './empresa/index.js';
import Resumo from '../src/telas-pagamento/Resumo/index.js'


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
            <Route path='/pix' element={< Pix/>}/>
            <Route path='/qrcode' element={<PixQRcode/>}/>
            <Route path='/boleto' element={<PageCarrinho/>}/>
            <Route path='/ingresso/:id' element={<IngressoPage/>}/>
            <Route path='/card' element={<Card/>} />
            <Route path='/categoria/:categoria' element={<PageFiltro/>} />
            <Route path='/search/:nome' element={<PageFiltroPesquisa/>} />
            <Route path='/estado/:uf/:ufExtenso' element={<FiltroCidadePage/>} />
            <Route path='/destaque' element={<DestaqueBox/>} />
            <Route path='/carrinho' element={<PageCarrinho/>}/>
            <Route path='/bdcartao' element={<Bdcartao/>}/>
            <Route path='/resumo' element={<Resumo/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
