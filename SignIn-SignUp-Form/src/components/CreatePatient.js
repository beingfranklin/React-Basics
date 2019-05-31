import React, { Component } from 'react';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import { url } from './URL.js';

import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

url = url + '/createPatient';

var headers = {
  'Content-Type': 'application/json',
}

class CreatePatient extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
    console.log(this.state.password);


    axios.post(url, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    }, { headers: headers })
      .then(response => {
        response = JSON.parse(JSON.stringify(response));
        // var loginres=response.data[0].status;
        console.log(response);

      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App" >
        <div className="App__Forms">


          <div className="FormTitle">
            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Create Record</NavLink>
            {/* or <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink> */}
          </div>
          <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="">First Name</label>
                <input type="text" id="" className="FormField__Inputs" placeholder="Enter your First Name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="">Last Name</label>
                <input type="text" id="" className="FormField__Inputs" placeholder="Enter your Last Name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Inputs" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <button className="FormField__Button mr-20">Submit</button>
              </div>
            </form>


          </div>


        </div>
      </div>

    );
  }
}

export default CreatePatient;
