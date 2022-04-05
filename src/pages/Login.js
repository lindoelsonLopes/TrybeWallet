import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  validate = () => {
    const { email, password } = this.state;
    const regex = /^[a-z0-9_]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const six = 6;
    const isValidate = regex.test(email);
    if (isValidate && password.length >= six) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  render() {
    const { isDisabled, email, password } = this.state;
    const { userLogin } = this.props;
    return (
      <div className="login">
        <form className="login__form">
          <h1>Login Here</h1>
          <label htmlFor="email">
            <input
              name="email"
              type="email"
              data-testid="email-input"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            <input
              name="password"
              type="password"
              data-testid="password-input"
              placeholder="senha"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>

          <Link to="/carteira">
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ () => { userLogin(email); } }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
