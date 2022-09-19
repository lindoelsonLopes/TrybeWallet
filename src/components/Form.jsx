/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesAction, total } from '../actions';
import { getExchange } from '../services/currencies';
import './form.css';

const INITIAL_STATE = {
  value: '',
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
      <section>
        <div className="form-box">
          <form className="form-container">
            <div className="field">
              <label htmlFor="description">
                Descrição da despesa
              </label>
            </div>
                <div className="control-description">
                  <input
                    type="text"
                    name="description"
                    value={ description }
                    id="description"
                    data-testid="description-input"
                    onChange={ this.handleChange }
                  />
                </div>
              
            <div className="field">
              <label htmlFor="tag">
                Categoria da despesa
              </label>
            </div>
                <div className="control-category">                  
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
                  
                </div>

            <div className="field">
              <label htmlFor="value" className="label">
                Valor
              </label>
            </div>
                <div className="control-value">
                  <input
                    type="number"
                    name="value"
                    value={ value }
                    id="value"
                    data-testid="value-input"
                    onChange={ this.handleChange }
                  />
                </div>
              
            <div className="field">
              <label htmlFor="method">
                Método de pagamento
              </label>
            </div>
                <div className="control-method">
                  
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
                  
                </div>
              
            <div>  
              <label htmlFor="currency" className="label-currencies">
                Moeda
              </label>
            </div>
                <div className="control-currency">
                  
                    <select
                      name="currency"
                      value={ currency }
                      onChange={ this.handleChange }
                      id="currency"
                      data-testid="currency-input"
                    >
                      {currencies.map((e) => (
                        <option key={ e }>{e}</option>
                      ))}
                    </select>
                  
                </div>
              

          </form>

          </div>
          <div className="button-box">
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar Despesa
            </button>
        </div>
      </section>
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
