import React from 'react';
import FormBlog from "../../components/FormBlog/FormBlog";
import {useParams} from "react-router-dom";

const BlogAddOrEdit = () => {
  const {id} = useParams();

  const addOfEdit = ()=> {
    if (id) {
      return <p>Edit blog</p>
    } else {
      return <p>Add blog</p>
    }
  }

  return (
    <div>
      {addOfEdit()}
      <FormBlog id={id}/>
    </div>
  );
};

export default BlogAddOrEdit;