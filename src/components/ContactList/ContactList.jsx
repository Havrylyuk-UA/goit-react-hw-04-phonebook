import './ContactList.css';

const ContactList = ({ name, number, handleRemoveContact }) => {
  return (
    <>
      <li>
        {name}: {number}
        <button
          type="button"
          className="delete-btn"
          onClick={handleRemoveContact}
        >
          Delete
        </button>
      </li>
    </>
  );
};

export default ContactList;
