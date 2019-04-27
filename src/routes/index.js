
//index.js

let express = require('express');
var router = express.Router();

router.get('/', (req,res)=>
{
    logger.info('we are live');
    res.json({'message' : 'Api is alive'});
});


module.exports = router;