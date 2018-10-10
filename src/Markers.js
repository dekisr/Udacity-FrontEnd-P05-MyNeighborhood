import React, { Component } from 'react';
import { Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import InfoBoxContent from './InfoBoxContent';

class Markers extends Component {
  render() {
    const markers = this.props.filteredData.map((marker, index) => (
      <Marker
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.icon}
        onMouseOver={() => this.props.mouseOverIcon(index)}
        onMouseOut={() => this.props.mouseOutIcon(index)}
        onClick={() => this.props.toogleInfoWindow(index)}
        animation={this.props.animation}
        defaultAnimation={1}
      >
        {marker.isOpen &&
          <InfoBox
            options={{
              disableAutoPan: true,
              closeBoxURL: ''
            }}
          >
            <InfoBoxContent
              artData={marker}
            />
          </InfoBox>
        }
      </Marker>
    ))

    return (markers)
  }
}

export default Markers;