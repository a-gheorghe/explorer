import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import './MapView.css';
import type { Coordinates } from '../types';
import type { LeafletMouseEvent } from 'leaflet';

// Handle map resize when container size changes (needed for resizable panels)
const MapResizeHandler = () => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);

  return null;
};

// Handle map clicks to set the selected location
// This needs to be a component because we can't use useMapEvents outside of the MapContainer
// TODO: Maybe there is a better way to do this?
const MapClickHandler = ({
  setCoordinates,
}: {
  setCoordinates: (coordinates: Coordinates) => void;
}) => {
  useMapEvents({
    async click(e: LeafletMouseEvent) {
      // Use wrap() to ensure coordinates are in valid range (-180 to 180 for longitude)
      // TODO investigate the zoom/centering logic to understand why we get huge coordinate numbers
      const wrapped = e.latlng.wrap();

      setCoordinates({
        latitude: wrapped.lat,
        longitude: wrapped.lng,
      });
    },
  });

  return null;
};

export const MapView = ({
  coordinates,
  setCoordinates,
}: {
  coordinates?: Coordinates;
  setCoordinates: (location: Coordinates) => void;
}) => {
  return (
    <MapContainer center={[0, 0]} zoom={3} minZoom={2}>
      <MapResizeHandler />
      <MapClickHandler setCoordinates={setCoordinates} />
      {coordinates && (
        <Marker position={[coordinates.latitude, coordinates.longitude]}>
          <Popup>
            Selected location: {coordinates.latitude.toFixed(4)},
            {coordinates.longitude.toFixed(4)}
          </Popup>
        </Marker>
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
