import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesAction, total } from '../actions';
import { getExchange } from '../services/currencies';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class Form extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({
      [name]: value,
    }));
  }

  getTotal = (expenses, exchangeRates) => {
    const { value, currency } = this.state;
    return (expenses.reduce(
      (acc, item) => acc
      + (parseFloat(item.value) * item.exchangeRates[item.currency].ask), 0,
    ) + (parseFloat(value) * exchangeRates[currency].ask)).toFixed(2);
  }

  handleClick = async () => {
    const { addExpense, expenses, setTotal } = this.props;
    this.setState({ id: expenses.length, exchangeRates: await getExchange() }, () => {
      const { exchangeRates } = this.state;
      addExpense(this.state);
      setTotal(this.getTotal(expenses, exchangeRates));
      this.setState(INITIAL_STATE);
    });
  }

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            id="value"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            id="description"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="currency"
            data-testid="currency-input"
          >
            {currencies.map((e) => <option key={ e }>{e}</option>)}
          </select>
        </label>
        <label htmlFor="method">
          Método:
          <select
            name="method"
            value={ method }
            onChange={ this.handleChange }
            id="method"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            id="tag"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  setTotal: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(expensesAction(expense)),
  setTotal: (totalExpense) => dispatch(total(totalExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
