import './index.scss'
import { useEffect, useState } from 'react';

export default function ValorTotalClick(props){
    
    return(

        
        <div className='valor-total-click'>
        <div className='caixa-vl-total'>
            <div className='ordem-caixa-vl'>
                    <a id='txt-ttl-vl-caixa1'>{props.parcela} X de R$ {props.vlparcela}</a>
                <div className='ordem-txt-vl'>
                    <a id='txt-ttl-vl-caixa2'>Total: R$</a>
                    <a id='txt-juros-caixa'>{props.preco} Sem juros</a>
                </div>
            </div>
        </div>
    </div>




    )





}