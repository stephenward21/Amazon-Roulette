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
            {/*<Navbar/>*/}
            <div className="main">
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" render={() => (<div><Navbar /><Home /></div>)}/>
                <Route exact path="/register" render={() => (<div><Navbar /><Register /></div>)}/>
                <Route exact path="/login" render={() => (<div><Navbar /><Login /></div>)}/>
                <Route exact path="/groups" render={() => (<div><Navbar /><Groups /></div>)}/>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
