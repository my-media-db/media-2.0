'use strict';

import React from 'react';
import 'whatwg-fetch';
import './style/main.css'
import ReactDOM from 'react-dom';
import TimeForm from './timeform.js';
// import * as Movies from '../routes/routes.js';
// import Movie from '../mongo/mongosandbox';

// import Test from './test.js';
// console.log('test' ,Test)


export class Media2 extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentTime: null, msg: 'now', tz: 'PST', movie: null
    }
    this.fetchCurrentTime = this.fetchCurrentTime.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchCurrentTime() {
    fetch(this.getApiUrl())
    .then(resp => resp.json())
    .then(resp => {
    const currentTime = resp.dateString;
    this.setState({currentTime})
    })
  }

  fetchMovie() {
    console.log('fetch movie result')
    fetch('http://localhost:8080/api/movie-req')
    .then(resp => resp.json())
    .then(res => {
    const movie = res.title;
    console.log('fetch console', res.title);
    this.setState({movie})
    })
    // .then(res=> {
    //   res.status(200).send(res);
		// })
    // .catch((res,err) => {
    //   console.log('error was thrown', err);
    //   res.status(404).send('Sorry, we cannot find that!');
    //  });
  }

  getApiUrl() {
    const {tz, msg} = this.state;
    const host = 'https://andthetimeis.com';
    return host + '/' + tz + '/' + msg + '.json';
  }

  handleFormSubmit(evt) {
    // this.fetchCurrentTime();
    this.fetchMovie();
  }

  handleChange(newState) {
    this.setState(newState);
  }
    
  render() {
    const {movie} = this.state;
    console.log('Movie', movie);
  
    return (
      <div>
        {!movie &&
          <button onClick={this.fetchMovie}>
            Get Movie
          </button>}
        {movie && <div>The Movie is: {movie.title}</div>}
        {/* <TimeForm
          onFormSubmit={this.handleFormSubmit}
          onFormChange={this.handleChange}
          tz={tz}
          msg={'now'}
        /> */}
        {/* <p>We'll be making a request from: <code>{apiUrl}</code></p> */}
      </div>
    )
  }
}


const root = document.getElementById('root');
ReactDOM.render(<Media2/>, root); 

export default Media2;