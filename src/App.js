import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
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
            <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
