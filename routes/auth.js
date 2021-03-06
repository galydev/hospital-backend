/**
 * Route: api/login 
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { propiertiesvalidator } = require('../middlewares/propierties-validator');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/', 
    [
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        propiertiesvalidator
    ],
    login
);

module.exports = router;