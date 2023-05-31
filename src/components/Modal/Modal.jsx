import React, { useState } from "react";
import cn from "classnames";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMap } from "react-leaflet";
import ModalHeader from "../ModalHeader/ModalHeader";

const Modal = ({ openedWindow, updateState, setPlaces }) => {
  const map = useMap();
  const [error, setError] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [latValue, setLatValue] = useState("");
  const [longValue, setLongValue] = useState("");

  const enable = Boolean(nameValue) || Boolean(latValue) || Boolean(longValue);

  const specProps = (grid) => {
    return {
      marginBottom: "20px",
      gridArea: grid,
    };
  };

  const handleBlur = (value) => {
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const newPlace = {
      name: nameValue,
      description: descValue,
      latitude: latValue,
      longitude: longValue,
    };

    if (!error) {
      try {
        const response = await fetch("http://185.65.247.241:8081/api/places", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlace),
        });

        if (response.ok) {
          setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
          setNameValue("");
          setDescValue("");
          setLatValue("");
          setLongValue("");
          // Опціонально: оновлення місця з отриманими даними від сервера
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        map.flyTo([newPlace.latitude, newPlace.longitude]);
      }
    }
  };

  return (
    <div className={cn("window", { "is-opened": openedWindow === "CREATE" })}>
      <ModalHeader updateState={updateState}>
        Create a Marker
      </ModalHeader>
      <form
        method="post"
        className="modal-form"
        onSubmit={(e) => onFormSubmit(e)}
      >
        <TextField
          id="outlined-basic"
          error={error}
          label="Назва"
          variant="outlined"
          value={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          sx={specProps("name")}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Опис"
          multiline
          rows={2}
          value={descValue}
          onChange={(event) => setDescValue(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          sx={specProps("description")}
        />

        <TextField
          id="outlined-basic"
          label="Широта"
          variant="outlined"
          value={latValue}
          onChange={(event) => setLatValue(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          sx={specProps("latitude")}
          inputProps={{
            pattern: "^-?[0-9]+\\.[0-9]+$",
            title: "Використовуйте формат числа з крапкою, наприклад: 12.345",
          }}
        />

        <TextField
          id="outlined-basic"
          label="Довгота"
          variant="outlined"
          value={longValue}
          onChange={(event) => setLongValue(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          sx={specProps("longitude")}
          inputProps={{
            pattern: "^-?[0-9]+\\.[0-9]+$",
          }}
        />
        <Button variant="contained" type="submit" disabled={!enable}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Modal;

// <button className="modal-form__item" type="submit">
