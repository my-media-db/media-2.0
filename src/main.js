'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css'

class Media2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieFileName: '',
      moviePath: '',
      // are we searching for a video?
      isLoading: false,
      // have we switched from viewing the poster to viewing the movie?
      isPlaying: false,
      bgUrl: `${window.location.href}api/img/wallpaper-0${Math.round(Math.random()*5)}.jpg`, //need to have it randomly select a bg image.
    }
    this.handleChange = this.handleChange.bind(this);
    this.fetchMovieInfo = this.fetchMovieInfo.bind(this);
    this.movieInformation = this.movieInformation.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.videoPlayer = this.videoPlayer.bind(this);
    this.videoPlayerSize = this.videoPlayerSize.bind(this);
  }

  handleChange(event) {
    let fileName = event.target.files[0].name;
    // console.log('file name:', fileName);
    this.setState({
      movieFileName: event.target.files[0].name
    });

    // console.log('temp path:', tmppath);
    let tmppath = URL.createObjectURL(event.target.files[0]);
    this.setState({
      moviePath: tmppath,
    });

    var movieName = fileName.split('(');  //remove extra data not related to movie name
    console.log(movieName);

    this.fetchMovieInfo(movieName[0]);
    // console.log('server:', window.location.href);
  }


  fetchMovieInfo(movieName) {
    // reset the state of everything when starting a new search.
    this.setState({
      isError: false,
      isLoading: true,
      posterUrl: undefined,
      isPlaying: false,
      videoHeight: 480,
    });

    // const api_url = 'http://mhzsys.net:21010/api'; // remote old server
    // const api_url = 'http://192.168.1.10:3000/api'; //local old server
    const api_url = `${window.location.href}api`; //dynamic
    const images_uri = 'http://image.tmdb.org/t/p'
    const img_size = '/w300'

    console.log('movie title:', movieName);

    return $.getJSON(`${api_url}/movies/${movieName}`).then(data => {
      console.log('url path: ', `${api_url}/movies/${movieName}`);
      console.log(data[0], 'got search results');
      const bgUrl = `${images_uri}/w500${data.backdrop_path}`;
      const posterUrl = `${images_uri}/${img_size}${data.poster_path}`;
      const movieTitle = `${data.title}`;
      const movieDescription = `${data.overview}`;
      const movieReleaseDate = `${data.release_date}`;
      const movieAverage = `${data.vote_average}`;
      this.setState({
        bgUrl,
        posterUrl,
        movieTitle,
        movieDescription,
        movieReleaseDate,
        movieAverage,
        isError: false,
        isLoading: false,
      })
    }).catch(err => {
      console.error(err)
      this.setState({
        isError: true,
        isLoading: false,
      });
    });
  }

  movieInformation() {
    return <div id="movie-information">
      {this.state.isLoading && <p>Loading poster...</p>}
      {!this.state.isLoading && this.state.isError && <p>Couldn't find movie poster.</p>}
      {!this.state.isLoading && this.state.posterUrl && <img id="movie-poster" onClick={this.playVideo} src={this.state.posterUrl}/>}
      {!this.state.isLoading && this.state.posterUrl && <img className="bg" src={this.state.bgUrl}/>}
      {!this.state.isLoading && this.state.movieTitle && <h1 id="movie-title">{this.state.movieTitle}</h1>}
      {!this.state.isLoading && this.state.movieDescription && <p id="movie-description">{this.state.movieDescription}</p>}
      {!this.state.isLoading && this.state.movieReleaseDate && <p id="movie-release">Release Date: {this.state.movieReleaseDate}</p>}
      {!this.state.isLoading && this.state.movieAverage && <p id="populartiy">Popularity: {this.state.movieAverage}</p>}
    </div>
  }

  playVideo() {
    console.log('playing video');
    this.setState({isPlaying: true});
  }

  videoPlayer() {
    let width = (this.state.videoHeight * 16) / 9; //16
    console.log('video location:', this.state.moviePath)
    return <div id="video-player">
      <video height={this.state.videoHeight} width={width} controls src={this.state.moviePath}>
        Sorry your browser doesn't support video.
      </video>
      {!this.state.isLoading && this.state.posterUrl && <img className="bg" src={this.state.bgUrl}/>}
      <br></br>
      <button onClick={() => this.videoPlayerSize(320)}>320p</button>
      <button onClick={() => this.videoPlayerSize(480)}>480p</button>
      <button onClick={() => this.videoPlayerSize(720)}>720p</button>
      <button onClick={() => this.videoPlayerSize(1080)}>1080p</button>
    </div>
  }

  videoPlayerSize(size) {
    this.setState({videoHeight: size});
  };

  render() { // JSX
    return <div id="body">
      <h1>Video Player</h1>
      <p>Choose a local video video file to play in web browser.</p>
      <p>to increase sucess of finding proper movie information ensure the movies file name is spelled correctly.</p>
      <p>Example: Jurassic World Fallen Kingdom (2018).mp4</p>
      <img className="bg" src={this.state.bgUrl}/>

      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="file" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>

      {!this.state.isPlaying && this.movieInformation()}
      {this.state.isPlaying && this.videoPlayer()}
    </div>;
  }
}

const root = document.getElementById('root');
ReactDOM.render(<Media2 />, root);