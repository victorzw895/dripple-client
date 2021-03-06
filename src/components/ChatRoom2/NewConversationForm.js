import React from "react";
import { API_ROOT, HEADERS } from "./constants";
import TextField from "@material-ui/core/TextField";

class NewConversationForm extends React.Component {
  state = {
    title: "",
    sender_id: localStorage.getItem("current_user_id"),
    receiver_id: this.props.receiver_id
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/conversations`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ title: "" });
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <TextField
            id="standard-name"
            label="New Conversation"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            margin="normal"
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
