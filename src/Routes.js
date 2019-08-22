import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import DropSpace from "./components/DropSpace";
import MoreDripples from "./components/MoreDripples";
import Profile from "./components/Profile";
import SearchDripples from "./components/SearchDripples";
import LoginPage from "./components/LoginPage/LoginPage";
import Logout from "./components/Logout";
import SignupPage from "./components/LoginPage/SignupPage";
import Mapcluster from "./components/GoogleMap/mapCluster";
import ChatMain from "./components/ChatRoom2/ChatMain";

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/dropspace" component={DropSpace} />
      <Route exact path="/more_dripples" component={MoreDripples} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search_dripples" component={SearchDripples} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/map" component={Mapcluster} />
      <Route exact path="/chat" component={ChatMain} />
    </div>
  </Router>
);

export default Routes;
