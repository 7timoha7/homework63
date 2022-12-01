import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {BlogType} from "../../types";
import BlogCard from "../../components/BlogCard/BlogCard";
import "./BlogList.css";
import Preloader from "../../components/Preloader/Preloader";

const BlogList = () => {

  const [blogList, setBlogList] = useState<BlogType[]>([])
  const [loader, setLoader] = useState<boolean>(false);

  const fetchBlogList = useCallback(async () => {
    setLoader(true);
    try {
      const blogResponse = await axiosApi.get("/blog.json");
      if (blogResponse.data !== null) {
        const blogs = Object.keys(blogResponse.data).map(key => {
          const blog = blogResponse.data[key];
          blog.id = key;
          return blog
        });
        setBlogList(blogs);
      }
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogList().catch(console.error)
  }, [fetchBlogList]);

  const blogOrNo = () => {
    if (blogList.length) {
      return <div>
        {blogList.map((item) => {
          return <BlogCard blog={item} key={item.id}/>
        })}
      </div>
    } else {
      return <div style={{textAlign: "center"}}>
        <h1>No blog posts.</h1>
      </div>
    }
  }

  let content = blogOrNo();

  if (loader) {
    content = <Preloader/>
  }

  return (

    <div className="blogList">
      {content}
    </div>
  );
};

export default BlogList;