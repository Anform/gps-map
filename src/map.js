import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
    Marker,
    Circle,
    DirectionsRenderer,
    MarkerClusterer,
  } from "@react-google-maps/api";
  import Places from "./places";
  import Distance from "./distance";
  import { toast } from "react-toastify"
  import "react-toastify/dist/ReactToastify.css"

  var max = 0; 

  toast.configure()
  export default function Map() {
    const [location, setLocation] = useState({})
    const [directions, setDirections] = useState()
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

    const getDirections = (place) => {
        if(!location) return;

        const service = new window.google.maps.DirectionsService()
        service.route(
            {
                origin: place,
                destination: location,
                travelMode: window.google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if(status === "OK" && result)
                {
                    setDirections(result)
                }
            }
        )
    }

    return <div className = "container">
        <div className = "controls">
            <h1>How many resturants are near me?</h1>
            <Places setLocation = {(position)=> {
                setLocation(position);
                mapRef.current.panTo(position);
                notify();
            }}>
            </Places>
            {directions ?  (
                <>
                    <Distance leg = {directions.routes[0].legs[0]}></Distance>
                </>
            ): (
                <>
                </>
            )}
        </div>

        <div className = "map">
            <GoogleMap 
                zoom = {10} 
                center = {center}
                mapContainerClassName = "map-container" 
                options = {options}
                onLoad = {onLoad}
            >
                {directions ? (
                    <>
                        <DirectionsRenderer directions = {directions} options = {{
                            polylineOptions: {
                                zIndex: 50,
                                strokeColor: "#880808",
                                strokeWeight: 5
                            }
                        }}></DirectionsRenderer>
                    </>
                ) : (
                    <>
                    </>
                )}
            {location ? (
                <>
                    <Marker
                        position={location}
                        icon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png">
                    </Marker>
                    {stores.map(store => (
                        <>
                            <Marker
                                key = {store.lat}
                                position = {store}
                                onClick = {() => {
                                getDirections(store)
                                }}
                                >
                            </Marker>
                        </>
                        
                    ))}
                    <Circle center={location} radius={1000} options={closeOptions}/>
                </>
            ) :(
                <>
                </>
            )}
            </GoogleMap>
        </div>

    </div>;
  }

  const notify = () => {
    toast.info('There are ' + max +' resturants within 1 mile of your location!', {autoClose: false})
}

  const generateStores = (position) => {
    const stores = []
    const maxNumber = Math.random() * (100 - 15) + 5
    for(let x = 0; x < maxNumber; x++)
    {
        const direction = Math.random() < 0.5 ? -140 : 140;
        stores.push({
            lat : position.lat + Math.random() / direction,
            lng : position.lng + Math.random() / direction,
        });
    }

    max = parseInt(Math.ceil(maxNumber))

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