import React from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
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
    // const likeButtonStyle = { marginRight: "1rem" };
    return (
      <div className="tweet__div" key={this.props.message.id}>
        <h4 className="tweet__header">{this.props.message.username}</h4>
        <div className="tweet__body">
          <p className="tweet__message">{this.props.message.text}</p>
          <div className="likes__buttons-row">
            <p className="tweet__likes">Likes: {this.state.likes}</p>
            <div className="tweet__buttons">
              <button
                className={`${
                  this.state.likes > 0 ? "hide" : ""
                } like__button tweet__button`}
                onClick={() => this.manageLikesHandler(this.props.message)}
                type="button"
              >
                Like <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button
                className={`${
                  this.state.likes < 1 ? "hide" : ""
                } like__button tweet__button`}
                onClick={() => this.manageLikesHandler(this.props.message)}
                type="button"
              >
                Unlike <FontAwesomeIcon icon={faThumbsDown} />
              </button>
              <button
                onClick={() =>
                  this.props.deleteMessageHandler(this.props.message.id)
                }
                className="delete__button tweet__button"
                type="button"
              >
                Delete <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
          <div className="date__div">
            <p className="tweet__create-date">
              {this.props.message.createdAt.substr(0, 10)}
            </p>
          </div>
        </div>
      </div>
      // <Card
      //   key={this.props.message.id}
      //   className="tweet"
      //   style={{ width: "18rem" }}
      // >
      //   <Card.Header className="tweet__header">
      //     {this.props.message.username}
      //   </Card.Header>
      //   <Card.Body className="d-flex flex-column flex-wrap">
      //     <Card.Text className="text-danger">
      //       {this.props.message.text}
      //     </Card.Text>

      //     <Card.Text>Likes: {this.state.likes} </Card.Text>
      // <div className="tweet__buttons">
      //   <Button
      //     className={`${this.state.likes > 0 ? "hide" : ""} mb-2`}
      //     variant="outline-primary"
      //     onClick={() => this.manageLikesHandler(this.props.message)}
      //     style={likeButtonStyle}
      //   >
      //     Like <FontAwesomeIcon icon={faThumbsUp} />
      //   </Button>
      //   <Button
      //     className={`${this.state.likes < 1 ? "hide" : ""} mb-2`}
      //     variant="outline-primary"
      //     onClick={() => this.manageLikesHandler(this.props.message)}
      //     style={likeButtonStyle}
      //   >
      //     Unlike <FontAwesomeIcon icon={faThumbsDown} />
      //   </Button>
      //   <Button
      //     variant="outline-danger"
      //     className='mb-2'
      //     onClick={() =>
      //       this.props.deleteMessageHandler(this.props.message.id)
      //     }
      //   >
      //     Delete <FontAwesomeIcon icon={faTrash} />
      //   </Button>
      //   <Card.Text>{this.props.message.createdAt.substr(0, 10)}</Card.Text>
      // </div>
      //   </Card.Body>
      // </Card>
    );
  }
}

export default withAsyncAction("profile", "all")(Message);
