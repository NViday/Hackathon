


//review_routes

let express = require('express');
var router = express.Router();
const controller = require('../controllers/review_controller.js');

  

router.get('/search',controller.reviews_search);
router.get('/',controller.reviews_all);

router.get('/:id', controller.review_get);




module.exports = router;