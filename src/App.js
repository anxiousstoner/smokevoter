import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//components 
import IndexSite from './components/index'
import Loading from './components/loading'
import Headers from './components/static/header'
import Apppage from './components/app'
import keys from './components/static/keys'
class App extends Component {
  render() {
    return (
     
      <div className="App">
        <Router>
          <div>
            <Headers />
            <Switch>
              <Route path="/" exact component={IndexSite} />
              <Route path="/app" component={Apppage} />
              <Route path="/loading" component={Loading} />
              <Route path="/genkey" component={keys} />
            </Switch>
          </div>
        </Router>
      </div>
      
    );
  }
}

export default App;
