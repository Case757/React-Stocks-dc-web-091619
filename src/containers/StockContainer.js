import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  renderStocks = () => {
    return this.props.allStocks.map(stock => {
      return <Stock clickHandler={this.props.clickHandler} stock={stock}/>
    })
  }

  

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.renderStocks()
        }
      </div>
    );
  }

}

export default StockContainer;
