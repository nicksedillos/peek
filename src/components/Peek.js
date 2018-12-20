import React from 'react';
import firebase from "../config/firebase";
import Map from "../components/Maps";
import thispeek from "../utils/thispeek.js";
import ImgButton from "../components/ImgButton.js";

var MapStyle = {
  width:'100%',
  height:'100%',
};


// This component simply provides some fields to test writes to the firestore db

// image will be assigned to a file later on
let imageupload = null;

class Peek extends React.Component {

    // this is the callback function to get the URL to an uploaded file
    // from the ImgButton component, and write it to this.state.image
    urlCallback = (imageURL) => {
        this.setState({
          image: imageURL
        });
      }

    // sets the initial state for the peek attributes to empty
    constructor() {
        super();
        this.state = {
          tag: "",
          description: "",
          image: null,
          location: "",
          ends: "",
          private: ""
        }
    }

    // update state whenever a tracked form field is changed
    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    
    // the function called to add a peek to the firestore db
    // each attribute is taken from state, which is taken from form fields
    // verification/cleaning is managed in thispeek.js   
    addPeek = e => {
      thispeek.write({
          tag: this.state.tag,
          description: this.state.description,
          image: this.state.image,
          location: this.state.location,
          ends: this.state.ends,
          private: this.state.private
        });  
        // after the peek is written, form field values are reset to blank
        this.setState({
            username: "",
            tag: "",
            userID: "",
            description: "",
            image: null,
            location: "",
            ends: "",
            private: ""
        });

      }
      
  render() {
    return (
 
      
        <form className ="form-group" onSubmit={this.addPeek}>
        <div className="card">
     
          <div className="card-body">
            <h5 className="card-title">Add a Peek:</h5>
            <p></p>
              {/* These are user-provided fields for peek db info, additional fields are
              provided for in thispeek.js */}

              {/* The first button is its own component containing the logic to:
              1. Take a file from the user
              2. Put the file into firebase storage
              3. return the image URL to this component with the callback function */}

                <div className="container">
                <div className="row">
                  <div className="col-lg-6"> 
                      <div className="col-lg-6"> 
                          <div className="row">
                            <ImgButton callbackFromParent={this.urlCallback} />
                          </div>

                          <div className="row">    <div className="col-lg-6"> 
                            <label className="col-form-label" for="tag">Tag: </label></div>
                            <div className="col-lg-6"> 
                            <input  class="form-group mx-sm-3 mb-2"
                              type="text"
                              name="tag"
                              placeholder="Tag"
                              onChange={this.updateInput}
                              value={this.state.tag}
                            />
                            </div></div>
                            
                            <div className="row">    <div class="col-lg-6"> 
                              <label className="col-form-label" for="description">Description: </label> </div>
                              <div className="col-lg-6"> 
                              <input  className="form-group mx-sm-3 mb-2"
                                type="text"
                                name="description"
                                placeholder="Description"
                                onChange={this.updateInput}
                                value={this.state.description}
                              /></div> </div>
                          
                          <div className="row">
                          <div className="col-lg-6"> 
                              <label className="col-form-label" for="location">Location: </label> </div>
                              <div className="col-lg-6"> 
                              <input  className="form-group mx-sm-3 mb-2"
                                type="text"
                                name="location"
                                placeholder="Location"
                                onChange={this.updateInput}
                                value={this.state.location}
                              /></div> </div>
                              
                              <div className="row">
                              <div className="col-lg-6"> 
                                      <label>
                                        Ends?:
                                        <input  class="form-group mx-sm-3 mb-2"
                                          name="ends"
                                          type="checkbox"
                                          checked={this.state.ends}
                                          onChange={this.updateInput} className="col-form-label"/>
                                      </label>
                                </div>
                                <div className="col-lg-6"> 
                                    <label>
                                      Private?:
                                      <input  className="form-group mx-sm-3 mb-2"
                                        name="private"
                                        type="checkbox"
                                        checked={this.state.private}
                                        onChange={this.updateInput} className="col-form-label"/>
                                    </label>
                              </div></div>
                              <div className="row">
                              <div className="col-lg-6"> 
                                <button className="btn btn-success"   type="submit">Submit</button>
                              </div> </div>
                    
                          </div>
                      </div>
                
                  <div class="col-lg-6" >
                    <Map />  
                    </div>
                    </div>
                </div>  
              
          </div>
      </div>
  
  </form>
    
        );
      }
   }
export default Peek;