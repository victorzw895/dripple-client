import React, { Component } from "react";
import { Link } from "react-router-dom";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Popper from "@material-ui/core/Popper";

// DATABASE REQUESTS
const Api = require("../lib/Api.js");

// CUSTOMIZING MATERIAL UI CSS
const BootstrapButton = withStyles({
  root: {
    borderRadius: "100%",
    height: "100px",
    width: "100px",
    margin: "35px"
  }
})(Button);

// LOAD DRIPPLES IN PAGE
class Dripples extends Component {
  constructor() {
    super();
    this.state = {
      featuredId: null,
      featured: false,
      size: null,
      anchorEl: null
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
    console.log(this.state);
    console.log("this should zoom into clicked dripple", i);
    console.log("display dripple's text");
    console.log(title.length, content.length);
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
          <EditDripple drippleId={featuredId} onSubmit={this.saveEdit} />

          <Button
            style={{ marginLeft: "15px" }}
            component={Link}
            to={{
              pathname: "/more_dripples",
              state: { drippleId: { featuredId } }
            }}
          >
            Send Off Dripple
          </Button>

          <IconButton
            style={{ marginRight: "15px", marginBottom: "2px" }}
            onClick={e => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.delete(e);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    }
    return (
      <div>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          style={{ margin: "0 auto" }} // , maxWidth: "960px"
        >
          {this.props.allDripples.map(dp => (
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
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="top"
                disablePortal={true}
                modifiers={{
                  flip: {
                    enabled: true
                  },
                  preventOverflow: {
                    enabled: true,
                    boundariesElement: "undefined"
                  },
                  arrow: {
                    enabled: true,
                    element: "arrowRef"
                  }
                }}
                style={{
                  zIndex: "20000",
                  backgroundColor: "rgba(236,239,241 ,1)",
                  borderRadius: "10px"
                  // padding: "10px"
                }}
              >
                {dp.id === featuredId ? controlOptions : null}
              </Popper>
              {/* {dp.id === featuredId ? controlOptions : null} */}
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
          <Box style={{ margin: "15px" }}>
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
          <Box style={{ margin: "15px" }}>
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

          <Button style={{ margin: "0 15px" }} type="submit">
            Update
          </Button>
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
