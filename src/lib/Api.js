let axios = require("axios");

let apiHost = "http://dripples.herokuapp.com/api/";
// let apiHost = "http://www.localhost:3000/api/"; // TESTING on LOCAHOST

let token = "Bearer " + localStorage.getItem("jwt");

// // const SERVER_URL = "http://www.localhost:3000/api/dripples.json";
// const SERVER_URL = "https://dripples.herokuapp.com/api/dripples.json";
// // const USER_URL = "http://www.localhost:3000/api/users.json";
// const USER_URL = "https://dripples.herokuapp.com/api/users.json";
// // const CATEGORY_URL = "http://localhost:3000/api/categories.json";
// const CATEGORY_URL = "https://dripples.herokuapp.com/api/categories.json";
// // const TAG_URL = "http://localhost:3000/api/tags.json";
// const TAG_URL = "https://dripples.herokuapp.com/api/tags.json";

module.exports = {
  getCurrentUser: function(jwt) {
    var config = {
      headers: {}
    };
    if (token) {
      config["headers"]["Authorization"] = token;
    }
    return axios
      .get(apiHost + "/api/users/current", config)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  newDripple(title, content, user_id) {
    axios({
      method: "post",
      url: `${apiHost}dripples.json`,
      headers: { Authorization: token },
      data: { title: title, content: content, user_id: user_id }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  saveEdit: function(title, content, drippleId) {
    if (title === "" && content === "") {
      return;
    }
    console.log("inside API", title, content, drippleId);

    return axios({
      method: "put",
      url: `${apiHost}dripples/${drippleId}.json`,
      headers: { Authorization: token },
      data: { title: title, content: content, id: drippleId }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  deleteDripple: function(featuredId) {
    alert("Are you sure?");
    return axios({
      method: "delete",
      url: `${apiHost}dripples/${featuredId}.json`,
      headers: { Authorization: token }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  getUser: function() {
    console.log("running getUser funciton");
    return axios({
      method: "get",
      url: `${apiHost}users.json`,
      headers: { Authorization: token }
    })
      .then(response => {
        console.log("running");
        localStorage.setItem(
          "current_user_id",
          Number(response.data.user.user_id)
        );
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  updateDripplesRender: function() {
    return axios({
      method: "get",
      url: `${apiHost}dripples.json`,
      headers: { Authorization: token }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  getCategories: function() {
    return axios({
      method: "get",
      url: `${apiHost}categories.json`,
      headers: { Authorization: token }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  getTags: function() {
    return axios({
      method: "get",
      url: `${apiHost}tags.json`,
      headers: { Authorization: token }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return undefined;
      });
  },

  addNewTags: function(newTags) {
    return axios({
      method: "post",
      url: `${apiHost}tags.json`,
      headers: { Authorization: token },
      data: newTags
    }).then(response => {
      console.log(response.data);
      return response.data;
    });
  }
};
