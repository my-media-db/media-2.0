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
      currentTime: null, msg: 'now', tz: 'PST'
    }
    this.fetchCurrentTime = this.fetchCurrentTime.bind(this);
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
    fetch('/api/movie-req')
    .then(res => {
    const movie =  res || 'fetch response';
    console.log('console', res);
    this.setState({movie})
    })
  }

  getApiUrl() {
    const {tz, msg} = this.state;
    const host = 'https://andthetimeis.com';
    return host + '/' + tz + '/' + msg + '.json';
  }

  handleFormSubmit(evt) {
    this.fetchCurrentTime();
    this.fetchMovie();
  }

  handleChange(newState) {
    this.setState(newState);
  }

      
  render() {
    const {movie} = this.state;
  
    return (
      <div>
        {!movie &&
          <button onClick={this.fetchMovie}>
            Get Movie
          </button>}
        {movie && <div>The Movie is: {movie}</div>}
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