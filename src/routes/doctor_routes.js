

//doctor_routes

let express = require('express');
var router = express.Router();
let auth_jwt_verify = require('../auth/auth_jwt')
const review_controller = require('../controllers/review_controller.js');
const doctor_controller = require('../controllers/doctor_controller.js');


    
router.get('/', auth_jwt_verify ,doctor_controller.doctors_all);
router.get('/search', auth_jwt_verify ,doctor_controller.doctors_search);
//router.get('/search/:hospitalId', doctor_controller.doctors_work_at);

router.get('/:id/reviews', auth_jwt_verify ,review_controller.reviews_doctor_all);
  
router.get('/:id', auth_jwt_verify ,doctor_controller.doctor_profile);
router.delete('/:id', auth_jwt_verify , doctor_controller.doctor_profile_delete);
router.post('/:id', auth_jwt_verify ,doctor_controller.doctor_profile_update);

module.exports = router;