import { useLoadScript } from "@react-google-maps/api";
import Map from "./map"
import "./globals.css"

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

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};


export default App;
