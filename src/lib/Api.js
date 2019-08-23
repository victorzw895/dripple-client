let axios = require("axios");

let apiHost = "http://dripples.herokuapp.com/api/";
// let apiHost = "http://localhost:3000/api/"; // TESTING on LOCAHOST

module.exports = {
  login: function(request) {
    return axios.post(`${apiHost}user_token`, request);
  },

  getUser: function(token) {
    console.log("running getUser funciton");

    return axios({
      method: "get",
      url: `${apiHost}users.json`,
      headers: { Authorization: token }
    });
  },

  newDripple(title, content, user_id, category_id, tag_ids) {
    let token = "Bearer " + localStorage.getItem("jwt");

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
  },

  saveEdit: function(title, content, drippleId) {
    let token = "Bearer " + localStorage.getItem("jwt");

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
    let token = "Bearer " + localStorage.getItem("jwt");

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
    let token = "Bearer " + localStorage.getItem("jwt");

    return axios({
      method: "get",
      url: `${apiHost}dripples.json`,
      headers: { Authorization: token }
    });
  },

  getCategories: function() {
    let token = "Bearer " + localStorage.getItem("jwt");

    return axios({
      method: "get",
      url: `${apiHost}categories.json`,
      headers: { Authorization: token }
    });
  },

  getTags: function() {
    let token = "Bearer " + localStorage.getItem("jwt");

    return axios({
      method: "get",
      url: `${apiHost}tags.json`,
      headers: { Authorization: token }
    });
  },

  addDrippleTags(new_tags, dripple_id) {
    let token = "Bearer " + localStorage.getItem("jwt");

    return axios({
      method: "post",
      url: `${apiHost}tags.json`,
      headers: { Authorization: token },
      data: { tag_name: new_tags, dripple_id: dripple_id }
    });
  }
};
