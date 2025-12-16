import React from 'react';
import Mensaje from './components/Mensaje';
import ChatInput from './components/ChatInput';
import Bienvenida from './components/Bienvenida';
import ChatFooter from './components/ChatFooter';

import { useChatLogic } from './hooks/useChatLogic';
import './App.css';

function App() {
  const {
    prompt,
    setPrompt,
    conversacion,
    cargando,
    chatEndRef,
    manejarEnvio,
  } = useChatLogic();

  // Estado para saber si mostramos la pantalla de inicio
  const isInitialState = conversacion.length === 0;

  return (
    <div className={`chat-layout ${isInitialState ? 'layout--welcome' : 'layout--active'}`}>

      {/* Pantalla de Bienvenida: Solo se muestra al inicio */}
      {isInitialState && <Bienvenida />}

      {/* Contenedor de la Conversación */}
      <div className="conversacion-container">
        {conversacion.map((msg, index) => (
          <Mensaje key={msg.id || index} msg={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Área de interacción (Input) */}
      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        manejarEnvio={manejarEnvio}
        cargando={cargando}
      />

      {/* Pie de página con identidad de marca */}
      <ChatFooter />

    </div>
  );
}

export default App;