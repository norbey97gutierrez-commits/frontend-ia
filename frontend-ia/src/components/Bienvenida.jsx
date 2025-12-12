import React from 'react';

const WelcomeScreen = () => (
    <div className="welcome-screen">
        <div className="welcome-screen__title">
            <h2>Asistente de desarrollo de Software</h2>
        </div>

        <p className="welcome-screen__description">
            Analizo tu perfil técnico para sugerirte <strong>roles ideales</strong>,
            <strong> habilidades clave</strong> y una <strong>justificación profesional</strong> basada en arquitectura moderna.
        </p>
    </div>
);

export default WelcomeScreen;