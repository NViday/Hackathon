


//review_routes

let express = require('express');
var router = express.Router();
const controller = require('../controllers/review_controller.js');

  
router.post('/users/:userId/reviews',controller.review_create);
router.put('/users/:userId/reviews/:reviewId', controller.review_update);
router.delete('/users/:userId/reviews/:reviewId', controller.review_delete);
router.get('/users/:userId/reviews',controller.review_user_all);

router.get('/doctors/:doctorId/reviews',controller.review_doctor_all);


router.get('/reviews',controller.reviews_search);
router.get('/reviews',controller.reviews_all);

router.get('reviews/:id', controller.review_get);




module.exports = router;