'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
// const Movie = require('../mongo/mongosandbox');
const bodyParser = require('body-parser');
const api_key = process.env.api_Key;
const movieRouter = new express.Router();
const path = require('path');
const fs = require('fs');



movieRouter.route('/movie-req').get((req, res) => {
  let results;
  let b = api_key;
  console.log(b || 'no key present');
   results =  superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`
  )  
  .end((result, err) => {
    console.log('results from movie db', JSON.parse(result.title));
  });
  res.send(result.text);
//     .catch((res,err) => {
//       console.log('error was thrown', err);
//       res.status(404).send('Sorry, we cannot find that!');
//     });
// });
//   .then(results => {
//     console.log(results);
//         	return Movie.create({
//       movie_id: results.body[id],
})




module.exports = movieRouter;

// console.log('hit router');
// let msg = JSON.stringify('Sorry, we cannot find that');
// res.send(msg);
// })