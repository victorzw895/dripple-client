import React from "react";
import "../index.css";
import axios from "axios";

// const SERVER_URL = "http://localhost:3000/api/users";
const SERVER_URL = "https://dripples.herokuapp.com/api/users";

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
      this
    );
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
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

    // below is for strong password setting

    // if (typeof fields["password"] !== "undefined") {
    //   if (
    //     !fields["password"].match(
    //       /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
    //     )
    //   ) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter secure and strong password.";
    //   }
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div id="main-registration-container">
        <div id="register">
          <h3>Registration page</h3>
          <form
            method="post"
            name="userRegistrationForm"
            onSubmit={this.submituserRegistrationForm}
          >
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.fields.name}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.name}</div>
            <label>Email ID:</label>
            <input
              type="text"
              name="email"
              value={this.state.fields.email}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.email}</div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.fields.password}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.password}</div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="password_confirmation"
              value={this.state.fields.password_confirmation}
              onChange={this.handleChange}
            />
            <div className="errorMsg">
              {this.state.errors.password_confirmation}
            </div>
            <input type="submit" className="button" value="Register" />
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
