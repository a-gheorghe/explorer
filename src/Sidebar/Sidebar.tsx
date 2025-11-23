import type { Coordinates } from '../types';
import { SidebarContainer } from './elements';
import { CoordinatesTile } from './tiles/CoordinatesTile';
import { CountryTile } from './tiles/CountryTile';
import { FlagTile } from './tiles/FlagTile';
import { useWildlifeFromCoordinates } from './tiles/useWildlifeFromCoordinates';
import { WildlifeTile } from './tiles/WildlifeTile';
import {
  useCountryCode,
  useCountryFromCoordinates,
} from './tiles/useCountryFromCoordinates';

export const Sidebar = ({ coordinates }: { coordinates?: Coordinates }) => {
  const { data: country } = useCountryFromCoordinates(
    coordinates?.latitude,
    coordinates?.longitude
  );
  const { data: countryCode } = useCountryCode(
    coordinates?.latitude,
    coordinates?.longitude
  );
  const { data: wildlife } = useWildlifeFromCoordinates(
    coordinates?.latitude,
    coordinates?.longitude
  );

  // TODO think more about the error state for the country code
  // Clicking an ocean gives an error for the country, but there CAN be wildlife there
  // There can also be a legitimate error (not just "ocean") so think about how to distinguish these cases

  // Also there is an edge case where we click on the ocean and we see a flicker of the last valid country

  if (!coordinates)
    return (
      <SidebarContainer>
        Click anywhere on the map to explore the location!
      </SidebarContainer>
    );
  return (
    <SidebarContainer>
      <CoordinatesTile coordinates={coordinates} />
      <CountryTile countryName={country?.name} />
      <FlagTile countryCode={countryCode} />
      <WildlifeTile observations={wildlife} />
    </SidebarContainer>
  );
};
