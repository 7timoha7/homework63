import React, {useState} from 'react';
import {BlogApi, BlogType} from "../../types";
import "./FormBlog.css";
import Preloader from "../Preloader/Preloader";

interface Props {
  existingPost?: BlogType;
  onSubmit: (postData: BlogApi) => void;
  loader: boolean;
}

const FormBlog: React.FC<Props> = ({onSubmit, existingPost, loader}) => {
  const initialState = existingPost ? existingPost : {
    title: '',
    desc: '',
    time: ''
  };
  const [formData, setFormData] = useState(initialState);

  const formChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dateTime = new Date().toLocaleString();

    const {name, value} = e.target;
    setFormData(prev => ({...prev, time: dateTime, [name]: value}));
  }

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  }

  let content = (
    <form onSubmit={formSubmit}>
      <div>
        <div className="label">
          <label htmlFor={"title"}>Title:</label>
        </div>
        <input required className="inputTitle" defaultValue={formData.title} onChange={formChange} type={"text"}
               name={"title"}/>
      </div>
      <div>
        <div className="label">
          <label htmlFor={"desc"}>Description:</label>
        </div>
        <textarea required className="inputDesc" defaultValue={formData.desc} onChange={formChange} name={"desc"}/>
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