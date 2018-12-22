import React, { Component } from "react";

import User from "../components/User.js";
import Peek from "../components/Peek.js";
import firebase from "firebase";


class PrivatePage extends Component {
  //simple button with on Click
  render() {
    const { userID } = this.props;
    return (
    <div className="container">
        <div className="row">
            <div className="col-lg-3"> 
                <div className="row">
               <p>{firebase.auth().currentUser.displayName}  <img className = "profilePic"src={firebase.auth().currentUser.photoURL} alt="User profile">
               </img></p>
                </div>
                <div className ="row">              
                 
                </div>
            </div>
            <div className="col-lg-6"> 
              <User userID={userID} />
            </div>
           
            <div className="col-lg-3 text-right">
            <button className =" btn Light"onClick={() => firebase.auth().signOut()}> Logout Out</button>
            </div>
        </div>            
          <Peek userID={userID} />
      </div>


    );
  }
}
export default PrivatePage;
