import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {BlogType} from "../../types";
import "./BlogReadMore.css";
import Preloader from "../../components/Preloader/Preloader";

const BlogReadMore = () => {
  const {id} = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchBlog = useCallback(async () => {
    setLoader(true);
    try {
      const blogResponse = await axiosApi.get('/blog/' + id + '.json');
      if (blogResponse.data === null) {
        throw new Error('not found!');
      } else {
        setBlog(blogResponse.data);
      }
    } finally {
      setLoader(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog().catch((e) => console.error(e.message));
  }, [fetchBlog]);

  const deletePost = async () => {
    await axiosApi.delete("/blog/" + id + ".json");
    navigate('/');
  }

  let content = (
    <div className="readMoreCard">
      <div className="cardTime">
        <span className="cardTimeSpan">{blog?.time}</span>
      </div>
      <div className="cardTitle">
        <div className="cardTitleSpan">
          <span>Title:</span>
        </div>
        <span>{blog?.title}</span>
      </div>
      <div className="cardTitle">
        <div className="cardTitleSpan">
          <span>Description:</span>
        </div>
        <span>{blog?.desc}</span>
      </div>
      <div className="btnBoxReadMore">
        <button className="btnDelete" onClick={deletePost}>Delete</button>
        <Link className="btnEdit" to={"/edit/" + id}>Edit</Link>
      </div>
    </div>
  );

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div className="readMore">
      {content}
    </div>
  );
};

export default BlogReadMore;