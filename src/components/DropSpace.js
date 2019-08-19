import React, { Component } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import Dripples from "./Dripples";

// const SERVER_URL = "http://www.localhost:3000/api/dripples.json";
const SERVER_URL = "http://www.dripples.herokuapp.com/api/dripples.json";
// const USER_URL = "http://www.localhost:3000/api/users.json";
const USER_URL = "http://www.dripples.herokuapp.com/api/users.json";

class DropSpace extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      dripples: [],
      displayCreate: false
      // user_id: 1 // NEED TO MAKE DYNAMIC
    };

    this._handleClick = this._handleClick.bind(this);
    this.saveDripple = this.saveDripple.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // No need for recursively fetchDripples as this will automatically fetch each time a new Dripple is made by self user.
  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "get",
      url: USER_URL,
      headers: { Authorization: token }
    }).then(response => {
      localStorage.setItem("current_user_id", response.data.user.user_id);
      let user_id = Number(localStorage.getItem("current_user_id"));
      axios({
        method: "get",
        url: SERVER_URL,
        headers: { Authorization: token }
      }).then(
        response => {
          const user_dripples = response.data.filter(dripples => dripples.user_id === user_id)
          this.setState({
            isLoaded: true,
            dripples: user_dripples
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    });
  }

  saveDripple(title, content) {
    console.log("post request", title, content);
    let token = "Bearer " + localStorage.getItem("jwt");
    let user_id = Number(localStorage.getItem("current_user_id"));
    // axios({method: 'post', url: SERVER_URL, headers: {'Authorization': token}, data: {title: title, content: content, user_id: user_id}}).then(response => {
    axios({
      method: "post",
      url: SERVER_URL,
      headers: { Authorization: token },
      data: { title: title, content: content, user_id: user_id }
    }).then(response => {
      console.log(response);
      this.setState({
        dripples: [...this.state.dripples, response.data],
        displayCreate: false
      });
    });
  }

  _handleClick() {
    this.setState({ displayCreate: !this.state.displayCreate });
  }

  render() {
    const { error, isLoaded, dripples, displayCreate } = this.state;
    let createForm;
    if (displayCreate) {
      createForm = (
        <div>
          <CreateDrop onSubmit={this.saveDripple} />
        </div>
      );
    }
    //  else if (!displayCreate) { // seems redundant to add
    //     createForm = null;
    // }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="body">
          <SideNavBar />
          <div className="content">
            <Dripples
              updateDripples={this.componentDidMount}
              allDripples={dripples}
            />
            <button onClick={this._handleClick}>New Dripple</button>
            {createForm}
          </div>
        </div>
      );
    }
  }
}

class CreateDrop extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      user_id: 1 // HARDCODED, NEED TO REPLACE TO CURRENT_USER SESSION
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleTitle = this._handleTitle.bind(this);
    this._handleContent = this._handleContent.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.state.title,
      this.state.content
    );
    this.setState({ title: "", content: "" });
  }

  // Need to save the value inside textarea to state first, so that submit button can take this.state values as parameters when calling parent function onSubmit
  _handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  _handleContent(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <textarea onChange={this._handleTitle} value={this.state.title} />
        <textarea onChange={this._handleContent} value={this.state.content} />
        <input type="submit" value="Save" />
        {/* maybe when fetch new dripple, add new dripple into state with previously populated dripples */}
      </form>
    );
  }
}

export default DropSpace;
