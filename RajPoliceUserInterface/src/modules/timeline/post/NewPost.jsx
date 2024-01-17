import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { PropTypes } from 'prop-types'

// Tabler icons
import { IconMessageCircle2, IconHeart, IconShare3, IconBookmark, IconMapPinFilled } from '@tabler/icons-react';
import PostContext from "../../../context/PostContext";
import UserContext from "../../../context/UserContext";



const NewPost = ({  postId, user, imageUrl, caption, location, taggedPerson, date }) => {
    const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Context 
    const PostStateContext = useContext(PostContext);
    const {Post, fetchallPosts} = PostStateContext;
    const UserStateContext = useContext(UserContext);
    const {User, getUserInfo} = UserStateContext;

    useEffect(() => {
        getUserInfo()
        const fetchLikesCount = async () => {
          try {
            await fetchallPosts();
            // Assuming that Post is an array
            const postWithLikes = Post.find((post) => post.likes !== undefined);
            const postLikedbyUSer = Post.find((post) => post.likes.includes(User._id))
            
            if (postWithLikes) {
              setLikeCount(postWithLikes.likes.length);
            } else {
              setLikeCount(0);
            }

            if (postLikedbyUSer) {
              setIsLike(true);
            } 



          } catch (error) {
            console.error('Error fetching likes count:', error);
          }
        };  
    
        fetchLikesCount();
      }, [likeCount]);

  const likePost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/post/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify()
      });
  
      if (response.ok) {
        const json = await response.json();
        setIsLike(true);
        setLikeCount(json.likes);
      } else {
        setIsLike(true);
        console.error('Failed to add like');
      }
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };
  

    // const likePost = () => {
    //     setIsLike(isLike == "primary" ? "secondary" : "primary");
    //     console.log(isLike);
    // }

    return (
        <div className="post rounded-lg w-[480px] shadow-md shadow-black-500 bg-white">
            <div className="post__header m-4 pt-4">
                <div className="post__headerAuthor">
                    <Avatar style={{ marginRight: "10px" }}>
                        {user.charAt(0).toUpperCase()}
                    </Avatar>{" "}
                    <div className="flex flex-col user">{user} <span>{"• " + new Date(date).toString().slice(0, 10)}</span></div>
                </div>
                <div className="post__iconsMain flex flex-col items-end">
                    <div>
                        <MoreHorizIcon className="morepostIcon" />
                    </div>
                </div>
            </div>
            {
                location ? <div className="ms-4 flex flex-row my-2 text-xs"><span className="text-red-500 me-1 "><IconMapPinFilled height={15} /></span> {location}</div> : ""
            }
            <div className="post__image w-[470px] h-[480px] mx-auto overflow-hidden flex flex-row justify-center items-center ">
                <img src={imageUrl} alt="Post Image" className="object-cover w-[470px] h-[480px] " />
            </div>
            <div className="post__footer m-4 ">
                <div className="post__iconsMain flex flex-col items-start">
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-row">
                            <Tooltip title="like">
                                <IconHeart onClick={likePost} fill={isLike ? "red": "white"} color={isLike ? "red": "black"}/>
                            </Tooltip>
                            <IconMessageCircle2 />
                            <IconShare3 className="postIcon" />
                        </div>
                        <IconBookmark className="postIcon ms-auto" />

                    </div>
                    Liked by: {likeCount} people
                </div>
                <div className="post__title text-md">{caption} </div>

                {
                    taggedPerson ? <div className="text-white flex flex-row my-2 text-xs">{taggedPerson}</div> : ""
                }

                <div className="flex flex-row my-4 pb-8">
                    <input type="text" className="p-0 my-4 bg-transparent outline-none w-full" placeholder="Add your comments here..." />

                </div>
            </div>


        </div>
    );
}

NewPost.defaultProps = {
    user: 'Unknown',
    imageUrl: "https://www.pngmart.com/files/21/Aesthetic-Newspaper-PNG.png",
    caption: 'general',
    date: "2023-12-28",
}

NewPost.propTypes = {
    user: PropTypes.string,
    imageUrl: PropTypes.string,
    caption: PropTypes.string,
    date: PropTypes.string,
}


export default NewPost;