import React from 'react';

const Mensaje = ({ msg }) => {
    // Extraemos las nuevas propiedades, incluyendo 'estaCargando'
    const { tipo, texto, esEstructurado, analisis, estaCargando } = msg;

    return (
        <div className={`mensaje mensaje--${tipo} ${estaCargando ? 'mensaje--cargando' : ''}`}>
            <div className="mensaje__avatar">
                {tipo === 'ia' ? '🤖' : '👤'}
            </div>

            <div className="mensaje__contenido">
                {tipo === 'usuario' ? (
                    <p className="mensaje__texto">{texto}</p>
                ) : (
                    <>
                        <h2 className="mensaje__header-ia">
                            {estaCargando ? 'IA pensando...' : 'Análisis del Experto'}
                        </h2>

                        {estaCargando ? (
                            /* 1. ESTADO DE CARGA: Puedes usar un spinner o puntos suspensivos */
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        ) : esEstructurado ? (
                            /* 2. RENDERIZADO ESTRUCTURADO (Coincide con el Hook) */
                            <div className="analisis-ia">
                                <div className="analisis-ia__seccion">
                                    <span className="analisis-ia__etiqueta">🎯 Rol Sugerido:</span>
                                    <h3 className="analisis-ia__rol">{analisis?.rol}</h3>
                                </div>

                                <div className="analisis-ia__seccion">
                                    <span className="analisis-ia__etiqueta">🛠️ Habilidades Clave:</span>
                                    <div className="analisis-ia__habilidades">
                                        {analisis?.habilidades?.map((skill, index) => (
                                            <span key={index} className="badge-skill">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="analisis-ia__seccion">
                                    <span className="analisis-ia__etiqueta">💡 Justificación:</span>
                                    <p className="analisis-ia__justificacion">
                                        {analisis?.justificacion}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* 3. FALLBACK: Para errores o mensajes de texto simple */
                            <p className="mensaje__texto">{texto}</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Mensaje;