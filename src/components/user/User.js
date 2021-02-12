import React from "react";
import { withAsyncAction } from "../../redux/HOCs";

class User extends React.Component {
  render() {
    return (
      <div className="user__div">
        <div>
          <img src={this.props.image} className="user__image" alt="" />
        </div>
        <div className="user__info">
          <h2 className="user__name">{this.props.username}</h2>
          <form className="submit__image-form">
            <label className="custom__file-upload">Change Profile Image</label>
            <input
              type="file"
              onChange={this.props.changePicture}
              accept="image/png, image/jpeg"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAsyncAction("auth", "logout")(User);
