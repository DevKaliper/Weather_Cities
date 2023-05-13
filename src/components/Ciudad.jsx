import { Box, TextField, Button } from "@mui/material";
// importa useSnackbar
import { enqueueSnackbar } from "notistack";

import { useState } from "react";
import { LoadingButton } from "@mui/lab";

// eslint-disable-next-line react/prop-types
function Ciudad({ city, setCity }) {
  const [loading, setLoading] = useState(false);

  const onSubmited = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${city}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Box
        component="form"
        sx={{ display: "grid", placeContent: "center" }}
        onSubmit={handleSubmit}>
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

    </>
  );
}

export default Ciudad;
