import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from "../UserContext";
import "./Nav.css";
import Logo from "./QRBoxer.jpg";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [menuExpanded, setMenuExpanded] = useState(false);
 
  console.log("line 10 NavBar", currentUser);
 
  function toggleMenu() {
    setMenuExpanded(!menuExpanded);
  }

  function closeMenu() {
    setMenuExpanded(false);
  }

  function loggedOut(){
    return (
        <nav className={`Nav1 ${menuExpanded ? 'expanded' : ''}`}>
          <NavLink exact to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink exact to="/login" onClick={closeMenu}>Login</NavLink>
        </nav>
    );
  }

  function loggedIn(){
    return (
        <nav className={`Nav1 ${menuExpanded ? 'expanded' : ''}`}>
          <NavLink exact to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink exact to="/moves" onClick={closeMenu}>My Moves</NavLink>
          <NavLink exact to="/boxes" onClick={closeMenu}>My Boxes</NavLink>
          <NavLink exact to="/items" onClick={closeMenu}>My Items</NavLink>
          <NavLink exact to="/profile" onClick={closeMenu}>My Profile</NavLink>
          <NavLink exact to="/" onClick={() => { closeMenu(); logout(); }}>Logout</NavLink>  
        </nav>
    );
  }
  
  return (
    <nav className="Nav">
      <Link to="/">
        <img className="Nav-logo" src={Logo} alt="QRBoxer logo" />
      </Link>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {currentUser ? loggedIn() : loggedOut()}
    </nav>
  );
}

export default NavBar;