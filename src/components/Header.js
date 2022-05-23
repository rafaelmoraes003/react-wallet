import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header-container">
        <h3
          className="user"
          data-testid="email-field"
        >
          <i className="fa-solid fa-circle-user" />
          {email}
        </h3>
        <h2>
          TrybeWallet
          <i className="fa-solid fa-wallet" />
        </h2>
        <div>
          {expenses.length <= 0 && (
            <h3 data-testid="total-field">
              <span>Gastos:</span>
              0
            </h3>
          )}
          {expenses.length > 0 && (
            <h3 data-testid="total-field">
              <span>Gastos:</span>
              {
                expenses.map((expense) => (
                  expense.value * expense.exchangeRates[expense.currency].ask
                )).reduce((acc, curr) => acc + curr, 0).toFixed(2)
              }
            </h3>
          )}
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
