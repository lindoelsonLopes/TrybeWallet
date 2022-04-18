// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCIES,
  CURRENCIES_FAIL,
  CURRENCIES_SUCCESS,
  EXPENSES,
  TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  fetchcurrencies: false,
  total: '',
  error: '',
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CURRENCIES:
    return {
      ...state,
      fetchcurrencies: true,
    };
  case CURRENCIES_FAIL:
    return {
      ...state,
      error: payload,
      fetchcurrencies: false,
    };
  case CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: payload,
      fetchcurrencies: false,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case TOTAL:
    return {
      ...state,
      total: payload,
    };
  default:
    return state;
  }
};

export default wallet;
