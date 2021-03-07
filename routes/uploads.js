/**
 * Route: api/uploads 
 **/

const { Router } = require('express');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { fileUpload, getImage } = require('../controllers/uploads');

const router = Router();

router.put('/:type/:id', jwtValidator, fileUpload);
router.get('/:type/:image', jwtValidator, getImage);

module.exports = router;