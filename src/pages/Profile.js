import React from "react";
import Menu from "../components/menu/Menu";
import Messages from "../components/messages/Messages"
import { userIsAuthenticated } from "../redux/HOCs";

class Profile extends React.Component {
  
  render() {
    let username= this.props.match?.params?.username;
    return (
      <div className="Profile">
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <Messages username={username} />
      </div>
    );
  }
}

export default userIsAuthenticated(Profile);
