import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGoogleMaps from './ReactGoogleMaps';
import DataFailed from './DataFailed';

class Map extends Component {
  static propTypes = {
    artData: PropTypes.array.isRequired,
    filteredData: PropTypes.array.isRequired,
    mapCenter: PropTypes.object.isRequired,
    animation: PropTypes.number.isRequired,
    mouseOverIcon: PropTypes.func.isRequired,
    mouseOutIcon: PropTypes.func.isRequired,
    toggleInfoWindow: PropTypes.func.isRequired,
    onZoomChanged: PropTypes.func.isRequired
  }

  state = {
    mapError: false
  }

  componentDidMount() {
    // Catch authentication errors
    window.gm_authFailure = () => {
      this.setState({ mapError: true });
    };
  }

  // Fit all markers on screen at first load
  fitMarkers = (map) => {
    if (!map) return
    const bounds = new window.google.maps.LatLngBounds();
    this.props.filteredData.map((item) => bounds.extend(new window.google.maps.LatLng(item.lat, item.lng)))
    map.fitBounds(bounds);
  }

  render() {
    const { artData, filteredData, mapCenter, animation, mouseOverIcon, mouseOutIcon, toggleInfoWindow, onZoomChanged } = this.props
    if (this.state.mapError === true) {
      return <DataFailed />
    } else {
      return (
        <ReactGoogleMaps
          artData={artData}
          filteredData={filteredData}
          mapCenter={mapCenter}
          animation={animation}
          mouseOverIcon={mouseOverIcon}
          mouseOutIcon={mouseOutIcon}
          toggleInfoWindow={toggleInfoWindow}
          onZoomChanged={onZoomChanged}
          fitMarkers={this.fitMarkers}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="mapContainer" />}
          mapElement={<div className="mapElement" />}
        />
      )
    }
  }
}

export default Map;