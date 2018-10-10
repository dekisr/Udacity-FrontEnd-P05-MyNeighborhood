import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import InfoBoxContent from './InfoBoxContent';

class Markers extends Component {
  static propTypes = {
    artData: PropTypes.array.isRequired,
    filteredData: PropTypes.array.isRequired,
    animation: PropTypes.number.isRequired,
    mouseOverIcon: PropTypes.func.isRequired,
    mouseOutIcon: PropTypes.func.isRequired,
    toogleInfoWindow: PropTypes.func.isRequired
  }
  render() {
    const { artData, filteredData, animation, mouseOverIcon, mouseOutIcon, toogleInfoWindow } = this.props;
    const markers = filteredData.map((marker, index) => (
      <Marker
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.icon}
        onMouseOver={() => mouseOverIcon(index)}
        onMouseOut={() => mouseOutIcon(index)}
        onClick={() => toogleInfoWindow(index)}
        animation={animation}
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
              artData={artData}
              itemData={marker}
            />
          </InfoBox>
        }
      </Marker>
    ))

    return (markers)
  }
}

export default Markers;