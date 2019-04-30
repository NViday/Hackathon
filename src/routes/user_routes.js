
//user_routes

let express = require('express');
let router = express.Router();

let auth_jwt_verify = require('../auth/auth_jwt')

const user_controller = require('../controllers/user_controller.js');
const review_controller = require('..//controllers/review_controller')

//create an authorize function maybe checking token etc...


//routes
//router.post('/', user_controller.user_create);
router.get('/', auth_jwt_verify , user_controller.user_get);
router.post('/', auth_jwt_verify ,user_controller.user_update)
router.delete('/', auth_jwt_verify, user_controller.user_delete);

//reviews
router.post('/reviews', auth_jwt_verify, review_controller.review_create);
router.get('/reviews', auth_jwt_verify, review_controller.review_user_all);
router.post('/reviews/:reviewId', auth_jwt_verify, review_controller.review_update);
router.delete('/reviews/:reviewId', auth_jwt_verify, review_controller.review_delete);



module.exports = router;