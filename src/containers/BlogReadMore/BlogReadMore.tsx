import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {BlogType} from "../../types";

const BlogReadMore = () => {
  const {id} = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null)
  const navigate = useNavigate();

  const fetchBlog = useCallback(async () => {
    try {
      const blogResponse = await axiosApi.get('/blog/' + id + '.json');
      setBlog(blogResponse.data);
    } catch {
      console.error()
    }
  }, [id]);

  useEffect(() => {
    fetchBlog().catch(console.error);
  }, [fetchBlog]);

  const deletePost = async () => {
    await axiosApi.delete("/blog/" + id + ".json");
    navigate('/');
  }

  return (
    <div>
      <p>{blog?.time}</p>
      <p>{blog?.title}</p>
      <p>{blog?.desc}</p>
      <button onClick={deletePost}>Delete</button>
      <Link to={"/edit/" + id}>Edit</Link>
    </div>
  );
};

export default BlogReadMore;