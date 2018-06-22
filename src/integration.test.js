'use strict';

const request = require('supertest');
const app = require('./main.js');
test('should pass integration tests', (done) => {
  request(app)
    .get('/')
    .expect(200, 'Hello World!')
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});