import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGoogleMaps from './ReactGoogleMaps'
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// const MyMapComponent = withScriptjs(withGoogleMap((props) => {
//   const markers = props.markers.map((marker, index) => (
//     <Marker
//       key={index}
//       position={{ lat: marker.lat, lng: marker.lng }}
//       icon={marker.icon}
//       onMouseOver={() => props.mouseOverIcon(index)}
//       onMouseOut={() => props.mouseOutIcon(index)}
//     />
//   ))
//   return (
//     <GoogleMap
//       defaultZoom={2}
//       defaultCenter={{ lat: -30.12345, lng: -40.12345 }}
//       defaultOptions={{
//         disableDefaultUI: true,
//         fullscreenControl: true
//       }}
//       ref={props.fitMarkers}
//     >
//       {props.isMarkerShown && markers}
//     </GoogleMap>
//   )
// }))

class Map extends Component {
  static propTypes = {
    markers: PropTypes.array.isRequired,
    markersDefaultIcons: PropTypes.string.isRequired,
    mouseOverIcon: PropTypes.func.isRequired,
    mouseOutIcon: PropTypes.func.isRequired
  }

  fitMarkers = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.markers.map((item) => bounds.extend(new window.google.maps.LatLng(item.lat, item.lng)))
    map.fitBounds(bounds);
  }

  render() {
    const { markers, markersDefaultIcons, mouseOverIcon, mouseOutIcon } = this.props
    return (
      <ReactGoogleMaps
        isMarkerShown
        markers={markers}
        markersDefaultIcons={markersDefaultIcons}
        fitMarkers={this.fitMarkers}
        mouseOverIcon={mouseOverIcon}
        mouseOutIcon={mouseOutIcon}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAszEoz4HsD1TwV_9pZYzHJW3Fvd158C_M"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default Map;