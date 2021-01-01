import React from 'react'
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import EditComment from './EditComment'

const Comments = ({comments, yelpId}) => {
   
   const editComment = () => {

    return(
        <div>
        {/* <EditComment /> */}
        </div>
        )
   }

    

    const display = () => {
        console.log("state moved to comments.js", comments)
        return comments.map((comment, index)=> {
            return (
                <div key={index}>
                        <h6>Review #{index + 1}</h6>
                        <h5>By: {comment.userId.username}</h5>
                        <p
                        //option for editing comment
                        //needs to call axios edit route and only work if you are logged in.
                        //maybe set this to false unless you are the comment author
                        // contentEditable="true"
                        >{comment.content}</p>
                        <button onClick={editComment}>Edit</button>
                        <button onClick={()=>{
                                //  const currentUser = getCurrentUser();
                                //  const currentUserId = currentUser.id
                                // const deleteComment = {
                                //     id: comment._id
                                // }
                                // console.log(deleteComment)
                                let id = comment._id
                                console.log(id)
                                 axios
                               .delete("http://localhost:8080/api/comments/"+id)
                               .then((res) => {
                                 console.log("comment was deleted:", res.data);
                               })
                               .catch((err) => {
                                 console.log(err);
                               });
                              
                            //  window.location.reload();
                             } 
                        }
                        >Delete</button>
                </div>
            )     
    })
}
 
    return (
        <div>
        <div className="row">{display()}</div>
        </div>
    )
}

export default Comments