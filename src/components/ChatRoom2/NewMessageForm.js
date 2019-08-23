import React from "react";
import { API_ROOT, HEADERS } from "./constants";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: "" });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="standard-name"
            type="text"
            label="New Message"
            value={this.state.text}
            onChange={this.handleChange}
            margin="normal"
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
