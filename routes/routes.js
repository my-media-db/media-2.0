'use strict';


require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const Movie = require('../mongo/mongosandbox');
const superagent = require('superagent');
const api_key = process.env.api_key;
const movieRouter = new express.Router();
const path = require('path');
const fs = require('fs');



movieRouter.route('/movie-req').post((req,res) => {
   console.log('hi');
  let results = superagent.post(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`);
  return results; 
})
  .then(results => {
    console.log(results);
        	return Movie.create({
      movie_id: results.body[id],
    });
  })
  .catch(err => {
    console.log('error was thrown', err);
 
  });

module.exports = movieRouter;