import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "../index.css";

navigator.geolocation.getCurrentPosition(function(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const timestamp = position.timestamp;
  console.log("lat", latitude, "long", longitude, "time", timestamp);
  // work with this information however you'd like!
});

export class MapContainer extends React.Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div className="mapFrame">
        <Map google={google} initialCenter={userLocation} zoom={10} />;
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyATWB7OyhaiKf7S9kXfJQq_lZNYXTszV5M"
})(MapContainer);
