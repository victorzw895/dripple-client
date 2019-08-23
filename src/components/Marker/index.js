import React from "react";
import PropTypes from "prop-types";

import MarkerStyled from "./MarkerStyled";
import MarkerInGroupStyled from "./MarkerInGroupStyled";
import Spy from "../Spy";
import Popup from "reactjs-popup";

const Card = ({ title }) => (
  <div className="card">
    <div className="header">{title} position </div>
    <div className="content" />
  </div>
);

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
