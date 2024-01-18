import React, { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactListItem from './ContactListItem/ContactListItem';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('contacts'));
    return data || [];
  });

  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const handleRemoveContact = id => {
    const clearContact = contacts.filter(item => item.id !== id);
    setContacts(clearContact);
  };

  const handleFilterContact = e => {
    const filtered = e.target.value.toLowerCase();
    setFilter(filtered);
  };

  const handlePushContact = contact => {
    setContacts([...contacts, contact]);
  };

  const filteredContactList = filter
    ? contacts.filter(item => item.name.toLowerCase().includes(filter))
    : contacts;

  return (
    <div className="contact-container">
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} handlePushContact={handlePushContact} />
      {contacts.length === 0 ? (
        ''
      ) : (
        <>
          <h2>Contacts</h2>
          <Filter handleFilterContact={handleFilterContact} />
          <ContactList>
            {filteredContactList.map(({ id, name, number }) => {
              return (
                <ContactListItem
                  key={id}
                  name={name}
                  number={number}
                  handleRemoveContact={() => handleRemoveContact(id)}
                />
              );
            })}
          </ContactList>
        </>
      )}
    </div>
  );
};

export default App;
