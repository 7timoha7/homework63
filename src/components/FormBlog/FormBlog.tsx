import React, {useCallback, useEffect, useState} from 'react';
import {BlogType} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";

interface Props {
  id?: string;
}

const FormBlog: React.FC<Props> = ({id}) => {
  const [blog, setBlog] = useState<BlogType>({
    title: '',
    desc: '',
    time: '',
    id: '',

  });

  const navigate = useNavigate();

  const fetchBlog = useCallback(async () => {
    if (id) {
      const blogResponse = await axiosApi.get("/blog/" + id + ".json");
      setBlog(blogResponse.data)
    }
  }, [id])

  useEffect(() => {
    fetchBlog().catch(console.error)
  }, [fetchBlog]);

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const dateTime = new Intl.DateTimeFormat(
      "en",
      {day: "numeric", month: "long", year: "numeric", weekday: "long"})
      .format(new Date()).replace(/(\s?г\.?)/, "");

    const {name, value} = e.target;
    setBlog(prev => ({...prev, time: dateTime, [name]: value}));
  }

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (id) {
        await axiosApi.put("blog/" + id+ ".json", blog);
      } else {
        await axiosApi.post("/blog.json", blog);
      }
    } catch(e) {
      console.error('error', e);
    }
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={formSubmit}>
        <div>
          <div>
            <label htmlFor={"title"}>Title</label>
          </div>
          <input defaultValue={blog.title} onChange={formChange} type={"text"} name={"title"}/>
        </div>
        <div>
          <div>
            <label htmlFor={"desc"}>Description</label>
          </div>
          <input defaultValue={blog.desc} onChange={formChange} type={"text"} name={"desc"}/>
        </div>
        <button type={"submit"}>Save</button>
      </form>
    </div>
  );
};

export default FormBlog;