/**
 * Route: api/hospitals 
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { propiertiesvalidator } = require('../middlewares/propierties-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

const router = Router();
router.get('/', jwtValidator, getHospitals);

router.post('/', 
    [
        jwtValidator,
        check('name', 'name is required').not().isEmpty(),
        propiertiesvalidator
    ],
    createHospital);

router.put('/:id', 
    [
        jwtValidator,
        check('name', 'name is required').not().isEmpty(),
        propiertiesvalidator
    ],
    updateHospital);

router.delete('/:id', jwtValidator, deleteHospital);


module.exports = router;