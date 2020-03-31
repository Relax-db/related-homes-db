import React from 'react';
import Styles from './Styles.js';


class OneHome extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Styles.SingleHome onClick={() => {this.props.changeCurrentHouse(this.props.home.houseId)}} id={this.props.home._id}>
      <div>
        <img src={this.props.home.photoSrc} width="320" height="240" alt="Picture of a House"></img>
      </div>
      <div>
        <Styles.BedsAndHouse>{this.props.home.bedsAndHouse}</Styles.BedsAndHouse>
        <Styles.Rating>&#11088;{this.props.home.rating}</Styles.Rating>
      </div>
      <div style={{"clear": "both"}}></div>
      <Styles.Description>{this.props.home.description}</Styles.Description>
      <div style={{"clear": "both"}}></div>
      <Styles.PricePerNight>{this.props.home.pricePerNight} / night</Styles.PricePerNight>

      </Styles.SingleHome>
    );
  }
}

export default OneHome;