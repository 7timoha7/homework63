import React from 'react';
import FormBlog from "../../components/FormBlog/FormBlog";
import {useParams} from "react-router-dom";
import "./BlogAddOrEdit.css";

const BlogAddOrEdit = () => {
  const {id} = useParams();

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
      <FormBlog id={id}/>
    </div>
  );
};

export default BlogAddOrEdit;