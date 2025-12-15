import React from 'react';

const ChatFooter = () => {
    const anioActual = new Date().getFullYear();

    return (
        <footer className="footer-ia">
            <div className="footer-ia__content">
                <p className="footer-disclaimer">
                    El asistente de IA puede cometer errores. Verifica la información técnica.
                </p>
                <p className="footer-copyright">
                    &copy; {anioActual} <strong>Asistente de Desarrollo de Software</strong> — v1.0.0
                </p>
            </div>
        </footer>
    );
};

export default ChatFooter;