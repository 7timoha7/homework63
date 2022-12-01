import React from 'react';
import {BlogType} from "../../types";
import {Link} from "react-router-dom";
import "./BlogCard.css";

interface Props {
  blog: BlogType;
}

const BlogCard: React.FC<Props> = ({blog}) => {
  return (
    <div className="blogCard">
      <div className="cardTime">
        <span className="cardTimeSpan">{blog.time}</span>
      </div>
      <div className="cardTitle">
        <div className="cardTitleSpan">
          <span>Title:</span>
        </div>
        <span>{blog.title}</span>
      </div>
      <Link className="cardLink" to={"/blogReadMore/" + blog.id}>Read More</Link>
    </div>
  );
};

export default BlogCard;