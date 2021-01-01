import React, { useRef, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import { useHistory } from "react-router-dom";

const Comments = ({ comments, yelpId }) => {
  const [content, setContent] = useState('')
  
  const updateComment = (e) => {
    let value = e.target.value
    setContent(value)
  };

  const display = () => {
    
    return comments.map((comment, index) => {
      return (
        <div key={index}>
          <form>
            <label>By: {comment.userId.username}</label>
            <input
              type="text"
              className="form-control"
              name="comment"
              value={comment.content}
              onChange={updateComment}
            />
          </form>
          <button
            onClick={() => {
              let id = comment._id;
              let content = content;
              axios
                .put("http://localhost:8080/api/comments/" + id, {
                  content: content,
                })
                .then((res) => {
                  console.log("comment was updated", res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              //   window.location.reload()
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              //conditional about current user
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
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="row">{display()}</div>
    </div>
  );
};

export default Comments;
