'use strict';


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

let movieSchema = mongoose.Schema({
  movie_id : {type: Number, required: true},
  bgUrl : {type : String},
  posterUrl : {type : String},
  movieTitle : {type : String},
  movieDescription : {type : String},
  movieReleaseDate : {},
  movieAverage : {type : Number}
});

movieSchema.pre('save', function (next) {
  let movie = this;

  if (movie.isNew) {
    next();
  } else {
    console.log('movie is already in database')
    next();
  }
});

const Movie = mongoose.model('infos', movieSchema);

module.exports = Movie;