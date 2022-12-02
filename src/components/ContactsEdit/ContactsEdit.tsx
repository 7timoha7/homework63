import React, {useCallback, useEffect, useState} from 'react';
import "./ContactsEdit.css";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const ContactsEdit = () => {

  const [contactsState, setContactsState] = useState({
    tel: '',
    address: '',
  });

  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchContacts = useCallback(async () => {
    setLoader(true);
    try {
      const contactsResponse = await axiosApi.get("contacts.json");
      const contacts = contactsResponse.data;
      setContactsState(prev => ({
        ...prev,
        tel: contacts.tel,
        address: contacts.address,
      }));
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts().catch(console.error);
  }, [fetchContacts]);

  const btnSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosApi.put("contacts.json", {tel: contactsState.tel, address: contactsState.address});
      navigate("/contacts");
    } catch (e) {
      console.error('error', e);
    }
  }

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {name, value} = e.target;
    setContactsState(prev => ({...prev, [name]: value}));
  }

  let content = (
    <form onSubmit={btnSave}>
      <div className="labelTelAddress">
        <label htmlFor="tel">Tel: </label>
      </div>
      <input required className="inputTelAddress" type="text" name="tel" defaultValue={contactsState.tel}
             onChange={formChange}/>
      <div className="labelTelAddress">
        <label htmlFor="address">Address: </label>
      </div>
      <input required className="inputTelAddress" type="text" name="address" defaultValue={contactsState.address}
             onChange={formChange}/>
      <button className="btnContactsSave" type={"submit"}>Save</button>
    </form>
  );

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div className="contactsEdit">
      {content}
    </div>
  );
};

export default ContactsEdit;