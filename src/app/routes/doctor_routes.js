

//doctor_routes


module.exports = (app) => {

    const controller = require('../controllers/doctor_controller.js');

    // todoList Routes
    app.route('/hospitals')
      .get(controller.doctors_all)
      .get(controller.doctors_search)
      .get(controller.doctors_work_at);
  
  
    app.route('/hospitals/:hospitalId')
      .delete(controller.doctor_profile_delete)
      .update(controller.doctor_profile_update)
      .get(controller.doctor_profile);
}

