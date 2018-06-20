'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const Movie = require('../mongo/mongosandbox');
const bodyParser = require('body-parser');
const api_key = process.env.api_key;
const movieRouter = new express.Router();
const path = require('path');
const fs = require('fs');

movieRouter.route('/movie-req').get((req, res) => {
  let result = superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`
  ).end((err, result) => {
    console.log('results from movie db', JSON.parse(result.text));
    res.send(result.text);

  });
// .catch(err => {
//     console.log('error was thrown', err);
//     res.status(404).send('Sorry, we cannot find that!');
//   })
// })
//   .then(results => {
//     console.log(results);
//         	return Movie.create({
//       movie_id: results.body[id],
//     });
});

module.exports = movieRouter;

// console.log('hit router');
// let msg = JSON.stringify('Sorry, we cannot find that');
// res.send(msg);
// })