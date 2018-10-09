import React, { Component } from 'react';
import { Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

class Markers extends Component {
  render() {
    const markers = this.props.filteredData.map((marker, index) => (
      <Marker
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.icon}
        animation={window.google.maps.Animation.BOUNCE}
        onMouseOver={() => this.props.mouseOverIcon(index)}
        onMouseOut={() => this.props.mouseOutIcon(index)}
        onClick={() => this.props.toogleInfoWindow(index)}
        options = {{ closeBoxURL: ''}}
      >
      {marker.isOpen &&
        <InfoBox
        options={{
          disableAutoPan: true,
          closeBoxURL: ''
        }}
        >
          <div className="teste">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae delectus dignissimos, earum beatae repellendus magni nihil! Impedit officia, quas illo, nihil in at ipsam dolorum, eum enim temporibus recusandae!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae delectus dignissimos, earum beatae repellendus magni nihil! Impedit officia, quas illo, nihil in at ipsam dolorum, eum enim temporibus recusandae!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae delectus dignissimos, earum beatae repellendus magni nihil! Impedit officia, quas illo, nihil in at ipsam dolorum, eum enim temporibus recusandae!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae delectus dignissimos, earum beatae repellendus magni nihil! Impedit officia, quas illo, nihil in at ipsam dolorum, eum enim temporibus recusandae!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae delectus dignissimos, earum beatae repellendus magni nihil! Impedit officia, quas illo, nihil in at ipsam dolorum, eum enim temporibus recusandae!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae delectus dignissimos, earum beatae repellendus magni nihil! Impedit officia, quas illo, nihil in at ipsam dolorum, eum enim temporibus recusandae!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae delectus dignissimos, earum beatae repellendus magni nihil! Impedit officia, quas illo, nihil in at ipsam dolorum, eum enim temporibus recusandae!</p>
          </div>
        </InfoBox>
      }
      </Marker>
    ))
  
    return (markers)
  }
}

export default Markers;