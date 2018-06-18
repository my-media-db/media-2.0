'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const Movie = require('../mongo/mongosandbox');
const api_key = process.env.api_key;
const movieRouter = new express.Router();
const path = require('path');
const fs = require('fs');

movieRouter.route('/movie-req').post((req,res) => {
  console.log('hi');
  superagent.post(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`)
    .then(results => {
      console.log(results);
      Movie.create({
        movie_id: results.body[id],
      });
    });
})
  .then(results => {
    res.status(200).send("GOAL",results);
  })
  .catch(err => {
    res.status(404).send("ERROR");
    console.log('error was thrown', err);
 
});

module.exports = movieRouter;

// old code that was throwing errors, brought in code from caitlin routes branch above 
// movieRouter.route('/movie-req').post((req,res) => {
//   console.log('hi');
//   let results = superagent.post(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`);
//   return results; 
// })
//   .then(results => {
//     console.log(results);
//     return Movie.create({
//       movie_id: results.body[id],
//     });
//   })
//   .catch(err => {
//     console.log('error was thrown', err);
 
//   });

// module.exports = movieRouter;