import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-light col-lg-12"
        style={{ backgroundColor: "#7e78ec" }}
      >
        <div className="navbar-brand h1 brand">
          <span>
            <img
              src={require("../../assets/white-logo.png")}
              width="32"
              height="32"
              className="d-inline-block align-top"
              alt=""
            />
          </span>
          <span>Trips Admin</span>
        </div>
        <div
          style={{
            fontFamily: "Courgette",
            color: "white",
            marginRight: 20,
            fontSize: 20,
            cursor: "pointer"
          }}
          onClick={() => {
            this.props.logout();
          }}
        >
          Logout
        </div>
      </nav>
    );
  }
}

export default Navbar;
