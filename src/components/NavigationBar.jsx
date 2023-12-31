import React from "react";
import {NavLink} from "react-router-dom";
import "./NavigationBar.css";

export default function Navbar() {
  return (
    <nav className="navigationBar">
      <div className="PageFrame">
        <NavLink className={"Pages"} to="/Home"><span>Home</span></NavLink>
      </div>

      <div className="PageFrame">
      <NavLink className={"Pages"} to="/FlashCard"><span>FlashCard</span></NavLink>
      </div>

      <div className="PageFrame">
      <NavLink className={"Pages"} to="/Contact"><span>Contact</span></NavLink>
      </div>
    </nav>
  );
}
