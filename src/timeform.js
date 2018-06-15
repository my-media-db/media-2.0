'use strict';

import React from 'react';
import 'whatwg-fetch';
import './style/main.css'
import ReactDOM from 'react-dom';
const timezones = ['PST', 'MST', 'MDT','EST','UTC'];

export class TimeForm extends React.Component{
  constructor(props){
      super(props);

      const {tz, msg} = this.props;
      this.state = {tz, msg};

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleCharge = this.handleChange.bind(this);
    }
    

  handleChange(evt) {
      typeof this.props.onFormChange === 'function' && 
      this.props.onFormChange(this.state);
  };

  changeTimezone(evt) {
      const tz = evt.target.value;
      this.setState({tz}, this.handleChange);
  }

  changeMsg(evt) {
    const msg = encodeURIComponent(evt.target.value).replace(/%20/,'+');
    this.setState({msg}, this.handleChange);
  };

  handleFormSubmit(evt) {
    evt.preventDefault();
    typeof this.props.onFormSubmit === 'function' && this.props.onFormSubmit(this.state);
  };

render() {
  const {tz}= this.state;
  return(
    <form onSubmit= {this.handleFormSubmit}>
    <select 
      onChange = {this._changeTimezone}
      defaultValue={tz}>
      {timezones.map(t => {
        return (<option key = {t} value ={t}>{t}</option>)
      })}
      </select>
      <input type = "submit" value = "Update request" />
      </form>
  )

}
}

export default TimeForm;