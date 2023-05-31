import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import  customIcon  from '../CustomIcon/customIcon'

const Markers = ({places}) => {
  
  return (
    <>
    {places.length > 0 &&
      places.map((place, index) => {
        const coords = [place.latitude, place.longitude];

        return (
          <Marker key={index} position={coords} icon={customIcon}>
            <Popup>
              <h1>{place.name}</h1>
              <p>{place.description}</p>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

export default Markers
