
//user_routes

let express = require('express');
let router = express.Router();

const user_controller = require('../controllers/user_controller.js');
const review_controller = require('..//controllers/review_controller')

//create an authorize function maybe checking token etc...


//routes
router.post('/', user_controller.user_create);
router.get('/:id', user_controller.user_get);
router.post('/:id', user_controller.user_update)
router.delete('/:id',user_controller.user_delete);

//reviews
router.post('/:id/reviews',review_controller.review_create);
router.get('/:id/reviews',review_controller.review_user_all);
router.put('/:userId/reviews/:reviewId', review_controller.review_update);
router.delete('/:userId/reviews/:reviewId', review_controller.review_delete);



module.exports = router;