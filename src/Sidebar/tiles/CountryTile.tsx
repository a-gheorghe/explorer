import type { SelectedLocation } from '../../types';
import { Tile, TileContent, TileTitle } from '../elements';

export const CountryTile = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  console.log('rendering country tile');
  return (
    <Tile>
      <TileTitle>Country</TileTitle>
      <TileContent>
        {selectedLocation?.country ? selectedLocation?.country?.name : 'N/A'}
      </TileContent>
    </Tile>
  );
};
