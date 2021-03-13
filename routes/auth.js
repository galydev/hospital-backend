/**
 * Route: api/login 
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { propiertiesvalidator } = require('../middlewares/propierties-validator');
const { login, loginGoogle } = require('../controllers/auth');

const router = Router();

router.post('/', 
    [
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        propiertiesvalidator
    ],
    login
);

router.post('/google', 
    [
        check('token', 'token google is required').not().isEmpty(),
        propiertiesvalidator
    ],
    loginGoogle
);

module.exports = router;