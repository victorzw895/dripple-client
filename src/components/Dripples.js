import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Api = require("../lib/Api.js");

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
          {/* <DeleteDripple drippleId={ featuredId } onSubmit={ this.saveDelete } /> */}
          <button
            onClick={e => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.delete(e);
            }}
          >
            Delete
          </button>
          {/* <FindDripples drippleId={ featuredId } onSubmit={ this._handleConnect } />
                    <button onClick={ this._handleConnect }>Find Dripples</button> */}
          <Link
            to={{
              pathname: "/more_dripples",
              state: { drippleId: { featuredId } }
            }}
          >
            Send off Dripple
          </Link>
          {/* <Link to="more_dripples" drippleId={ featuredId }>Send off Dripple</Link> */}
        </div>
      );
    }
    return (
      <div>
        {this.props.allDripples.map(dp => (
          <div className="dripple" key={dp.id}>
            <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
              {dp.title} {dp.content}
            </div>
            {dp.id === featuredId ? controlOptions : null}
          </div>
        ))}
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
          <textarea onChange={this._handleTitle} value={this.state.title} />
          <textarea onChange={this._handleContent} value={this.state.content} />
          <button type="submit">Update</button>
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
