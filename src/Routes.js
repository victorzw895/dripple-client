import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import DropSpace from "./components/DropSpace";
import MoreDripples from "./components/MoreDripples";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Maptest from "./components/Maptest";

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/dropspace" component={DropSpace} />
      <Route exact path="/more_dripples" component={MoreDripples} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/map" component={Maptest} />
    </div>
  </Router>
);

export default Routes;
