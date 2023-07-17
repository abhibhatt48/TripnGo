var express = require('express');
var router = express.Router();

router.post('/signup', function(req,res,next)  {
res.send('Respond with details');
});



module.exports = router;