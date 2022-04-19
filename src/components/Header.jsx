import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <header>
        <p data-testid="email-field">{ `Email: ${email}`}</p>
        <p data-testid="total-field">{this.totalValue()}</p>
        <p data-testid="header-currency-field">BRL</p>
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
  expenses: PropTypes.arrayOf(PropTypes.number),
}.isRequired;

export default connect(mapStateToProps)(Header);
