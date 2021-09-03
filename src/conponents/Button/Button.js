import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ incrementPage }) => (
  <button type="button" className={s.button} onClick={incrementPage}>
    Load mode
  </button>
);
export default Button;

Button.propTypes = {
  incrementPage: PropTypes.func,
};
