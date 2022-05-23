import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import TableExpenses from '../components/TableExpenses';
import fetchCoins from '../actions/apiAction';

class Wallet extends React.Component {
  componentDidMount() {
    const { addCurrenciesToGlobalState } = this.props;
    addCurrenciesToGlobalState();
  }

  render() {
    const { editForm } = this.props;
    return (
      <div className="wallet-container">
        <Header />
        { !editForm && <ExpenseForm buttonText="Adicionar despesa" /> }
        { editForm && <ExpenseForm buttonText="Editar despesa" /> }
        <TableExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editForm: state.editForm.enableToEditForm,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrenciesToGlobalState: () => dispatch(fetchCoins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  addCurrenciesToGlobalState: PropTypes.func.isRequired,
  editForm: PropTypes.bool.isRequired,
};
