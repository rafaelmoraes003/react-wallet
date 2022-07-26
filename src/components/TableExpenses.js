import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import deleteExpense from '../actions/deleteExpenseAction';
import updateForm from '../actions/editFormAction';
import './TableExpenses.css';

class TableExpenses extends React.Component {
  removeExpense = ({ target }) => {
    const { id } = target;
    const { expenses, removeExpense } = this.props;
    const removeItem = expenses.filter((item) => item.id !== Number(id));
    Swal.fire('Sua despesa foi removida!', '', 'success');
    removeExpense(removeItem);
  }

  editExpense = ({ target }) => {
    const { id } = target;
    const { editForm } = this.props;
    editForm(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 && (
              expenses.map((expense) => (
                <tr key={ expense.description }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
                  <td>
                    {
                      Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      (expense.value * expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      id={ expense.id }
                      onClick={ this.editExpense }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      id={ expense.id }
                      onClick={ this.removeExpense }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (value) => dispatch(deleteExpense(value)),
  editForm: (value) => dispatch(updateForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
};
