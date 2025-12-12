import React from 'react';
// Importamos los componentes actualizados
import Mensaje from './components/Mensaje';
import ChatInput from './components/ChatInput';
import Bienvenida from './components/Bienvenida'; // O WelcomeScreen según lo hayas nombrado
import ChatFooter from './components/ChatFooter';

// Importamos el hook de lógica que ya tiene el parseo de Pydantic
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
          /* IMPORTANTE: Pasamos el objeto 'msg' completo. 
             Esto incluye: tipo, texto, esEstructurado, analisis y estaCargando.
          */
          <Mensaje key={msg.id || index} msg={msg} />
        ))}

        {/* Referencia invisible para mantener el scroll al final automáticamente */}
        <div ref={chatEndRef} />
      </div>

      {/* 3. Área de interacción (Input) */}
      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        manejarEnvio={manejarEnvio}
        cargando={cargando}
      />

      {/* 4. Pie de página con identidad de marca */}
      <ChatFooter />

    </div>
  );
}

export default App;