import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const markers = props.markers.map((marker, index) => (
    <Marker
      key={index}
      position={{ lat: marker.lat, lng: marker.lng }}
    />
  ))
  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {props.isMarkerShown && markers}
    </GoogleMap>
  )
}))

class Map extends Component {
  render() {
    return (
      <MyMapComponent
        isMarkerShown
        markers={this.props.markers}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default Map;