import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import updateExpenses from '../actions/expensesAction';
import totalPriceAction from '../actions/totalPriceAction';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
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
    const { addLocalStateToRedux, totalPrice } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    addLocalStateToRedux({ ...this.state, exchangeRates: data });

    const { value, currency } = this.state;

    totalPrice(value * data[currency].ask);
    this.setState((prev) => ({
      id: prev.id + 1,
      value: 0,
      description: '',
    }));
  }

  render() {
    const { coins } = this.props;
    const { value, description } = this.state;
    return (
      <form>
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
          testId="coins-input"
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
          Adicionar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addLocalStateToRedux: (value) => dispatch(updateExpenses(value)),
  totalPrice: (value) => dispatch(totalPriceAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  addLocalStateToRedux: PropTypes.func.isRequired,
  totalPrice: PropTypes.func.isRequired,
};