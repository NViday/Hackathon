

//doctor_routes

let express = require('express');
var router = express.Router();
const review_controller = require('../controllers/review_controller.js');
const doctor_controller = require('../controllers/doctor_controller.js');


    
router.get('/',doctor_controller.doctors_all);
router.get('/search',doctor_controller.doctors_search)
//router.get('/search/:hospitalId', doctor_controller.doctors_work_at);

router.get('/:id/reviews', review_controller.review_doctor_all);
  
router.get('/:id', doctor_controller.doctor_profile);
router.delete('/:id', doctor_controller.doctor_profile_delete);
router.update('/:id',doctor_controller.doctor_profile_update);

module.exports = router;