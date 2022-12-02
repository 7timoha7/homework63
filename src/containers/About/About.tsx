import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import "./About.css";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";

const About = () => {

  const [about, setAbout] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const location = useLocation();


  const fetchAbout = useCallback(async () => {
    setLoader(true)
    try {
      const aboutResponse = await axiosApi.get("/about.json");
      const about = aboutResponse.data;
      setAbout(about["aboutText"]);
    } finally {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    fetchAbout().catch(console.error);
  }, [fetchAbout, location]);

  let content = (
    <div className="aboutBox">
      <p>{about}</p>
      <NavLink className="aboutLink" to={"edit"}>Edit</NavLink>
    </div>
  )

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div className="about">
      <h2>About us</h2>
      {content}
      <Outlet/>
    </div>
  );
};

export default About;