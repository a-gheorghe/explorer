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
import styled from 'styled-components';

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 40px;
  color: #6b7280;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #374151;
  }

  p {
    font-size: 1rem;
    margin: 0;
    line-height: 1.6;
    max-width: 300px;
  }
`;

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
        <EmptyState>
          <h2>Explore the World</h2>
          <p>
            Click anywhere on the map to discover information about that
            location, including country details and wildlife observations.
          </p>
        </EmptyState>
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
