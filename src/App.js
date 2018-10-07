import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
  state = {
    markers: [],
    icons: {
      defaultIcon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      mouseOverIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    }
  }
  componentWillMount() {
    this.testFetch()
  }
  testFetch() {
    const url = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT*%20FROM%201EoMGaJVXfDZdNy8YLMXdVpVaxM2rdurHVgY4X10P&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let markers = [];
        data.rows.map((item) => {
          const lat = item[3];
          const lng = item[4];
          return markers.push({
            lat: lat,
            lng: lng,
            icon: this.state.icons.defaultIcon
          })
        })
        return markers
      }).then(resp => {
        console.log(resp)
        this.setState({
          markers: resp
        })
      }).catch(err => console.log(err))
  }
  mouseOverIcon = (index) => {
    let markers = this.state.markers
    markers[index].icon = this.state.icons.mouseOverIcon
    this.setState({ markers })
  }
  mouseOutIcon = (index) => {
    let markers = this.state.markers
    markers[index].icon = this.state.icons.defaultIcon
    this.setState({ markers })
  }
  render() {
    return (
      <div className="App">
        <Map
          markers={this.state.markers}
          markersDefaultIcons={this.state.icons.defaultIcon}
          mouseOverIcon={this.mouseOverIcon}
          mouseOutIcon={this.mouseOutIcon}
        />
      </div>
    );
  }
}

export default App;
