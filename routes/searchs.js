/**
 * Route: api/todo 
 **/

const { Router } = require('express');
const { check } = require('express-validator');
const { propiertiesvalidator } = require('../middlewares/propierties-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getTodo, getCollectionDocuments } = require('../controllers/searchs');

const router = Router();

router.get('/:search', jwtValidator, getTodo);
router.get('/collection/:table/:search', jwtValidator, getCollectionDocuments);

module.exports = router;