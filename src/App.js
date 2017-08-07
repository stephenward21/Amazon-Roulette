import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Groups from './components/Groups'
import Landing from './components/Landing'
import { BrowserRouter as Router, Route} from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Navbar/>
            <div className="main">
                <Route exact path="/landing" component={Landing} />
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/groups" component={Groups} />
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
