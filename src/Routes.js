import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import DropSpace from "./components/DropSpace";
import MoreDripples from "./components/MoreDripples";
import SearchDripples from "./components/SearchDripples";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Mapcluster from "./components/GoogleMap/mapCluster";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";

const user_id = localStorage.getItem("current_user_id");

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/dropspace" component={DropSpace} />
      <Route exact path="/more_dripples" component={MoreDripples} />
      <Route exact path="/search_dripples" component={SearchDripples} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/map" component={Mapcluster} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route path={`/profile/:id/:edit`} component={EditProfile} />
    </div>
  </Router>
);

export default Routes;
