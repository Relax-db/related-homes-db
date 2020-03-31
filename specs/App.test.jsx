import React from 'react';
import {mount, shallow} from 'enzyme';
import App from '../client/src/components/App.jsx';
import axios from 'axios';

// App renders
test('App component is rendered', () => {
const wrapper = shallow(
  <App />
  );
    expect(wrapper).toExist();
});
// App sends GET request to DB to get object w/ relatedHouses Property
test('App has GET request', () => {
      expect().toExist();
  });

// GET request is for specific house based on houseItem #
// App passes relatedHousesArray to HomesList as a prop