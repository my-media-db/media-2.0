'use strict';
require('dotenv').config();
const express = require('express');
const imageRouter = new express.Router();
const path = require('path');

let reqPath = path.join(__dirname, '../img');

imageRouter.route('/img/:image').get((req, res) => {
    // console.log('requested file: ', req.params.image)
    // console.log('dirname: ', `${reqPath}/${req.params.image}`);

    res.set('Content-Type', 'image/jpeg');
    res.sendFile(`/${req.params.image}`, { root: reqPath });
  });

module.exports = imageRouter;