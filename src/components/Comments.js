import React, { useRef, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";

const API_URL_COMMENTS = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_COMMENTS : process.env.REACT_APP_PRO_URL_COMMENTS;

const Comments = ({ comments, yelpId }) => {
  
  let newValue;

  const updateComment = (e) => {
    newValue = e.target.value;
  };

  const display = () => {
    const currentUser = getCurrentUser();

    return comments.map((comment, index) => {
      return (
        <div className="row comment" key={index}>
          
          {!currentUser && (
            <>
            <div>
            <strong>{comment.userId.username}:</strong>{" "}{comment.content}
            </div>
           
           
           </>
          )}
          
          
          {currentUser && currentUser.id !== comment.userId._id && (
            <>
            <div>
            <strong>{comment.userId.username}:</strong>{" "}{comment.content}
            </div>
         </>
          )}
          
          
          {currentUser && currentUser.id === comment.userId._id && (
            <form>
              <label className="trialOne">By: {comment.userId.username}</label>
              <br></br>
              <input
                type="text"
                // className="form-control"
                name="comment"
                defaultValue={comment.content}
                onChange={updateComment}
              />
            </form>
          )}
          

          {/* EDIT FUNCTION */}
          <div>
            {currentUser && currentUser.id === comment.userId._id && (
              <button
                className="btn btn-dark"
                onClick={() => {
                  if (!currentUser) {
                  } else if (
                    currentUser &&
                    currentUser.id === comment.userId._id
                  ) {
                    console.log("it worked! only user should see this.");
                    let id = comment._id;
                    axios
                      .put(API_URL_COMMENTS + id, {
                        content: newValue,
                      })
                      .then((res) => {
                        console.log("comment was updated", res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    window.location.reload(false);
                  }
                }}
              >
                Update
              </button>
            )}
            {currentUser && currentUser.id === comment.userId._id && (
              <button
                className="btn btn-dark"
                onClick={() => {
                  if (!currentUser) {
                    return;
                  } else if (
                    currentUser &&
                    currentUser.id === comment.userId._id
                  ) {
                    let id = comment._id;
                    
                    axios
                      .delete(API_URL_COMMENTS + id)
                      .then((res) => {
                        console.log("comment was deleted:", res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                      window.location.reload(false);
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="col">{display()}</div>
    </div>
  );
};

export default Comments;
