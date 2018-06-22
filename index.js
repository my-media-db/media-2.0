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
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', movieRouter);

// gets movies based on user search by title
app.get('/api/movies/:title', (req, res) => {
  let url_search = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${req.params.title}`;
  superagent.get(url_search)
    .then(data => {
      console.log('api title:', req.params.title)
      res.send(data.body.results);
    })
    .catch(err => console.error(err));
});

app.use(express.static('./dist'));

app.use('/', (req, res) => {
  res.sendFile('index.html', { root: './dist' });
});

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