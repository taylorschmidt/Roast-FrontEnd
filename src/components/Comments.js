import React, { useRef, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";

const Comments = ({ comments, yelpId }) => {

  //set state to be content of comment
  let mappedComments = comments.map((comment)=> {return ([comment])})
  console.log(mappedComments)
  const [content, setContent] = useState(mappedComments)
  console.log('STATE', content)
  //get id of each mapped comment in state and grab that index to update it in the form


  const updateComment = (e) => {
    content += e.target.value
    // console.log("VALUE", value)
    setContent(content)
  };
 



  const display = () => {
    

    const currentUser = getCurrentUser();
    
    return comments.map((comment, index) => {
      
      return (
        <div className="row"key={index}>
         
          <form>
          
            <label>By: {comment.userId.username}</label>
            <br></br>
            <input 
              type="text"
              // className="form-control"
              name="comment"
              value={comment.content}
              onChange={updateComment}
              />

           
          </form>
       
  
          {/* EDIT FUNCTION */}
          <div>
          <button className="btn btn-dark" 
            onClick={() => {
              if(!currentUser){
              } else if (currentUser && currentUser.id === comment.userId._id) {
              console.log('it worked! only user should see this.')
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
          }
          >
            Update
          </button>
          {/* DELETE FUNCTION */}
          <button className="btn btn-dark"
            onClick={() => {
              if(!currentUser){
                return
              } else if (currentUser && currentUser.id === comment.userId._id) {
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
          }
          >
            Delete
          </button>
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
