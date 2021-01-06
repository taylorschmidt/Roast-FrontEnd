import React, { useRef, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";

const Comments = ({ comments, yelpId }) => {
  // console.log("here are the passed comments", comments);
  // //set state to be content of comment
  // let mappedComments = comments.map((comment) => {
  //   return [comment];
  // });
  // console.log(mappedComments);
  // let [content, setContent] = useState(mappedComments);
  // console.log("STATE", content);
 

  let newValue;

  const updateComment = (e) => {
    newValue = e.target.value;
    console.log("HERE IS THE NEW VALUE", newValue);
  };

  const display = () => {
    const currentUser = getCurrentUser();

    return comments.map((comment, index) => {
      return (
        <div className="row" key={index}>
          
          {!currentUser && (
            <>
            {/* <div className="col-sm-4"className="trialOne">
            {comment.userId.username}:
            </div>
            <div className="col-sm-8" className="trial">
            {comment.content} */}
            <div>
            <strong>{comment.userId.username}:</strong>{" "}{comment.content}
            </div>
           </>
          )}
          
          
          {currentUser && currentUser.id != comment.userId._id && (
            <>
            <div className="col-sm-4"className="trialOne">
          {comment.userId.username}:
          </div>
          <div className="col-sm-8" className="trial">
          {comment.content}
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
                      .put("http://localhost:8080/api/comments/" + id, {
                        content: newValue,
                      })
                      .then((res) => {
                        console.log("comment was updated", res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    window.location.reload();
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
                    console.log(id);
                    axios
                      .delete("http://localhost:8080/api/comments/" + id)
                      .then((res) => {
                        console.log("comment was deleted:", res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    window.location.reload();
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
      <div className="row">{display()}</div>
    </div>
  );
};

export default Comments;
