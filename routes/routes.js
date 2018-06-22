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
const cors = require('cors');

movieRouter.use(cors());

movieRouter.route('/movie-req').get((req, res) => {
let result = superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`
).end((err, result) => {
  console.log('results from movie db', JSON.parse(result.text));
  res.send(result.text);

})

// movieRouter.route('/movie-req').get((req, res) => {
//   res.console.log('I have been hit1!')
//   console.log('I have been hit2!').end();
  
//   });

// gets movies based on user search by title
// movieRouter.route('/movies/:title').get((req, res) => {
//   console.log('I have been hit!');
//   let url_search = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${req.params.title}`;
//   superagent.get(url_search)
//     .then(data => {
//       console.log(req.params.title)
//       res.send(data.body.results);
//     })
//     .catch(err => console.error(err));
// });

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
})


module.exports = movieRouter;

// console.log('hit router');
// let msg = JSON.stringify('Sorry, we cannot find that');
// res.send(msg);
// })