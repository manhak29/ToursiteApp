const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/touristApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for locations
const locationSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Location = mongoose.model("Location", locationSchema);

// API Endpoints
app.get("/api/locations", async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

app.post("/api/locations", async (req, res) => {
  const newLocation = new Location(req.body);
  await newLocation.save();
  res.status(201).json(newLocation);
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:27017");
});