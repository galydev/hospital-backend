/**
 * Route: api/doctors 
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { propiertiesvalidator } = require('../middlewares/propierties-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');

const router = Router();
router.get('/', jwtValidator, getDoctors);

router.post('/', 
    [
        jwtValidator,
        check('name', 'name is required').not().isEmpty(),
        check('hospital', 'hospital is required').not().isEmpty(),
        propiertiesvalidator
    ],
    createDoctor);

router.put('/:id', 
    [
        jwtValidator,
        check('name', 'name is required').not().isEmpty(),
        check('user', 'user is required').not().isEmpty(),
        propiertiesvalidator
    ],
    updateDoctor);

router.delete('/:id', jwtValidator, deleteDoctor);


module.exports = router;