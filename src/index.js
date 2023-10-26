import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import LandingPage from './landingpage/index.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdmPage from './adm';
import Empresa from './empresa/index'
import Pix from '../src/telas-pagamento/Pix/pix.js';
import PixQRcode from '../src/telas-pagamento/Pix-QRcode/pixQRcode.js';
import Boleto from '../src/telas-pagamento/Boleto/boleto.js';
import IngressoPage from './ingresso';
import Card from '../src/componentes/card-Meuspedidos/index.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/adm' element={<AdmPage/>}/>
            <Route path='/empresa' element={<Empresa/>}/>
            <Route path='/pix' element={< Pix/>}/>
            <Route path='/qrcode' element={<PixQRcode/>}/>
            <Route path='/boleto' element={<Boleto/>}/>
            <Route path='/ingresso/:id' element={<IngressoPage/>}/>
            <Route path='/card' element={<Card/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
