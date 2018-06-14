import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {name: 'brandon'}
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        console.log(this.state.name);
    }

    render() {
        return <button onClick={this.handleSubmit}>Click me!!
        </button>
    
    }
}
export default Test;