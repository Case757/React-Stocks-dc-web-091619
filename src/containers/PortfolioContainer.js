import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {


  renderPortfolio() {
    return this.props.portfolioStocks.map(stock => {
      return <Stock clickHandler={this.props.clickHandler} stock={stock}/>
    })
  }
  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.renderPortfolio()
          }
      </div>
    );
  }

}

export default PortfolioContainer;
