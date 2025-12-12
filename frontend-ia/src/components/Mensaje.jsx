import React from 'react';
// 1. Importamos el Resaltador de Sintaxis
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 2. Importamos un tema oscuro, por ejemplo, vs-dark (popular en VS Code)
import { vsDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// 3. Importamos el componente de Markdown para la explicación
import ReactMarkdown from 'react-markdown';


// Nota: El hook ahora envía 'solucion' en lugar de 'analisis'.
// También estamos utilizando la clase 'solucion' para evitar conflictos.
const Mensaje = ({ msg }) => {
    // ✅ CAMBIO CLAVE: Extraemos 'solucion' en lugar de 'analisis'
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
            /* 2. RENDERIZADO ESTRUCTURADO (Software Solution) */
            return (
                <div className="solucion-ia">
                    {/* ENCABEZADO: Proyecto y Tecnología */}
                    <div className="solucion-ia__header">
                        <h3 className="solucion-ia__titulo-proyecto">
                            {/* Mostramos el lenguaje y nombre del proyecto */}
                            🛠️ {solucion.nombre} (Lenguaje: {solucion.lenguaje}{solucion.framework && `, Framework: ${solucion.framework}`})
                        </h3>
                    </div>

                    {/* SECCIÓN 1: Explicación y Lógica */}
                    <div className="solucion-ia__seccion">
                        <h4 className="solucion-ia__subtitulo">💡 Lógica y Arquitectura</h4>
                        {/* Usamos Markdown para formatear negritas o listas en la explicación */}
                        <ReactMarkdown className="solucion-ia__explicacion">
                            {solucion.explicacion}
                        </ReactMarkdown>
                    </div>

                    {/* SECCIÓN 2: Código Fuente */}
                    <div className="solucion-ia__seccion">
                        <h4 className="solucion-ia__subtitulo">💾 Código Principal ({solucion.lenguaje})</h4>
                        <div className="solucion-ia__codigo-wrapper">
                            {/* Usamos el Resaltador de Sintaxis */}
                            <SyntaxHighlighter
                                language={solucion.lenguaje?.toLowerCase()} // El idioma debe ser minúsculas (ej: python, javascript)
                                style={vsDark}
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

                    {/* SECCIÓN 3: Estructura de Archivos y Dependencias */}
                    {(solucion.archivos?.length > 0 || solucion.dependencias?.length > 0) && (
                        <div className="solucion-ia__seccion solucion-ia__extras">
                            <h4 className="solucion-ia__subtitulo">🗂️ Requisitos</h4>
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

        /* 3. FALLBACK: Para errores o mensajes de texto simple */
        return <p className="mensaje__texto">{texto}</p>;
    };


    return (
        // Los estilos CSS para .analisis-ia ahora deben llamarse .solucion-ia
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
                            {estaCargando ? '💻 Generando Solución...' : 'Respuesta del Arquitecto IA'}
                        </h2>
                        {renderContenidoIA()}
                    </>
                )}
            </div>
        </div>
    );
};

export default Mensaje;