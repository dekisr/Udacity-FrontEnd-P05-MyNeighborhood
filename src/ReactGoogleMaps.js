import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Markers from './Markers';
import mapStyle from './assets/mapStyle.json';

// Mounts the Map object using react-google-maps package
const ReactGoogleMaps = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultOptions={{
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
        styles: mapStyle
      }}
      ref={props.fitMarkers}
      center={props.mapCenter}
      onZoomChanged={props.onZoomChanged}
      onClick={props.closeIB}
    >
      {props.isMarkerShown &&
        <Markers
          filteredData={props.filteredData}
          animation={props.animation}
          mouseOverIcon={props.mouseOverIcon}
          mouseOutIcon={props.mouseOutIcon}
          toggleInfoWindow={props.toggleInfoWindow}
        />}
    </GoogleMap>
  )
}))

export default ReactGoogleMaps;