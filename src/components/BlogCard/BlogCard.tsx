import React from 'react';
import {BlogType} from "../../types";
import {Link} from "react-router-dom";

interface Props {
  blog: BlogType;
}

const BlogCard: React.FC<Props> = ({blog}) => {
  return (
    <div>
      <div>
        <p>{blog.time}</p>
        <p>{blog.title}</p>
        <Link to={"/blogReadMore/" + blog.id}>Read More</Link>
      </div>

    </div>
  );
};

export default BlogCard;