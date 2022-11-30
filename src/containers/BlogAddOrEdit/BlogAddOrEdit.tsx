import React from 'react';
import FormBlog from "../../components/FormBlog/FormBlog";
import {useParams} from "react-router-dom";

const BlogAddOrEdit = () => {
  const {id} = useParams()
  return (
    <div>
      <FormBlog id={id}/>
    </div>
  );
};

export default BlogAddOrEdit;