import React, { Component } from "react";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Dripples from "./Dripples";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Main />
        </div>
      </Router>
    );
  }
}

const Navigation = () => (
  <nav className="navigationBar">
    <ul>
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="active" to="/dripples">
          Dripples
        </NavLink>
      </li>
      {localStorage.getItem("jwt") ? (
        <li>
          <NavLink exact to="/logout">
            Log Out
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink exact activeClassName="active" to="/login">
            Log In
          </NavLink>
        </li>
      )}
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/dripples" component={Dripples} />
  </Switch>
);

export default App;
