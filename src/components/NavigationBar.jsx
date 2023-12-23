import React from "react";
import {NavLink} from "react-router-dom";
import "./NavigationBar.css";

export default function Navbar() {
  return (
    <nav className="navigationBar">
      <div className="PageFrame">
        <NavLink to="/Home">Home</NavLink>
      </div>

      <div className="PageFrame">
      <NavLink to="/FlashCard">FlashCard</NavLink>
      </div>

      <div className="PageFrame">
      <NavLink to="/Contact">Contact</NavLink>
      </div>
    </nav>
  );
}
