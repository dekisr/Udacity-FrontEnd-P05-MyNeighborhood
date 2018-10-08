import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import Loading from './Loading'

class App extends Component {
  state = {
    artData: [],
    icons: {
      daliDefaultIcon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      daliMouseOverIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      reneDefaultIcon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      reneMouseOverIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    },
    loaded: false
  }
  componentWillMount() {
    this.testFetch()
  }
  testFetch() {
    const url = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT*%20FROM%201EoMGaJVXfDZdNy8YLMXdVpVaxM2rdurHVgY4X10P&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        let artData = [];
        data.rows.map((item, index) => {
          // mount objects //
          const icon = (item[0] === 'Salvador Dali') ? this.state.icons.daliDefaultIcon : this.state.icons.reneDefaultIcon;
          const obj = {
            id: index,
            artist: item[0],
            title: item[1],
            year: item[2],
            lat: item[3],
            lng: item[4],
            img: item[5],
            icon: icon,
            isOpen: false
          }
          //////////////////
          return artData.push(obj)
        })
        return artData
      }).then(resp => {
        console.log(resp)
        this.setState({
          artData: resp,
          loaded: true
        })
      }).catch(err => console.log(err))
  }
  // Markers
  mouseOverIcon = (index) => {
    let artData = this.state.artData;
    (artData[index].artist === 'Salvador Dali') ?
      artData[index].icon = this.state.icons.daliMouseOverIcon :
      artData[index].icon = this.state.icons.reneMouseOverIcon;
    this.setState({ artData })
  }
  mouseOutIcon = (index) => {
    let artData = this.state.artData;
    (artData[index].artist === 'Salvador Dali') ?
      artData[index].icon = this.state.icons.daliDefaultIcon :
      artData[index].icon = this.state.icons.reneDefaultIcon;
    this.setState({ artData })
  }
  toogleInfoWindow = (index) => {
    let artData = this.state.artData;
    (artData[index].isOpen === true) ?
      artData[index].isOpen = false :
      artData[index].isOpen = true;
    for (let i = 0; i < artData.length; i++) {
      (artData[i] !== artData[index]) && (artData[i].isOpen = false);
    }
    this.setState({ artData })
  }
  render() {
    if (this.state.loaded === false) {
      return <Loading />
    } else {
      return (
        <div className="App">
          <Map
            artData={this.state.artData}
            markersDefaultIcons={this.state.icons.defaultIcon}
            mouseOverIcon={this.mouseOverIcon}
            mouseOutIcon={this.mouseOutIcon}
            toogleInfoWindow={this.toogleInfoWindow}
          />
        </div>
      );
    }
  }
}

export default App;
