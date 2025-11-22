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
import type { SelectedLocation } from '../types';
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
  setSelectedLocation,
}: {
  setSelectedLocation: (location: SelectedLocation) => void;
}) => {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      setSelectedLocation({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return null;
};

export const MapView = ({
  selectedLocation,
  setSelectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
  setSelectedLocation: (location: SelectedLocation) => void;
}) => {
  // Default center is Oslo coordinates
  const defaultCenter: [number, number] = [59.9139, 10.7522];

  return (
    <MapContainer
      center={
        selectedLocation
          ? [selectedLocation.latitude, selectedLocation.longitude]
          : defaultCenter
      }
      zoom={2}
      className="map-container"
      minZoom={2}
    >
      <MapResizeHandler />
      <MapClickHandler setSelectedLocation={setSelectedLocation} />
      {selectedLocation && (
        <Marker
          position={[selectedLocation.latitude, selectedLocation.longitude]}
        >
          <Popup>
            Selected location: {selectedLocation.latitude.toFixed(4)},
            {selectedLocation.longitude.toFixed(4)}
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
