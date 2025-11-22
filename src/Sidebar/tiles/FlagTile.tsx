import { memo } from 'react';
import type { SelectedLocation } from '../../types';
import { useCountryCode } from './useCountryFromCoordinates';

// React by default does a shallow comparison of props to check if this should be re-rendered
// In our case, we are just comparing a string, so we don't need any check beyond the default
const FlagImage = memo(({ countryCode }: { countryCode: string }) => {
  return (
    <img
      src={`https://flagsapi.com/${countryCode.toUpperCase()}/flat/64.png`}
    />
  );
});

export const FlagTile = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  const { data: countryCode } = useCountryCode(
    selectedLocation?.latitude,
    selectedLocation?.longitude
  );

  if (!countryCode) return null;
  return <FlagImage countryCode={countryCode} />;
};
