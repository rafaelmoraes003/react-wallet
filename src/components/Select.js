import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { label, name, list, testId } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <select name={ name } id={ name } data-testid={ testId }>
          {list.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
    );
  }
}

export default Select;

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.shape([]).isRequired,
  testId: PropTypes.string.isRequired,
};
