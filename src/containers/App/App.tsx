import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import BlogList from "../BlogList/BlogList";
import BlogAddOrEdit from "../BlogAddOrEdit/BlogAddOrEdit";
import BlogReadMore from "../BlogReadMore/BlogReadMore";
import About from "../About/About";
import AboutEdit from "../../components/AboutEdit/AboutEdit";
import Contacts from "../Contacts/Contacts";
import ContactsEdit from "../../components/ContactsEdit/ContactsEdit";
import "./App.css";

function App() {
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
          <BlogAddOrEdit/>
        )}/>
        <Route path={"/about"} element={(
          <About/>
        )}>
          <Route path={"edit"} element={(
            <AboutEdit/>
          )}/>
        </Route>
        <Route path={"/contacts"} element={(
          <Contacts/>
        )}>
          <Route path={"editContacts"} element={(
            <ContactsEdit/>
          )}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
