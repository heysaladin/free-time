import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./login.component.js";
import Dashboard from "./dashboard.component.js";
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  let condition = null;
  if (cookies.get('myCat') !== undefined) {
    condition = <div className="App">
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to={"/dashboard"} />
        </Switch>
      </div>
    </div>
  } else {
    condition = <div className="App">
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to={"/"} />
        </Switch>
      </div>
    </div>
  }

  return (
    <Router>
      {

        condition
      }
    </Router>
  );
}

export default App;
