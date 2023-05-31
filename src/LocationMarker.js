import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import customIcon from './components/CustomIcon/customIcon';

const LocationMarker = ({ places, setPosition, setShowedText }) => {
  const [positions, setPositions] = useState([]);
  const [isLocationFounded, setIsLocationFounded] = useState(false);

  const map = useMapEvents({
    click() {
      if(!isLocationFounded) {
        map.locate();
        setShowedText(false);
        setIsLocationFounded(true)
      }
    },
    locationfound(e) {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setPositions((prevPositions) => [...prevPositions, newPosition]);
      map.flyTo(newPosition, map.getZoom());
      setPosition(newPosition)
    },
  });

  return (
    <>
      {positions.map((position, index) => (
        <Marker key={index} position={position} icon={customIcon}>
          <Popup>You are here</Popup>
        </Marker>
      ))}
    </>
  );
};

export default LocationMarker;
