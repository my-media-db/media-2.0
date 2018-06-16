'use strict';

const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  movie_id : {type: Number, required: true}
});

// movieSchema.pre('save', function (next) {
// 	let movie = this;

//   if (movie.isNew) {
//    
// 	} else {
// 		console.log('movie is already in database')
// 		next();
// 	}
// });

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;