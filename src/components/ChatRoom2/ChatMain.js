import React, { Component } from "react";
// import './App.css'; <-- commented out for styling
import ConversationsList from "./ConversationsList";
import { ActionCableProvider } from "react-actioncable-provider";
import { API_WS_ROOT } from "./constants";

class ChatMain extends Component {
  render() {
    return (
      <div className="ChatMain">
        <ActionCableProvider url={API_WS_ROOT}>
          <ConversationsList />
        </ActionCableProvider>
      </div>
    );
  }
}

export default ChatMain;
