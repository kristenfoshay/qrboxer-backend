import React, {useContext} from 'react';
import Button from "react-bootstrap/Button";
import UserContext from "../UserContext";
//import User from "../users/User";
//import QRCode from "../boxes/QRCode";
import "./Homepage.css";


function Homepage() {
  const { currentUser } = useContext(UserContext);

  function loggedOut() {
    //const currUser = this.context;
    return (
      <div id="loggedout">
        <h1 size="lg">QRBoxer</h1>
        <p1>What's in your Box??</p1>
        <br></br>
        <Button block="true" size="lg" href="/login">
          Login
        </Button>
        <br></br>
        <Button block="true" size="lg" href="/signup">
          Signup
        </Button>
        <br></br>
        <br></br>
        
      </div>
    );
  }

  function loggedIn() {
    //const currUser = this.context;
    return (
      <div id="loggedin">
        
      </div>
    );
  }

  return (
    <div>
      {currentUser ? loggedIn() : loggedOut()}
    </div>
);
}

export default Homepage;