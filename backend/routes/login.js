var express = require('express');
var router = express.Router();

router.post('/login', function(req,res,next)  {

res.send('Respond with details');
});

router.get('/signup/:id', function(req,res,next)  {
    
res.send('Respond with details');
});

module.exports = router;