import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { login } from '../actions';
import './login.css';
import Wallet from '../images/wallet.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      showEye: false,
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

   handleClick = (e) => {
     e.preventDefault();
     this.setState((state) => ({
       showEye: !state.showEye }));
   };

   render() {
     const { isDisabled, email, password, showEye } = this.state;
     const { userLogin } = this.props;
     return (
       <div className="login">
         <div className="login-logo">
           <img src={ Wallet } alt="imagem de uma carteira" />
         </div>
         <div className="login-right">
           <h1>Login Here</h1>
           <div className="loginInputEmail">
             <MdEmail />
             <label htmlFor="email">
               <input
                 name="email"
                 type="email"
                 data-testid="email-input"
                 placeholder="Digite seu email"
                 value={ email }
                 onChange={ this.handleChange }
               />
             </label>
           </div>
           <div className="loginInputPassword">
             <MdLock />
             {/* <label htmlFor="password"> */}
             <input
               name="password"
               type={ showEye ? 'text' : 'password' }
               data-testid="password-input"
               placeholder="Digite a senha"
               value={ password }
               onChange={ this.handleChange }
             />
             {/* </label> */}
             <div className="login-eye">
               {showEye ? (
                 <AiFillEye
                   size={ 20 }
                   onClick={ this.handleClick }
                 />
               ) : (
                 <AiFillEyeInvisible
                   size={ 20 }
                   onClick={ this.handleClick }
                 />
               )}
             </div>
           </div>

           <Link className="login-btn" to="/carteira">
             <button
               type="button"
               disabled={ isDisabled }
               onClick={ () => { userLogin(email); } }
             >
               Entrar
             </button>
           </Link>
         </div>
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
