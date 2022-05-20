import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, price } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        {price.length <= 0 && (
          <h4 data-testid="total-field">0</h4>
        )}
        {price.length > 0 && (
          <h4 data-testid="total-field">
            {
              price.reduce((acc, curr) => acc + curr, 0).toFixed(2)
            }
          </h4>
        )}
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  price: state.totalPrice.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  price: PropTypes.arrayOf(PropTypes.string).isRequired,
};
