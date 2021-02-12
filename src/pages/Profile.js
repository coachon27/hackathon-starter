import React from "react";
import Menu from "../components/menu/Menu";
import Messages from "../components/messages/Messages"
import { userIsAuthenticated } from "../redux/HOCs";

class Profile extends React.Component {
  
  render() {
    return (
      <div className="Profile">
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <Messages username={this.props.match.params.username} />
      </div>
    );
  }
}

export default userIsAuthenticated(Profile);
