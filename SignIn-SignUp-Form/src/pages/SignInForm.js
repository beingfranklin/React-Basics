import React, { Component } from 'react';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';


// import { start } from 'repl';

const url = 'https://ac3cd296.ngrok.io/api/userLogin';
const dockey = 'https://ac3cd296.ngrok.io/api/doctorprivatekey?doctorid=';
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
     
        var docpassword = sha256(this.state.password).toString();

        axios.post(url,{
            username: this.state.username,
            password: docpassword,
            type: this.state.type
        },{headers: headers})
        .then(response => {
          response=JSON.parse(JSON.stringify(response));
          var loginres=response.data[0].status;
          console.log(loginres);
          if(loginres=='ok')
          {

          //login success 

          if((this.state.type)==="doctor")
          {
            axios.get(dockey + this.state.username)
            .then(res => {
              //Fetching Hash using GET
              console.log("AXIOS GET");
              res =JSON.stringify(res);
             console.log(res);
             //Input hash after fetching
            var hash= JSON.parse(res).data;
            localStorage.setItem('hash', hash);
            console.log("Local Storage Hash -> " +localStorage.getItem('hash'));
            this.props.history.push('/dashboard');
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
            // this.props.history.push('/dashboard');
            
          }
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
          <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
          <div className="PageSwitcher">
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                {/* <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink> */}
              </div>

              <div className="FormTitle">
                  <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> 
                  {/* or <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink> */}
              </div>
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
              {/* <div className="FormField">
                <label className="FormField__Label" htmlFor="">Type</label>
                <input type="text" id="" className="FormField__Input" placeholder="Enter your Type" name="type" value={this.state.type} onChange={this.handleChange} />
              </div> */}

              <div className="FormField"onChange={this.handleChange}>
                 <input type="radio" value="doctor" name="type"/> Doctor  
                 <input type="radio" value="patient" name="type"/> Patient  
                 <input type="radio" value="regulator" name="type"/> Regulator  
              </div>
             
              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
          
          </div>
   
        
          </div>
          
        );
    }
}

export default SignInForm;
