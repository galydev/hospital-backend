/**
 * Route: api/login 
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { propiertiesvalidator } = require('../middlewares/propierties-validator');
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validator');

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

router.get('/renew', 
   jwtValidator,
   renewToken
);

module.exports = router;