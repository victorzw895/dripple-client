import React from "react";
import PropTypes from "prop-types";
import MarkerStyled from "./MarkerStyled";
import MarkerInGroupStyled from "./MarkerInGroupStyled";
import Spy from "../Spy";
import Popup from "reactjs-popup";
import { Link as RouterLink } from "react-router-dom";
// import Link from "@material-ui/core/Link";
class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.inGroup ? (
          <MarkerInGroupStyled>
            <Spy scale="0.55" />
          </MarkerInGroupStyled>
        ) : (
          <Popup
            trigger={
              <button className="button_transparent">
                {""}
                <MarkerStyled>
                  <Spy scale="0.55" />
                </MarkerStyled>
              </button>
            }
            position="right top"
            on="hover"
          >
            <div className="card">
              <div className="header">User:{this.props.point.user_id} </div>
              <div className="content">{this.props.point.content}</div>
              <RouterLink
                to={{
                  pathname: "/chat",
                  receiver_id: this.props.point.user_id
                }}
              >
                Start Chat
              </RouterLink>
            </div>
          </Popup>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool
};

export default Marker;
