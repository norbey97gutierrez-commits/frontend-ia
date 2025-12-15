import React from 'react';
// Importamos el Resaltador de Sintaxis
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as styles from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';


// El componente recibe 'msg' como prop
const Mensaje = ({ msg }) => {
    if (!msg) return null;

    const { tipo, texto, esEstructurado, solucion, estaCargando } = msg;

    const renderContenidoIA = () => {
        if (estaCargando) {
            /* 1. ESTADO DE CARGA */
            return (
                <div className="typing-indicator">
                    <span style={{ backgroundColor: '#fff' }}></span>
                    <span style={{ backgroundColor: '#fff' }}></span>
                    <span style={{ backgroundColor: '#fff' }}></span>
                </div>
            );
        }

        if (esEstructurado && solucion) {
            /* RENDERIZADO ESTRUCTURADO (Software Solution) */
            return (
                <div className="solucion-ia">
                    <div className="solucion-ia__header">
                        <h3 className="solucion-ia__titulo-proyecto">
                            🛠️ {solucion.nombre} (Lenguaje: {solucion.lenguaje}{solucion.framework && `, Framework: ${solucion.framework}`})
                        </h3>
                    </div>

                    {/* Explicación y Lógica */}
                    <div className="solucion-ia__seccion">
                        <h4 className="solucion-ia__subtitulo">Lógica y Arquitectura</h4>
                        <div className="solucion-ia__explicacion">
                            <ReactMarkdown>
                                {solucion.explicacion || ''}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Código Fuente */}
                    <div className="solucion-ia__seccion">
                        <h4 className="solucion-ia__subtitulo">Código Principal ({solucion.lenguaje})</h4>
                        <div className="solucion-ia__codigo-wrapper">
                            <SyntaxHighlighter
                                language={solucion.lenguaje?.toLowerCase() || 'text'}
                                style={styles.vsDark}
                                customStyle={{
                                    borderRadius: '8px',
                                    padding: '1em',
                                    fontSize: '0.9em',
                                    backgroundColor: '#1f1f1f',
                                    border: '1px solid #3c4043'
                                }}
                            >
                                {solucion.codigo || '// No se generó código.'}
                            </SyntaxHighlighter>
                        </div>
                    </div>

                    {/* Estructura de Archivos y Dependencias */}
                    {/* Verificamos si hay data antes de renderizar la sección */}
                    {(solucion.archivos?.length > 0 || solucion.dependencias?.length > 0) && (
                        <div className="solucion-ia__seccion solucion-ia__extras">
                            <h4 className="solucion-ia__subtitulo">Requisitos</h4>
                            {solucion.archivos?.length > 0 && (
                                <p><strong>Archivos:</strong> {solucion.archivos.join(', ')}</p>
                            )}
                            {solucion.dependencias?.length > 0 && (
                                <p>
                                    <strong>Dependencias:</strong>
                                    {solucion.dependencias.map((dep, index) => (
                                        <span key={index} className="badge-skill">
                                            {dep}
                                        </span>
                                    ))}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        /* FALLBACK: Para errores o mensajes de texto simple */
        return <p className="mensaje__texto">{texto}</p>;
    };


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
                            {estaCargando ? 'Generando Solución...' : 'Respuesta'}
                        </h2>
                        {renderContenidoIA()}
                    </>
                )}
            </div>
        </div>
    );
};

export default Mensaje;