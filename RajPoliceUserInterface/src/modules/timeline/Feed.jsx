import React, { useContext, useState, useEffect } from "react";
import PostContext from "../../context/PostContext";
import NewPost from "./post/NewPost";

const Feed = () =>{

    const context = useContext(PostContext);
    const { Post, setPost, fetchallPosts } = context;

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                await fetchallPosts()
            }
            else {
                navigate('/account/signin');
            }

        })()
    }, [])

    return(
        <div className="m-4 p-4">
             {Post.map((ele, index) => (
                // user, imageUrl, caption, location, taggedPerson, date
                        <NewPost key={index} postId={ele._id} user={ele.username} imageUrl={ele.imageUrl} caption={ele.caption} date={ele.date} location={ele.location} taggedPerson={ele.taggedPerson}/>

                    ))}

        </div>

    )
}

export default Feed;