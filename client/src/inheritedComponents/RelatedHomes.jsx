import React, { Component } from 'react';
import OneHome from './OneHome';
import Styles from './Styles';
import Axios from 'axios';

class RelatedHomes extends Component {
  constructor(props) {
    super(props);

    let relativeProperties;

    if (__isBrowser__) {
      relativeProperties = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } 

    this.state = {
      relativeProperties,
      loading: relativeProperties ? false: true,
    }
  }

  componentDidMount() {
    if (!this.state.relativeProperties) {
      console.log('client side rendering');
      Axios.get(`http://localhost:3005/api/location/${this.props.location}`)
        .then((response) => {
          this.setState({ 
            relativeProperties: response.data,
            loading: false,
          })
        })
    }
  }

  render() {
    const properties = this.state.relativeProperties;
    const original = this.props.original;

    if (this.state.loading === true) {
      return <div>loading</div>
    }

    return (
      <div>
        <h4>More Places to Stay</h4>
        <Styles.AllHouses>
          <Styles.AllHousesWrapper>
          {
              (properties.length !== 0) ? properties.map((property) => (original !== property.id) ? <OneHome home={property} /> : null) 
            : (<div>There seems to be no related homes</div>)
          }
          </Styles.AllHousesWrapper>
        </Styles.AllHouses>
      </div>
    )
  }
}



export default RelatedHomes;
