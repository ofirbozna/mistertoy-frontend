import React from 'react'
import { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '400px',
    height: '400px',
}

// const center = {
//     lat: 32.0853,
//     lng: 34.7818,
// }

const locations = [
    { lat: 32.0853, lng: 34.7818 }, // תל אביב
    { lat: 32.7940, lng: 34.9896 }, // חיפה
    { lat: 31.2518, lng: 34.7913 }, // באר שבע
]


// const Marker = ({ text }) => <div>{text}</div>;

export function About() {

    const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818, })
    const [zoom, setZoom] = useState(8)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBpCVQdKRfENdQqkY1mEDnNlj2CzqKM-30',
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback((mapInstance) => {
        const bounds = new window.google.maps.LatLngBounds()
        locations.forEach((loc) => bounds.extend(loc))
        mapInstance.fitBounds(bounds)
        setMap(mapInstance)
    }, [])

    const onUnmount = React.useCallback((map) => {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            center={center}
            zoom={zoom}
            onUnmount={onUnmount}
        >

            {locations.map((loc, idx) => (
                <Marker onClick={() => {
                    setCenter(loc)
                    setZoom(11)
                }} key={idx} position={{ lat: loc.lat, lng: loc.lng }} title={loc.name} />
            ))}
            <></>
        </GoogleMap>
    ) : (
        <></>
    )
}

