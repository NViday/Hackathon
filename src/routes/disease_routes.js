//disease_routes

let express = require('express');
var router = express.Router();
let auth_jwt_verify = require('../auth/auth_jwt')
const disease_controller = require('../controllers/disease_controller.js');


    
router.get('/', auth_jwt_verify , disease_controller.diseases_all);
router.get('/search' , auth_jwt_verify ,disease_controller.diseases_search)
  
router.get('/:id', auth_jwt_verify , disease_controller.disease_get);
router.delete('/:id', auth_jwt_verify , disease_controller.disease_delete);
router.post('/:id', auth_jwt_verify ,disease_controller.disease_update);

module.exports = router;