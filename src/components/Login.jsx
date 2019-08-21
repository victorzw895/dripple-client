import React, { Component } from "react";
import { post } from "axios";

const Api = require("../lib/Api.js");

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

    Api.login(request).then(response => {
      console.log(response.data);
      localStorage.setItem("jwt", response.data.jwt);
      document.cookie = "X-Authorization=" + response.data.jwt + "; path=/";

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

    // post("https://dripples.herokuapp.com/api/user_token", request)
    //   .then(response => {
    //     console.log(response.data);

    //     localStorage.setItem("jwt", response.data.jwt);
    //   })
    //   .catch(error => console.log("error, error"));
    // Api.getUser()
    //   .then(result => {
    //     console.log("user login success!");
    //     console.log(result.data.user.user_id);
    //     localStorage.setItem("current_user_id", result.data.user.user_id);
    //   })
    //   .catch(error => {
    //     console.log("failed to get user");
    //     return;
    //   })
    // .then(this.props.history.push("/dropspace"));
    // window.location.reload(true);

    this.props.history.push("/dropspace");
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
