import React, { Component } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import Dripples from "./Dripples";

const Api = require("../lib/Api.js");

// // const SERVER_URL = "http://www.localhost:3000/api/dripples.json";
// const SERVER_URL = "https://dripples.herokuapp.com/api/dripples.json";
// // const USER_URL = "http://www.localhost:3000/api/users.json";
// const USER_URL = "https://dripples.herokuapp.com/api/users.json";
// // const CATEGORY_URL = "http://localhost:3000/api/categories.json";
// const CATEGORY_URL = "https://dripples.herokuapp.com/api/categories.json";
// // const TAG_URL = "http://localhost:3000/api/tags.json";
// const TAG_URL = "https://dripples.herokuapp.com/api/tags.json";

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
    console.log("updating");
    // Api.getUser()
    //   .then(result => {
    //     console.log("user login success!");
    //     console.log(result.data.user.user_id);
    //     localStorage.setItem("current_user_id", result.data.user.user_id);
    //   })
    //   .catch(error => {
    //     console.log("failed to get user");
    //     return;
    //   });

    // Api.getUser().then(response => {
    let user_id = Number(localStorage.getItem("current_user_id"));
    console.log(user_id);

    Api.renderDripples().then(
      response => {
        console.log(response.data);
        const user_dripples = response.data.filter(
          dripples => dripples.user_id === user_id
        );
        console.log(user_dripples);
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
    // });
  }

  saveDripple(title, content, categoryId, tagIds) {
    let user_id = Number(localStorage.getItem("current_user_id"));
    Api.newDripple(title, content, user_id, categoryId, tagIds).then(
      response => {
        this.setState({
          dripples: [...this.state.dripples, response.data],
          displayCreate: false
        });
      }
    );
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
      categories: [],
      categoryId: 0,
      tags: [],
      tagsIds: [23, 25],
      newTags: []
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleTitle = this._handleTitle.bind(this);
    this._handleContent = this._handleContent.bind(this);
    this._handleCategory = this._handleCategory.bind(this);
    this._handleTags = this._handleTags.bind(this);
  }

  componentDidMount() {
    Api.getCategories().then(response => {
      this.setState({ categories: response.data });
    });
    Api.getTags().then(response => {
      this.setState({ tags: response.data });
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.newTags);
    // Api.addNewTags(this.state.newTags).then(response => {
    //   this.setState({ tags: response.data });
    // });
    // .then(response => {
    this.props.onSubmit(
      this.state.title,
      this.state.content,
      this.state.categoryId,
      this.state.tagIds
    );
    this.setState({
      title: "",
      content: "",
      categoryId: 0,
      tagIds: []
    });
    // });

    //   let user_id = Number(localStorage.getItem("current_user_id"));
    // Api.newDripple(title, content, user_id).then(response => {
    //   this.setState({
    //     dripples: [...this.state.dripples, response.data],
    //     displayCreate: false
    //   });
    // });
    // Api.getTags().then(response => {
    //   this.setState({ tags: response.data });
    // });
    // this.setState({ tagsId: drippleTags });

    // Api.getTags().then(response => {
    //   this.setState({ tags: response.data });
    // });

    // this.props.onSubmit(
    //   this.state.title,
    //   this.state.content,
    //   this.state.categoryId,
    //   this.state.dripple_tags
    // );
    // this.setState({
    //   title: "",
    //   content: "",
    //   categoryId: 0,
    //   dripple_tags: []
    // });
  }

  // Need to save the value inside textarea to state first, so that submit button can take this.state values as parameters when calling parent function onSubmit
  _handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  _handleContent(e) {
    this.setState({ content: e.target.value });
  }

  _handleCategory(e) {
    const selectedIndex = e.target.options.selectedIndex;
    console.log(selectedIndex);
    this.setState({ categoryId: selectedIndex });
  }

  _handleTags(e) {
    const tags = this.state.tags.map(t => t.tag_name);
    // let token = "Bearer " + localStorage.getItem("jwt");

    let drippleTags = e.target.value;
    drippleTags = drippleTags.split(" ");
    drippleTags = drippleTags.filter(
      tag => tag.charAt(0) === "#" && tag.charAt(1) !== ""
    );

    let newTags = drippleTags.filter(t => {
      return !tags.includes(t);
    });
    this.setState({ newTags: newTags });
    // console.log(newTags);

    // Api.addNewTags(newTags).then(response => {
    //   this.setState({ tagsId: response.data });
    // });
    // Api.getTags().then(response => {
    //   this.setState({ tags: response.data });
    // });
    this.setState({ tagsId: drippleTags });
    // axios({
    //   method: "post",
    //   url: TAG_URL,
    //   headers: { Authorization: token },
    //   data: { id: title, tag_name: content, dripple_id: user_id }
    // }).then(response => {
    //   this.setState({});
    // });
    console.log(tags);
    console.log(this.state.tags);
    console.log(newTags);
    // axios({ method: "post" });
    // check if each element in array starts with # followed by any character
    // change style for those that obey hashtag rule
    // dont allow submit without following rule.
    // diplsay error

    console.log(drippleTags);
    // this.setState({ tags: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <textarea onChange={this._handleTitle} value={this.state.title} />
        <textarea onChange={this._handleContent} value={this.state.content} />
        <label>Category</label>
        <select onChange={this._handleCategory}>
          <option>None</option>
          {this.state.categories.map(c => (
            <option key={c.id} data-key={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <textarea onChange={this._handleTags} />
        {/* <textarea onChange={this._handleTags} value={this.state.tags} /> */}
        <input type="submit" value="Save" />
        {/* maybe when fetch new dripple, add new dripple into state with previously populated dripples */}
      </form>
    );
  }
}

export default DropSpace;
