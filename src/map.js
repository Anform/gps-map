import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
    Marker,
    MarkerClusterer,
  } from "@react-google-maps/api";
  import Places from "./places";



  export default function Map() {
    const center = useMemo(() => ({lat: 39, lng : -77}), []);

    return <div className = "container">
        <div className = "controls"><h1>Test</h1></div>
        <div className = "map">
            <GoogleMap zoom = {10} center = {center} mapContainerClassName = "map-container"></GoogleMap>
        </div>
    </div>;
  }