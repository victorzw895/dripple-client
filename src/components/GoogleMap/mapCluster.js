import React, { Component } from "react";
import SideNavMaterialUI from "../SideNavMaterialUI";

import GoogleMap from "./index";

class Mapcluster extends Component {
  render() {
    return (
      <div className="map">
        <SideNavMaterialUI />

        <GoogleMap />
      </div>
    );
  }
}

export default Mapcluster;
