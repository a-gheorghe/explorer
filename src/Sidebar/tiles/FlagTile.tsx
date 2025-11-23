import { memo } from 'react';
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

export const FlagTile = memo(
  ({ countryCode }: { countryCode?: string }) => {
    console.log('rendering flag tile');
    return (
      <Tile>
        <TileTitle>Flag</TileTitle>
        <TileContent>
          {countryCode ? <FlagImage countryCode={countryCode} /> : 'N/A'}
        </TileContent>
      </Tile>
    );
  },
  (prevProps, nextProps) => {
    // Only rerender if the country code value actually changes
    return prevProps.countryCode === nextProps.countryCode;
  }
);
