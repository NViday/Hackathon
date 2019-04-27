//disease_routes

let express = require('express');
var router = express.Router();
const disease_controller = require('../controllers/disease_controller.js');


    
router.get('/',disease_controller.diseases_all);
router.get('/search',disease_controller.diseases_search)
  
router.get('/:id', disease_controller.disease_get);
router.delete('/:id', disease_controller.disease_delete);
router.post('/:id',disease_controller.disease_update);

module.exports = router;