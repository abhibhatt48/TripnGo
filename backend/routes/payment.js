var express = require('express');
var router = express.Router();

/* POST contact us information */
router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* PUT contact us information */
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  res.send('respond with a resource ' + id);
});

/* GET contact us information */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  res.send('respond with a resource ' + id);
});

module.exports = router;

