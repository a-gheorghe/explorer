import type { Coordinates } from '../../types';
import { Tile, TileContent, TileTitle } from '../elements';

export const CoordinatesTile = ({
  coordinates,
}: {
  coordinates?: Coordinates;
}) => {
  console.log('rendering coordinates tile');
  return (
    <Tile>
      <TileTitle>Coordinates</TileTitle>
      <TileContent>
        {coordinates?.latitude}, {coordinates?.longitude}
      </TileContent>
    </Tile>
  );
};
