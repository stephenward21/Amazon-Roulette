import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Groups from './components/Groups'
import Landing from './components/Landing'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import LoginRequired from './components/LoginRequired';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            {/*<Navbar/>*/}
            <div className="main">
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" render={(props) => (<div><Navbar /><Home history={props.history}/></div>)}/>
                <Route exact path="/register" render={(props) => (<div><Navbar /><Register history={props.history} /></div>)}/>
                <Route exact path="/login" render={(props) => (<div><Navbar /><Login history={props.history}/></div>)}/>
                <Route exact path="/groups" render={(props) => (<div><Navbar /><Groups history={props.history}/></div>)}/>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
