import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { withAsyncAction } from "../../redux/HOCs";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.value.likes,
    };
    this.manageLikesHandler = this.manageLikesHandler.bind(this);
  }

  addLikeHandler = (value) => {
    // find message matching value.id
    const message = this.props.messages.find((message) => message.id === value);
    this.props.addLike(message.id).then((res) => {
      console.log(res.payload.like);
      this.setState({ likes: [res.payload.like] });
    });
  };

  removeLikeHandler = (value) => {
    // find message matching value.id
    const message = this.props.messages.find((message) => message.id === value);
    this.props.removeLike(message.likes[0].id).then(() => {
      this.setState({ likes: [] });
    });
  };

  manageLikesHandler = (value) => {
    if (this.state.likes.length > 0)
      this.removeLikeHandler(value);
    else
      this.addLikeHandler(value);
  };

  render() {
    return (
      <Card key={this.props.value.id} className="tweet">
        <Card.Header>{this.props.value.username}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.value.text}</Card.Title>
          <Card.Text>{this.props.value.createdAt.substr(0, 10)}</Card.Text>
          <Card.Text>Likes: {this.state.likes.length} </Card.Text>
          <Button
            variant="danger"
            onClick={() => this.props.deleteMessageHandler(this.props.value.id)}
          >
            Delete Message
          </Button>
          <Button
            variant="primary"
            onClick={() => this.manageLikesHandler(this.props.value.id)}
          >
            {this.state.likes.length > 0 ? "Unlike" : "Like"}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Message;
