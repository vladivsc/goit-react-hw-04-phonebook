import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import styles from '../Phonebook/phonebook.module.scss';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    
    if(contacts){
      this.setState({contacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {contacts} = this.state;

    if(prevState.contacts !== contacts){
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }
  
  addContact = ({name, number}) => {
    this.setState(prevState => {
      const { contacts } = prevState;

      if (this.checkDuplicate(name)) {
        return alert(`${name} is already in contacts`);
      }

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
  };

  checkDuplicate(name) {
    const normalizeName = name.toLowerCase();
    const { contacts } = this.state;
    const contactName = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizeName;
    });
    return Boolean(contactName);
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(item => item.id !== id);

      return { contacts: newContact };
    });
  };

  handleFilter = ({target})=> {
    this.setState({filter: target.value})
}

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizeFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );

    return result;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length)

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2 className={styles.title}>Contacts</h2>
        <Filter handleChange={handleFilter} filter={filter} />
        <ContactList removeContact={removeContact} contacts={contacts} />
        {!isContacts && <p>No contacts in your phonebook!</p>}
      </div>
    );
  }
}

export default Phonebook;