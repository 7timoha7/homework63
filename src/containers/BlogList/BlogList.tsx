import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {BlogType} from "../../types";
import BlogCard from "../../components/BlogCard/BlogCard";

const BlogList = () => {

  const [blogList, setBlogList] = useState<BlogType[]>([])

  const fetchBlogList = useCallback(async () => {
    try {
      const blogResponse = await axiosApi.get("/blog.json");
      const blogs = Object.keys(blogResponse.data).map(key => {
        const blog = blogResponse.data[key];
        blog.id = key;
        return blog
      });
      setBlogList(blogs)
    } catch {
      console.error('error')
    }
  }, []);

  useEffect(() => {
    fetchBlogList().catch(console.error)
  }, [fetchBlogList]);


  return (
    <div>
      {blogList.map((item) => {
        return <BlogCard blog={item} key={item.id}/>
      })}
    </div>
  );
};

export default BlogList;