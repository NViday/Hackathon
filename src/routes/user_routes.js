
//user_routes

let express = require('express');
let router = express.Router();

let auth_jwt_verify = require('../auth/auth_jwt')

const user_controller = require('../controllers/user_controller.js');
const review_controller = require('..//controllers/review_controller')

//create an authorize function maybe checking token etc...


//routes
//router.post('/', user_controller.user_create);
router.get('/:id', auth_jwt_verify , user_controller.user_get);
router.post('/:id', auth_jwt_verify ,user_controller.user_update)
router.delete('/:id', auth_jwt_verify, user_controller.user_delete);

//reviews
router.post('/:id/reviews', auth_jwt_verify, review_controller.review_create);
router.get('/:id/reviews', auth_jwt_verify, review_controller.review_user_all);
router.post('/:userId/reviews/:reviewId', auth_jwt_verify, review_controller.review_update);
router.delete('/:userId/reviews/:reviewId', auth_jwt_verify, review_controller.review_delete);



module.exports = router;