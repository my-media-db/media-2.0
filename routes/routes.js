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

movieRouter.route('/movie-req').get((req, res) => {
  let api_result;
  superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`
  )
    .end((err, result) => {
      console.log('results from movie db', JSON.parse(result.text));
      api_result = JSON.parse(result.text);
      let movie = api_result.id;
      Movie.create({
        movie_id: movie,
      });
      res.send(result.text);
    });
});

movieRouter.route('/movies/:title').get((req, res) => {
  let url_search = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${req.params.title}`;
  superagent.get(url_search)
    .then(data => {
      // console.log(req.params.title)
      res.send(data.body.results);
      console.log('movieRouter Results: ', data.body.results);
      // console.log('movieRouter Title: ', data.body.results[0].title);
      // the results that will be pushed to local database
      const newMovie = new Movie({
        movie_id: data.body.results[0].id,
        bgUrl: data.body.results[0].backdrop_path,
        posterUrl: data.body.results[0].poster_path,
        movieTitle: data.body.results[0].title,
        movieDescription: data.body.results[0].overview,
        movieReleaseDate: data.body.results[0].release_date,
        movieAverage: data.body.results[0].vote_average,
      });
      // method to actually save the data to mongodb **works only commented out to prevent duplicates.
      // newMovie.save().then(result => {
      //   console.log('Save result:', result);
      // }).catch(err => {
      //   console.log(err);
      // });
    })
    .catch(err => console.error(err));
});

movieRouter.route('/movie-lookup/:title').get((req, res) => {
  let toCheck = req.params.title
  console.log('Looking for: ', toCheck);

  mongoose.connect(process.env.MONGODB_URI, (err, db) => {
    console.log('databse connected');
    db.collection('infos').findOne({
      _id: '',
      'movieTitle': toCheck
    }), function (err, doc) {
      console.log('Searching Databse');
      if (err) throw err;
      console.log('Search Result: ', doc);
      db.close();
      console.log('Databse closed');
    };
  });



  // Movie.findOne(
  //   { movieTitle:toCheck }
  // )
  //   .exec()
  //   .then(doc => {
  //     console.log('search result: ', doc);
  //   }).catch(err => console.log(err));


  // console.log('query:', toCheck);
  // // if (err) throw err;
  // var dbo = db.infos("infos");
  // var query = { movieTitle: toCheck };
  // dbo.collection("infos").find(query).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });
  // res.write('query:', query);
  // res.end();
});

// const newMovie = new Movie({

// })

// .catch(err => {
//   console.log('error was thrown', err);
//   res.status(404).send('Sorry, we cannot find that!');
// });
// })
//   .then(results => {
//     console.log(results);
//          return Movie.create({
//       movie_id: results.body[id],
//     });

module.exports = movieRouter;
// console.log('hit router');
// let msg = JSON.stringify('Sorry, we cannot find that');
// res.send(msg);
// })
// 'use strict';

// require('dotenv').config();

// const express = require('express');
// const superagent = require('superagent');
// const Movie = require('../mongo/mongosandbox');
// const bodyParser = require('body-parser');
// const api_key = process.env.api_key;
// const movieRouter = new express.Router();
// const path = require('path');
// const fs = require('fs');



// movieRouter.route('/movie-req').get((req, res) => {
//   let result = superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`
//   ).end((result, err) => {
//     console.log('results from movie db', JSON.parse(result.title));
//     res.send(result.text);
//   })


//   // .catch(err => {
//   //     console.log('error was thrown', err);
//   //     res.status(404).send('Sorry, we cannot find that!');
//   //   })
//   // })
//   //   .then(results => {
//   //     console.log(results);
//   //         	return Movie.create({
//   //       movie_id: results.body[id],
//   //     });
// })


// module.exports = movieRouter;

// // console.log('hit router');
// // let msg = JSON.stringify('Sorry, we cannot find that');
// // res.send(msg);
// // })
