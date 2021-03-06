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

const Movie = mongoose.model('info', movieSchema);
module.exports = Movie;