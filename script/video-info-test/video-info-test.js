'use strict';

const fs = require('fs');
const VideoLib = require('node-video-lib');

fs.open('../Trailer-Upgrade(2018)[1080p].mp4', 'r', function (err, fd) {
  try {
    let movie = VideoLib.MovieParser.parse(fd);
    // Work with movie
    console.log('Duration:', movie.relativeDuration());
    console.log('Resolution:', movie.resolution());
    console.log('Size:', movie.size());
    console.log('Video Track:', movie.videoTrack());
    // console.log('Audio Track:', movie.audioTrack());
    // console.log('Samples:', movie.samples() );
  } catch (ex) {
    console.error('Error:', ex);
  } finally {
    fs.closeSync(fd);
  }
});