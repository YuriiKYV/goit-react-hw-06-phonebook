import { useDispatch, useSelector } from 'react-redux';
import { removedContact } from 'redux/contacts-slice';

export default function ContactList() {

  const { contacts } = useSelector(store => store.contacts);
  const filterValue = useSelector(store => store.filter);
  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    if (!filterValue) {
      return contacts;
    }

    const normalizedFilter = filterValue.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const resault = normalizedName.includes(normalizedFilter);
      return resault;
    });

    return filteredContacts;
  }

  const filterContacts = getFilteredContacts();

  const items = filterContacts.map(({ name, number, id }) => {
    return (
      <li key={id}>
        {name}: {number}{' '}
        <button onClick={() => dispatch(removedContact(id))}>Delete</button>
      </li>
    );
  });
  return <ul>{items}</ul>;
}

