import { useState, useRef, useEffect, useCallback } from 'react';

// URL base configurada según tu archivo main.py y router v1
const API_URL = 'http://localhost:8000/v1/generate';

export const useChatLogic = () => {
  const [prompt, setPrompt] = useState('');
  const [conversacion, setConversacion] = useState([]);
  const [cargando, setCargando] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversacion, scrollToBottom]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const preguntaUsuario = prompt.trim();

    if (!preguntaUsuario || cargando) return;

    setCargando(true);
    setPrompt('');

    // 1. Agregamos el mensaje del usuario al historial
    setConversacion(prev => [...prev, { texto: preguntaUsuario, tipo: 'usuario' }]);

    // 2. Mensaje temporal con ID único para ser reemplazado luego
    const ID_CARGA = 'cargando-' + Date.now();
    setConversacion(prev => [...prev, { 
      texto: 'Analizando perfil técnico...', 
      tipo: 'ia', 
      id: ID_CARGA,
      estaCargando: true 
    }]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: preguntaUsuario }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Capturamos el error estructurado de FastAPI (raise HTTPException)
        throw new Error(data.detail || `Error ${response.status}`);
      }

      /**
       * 3. PARSEO DEL CONTENIDO ESTRUCTURADO
       * Tu backend envía 'respuesta_generada' como string debido a json.dumps()
       */
      const analisisRaw = JSON.parse(data.respuesta_generada);

      const respuestaIA = {
        tipo: 'ia',
        esEstructurado: true,
        // Aseguramos que los campos coincidan con tu SoftwareDevAnalysis de Pydantic
        analisis: {
          rol: analisisRaw.rol_sugerido,
          habilidades: analisisRaw.habilidades_clave,
          justificacion: analisisRaw.justificacion_rol
        }
      };

      // 4. Reemplazo atómico del mensaje de carga por la respuesta real
      setConversacion(prev =>
        prev.map(msg => (msg.id === ID_CARGA ? respuestaIA : msg))
      );

    } catch (error) {
      console.error('Error en el asistente:', error);
      
      const mensajeError = {
        tipo: 'ia',
        esEstructurado: false,
        texto: `⚠️ ${error.message}`
      };

      setConversacion(prev =>
        prev.map(msg => (msg.id === ID_CARGA ? mensajeError : msg))
      );
    } finally {
      setCargando(false);
    }
  };

  return {
    prompt,
    setPrompt,
    conversacion,
    cargando,
    chatEndRef,
    manejarEnvio,
  };
};