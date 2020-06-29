const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

const { validationResult } = require('express-validator');

//Crea tareas
exports.crearTarea =  async (req, res) => { 

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()});
    }

    try {
          //Extraer el  proyecto
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //Revisar si el prooyecto pertence al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id.toString()){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Creatr la tarea
        const tarea = new Tarea(req.body);
        await tarea.save()

        res.json({tarea});
    }
    catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

//obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    //extraer el rpoyecto
    try {
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //Revisar si el prooyecto pertence al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id.toString()){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });

        res.json(tareas);

    }
    catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar tarea
exports.actualizarTarea = async(req,res) => {
    // //Revisar si hay errores
    // const errores = validationResult(req);
    // if( !errores.isEmpty() ) {
    //     return res.status(400).json({errores: errores.array()});
    // }
    // // Extraer la info del proyectpo
    // const {nombre} = req.body;
    // const nuevoProyecto = {};
    // if(nombre){
    //     nuevoProyecto.nombre = nombre;
    // }

    try {
        //REvisarque exista el proyecto
        const {proyecto, nombre, estado} = req.body;

        //Buscar la tarea
        let tarea = await Tarea.findById(req.params.id);
        
        if(!tarea){
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        //Extraer el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        
        //Revisar si el prooyecto pertence al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id.toString()){
            return res.status(401).json({msg: 'No autorizado'});
        }

        const nuevaTarea = {};
        
        if(nombre) {
            nuevaTarea.nombre = nombre;
        }
        if(estado) {
            nuevaTarea.estado = estado;
        }

        //Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new:true});

        res.json({tarea});
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//Eliminar una tarea
exports.eliminarTarea = async(req,res) => {
    try {
        //REvisarque exista el proyecto
        const {proyecto} = req.body;

        //Buscar la tarea
        let tarea = await Tarea.findById(req.params.id);
        
        if(!tarea){
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        //Extraer el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        
        //Revisar si el prooyecto pertence al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id.toString()){
            return res.status(401).json({msg: 'No autorizado'});
        }
        //Eliminar la tarea
        tarea = await Tarea.findOneAndRemove({_id: req.params.id});

        res.json({msg: "Tarea eliminada"});
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}