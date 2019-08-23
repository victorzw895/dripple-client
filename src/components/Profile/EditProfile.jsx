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
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
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
import SideNavMaterialUI from "../SideNavMaterialUI";
import Profile from "./Profile";

const Api = require("../../lib/Api.js");
const SERVER_URL = "https://dripples.herokuapp.com/api/users/";
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

class EditProfile extends Component {
  constructor() {
    super();
    this.state = { data: {} };
    // define function to get information from the api here
    const fetchValues = () => {
      Api.getUserProfile(user_id).then(result => {
        console.log("setting State");
        this.setState({ data: result.data });
        console.log("getUserProfile", this.state.data);
      });
    };
    fetchValues();
    //     axios.get(SERVER_URL + `/${user_id}.json`).then(result => {
    //       this.setState({ data: result.data });
    //       console.log(this.state.data);
    //     });
    //   };
    //   fetchValues();
  }

  updateProduct = (
    name,
    profile_photo,
    about,
    age,
    birthday,
    hobbies,
    email,
    admin
  ) => {
    const user_id = this.props.match.params.id;
    const URL = SERVER_URL + user_id + ".json";
    console.log(1, URL);
    console.log(
      [name, profile_photo, about, age, birthday, hobbies, email, admin].join(
        ""
      )
    );
    Api.editUserProfile(
      user_id,
      name,
      profile_photo,
      about,
      age,
      birthday,
      hobbies,
      email,
      admin
    ).then(result => {
      console.log("postUserProfile", result.data);
    });
    const urlback = "/profile/" + user_id;
    this.props.history.push(urlback);
  };

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
      <GridContainer style={{ height: "100vh", width: "100vw" }}>
        <SideNavMaterialUI />
        <GridItem xs={12} sm={12} md={8} style={{ margin: "0 auto" }}>
          <EditForm
            data={this.state.data}
            style={this.props}
            onSubmit={this.updateProduct}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profile_photo: "",
      about: "",
      age: 0,
      birthday: "",
      hobbies: "",
      email: this.props.email,
      admin: this.props.admin
    };
  }

  componentDidMount() {
    console.log("HERE");
    this.setState({ name: this.props.data.name });
    this.setState({ profile_photo: this.props.data.profile_photo });
    this.setState({ about: this.props.data.about });
    this.setState({ age: this.props.data.age });
    this.setState({ birthday: this.props.data.birthday });
    this.setState({ hobbies: this.props.data.hobbies });
    this.setState({ email: this.props.data.email });
    this.setState({ admin: this.props.data.admin });
  }

  _handleChangeName = event => {
    const name =
      event.target.value === "" ? this.props.name : event.target.value;
    this.setState({
      name: name
    });
  };

  _handleChangeAge = event => {
    const age = event.target.value === "" ? this.props.age : event.target.value;
    this.setState({
      age: age
    });
  };

  _handleChangeBirthday = event => {
    const birthday =
      event.target.value === "" ? this.props.birthday : event.target.value;
    this.setState({
      birthday: birthday
    });
  };

  _handleChangeAbout = event => {
    const about =
      event.target.value === "" ? this.props.about : event.target.value;
    this.setState({
      about: about
    });
  };

  _handleChangeHobbies = event => {
    const hobbies =
      event.target.value === "" ? this.props.hobbies : event.target.value;
    this.setState({
      hobbies: hobbies
    });
  };

  _handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(
      this.state.name,
      this.state.profile_photo,
      this.state.about,
      this.state.age,
      this.state.birthday,
      this.state.hobbies,
      this.state.email,
      this.state.admin
    );
  };

  render() {
    const { classes } = this.props.style;
    const {
      name,
      profile_photo,
      about,
      age,
      birthday,
      hobbies,
      email,
      admin
    } = this.props.data;

    return (
      <form onSubmit={this._handleSubmit}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
            <p className={classes.cardCategoryWhite}>Complete your profile</p>
          </CardHeader>
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
                <img src={profile_photo} alt="..." />
              </a>
            </CardAvatar>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="name"
                  id="name"
                  onChange={this._handleChangeName}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="age"
                  id="age"
                  onChange={this._handleChangeAge}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="birthday"
                  id="birthday"
                  onChange={this._handleChangeBirthday}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel
                  style={{
                    color: "#AAAAAA",
                    fontSize: "1.5em",
                    marginTop: "20px"
                  }}
                >
                  About me
                </InputLabel>
                <CustomInput
                  style={{ marginTop: "0px" }}
                  labelText={
                    about &&
                    (about.length > 120
                      ? `${about.substring(0, 120)}...`
                      : about)
                  }
                  id="about-me"
                  onChange={this._handleChangeAbout}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 2
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel
                  style={{
                    color: "#AAAAAA",
                    fontSize: "1.5em",
                    marginTop: "20px"
                  }}
                >
                  My Hobbies
                </InputLabel>
                <CustomInput
                  labelText={
                    hobbies &&
                    (hobbies.length > 120
                      ? `${hobbies.substring(0, 120)}...`
                      : hobbies)
                  }
                  id="hobbies"
                  onChange={this._handleChangeHobbies}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 2
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary" type="submit">
              Update Profile
            </Button>
          </CardFooter>
        </Card>
      </form>
    );
  }
}

export default withStyles(styles)(EditProfile);
