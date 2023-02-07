import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import styles from '../Phonebook/phonebook.module.scss';

const Phonebook = () => {
  const [contacts, setContacts] = useState(()=> {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts])

  const checkDuplicate = name => {
    const normalizeName = name.toLowerCase();
    const contactName = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizeName;
    });
    return Boolean(contactName);
  };

  const addContact = ({ name, number }) => {
    if (checkDuplicate(name)) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
  };

  const removeContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizeFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizeFilter);
    });
    return result;
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={styles.title}>Contacts</h2>
      <Filter handleChange={handleFilter} filter={filter} />
      <ContactList removeContact={removeContact} contacts={filteredContacts} />
      {!isContacts && <p>No contacts in your phonebook!</p>}
    </div>
  );
};

export default Phonebook;