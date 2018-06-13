'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const PORT = process.env.PORT;
const Movie = require('/mongo/mongosandbox');
const express = require('express');
const app = express();
const superagent = require('superagent');
const api_key = process.env.PORT;
const server = module.exports = {};
server.isOn = false;

superagent.post(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`)
  .then(results => {
    console.log(results);
        	return Movie.create({
      movie_id: results.body[id],
    });
  })
  .catch(err => {
    console.log("error was thrown", err);
 
  });

server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server Error. Server already running.'));
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};
server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server Error. Server already stopped.'));
    server.http.close(() => {
      server.isOn = false;
      mongoose.disconnect();
      return resolve();
    });
  });
};