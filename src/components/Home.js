import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import SideNavMaterialUI from "./SideNavMaterialUI";

class Home extends Component {
  render() {
    return (
      <div className="body">
        <SideNavMaterialUI />
        <div className="content">
          Dripple Coming soon Login Coming soon Logout
        </div>
      </div>
    );
  }
}

export default Home;
