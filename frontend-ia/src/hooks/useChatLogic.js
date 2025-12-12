import { useState, useRef, useEffect, useCallback } from 'react';

// URL base configurada según tu archivo main.py y router v1
const API_URL = 'http://localhost:8000/v1/generate';

export const useChatLogic = () => {
  const [prompt, setPrompt] = useState('');
  // La conversación ahora almacenará objetos de código
  const [conversacion, setConversacion] = useState([]);
  const [cargando, setCargando] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    // Asegura que el scroll se realice solo si estamos en modo chat (con muchos mensajes)
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

    // 1. Agregar el mensaje del usuario
    setConversacion(prev => [...prev, { texto: preguntaUsuario, tipo: 'usuario' }]);

    // 2. Mensaje temporal de carga
    const ID_CARGA = 'cargando-' + Date.now();
    setConversacion(prev => [...prev, { 
      texto: 'Generando solución de software...', // Nuevo mensaje de carga
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

      // 'data' ahora es directamente el objeto SoftwareSolution JSON
      const data = await response.json(); 

      if (!response.ok) {
        // Manejo de errores HTTP (400, 422, 500). El error 422 vendrá aquí si persiste.
        throw new Error(data.detail || `Error ${response.status}: Falló la comunicación con el servidor.`);
      }

      /**
       * ✅ CORRECCIÓN CLAVE: Eliminamos el JSON.parse() doble.
       * 'data' ya contiene el objeto SoftwareSolution completo enviado por FastAPI.
       */
      const solucionRaw = data; 

      // Creamos el objeto de respuesta de la IA con la nueva estructura
      const respuestaIA = {
        tipo: 'ia',
        esEstructurado: true,
        solucion: {
          nombre: solucionRaw.proyecto_nombre,
          lenguaje: solucionRaw.lenguaje,
          framework: solucionRaw.framework,
          codigo: solucionRaw.codigo_principal,
          explicacion: solucionRaw.explicacion_tecnica,
          dependencias: solucionRaw.dependencias || [], // Usar array vacío si no existe
          archivos: solucionRaw.estructura_archivos || [],
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
        texto: `⚠️ Error: ${error.message}`
      };

      // Reemplaza el mensaje de carga con el error
      setConversacion(prev =>
        prev.map(msg => (msg.id === ID_CARGA ? mensajeError : msg))
      );
    } finally {
      setCargando(false);
    }
  };

  // Función para manejar las sugerencias (opcional, pero útil para la UI de Gemini)
  const seleccionarSugerencia = (sugerenciaTexto) => {
    // Al seleccionar una sugerencia (chip), lo establece como el prompt 
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