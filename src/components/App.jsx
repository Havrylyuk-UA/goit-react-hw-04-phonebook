import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const initialValue = {
  contacts: [],
  filter: '',
};

const App = () => {
  const [contacts, setContacts] = useState(initialValue);

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');

    if (localContacts) {
      setContacts({ contacts: JSON.parse(localContacts) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts.contacts));
  }, [contacts.contacts]);

  const handleRemoveContact = id => {
    setContacts({ contacts: contacts.contacts.filter(item => item.id !== id) });
  };

  const handleFilterContact = e => {
    setContacts({ ...contacts, filter: e.target.value.toLowerCase() });
  };

  const handlePushContact = contact => {
    setContacts({ ...contacts, contacts: [...contacts.contacts, contact] });
  };

  const filteredContactList = contacts.filter
    ? contacts.contacts.filter(item =>
        item.name.toLowerCase().includes(contacts.filter)
      )
    : contacts.contacts;

  return (
    <div className="contact-container">
      <h1>Phonebook</h1>
      <ContactForm
        contacts={contacts.contacts}
        handlePushContact={handlePushContact}
      />
      {contacts.contacts.length === 0 ? (
        ''
      ) : (
        <>
          <h2>Contacts</h2>
          <Filter handleFilterContact={handleFilterContact} />
          <ul>
            {filteredContactList.map(({ id, name, number }) => {
              return (
                <ContactList
                  key={id}
                  name={name}
                  number={number}
                  handleRemoveContact={() => handleRemoveContact(id)}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
