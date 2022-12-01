import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import BlogList from "../BlogList/BlogList";
import AddBlog from "../BlogAddOrEdit/BlogAddOrEdit";
import BlogReadMore from "../BlogReadMore/BlogReadMore";
import BlogAddOrEdit from "../BlogAddOrEdit/BlogAddOrEdit";
import "./Appblog.css";

const AppBlog = () => {
  return (
    <div className="appBlog">
      <header>
        <NavBar/>
      </header>
      <Routes>
        <Route path={"/"} element={(
          <BlogList/>
        )}/>
        <Route path="/add" element={(
          <BlogAddOrEdit/>
        )}/>
        <Route path={"/blogReadMore/:id"} element={(
          <BlogReadMore/>
        )}/>
        <Route path={"/edit/:id"} element={(
          <AddBlog/>
        )}/>
      </Routes>
    </div>
  );
};

export default AppBlog;