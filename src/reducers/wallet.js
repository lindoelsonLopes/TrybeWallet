// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };
  default:
    return state;
  }
};

export default wallet;
