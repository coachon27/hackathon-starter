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

  

  render() {
    let display = <div>No Messages Found</div>;
    if (this.state.messages) {
      display = this.state.messages.map((value) => {
        return (
          <Message
            key={value.id}
            value={value}
            deleteMessageHandler={this.deleteMessageHandler}
            messages={this.state.messages}
            addLike={this.props.addLike}
            removeLike={this.props.removeLike}
            manageLikesHandler={this.manageLikesHandler}
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
