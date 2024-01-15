import './ContactForm.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';

const initialValue = {
  name: '',
  number: '',
};

const ContactForm = ({ contacts, handlePushContact }) => {
  const [contact, setContact] = useState(initialValue);

  const handlePushForm = e => {
    e.preventDefault();

    if (contacts && contacts.some(item => item.name === contact.name)) {
      return alert(`${contact.name} is already in contact!`);
    }

    const pushCon = {
      ...contact,
      id: nanoid(10),
    };

    handlePushContact(pushCon);
    clearForm();
  };

  const clearForm = () => {
    setContact(initialValue);
  };

  const handleChangeName = e => {
    const targetName = e.target.value;
    setContact(prevContact => ({
      ...prevContact,
      name: targetName,
    }));
  };

  const handleChangeNumber = e => {
    const targetNumber = e.target.value;

    setContact(prevContact => ({
      ...prevContact,
      number: targetNumber,
    }));
  };

  return (
    <>
      <form onSubmit={handlePushForm}>
        <label>
          <legend>Name</legend>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChangeName}
            required
          />
        </label>
        <label>
          <legend>Number</legend>
          <input
            type="tel"
            name="number"
            value={contact.number}
            onChange={handleChangeNumber}
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </>
  );
};

export default ContactForm;
