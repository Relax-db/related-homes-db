import React from 'react';
const axios = require('axios');
import OneHome from './OneHome.jsx';
import Styles from './Styles.js';

const HomesList = ({ homes }) => (
  <Styles.AllHouses>
    <Styles.AllHousesWrapper>
      { homes.map((home) => <OneHome home={home} />) }
    </Styles.AllHousesWrapper>
  </Styles.AllHouses>
);

export default HomesList;
