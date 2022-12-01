import React from 'react';
import {NavLink} from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/images/pngwing.com.png"

const NavBar = () => {
  return (
    <div className="navBar">
      <div>
        <img className="logo" src={logo} alt="blog"/>
      </div>
      <ul className="navUl">
        <li className="navLi"><NavLink className="navLink" to={"/"}>Home</NavLink></li>
        <li className="navLi"><NavLink className="navLink" to={"/add"}>Add</NavLink></li>
      </ul>
    </div>
  );
};

export default NavBar;