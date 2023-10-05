/*
    Event Routes
    /api/events
*/

const { Router } = require("express")
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {isDate} = require('../helpers/isDate')
//todas tienen que validar el JWT
const {validarJWT} = require('../middlewares/validar-jwt')
const {obtenerEvento, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events')

const router = Router();

router.use(validarJWT);

// obtener eventos

router.get('/', obtenerEvento)

// crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento)

//actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento)

//borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;