import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import "./AboutEdit.css";
import Preloader from "../Preloader/Preloader";

const AboutEdit = () => {
  const [about, setAbout] = useState<{ aboutText: string }>({aboutText: ''});
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchAbout = useCallback(async () => {
    setLoader(true);
    try {
      const aboutResponse = await axiosApi.get("about.json");
      const about = aboutResponse.data;
      setAbout(prev => ({
        ...prev,
        aboutText: about.aboutText,
      }))
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchAbout().catch(console.error);
  }, [fetchAbout]);

  const btnSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosApi.put("about.json", {aboutText: about.aboutText});
      navigate("/about");
    } catch (e) {
      console.error('error', e);
    }
  }

  const textAboutOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout({aboutText: e.target.value});
  }

  let content = (
    <form onSubmit={btnSave}>
      <textarea required className="aboutTextarea" defaultValue={about.aboutText} onChange={textAboutOnchange}/>
      <button className="btnEditSave" type={"submit"}>Save</button>
    </form>
  )

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div className="aboutEdit">
      {content}
    </div>
  );
};

export default AboutEdit;