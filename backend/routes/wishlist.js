const express = require('express');
const router = express.Router();
const { db } = require('../conn');
const { ObjectId } = require('mongodb');


/* POST wish list packages id */
router.post('/:id',  async(req, res) => {

    console.log("serverhit");
    const id = req.params.id;
    const database = await db();
    console.log("serverhit");
    try {
      const packageDetails = await database.collection('PackageDetails').findOne({_id : ObjectId(id)}); 
      if (!packageDetails) {
        return res.status(404).json({ error: 'No such package found.' });
      }
      res.status(200).json(packageDetails)
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    } 
  })


module.exports = router