import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { setCurrencies as currenciesAction } from '../actions';
import Form from '../components/Form';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
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
