import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const markers = props.markers.map((marker, index) => (
    <Marker
      key={index}
      position={{ lat: marker.lat, lng: marker.lng }}
      icon={marker.icon}
      onMouseOver={() => props.mouseOverIcon(index)}
      onMouseOut={() => props.mouseOutIcon(index)}
    />
  ))
  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: -30.12345, lng: -40.12345 }}
      defaultOptions={{
        disableDefaultUI: true,
        fullscreenControl: true
      }}
      ref={props.fitMarkers}
    >
      {props.isMarkerShown && markers}
    </GoogleMap>
  )
}))

class Map extends Component {
  fitMarkers = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.markers.map((item) => bounds.extend(new window.google.maps.LatLng(item.lat, item.lng)))
    map.fitBounds(bounds);
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown
        markers={this.props.markers}
        markersDefaultIcons={this.props.markersDefaultIcons}
        fitMarkers={this.fitMarkers}
        mouseOverIcon={this.props.mouseOverIcon}
        mouseOutIcon={this.props.mouseOutIcon}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default Map;