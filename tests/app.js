'use strict';

const express = require('express');
const hello = require('./hello');
const app = express();
app.get('/test', hello);

module.exports = app;