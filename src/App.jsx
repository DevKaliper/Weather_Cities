
import { useState } from "react"
import Tittle from "./components/Tittle"
import {Container} from '@mui/material'
import Ciudad from "./components/Ciudad"





function App() {
  const [city, setCity] = useState("")
  
  return (
    <>
    <Container sx={{display: "grid", alignItems:"center", justifyContent:"center"}}>
      <Tittle city={city}/>
      <Ciudad city={city} setCity={setCity}/>
      
    </Container>
    </>
  )
}

export default App