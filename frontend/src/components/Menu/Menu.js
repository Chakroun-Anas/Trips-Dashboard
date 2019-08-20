import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  render() {
    return (
      <div className="menu" style={{ backgroundColor: "#494d60" }}>
        <div className="menuItemContainer">
          <div className="menuItemIcon">
            <img
              src={require("../../assets/dashboard.png")}
              width="20"
              height="20"
              className="d-inline-block align-top"
              alt="Dashboard Icon"
            />
          </div>
          <div className="menuItemName">Dashboard</div>
        </div>
      </div>
    );
  }
}

export default Menu;
