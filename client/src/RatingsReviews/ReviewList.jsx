import React from 'react';
import IndividualTile from './IndividualTile.jsx';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';


class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      numDisplayed: null,
      showButton: false,
      sortOption: 'relevant'
    };
    this.rerender = this.rerender.bind(this);
  }

  // GET all reviews, based on sortOption
  getAllReviews(product_id) {
    axios.get(`${urlFragment}?product_id=${product_id}`)
      .then(allReviews => {
        this.setState({
          allReviews: allReviews.data.results
        });
      })
      .catch(err => console.error(err))
  }

  rerender() {
    this.getAllReviews(this.props.product_id);
  }

  componentDidMount() {
    this.getAllReviews(this.props.product_id);
  }

  // when dynamically generating IndividualTiles, only include reviews that match the filterOptions prop
  render() {
    return (
      <div>
        <div>REVIEW LIST COMPONENT</div>
        <div>Sort Options (dropdown: helpful, newest, relevant)</div>
        {this.state.allReviews.map(review => {
          return <IndividualTile
            review={review}
            key={review.review_id}
            rerender={this.rerender}
          />
        })}
        <button>More Reviews Button</button>
      </div>
    );
  }
}

export default ReviewList;