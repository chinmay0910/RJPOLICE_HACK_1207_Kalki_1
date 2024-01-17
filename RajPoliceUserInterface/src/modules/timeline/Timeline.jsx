import React, { useState, useEffect } from "react";
import Post from "./post/Post"
import Suggestions from "./Suggestions";
import "./Timeline.css";
import { PropTypes } from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner"
import MobileHeader from "../navigation/MobileHeader";

const Timeline=(props)=> {
  const apiKey = "3416bdf6a26d4a7a827f649ec2139a04";
  const [articles, setArticles] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`; 
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);

}


useEffect(() => {
    updateNews(); 
}, [])


const handleNext = async() => {
  props.setProgress(10);
  setPage(page+1)
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(30);
  let res = await data.json();
  props.setProgress(70);
  setArticles(articles.concat(res.articles));
  setTotalResults(res.totalResults);
  setLoading(false);
  props.setProgress(100);
}


  return (
    <div className="timeline">
      <div className="timeline__left mt-12">
        <div className="timeline__posts">
        <MobileHeader />
        <InfiniteScroll
            dataLength={articles.length}
            next={handleNext}
            hasMore={articles.length !== totalResults}
            loader={loading && <Spinner/>}
        >
          {articles.map((ele, i) => (
            <Post
              key={i}
              user={ele.author?ele.author:"Unknown"}
              postImage={ele.urlToImage}
              postHeading={ele.title}
              postDescription={ele.description}
              // likes={ele.likes}
              timestamp={ele.publishedAt}
              postUrl={ele.url}
            />
          ))}
          
        </InfiniteScroll>
        </div>
      </div>
      <div className="timeline__right fixed top-0 mt-12 right-0 bg-white h-full p-4 ps-12">
        <Suggestions />
      </div>
    </div>
  );
}

Timeline.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

Timeline.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}



export default Timeline;