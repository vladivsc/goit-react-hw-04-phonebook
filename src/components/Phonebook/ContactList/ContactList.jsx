import styles from '../phonebook.module.scss'
import PropTypes from 'prop-types';

const ContactList = ({removeContact, contacts}) => {
  const contact = contacts.map(({id, name, number}) =><div key={id} className={styles.blockItem}><li >{name} {number}</li>
  <button onClick={() => removeContact(id)} type="button" className={styles.btnDelete}>Delete</button></div> )
  return (
    <ul className={styles.list}>
    {contact}
  </ul>
  )
}

export default ContactList;

ContactList.defaultProps = {
  items: []
}

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts:PropTypes.arrayOf( PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }))
}