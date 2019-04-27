
//hospital_routes



let express = require('express');
var router = express.Router();
const hospital_controller = require('../controllers/hospital_controller.js');
const doctor_controller = require('../controllers/doctor_controller.js');


router.post('/',hospital_controller.hospital_create)
router.get('/', hospital_controller.hospitals_all)
router.get('/search', hospital_controller.hospitals_search);
  
router.get('/:id/doctors', doctor_controller.doctors_work_at);
router.get('/:id',hospital_controller.hospital_profile)
router.post('/:id',hospital_controller.hospital_profile_update)
router.delete('/:id',hospital_controller.hospital_profile_delete);


module.exports = router;