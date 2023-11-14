import './index.scss';

import Rodape from '../../componentes/rodape/index.js'
import {Header} from '../../componentes/header/header.js'


import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Estagio from '../../componentes/estagioCompra/index.js';

function ResumoCompra(){



    
    return(
     <div className='mae-todas'>
            <Header/>
            
            <Estagio/>
        <div className='content-center'>
            <div className='top'>
                    <div className='cima'>
                            <div className='resumo'>
                                <h3>Resumo da compra</h3>
                                <p>Alok & Jefferson M.</p>
                            </div>

                            <p>foto</p>
                    </div>

                    <div className='linha'></div>

                    <div className='meio'>
                        <p> Sexta-feira, 18 de agosto de 2023 às 22h00</p>

                        <div className='tipo'>
                            <p>1x Inteira</p>
                            <p>R$ 440,00</p>
                        </div>

                        <div className='taxa'>
                            <p>+ taxa</p>
                            <p>R$ 44,00</p>
                        </div>
                    </div>

                    <div className='linha'></div>

                    <div className='baixo'>
                        <div className='cima-baixo'>
                            <h4>SUBTOTAL</h4>
                            <h3>R$ 484,00</h3>
                        </div>

                        <div className='parcela'>
                            <p>Pague em até 12x</p>
                        </div>
                    </div>
            </div>

            <div className='down'>
                    
            </div>
        </div>

            <Rodape/>
     </div>
    )
}

export default ResumoCompra; 
