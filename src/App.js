import { useLoadScript } from "@react-google-maps/api";
import Map from "./map"


function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAD2bQfWIdZUDz4xacSY0Ks2TjfqmATPeU",
    libraries: ["places"]
  });
  if(!isLoaded) return <div>Loading....</div>
  return (


    <Map></Map>
  );
}

export default App;
