import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import uuid from 'uuid';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas: [                
                {id: 1, nombre:'tarea2', estado: false, proyectoId: 3},
                {id: 2, nombre:'tarea3', estado: true, proyectoId: 4},
                {id: 3, nombre:'tarea4', estado: false, proyectoId: 1},
                {id: 4, nombre:'tarea5', estado: false, proyectoId: 2},
                {id: 5, nombre:'tarea6', estado: true, proyectoId: 4},
                {id: 6, nombre:'tarea7', estado: false, proyectoId: 2},
                {id: 7, nombre:'tarea4', estado: false, proyectoId: 3},
                {id: 8, nombre:'tarea5', estado: false, proyectoId: 3},
                {id: 9, nombre:'tarea666', estado: true, proyectoId: 4},
                {id: 10, nombre:'tarea7', estado: false, proyectoId: 1},
                {id: 11, nombre:'tarea1', estado: true, proyectoId: 1}
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear Funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    }

    //Agregar tare aproyectp seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuid.v4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    }

    //Valida y muestra error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    //ELiminar tarea por ID
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        });
    }
    //Cambia el estado de la tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    }
    //Estrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    //Editar o modificar una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        });
    }

    //Limpiar la tarea seleciionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        });
    }
    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;