import React from 'react';
import Styles from './Styles.js';


const OneHome = ({home}) => (
  <Styles.SingleHome>
    <div>
      <img src={home.photo} width="320" height="240" alt={home.id} />
    </div>
    <div>
      <Styles.BedsAndHouse>{home.beds}</Styles.BedsAndHouse>
      <Styles.Rating>&#11088;{home.rating}</Styles.Rating>
    </div>
    <div style={{ "clear": "both" }} />
    <Styles.Description {home.description} />
    <div style={{ "clear": "both" }}></div>
    <Styles.PricePerNight>{home.price} / night</Styles.PricePerNight>
  </Styles.SingleHome>
);

export default OneHome;
