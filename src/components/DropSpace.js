import React, { Component } from "react";
import SideNavMaterialUI from "./SideNavMaterialUI";
import Dripples from "./Dripples";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Popper from "@material-ui/core/Popper";

// import p5 from "p5";

const Api = require("../lib/Api.js");

class DropSpace extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      dripples: [],
      displayCreate: false,
      longitude: "",
      latitude: "",
      reloadOnce: true,
      anchorEl: null
    };

    this._handleClick = this._handleClick.bind(this);
    this.saveDripple = this.saveDripple.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    // const [anchorEl, setAnchorEl] = React.useState(null);
  }

  // No need for recursively fetchDripples as this will automatically fetch each time a new Dripple is made by self user.
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(success =>
      this.setState({
        latitude: success.coords.latitude,
        longitude: success.coords.longitude
      })
    );
    console.log("updating");
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
  }

  saveDripple(title, content, categoryId, newTags) {
    console.log("saving dripple");
    let user_id = Number(localStorage.getItem("current_user_id"));
    Api.newDripple(title, content, user_id, categoryId).then(response => {
      console.log("new dripple id:", response.data.id);
      Api.addDrippleTags(newTags, response.data.id)
        .then(result => {
          console.log(result.data);
        })
        .then(
          Api.renderDripples().then(finalResult => {
            console.log(finalResult.data);
            const user_dripples = finalResult.data.filter(
              dripples => dripples.user_id === user_id
            );
            console.log(user_dripples);
            this.setState({
              dripples: user_dripples,
              displayCreate: false
            });
          })
        );
    });
  }

  _handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ displayCreate: !this.state.displayCreate });
  }

  render() {
    const { error, isLoaded, dripples, displayCreate, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    let createForm;
    if (displayCreate) {
      createForm = (
        <div>
          <CreateDrop onSubmit={this.saveDripple} />
        </div>
      );
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="body">
          <SideNavMaterialUI />
          <div className="content">
            <Dripples
              updateDripples={this.componentDidMount}
              allDripples={dripples}
            />
            <Fab
              color="primary"
              aria-label={id}
              onClick={this._handleClick}
              style={{ position: "fixed", right: "20px", bottom: "16px" }}
            >
              {displayCreate ? <CloseIcon /> : <AddIcon />}
            </Fab>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="right-end"
              disablePortal={false}
              modifiers={{
                flip: {
                  enabled: true
                },
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "undefined"
                }
              }}
            >
              {createForm}
            </Popper>
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
    const { title, content, categoryId, newTags } = this.state;

    if (title === "" && content === "" && categoryId === 0) {
      return;
    }
    console.log("running this");
    event.preventDefault();
    console.log(this.state.newTags);

    this.props.onSubmit(title, content, categoryId, newTags);
    this.setState({
      title: "",
      content: "",
      categoryId: 0,
      newTags: []
    });
  }

  // Need to save the value inside TextField to state first, so that submit button can take this.state values as parameters when calling parent function onSubmit
  _handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  _handleContent(e) {
    this.setState({ content: e.target.value });
  }

  _handleCategory(e) {
    const selectedIndex = e.target.value;
    console.log(selectedIndex);
    this.setState({ categoryId: selectedIndex });
  }

  _handleTags(e) {
    let drippleTags = e.target.value;
    drippleTags = drippleTags.split(" ");
    drippleTags = drippleTags.filter(
      tag => tag.charAt(0) === "#" && tag.charAt(1) !== ""
    );

    this.setState({ newTags: drippleTags });
  }

  render() {
    return (
      <form
        onSubmit={this._handleSubmit}
        style={{
          borderRadius: "100%",
          margin: "10px",
          padding: "45px",
          backgroundColor: "aliceblue",
          height: "220px",
          width: "220px"
        }}
      >
        <TextField
          onChange={this._handleTitle}
          value={this.state.title}
          id="outlined-dense-multiline"
          label="Title"
          margin="dense"
          variant="outlined"
          multiline
          rowsMax="4"
        />
        <TextField
          onChange={this._handleContent}
          value={this.state.content}
          id="outlined-dense-multiline"
          label="Content"
          margin="dense"
          variant="outlined"
          multiline
          rowsMax="4"
        />
        <div>
          <FormControl>
            <InputLabel shrink htmlFor="category_id">
              Category
            </InputLabel>
            <Select
              value={this.state.categoryId} // take value of state after _handleCategory
              onChange={this._handleCategory}
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

        <TextField onChange={this._handleTags} />
        <Button type="submit">Save</Button>
      </form>
    );
  }
}

export default DropSpace;
