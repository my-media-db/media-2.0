'use strict';

const request = require('supertest');
const app = require('../index');

test('should pass integration tests', (done) => {
  request(app)
    .get('/realtest')
    .expect(200, 'ok')
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});

test('hits our api movie-req route and expects back a movie response', (done) => {
  request(app)
    .get('/api/movie-req')
    .expect('Content-Type', /text/)
    .expect(200)
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});

test('hits our api/img/:image route and expects back an image response', (done) => {
  request(app)
    .get('/api/img/:image')
    .expect('Content-Type', /text/)
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});