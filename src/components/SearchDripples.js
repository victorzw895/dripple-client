import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import SideNavMaterialUI from "./SideNavMaterialUI";
import ConnectDripple from "./ConnectDripple";
import axios from "axios";

const Api = require("../lib/Api.js");

// // const CATEGORY_URL = "http://localhost:3000/api/categories.json";
// const CATEGORY_URL = "https://dripples.herokuapp.com/api/categories.json";
// // const TAG_URL = "http://localhost:3000/api/tags.json";
// const TAG_URL = "https://dripples.herokuapp.com/api/tags.json";
// // const DRIPPLE_URL = "http://localhost:3000/api/dripples.json";
// const DRIPPLE_URL = "https://dripples.herokuapp.com/api/dripples.json";

class SearchDripples extends Component {
  constructor() {
    super();
    this.state = {
      dripples: []
    };
    this.saveSearch = this.saveSearch.bind(this);
  }

  saveSearch(c_id, t_id) {
    Api.renderDripples().then(response => {
      console.log(response.data);
      const categoryFilter =
        c_id === 0
          ? response.data
          : response.data.filter(fdp => fdp.category_id === c_id);
      const allFilter =
        t_id === 0
          ? categoryFilter
          : categoryFilter.filter(fdp => {
              return fdp.tag.some(t => t.id === t_id);
            });
      this.setState({ dripples: allFilter });
    });
    // const token = "Bearer " + localStorage.getItem("jwt");
    // console.log(c_id, t_id);
    // axios({
    //   method: "get",
    //   url: DRIPPLE_URL,
    //   headers: { Authorization: token }
    // }).then(response => {
    //   console.log(response.data);
    //   const categoryFilter =
    //     c_id === 0
    //       ? response.data
    //       : response.data.filter(fdp => fdp.category_id === c_id);
    //   const allFilter =
    //     t_id === 0
    //       ? categoryFilter
    //       : categoryFilter.filter(fdp => {
    //           return fdp.tag.some(t => t.id === t_id);
    //         });
    //   this.setState({ dripples: allFilter });
    // });
  }

  render() {
    return (
      <div className="body">
        <SideNavMaterialUI />
        <div className="content">
          <SearchForm onSubmit={this.saveSearch} />
          <SearchResults filteredDripples={this.state.dripples} />
        </div>
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      tags: [],
      category_id: 0,
      tag_id: 0
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCategoryChange = this._handleCategoryChange.bind(this);
    this._handleTagChange = this._handleTagChange.bind(this);
  }

  componentDidMount() {
    Api.getCategories().then(response => {
      console.log(response.data);
      this.setState({ categories: response.data });
    });
    Api.getTags().then(response => {
      console.log(response.data);
      this.setState({ tags: response.data });
    });
    // let token = "Bearer " + localStorage.getItem("jwt");
    // axios({
    //   method: "get",
    //   url: CATEGORY_URL,
    //   headers: { Authorization: token }
    // }).then(response => {
    //   console.log(response.data);
    //   this.setState({ categories: response.data });
    // });
    // axios({
    //   method: "get",
    //   url: TAG_URL,
    //   headers: { Authorization: token }
    // }).then(response => {
    //   console.log(response.data);
    //   this.setState({ tags: response.data });
    // });
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log("see state when submitting", this.state);
    this.props.onSubmit(this.state.category_id, this.state.tag_id);
  }

  _handleCategoryChange(e) {
    let selectedId;
    if (isNaN(e.target.value)) {
      selectedId = 0;
    } else {
      selectedId = Number(e.target.value);
    }
    console.log(e.target.value);
    console.log(selectedId);

    this.setState({ category_id: selectedId });
  }

  _handleTagChange(e) {
    // const selectedId = Number(e.target.value);
    let selectedId;
    if (isNaN(e.target.value)) {
      selectedId = 0;
    } else {
      selectedId = Number(e.target.value);
    }
    console.log(selectedId);
    this.setState({ tag_id: selectedId });
    console.log(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <label>Category</label>
        <select onChange={this._handleCategoryChange}>
          <option>None</option>
          {this.state.categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label>Tag</label>
        <select onChange={this._handleTagChange}>
          <option>None</option>
          {this.state.tags.map(t => (
            <option key={t.id} value={t.id}>
              {t.tag_name}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
    );
  }
}

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      featured_id: null,
      featured: false
    };
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(i) {
    const { featured_id, featured } = this.state;
    if (featured_id === null && !featured) {
      this.setState({ featured_id: i, featured: !featured });
    } else if (featured && featured_id === i) {
      this.setState({ featured_id: null, featured: !featured });
    }
  }

  render() {
    const { featured_id, featured } = this.state;
    let controlOptions;
    if (featured) {
      controlOptions = (
        <div>
          {/* MAYBE */}
          <ConnectDripple
            drippleId={featured_id}
            onSubmit={this._handleConnect}
          />
        </div>
      );
    }
    return (
      <div>
        {this.props.filteredDripples.map(dp => (
          <div className="dripple" key={dp.id}>
            <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
              {dp.title} {dp.content}
            </div>
            {dp.id === featured_id ? controlOptions : null}
          </div>
        ))}
      </div>
    );
  }
}

export default SearchDripples;
