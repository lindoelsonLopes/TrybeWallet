import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaUserAlt } from 'react-icons/fa';
import Logo from '../images/logoWallet2.png';
import './header.css';

class Header extends Component {
  totalValue = () => {
    const { expenses } = this.props;
    let totalSum = 0;
    expenses.forEach((item) => {
      totalSum += Number(item.value) * Number(item.exchangeRates[item.currency].ask);
    });
    return totalSum.toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <header className="header">
        
          <div className="header-box">
            <img src={ Logo } alt="" />

            <div>
              <span
                data-testid="total-field"
                className="header-totalExpenses"
              >
                Total de despesas:
                {this.totalValue()}
              </span>
              <span data-testid="header-currency-field">BRL</span>
            </div>

            <div className="login-box">
              <FaUserAlt />
              <p data-testid="email-field">{ `${email}`}</p>
            </div>            

          </div>
        
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Header.defaultProps = {
  email: '',
};

export default connect(mapStateToProps)(Header);
