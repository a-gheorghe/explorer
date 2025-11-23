import { Tile, TileContent, TileTitle } from '../elements';

export const CountryTile = ({ countryName }: { countryName?: string }) => {
  console.log('rendering country tile');
  return (
    <Tile>
      <TileTitle>Country</TileTitle>
      <TileContent>{countryName ? countryName : 'N/A'}</TileContent>
    </Tile>
  );
};
