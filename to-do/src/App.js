import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
      super();
      this.state ={
          count: 0
      };
  }
  render(){
    return(
        <div>
        <button>Increment</button>
        {this.state.count}
        </div>
    );

  }
}

export default App;
