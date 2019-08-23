import React, { Component } from "react";
import ConnectDripple from "./ConnectDripple";
import SideNavMaterialUI from "./SideNavMaterialUI";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";

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

class MoreDripples extends Component {
  constructor() {
    super();
    this.state = {
      dripple: [],
      featuredId: null,
      featured: false,
      isLoaded: false,
      dripples: [],
      size: null,
      anchorEl: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/dropspace");
      return;
    }
    const { drippleId } = this.props.location.state;

    Api.renderDripples().then(
      response => {
        const currentDripple = response.data.find(
          dripple => dripple.id === Number(drippleId.featuredId)
        );

        const categoryResults = response.data.filter(
          dripple => dripple.category_id === currentDripple.category_id
        );

        const drippleTags = currentDripple.tag.map(t => t.id);
        const tagResults = response.data.filter(dripple => {
          return drippleTags.includes(dripple.tag.id);
        });

        const finalResults = [...categoryResults, ...tagResults].filter(
          dripple => dripple.user_id !== currentDripple.user_id
        );
        console.log(finalResults, categoryResults, tagResults);
        this.setState({
          isLoaded: true,
          dripples: finalResults
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
    const { featuredId, featured, dripples, size, anchorEl } = this.state;
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
          <ConnectDripple
            drippleId={featuredId}
            onSubmit={this._handleConnect}
          />
        </div>
      );
    }
    return (
      <div className="body">
        <SideNavMaterialUI />
        {/* <div className="content">
          {dripples.map(dp => (
            <div className="dripple" key={dp.id}>
              <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
                {dp.title} {dp.content}
              </div>
              {dp.id === featuredId ? controlOptions : null}
            </div>
          ))}
        </div> */}
        <Grid
          container
          justify="space-around"
          alignItems="center"
          style={{ margin: "0 auto" }} // , maxWidth: "960px"
        >
          {dripples.map(dp => (
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
            </Box>
          ))}
        </Grid>
      </div>
    );
  }
}

export default MoreDripples;
