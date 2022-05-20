import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { label, name, list, testId, onChange } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <select name={ name } id={ name } data-testid={ testId } onChange={ onChange }>
          {list.map((item) => (
            <option
              key={ item }
              value={ item }
            >
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

export default Select;

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
