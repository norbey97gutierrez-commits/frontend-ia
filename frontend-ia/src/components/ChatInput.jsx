import React from 'react';

const ChatInput = ({ prompt, setPrompt, manejarEnvio, cargando }) => {

    // Mejora de UX: Enviar con "Enter" (y Shift+Enter para nueva línea)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            manejarEnvio(e);
        }
    };

    return (
        <div className="input-wrapper">
            <form onSubmit={manejarEnvio} className="input-form">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown} // Añadimos el listener de teclado
                    placeholder="Describe tu perfil o intereses técnicos..."
                    rows="1"
                    disabled={cargando}
                    className="input-form__textarea"
                />
                <button
                    type="submit"
                    disabled={cargando || !prompt.trim()} // No enviar si está vacío
                    className={`input-form__button ${cargando ? 'input-form__button--loading' : ''}`}
                    aria-label="Enviar consulta"
                >
                    {cargando ? (
                        <span className="spinner-icon">⌛</span>
                    ) : (
                        '↑'
                    )}
                </button>
            </form>
            <p className="input-footer">
                El asistente de IA puede cometer errores. Verifica la información técnica.
            </p>
        </div>
    );
};

export default ChatInput;