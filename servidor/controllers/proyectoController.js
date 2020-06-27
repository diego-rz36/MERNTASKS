const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto =  async (req, res) => { 

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar el creador por JWT
        proyecto.creador = req.usuario.id;

        //Guardar proyecto
        proyecto.save();
        res.json(proyecto);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

//Obtiene todos los proyectops del usuario actual
exports.obtenerProyectos = async (req,res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id}).sort({creado: -1});
        res.json({proyectos});
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar un proyecto
exports.actualizarProyecto = async(req,res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()});
    }
    // Extraer la info del proyectpo
    const {nombre} = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //REvisarque exista el proyecto
        //console.log(req.params.id);
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id.toString()){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Actualizar el proyecto
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto}, { new : true});

        res.json({proyecto});
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Eliminar un proyecto
exports.eliminarProyecto = async(req,res) => {
    
    try {
        //REvisarque exista el proyecto
        //console.log(req.params.id);
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id.toString()){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id});        

        res.json({msg: 'Proyecto eliminado'});
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}