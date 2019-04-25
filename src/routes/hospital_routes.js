


//hospital_routes

module.exports = (app) => {

    const controller = require('../controllers/hospital_controller.js');

    // todoList Routes
    app.route('/hospitals')
      .get(controller.hospital_create)
      .get(controller.hospitals_all)
      .post(controller.hospitals_search);
  
  
    app.route('/hospitals/:_id')
      .get(controller.hospital_profile)
      .put(controller.hospital_profile_update)
      .delete(controller.hospital_profile_delete);
}