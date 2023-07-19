// server.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/profile_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a profile schema
const profileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  dateOfBirth: Date,
  city: String,
  bio: String,
  street: String,
  addressCity: String,
  state: String,
  country: String,
  email: String,
  phone: String,
  profileImage: String,
});

// Create a profile model
const Profile = mongoose.model("Profile", profileSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
app.get("/api/profile", (req, res) => {
  // Fetch the profile data from the database
  Profile.findOne({}, (err, profile) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(profile);
    }
  });
});

app.post("/api/profile", (req, res) => {
  const data = req.body;

  // Update the profile data in the database
  Profile.findOneAndUpdate({}, data, { new: true, upsert: true }, (err, profile) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(profile);
    }
  });
});

module.exports = router;
