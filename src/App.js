import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import { BrowserRouter as Router, Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div id="canvas">
            <Home />
            <Route exact path="/register" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
