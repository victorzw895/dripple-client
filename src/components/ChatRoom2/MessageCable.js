import React, { Fragment } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";

const MessageCable = ({ conversations, handleReceivedMessage }) => {
  console.log("how many times?????");
  return (
    <Fragment>
      {conversations.map(conversation => {
        return (
          <ActionCableConsumer
            key={conversation.id}
            channel={{
              channel: "MessagesChannel",
              conversation: conversation.id
            }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};
export default MessageCable;
