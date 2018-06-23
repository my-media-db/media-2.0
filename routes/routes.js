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

const mongoose = require('mongoose');

movieRouter.use(cors());

movieRouter.route('/movies/:title').get((req, res) => {

  console.log(req.params.title, 'heyo');
  let title = req.params.title;
  Movie.findOne({ title : title }).then(movie => {
    let result = movie;
    console.log('db movie', result);
   
    if(!movie){
      let url_search = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${req.params.title}`;
      superagent.get(url_search).then(data => {
        console.log('searching api');
        let newMovie = new Movie({
          id: data.body.results[0].id,
          backdrop_path: data.body.results[0].backdrop_path,
          poster_path: data.body.results[0].poster_path,
          title : data.body.results[0].title,
          overview: data.body.results[0].overview,
          release_date: data.body.results[0].release_date,
          vote_average: data.body.results[0].vote_average,
        });
        newMovie.save().then(db => {
          console.log('Save result:', db);
          result = db;
          return result;
        }).catch(err => {
          console.log(err);
        });
        
      })
        .catch(err => console.error(err));
    }
    res.send(result);
    console.log(result, 'superagent return');
  });

});





module.exports = movieRouter;

//
// var Person = mongoose.model('Person', yourSchema);

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
//  Movie.findOne({ 'movieTitle': req.params.title }, 'movie_id bgUrl posterUrl movieTitle movieDescription movieReleaseDate movieAverage', function (err, movie) {

//   if (err) {

//     let url_search = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${req.params.title}`;
//     superagent.get(url_search).then(data => {
        
//       Movie.create({
//         movie_id: data.body.results[0].id,
//         bgUrl: data.body.results[0].backdrop_path,
//         posterUrl: data.body.results[0].poster_path,
//         movieTitle: data.body.results[0].title,
//         movieDescription: data.body.results[0].overview,
//         movieReleaseDate: data.body.results[0].release_date,
//         movieAverage: data.body.results[0].vote_average,
//       });
    
//       res.send(data.body.results);
//     })
//       .catch(err => console.error(err));
//     res.send(movie);
//   }
 
 
// });
