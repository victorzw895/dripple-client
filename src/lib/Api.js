let axios = require("axios");

let apiHost = "http://dripples.herokuapp.com/api/";
// let apiHost = "http://localhost:3000/api/"; // TESTING on LOCAHOST

let token = "Bearer " + localStorage.getItem("jwt");

// let current_user = localStorage.getItem("current_user_id");

// // const SERVER_URL = "http://www.localhost:3000/api/dripples.json";
// const SERVER_URL = "https://dripples.herokuapp.com/api/dripples.json";
// // const USER_URL = "http://www.localhost:3000/api/users.json";
// const USER_URL = "https://dripples.herokuapp.com/api/users.json";
// // const CATEGORY_URL = "http://localhost:3000/api/categories.json";
// const CATEGORY_URL = "https://dripples.herokuapp.com/api/categories.json";
// // const TAG_URL = "http://localhost:3000/api/tags.json";
// const TAG_URL = "https://dripples.herokuapp.com/api/tags.json";

module.exports = {
  login: function(request) {
    return axios.post(`${apiHost}user_token`, request);
    // post("https://dripples.herokuapp.com/api/user_token", request)
    // .then(response => {
    //   console.log(response.data);

    //   localStorage.setItem("jwt", response.data.jwt);
    // })
    // .catch(error => console.log("error, error"));
  },

  getUser: function() {
    console.log("running getUser funciton");
    return axios({
      method: "get",
      url: `${apiHost}users.json`,
      headers: { Authorization: token }
    });
    // .then(response => {
    //   console.log("running");
    //   // localStorage.setItem(
    //   //   "current_user_id",
    //   //   Number(response.data.user.user_id)
    //   // );
    //   return response;
    // })
    // .catch(error => {
    //   console.log("running error");

    //   return undefined;
    // });
  },

  newDripple(title, content, user_id, category_id, tag_ids) {
    return axios({
      method: "post",
      url: `${apiHost}dripples.json`,
      headers: { Authorization: token },
      data: {
        title: title,
        content: content,
        user_id: user_id,
        category_id: category_id,
        tag: tag_ids
      }
    });
    // .then(response => {
    //   return response;
    // })
    // .catch(error => {
    //   return undefined;
    // });
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
        return response;
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
        return response;
      })
      .catch(error => {
        return undefined;
      });
  },

  renderDripples: function() {
    return axios({
      method: "get",
      url: `${apiHost}dripples.json`,
      headers: { Authorization: token }
    });
    // .then(response => {
    //   return response;
    // })
    // .catch(error => {
    //   return undefined;
    // });
  },

  getCategories: function() {
    return axios({
      method: "get",
      url: `${apiHost}categories.json`,
      headers: { Authorization: token }
    });
    // .then(response => {
    //   return response;
    // })
    // .catch(error => {
    //   return undefined;
    // });
  },

  getTags: function() {
    return axios({
      method: "get",
      url: `${apiHost}tags.json`,
      headers: { Authorization: token }
    });
    // .then(response => {
    //   return response;
    // })
    // .catch(error => {
    //   return undefined;
    // });
  },

  addNewTags(newTags) {
    return axios({
      method: "post",
      url: `${apiHost}tags.json`,
      headers: { Authorization: token },
      data: { id: ["#tst", "#test"] }
    });
    // .then(response => {
    //   console.log(response);
    //   return response;
    // });
  }
};
