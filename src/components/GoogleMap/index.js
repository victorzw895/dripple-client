import React from "react";

import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";

import Marker from "../Marker";
import ClusterMarker from "../ClusterMarker";

import mapStyles from "./mapStyles.json";
import { markersData, susolvkaCoords } from "../fakeData";

import MapWrapper from "./MapWrapper";

const MAP = {
  defaultZoom: 12,
  defaultCenter: susolvkaCoords,
  options: {
    styles: mapStyles,
    maxZoom: 19
  }
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom
    },
    clusters: []
  };

  getClusters = () => {
    console.log("inside index", typeof markersData, markersData.length);
    const clusters = supercluster(markersData, {
      minZoom: 0,
      maxZoom: 19,
      radius: 150
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points
          }))
        : []
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };
  //   handleMarkerClick = event => {
  //     console.log(this.props);
  //   };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          //   onChildClick={this.handleMarkerClick}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: "AIzaSyB-G-1LlJUvvApyJnGGeFJ8YU_HbQvSGWo" }}
        >
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  point={item.points[0]}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                />
              );
            }
            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
