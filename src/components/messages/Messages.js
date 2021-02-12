import React from "react";

import Button from "react-bootstrap/Button";
import Message from "./Message";
import { withAsyncAction } from "../../redux/HOCs";

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      count: 0,
      image: "",
    };
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    this.props.getMessage(this.props.username).then((res) => {
      console.log(res.payload);
      this.setState({
        messages: res.payload.messages,
        count: res.payload.count,
      });
    });
  };

  newMessageHandler = () => {
    let text = this.state.message;
    this.props.createMessage(text).then(() => {
      this.fetchMessages();
      this.setState({
        message: "",
      });
    });
  };

  deleteMessageHandler = (value) => {
    // find message matching value.id
    const message = this.state.messages.find((message) => message.id === value);
    // print out message object
    console.log(message);
    // delete found message from messages array
    this.props.deleteMessage(message.id);
    // return filtered array into a new array
    const newArray = this.state.messages.filter(
      (item) => item.id !== message.id
    );
    // set this.state.messages to the new array
    this.setState({ messages: newArray });
  };

  handleChange = (event) => {
    let data = { ...this.state };

    data[event.target.name] = event.target.value;

    this.setState(data);
  };

  setLikes = (message) => {
    if (message.likes.length > 0) {
      const likeID = message?.likes[0]?.id;
      console.log("likeID to be removed:" + likeID);
      this.props.removeLike(likeID);
      message.likes = [];
    } else
      this.props
        .addLike(message.id)
        .then((res) => {
          console.log("added likeID " + res.payload.like.id);
          message.likes = [res.payload.like];
        });
  };

  render() {
    let display = <div>No Messages Found</div>;
    if (this.state.messages) {
      display = this.state.messages.map((message) => {
        return (
          <Message
            key={message.id}
            message={message}
            deleteMessageHandler={this.deleteMessageHandler}
            messages={this.state.messages}
            likes={message.likes.length}
            // addLike={() => this.props.addLike(message.id)}
            // removeLike={() => this.props.removeLike(message)}
            setLikes={() => this.setLikes(message)}
          />
        );
      });
    }

    return (
      <div className="Messages">
        <div className="ListMessage">{display}</div>
        <div className="NewMessage">
          <input
            className="message__input"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <Button
            className="send__button"
            variant="primary"
            onClick={this.newMessageHandler}
          >
            Send Message
          </Button>{" "}
          {/* <button onClick={this.newMessageHandler}> Send Message </button> */}
        </div>
      </div>
    );
  }
}

export default withAsyncAction("profile", "all")(Messages);
