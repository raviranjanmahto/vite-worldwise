import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { flagEmojiToPNG } from "../hooks/useFlagEmoji";
import Message from "./Message";
import Spinner from "./Spinner";
import { convertToEmoji } from "../hooks/useConvertToEmoji";

const BASE_URL = import.meta.env.VITE_FETCH_CITY_URL;

function Form() {
  const [cityName, setCityName] = useState("");
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

  if (isLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message='Start by clicking somewhere on map' />;
  if (error) return <Message message={error} />;

  return (
    <form className={styles.form}>
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
        <input id='date' onChange={e => setDate(e.target.value)} value={date} />
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
