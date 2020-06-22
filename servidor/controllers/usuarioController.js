const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()});
    }
    //extraer email y password
    const {email, password} = req.body;
    
    try {
        //Revisar que el usaurio registrado sea unico
        let usuario = await Usuario.findOne({email});
        if(usuario) {
            res.status(400).json({msg: 'El usuario ya existe'});
        }

        //crea un nuevo Usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);

        //guardar el usuario
        await usuario.save();

        //Mensaje de confirmacion
        res.json({msg: 'Usaurio creado correctamente'});
    } catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}