import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { flagEmojiToPNG } from "../hooks/useFlagEmoji";
import Message from "./Message";
import Spinner from "./Spinner";
import { convertToEmoji } from "../hooks/useConvertToEmoji";
import { useCitiesContext } from "../hooks/useCitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_FETCH_CITY_URL;

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading: isLoadingCities } = useCitiesContext();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else☺"
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app");
  }

  if (isLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message='Start by clicking somewhere on map' />;
  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${isLoadingCities ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagEmojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          selected={date}
          onChange={date => setDate(date)}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        {/* <BackButton step='..' /> */}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
