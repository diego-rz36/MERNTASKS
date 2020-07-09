//Rutas para autenticar usaurios

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//Iniciar Sesion
// api/auth
router.post('/', 
   
    authController.autenticarUsuario
);
//Ontiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);
module.exports = router;