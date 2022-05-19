import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';

class ExpenseForm extends React.Component {
  render() {
    const { coins } = this.props;
    return (
      <form>
        <Input
          type="number"
          label="Valor"
          name="value"
          testId="value-input"
        />

        <Select
          label="Moeda"
          name="coin"
          list={ coins }
          testId="coins-input"
        />

        <Select
          label="Método de Pagamento"
          name="method"
          list={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          testId="method-input"
        />

        <Select
          label="Categoria"
          name="tag"
          list={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          testId="tag-input"
        />

        <Input
          type="text"
          label="Descrição"
          name="description"
          testId="description-input"
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  coins: PropTypes.shape([]).isRequired,
};
