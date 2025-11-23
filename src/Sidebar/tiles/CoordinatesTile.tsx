import type { SelectedLocation } from '../../types';
import { Tile, TileContent, TileTitle } from '../elements';

export const CoordinatesTile = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  console.log('rendering coordinates tile');
  return (
    <Tile>
      <TileTitle>Coordinates</TileTitle>
      <TileContent>
        {selectedLocation?.latitude}, {selectedLocation?.longitude}
      </TileContent>
    </Tile>
  );
};
