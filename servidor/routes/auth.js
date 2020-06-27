//Rutas para autenticar usaurios

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');


// api/auth
router.post('/', 
    [
        check('email','Agrega un email Valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    authController.autenticarUsuario
);

module.exports = router;