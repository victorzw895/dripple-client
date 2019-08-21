import React, { Component } from "react";
import SideNavMaterialUI from "./SideNavMaterialUI";

const Api = require("../lib/Api.js");

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async
  handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const request = { auth: { email: email, password: password } };

    Api.login(request).then(response => {
      console.log(response.data);
      localStorage.setItem("jwt", response.data.jwt);
      Api.getUser(response.data.jwt)
        .then(result => {
          console.log("user login success!");
          console.log(result.data.user.user_id);
          localStorage.setItem("current_user_id", result.data.user.user_id);
          window.location.reload();
        })
        .catch(error => {
          console.log("failed to get user");
          return;
        });
    });

    this.props.history.push("/dropspace");
  }

  render() {
    return (
      <div>
        <SideNavMaterialUI />
        <div className="content">
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
      </div>
    );
  }
}

export default Login;
