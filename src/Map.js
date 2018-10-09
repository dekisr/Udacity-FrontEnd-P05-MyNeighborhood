import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGoogleMaps from './ReactGoogleMaps'

class Map extends Component {
  static propTypes = {
    artData: PropTypes.array.isRequired,
    mouseOverIcon: PropTypes.func.isRequired,
    mouseOutIcon: PropTypes.func.isRequired
  }

  fitMarkers = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.artData.map((item) => bounds.extend(new window.google.maps.LatLng(item.lat, item.lng)))
    map.fitBounds(bounds);
  }

  render() {
    const { artData, mouseOverIcon, mouseOutIcon, toogleInfoWindow, mapCenter, zoom, onZoomChanged } = this.props
    return (
      <ReactGoogleMaps
        artData={artData}
        filteredData={this.props.filteredData}
        fitMarkers={this.fitMarkers}
        mouseOverIcon={mouseOverIcon}
        mouseOutIcon={mouseOutIcon}
        toogleInfoWindow={toogleInfoWindow}
        mapCenter={mapCenter}
        zoom={zoom}
        onZoomChanged={onZoomChanged}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className="mapContainer" />}
        mapElement={<div className="mapElement" />}
      />
    )
  }
}

export default Map;