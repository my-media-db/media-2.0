'use strict';

const mongoose = require('mongoose');



let movieSchema = mongoose.Schema({
  movie_id : {type: , required: true}
});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;