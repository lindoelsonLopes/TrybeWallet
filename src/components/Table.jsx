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
        <table className="content-table">
          <thead>
            <tr>
              <th width="100px">Descrição</th>
              <th width="100px">Valor</th>
              <th width="100px">Tag</th>
              <th width="100px">Método de pagamento</th>
              <th width="100px">Moeda</th>
              <th width="100px">Câmbio utilizado</th>
              <th width="100px">Valor convertido</th>
              <th width="100px">Moeda de conversão</th>
              <th width="100px">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>           
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
                  <td width="100px">{description}</td>
                  <td width="100px">{tag}</td>
                  <td width="100px">{Number(value).toFixed(2).toString()}</td>
                  <td width="100px">{method}</td>
                  <td width="100px">{currency}</td>
                  {/* <td>{name}</td> */}
                  <td width="100px">{Number(ask).toFixed(2).toString()} {name}</td>
                  <td width="100px">{Number(value * ask).toFixed(2).toString()}</td>
                  <td width="100px">Real</td>
                  <td width="100px">
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
          </tbody>
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
