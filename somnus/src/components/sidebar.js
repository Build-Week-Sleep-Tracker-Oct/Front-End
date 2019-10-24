import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu {...props} right>
      <a className="menu-item" href="/">
        Login
      </a>

      <a className="menu-item" href="/signup">
        SignUp
      </a>

      <a className="menu-item" href="/sleepentry">
        Add New Entry
      </a>

      <a className="menu-item" href="/trackerlist">
        Dashboard
      </a>
    </Menu>
  );
};
