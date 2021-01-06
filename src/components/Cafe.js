import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Comments from "./Comments";
import "../css/App.css";
import ButtonSpinner from './common/ButtonSpinner'

const Cafe = (params) => {
    const form = useRef();
    const cafeData = params.location.state.data;
    const [yelpId, setYelpId] = useState(cafeData);
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

  //error message in state
    const message = "You must be logged in to add favorites or reviews.";

  //favorite route
    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true)
        form.current.validateAll()
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
            YelpURL: yelpId.url,
        };
        axios
            .post("http://localhost:8080/api/cafe", yelp)
            .then((res) => {
                console.log("here is our new cafe saved on page load", res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        displayComments();
        setLoading(false)
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
            .post("http://localhost:8080/api/comments", newComment)
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
            .get("http://localhost:8080/api/comments/" + id)
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
                <div className="col-sm-8">
                    <h1>{yelpId.name}</h1>
                    <h3>Address: {yelpId.location.display_address}</h3>
                    <h4>Phone Number: {yelpId.phone}</h4>
                    <h5>
                    Rating: {yelpId.rating}/5{" "}
                    <img src="https://m.yelp.nl/favicon.ico" />
                    </h5>
                    <div>
                        <img src={yelpId.image_url} height='500vh' width='500vw'/>
                    </div>
            {/* add yelp rating, yelp logo */}
                    <button onClick={handleClick}>Add to Favorites!</button>
                    {error && <div>{message}</div>}
                </div>
          {/* <div className="col-md-1"></div> */}
                <div className="col-sm-4">
                    <h5>Add a Review for {yelpId.name}:</h5>
                        <Form onSubmit={submitComment} ref={form} >
                            <Input 
                            type="text"
                            placeholder="add a review"
                            className="form-control"
                            name="comment"
                            value={content}
                            onChange={onChangeContent}
                            />
                            <ButtonSpinner text="Submit" loading={loading} />
                        </Form>
                    <Comments comments={comments} yelpId={yelpId} />
                </div>
            </div>
        </div>
    );
};

export default Cafe;
