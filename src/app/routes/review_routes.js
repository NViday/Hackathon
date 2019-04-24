


//review_routes

module.exports = (app) => {

    const controller = require('../controllers/review_controller.js');

    // todoList Routes
    app.route('/reviews')
      .get(controller.review_create)
      .get(controller.reviews_search)
      .post(controller.reviews_all);
  
  
    app.route('/reviews/:reviewId')
      .get(controller.review_get)
      .put(controller.review_update)
      .delete(controller.review_delete);
}