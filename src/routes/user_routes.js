
//user_routes

let express = require('express');
let router = express.Router();

const controller = require('../controllers/user_controller.js');

//routes
router.post('/users', controller.user_create);
router.get('/users/:id', controller.user_get);
router.post('/users/:id', controller.user_update)
router.delete('/users/:id',controller.user_delete);


module.exports = router;