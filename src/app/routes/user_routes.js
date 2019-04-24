


//user_routes


//requirements 
module.exports = (app) => {

    const controller = require('../controllers/user_controller.js');

    // todoList Routes
  
    app.route('/reviews/:reviewId')
      .get(controller.review_get)
      .put(controller.review_update)
      .delete(controller.review_delete);
}