import React from "react";
import NewMessageForm from "./NewMessageForm";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";

class MessagesArea extends React.Component {
  render = () => {
    if (this.props.conversation_id) {
      return (
        <div className="messagesArea">
          <Typography variant="h6">
            <h2>{this.props.title}</h2>
          </Typography>
          <div className="messageDisplay">
            <ul>{orderedMessages(this.props.messages)}</ul>
            <NewMessageForm conversation_id={this.props.conversation_id} />
          </div>
        </div>
      );
    }
    return null;
  };
}

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <ListItemText key={message.id} primary={message.text} />;
  });
};
