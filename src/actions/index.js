// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCIES = 'CURRENCIES';

export const login = (payload) => (
  { type: USER_LOGIN, payload }
);

export const currenciesAction = (payload) => (
  { type: CURRENCIES, payload }
);
