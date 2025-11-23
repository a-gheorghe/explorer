import { memo } from 'react';
import type { SelectedLocation } from '../../types';
import { Tile, TileContent, TileTitle } from '../elements';

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
  console.log('rendering flag tile');
  const countryCode = selectedLocation?.country?.code;
  return (
    <Tile>
      <TileTitle>Flag</TileTitle>
      <TileContent>
        {countryCode ? <FlagImage countryCode={countryCode} /> : 'N/A'}
      </TileContent>
    </Tile>
  );
};
