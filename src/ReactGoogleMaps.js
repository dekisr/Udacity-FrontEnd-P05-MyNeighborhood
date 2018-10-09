import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Markers from './Markers';

const ReactGoogleMaps = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultOptions={{
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'greedy'
      }}
      ref={props.fitMarkers}
      center={props.mapCenter}
      onZoomChanged={props.onZoomChanged}
    >
      {props.isMarkerShown &&
        <Markers
          artData={props.artData}
          filteredData={props.filteredData}
          animation={props.animation}
          mouseOverIcon={props.mouseOverIcon}
          mouseOutIcon={props.mouseOutIcon}
          toogleInfoWindow={props.toogleInfoWindow}
        />}
    </GoogleMap>
  )
}))

export default ReactGoogleMaps;