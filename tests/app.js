'use strict';

const express = require('express');
const hello = require('./hello');
const app = express();
app.get('/', hello);

module.exports = app;