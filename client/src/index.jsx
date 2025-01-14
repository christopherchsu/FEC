import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header.jsx';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      shoppingCart: [],
      currentItem_ID: 37311,
      details: {}
    }
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.databaseFetcher = this.databaseFetcher.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
  }

  //Add Item to cart/outfit
  componentDidMount() {
    this.databaseFetcher();
  }


  //Make A GET REQUEST and change state
  databaseFetcher() {
    axios.get('/products/' + this.state.currentItem_ID)
    .then(data => {
      this.setState({
        details: data.data
      })
    })
    .catch(err => {
      console.log('error fetching item details');
    })
  }

  changeCurrentProduct(newProduct){
    this.updateDetails(newProduct);
  }

  updateDetails(newId) {
    axios.get('/products/' + newId)
    .then(data => {
      this.setState({
        currentItem_ID: newId,
        details: data.data
      })
    })
    .catch(err => {
      console.log('error fetching new item details');
    })
  }

  handleSearch(term) {
    this.setState({
      currentItem_ID: term
    })
  }

  render() {
    return (
      <div>
        <Header onClick={this.handleSearch.bind(this)}/>
        <Overview currentItem_ID={this.state.currentItem_ID} />
        <RelatedItems changeCurrentProduct={this.changeCurrentProduct} currentItemId={this.state.currentItem_ID} currentItem={this.state.details} />
        <QuestionsAnswers product={this.state.details} />
        <RatingsReviews product_id={this.state.currentItem_ID} />
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
