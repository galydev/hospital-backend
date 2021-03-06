/**
 * Route: api/users 
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { propiertiesvalidator } = require('../middlewares/propierties-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/', jwtValidator, getUsers);

router.post('/', 
    [
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        propiertiesvalidator
    ],
    createUser);

router.put('/:id', 
    [
        jwtValidator,
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('role', 'role is required').not().isEmpty(),
        propiertiesvalidator
    ],
    updateUser);

router.delete('/:id', jwtValidator, deleteUser);

module.exports = router;