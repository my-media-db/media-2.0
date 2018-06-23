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

// movieRouter.route('/movie-req').get((req, res) => {
//   let api_result;
  
//   superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`
//   ) 
//     .end((err, result) => {
//       console.log('results from movie db', JSON.parse(result.text));
     
//       api_result = JSON.parse(result.text);
//       let movie = api_result.id;
//       Movie.create({
//         movie_id: movie,
//       });
//       res.send(result.text);
       
     
//     });
    


// });

// ({
//   movie_id : {type: Number, required: true},
//   bgUrl : {type : String},
//   posterUrl : {type : String},
//   movieTitle : {type : String},
//   movieDescription : {type : String},
//   movieReleaseDate : {},
//   movieAverage : {type : Number}
// })


movieRouter.route('/movies/:title').get((req, res) => {
  console.log('I have been hit!');
  let url_search = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${req.params.title}`;
  superagent.get(url_search).then(data => {
      
    Movie.create({
      movie_id: data.body.results[0].id,
      bgUrl: data.body.results[0].backdrop_path,
      posterUrl: data.body.results[0].poster_path,
      movieTitle: data.body.results[0].title,
      movieDescription: data.body.results[0].overview,
      movieReleaseDate: data.body.results[0].release_date,
      movieAverage: data.body.results[0].vote_average,
    });
    console.log('results from api', data[0]);
    res.send(data.body.results);
  })
    .catch(err => console.error(err));
});


module.exports = movieRouter;

//