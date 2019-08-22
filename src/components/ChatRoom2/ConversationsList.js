import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import NewConversationForm from "./NewConversationForm";
import MessageCable from "./MessageCable";
import MessagesArea from "./MessagesArea";
import ConversationsCables from "./Cables";
import ActionCableProvider from "react-actioncable-provider";
import { API_WS_ROOT, API_ROOT, HEADERS } from "./constants";

const currentUserID = Number(localStorage.getItem("current_user_id"));

const createConvo = (sender_id, receiver_id) => {
  return fetch(`${API_ROOT}/conversations`, {
    method: "POST",
    headers: HEADERS,
    // TODO: title should be the receiver name
    body: JSON.stringify({ title: "NAME", sender_id, receiver_id })
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

  render = () => {
    return (
      <ActionCableProvider url={API_WS_ROOT}>
        <ConversationsCables
          userId={currentUserID}
          appendNewConversation={this.appendNewConversation}
        />
        <ConversationsList {...this.props} {...this.state} />
      </ActionCableProvider>
    );
  };
}
export default Conversations;

class ConversationsList extends React.Component {
  state = {
    conversations: this.props.conversations,
    activeConversation: null,
    receiverName: "",
    firstTime: true
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

          createConvo(currentUserID, this.props.location.receiver_id).then(
            response => {
              console.log("created a new one!", response);
              return response;
            }
          );
        }

        this.setState({
          conversations: conversations,
          activeConversation: activeConversation ? activeConversation.id : 0
        });
      });
  };

  handleFirstTime = () => {
    if (this.state.firstTime){
      this.setState({ firstTime: false });
    }
  };
  handleClick = id => {
    this.setState({ activeConversation: id });
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
          {/* {this.state.connected ? null : ( */}
          {this.state.firstTime ? (
            <MessageCable
              conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
              // handleConnected={this.handleConnected}
            />
          ) : null}
          {/* )} */}

          {activeConversation ? (
            <MessagesArea
              handleFirstTime={this.handleFirstTime}
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
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
//       console.log("the fucking conversation ", conversation);
//       console.log(
//         "the fucking usserrsssss ",
//         conversation.users[0].id,
//         "current",
//         currentUserID
//       );
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
