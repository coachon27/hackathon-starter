import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
import Menu from "../components/menu/Menu";
import { userIsNotAuthenticated } from "../redux/HOCs";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Menu />
        <LoginForm />
      </div>
    );
  }
}

export default userIsNotAuthenticated(Home);
