import React from "react";

import MessagesArea from "./MessagesArea";

import { API_WS_ROOT, API_ROOT, HEADERS } from "./constants";
import Cable from "actioncable";

let cable = Cable.createConsumer(API_ROOT + "/cable");

const currentUserID = Number(localStorage.getItem("current_user_id"));

const createConvo = (sender_id, receiver_id, receiver_name) => {
  return fetch(`${API_ROOT}/conversations`, {
    method: "POST",
    headers: HEADERS,
    // TODO: title should be the receiver name
    body: JSON.stringify({ title: receiver_name, sender_id, receiver_id })
  });
};
class Conversations extends React.Component {
  state = {
    conversations: []
  };
  appendNewConversation = conversation => {
    const conversations = [...this.state.conversations, conversation];
    this.setState({ conversations });
  };
  componentDidMount() {
    cable.subscriptions.create(
      { channel: "ConversationsChannel" },
      {
        received: data => {
          const { conversation } = data;
          this.setState({
            conversations: [...this.state.conversations, conversation]
          });
        }
      }
    );
  }

  render = () => {
    return <ConversationsList {...this.props} {...this.state} cable={cable} />;
  };
}
export default Conversations;

class ConversationsList extends React.Component {
  state = {
    conversations: this.props.conversations,
    activeConversation: null,
    receiverName: "",
    messageSubscribed: false
  };

  componentDidMount = () => {
    console.log("THE FUCKING PROPS:::::", this.props);

    fetch(`${API_ROOT}/conversations`, {
      method: "GET",
      headers: HEADERS
    })
      .then(res => res.json())
      .then(conversations => {
        let activeConversation = null;
        let receiverName = null;
        for (let i = 0; i < conversations.length; i++) {
          for (let j = 0; j < conversations[i].users.length; j++) {
            if (
              this.props.location.receiver_id === conversations[i].users[j].id
            ) {
              console.log("we found the receiver!");
              activeConversation = conversations[i];
              receiverName = conversations[i].users[j].name;
              this.setState({
                conversations: conversations,
                activeConversation: activeConversation.id,
                receiverName: receiverName
              });
            }
          }
        }

        if (
          this.props.location.receiver_id &&
          (activeConversation === null || activeConversation === undefined)
        ) {
          console.log("we didnt find the receiver :(");

          createConvo(
            currentUserID,
            this.props.location.receiver_id,
            this.props.location.receiver_name
          ).then(response => {
            console.log("created a new one!", response);
            activeConversation = response.id;
            conversations = [...conversations, response];
            this.setState({
              conversations: conversations,
              activeConversation: activeConversation ? activeConversation.id : 0
            });
            cable.subscriptions.create(
              {
                channel: "MessagesChannel",
                conversation: response.id
              },
              {
                received: data => {
                  const { message } = data;
                  console.log("RECEIVE MESSAGE RESPONSE", data);
                  const conversations = [...this.state.conversations];
                  const conversation = conversations.find(
                    conversation => conversation.id === message.conversation_id
                  );
                  conversation.messages = [...conversation.messages, message];
                  console.log("current state before:  ", this.state);
                  this.setState({ conversations });
                }
              }
            );
          });
        }

        this.setState({
          conversations: conversations,
          activeConversation: activeConversation ? activeConversation.id : 0
        });
      });
  };

  handleClick = id => {
    if (!this.state.messageSubscribed) {
      cable.subscriptions.create(
        {
          channel: "MessagesChannel",
          conversation: id
        },
        {
          received: data => {
            const { message } = data;
            console.log("RECEIVE MESSAGE RESPONSE", data);
            const conversations = [...this.state.conversations];
            const conversation = conversations.find(
              conversation => conversation.id === message.conversation_id
            );
            conversation.messages = [...conversation.messages, message];
            console.log("current state before:  ", this.state);
            this.setState({ conversations });
          }
        }
      );
    }

    this.setState({ activeConversation: id, messageSubscribed: true });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  appendNewConversation = conversation => {
    const conversations = [...this.state.conversations, conversation];
    this.setState({ conversations });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    console.log("RECEIVE MESSAGE RESPONSE", response);
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    console.log("current state before:  ", this.state);
    this.setState({ conversations });

    console.log("current state after:  ", this.state);
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    console.log(this.state.firstTime, "first time");
    return (
      <div className="conversations">
        <div className="conversationsList">
          <h2>Conversations</h2>
          {this.state.conversations.length ? (
            <ul>{mapConversations(conversations, this.handleClick)}</ul>
          ) : null}
        </div>
        <div className="messages">
          {activeConversation ? (
            <MessagesArea
              title={
                findActiveConversation(conversations, activeConversation).title
              }
              conversation_id={
                findActiveConversation(conversations, activeConversation).id
              }
              messages={
                findActiveConversation(conversations, activeConversation)
                  .messages
              }
            />
          ) : null}
        </div>
      </div>
    );
  };
}
// helpers

const findActiveConversation = (conversations, activeConversation) => {
  console.log("activeConversation", conversations, activeConversation);
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    );
  });
};

// const mapConversations = (conversations, handleClick) => {
//   //   let receiverName = "";

//   return conversations.map(conversation => {
//     let title;
//     if (conversation) {
//       if (conversation.users[0].id !== currentUserID) {
//         title = conversation.users[0].name;
//       } else {
//         title = conversation.users[1].name;
//       }
//       return (
//         <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
//           {title}
//         </li>
//       );
//     }
//     return null;
//   });
// };
