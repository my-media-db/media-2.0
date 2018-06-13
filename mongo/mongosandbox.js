'use strict';

const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  movie_id : {type: , required: true}
});

// movieSchema.pre('save', function (next) {
// 	let movie = this;
  
//   //helper function that parses json before saving. Saving can be done after a request

//   if (movie.isNew) {
//     movie = JSON.parse(movie);
//     params = 
//     return new Promise((resolve, reject) => {
//       s3.upload(params, (err, s3Data) => {
//         url = s3Data.Location;
//         resolve(Photo.create({ url: url }));
//       })
// 	} else {
// 		console.log('movie is already in database')
// 		next();
// 	}
// });

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;