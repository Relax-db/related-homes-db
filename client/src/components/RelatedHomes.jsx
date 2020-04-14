/* eslint-disable lines-between-class-members */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import HomesList from './HomesList';

// let url = window.location.search;
// console.log('this is url: ', url);
// let pageGrabber = () => {
//   let array = url.split('=')
//   console.log('array: ', array)
//   if (array.length === 2) {
//     return array[1];
//   } else {
//     return 1;
//   }
// };

const RelatedHomes = ({ original, homes }) => (
  <div>
    <h1> More Homes You Might Like</h1>
    <HomesList houseId={original} homes={homes} />
  </div>
);


export default RelatedHomes;
