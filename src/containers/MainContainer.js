import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    allStocks: [],
    filteredStocks: [],
    portfolioStocks: [],
    checked: {alphabetical: false, price: false}
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocks => {
      this.setState({
        allStocks: stocks,
        filteredStocks: stocks
      })
    })
  }

  sortOnChangeHandler = event => {
    let sortCriteria = event.target.value
    let copyState = [...this.state.filteredStocks]
    if (sortCriteria === "Alphabetically") {
      copyState.sort((a, b) => {return a.name.localeCompare(b.name)})
      return this.setState({filteredStocks: copyState})
    }
    if (sortCriteria === "Price") {
      copyState.sort((a, b) => {return a.price - b.price})
      return this.setState({filteredStocks: copyState})
    }

  }

  onChangeHandler = event => {
    let filterWord = event.target.value
    let filteredStocks = this.state.allStocks.filter(stock => stock.type === filterWord)
    this.setState({filteredStocks: filteredStocks})
  }

  clickHandler = (stockObj) => {
    if (this.state.portfolioStocks.includes(stockObj)){
      let portfolioCopy = [...this.state.portfolioStocks]
      let arrayObjIndex = this.state.portfolioStocks.findIndex(stock => stock === stockObj)
      portfolioCopy.splice(arrayObjIndex, 1)
      this.setState({portfolioStocks: portfolioCopy})
    } else {
      let portfolioCopy = [...this.state.portfolioStocks]
      portfolioCopy.push(stockObj)
      this.setState({portfolioStocks: portfolioCopy}) 
    }
  }


  render() {
    return (
      <div>
        <SearchBar sortOnChangeHandler={this.sortOnChangeHandler} checked={this.state.checked} onChangeHandler={this.onChangeHandler}/>

          <div className="row">
            <div className="col-8">

              <StockContainer clickHandler={this.clickHandler} allStocks={this.state.filteredStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer clickHandler={this.clickHandler} portfolioStocks={this.state.portfolioStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
