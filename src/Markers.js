import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from "react-google-maps";
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import InfoBoxContent from './InfoBoxContent';

class Markers extends Component {
  static propTypes = {
    filteredData: PropTypes.array.isRequired,
    animation: PropTypes.number.isRequired,
    mouseOverIcon: PropTypes.func.isRequired,
    mouseOutIcon: PropTypes.func.isRequired,
    toggleInfoWindow: PropTypes.func.isRequired
  }
  render() {
    const { filteredData, animation, mouseOverIcon, mouseOutIcon, toggleInfoWindow } = this.props;
    // Create a marker for each row fetched from Fusion Tables
    const markers = filteredData.map((marker, index) => (
      <Marker
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.icon}
        onMouseOver={() => mouseOverIcon(index)}
        onMouseOut={() => mouseOutIcon(index)}
        onClick={() => toggleInfoWindow(index)}
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