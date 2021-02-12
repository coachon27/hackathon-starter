import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";
import logo from "../../kenzie-logo.png";

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
          <img className="logo" src={logo} alt="" />
          <h1>Kwitter</h1>
        </div>

        {this.props.isAuthenticated && (
          <div id="menu-links">
            <Link className="home__link" to="/home">
              Home
            </Link>
            <Link className="profile__link" to={`/`}>
              Profile
            </Link>
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
