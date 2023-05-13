import { Box, TextField, Button } from "@mui/material";
// importa useSnackbar
import { enqueueSnackbar } from "notistack";

import { useState } from "react";
import { LoadingButton } from "@mui/lab";

// eslint-disable-next-line react/prop-types
function Ciudad({ city, setCity }) {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    condition: null,
    city: null,
    country: null,
    icon: null,
    conditionText: null,
  });



  const onSubmited = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${city}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: data.current.temp_c,
          condition: data.current.condition.code,
          city: data.location.name,
          country: data.location.country,
          icon: data.current.condition.icon,
          conditionText: data.current.condition.text,
        });
        setLoading(false);
      });
  };

  const handleNotification = () => {
    if (city === "") {
      enqueueSnackbar("Ingrese una ciudad", { variant: "error" });
    } else {
      enqueueSnackbar(`Buscando el clima en ${city}`, { variant: "success" });
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };



  return (
    <>
      <Box
        component="form"
        sx={{ display: "grid", placeContent: "center", width: "100%"}}
        onSubmit={onSubmited}>
        <TextField
          id="ciudad"
          label="Ciudad"
          variant="outlined"
          onChange={handleCityChange}
          value={city}
          required
          helperText="Ingrese una ciudad"
          fullWidth
        />
        <LoadingButton
          onClick={handleNotification}
          loading={loading}
          loadingIndicator="Buscando..."
          variant="contained"
          type="submit">
          buscar
        </LoadingButton>
      </Box>
      {weather.temp ? (
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            width: "100%",
            gap: "1rem",
          }}>
          <h2>{weather.city}</h2>
          <h3>{weather.country}</h3>
          <img src={weather.icon} alt="icono del clima" />
          <h1>{weather.temp}°C</h1>
          <h4>{weather.conditionText}</h4>
        </Box>
      ) : null}

    </>
  );
}

export default Ciudad;
