import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import { BrowserRouter as Router, Route} from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Navbar/>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
