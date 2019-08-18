import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import DropSpace from "./components/DropSpace";
import Dripples from "./components/Dripples";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./components/Login";
import Logout from "./components/Logout";

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/dropspace" component={DropSpace} />
      <Route exact path="/dripples" component={Dripples} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
    </div>
  </Router>
);

export default Routes;
