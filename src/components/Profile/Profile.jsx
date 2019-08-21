import React, { Component } from "react";
import SideNavBar from "../SideNavBar";
import axios from "axios";
import { Link } from "react-router-dom";

const SERVER_URL = "http://www.localhost:3000/api/users/";
const user_id = localStorage.getItem("current_user_id");

class Profile extends Component {
  constructor() {
    super();
    this.state = { data: {} };
    // define function to get information from the api here
    axios.get(SERVER_URL + `/${user_id}.json`).then(result => {
      this.setState({ data: result.data });
      console.log(result.data);
    });
  }

  render() {
    return (
      <div className="body">
        <SideNavBar />
        <div className="content">
          <div className="imageRecentDripples">
            <ProfilePhoto avatar={this.state.data.profile_photo} />
            <RecentDripples />
          </div>
          <div className="aboutSection">
            <InfoSection info={this.state.data} />
          </div>
          <div className="actions">
            <Actions />
          </div>
        </div>
      </div>
    );
  }
}

class ProfilePhoto extends Component {
  render() {
    return <img style={{ width: "300px" }} src={this.props.avatar} />;
  }
}

class RecentDripples extends Component {
  render() {
    return (
      <div>
        <p>Recent Dripples coming soon</p>
      </div>
    );
  }
}

class InfoSection extends Component {
  render() {
    const { name, about, age, birthday, hobbies } = this.props.info;

    return (
      <div>
        <h1>{name}</h1>
        <div className="general-info">
          <h3>General Information</h3>
          <p>Age: {age} </p>
          <p>Birthday: {birthday}</p>
          <p>About: {about}</p>
          <p>Hobbies: {hobbies}</p>
        </div>
      </div>
    );
  }
}

class Actions extends Component {
  render() {
    return (
      <div className="actions">
        <h3>Actions</h3>
        <div className="edit">
          <Link to="/profile/edit">Edit Profile</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
