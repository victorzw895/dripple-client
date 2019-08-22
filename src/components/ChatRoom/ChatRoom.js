import React from "react";
import Cable from "actioncable";
// import MessageForm from "./MessageForm.js";
import Minimized from "./Minimized";
import Maximized from "./Maximized";
import { ThemeProvider, FixedWrapper, purpleTheme } from "@livechat/ui-kit";

const user_id = localStorage.getItem("current_user_id");
let cable = Cable.createConsumer("http://localhost:3000/cable");
let theme = {
  ...purpleTheme,
  TextComposer: {
    ...purpleTheme.TextComposer,
    css: {
      ...purpleTheme.TextComposer.css,
      marginTop: "1em"
    }
  },
  OwnMessage: {
    ...purpleTheme.OwnMessage,
    secondaryTextColor: "#fff"
  }
};
function parsedDate() {
  return new Date().toLocaleString();
}
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownId: user_id,
      messages: [
        // {
        //   parsedDate:  parsedDate(),
        //   authorId: 1,
        //   id: 1,
        //   text: "text more text to show more lines?"
        // },
        // {
        //   parsedDate:  parsedDate(),
        //   authorId: 1,
        //   id: 2,
        //   text: "line 2 same author"
        // },
        // {
        //   parsedDate: parsedDate(),
        //   authorId: 2,
        //   id: 3,
        //   text: "text2 very long text"
        // }
      ],
      currentAgent: { name: "Bond, James" }
    };
    this.bottom = React.createRef();
  }
  componentDidMount() {
    cable.subscriptions.create(
      { channel: "ConversationsChannel" },
      {
        received: data => {
          this.setState({
            messages: [
              ...this.state.messages,
              {
                parsedDate: parsedDate(),
                authorId: 1,
                id: this.state.messages.length + 1,
                text: data.message
              }
            ]
          });
        },
        speak: function(data) {
          return this.perform("speak", data);
        }
      }
    );
  }

  componentDidUpdate() {
    // this.bottom.current.scrollIntoView();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <FixedWrapper.Root>
            <FixedWrapper.Maximized>
              <Maximized {...this.state} cable={cable} />
            </FixedWrapper.Maximized>
            <FixedWrapper.Minimized>
              <Minimized {...this.state} />
            </FixedWrapper.Minimized>
          </FixedWrapper.Root>
        </div>
      </ThemeProvider>
    );
  }
}

export default ChatRoom;
