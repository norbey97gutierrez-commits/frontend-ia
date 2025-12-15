# 💻 Frontend | Asistente de Arquitecto y Desarrollador de Software

Interfaz de usuario construida con **React** y **Vite** para interactuar con el Asistente de IA. El diseño está optimizado para una experiencia de chat moderna (estilo oscuro) y para la visualización estructurada de soluciones técnicas.

## 🚀 Tecnologías Principales

* **React** (Vite)
* **JavaScript (JSX)**
* **CSS / Variables CSS** 
* **Librerías Clave:**
    * `react-markdown`: Para renderizar explicaciones con formato (negritas, listas, etc.).
    * `react-syntax-highlighter`: Para mostrar el código fuente con resaltado de sintaxis (`vsDark` style).

## ✨ Características de la Interfaz

* **Diseño Dark Mode:** Paleta de colores oscura, siguiendo un estilo profesional y limpio.
* **Centrado Inteligente:** La pantalla de bienvenida se centra verticalmente en la vista para una mejor experiencia de inicio.
* **Visualización Estructurada:** Renderiza respuestas complejas de la IA en un formato tipo tarjeta de solución de software, incluyendo:
    * Título del proyecto y lenguaje.
    * Explicación de la lógica (en Markdown).
    * Bloque de código con resaltado de sintaxis.
    * Badges para dependencias o habilidades requeridas.
* **Gestión de Estado:** Manejo visual del estado de carga (`typing-indicator`) mientras la IA procesa la respuesta.

## 📁 Estructura del Proyecto

* **src/**
    * assets/
        * (Imágenes, íconos o recursos estáticos)
    * **components/**
        * Bienvenida.jsx: Pantalla inicial, título y sugerencias.
        * ChatFooter.jsx: Pie de página con el disclaimer legal.
        * ChatInput.jsx: Componente flotante para la entrada de texto.
        * Mensaje.jsx: Renderiza mensajes y soluciones estructuradas (Markdown/Code).
    * **hooks/**
        * useChatLogic.js: Lógica central: estado de mensajes, comunicación con la API.
    * App.css: Estilos globales y variables CSS.
    * App.jsx: Componente raíz y control del layout.
    * index.css: Estilos base y reseteo.
    * main.jsx: Punto de entrada de la aplicación.
* node_modules/
* package.json
* vite.config.js
* README.md

## ⚙️ Configuración y Ejecución

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto configurado por Vite).