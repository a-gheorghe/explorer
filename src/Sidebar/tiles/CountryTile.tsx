import type { SelectedLocation } from '../../types';
import { useCountryFromCoordinates } from './useCountryFromCoordinates';

export const CountryTile = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  const {
    error,
    data: country,
    isLoading,
  } = useCountryFromCoordinates(
    selectedLocation?.latitude,
    selectedLocation?.longitude
  );
  if (error) return <div> Something went wrong</div>;
  if (isLoading) return <div> Loading...</div>;
  return <div>{country?.name}</div>;
};
