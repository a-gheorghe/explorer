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
import { useQueryClient } from '@tanstack/react-query';
import { createCountryQuery } from '../Sidebar/tiles/useCountryFromCoordinates';
import { createWildlifeQuery } from '../Sidebar/tiles/useWildlifeFromCoordinates';

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
  const queryClient = useQueryClient();

  useMapEvents({
    async click(e: LeafletMouseEvent) {
      // Use wrap() to ensure coordinates are in valid range (-180 to 180 for longitude)
      // TODO investigate the zoom/centering logic to understand why we get huge coordinate numbers
      const wrapped = e.latlng.wrap();

      const [countryPromise, wildlifePromise] = await Promise.allSettled([
        queryClient.fetchQuery(createCountryQuery(wrapped.lat, wrapped.lng)),
        queryClient.fetchQuery(createWildlifeQuery(wrapped.lat, wrapped.lng)),
      ]);
      const country =
        countryPromise.status === 'fulfilled'
          ? countryPromise.value
          : undefined;
      const wildlifeObservations =
        wildlifePromise.status === 'fulfilled'
          ? wildlifePromise.value
          : undefined;

      setSelectedLocation({
        latitude: wrapped.lat,
        longitude: wrapped.lng,
        country: country
          ? {
              name: country.name,
              code: country.code,
            }
          : undefined,
        wildlifeObservations,
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
  console.log('selectedLocation is', selectedLocation);
  return (
    <MapContainer center={[0, 0]} zoom={3} minZoom={2}>
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
