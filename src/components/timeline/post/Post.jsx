import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, IconButton, Tooltip, colors } from "@mui/material";
import React, { useState } from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PropTypes, { string } from 'prop-types'

function Post({ user, postImage,postUrl, postHeading, postDescription, timestamp }) {

  const [isLike,setIsLike] = useState("primary");

  const likePost = ()=>{
    setIsLike(isLike=="primary"?"secondary":"primary");
    console.log(isLike);
  }

  return (
    <div className="post rounded-lg shadow-md shadow-white bg-black">
      
      <div className="post__image">
        <img src={postImage} alt="Post Image" />
      </div>
      <div className="post__footer m-4 ">
        <div className="flex flex-row">
          <div className="post__title"><a href={postUrl}>{/*What if famous brands had regular fonts? Meet RegulaBrands!*/postHeading}</a> </div>
          <MoreHorizIcon className="morepostIcon" />
        </div>
        <p className="font-normal">{/*I have worked in UX for the better part of the decade. What I did is..*/ postDescription}</p>
      </div>

      <div className="post__header m-4 pb-4">
        <div className="post__headerAuthor">
          <Avatar style={{ marginRight: "10px" }}>
            {user.charAt(0).toUpperCase()}
          </Avatar>{" "}
          <div className="flex flex-col user">{user} <span>{"• " + new Date(timestamp).toString().slice(0,10)}</span></div>
        </div>
        <div className="post__iconsMain flex flex-col items-end">
            <div>
            <Tooltip title="like"><IconButton onClick={likePost}><FavoriteBorderIcon className="postIcon" color={isLike}/></IconButton></Tooltip>
              <BookmarkBorderIcon className="postIcon" />
              <TelegramIcon className="postIcon" />
            </div>
            Liked by __ likes people
          </div>
      </div>
    </div>
  );
}

Post.defaultProps = {
  user: 'Unknown',
  postImage: "https://www.pngmart.com/files/21/Aesthetic-Newspaper-PNG.png",
  postHeading: 'general',
  postDescription: "general",
  timestamp: "2023-12-28",
}

Post.propTypes = {
  user: string,
  postImage: string,
  postHeading: string,
  postDescription: string,
  timestamp: string,
}


export default Post;