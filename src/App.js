import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import Loading from './Loading'
import MenuList from './MenuList'

class App extends Component {
  state = {
    artData: [],
    filteredData: [],
    mapCenter: { lat: 123, lng: 123 },
    zoom: 2,
    icons: {
      daliDefaultIcon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      daliMouseOverIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      reneDefaultIcon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      reneMouseOverIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    },
    loaded: false
  }
  componentDidMount() {
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
        this.setState({
          artData: resp,
          filteredData: resp,
          loaded: true
        })
      }).catch(err => console.log(err))
  }
  filterData = (name) => {
    let filtered;
    name === 'All' ?
      filtered = this.state.artData :
      filtered = this.state.artData.filter((item => item.artist === name));
    this.setState({ filteredData: filtered })
    console.log(this.state.filteredData)
  }
  // Markers
  mouseOverIcon = (index) => {
    let filtered = this.state.filteredData;
    (filtered[index].artist === 'Salvador Dali') ?
      filtered[index].icon = this.state.icons.daliMouseOverIcon :
      filtered[index].icon = this.state.icons.reneMouseOverIcon;
    this.setState({ filteredData: filtered })
  }
  mouseOutIcon = (index) => {
    let filtered = this.state.filteredData;
    (filtered[index].artist === 'Salvador Dali') ?
      filtered[index].icon = this.state.icons.daliDefaultIcon :
      filtered[index].icon = this.state.icons.reneDefaultIcon;
    this.setState({ filteredData: filtered })
  }
  toogleInfoWindow = (index) => {
    let filtered = this.state.filteredData;
    (filtered[index].isOpen === true) ?
      filtered[index].isOpen = false :
      filtered[index].isOpen = true;
    for (let i = 0; i < filtered.length; i++) {
      (filtered[i] !== filtered[index]) && (filtered[i].isOpen = false);
    }
    this.setState({
      filteredData: filtered,
      mapCenter: { lat: filtered[index].lat, lng: filtered[index].lng }
    })
  }

  onZoomChanged = () => {
    this.setState({
      zoom: 2
    })
  }

  render() {
    if (this.state.loaded === false) {
      return <Loading />
    } else {
      return (
        <div className="App">
          <div id="outer-container">
            <MenuList
              filterData={this.filterData}
            />
            <main id="page-wrap">
              <Map
                artData={this.state.artData}
                filteredData={this.state.filteredData}
                mapCenter={this.state.mapCenter}
                zoom={this.state.zoom}
                onZoomChanged={this.onZoomChanged}
                markersDefaultIcons={this.state.icons.defaultIcon}
                mouseOverIcon={this.mouseOverIcon}
                mouseOutIcon={this.mouseOutIcon}
                toogleInfoWindow={this.toogleInfoWindow}
              />
            </main>
          </div>
        </div>
      );
    }
  }
}

export default App;
