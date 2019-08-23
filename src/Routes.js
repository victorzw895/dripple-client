import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import DropSpace from "./components/DropSpace";
import MoreDripples from "./components/MoreDripples";
import SearchDripples from "./components/SearchDripples";
import LoginPage from "./components/LoginPage/LoginPage";
import Logout from "./components/Logout";
import SignupPage from "./components/LoginPage/SignupPage";
import Mapcluster from "./components/GoogleMap/mapCluster";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import Conversations from "./components/ChatRoom2/ConversationsList";

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/dropspace" component={DropSpace} />
      <Route exact path="/more_dripples" component={MoreDripples} />
      <Route exact path="/search_dripples" component={SearchDripples} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/map" component={Mapcluster} />
      <Route exact path="/chat" component={Conversations} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route path={`/profile/:id/:edit`} component={EditProfile} />
    </div>
  </Router>
);

export default Routes;
