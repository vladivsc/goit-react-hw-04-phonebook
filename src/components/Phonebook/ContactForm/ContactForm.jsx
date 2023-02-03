import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../phonebook.module.scss'

class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  }

  handleSubmit = evt => {
    evt.preventDefault();

    const {onSubmit} = this.props;

    onSubmit({...this.state});
    this.setState({
      name: '',
      number:''
    })
  };

  handleChange = ({target}) => {
    const {name, value} = target;
    this.setState({
      [name]: value
    })
  }
  
  render() {
    const {handleChange, handleSubmit} = this;
    const { name, number} = this.state;

    return (
    <div className={styles.block}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label>Number</label>
          <input
            onChange={handleChange}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit" className={styles.btn}>Add contacts</button>
        </div>
      </form>
    </div>
    )
  }
}

export default ContactForm;


ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}