var express = require('express');
var router = express.Router();

/* GET contact us listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST contact us information */
router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET contact us information */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  res.send('respond with a resource ' + id);
});

module.exports = router;
