//homepage.js

let express = require('express');
var router = express.Router();

//homepage
router.get('/', function(req, res, next) 
{
    res.send( 'ALife is running');
}
);

module.exports = router;