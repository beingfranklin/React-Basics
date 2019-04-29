import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'https://11056209.ngrok.io/api/userLogin';
var headers = {
  'Content-Type': 'application/json',
}

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            type:''
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
        console.log(this.state.username);        
        console.log(this.state.password)
        console.log(this.state.type);
      //   fetch(url, {
      //     method: "POST", // *GET, POST, PUT, DELETE, etc.
      //     mode: "no-cors", // no-cors, cors, *same-origin
      //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: "same-origin", // include, *same-origin, omit
      //     headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json'
      //     },
      //     redirect: "follow", // manual, *follow, error
      //     referrer: "no-referrer", // no-referrer, *client
      //     body: JSON.stringify(this.state), // body data type must match "Content-Type" header
      // }).then(res => res.json())
      // .then(response => console.log('Success:', JSON.stringify(response)))
      // .catch(error => console.error('Error:', error));
      // // .then((response) => {
      // //   response=JSON.stringify(response);
      // //   console.log("Response is as below");
      // //   console.log(response);
      // // }).catch((error) => {
      // //   console.log(error);
      // // });

        axios.post(url,this.state,{headers: headers})
        .then(response => {
          response=JSON.parse(JSON.stringify(response));
          var loginres=response.data[0].status;
          console.log(loginres);
          if(loginres==='ok')
          {
            //login
          console.log("Login Page");

          }
          else if (loginres==='incorrect')
          {
          console.log("Error login");
          }
          else
          {
          console.log("ERRORR!!!");            
          }
        })
        .catch(error => {
          console.log(error);
        })
    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="">Username</label>
                <input type="text" id="" className="FormField__Input" placeholder="Enter your Type" name="username" value={this.state.username} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="">Type</label>
                <input type="text" id="" className="FormField__Input" placeholder="Enter your Type" name="type" value={this.state.type} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;
