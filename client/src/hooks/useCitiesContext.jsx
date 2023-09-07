import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider.");
  return context;
}

const flagEmojiToPNG = (flag = "") => {
  var countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
    .map(char => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png `} alt={flag} />
  );
};

export { useCitiesContext, flagEmojiToPNG };
