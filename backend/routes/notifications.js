var express = require('express');
var router = express.Router();
const { db } = require('../conn');
const { ObjectId } = require('mongodb');
const collection = 'notifications';

// Notification model
/*{
    id: 1,
    userId: 1,
    title: "Notification 1",
    description: "This is notification 1",
    date: "2020-01-01",
    time: "12:00",
    payload: {
        type: "event",
        url: "https://www.google.com"
    }
}*/

// Post notification to database
router.post('/', async function (req, res, next) {
    const { userId, title, description, payload } = req.body;

    if (!userId || !title || !description || !payload) {
        res.status(400).send("Missing required fields");
        return;
    }

    const date = new Date();
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = date.toISOString().split('T')[1].split('.')[0];

    const notification = {
        title,
        description,
        date: dateStr,
        time: timeStr,
        payload
    };

    const database = await db();
    await database.collection(collection).insertOne(notification);

    res.status(200).send("Notification added successfully");
});

// Get all notifications from database
router.get('/', async function (req, res, next) {
    const database = await db();
    const notifications = await database.collection(collection).find({}).toArray();

    res.status(200).send(notifications);
});

// Get notification by id from database
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;

    if (!id) {
        res.status(400).send("Missing required fields");
        return;
    }

    const database = await db();
    const notification = await database.collection(collection).findOne({ _id: ObjectId(id) });

    res.status(200).send(notification);
});

module.exports = router;
