import React, { Component } from 'react';
import Loading from './Loading';
import DataFailed from './DataFailed';
import ErrorBoundary from './ErrorBoundary';
import Map from './Map';
import MenuList from './MenuList';
import daliMarker from './assets/icons/daliMarker.png';
import daliMarkerMouseOver from './assets/icons/daliMarkerMouseOver.png';
import reneMarker from './assets/icons/reneMarker.png';
import reneMarkerMouseOver from './assets/icons/reneMarkerMouseOver.png';
import './App.css';


class App extends Component {
  state = {
    artData: [],
    filteredData: [],
    mapCenter: { lat: 123, lng: 123 },
    icons: {
      daliDefaultIcon: `${daliMarker}`,
      daliMouseOverIcon: `${daliMarkerMouseOver}`,
      reneDefaultIcon: `${reneMarker}`,
      reneMouseOverIcon: `${reneMarkerMouseOver}`
    },
    animation: 1,
    activeMenu: 'All',
    menuOpen: false,
    ftFailed: false,
    loaded: false
  }
  componentDidMount() {
    this.ftFetch()
  }
  // Fetch necessary data from a custom Google Fusion Table
  ftFetch() {
    const url = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT*%20FROM%201KrfTm26-Wc2yQmIfW8YH5oUw4aeIC5eL76Yebgnc&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let artData = [];
        // Mounts the objects
        data.rows.map((item, index) => {
          // Set the icon according to the artist
          const icon = (item[0] === 'Salvador Dali') ? this.state.icons.daliDefaultIcon : this.state.icons.reneDefaultIcon;
          const obj = {
            id: index,
            artist: item[0],
            title: item[1],
            year: item[2],
            loc: item[3],
            lat: item[4],
            lng: item[5],
            img: item[6],
            wiki: item[7],
            icon: icon,
            isOpen: false
          }
          return artData.push(obj)
        })
        return artData
      }).then(resp => {
        this.setState({
          artData: resp,
          filteredData: resp,
          loaded: true
        })
      }).catch(err => {
        console.log(err)
        this.setState({
          ftFailed: true,
          loaded: true
        })
      })
  }
  //Filter the data according to the selected artist
  filterData = (name) => {
    this.state.artData.map((item) => item.isOpen = false)
    let filtered;
    name === 'All' ?
      filtered = this.state.artData :
      filtered = this.state.artData.filter((item => item.artist === name));
    this.setState({
      filteredData: filtered,
      activeMenu: name,
      menuOpen: true
    })
  }
  // Markers
  mouseOverIcon = (index) => {
    let filtered = this.state.filteredData;
    (filtered[index].artist === 'Salvador Dali') ?
      filtered[index].icon = this.state.icons.daliMouseOverIcon :
      filtered[index].icon = this.state.icons.reneMouseOverIcon;
    this.setState({ filteredData: filtered, menuOpen: false })
  }
  mouseOutIcon = (index) => {
    let filtered = this.state.filteredData;
    (filtered[index].artist === 'Salvador Dali') ?
      filtered[index].icon = this.state.icons.daliDefaultIcon :
      filtered[index].icon = this.state.icons.reneDefaultIcon;
    this.setState({ filteredData: filtered, menuOpen: false })
  }
  toggleInfoWindow = (index) => {
    let filtered = this.state.filteredData;
    // Open & Close the Info Box when the marker is clicked
    (filtered[index].isOpen === true) ?
      (filtered[index].isOpen = false) :
      (filtered[index].isOpen = true);
    // Prevent to open multiple boxes
    for (let i = 0; i < filtered.length; i++) {
      (filtered[i] !== filtered[index]) && (filtered[i].isOpen = false);
    }
    this.setState({
      filteredData: filtered,
      mapCenter: { lat: filtered[index].lat, lng: filtered[index].lng }
    })
  }
  // Prevent markers to stop bouncing after zoom changes
  onZoomChanged = () => {
    this.setState({ animation: 2 })
    this.setState({
      animation: 1,
      menuOpen: false
    })
  }
  closeTest = () => {
    const artData = this.state.artData;
    artData.map((item) => item.isOpen = false);
    this.setState({ artData })
  }
  // Open and center the selected marker from menu
  openMarker = (index) => {
    let filtered = this.state.filteredData;
    filtered[index].isOpen = true;
    for (let i = 0; i < filtered.length; i++) {
      (filtered[i] !== filtered[index]) && (filtered[i].isOpen = false);
    }
    this.setState({
      filteredData: filtered,
      mapCenter: { lat: filtered[index].lat, lng: filtered[index].lng },
      menuOpen: false
    })
  }

  render() {
    if (this.state.loaded === false) {
      return <Loading />
    } else if (this.state.ftFailed === true) {
      return <DataFailed />
    } else {
      return (
        <div className="App">
          <div id="outer-container">
            <MenuList
              filterData={this.filterData}
              filteredData={this.state.filteredData}
              activeMenu={this.state.activeMenu}
              openMarker={this.openMarker}
              isOpen={this.state.menuOpen}
            />
            <main id="page-wrap">
              <ErrorBoundary>
                <Map
                  artData={this.state.artData}
                  filteredData={this.state.filteredData}
                  mapCenter={this.state.mapCenter}
                  animation={this.state.animation}
                  mouseOverIcon={this.mouseOverIcon}
                  mouseOutIcon={this.mouseOutIcon}
                  toggleInfoWindow={this.toggleInfoWindow}
                  onZoomChanged={this.onZoomChanged}
                  closeTest={this.closeTest}
                />
              </ErrorBoundary>
            </main>
          </div>
        </div>
      );
    }
  }
}

export default App;
