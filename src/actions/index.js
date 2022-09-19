// Coloque aqui suas actions
import { getCurrencies } from '../services/currencies';

export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCIES = 'CURRENCIES';
export const CURRENCIES_FAIL = 'CURRENCIES_FAIL';
export const CURRENCIES_SUCCESS = 'CURRENCIES_SUCCESS';
export const EXPENSES = 'EXPENSES';
export const TOTAL = 'TOTAL';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const login = (payload) => (
  { type: USER_LOGIN, payload }
);

export const currenciesAction = (payload) => (
  { type: CURRENCIES, payload }
);

export const currenciesFail = (payload) => (
  { type: CURRENCIES_FAIL, payload }
);

export const currenciesSuccess = (payload) => (
  { type: CURRENCIES_SUCCESS, payload }
);

export const expensesAction = (payload) => (
  { type: EXPENSES, payload }
);

export const total = (payload) => (
  { type: TOTAL, payload }
);

export const setCurrencies = () => async (dispatch) => {
  dispatch(currenciesAction());
  try {
    dispatch(currenciesSuccess(await getCurrencies()));
  } catch (error) {
    dispatch(currenciesFail(error.message));
  }
};

export const deleteAction = (payload) => (
  { type: DELETE_EXPENSES, payload }
);

export const editExpenseAction = (payload) => (
  { type: EDIT_EXPENSE, payload }
);
