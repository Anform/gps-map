import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
    Marker,
    MarkerClusterer,
  } from "@react-google-maps/api";
  import Places from "./places";



  export default function Map() {
    const [location, setLocation] = useState({})
    const mapRef = useRef()
    const center = useMemo(() => ({lat: 39, lng : -77}), []);
    const options = useMemo(() => ({
        mapId: "77a80f665d599305",
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])

    const onLoad = useCallback(map => (mapRef.current = map), []);

    return <div className = "container">
        <div className = "controls">
            <h1>Test</h1>
            <Places setLocation = {(position)=> {
                setLocation(position);
                mapRef.current.panTo(position);
            }}></Places>
        </div>
        <div className = "map">
            <GoogleMap 
                zoom = {10} 
                center = {center} 
                mapContainerClassName = "map-container" 
                options = {options}
                onLoad = {onLoad}
            >
                {location && <Marker position = {location}/>}
            </GoogleMap>
        </div>
    </div>;
  }