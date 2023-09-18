import { useState } from 'react';
import './header.scss'
import Modal from 'react-modal'
import * as Components from './components'

export function Header(){
    const [showModal,setShowModal] = useState(false)
    const [signIn, toggle] = useState(true);
    return(
        <>
        <section className="secao-header">
            <img src='/assets/images/logoTCC.png'/>
            <div className='secao-header-input-div'>
                <img src='/assets/images/lupa.svg'/>
                <input type='text' placeholder='Pesquisar eventos, shows, teatros, festas...'/>
            </div>
            <div className='secao-header-menu'>
                <div className='menu-select'>
                    <img src='/assets/images/local.svg'/>
                    <select>
                        <option>Escolha um local</option>
                        <option>Map-api</option>
                    </select>
                </div>
                <div className='menu-carrinho'>
                    <img src='/assets/images/carrinho.svg'/>
                    <span>0</span>
                </div>
                <a onClick={() => setShowModal(!showModal)}>Entrar</a>
            </div>

        </section>
        <Modal
            className="modal"
            overlayClassName="modal-overlay"
            closeTimeoutMS={500}
            isOpen={showModal}
        >
            <Components.Container>
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Crie sua conta</Components.Title>
                      <Components.Input type='text' placeholder='Nome' />
                      <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='email' placeholder='CPF' />
                      <Components.Input type='password' placeholder='Senha' />
                      <Components.Input type='password' placeholder='Confirme sua senha' />
                      <Components.Button>Entrar</Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form>
                       <Components.Title>Entrar</Components.Title>
                       <Components.Input type='email' placeholder='Email' />
                       <Components.Input type='password' placeholder='Senha' />
                       <Components.Anchor href='#'>Esqueceu sua senha?</Components.Anchor>
                       <Components.Button>Cadastre-se</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Title>Bem-vindo de volta!</Components.Title>
                      <Components.Paragraph>
                            Para se manter conectado conosco, entre com suas informações de login.
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Entrar
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>
                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Olá, amigo!</Components.Title>
                        <Components.Paragraph>
                            Entre com suas informações pessoais e comece sua jornada conosco.
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Cadastre-se
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
                  </Components.Overlay>
              </Components.OverlayContainer>
          </Components.Container>
        </Modal>
        </>
    );
}