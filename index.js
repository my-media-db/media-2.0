'use strict';

require('dotenv').config();

// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT;
const api_key = process.env.api_key;

const express = require('express');
const bodyParser = require('body-parser');
const superagent = require('superagent');
const movieRouter = require('./routes/routes');
const cors = require('cors');
const handleListen = require('./src/handleListen.js');
const hello = require('./src/hello');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', movieRouter);

app.use(express.static('./dist'));

app.use('/', (req, res) => {
  res.sendFile('index.html', { root: './dist' });
});

app.get('/', hello);
app.listen(PORT, handleListen(console.log, PORT));

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
