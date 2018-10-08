import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Markers from './Markers';

const ReactGoogleMaps = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={1}
      defaultCenter={{ lat: -30.12345, lng: -40.12345 }}
      defaultOptions={{
        disableDefaultUI: true,
        fullscreenControl: true
      }}
      ref={props.fitMarkers}
    >
      {props.isMarkerShown &&
      <Markers
        artData={props.artData} 
        mouseOverIcon={props.mouseOverIcon}
        mouseOutIcon={props.mouseOutIcon}
        toogleInfoWindow={props.toogleInfoWindow}
      />}
    </GoogleMap>
  )
}))

export default ReactGoogleMaps;