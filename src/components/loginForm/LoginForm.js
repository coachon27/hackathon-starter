import React from "react";
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import "./LoginForm.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <div className="LoginForm">
        <h2>Your favorite microblogging platform</h2>
        <form id="login-form" onSubmit={this.handleLogin}>
          <label htmlFor="username">Username</label>
          <div>
          <input className="uname"
            type="text"
            name="username"
            required
            onChange={this.handleChange}
            autoComplete='off'
          />
          </div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={this.handleChange}
          />
          <button className='login__button' type="submit" disabled={loading}>
            Login
          </button>
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
       
      
      </div>
      
    );
  }
}

export default withAsyncAction("auth", "login")(LoginForm);
