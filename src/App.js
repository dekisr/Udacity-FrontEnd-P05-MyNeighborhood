import React, { Component } from "react"
import Loading from "./Loading"
import DataFailed from "./DataFailed"
import ErrorBoundary from "./ErrorBoundary"
import Map from "./Map"
import MenuList from "./MenuList"
import daliMarker from "./assets/icons/daliMarker.png"
import daliMarkerMouseOver from "./assets/icons/daliMarkerMouseOver.png"
import reneMarker from "./assets/icons/reneMarker.png"
import reneMarkerMouseOver from "./assets/icons/reneMarkerMouseOver.png"
import "./assets/App.css"

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
    activeMenu: "All",
    menuOpen: false,
    ftFailed: false,
    loaded: false
  }
  componentDidMount() {
    this.ftFetch()
  }
  // Fetch necessary data from a custom Google Fusion Table
  ftFetch() {
    // const url = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT*%20FROM%201KrfTm26-Wc2yQmIfW8YH5oUw4aeIC5eL76Yebgnc&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M';
    const url =
      "https://raw.githubusercontent.com/dekisr/Udacity-FrontEnd-P05-MyNeighborhood/master/src/assets/data.json"
    const jsonError = () => {
      throw new Error("Failed to fetch data.json")
    }
    fetch(url)
      .then((resp) => {
        !resp.ok && jsonError()
        return resp.json()
      })
      .then((data) => {
        // Mounts the objects
        let artData = data.paintings.map((item) => {
          // Set the icon according to the artist
          const icon =
            item.artist === "Salvador Dali"
              ? this.state.icons.daliDefaultIcon
              : this.state.icons.reneDefaultIcon
          const obj = {
            ...item,
            icon: icon,
            isOpen: false,
            animation: 1
          }
          return obj
        })
        return artData
      })
      .then((resp) => {
        this.setState({
          artData: resp,
          filteredData: resp,
          loaded: true
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          ftFailed: true,
          loaded: true
        })
      })
  }
  //Filter the data according to the selected artist
  filterData = (name) => {
    let artData = this.state.artData
    artData.forEach((item) => (item.isOpen = false))
    this.setState({ artData })
    let filtered
    name === "All"
      ? (filtered = this.state.artData)
      : (filtered = this.state.artData.filter((item) => item.artist === name))
    this.setState({
      filteredData: filtered,
      activeMenu: name,
      menuOpen: true
    })
    this.changeAnimation()
  }
  // Markers
  mouseOverIcon = (index) => {
    let filtered = this.state.filteredData
    filtered[index].artist === "Salvador Dali"
      ? (filtered[index].icon = this.state.icons.daliMouseOverIcon)
      : (filtered[index].icon = this.state.icons.reneMouseOverIcon)
    this.setState({ filteredData: filtered, menuOpen: false })
  }
  mouseOutIcon = (index) => {
    let filtered = this.state.filteredData
    filtered[index].artist === "Salvador Dali"
      ? (filtered[index].icon = this.state.icons.daliDefaultIcon)
      : (filtered[index].icon = this.state.icons.reneDefaultIcon)
    this.setState({ filteredData: filtered, menuOpen: false })
  }
  toggleInfoWindow = (index) => {
    let filtered = this.state.filteredData
    // Open & Close the Info Box when the marker is clicked
    filtered[index].isOpen === true
      ? (filtered[index].isOpen = false)
      : (filtered[index].isOpen = true)
    // Prevent to open multiple boxes
    for (let i = 0; i < filtered.length; i++) {
      filtered[i] !== filtered[index] && (filtered[i].isOpen = false)
    }
    // Should not center when closing
    filtered[index].isOpen &&
      this.setState({
        mapCenter: { lat: filtered[index].lat, lng: filtered[index].lng }
      })
    this.setState({ filteredData: filtered, menuOpen: false })
    this.changeAnimation()
  }
  // Close info boxes when click outside
  closeIB = () => {
    let artData = this.state.artData
    artData.forEach((item) => (item.isOpen = false))
    this.setState({ artData })
    this.changeAnimation()
  }
  // Open and center the selected marker from menu
  openMarker = (index) => {
    let filtered = this.state.filteredData
    filtered[index].isOpen = true
    for (let i = 0; i < filtered.length; i++) {
      filtered[i] !== filtered[index] && (filtered[i].isOpen = false)
    }
    this.setState({
      filteredData: filtered,
      mapCenter: { lat: filtered[index].lat, lng: filtered[index].lng },
      menuOpen: false
    })
    this.changeAnimation()
  }
  // Change the marker animation if it's selected
  changeAnimation = () => {
    let artData = this.state.artData
    artData.forEach((item) => {
      item.isOpen ? (item.animation = 2) : (item.animation = 1)
    })
    this.setState({ artData })
  }
  // Prevent bug to stop animations when changing the zoom
  onZoomChanged = () => {
    let artData = this.state.artData
    artData.forEach((item) => (item.animation = 2))
    this.setState({ artData })
    this.changeAnimation()
  }

  render() {
    if (this.state.loaded === false) {
      return <Loading />
    } else if (this.state.ftFailed === true) {
      return <DataFailed />
    } else {
      return (
        <div className='App'>
          <div id='outer-container'>
            <MenuList
              filterData={this.filterData}
              filteredData={this.state.filteredData}
              activeMenu={this.state.activeMenu}
              openMarker={this.openMarker}
              isOpen={this.state.menuOpen}
            />
            <main id='page-wrap'>
              <ErrorBoundary>
                <Map
                  artData={this.state.artData}
                  filteredData={this.state.filteredData}
                  mapCenter={this.state.mapCenter}
                  mouseOverIcon={this.mouseOverIcon}
                  mouseOutIcon={this.mouseOutIcon}
                  toggleInfoWindow={this.toggleInfoWindow}
                  onZoomChanged={this.onZoomChanged}
                  closeIB={this.closeIB}
                />
              </ErrorBoundary>
            </main>
          </div>
        </div>
      )
    }
  }
}

export default App
