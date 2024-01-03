import React from "react";
import {NavLink} from "react-router-dom";
import "./NavigationBar.css";

export default function Navbar() {
  return (
    <nav className="navigationBar">
      <div className="PageFrame">
        <NavLink className={"Pages"} to="/Home">Home</NavLink>
      </div>

      <div className="PageFrame">
      <NavLink className={"Pages"} to="/FlashCard">FlashCard</NavLink>
      </div>

      <div className="PageFrame">
      <NavLink className={"Pages"} to="/Contact">Contact</NavLink>
      </div>
    </nav>
  );
}
