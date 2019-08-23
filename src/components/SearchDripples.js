import React, { Component } from "react";
import SideNavMaterialUI from "./SideNavMaterialUI";
import ConnectDripple from "./ConnectDripple";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const Api = require("../lib/Api.js");

const BootstrapButton = withStyles({
  root: {
    borderRadius: "100%",
    height: "100px",
    width: "100px",
    margin: "35px",
    backgroundColor: "rgba(100, 181, 246, 8.63)",
    border: "solid 3px rgb(100, 181, 246)"
  }
})(Button);

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
        <div>
          <FormControl>
            <InputLabel shrink htmlFor="category_id">
              Category
            </InputLabel>
            <Select
              value={this.state.category_id} // take value of state after _handleCategory
              onChange={this._handleCategoryChange}
              displayEmpty
              input={<Input name="category" id="category_id" />}
              name="category"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              {this.state.categories.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl>
            <InputLabel shrink htmlFor="tag_id">
              Tag
            </InputLabel>
            <Select
              value={this.state.tag_id} // take value of state after _handleCategory
              onChange={this._handleTagChange}
              displayEmpty
              input={<Input name="tag" id="tag_id" />}
              name="tag"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              {this.state.tags.map(t => (
                <MenuItem key={t.id} value={t.id}>
                  {t.tag_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button type="submit">Search</Button>
      </form>
    );
  }
}

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      featured_id: null,
      featured: false,
      size: null,
      anchorEl: null
    };
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(i, title, content, event) {
    const { featuredId, featured } = this.state;
    if (featuredId === null && !featured) {
      this.setState({ anchorEl: event.currentTarget });
      this.setState({ featuredId: i, featured: !featured });
      if (title.length + content.length <= 15) {
        this.setState({ size: "small" });
      } else if (title.length + content.length <= 30) {
        this.setState({ size: "medium" });
      } else if (title.length + content.length > 30) {
        this.setState({ size: "large" });
      }
    } else if (featured && featuredId === i) {
      this.setState({ anchorEl: null });
      this.setState({ featuredId: null, featured: !featured });
    }
  }

  render() {
    const { featuredId, featured, size, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const smallDripple = {
      height: "150px",
      width: "150px"
    };
    const dripple = {
      height: "180px",
      width: "180px"
    };
    const largeDripple = {
      height: "210px",
      width: "210px"
    };

    let controlOptions;
    let featuredButton;

    if (featured) {
      if (size === "small") {
        featuredButton = smallDripple;
      } else if (size === "medium") {
        featuredButton = dripple;
      } else if (size === "large") {
        featuredButton = largeDripple;
      }
      controlOptions = (
        <div>
          {/* MAYBE */}
          <ConnectDripple
            drippleId={featuredId}
            onSubmit={this._handleConnect}
          />
        </div>
      );
    }
    return (
      <Grid
        container
        justify="space-around"
        alignItems="center"
        style={{ margin: "0 auto" }} // , maxWidth: "960px"
      >
        {this.props.filteredDripples.map(dp => (
          <Box>
            <BootstrapButton
              id={id}
              variant="contained"
              color="primary"
              className="dripple"
              key={dp.id}
              onClick={event =>
                this._handleClick(dp.id, dp.title, dp.content, event)
              }
              style={dp.id === featuredId ? featuredButton : null}
            >
              <Box key={dp.id}>
                {dp.id === featuredId
                  ? `${dp.title} \n ${dp.content}`
                  : dp.title}
              </Box>
            </BootstrapButton>
            {controlOptions}
          </Box>
        ))}
      </Grid>
    );
  }
}

export default SearchDripples;
