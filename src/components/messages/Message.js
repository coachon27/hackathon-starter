import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { withAsyncAction } from "../../redux/HOCs";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes,
    };
  }

  // addLikeHandler = (messageID) => {
  //   this.props
  //     .addLike(messageID)
  //     .then((res) => {
  //     console.log('likeID to be added: ' + res.payload.like.id)
  //       this.setState({ likes: [res.payload.like] });
  //     })
  // };

  // removeLikeHandler = (message) => {
  //   console.log(message);
  //   const likeID = message?.likes[0]?.id;
  //   console.log('likeID to be removed: ' + likeID);

  //   this.props.removeLike(likeID).then((res) => {
  //     console.log(res);
  //     this.setState({ likes: [] });
  //   }).then(console.log(message));
  // };

  manageLikesHandler = (message) => {
    if (this.state.likes > 0) {
      this.props.setLikes(message?.likes[0]?.id);
      this.setState({ likes: 0 });
    } else {
      this.props.setLikes(message.id);
      this.setState({ likes: 1 });
    }
  };

  render() {
    const likeButtonStyle = { marginRight: "1rem" };
    return (
      <Card key={this.props.message.id} className="tweet">
        <Card.Header>{this.props.message.username}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.message.text}</Card.Title>
          <Card.Text>{this.props.message.createdAt.substr(0, 10)}</Card.Text>
          <Card.Text>Likes: {this.state.likes} </Card.Text>
          <div className='tweet__buttons'>
          <Button
            className={`${this.state.likes > 0 ? "hide" : ""}`}
            variant="primary"
            onClick={() => this.manageLikesHandler(this.props.message)}
            style={likeButtonStyle}
          >
            Like <FontAwesomeIcon icon={faThumbsUp} />
          </Button>
          <Button
            className={`${this.state.likes < 1 ? "hide" : ""}`}
            variant="primary"
            onClick={() => this.manageLikesHandler(this.props.message)}
            style={likeButtonStyle}
          >
            Unlike <FontAwesomeIcon icon={faThumbsDown} />
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              this.props.deleteMessageHandler(this.props.message.id)
            }
          >
            Delete <FontAwesomeIcon icon={faTrash} />
          </Button>
          </div>
          
        </Card.Body>
      </Card>
    );
  }
}

export default withAsyncAction("profile", "all")(Message);
