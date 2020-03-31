import styled from 'styled-components'

const AllHouses = styled.div`
  position: relative;
  max-width: 250px;
`;

const AllHousesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 1000px;
  padding: 10px;
  border: 2px;
  overflow-y: scroll;
`;

const SingleHome = styled.div`
  width: 320px;
  margin-left: 10px;
`;

const BedsAndHouse = styled.span`
  width: auto;
  display:block;
  float: left;
  position: relative;
`;

const Rating = styled.span`
  width: auto;
  display:block;
  float: right;
  position: relative;
`;

const Description = styled.div`
  position: relative;
`;

const PricePerNight = styled.div``;

export default { AllHouses, AllHousesWrapper, SingleHome, BedsAndHouse, Rating, Description, PricePerNight }