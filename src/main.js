'use strict';

require('dotenv').config();

import React from 'react';
import 'whatwg-fetch';
import './style/main.css'
import ReactDOM from 'react-dom';
import TimeForm from './timeform.js';
// import * as fs from 'fs';

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
//template for setting up fetch request
  fetchCurrentTime() {
    fetch(this.getApiUrl())
    .then(resp => resp.body)
    // .then(resp => {
    //   console.log('body response', resp.body )
      const currentTime = resp;
      this.setState({currentTime})
    
  }

  getApiUrl() {
    const api_key = process.env.api_key;
    const host = 'https://api.themoviedb.org/3/movie/550?api_key=';
    return host + api_key;
  }

  handleFormSubmit(evt) {
    this.fetchCurrentTime();
  }

  handleChange(newState) {
    this.setState(newState);
  }

  render() {
    const {currentTime, tz} = this.state;
    const apiUrl = this.getApiUrl();
  
    return (
      <div>
        {!currentTime &&
          <button onClick={this.fetchCurrentTime}>
            Get the current time
          </button>}
        {currentTime && <div>The current time is: {currentTime}</div>}
        <TimeForm
          onFormSubmit={this.handleFormSubmit}
          onFormChange={this.handleChange}
          tz={tz}
          msg={'now'}
        />
        <p>We'll be making a request from: <code>{apiUrl}</code></p>
      </div>
    )
  }
}


const root = document.getElementById('root');
ReactDOM.render(<Media2/>, root); 

export default Media2;