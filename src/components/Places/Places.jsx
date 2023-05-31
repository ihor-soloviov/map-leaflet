/* eslint-disable react-hooks/exhaustive-deps */
import cn from "classnames";
import React, { useState } from "react";
import { useMap } from "react-leaflet";
import marker from "../../assets/marker.png";
import { Pagination } from "../Pagination";
import ModalHeader from "../ModalHeader/ModalHeader";

const Places = ({ openedWindow, updateState, places }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(places.length / itemsPerPage);
  const currentItems = places.slice(indexOfFirstItem, indexOfLastItem);

  const map = useMap();

  const zoom = (e) => {
    const latitude = e.currentTarget.getAttribute("data-latitude");
    const longitude = e.currentTarget.getAttribute("data-longitude");
    map.flyTo([latitude, longitude]);
  };

  return (
    <div
      className={cn("window", {
        "is-opened": openedWindow === "PLACES",
      })}
    >
      <ModalHeader updateState={updateState}>Map Places</ModalHeader>
      <ul className="places-list">
        {currentItems.map((place) => (
          <li
            className="modal-form__item places-list__item"
            onClick={(e) => zoom(e)}
            key={place.id}
            data-latitude={place.latitude}
            data-longitude={place.longitude}
          >
            <img src={marker} alt="marker" width={28} height={28} />
            {place.name} - {place.description}
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        places={places}
      />
    </div>
  );
};

export default Places;
