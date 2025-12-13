import React from 'react';

const ChatInput = ({ prompt, setPrompt, manejarEnvio, cargando }) => {
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
                    onKeyDown={handleKeyDown}
                    placeholder="Hazme una pregunta..."
                    rows="1"
                    disabled={cargando}
                />
                <button
                    type="submit"
                    disabled={cargando || !prompt.trim()}
                >
                    {cargando ? '...' : '↑'}
                </button>
            </form>
        </div>
    );
};

export default ChatInput;