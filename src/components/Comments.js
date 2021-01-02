import React, { useRef, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";

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
              // value={content}
              // placeholder={comment.content}
              value={comment.content}
              onChange={updateComment}
            />
          </form>
          {/* EDIT FUNCTION */}
          <button
            onClick={() => {
              let id = comment._id;
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
          {/* DELETE FUNCTION */}
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
