import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAction, editExpenseAction } from '../actions';
import './table.css';

class Table extends Component {
  render() {
    const { expenses, delExpenses } = this.props;
    return (
      <div className="table-container">
        <table className="box-table">
          <thead>
            <tr>
              <th>Descrição |</th>
              <th>Tag |</th>
              <th>Método de pagamento |</th>
              <th>Valor |</th>
              <th>Moeda |</th>
              <th>Câmbio utilizado |</th>
              <th>Valor convertido |</th>
              <th>Moeda de conversão |</th>
              <th>Editar/Excluir</th>
            </tr>
            { expenses.map(({
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
              id,
            }) => {
              const { name, ask } = exchangeRates[currency];
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2).toString()}</td>
                  <td>{currency}</td>
                  <td>{name}</td>
                  <td>{Number(ask).toFixed(2).toString()}</td>
                  <td>{Number(value * ask).toFixed(2).toString()}</td>
                  <td>Real</td>
                  <td>
                    <button
                      className="button-delete"
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => editExpenseAction(id) }
                    >
                      Editar
                    </button>
                    <button
                      className="button-edit"
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => delExpenses(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.any),
  })).isRequired,
  delExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpenses: (value) => dispatch(deleteAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
