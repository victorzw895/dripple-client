/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import SideNavMaterialUI from "../SideNavMaterialUI";
import { Link } from "react-router-dom";
import axios from "axios";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
// core components
import GridItem from "../Material/Grid/GridItem.jsx";
import GridContainer from "../Material/Grid/GridContainer.jsx";
import CustomInput from "../Material/CustomInput/CustomInput.jsx";
import Button from "../Material/CustomButtons/Button.jsx";
import Card from "../Material/Card/Card.jsx";
import CardHeader from "../Material/Card/CardHeader.jsx";
import CardAvatar from "../Material/Card/CardAvatar.jsx";
import CardBody from "../Material/Card/CardBody.jsx";
import CardFooter from "../Material/Card/CardFooter.jsx";

const Api = require("../../lib/Api.js");
const SERVER_URL = "http://www.localhost:3000/api/users/";
const user_id = localStorage.getItem("current_user_id");

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Profile extends Component {
  constructor() {
    super();
    this.state = { data: {} };
  }

  componentDidMount() {
    console.log("HERE");
    axios.get(SERVER_URL + `/${user_id}.json`).then(result => {
      this.setState({ data: result.data });
      console.log(result.data);
    });
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      profile_photo,
      about,
      age,
      birthday,
      hobbies
    } = this.state.data;

    return (
      <GridContainer>
        <SideNavMaterialUI />
        <GridItem xs={12} sm={12} md={8} style={{ margin: "0 auto" }}>
          <Card>
            <CardBody>
              <CardAvatar
                profile
                style={{
                  marginTop: "50px",
                  maxWidth: "200px",
                  maxHeight: "200px"
                }}
              >
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <ProfilePhoto avatar={this.state.data.profile_photo} />
                </a>
              </CardAvatar>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  Name: {name}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  Age: {age}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  Birthday: {birthday}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  About me: {about}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  My Hobbies: {hobbies}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Profile);
