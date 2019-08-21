import React, { Component } from "react";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import axios from "axios";

const Api = require("../lib/Api.js");

const BootstrapButton = withStyles({
  root: {
    borderRadius: "100%",
    height: "100px",
    width: "100px"
  }
})(Button);

const FeaturedButton = withStyles({
  root: {
    borderRadius: "100%",
    height: "200px",
    width: "200px"
  }
})(Button);

class Dripples extends Component {
  constructor() {
    super();
    this.state = {
      featuredId: null,
      featured: false
    };
    this.saveEdit = this.saveEdit.bind(this);
    this.delete = this.delete.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  saveEdit(title, content, drippleId) {
    Api.saveEdit(title, content, drippleId).then(response => {
      this.props.updateDripples();
      this.setState({ featuredId: null, featured: false });
    });
  }

  delete() {
    Api.deleteDripple(this.state.featuredId).then(response => {
      console.log(response.data);
      this.props.updateDripples();
      this.setState({ featuredId: null, featured: false });
    });
  }

  _handleClick(i) {
    const { featuredId, featured } = this.state;
    if (featuredId === null && !featured) {
      this.setState({ featuredId: i, featured: !featured });
    } else if (featured && featuredId === i) {
      this.setState({ featuredId: null, featured: !featured });
    }
    console.log(this.state);
    console.log("this should zoom into clicked dripple", i);
    console.log("display dripple's text");
  }

  render() {
    const { featuredId, featured } = this.state;

    let controlOptions;
    if (featured) {
      controlOptions = (
        <div>
          <EditDripple drippleId={featuredId} onSubmit={this.saveEdit} />
          <IconButton
            onClick={e => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.delete(e);
            }}
          >
            <DeleteIcon />
          </IconButton>

          <Button
            component={Link}
            to={{
              pathname: "/more_dripples",
              state: { drippleId: { featuredId } }
            }}
          >
            Send Off Dripple
          </Button>
          {/* <Link
            to={{
              pathname: "/more_dripples",
              state: { drippleId: { featuredId } }
            }}
          >
            Send off Dripple
          </Link> */}
        </div>
      );
    }
    return (
      <div>
        <Grid container justify="space-evenly" alignItems="center">
          {this.props.allDripples.map(dp => (
            <Box>
              {dp.id === featuredId ? (
                <FeaturedButton
                  variant="contained"
                  color="primary"
                  className="dripple"
                  key={dp.id}
                  onClick={() => this._handleClick(dp.id)}
                >
                  <Box key={dp.id}>
                    {dp.id === featuredId
                      ? `${dp.title} \n ${dp.content}`
                      : dp.title}
                  </Box>
                </FeaturedButton>
              ) : (
                <BootstrapButton
                  variant="contained"
                  color="primary"
                  className="dripple"
                  key={dp.id}
                  onClick={() => this._handleClick(dp.id)}
                >
                  <Box key={dp.id}>
                    {dp.id === featuredId
                      ? `${dp.title} \n ${dp.content}`
                      : dp.title}
                  </Box>
                </BootstrapButton>
              )}
              {dp.id === featuredId ? controlOptions : null}
            </Box>
          ))}
        </Grid>
      </div>
    );
  }
}

class EditDripple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      id: this.props.drippleId
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleTitle = this._handleTitle.bind(this);
    this._handleContent = this._handleContent.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.title, this.state.content, this.state.id);
    this.setState({ title: "", content: "" });
  }

  _handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  _handleContent(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <Box>
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
          </Box>
          <Box>
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
          </Box>

          <Button type="submit">Update</Button>
        </form>
        {console.log(this.props.drippleId)}
      </div>
    );
  }
}

// class FindDripples extends Component {
//     render() {
//         return (
//             <div>
//                  Get connected with similar dripples coming soon
//                     {/* View list of featured dripples */}
//                     {/* need a like system? dripple grows the more it is liked? turns gold? */}
//                     {/* show dripples according to categories, or tags. Maybe not by location */}
//                 { console.log(this.props.drippleId)}

//             </div>
//         )
//     }
// }

export default Dripples;
