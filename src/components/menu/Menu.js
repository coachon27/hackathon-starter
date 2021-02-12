import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";

class Menu extends React.Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    console.log(this.props);
    return (
      <div className="Menu">
        <div className="logo__div">
          <img className="logo" src='./images/kenzie-logo.png' alt="" />
          <h1>Kwitter</h1>
        </div>

        {this.props.isAuthenticated && (
          <div id="menu-links">
            <Link to="/home">Home</Link>
            <Link to={`/`}>Profile</Link>
            <Link to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    );
  }
} 

export default withAsyncAction("auth", "logout")(Menu);
