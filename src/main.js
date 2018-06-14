'use strict';

import React from 'react';
import 'whatwg-fetch';
import './style/main.css'
import ReactDOM from 'react-dom';
import TimeForm from './timeform.js';

export class Media2 extends React.Component {
  constructor(props) {
    super(props);

    // this.fetchCurrentTime = this.fetchCurrentTime.bind(this);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      currentTime: null, msg: 'now'
    }
  }

  // methods we'll fill in shortly
  fetchCurrentTime() {}
  getApiUrl() {}
  handleFormSubmit(evt) {}
  handleChange(newState) {}

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