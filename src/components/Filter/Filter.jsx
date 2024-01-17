const Filter = ({ handleFilterContact }) => {
  return (
    <>
      <p>Find contact by name</p>
      <input type="text" name="filter" onChange={e => handleFilterContact(e)} />
    </>
  );
};

export default Filter;
