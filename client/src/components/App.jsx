import React from 'react';
import HomesList from './HomesList.jsx';

let url = window.location.search;
console.log('this is url: ', url)
let pageGrabber = () => {
  let array = url.split('=')
  console.log('array: ', array)
  if (array.length === 2) {
  return array[1];
  } else {
    return 1;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHouse: pageGrabber()
    }
    this.changeCurrentHouse = this.changeCurrentHouse.bind(this);
  }
  changeCurrentHouse (newHouse) {
    this.setState({currentHouse: newHouse})
  }

  render() {
    return (

      <div>
        <h1> More Homes You Might Like</h1>
        <HomesList houseId={this.state.currentHouse} changeCurrentHouse={this.changeCurrentHouse}/>
      </div>
    )
  }
}

export default App;