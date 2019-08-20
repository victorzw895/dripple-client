import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.cable.subscriptions.subscriptions[0].speak({
      message: this.state.body
    });
    this.setState({ body: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            id="send-message"
            label="Messge"
            value={this.state.body}
            onChange={this.update("body")}
            autoComplete='off'
            type='text'
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default MessageForm;
