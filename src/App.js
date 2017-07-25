import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import Navbar from './components/Navbar';
=======
import Home from './components/Home';
import Register from './components/Register';
import { BrowserRouter as Router, Route} from 'react-router-dom';
>>>>>>> 0d56f739619e46afd3c31388fab5d31a0f4650a6


class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <Navbar/>
      </div>
=======
      <Router>
        <div className="App">
          <div id="canvas">
            <Home />
            <Route exact path="/register" component={Register} />
          </div>
        </div>
      </Router>
>>>>>>> 0d56f739619e46afd3c31388fab5d31a0f4650a6
    );
  }
}

export default App;
