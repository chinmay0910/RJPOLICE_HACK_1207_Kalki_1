// const express = require('express');
// const connectToMongo = require('./db.js')
// const cors = require('cors')


// connectToMongo();
// const app = express();
// app.use(cors())
// const PORT = process.env.PORT || 5000

// app.use(express.json())


// app.use('/api/auth',require('./routes/auth.js'))
// app.use('/api/complaint',require('./routes/complaint.js'))



// app.listen(PORT, ()=>{
//     console.log("Listening on Port http://localhost:"+PORT);
// })
// server.js
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Connect to MongoDB (Replace 'mongodb://localhost:27017/police-station-db' with your actual MongoDB connection string)
// mongoose.connect('mongodb+srv://Pradeep:Pradeep@cluster0.fjyphwo.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define a PoliceStation model
// const PoliceStation = mongoose.model('PoliceStation', {
//   PS_NO: String,
//   PS_Name: String,
//   PS_location: String,
//   PS_head: String,
// });

// app.use(bodyParser.json());

// // API endpoint for adding a police station
// app.post('/api/police-stations', async (req, res) => {
//   try {
//     const { PS_NO, PS_Name, PS_location, PS_head } = req.body;

//     const newStation = new PoliceStation({ PS_NO, PS_Name, PS_location, PS_head });
//     const savedStation = await newStation.save();

//     res.status(201).json(savedStation);
//   } catch (error) {
//     console.error('Error adding police station:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // API endpoint for fetching all police stations
// app.get('/api/police-stations', async (req, res) => {
//   try {
//     const stations = await PoliceStation.find();
//     res.json(stations);
//   } catch (error) {
//     console.error('Error fetching police stations:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.js
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB (Replace 'mongodb://localhost:27017/police-station-db' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://Pradeep:Pradeep@cluster0.fjyphwo.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a PoliceStation model
const PoliceStation = mongoose.model('PoliceStation', {
  PS_NO: String,
  PS_Name: String,
  PS_location: String,
  PS_head: String,
});

app.use(bodyParser.json());

// API endpoint for adding a police station
app.post('/api/police-stations', async (req, res) => {
  try {
    const { PS_NO, PS_Name, PS_location, PS_head } = req.body;
    console.log('Received data:', req.body);

    const newStation = await PoliceStation.create({ PS_NO, PS_Name, PS_location, PS_head });
    const savedStation = await newStation.save();

    res.status(201).json(savedStation);
  } catch (error) {
    console.error('Error adding police station:', error);
    res.status(500).send('Internal Server Error');
  }
});


// API endpoint for fetching all police stations
app.get('/api/police-stations', async (req, res) => {
  try {
    const stations = await PoliceStation.find();
    res.json(stations);
  } catch (error) {
    console.error('Error fetching police stations:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
