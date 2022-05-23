import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Input from './Input';
import Select from './Select';
import updateExpenses from '../actions/expensesAction';
import updateForm from '../actions/editFormAction';
import editExpense from '../actions/editExpense';
import './ExpenseForm.css';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  sendLocalStateToRedux = async (e) => {
    e.preventDefault();
    const { value, currency, method, tag, description } = this.state;
    const { enableEditForm, expenses, expenseId, editExpenses, editForm } = this.props;

    if (value > 0 && !enableEditForm) { // FORMULÁRIO DE ADICIONAR DESPESA
      const { addLocalStateToRedux } = this.props;
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
      addLocalStateToRedux({ id: newId, ...this.state, exchangeRates: data });
      this.setState({ value: 0, description: '' });
    } else if (value > 0 && enableEditForm) { // FORMULÁRIO DE EDITAR DESPESA
      const editedExpense = expenses.map((item) => {
        if (item.id === Number(expenseId)) {
          item.value = value;
          item.currency = currency;
          item.method = method;
          item.tag = tag;
          item.description = description;
        }
        return item;
      });
      editExpenses(editedExpense);
      Swal.fire('Sua despesa foi alterada!', '', 'success');
      editForm(expenseId);
    }
  }

  render() {
    const { coins, buttonText } = this.props;
    const { value, description } = this.state;
    return (
      <form className="expenses-form">
        <Input
          type="number"
          label="Valor"
          name="value"
          testId="value-input"
          value={ value }
          onChange={ this.handleChange }
        />

        <Select
          label="Moeda"
          name="currency"
          list={ coins }
          testId="currency-input"
          onChange={ this.handleChange }
        />

        <Select
          label="Método de Pagamento"
          name="method"
          list={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          testId="method-input"
          onChange={ this.handleChange }
        />

        <Select
          label="Categoria"
          name="tag"
          list={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          testId="tag-input"
          onChange={ this.handleChange }
        />

        <Input
          type="text"
          label="Descrição"
          name="description"
          testId="description-input"
          value={ description }
          onChange={ this.handleChange }
        />

        <button
          type="submit"
          onClick={ this.sendLocalStateToRedux }
        >
          { buttonText }
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  expenses: state.wallet.expenses,
  enableEditForm: state.editForm.enableToEditForm,
  expenseId: state.editForm.id,
});

const mapDispatchToProps = (dispatch) => ({
  addLocalStateToRedux: (value) => dispatch(updateExpenses(value)),
  editExpenses: (value) => dispatch(editExpense(value)),
  editForm: (value) => dispatch(updateForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  addLocalStateToRedux: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  buttonText: PropTypes.string.isRequired,
  enableEditForm: PropTypes.bool.isRequired,
  editExpenses: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
  expenseId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
