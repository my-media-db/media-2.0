'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css'

class Media2 extends React.Component { // MyCoolApp is the name of the app
  constructor(props){
    super(props);
  }

  render() { // JSX
    return <div>
      <h1>Hello World!</h1>
      </div>;
  }
}

const root = document.getElementById('root');
ReactDOM.render(<Media2/>, root);  // Class and render need to be the same.