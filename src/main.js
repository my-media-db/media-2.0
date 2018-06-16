'use strict';

import React from 'react';
import 'whatwg-fetch';
import './style/main.css'
import ReactDOM from 'react-dom';
import TimeForm from './timeform.js';
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

  // methods we'll fill in shortly
  fetchCurrentTime() {
    fetch(this.getApiUrl())
    .then(resp => resp.json())
    .then(resp => {
    const currentTime = resp.dateString;
    this.setState({currentTime})
    })
  }

  getApiUrl() {
    const {tz, msg} = this.state;
    const host = 'https://andthetimeis.com';
    return host + '/' + tz + '/' + msg + '.json';
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