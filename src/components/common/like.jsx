import React, { Component } from "react";

class Like extends Component {
  state = { liked: false };
  render() {
    let classes = this.props.liked
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";
    return (
      <div>
        <i
          onClick={this.props.onClick}
          style={{ cursor: "pointer" }}
          className={classes}
        ></i>
      </div>
    );
  }
}

export default Like;
