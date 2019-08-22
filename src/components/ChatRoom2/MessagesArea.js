import React from "react";
import NewMessageForm from "./NewMessageForm";

class MessagesArea extends React.Component {
  render = () => {
    if (this.props.conversation_id) {
      return (
        <div className="messagesArea">
          <h2>{this.props.title}</h2>
          <ul>{orderedMessages(this.props.messages)}</ul>
          <NewMessageForm conversation_id={this.props.conversation_id} />
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
    return <li key={message.id}>{message.text}</li>;
  });
};
