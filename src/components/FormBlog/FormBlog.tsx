import React, {useCallback, useEffect, useState} from 'react';
import {BlogType} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import "./FormBlog.css";
import Preloader from "../Preloader/Preloader";

interface Props {
  id?: string;
}

const FormBlog: React.FC<Props> = ({id}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [blog, setBlog] = useState<BlogType>({
    title: '',
    desc: '',
    time: '',
    id: '',
  });

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
    fetchBlog().catch(console.error)
  }, [fetchBlog]);

  const formChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dateTime = new Date().toLocaleString();

    const {name, value} = e.target;
    setBlog(prev => ({...prev, time: dateTime, [name]: value}));
  }

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (blog.title !== '' && blog.desc !== '') {
      try {
        if (id) {
          await axiosApi.put("blog/" + id + ".json", blog);
        } else {
          await axiosApi.post("/blog.json", blog);
        }
      } catch (e) {
        console.error('error', e);
      }
      navigate("/")
    } else {
      alert('You did not fill in the field!');
    }
  }

  let content = (
    <form onSubmit={formSubmit}>
      <div>
        <div className="label">
          <label htmlFor={"title"}>Title:</label>
        </div>
        <input className="inputTitle" defaultValue={blog.title} onChange={formChange} type={"text"} name={"title"}/>
      </div>
      <div>
        <div className="label">
          <label htmlFor={"desc"}>Description:</label>
        </div>
        <textarea className="inputDesc" defaultValue={blog.desc} onChange={formChange} name={"desc"}/>
      </div>
      <button className="btnFormSave" type={"submit"}>Save</button>
    </form>
  );

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div className="formBlog">
      {content}
    </div>
  );
};

export default FormBlog;