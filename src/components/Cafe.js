import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Comments from "./Comments";
import "../css/App.css";
import ButtonSpinner from "./common/ButtonSpinner";

const API_URL_CAFE = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_CAFE : process.env.REACT_APP_PRO_URL_CAFE;

const API_URL_COMMENTS = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_COMMENTS : process.env.REACT_APP_PRO_URL_COMMENTS;

const API_URL_FAVORITES = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_FAVORITES : process.env.REACT_APP_PRO_URL_FAVORITES;

const Cafe = (params) => {
  const form = useRef();
  const cafeData = params.location.state.data;
  const [yelpId, setYelpId] = useState(cafeData);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //error message in state
  const message = "You must be logged in to add favorites or reviews.";

  //favorite route
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    const currentUser = getCurrentUser();

    //add error message to tell user to log in to add favorites
    if (!currentUser) {
      setError(true);
      return <div></div>;
    } else {
      const yelp = {
        id: currentUser.id,
        YelpId: yelpId.id,
      };
      axios
        .put(API_URL_FAVORITES, yelp)
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
      YelpURL: yelpId.url,
    };
    axios
      .post(API_URL_CAFE, yelp)
      .then((res) => {
        console.log("here is our new cafe saved on page load", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    displayComments();
    setLoading(false);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const currentUser = getCurrentUser();

    //add error message to tell user to log in to add favorites
    if (!currentUser) {
      setError(true);
    } else {
      //addcomment to backend
      e.preventDefault();
      form.current.validateAll();
      addComment();
    }
  };

  const addComment = () => {
    const currentUser = getCurrentUser();
    const currentUserId = currentUser.id;
    //add error message to tell user to log in to add comment
    console.log("Here is the input:", currentUserId, content, yelpId.id);
    const newComment = {
      content: content,
      cafeId: yelpId.id,
      userId: currentUserId,
    };
    axios
      .post(API_URL_COMMENTS, newComment)
      .then((res) => {
        console.log("here is our new comment:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  const displayComments = () => {
    // const display = {
    //   cafeId: yelpId.id
    // }
    let id = yelpId.id;
    axios
      .get(API_URL_COMMENTS + id)
      .then((res) => {
        console.log("here are all the comments:", res.data);
        let allComments = res.data;
        setComments(allComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeContent = (e) => {
    const typedContent = e.target.value;
    setContent(typedContent);
  };

  useEffect(() => {
    addYelpInfo();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 cafePage">
          <div className="row cafeTop">
            <div className="col-sm-5">
              <img className="cafeImage" src={yelpId.image_url} height="250px" width="250px" />
            </div>
            <div className="col-sm-7">
              <h5>{yelpId.name}</h5>
              <h6>Address: {yelpId.location.display_address}</h6>
              <h6>Phone Number: {yelpId.phone}</h6>
              <h6>
                Rating: {yelpId.rating}/5{" "}
                <img src="https://m.yelp.nl/favicon.ico" />
              </h6>
              <h6><a href={yelpId.url}>Website</a></h6>
            </div>
          </div>
          <div className="row favoritesRow">
            <div className="col text-center">
          <button className="btn btn-light" onClick={handleClick}>Add to Favorites!</button>
          {error && <div>{message}</div>}
          </div>
          </div>
          <div className="col yelpDisclaimer">
          <div className="row">
          </div>
          <i>
            *Cafe name, address, phone, and rating from YELP.
          </i>
          </div>
          
        </div>
        {/* <div className="col-md-1"></div> */}
        
          <div className="col-sm-4 commentPage">
            <Comments comments={comments} yelpId={yelpId} />
            <br></br>
            {/* <h5>Add a Review for {yelpId.name}:</h5> */}
            <div className="commentForm">
            <Form className="commentFormz" onSubmit={submitComment} ref={form}>
              <Input
                style={{ borderRadius: '20px' }}
                type="text"
                placeholder="leave a review"
                className="form-control"
                name="comment"
                value={content}
                onChange={onChangeContent}
              />
              {/* <ButtonSpinner text="Submit" loading={loading} /> */}
            </Form>
            </div>
          
        </div>
      </div>
   </div>
  );
};

export default Cafe;
