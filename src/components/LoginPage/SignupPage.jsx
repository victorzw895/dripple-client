import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "./GridContainer.jsx";
import GridItem from "./GridItem.jsx";
import Button from "./Button.jsx";
import Card from "./Card.jsx";
import CardBody from "./CardBody.jsx";
import CardHeader from "./CardHeader.jsx";
import CardFooter from "./CardFooter.jsx";
import CustomInput from "./CustomInput.jsx";
import People from "@material-ui/icons/People";
import loginPageStyle from "./style/loginPage";
// import SideNavMaterialUI from "./SideNavMaterialUI";

import axios from "axios";
import SideNavMaterialUI from "../SideNavMaterialUI";
import image from "../../assets/img/ripplebg.jpg";

// const SERVER_URL = "http://localhost:3000/api/users";
const SERVER_URL = "https://dripples.herokuapp.com/api/users";

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      cardAnimaton: "cardHidden"
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
      this
    );
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    console.log(fields);
    this.setState({
      fields
    });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      console.log(this.state.fields);
      axios.post(SERVER_URL, { user: this.state.fields }).then(response => {
        console.log(response);
        this.props.history.push("/login");
      });
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password_confirmation"]) {
      formIsValid = false;
      errors["password_confirmation"] = "*Please enter your password again.";
    }

    if (fields["password_confirmation"] !== fields["password"]) {
      formIsValid = false;
      errors["password_confirmation"] = "*Passwords do not match.";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className="body">
        <SideNavMaterialUI />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form
                    method="post"
                    className={classes.form}
                    onSubmit={this.submituserRegistrationForm}
                  >
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Sign Up</h4>
                    </CardHeader>
                    <p className={classes.divider}>Share and Connect</p>
                    <CardBody>
                      <CustomInput
                        labelText="Name..."
                        id="username"
                        value={this.state.fields.name}
                        // formControlProps={{
                        //   fullWidth: true
                        // }}
                        inputProps={{
                          name: "name",
                          onChange: this.handleChange,
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <div className="errorMsg">{this.state.errors.name}</div>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        value={this.state.fields.email}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "email",
                          onChange: this.handleChange,
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <div className="errorMsg">{this.state.errors.email}</div>
                      <CustomInput
                        labelText="Password"
                        id="password"
                        value={this.state.fields.password}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "password",
                          onChange: this.handleChange,
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                      <div className="errorMsg">
                        {this.state.errors.password}
                      </div>
                      <CustomInput
                        labelText="Confirm Password"
                        id="password"
                        value={this.state.fields.password_confirmation}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "password_confirmation",
                          onChange: this.handleChange,
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                      <div className="errorMsg">
                        {this.state.errors.password_confirmation}
                      </div>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="primary" size="lg">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(RegisterForm);
