import React from "react";
import NewMessageForm from "./NewMessageForm";

const MessagesArea = ({ conversation, handleFirstTime }) => {
  if (conversation) {
    handleFirstTime();
    return (
      <div className="messagesArea">
        <h2>{conversation.title}</h2>
        <ul>{orderedMessages(conversation.messages)}</ul>
        <NewMessageForm conversation_id={conversation.id} />
      </div>
    );
  }
  return null;
};

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
