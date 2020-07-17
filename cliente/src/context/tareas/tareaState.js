import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear Funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            console.log(resultado.data);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
                //payload: resultado.data.tareas
            });
        } catch(error){
            console.log(error);
        }
    }

    //Agregar tare aproyectp seleccionado
    const agregarTarea = async tarea => {        
       try {
           const resultado = await clienteAxios.post('/api/tareas', tarea);
           console.log(resultado);

           dispatch({
               type: AGREGAR_TAREA,
               payload: tarea
           });
       } catch(error){
           console.log(error);
       }
    }

    //Valida y muestra error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    //ELiminar tarea por ID
    const eliminarTarea = async (id,proyecto) => {
        try {
            const resultado = await clienteAxios.delete(`/api/tareas/${id}`, { params: {proyecto} });
            
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch(error){
            console.log(error);
        }
        
    }
    //Cambia el estado de la tarea
    // const cambiarEstadoTarea = tarea => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     });
    // }
    //Estrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    //Editar o modificar una tarea
    const actualizarTarea = async tarea => {
        try {            
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch(error){
            console.log(error);
        }
        
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
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                //cambiarEstadoTarea,
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