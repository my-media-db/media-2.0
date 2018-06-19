'use strict';

require('dotenv').config();

// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const movieRouter = require('./routes/routes');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());
app.use('/api', movieRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// const server = module.exports = {};
// server.isOn = false;

// server.start = () => {
//   return new Promise((resolve, reject) => {
//     if(server.isOn) return reject(new Error('Server Error. Server already running.'));
//     server.http = app.listen(PORT, () => {
//       console.log(`Listening on ${PORT}`);
//       server.isOn = true;
//       // mongoose.connect(MONGODB_URI);
//       return resolve(server);
//     });
//   });
// };
// server.stop = () => {
//   return new Promise((resolve, reject) => {
//     if(!server.isOn) return reject(new Error('Server Error. Server already stopped.'));
//     server.http.close(() => {
//       server.isOn = false;
//       // mongoose.disconnect();
//       return resolve();
//     });
//   });
// };

// server.start();