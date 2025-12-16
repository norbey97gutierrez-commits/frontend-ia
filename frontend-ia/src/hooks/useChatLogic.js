import { useState, useRef, useEffect, useCallback } from 'react';

// URL de comunicacion con el backend
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

  // Función para manejar el envío de la consulta
  const manejarEnvio = async (e) => {
    e.preventDefault();
    const preguntaUsuario = prompt.trim();

    if (!preguntaUsuario || cargando) return;

    setCargando(true);
    setPrompt('');

    // Agreganos el mensaje del usuario
    setConversacion(prev => [...prev, { texto: preguntaUsuario, tipo: 'usuario' }]);

    // Mensaje temporal de carga
    const ID_CARGA = 'cargando-' + Date.now();
    setConversacion(prev => [...prev, { 
      texto: 'Generando solución de software...',
      tipo: 'ia', 
      id: ID_CARGA,
      estaCargando: true 
    }]);

    try {
      // Solicitud POST al backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: preguntaUsuario }), 
      });

      // 'data' es directamente el objeto SoftwareSolution JSON
      const data = await response.json(); 

      if (!response.ok) {
        // Manejo de errores HTTP (400, 422, 500).
        throw new Error(data.detail || `Error ${response.status}: Falló la comunicación con el servidor.`);
      }

      const solucionRaw = data; 

      // Creamos el objeto de respuesta de la IA
      const respuestaIA = {
        tipo: 'ia',
        esEstructurado: true,
        solucion: {
          // Mapeamos a las claves finales del modelo Pydantic
          nombre: solucionRaw.nombre,
          lenguaje: solucionRaw.lenguaje,
          framework: solucionRaw.framework,
          codigo: solucionRaw.codigo,
          explicacion: solucionRaw.explicacion,
          dependencias: solucionRaw.dependencias || [],
          archivos: solucionRaw.archivos || [],
        }
      };

      // Reemplazomos el mensaje de carga por la respuesta real
      setConversacion(prev =>
        prev.map(msg => (msg.id === ID_CARGA ? respuestaIA : msg))
      );

    } catch (error) {
      console.error('Error en el asistente:', error);
      
      const mensajeError = {
        tipo: 'ia',
        esEstructurado: false,
        texto: `⚠️ Error: ${error.message}`
      };

      // Reemplazamos el mensaje de carga con el error
      setConversacion(prev =>
        prev.map(msg => (msg.id === ID_CARGA ? mensajeError : msg))
      );
    } finally {
      setCargando(false);
    }
  };

  const seleccionarSugerencia = (sugerenciaTexto) => {
    setPrompt(sugerenciaTexto);
  };

  return {
    prompt,
    setPrompt,
    conversacion,
    cargando,
    chatEndRef,
    manejarEnvio,
    seleccionarSugerencia, 
  };
};