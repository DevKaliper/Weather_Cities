import {Box, TextField, Button} from '@mui/material'
// importa useSnackbar
import { enqueueSnackbar} from 'notistack';

// eslint-disable-next-line react/prop-types
function Ciudad({city, setCity}) {
    const handleNotification = () => {
        if(city === ""){
            enqueueSnackbar('Ingrese una ciudad', {variant: 'error'})
        }else {
            enqueueSnackbar(`Buscando el clima en ${city}`, {variant: 'success'})

        }
        handleSubmit()
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


            
  return (
<Box component="form" sx={{display:"grid", placeContent:"center"}}    onSubmit={handleSubmit}>
    <TextField
    id='ciudad'
    label='Ciudad'
    variant='outlined'
    onChange={handleCityChange}

    value={city}
    required
    helperText='Ingrese una ciudad'
    fullWidth

    />
    <Button type='submit' onClick={handleNotification} variant='contained'>Buscar</Button>
</Box>
  )
}

export default Ciudad