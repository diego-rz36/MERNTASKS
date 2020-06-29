const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea tareas
// api/tareas
router.post('/',     
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//Obtener tareas por proyectos
router.get('/', 
    auth,
    tareaController.obtenerTareas
);

// //Actualizar tarea
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre de la  es obligatorio').not().isEmpty()
    ],
    tareaController.actualizarTarea
);

//Eliminar tarea por ID
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);
module.exports = router;