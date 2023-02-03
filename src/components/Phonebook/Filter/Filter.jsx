import styles from '../phonebook.module.scss'
import PropTypes from 'prop-types';

const Filter = ({handleChange, filter}) => {
  return (
    <div className={styles.block}>
      <label>Find contacts by name</label>
      <input name="filter" value={filter} onChange={handleChange} type="text" />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
}