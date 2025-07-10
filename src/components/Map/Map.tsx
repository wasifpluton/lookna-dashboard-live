"use client";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export default function Map({
  vehicles,
  height = "600px",
}: {
  vehicles: any;
  height?: string;
  isAvailableCars?: boolean;
}) {
  const getVehicleCoordinates = () => {
    const defaultLat = 48.8566;
    const defaultLng = 2.3522;

    const lat = !isNaN(
      (vehicles as any)?.[0]?.driverId?.location?.coordinates?.[1]
    )
      ? (vehicles as any)?.[0]?.driverId?.location?.coordinates?.[1]
      : defaultLat;

    const lng = !isNaN(
      (vehicles as any)?.[0]?.driverId?.location?.coordinates?.[0]
    )
      ? (vehicles as any)?.[0]?.driverId?.location?.coordinates?.[0]
      : defaultLng;

    return { lat, lng };
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCy3J06bX6DVrZK4hOn0Lnakw-Zzt-qyMQ",
    libraries: ["places", "maps"],
  });

  const getMarkerIcon = (color = "green") => {
    const svgString = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40" height="40">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${color}">
              <animate attributeName="stop-color" values="${color};#FFFFFF;${color}" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stop-color="#FFFFFF">
              <animate attributeName="stop-color" values="#FFFFFF;${color};#FFFFFF" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <path fill="url(#grad)" filter="url(#glow)" d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z">
          <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    `);
    return `data:image/svg+xml;charset=UTF-8,${svgString}`;
  };

  return (
    <div className="relative w-full h-full">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: height || "600px",
            borderRadius: "8px",
          }}
          center={getVehicleCoordinates()}
          onClick={(e) => console.log(e.latLng?.toString())}
          zoom={12}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker
            position={getVehicleCoordinates()}
            icon={{
              url: getMarkerIcon(),
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20),
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
}
