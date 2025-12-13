import React from 'react';

const WelcomeScreen = ({ seleccionarSugerencia }) => ( // Añadimos prop opcional si tienes sugerencias
    <div className="welcome-screen">
        <div className="welcome-screen__title">
            <h2>AI Arquitecto y desarrollador de software</h2>
        </div>

        <p className="welcome-screen__description">
            Soy tu Arquitecto de Software Senior y Desarrollador Full-Stack Experto.
            Mi misión es resolver cualquier requerimiento técnico generando...
        </p>
    </div>
);

export default WelcomeScreen;