import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import "./Contacts.css";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";

const Contacts = () => {

  const [contactsState, setContactsState] = useState({
    tel: '',
    address: '',
  });

  const [loader, setLoader] = useState<boolean>(false);

  const location = useLocation();

  const fetchContacts = useCallback(async () => {
    setLoader(true);
    try {
      const contactsResponse = await axiosApi.get("contacts.json");
      setContactsState(prev => ({
        ...prev,
        tel: contactsResponse.data.tel,
        address: contactsResponse.data.address,
      }));
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts().catch(console.error);
  }, [fetchContacts, location]);

  let content = (
    <div className="contactsBox">
      <p className="telP">Tel: <span className="telSpan">{contactsState.tel}</span></p>
      <p className="telP">Address: <span className="telSpan">{contactsState.address}</span></p>
      <NavLink className="contactsLink" to={"editContacts"}>Edit</NavLink>
    </div>
  );

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div className="contacts">
      <h2>Contacts</h2>
      {content}
      <Outlet/>
    </div>
  );
};

export default Contacts;