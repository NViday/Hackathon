


//review_routes

let express = require('express');
var router = express.Router();
let auth_jwt_verify = require('../auth/auth_jwt')
const controller = require('../controllers/review_controller.js');

  

router.get('/search', auth_jwt_verify ,controller.reviews_search);
router.get('/', auth_jwt_verify ,controller.reviews_all);
router.get('/:id', auth_jwt_verify , controller.review_get);




module.exports = router;