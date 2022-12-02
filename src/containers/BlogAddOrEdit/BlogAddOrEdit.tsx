import React, {useCallback, useEffect, useState} from 'react';
import FormBlog from "../../components/FormBlog/FormBlog";
import {useNavigate, useParams} from "react-router-dom";
import "./BlogAddOrEdit.css";
import axiosApi from "../../axiosApi";
import {BlogApi, BlogType} from "../../types";

const BlogAddOrEdit = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [blog, setBlog] = useState<BlogType | null>(null);

  const {id} = useParams();
  const navigate = useNavigate();

  const fetchBlog = useCallback(async () => {
    setLoader(true);
    try {
      if (id) {
        const blogResponse = await axiosApi.get("/blog/" + id + ".json");
        setBlog(blogResponse.data);
      }
    } finally {
      setLoader(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog().catch(console.error);
  }, [fetchBlog]);

  const onSubmitForm = async (postData: BlogApi) => {
    try {
      if (id) {
        await axiosApi.put("blog/" + id + ".json", postData);
      } else {
        await axiosApi.post("/blog.json", postData);
      }
    } catch (e) {
      console.error('error', e);
    }
    navigate("/");
  }

  const addOfEdit = () => {
    if (id) {
      return <div className="nameAddOrEdit">
        <span>Edit blog</span>
      </div>
    } else {
      return <div className="nameAddOrEdit">
        <span>Add blog</span>
      </div>
    }
  }

  return (
    <div className="addEdit">
      {addOfEdit()}
      {blog !== null && id !== undefined &&
          <FormBlog onSubmit={onSubmitForm} existingPost={blog} loader={loader}/>}
      {id === undefined &&
          <FormBlog onSubmit={onSubmitForm} loader={loader}/>}
    </div>
  );
};

export default BlogAddOrEdit;