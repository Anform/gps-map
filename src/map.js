import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
    Marker,
    Circle,
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
    const stores = useMemo(function() {
        if(location) return generateStores(location);
    },[location])


    return <div className = "container">
        <div className = "controls">
            <h1>Test</h1>
            <Places setLocation = {(position)=> {
                setLocation(position);
                mapRef.current.panTo(position);
            }}>
            </Places>
        </div>

        <div className = "map">
            <GoogleMap 
                zoom = {10} 
                center = {center}
                mapContainerClassName = "map-container" 
                options = {options}
                onLoad = {onLoad}
            >
            {location ? (
                <>
                    <Marker
                        position={location}
                        icon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png">
                    </Marker>
                    {stores.map(store => (
                        <Marker
                            key = {store.lat}
                            position = {store}
                            >
                            
                        </Marker>
                    ))}
                    <Circle center={location} radius={1000} options={closeOptions} />
                </>
            ) :(
                <>
                </>
            )}
            </GoogleMap>
        </div>

    </div>;
  }

  const generateStores = (position) => {
    const stores = []
    const maxAmount = Math.random() * (50 - 10) + 10
    for(let x = 0; x < maxAmount; x++)
    {
        const direction = Math.random() < 0.5 ? -100 : 100;
        stores.push({
            lat : position.lat + Math.random() / direction,
            lng : position.lng + Math.random() / direction,
        });
    }
    return stores; 
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };

const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };