import  './index.scss'
import MenuAdm from '../componentes/menu-adm'
import CategorySection from '../componentes/categoryBtn';
import { useState } from 'react';

export default function AdmPage(){


    return(
        <section className='adm-main'>
            <section className='adm-panel'>
                <MenuAdm/>
            </section>
            <section className='adm-content'>
                <section className='adm-home'>
                    <CategorySection/>
                </section>
            </section>
        </section>
    );
}