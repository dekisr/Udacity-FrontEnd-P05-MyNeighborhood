import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Loading from './Loading';
import MenuList from './MenuList';
import daliMarker from './assets/icons/daliMarker.png'
import daliMarkerMouseOver from './assets/icons/daliMarkerMouseOver.png'
import reneMarker from './assets/icons/reneMarker.png'
import reneMarkerMouseOver from './assets/icons/reneMarkerMouseOver.png'


class App extends Component {
  state = {
    artData: [],
    filteredData: [],
    mapCenter: { lat: 123, lng: 123 },
    zoom: 5,
    icons: {
      daliDefaultIcon: `${daliMarker}`,
      daliMouseOverIcon: `${daliMarkerMouseOver}`,
      reneDefaultIcon: `${reneMarker}`,
      reneMouseOverIcon: `${reneMarkerMouseOver}`
    },
    loaded: false,
    animation: 1,
    activeMenu: 'All',
    menuOpen: false
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
            wiki: item[6],
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
    console.log(this.state.filteredData)
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
  toogleInfoWindow = (index) => {
    let filtered = this.state.filteredData;
    let zoom = this.state.zoom;
    // (filtered[index].isOpen === true) ?
    //   filtered[index].isOpen = false :
    //   filtered[index].isOpen = true;

    if (filtered[index].isOpen === true) {
      filtered[index].isOpen = false;
    } else {
      filtered[index].isOpen = true;
    }
    for (let i = 0; i < filtered.length; i++) {
      (filtered[i] !== filtered[index]) && (filtered[i].isOpen = false);
    }
    this.setState({
      filteredData: filtered,
      mapCenter: { lat: filtered[index].lat, lng: filtered[index].lng },
      zoom: zoom
    })
  }

  onZoomChanged = () => {
    this.setState({ animation: 2 })
    this.setState({
      animation: 1,
      menuOpen: false
    })
  }

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
              <Map
                animation={this.state.animation}
                artData={this.state.artData}
                filteredData={this.state.filteredData}
                mapCenter={this.state.mapCenter}
                markersDefaultIcons={this.state.icons.defaultIcon}
                mouseOverIcon={this.mouseOverIcon}
                mouseOutIcon={this.mouseOutIcon}
                toogleInfoWindow={this.toogleInfoWindow}
                onZoomChanged={this.onZoomChanged}
              />
            </main>
          </div>
        </div>
      );
    }
  }
}

export default App;
