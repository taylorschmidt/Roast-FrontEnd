import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const Cafe = (params) => {
  const form = useRef()
  console.log(params.location.state.data);
  const cafeData = params.location.state.data;
  const [yelpId, setYelpId] = useState(cafeData);
  const [content, setContent] = useState('')
  

  const handleClick = (e) => {
    const currentUser = getCurrentUser();
    const currentUserId = currentUser.id;
    e.preventDefault();
    const yelp = {
      id: currentUserId,
      YelpId: yelpId.id,
    };
    axios
      .post("http://localhost:8080/api/cafe/all", yelp)
      .then((res) => console.log("favorites:", res))
      .catch((err) => console.log(err));
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
      YelpURL: yelpId.url,
    };
    axios
      .post("http://localhost:8080/api/yelp", yelp)
      .then((res) => {
        console.log("here is our new cafe saved on page load", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log("Here is the input:", currentUserId, content, yelpId.id)
    const newComment = {
        userId: currentUserId,
        content: content,
        cafeId: yelpId.id
      }
      axios
      .post("http://localhost:8080/api/comments", newComment)
      .then((res) => {
        console.log("here is our new comment:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

const displayComments = (pageId) => {
    axios.get("http://localhost:8080/api/comments", {cafeId: pageId})
    .then((res) => {
        console.log("here are all the comments:", res.data);
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
    displayComments(yelpId.id)
  }, []);
  

  return (
    <>
      <h1>{yelpId.name}</h1>
      <h3>{yelpId.location.address1}</h3>
      <img src={yelpId.image_url} />
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
        {/* display all current comments */}
        Comments Will Populate Here
      </div>
    </>
  );
};

export default Cafe;
