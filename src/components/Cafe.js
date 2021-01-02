import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Comments from "./Comments"

const Cafe = (params) => {
  const form = useRef()
  const cafeData = params.location.state.data;
  const [yelpId, setYelpId] = useState(cafeData);
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])
//   const currentUser = getCurrentUser();
//   const currentUserId = currentUser.id;
  
//favorite route
  const handleClick = (e, res) => {
    const currentUser = getCurrentUser();
    const currentUserId = currentUser.id;
    e.preventDefault();

    //add error message to tell user to log in to add favorites
    if(!currentUser.id) {
        console.error('error here');
        res.status(401).send('error message you want here')
        return (
            <div>You must be logged in to add favorites.</div>
        )
        } else {
    
    
    const yelp = {
      id: currentUser.id,
      YelpId: yelpId.id
    };
    axios
      .put("http://localhost:8080/api/user/favorites", yelp)
      .then((res) => console.log("favorites:", res))
      .catch((err) => console.log(err));
    }
    };

  const addYelpInfo = () => {
    console.log("Yelp: ", { YelpId: yelpId.id });
    const yelp = {
      YelpId: yelpId.id,
      Name: yelpId.name,
      Address: yelpId.location.address1,
      City: yelpId.location.city,
      Rating: yelpId.rating,
      ImageURL: yelpId.image_url,
      YelpURL: yelpId.url
    };
    axios.post("http://localhost:8080/api/cafe", yelp)
      .then((res) => {
        console.log("here is our new cafe saved on page load", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      displayComments()
  } 

  const submitComment = (e) => {
      //addcomment to backend
      e.preventDefault()
      form.current.validateAll()
      addComment()
  }

  const addComment = () => {
    const currentUser = getCurrentUser();
    const currentUserId = currentUser.id;
    //add error message to tell user to log in to add comment
    console.log("Here is the input:", currentUserId, content, yelpId.id)
    const newComment = {
        content: content,
        cafeId: yelpId.id,
        userId: currentUserId
      }
      axios
      .post("http://localhost:8080/api/comments", newComment)
      .then((res) => {
        console.log("here is our new comment:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.reload();
  }

const displayComments = () => {
  // const display = {
  //   cafeId: yelpId.id
  // }
  let id= yelpId.id
    axios.get("http://localhost:8080/api/comments/" + id)
    .then((res) => {
        console.log("here are all the comments:", res.data)
       let allComments = res.data 
        setComments(allComments)
      })
      .catch((err) => {
        console.log(err);
      });
}



  const onChangeContent = (e) => {
    const typedContent = e.target.value
    setContent(typedContent)
}

  useEffect(() => {
    addYelpInfo()
  }, []);
  

  return (
    <>
      <h1>{yelpId.name}</h1>
      {/* <h3>Address: {yelpId.location.address1}, {yelpId.location.city}</h3> */}
      <h3>Address: {yelpId.location.display_address}</h3>
      <h4>Phone Number: {yelpId.phone}</h4>
      <h5>Rating: {yelpId.rating}/5</h5>
      <img src={yelpId.image_url} /> 
      {/* add yelp rating, yelp logo */}
      <button onClick={handleClick}>Add to Favorites!</button>
      <div>
        <Form onSubmit={submitComment} ref={form}>
          <Input
            type="text"
            placeholder="add a review"
            className="form-control"
            name="comment"
            value={content}
            onChange={onChangeContent}
          />
        </Form>
      </div>
      <div>
        <Comments comments={comments} yelpId={yelpId} />
      </div>
    </>
  );
};

export default Cafe;