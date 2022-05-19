import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  hanldeChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  enableButton = () => {
    const { email, password } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const PASSWORD_MAX_LENGTH = 6;
    return email.match(regex) && password.length >= PASSWORD_MAX_LENGTH;
  }

  sendInfo = () => {
    const { sendUserData, history } = this.props;
    sendUserData(this.state);
    history.push('/carteira');
  }

  render() {
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="text"
            data-testid="email-input"
            id="email"
            onChange={ this.hanldeChange }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            data-testid="password-input"
            id="password"
            onChange={ this.hanldeChange }
          />
        </label>

        <button
          type="button"
          onClick={ this.sendInfo }
          disabled={ !this.enableButton() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUserData: (value) => dispatch(userAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendUserData: PropTypes.func.isRequired,
};
