import React from "react";
import {
  Avatar,
  TitleBar,
  TextInput,
  MessageList,
  Message,
  MessageText,
  AgentBar,
  Title,
  Subtitle,
  MessageGroup,
  TextComposer,
  Row,
  Fill,
  Fit,
  IconButton,
  SendButton,
  CloseIcon,
  Column,
  Bubble
} from "@livechat/ui-kit";

const user_id = localStorage.getItem("current_user_id");

class Maximized extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };
  }
  //    update(field)  {
  //     return e => this.setState({ [field]: e.currentTarget.value });
  //   }

  onMessageSend(msg) {
    console.log(msg, "on message send...", this.props);
    this.props.cable.subscriptions.subscriptions[0].speak({
      message: msg,
      user_id: user_id
    });
    this.setState({ ...this, body: "" });
  }

  render() {
    console.log("chat MAX props", this.props);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <TitleBar
          rightIcons={[
            <IconButton key="close" onClick={this.props.minimize}>
              <CloseIcon />
            </IconButton>
          ]}
          title="Welcome to LiveChat"
        />
        {this.props.currentAgent && (
          <AgentBar>
            <Row flexFill>
              <Column>
                <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
              </Column>
              <Column flexFill>
                <Title>{this.props.currentAgent.name}</Title>
                <Subtitle>Hero hero</Subtitle>
              </Column>
            </Row>
          </AgentBar>
        )}
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: "100%"
          }}
        >
          <MessageList active containScrollInSubtree>
            {this.props.messages === undefined
              ? console.log(
                  "is not an array!",
                  this.props.messages,
                  this.props.messages.constructor
                )
              : (this.props.messages || []).map((message, index) => (
                  <MessageGroup key={index} onlyFirstWithMeta>
                    <Message
                      date={message.parsedDate}
                      isOwn={
                        message.authorId === this.props.ownId ||
                        message.own === true
                      }
                      key={message.id}
                    >
                      <Bubble
                        isOwn={
                          message.authorId === this.props.ownId ||
                          message.own === true
                        }
                      >
                        {message.text && (
                          <MessageText>{message.text}</MessageText>
                        )}
                      </Bubble>
                    </Message>
                  </MessageGroup>
                ))}
          </MessageList>
        </div>
        <TextComposer onSend={this.onMessageSend.bind(this)}>
          <Row align="center">
            <Fill>
              <TextInput />
            </Fill>
            <Fit>
              <SendButton />
            </Fit>
          </Row>
        </TextComposer>
        <div
          style={{
            textAlign: "center",
            fontSize: ".6em",
            padding: ".4em",
            background: "#fff",
            color: "#888"
          }}
        >
          {"Dripples Chat"}
        </div>
      </div>
    );
  }
}

export default Maximized;
