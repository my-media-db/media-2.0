'use strict';


const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);

let movieSchema = mongoose.Schema({
  id: {type: Number, required: true},
  backdrop_path: {type : String},
  poster_path: {type : String},
  title :  {type : String},
  overview: {type : String},
  release_date: {},
  vote_average: {type : Number}
});

// movieSchema.pre('save', function (next) {
//   let movie = this;

//   if (movie.isNew) {
//     next();
//   } else {
//     console.log('movie is already in database')
//     next();
//   }
// });

const Movie = mongoose.model('realdb', movieSchema);

module.exports = Movie;