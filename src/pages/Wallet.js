import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import fetchCoins from '../actions/apiAction';

class Wallet extends React.Component {
  componentDidMount() {
    const { addCurrenciesToGlobalState } = this.props;
    addCurrenciesToGlobalState();
  }

  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCurrenciesToGlobalState: () => dispatch(fetchCoins()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  addCurrenciesToGlobalState: PropTypes.func.isRequired,
};
