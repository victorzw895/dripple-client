import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import ConnectDripple from "./ConnectDripple";

const Api = require("../lib/Api.js");

// // const SERVER_URL = "http://www.localhost:3000/api/dripples.json";
// const SERVER_URL = "https://dripples.herokuapp.com/api/dripples.json";

class MoreDripples extends Component {
  constructor() {
    super();
    this.state = {
      dripple: [],
      featuredId: null,
      featured: false,
      isLoaded: false,
      dripples: []
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
    // let token = "Bearer " + localStorage.getItem("jwt");

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
          // dripple: currentDripple,
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
    // axios({
    //   method: "get",
    //   url: SERVER_URL,
    //   headers: { Authorization: token }
    // }).then(
    //   response => {
    //     const currentDripple = response.data.find(
    //       dripple => dripple.id === Number(drippleId.featuredId)
    //     );

    //     const categoryResults = response.data.filter(
    //       dripple => dripple.category_id === currentDripple.category_id
    //     );

    //     const drippleTags = currentDripple.tag.map(t => t.id);
    //     const tagResults = response.data.filter(dripple => {
    //       return drippleTags.includes(dripple.tag.id);
    //     });

    //     const finalResults = [...categoryResults, ...tagResults].filter(
    //       dripple => dripple.user_id !== currentDripple.user_id
    //     );
    //     console.log(finalResults, categoryResults, tagResults);
    //     this.setState({
    //       // dripple: currentDripple,
    //       isLoaded: true,
    //       dripples: finalResults
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     });
    //   }
    // );
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
    const { featuredId, featured, dripples } = this.state;
    console.log(dripples);
    let controlOptions;
    if (featured) {
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
      <div>
        <div className="body">
          <SideNavBar />
          <div className="content">
            {dripples.map(dp => (
              <div className="dripple" key={dp.id}>
                <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
                  {dp.title} {dp.content}
                </div>
                {dp.id === featuredId ? controlOptions : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// class ConnectDripple extends Component {
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

export default MoreDripples;
