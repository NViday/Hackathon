
//hospital_routes



let express = require('express');
var router = express.Router();
let auth_jwt_verify = require('../auth/auth_jwt')
const hospital_controller = require('../controllers/hospital_controller.js');
const doctor_controller = require('../controllers/doctor_controller.js');


router.post('/', auth_jwt_verify ,hospital_controller.hospital_create)
router.get('/', auth_jwt_verify ,hospital_controller.hospitals_all)
router.get('/search', auth_jwt_verify ,hospital_controller.hospitals_search);
  
router.get('/:id/doctors', auth_jwt_verify ,doctor_controller.doctors_work_at);
router.get('/:id', auth_jwt_verify ,hospital_controller.hospital_profile)
router.post('/:id', auth_jwt_verify ,hospital_controller.hospital_profile_update)
router.delete('/:id', auth_jwt_verify ,hospital_controller.hospital_profile_delete);


module.exports = router;