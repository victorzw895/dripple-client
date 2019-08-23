import React, { Fragment } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";

// const Cable = ({ conversations, handleReceivedMessage }) => {
//   return (
//     <Fragment>
//       {conversations.map(conversation => {
//         return (
//           <ActionCableConsumer
//             key={conversation.id}
//             channel={{
//               channel: "ConversationsChannel"
//               //   conversation: conversation.id
//             }}
//             onReceived={handleReceivedMessage}
//           />
//         );
//       })}
//     </Fragment>
//   );
// };

// export default Cable;

class ConversationsCables extends React.Component {
  // If a new broadcasted conversation from websockets is received, check if user is one of the user ids to whom the conversation belongs to (users are serialized). If so, appended into the list of conversations. Channels are private but this double-checks subscribers on the client-side.
  handleReceivedConversation = response => {
    const { conversation } = response;
    if (conversation.users.map(i => i.id).includes(this.props.userId)) {
      this.props.appendNewConversation(conversation);
    }
  };

  render() {
    return this.props.userId ? (
      <ActionCableConsumer
        channel={{
          channel: "ConversationsChannel"
        }}
        onReceived={response => this.handleReceivedConversation(response)}
      />
    ) : null;
  }
}
export default ConversationsCables;
