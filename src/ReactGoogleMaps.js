import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const ReactGoogleMaps = withScriptjs(withGoogleMap((props) => {
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

export default ReactGoogleMaps;