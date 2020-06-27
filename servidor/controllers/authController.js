const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()});
    }
    //extraer email y password
    const {email, password} = req.body;
    
    try {
       //Revisar que sea un usaurio registrado
       let usuario = await Usuario.findOne({email});
       if(!usuario){
            res.status(400).json({msg: 'El usuario no existe'});
       }
       //Revisar su password
       const PassCorrecto = await bcryptjs.compare(password,usuario.password);
       if(!PassCorrecto){
            res.status(400).json({msg: 'Password incorrecto'});
       }

       //Si todo es correcto  Crear y firmar el jsonwebtoken
       const payload = {
        usuario:{
            id: usuario.id
        }
        };
        //Firmar el JWT
        jwt.sign(payload,process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error,token) => {
            if(error) throw error;
            
            //Mensaje de confirmacion
            res.json({ token });
        })
    
    } catch(error){
        console.log(error);
        //res.status(400).send('Hubo un error');
    }
}