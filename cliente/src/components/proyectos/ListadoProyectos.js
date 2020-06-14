import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* 
import AlertaContext from '../../context/alertas/alertaContext';
 */

const ListadoProyectos = () => {


    // Extrar proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;
    
    // Obtener proyectos cuando carga el componente
    useEffect (() => {
        obtenerProyectos();
        //Eliminar advertencias
        // eslint-disable-next-line
    },[]);

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos comienza creando uno</p>;



   /*  
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
 */
  
   /*  useEffect(() => {
        // si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    
    if(proyectos.lengt h === 0 ) return <p>No hay proyectos, comienza creando uno</p>;
*/
    return ( 

        <ul className="listado-proyectos">
            <TransitionGroup>
        
            {/* alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  */}
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
   
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;