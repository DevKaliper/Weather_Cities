/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function FetchCities({ city }) {
  const [ct, setCt] = useState("");

  useEffect(() => {
    function fetching() {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${city}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }

    fetching();
}, );

  return (
    <>
      <h2>{ct ? ct.location.name : "Esperando por ciudad"}</h2>
    </>
  );
}

export default FetchCities;
