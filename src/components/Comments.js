import React, { useRef, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";

const Comments = ({ comments, yelpId }) => {

  //set state to be content of comment
  let mappedComments = comments.map((comment)=> {return (comment.content)})
  let [content, setContent] = useState(mappedComments)

  //get id of each mapped comment in state and grab that index to update it in the form

  // const [content, setContent] = useState(comments)
  const [test, setTest] = useState('test')
  // let value = ''
  const updateComment = (e) => {
    content += e.target.value
    // console.log("VALUE", value)
    setContent(content)
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
          {/* EDIT FUNCTION */}
          <button
            onClick={() => {
              console.log('STATE', content)
              let id = comment._id;
              axios
                .put("http://localhost:8080/api/comments/" + id, {
                  content: content
                })
                .then((res) => {
                  console.log("comment was updated", res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              window.location.reload()
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
