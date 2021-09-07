import React, { useState, useEffect } from "react";

import Form from "./components/Form";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import initialContacts from "./components/Data/InitialContacts.json";
import shortid from "shortid";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("contacts")) ?? initialContacts
    );
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} already exsist at phonebook `);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts((prevContacts) => [contact, ...prevContacts]);
  };
  const contactDelete = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };
  const getContactshown = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div>
      <Form onSubmit={formSubmitHandler} />
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getContactshown()}
        onDeleteContact={contactDelete}
      />
    </div>
  );
}
