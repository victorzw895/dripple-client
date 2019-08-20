import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import DropSpace from "./components/DropSpace";
import MoreDripples from "./components/MoreDripples";
import Profile from "./components/Profile";
import SearchDripples from "./components/SearchDripples";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Mapcluster from "./components/GoogleMap/mapCluster";
import ChatRoom from "./components/ChatRoom/ChatRoom";

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/dropspace" component={DropSpace} />
      <Route exact path="/more_dripples" component={MoreDripples} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search_dripples" component={SearchDripples} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/map" component={Mapcluster} />
      <Route exact path="/chat" component={ChatRoom} />
    </div>
  </Router>
);

export default Routes;
