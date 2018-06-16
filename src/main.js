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
    //need to handle search variables and search type on time form
    this.state = {
      currentTime: null, msg: 'now', tz: 'PST',
      movie: null, search: null, search_type: null, api_key: process.env.api_key
    }
    this.fetchCurrentTime = this.fetchCurrentTime.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
//template for setting up fetch request
  fetchCurrentTime() {
    fetch(this.getApiUrl())
    .then(resp => resp.json())
    .then(resp => {
    const currentTime = resp.dateString;
    this.setState({currentTime})
    })
  }
// need to figure out how to implement .env variables
  fetchMovie(){
    const api_key = this.state;
    
    fetch('http://localhost:3000/api/movie-req')
    .then(result => {
      const movie = result;
      console.log(result)
      this.setState({movie})
    })
    .then(result => console.log(result))
  }

  getMovieUrl(){
    // can there be more than one variable that populates this state?
    const {search,search_type,api_key}  = this.state;
    const host = 'https://api.themoviedb.org/';
    return host + '/'+ search_type + '/' + search + '?api_key=' + api_key;
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
   
    const {currentTime, tz, movie, api_key} = this.state;
    require(dotenv).config();
    const apiUrl = this.getApiUrl();
  
  
    return (
      <div>
        {!currentTime &&
          <button onClick={this.fetchCurrentTime}>
            Get the current time
          </button>}
          {!movie &&
          <button onClick={this.fetchMovie}>
            Get Movie
          </button>}
        {currentTime && <div>The current time is: {currentTime}</div>}
        {movie && <div>movie is: {movie}</div>}
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