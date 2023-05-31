import "leaflet/dist/leaflet.css";
import "./App.css";

import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Container } from "./components/Container";
import Modal from "./components/Modal/Modal";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import Places from "./components/Places/Places";
import Markers from "./components/Markers/Markers";

export const App = () => {
  const [position, setPosition] = useState([0, 0]);
  const [openedWindow, setOpenedWindow] = useState("");
  const [showedText, setShowedText] = useState(true);
  const [places, setPlaces] = useState([]);

  const openTheWindow = (event) => {
    console.log('clickesd')
    if (openedWindow === "") {
      setOpenedWindow(event.target.innerText)
    } else {
      setOpenedWindow(event.target.innerText)
    }
  };

  const updateState = () => {
    setOpenedWindow('')
  }

  useEffect(() => {
    fetch("http://185.65.247.241:8081/api/places")
      .then((response) => response.json())
      .then((data) => setPlaces(data));
  }, []);

  return (
    <>
      <Container>
        <MapContainer center={position} zoom={13} doubleClickZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Markers places={places} />
          <LocationMarker
            places={places}
            setPosition={setPosition}
            setShowedText={setShowedText}
          />
          {showedText && <h1 className="start">Click to get your location</h1>}
          <Header
            openTheWindow={openTheWindow}
          />
          <Modal
            openedWindow={openedWindow}
            updateState={updateState}
            setPlaces={setPlaces}
          />
          <Places openedWindow={openedWindow} updateState={updateState} places={places} />
        </MapContainer>
      </Container>
    </>
  );
};
