import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { currenciesAction } from '../actions';
import getCurrencies from '../services/currencies';
import Form from '../components/Form';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    getCurrencies().then((json) => {
      currencies(json);
    });
  }

  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <Form />
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencies: (currencies) => dispatch(currenciesAction(currencies)),
});

export default connect(null, mapDispatchToProps)(Wallet);
