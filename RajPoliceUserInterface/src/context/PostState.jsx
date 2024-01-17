import React, { useContext, useState } from "react";
import PostContext from "./PostContext";

export const PostState = (props) => {
    const s1 = [{}];

    const [Post, setPost] = useState(s1);

    // Fetch all posts for feed
    const fetchallPosts = async () => {
        // API call
        const response = await fetch('http://localhost:5000/api/post/fetchallposts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await response.json();
        
        setPost(json)
    }


    return (
        <PostContext.Provider value={{Post, setPost, fetchallPosts}}>
            {props.children}
        </PostContext.Provider>
    )
}