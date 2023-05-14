import { Box, TextField, Typography } from "@mui/material";
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

  const [error, setError] = useState({
    error: false,
    message: null,
  });

  const onSubmited = (e) => {
    e.preventDefault();
    setLoading(true);
    error.error = false;
    error.message = null;
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

        enqueueSnackbar(`Este es el clima en ${city}`, { variant: "success" });
        
      })
      .catch(() => {
        setError({
          error: true,
          message: "no se encontro la ciudad",
        });
        enqueueSnackbar("No pude encontrar esa ciudad", { variant: "error" });
      });

    setLoading(false);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{ display: "grid", placeContent: "center", width: "100%" }}
        onSubmit={onSubmited}>
        <TextField
          id="ciudad"
          label="Ciudad"
          variant="outlined"
          onChange={handleCityChange}
          value={city}
          required
          error={error.error}
          helperText={error.error ? error.message : "Ingrese una ciudad"}
          fullWidth
        />
        <LoadingButton
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
          mt: 2,
          display: "grid",
          gap: 2,
          textAlign: "center",
        }}
        
        
        >
          <Typography variant="h2" align="center">
            {weather.city}, {weather.country}
          </Typography>
          <Typography variant="h4" align="center">
            {weather.temp}°C
          </Typography>
          <Typography variant="h5" align="center">
            {weather.conditionText}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
 

          
        </Box>
      ) : null}
    </>
  );
}

export default Ciudad;
