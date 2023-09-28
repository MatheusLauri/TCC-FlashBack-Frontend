import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import LandingPage from './landingpage/index.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdmPage from './adm';
import Empresa from './empresa/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/adm' element={<AdmPage/>}/>
            <Route path='/empresa' element={<Empresa/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
