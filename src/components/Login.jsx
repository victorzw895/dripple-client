import React, { Component } from "react";
import { post } from "axios";

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const request = { auth: { email: email, password: password } };
    // post("http://www.dripples.herokuapp.com/api/user_token", request)
    post("http://www.localhost:3000/api/user_token", request)
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt);
        this.props.history.push("/dropspace");
      })
      .catch(error => console.log("error, error"));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email" type="email">
              Email:
            </label>
            <input name="email" id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
