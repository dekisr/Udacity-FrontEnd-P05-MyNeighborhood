import React, { Component } from 'react';
import { Marker, InfoWindow } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

class Markers extends Component {
  render() {
    const markers = this.props.artData.map((marker, index) => (
      <Marker
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.icon}
        animation={window.google.maps.Animation.BOUNCE}
        onMouseOver={() => this.props.mouseOverIcon(index)}
        onMouseOut={() => this.props.mouseOutIcon(index)}
        onClick={() => this.props.toogleInfoWindow(index)}
      >
      {marker.isOpen &&
        <InfoBox>
          <p>teste</p>
        </InfoBox>
      }
      </Marker>
    ))
  
    return (markers)
  }
}

export default Markers;